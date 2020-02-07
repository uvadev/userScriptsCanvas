function missingSubmissionsObserver() {
  const checkIfNull = async selector => {
    while (document.querySelector(selector) === null) {
      await new Promise(resolve => requestAnimationFrame(resolve));
    }
    return document.querySelector(selector);
  };
  checkIfNull(".user-observees").then(() => {
    if (ENV.current_user_roles.includes("observer")) {
      const observeePage = document.querySelector(".user-observees");
      const fetchObservees = `/api/v1/users/self/observees`;
      const options = {
        credentials: "same-origin",
        headers: { accept: "application/json" },
        timeout: 5000
      };
      let observees;
      let dataCollection = [];
      let missingSubmissionsContainer;
      let observeesListContainer;
      const borderStyle =`border-bottom: 1px solid #005299;padding-left:8px;`;
      //------------------------------------------------------------------
      const nextURL = linkTxt => {
        if (linkTxt) {
          let links = linkTxt.split(",");
          let nextRegEx = new RegExp('^<(.*)>; rel="next"$');

          for (let i = 0; i < links.length; i++) {
            let matches = nextRegEx.exec(links[i]);
            if (matches && matches[1]) {
              //return right away
              //console.log(matches[1]);
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
        observeePage.innerHTML = 
        `
        <h2 id="being-observed">Students Being Observed</h2>
        <a href="/grades" class="Button">View Grades</a>
        <div class="gameLoader pacMan"></div>
        <br>
        <h5>Click a name below to see missing submissions</h5>
        <div class="observees-list-container"></div>
        <div class="missing-submissions-container"></div>
        `
        ;
        observeesListContainer = document.querySelector(
          ".observees-list-container"
        );
        missingSubmissionsContainer = document.querySelector(
          ".missing-submissions-container"
        );

        //LOOP
        observees.forEach(kid => {
          let missingListItem = document.createElement("li"); //create li
          let classesToAddOB = [`Button`]; //add more classes
          missingListItem.classList.add(...classesToAddOB);
          missingListItem.textContent = `${kid.name}`; //replace
          missingListItem.addEventListener(
            "click",
            async () =>
              await addMissingSub(kid.id).then(async () => {
                scrubMissingSubs(kid.name);
              }),
            { once: true }
          );
          observeesListContainer.appendChild(missingListItem);
        });
      });
      //------------------------------------------------------------------------------------------------------
      const addMissingSub = async progeny => {
        //console.log(progeny);
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
        //console.log(dataCollection);
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
            //console.log(resP.data);
            dataCollection = dataCollection.concat(resP.data);
            // console.info(Object.keys(kidd.data).length);
            // console.info(Object.keys(dataCollection).length);
          }
          await loopy(resP);
        }
      };
      const scrubMissingSubs = async nomenclature => {
        let docFrag = new DocumentFragment();
        const dataView = document.createElement("div");
        docFrag.appendChild(dataView);
        //dataView.appendChild(tHead);

        //header
        //LOOP
        let filteredDataCollection = dataCollection.filter(
          lex =>
            lex.due_at > "2020-01-01T01:01:01Z" &&
            !lex.locked_for_user /**&&
            !lex.omit_from_final_grade &&
            lex.points_possible >= 1 **/
        );
        filteredDataCollection.reverse();
        // console.log(filteredDataCollection);
        let totLen = Object.keys(filteredDataCollection).length;
        let totes = document.createElement("h3");
        totes.style.color = '#005299';
        totes.textContent = `${nomenclature} -> Current Total of Missing Assignments (${totLen})`;
        dataView.appendChild(totes);
        const kidTable = document.createElement("table");
        const kidHeaderRow = document.createElement("tr");
        const kidHeader1 = document.createElement("th");
        kidHeader1.style = borderStyle;
        kidHeader1.textContent = `Due as of`;
        const kidHeader2 = document.createElement("th");
        kidHeader2.style = borderStyle;
        kidHeader2.textContent = `Course Name`;
        const kidHeader3 = document.createElement("th");
        kidHeader3.style = borderStyle;
        kidHeader3.textContent = `Assignment Link`;
        const kidHeader4 = document.createElement("th");
        kidHeader4.style = borderStyle;
        kidHeader4.textContent = `Points Possible`;
        kidHeaderRow.appendChild(kidHeader1);
        kidHeaderRow.appendChild(kidHeader2);
        kidHeaderRow.appendChild(kidHeader3);
        kidHeaderRow.appendChild(kidHeader4);
        kidTable.appendChild(kidHeaderRow);
        //LOOP
        filteredDataCollection.forEach(lateSub => {
          let kidR = document.createElement("tr");
          let dT = String(new Date(lateSub.due_at).toDateString());
          let kid1 = document.createElement("td");
          kid1.style = borderStyle;
          let kid2 = document.createElement("td");
          kid2.style = borderStyle;
          let kid3 = document.createElement("td");
          kid3.style = borderStyle;
          let kidA = document.createElement("a");
          kidA.setAttribute(`href`, `${lateSub.html_url}`);
          let kid4 = document.createElement("td");
          kid4.style = borderStyle;
          kid1.textContent = ` ${dT} `;
          kid2.textContent = ` ${lateSub.course.name} `;
          kidA.textContent += ` ${lateSub.name} `;
          kid4.textContent = ` ${lateSub.points_possible} `;
          kidTable.appendChild(kidR);
          kidR.appendChild(kid1);
          kidR.appendChild(kid2);
          kid3.appendChild(kidA);
          kidR.appendChild(kid3);
          kidR.appendChild(kid4);
          dataView.appendChild(kidTable);
        });
        //loading animation
        document
          .querySelector(".gameLoader.pacMan")
          .style.setProperty("--playState", "paused");
        //loading animation
        missingSubmissionsContainer.after(docFrag);
      };
    }
  });
}
missingSubmissionsObserver();
