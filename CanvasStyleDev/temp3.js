function missingSubmissionsObserver() {
  const checkIfNull = async selector => {
    while (document.querySelector(selector) === null) {
      await new Promise(resolve => requestAnimationFrame(resolve));
    }
    return document.querySelector(selector);
  };
  checkIfNull(".user-observees").then(() => {
    if (ENV.current_user_roles.includes("observer")) {
      const observeeContainer = document.querySelector(".observees-list-container");
      const observeeLI = document.querySelector(".observees-list");
      const hThree = document.querySelector("#being-observed");
      hThree.style.display = "inline-block";
      observeeLI.style.margin = 0;
      const fetchObservees = `/api/v1/users/self/observees`;
      const options = {
        credentials: "same-origin",
        headers: { accept: "application/json" },
        timeout: 5000
      };
      let observees;
      let dataCollection = [];
      //------------------------------------------------------------------
      const nextURL = linkTxt => {
        if (linkTxt) {
          let links = linkTxt.split(",");
          let nextRegEx = new RegExp('^<(.*)>; rel="next"$');

          for (let i = 0; i < links.length; i++) {
            let matches = nextRegEx.exec(links[i]);
            if (matches && matches[1]) {
              //return right away
              console.log(matches[1]);
              return matches[1];
            }
          }
        } else {
          return false;
        }
      };
      //--------------------------------------------------------------------
      const fetchObserveesID = async () => {
        const response = await fetch(fetchObservees, options);
        const info = await response.json();
        let rsp = {
          data: info,
          ok: response.ok,
          headers: response.headers
        };
        observees = rsp.data;
      };

      fetchObserveesID().then(async () => {
        observeeLI.innerHTML = ""; //wipe content in container
        //LOOP
        let pmLoader = document.createElement("div");
        const classesToAddPM = ["gameLoader", "pacMan"];
        pmLoader.classList.add(...classesToAddPM);
        hThree.after(pmLoader);
        observees.forEach(kid => {
          let missingListItem = document.createElement("li"); //create li
          let classesToAddOB = [`Button`]; //add more classes
          missingListItem.classList.add(...classesToAddOB); //add classlist
          missingListItem.textContent = `${kid.name}`; //replace
          missingListItem.addEventListener(
            "click",
            async () =>
              await addMissingSub(kid.id).then(async () => {
                scrubMissingSubs(kid.name);
              }), {once : true}
          );
          observeeLI.appendChild(missingListItem);
        });
      });
      //------------------------------------------------------------------------------------------------------
      const addMissingSub = async progeny => {
        console.log(progeny);
        //loading animation
        const pMan = document.querySelector(".gameLoader.pacMan");
          pMan.style.setProperty("--playState", "play");
        //loading animation
        const response = await fetch(
          `/api/v1/users/${progeny}/missing_submissions?include[]=course&filter[]=submittable&per_page=100`,
          options
        );
        const data1 = await response.json();
        let res1 = {
          data: data1,
          ok: response.ok,
          headers: response.headers
        };
        dataCollection = res1.data;
        console.log(dataCollection);
        await loopy(res1);
      };
      //-----===========---------===========--------

      const loopy = async kidd => {
        if (nextURL(kidd.headers.get("Link")) === undefined) {
          return;
          //otherwise keep going.
        } else {
          const rspns = await fetch(nextURL(kidd.headers.get("Link")), options);
          let moreData = await rspns.json();
          let resP = {
            data: moreData,
            ok: rspns.ok,
            headers: rspns.headers
          };
          if (resP.ok) {
            console.log(resP.data);
            dataCollection = dataCollection.concat(resP.data);
            console.info(Object.keys(kidd.data).length);
            console.info(Object.keys(dataCollection).length);
          }
          await loopy(resP);
        }
      };
      const scrubMissingSubs = async nomenclature => {
        let docFrag = new DocumentFragment();
        const dataView = document.createElement("div");
        docFrag.appendChild(dataView);
        const uL = document.createElement("ul");
        dataView.appendChild(uL);
        //LOOP
        let filteredDataCollection = dataCollection.filter(
          lex =>
            lex.due_at > "2020-01-01T01:01:01Z" &&
            !lex.omit_from_final_grade &&
            !lex.locked_for_user &&
            lex.points_possible >= 1
        );
        filteredDataCollection.reverse();
        console.log(filteredDataCollection);
        let totLen = Object.keys(filteredDataCollection).length;
        let totes = document.createElement("h4");
        totes.textContent = `${nomenclature} -> Current Total of Missing Assignments (${totLen})`;
        dataView.appendChild(totes);
        
        var tbl = document.createElement("stuTbl");
          tbl.style.width = '100px';
          tbl.style.border = '1px solid black';
        dataView.appendChild(tbl);
        //LOOP
        filteredDataCollection.forEach(lateSub => {
          let dT = String(new Date(lateSub.due_at).toDateString());
          let kidL = document.createElement("li");
          let kidA = document.createElement("a");
          kidA.setAttribute(`href`, `${lateSub.html_url}`);
          kidL.textContent = `${lateSub.course.name}  due as of: ${dT} `;
          kidA.textContent += ` ✖ ${lateSub.name}`;
          dataView.appendChild(kidL);
          kidL.appendChild(kidA);

          var tblRow = document.createElement('stuTblRow');
          tblRow.appendChild(kidL);
          tblRow.appendChild(kidA);
          dataView.appendChild(tblRow.appendChild(kidL));
          dataView.appendChild(tblRow.appendChild(kidA));
          //tblRow.appendChild(kidA.textContent += ` ${lateSub.name}`);
        });
        //loading animation
        document
          .querySelector(".gameLoader.pacMan")
          .style.setProperty("--playState", "paused");
        //loading animation
        observeeContainer.after(docFrag);
      };
    }
  });
}
missingSubmissionsObserver();
