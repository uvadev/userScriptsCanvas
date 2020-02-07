function sortGradesObservers() {
  const checkIfNull = async selector => {
    while (document.querySelector(selector) === null) {
      await new Promise(resolve => requestAnimationFrame(resolve));
    }
    return document.querySelector(selector);
  };

  checkIfNull("table.course_details.observer_grades").then(() => {
    console.info(ENV.current_user_roles.includes("observer"),window.location.pathname.includes("/grades"));
    if (
      ENV.current_user_roles.includes("observer") &&
      window.location.pathname.includes("/grades")
    ) {
      () => {
        console.info(`here`)
        let table,
          rows,
          switching,
          i,
          thisRow,
          nextRow,
          shouldSwitch,
          percentColumn;
        table = document.querySelector("table.course_details.observer_grades");
        percentColumn = document.querySelectorAll("td.percent");
        percentColumn.forEach(one => {
          console.info(one);
          if (one.innerText === "no grade") {
            one.parentNode.style.display = "none";
          }
        });
        switching = true;
        /*Make a loop that will continue until
  no switching has been done:*/
        while (switching) {
          //start by saying: no switching is done:
          switching = false;
          rows = table.rows;
          /*Loop through all table rows (except the
    first, which contains table headers):*/
          for (i = 0; i < rows.length; i++) {
            //start by saying there should be no switching:
            shouldSwitch = false;
            /*Get the two elements you want to compare,
      one from current row and one from the next:*/
            thisRow = rows[i].querySelectorAll("td")[0];
            if (i !== rows.length - 1) {
              nextRow = rows[i + 1].querySelectorAll("td")[0];
            }
            //check if the two rows should switch place:
            if (
              thisRow.innerText.toLowerCase() > nextRow.innerText.toLowerCase()
            ) {
              //if so, mark as a switch and break the loop:
              shouldSwitch = true;
              break;
            }
          }
          if (shouldSwitch) {
            /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
          }
        }
        

      };
      // set up the mutation observer
    }
  });
}