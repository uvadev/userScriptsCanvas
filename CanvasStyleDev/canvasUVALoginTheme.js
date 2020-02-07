const UVAFunctions = () =>{missingSubmissionsObserver(); addObserverEmailButton(); libraryMainNav(); sortGradesObservers(); iframeLonger(); logIn(); addChooseChild(); replaceSupportButton(); saraSudo(); replacePointsWithPercentage(); studentView();}
if (document.readyState !== "loading") {
  console.info("1");
  UVAFunctions();
} else {
  document.addEventListener("DOMContentLoaded", function() {
    console.info("2");
    UVAFunctions();
  });
}
function logIn() {
  const checkIfNull = async selector => {
    while (document.querySelector(selector) === null) {
      await new Promise(resolve => requestAnimationFrame(resolve));
    }
    return document.querySelector(selector);
  };
  checkIfNull("#login_form").then(() => {
    const placeHolder = `haha`;
    console.info(`it's alive ${placeHolder}`);
    const emailLogin = document.querySelector("#pseudonym_session_unique_id");
    if (emailLogin !== null) {
      emailLogin.placeholder = "UVA Parent/Learning Coach Login";
    }
    const passLogin = document.querySelector("#pseudonym_session_password");
    if (passLogin !== null) {
      passLogin.placeholder = "UVA Parent/Learning Coach Login";
    }
    let buttonLogin = document.querySelector("button.Button.Button--login");
    if (buttonLogin !== null) {
      buttonLogin.innerHTML = "Login";
    }
    let emailLoginMobile = document.querySelector(
      '.ic-Input[name="pseudonym_session[unique_id]"]'
    );
    if (emailLoginMobile !== null) {
      emailLoginMobile.placeholder = "UVA Parent/Learning Coach Email";
    }
    let passLoginMobile = document.querySelector(
      '.ic-Input[name="pseudonym_session[password]"]'
    );
    if (passLoginMobile !== null) {
      passLoginMobile.placeholder = "UVA Parent/Learning Coach Password";
    }
    const getForm = document.querySelector(".mobileLogin-Header");
    if (getForm !== null) {
      getForm.innerHTML +=
        '<form action="/login/clever" method="get"><button class="Button Button--primary Button--block glow">UVA Student Login</button></form>';
    }
    // const getForgot = document.querySelector(
    //   'a[class="forgot-password flip-to-back"]'
    // );
    // if (getForgot !== null) {
    //   getForgot.innerHTML =
    //     '<a class="ic-Login__link forgot_password_link" id="login_forgot_password" onclick="toggleVisibility()" style="background-color:#0161B6;">Forgot Password?</a>';
    // }
  });
}

function toggleVisibility() {
  const getResetText = document.querySelector(".flip-to-front");
  const getHidden = document.querySelector("#forgot_password_form");
  const toggleLogin = document.querySelector("#login_form");
  toggleLogin.classList.toggle("front", "back");
  getHidden.classList.toggle("back", "front");
  if (getResetText !== null) {
    getResetText.innerHTML =
      '<span style="background-color:white;">after you submit please check your email</span>';
  }
}

function saraSudo() {
  if (ENV.current_user.display_name === "SARA MUNGALL" || ENV.current_user.display_name === "Sara Mungall" || ENV.current_user.display_name === "Daniel Guillot" || ENV.current_user.display_name === "DANIEL GUILLOT") {
    console.info(
      `%c all hail ${ENV.current_user.display_name} `,
      "background: #222; color: #0080ff"
    );
    const crossLink = document.querySelector(
      "a.btn.button-sidebar-wide.crosslist_link"
    );
    const unCrossList = document.querySelector(
      "a.btn.button-sidebar-wide.uncrosslist_link"
    );
    if (crossLink !== null) {
      crossLink.style.cssText = "display:block !important;";
      unCrossList.style.cssText = "display:block !important;";
    }
  } else {
    console.info(
      `%c Hi my name is ${ENV.current_user.display_name} `,
      "color: #FF9FC1"
    );
  }
}

function replaceSupportButton() {
  const checkIfNull = async selector => {
    while (document.querySelector(selector) === null) {
      await new Promise(resolve => requestAnimationFrame(resolve));
    }
    return document.querySelector(selector);
  };
  checkIfNull("#menu").then(() => {
    let lynxButton = document.querySelector("#global_nav_help_link");
    if (lynxButton !== null) {
      lynxButton.addEventListener("click", replaceSupport, false);
    }
  });
}

function replaceSupport() {
  const checkIfNull = async selector => {
    while (document.querySelector(selector) === null) {
      await new Promise(resolve => requestAnimationFrame(resolve));
    }
    return document.querySelector(selector);
  };

  checkIfNull("#help_tray > form").then(element => {
    element.removeAttribute("action");
    element
      .querySelectorAll("fieldset > input:not(.first)")
      .forEach(el => el.remove());

    function updateFields() {
      let subjectInput = element
        .querySelector("fieldset")
        .querySelectorAll("input")[0].value;
      subjectInput = encodeURIComponent(subjectInput);
      let descriptionInput = element
        .querySelector("fieldset")
        .querySelector("textarea").value;
      descriptionInput = encodeURIComponent(descriptionInput);
      let affectingInput = element
        .querySelector("fieldset")
        .querySelector("select.ic-Input").selectedOptions[0].text;
      affectingInput = encodeURIComponent(affectingInput);
      let mailToBuild = `mailto:support@uview.academy?subject=${subjectInput}%20${affectingInput}&body=${descriptionInput}`;
      //console.info(`%c ${mailToBuild}`, "color:#00a1f7");
      let submitTicket = element.querySelector(
        "fieldset > .ic-HelpDialog__form-actions > button.Button.Button--primary"
      );
      if (submitTicket !== null) {
        submitTicket.parentNode.removeChild(submitTicket);
      }
      let submitTicketNew = element.querySelector(
        "fieldset > .ic-HelpDialog__form-actions"
      );
      let aExist = element.querySelector(
        "fieldset > .ic-HelpDialog__form-actions > a"
      );
      let newButton = (submitTicketNew.innerHTML = `<a class="btn btn-primary thisOne" onClick="window.open(${mailToBuild}, 'Mail');event.preventDefault()" href=${mailToBuild} target="_blank">Send an e-mail</a>`);
      newButton;
      if (aExist) {
        aExist.remove();
        newButton;
      }
      //return {subjectInput, descriptionInput, affectingInput,mailToBuild};
    }
    // let {subjectInput, descriptionInput, affectingInput,mailToBuild} = updateFields();
    element.addEventListener("input", updateFields);
  });
}

function replacePointsWithPercentage() {
  const checkIfNull = async selector => {
    while (document.querySelector(selector) === null) {
      await new Promise(resolve => requestAnimationFrame(resolve));
    }
    return document.querySelector(selector);
  };
  checkIfNull("#assignment_grading_type").then(element => {
    console.info(`%c set default grade view as percentage`, "color:#f7f300");
    element.querySelector("option[value='points']").removeAttribute("selected");
    element
      .querySelector("option[value='percent']")
      .setAttribute("selected", "");
  });
}

function studentView() {
  const checkIfTeacher = async selector => {
    while (document.querySelector(selector) === null) {
      await new Promise(resolve => requestAnimationFrame(resolve));
    }
    return document.querySelector(selector);
  };
  checkIfTeacher(".ic-app-nav-toggle-and-crumbs.no-print").then(() => {
    console.info(`%c add student view`, "color:#f7f300");
    let isTeacher,
      isCourse,
      courseId,
      studentViewVisible,
      studentViewURL,
      getPath;
    let visibleMenu = document.querySelector(
      'nav #section-tabs li.section a[title="Settings"]'
    );
    // Determine if the user is actually a teacher
    if (ENV["current_user_roles"].includes("teacher") && visibleMenu !== null) {
      isTeacher = true;
    } else {
      isTeacher = false;
    }
    // Get the current Course ID and path based on the url of the course
    isCourse = window.location.href.indexOf("/courses/") > -1;
    getPath = window.location.pathname;

    // Determine if the user is currently in student view
    studentViewVisible = document.querySelector(
      ".ic-alert-masquerade-student-view"
    );
    // Validate rendering the universal button based on the variables
    if (isTeacher && isCourse && studentViewVisible === null) {
      // If the user is truly a teacher for this course/student view is not already enabled, render the button
      courseId = getPath
        .split("courses/")
        .pop()
        .split("/")[0];
      studentViewURL = `/courses/${courseId}/student_view`;
      document.querySelector(
        ".ic-app-nav-toggle-and-crumbs.no-print"
      ).innerHTML += `<a class="btn button-sidebar-wide quick-access" href="${studentViewURL}" rel="nofollow" data-method="post"><i class="icon-student-view" role="presentation"></i> Launch Student View</a>`;
    } else {
      // If the user is not a teacher or student view is already enabled
      if (
        document.querySelector(".ic-app-nav-toggle-and-crumbs.no-print") !==
          null &&
        document.querySelector(".btn.button-sidebar-wide.quick-access") !== null
      ) {
        document
          .querySelector(".ic-app-nav-toggle-and-crumbs.no-print")
          .removeChild(".btn.button-sidebar-wide.quick-access");
      }
    }
  });
}

function moduleGB() {
  const checkIfNull = async selector => {
    while (document.querySelector(selector) === null) {
      await new Promise(resolve => requestAnimationFrame(resolve));
    }
    return document.querySelector(selector);
  };
  checkIfNull("#assignment_sort_order_select_menu").then(() => {
      console.info(`%c ${ENV.current_user.display_name} is makin' bacon pancakes`, "color:#d1985e");
      document.querySelector('#assignment_sort_order_select_menu').options[2].selected = true;
  });
}

function addChooseChild() {
  if (
    ENV["current_user_roles"].includes("observer") &&
    window.location.href.includes("calendar")
  ) {
    const fetchObservees = `/api/v1/users/self/observees?per_page=50`;
    const options = {
      credentials: "same-origin",
      headers: {
        accept: "application/json"
      },
      timeout: 5000
    };
    fetch(fetchObservees, options).then(async response => {
        const data = await response.json();
        const res = ({
            data: data,
            ok: response.ok
        });
        if (res.ok) {
            console.log(res);
            const children = res.data;
            let p = [];
            children.forEach(child => {
                p.push(new Promise(function (resolve) {
                    console.log(child);
                    let childId = child.id;
                    const fetchCourses = `/api/v1/users/${childId}/courses?per_page=50&include[]=term`;
                    const options0 = {
                        credentials: "same-origin",
                        headers: {
                            accept: "application/json"
                        },
                        timeout: 5000
                    };
                    fetch(fetchCourses, options0).then(async response0 => {
                        const data0 = await response0.json();
                        const courses = ({
                            data: data0,
                            ok: response.ok
                        });
                        if (courses.ok) {
                            console.info(courses);
                            let listCourses = [];
                            courses.data.forEach(courseX => {
                                //console.log(courseX);
                                if (courseX.term &&
                                    Date.now() > Date.parse(courseX.term.start_at) &&
                                    Date.now() < Date.parse(courseX.term.end_at)) {
                                    listCourses.push("course_" + courseX.id);
                                    //console.log("here" + listCourses);
                                }
                            });
                            resolve({
                                childName: child.name,
                                courses1: listCourses
                            });
                        }
                    });
                }));
            });
            Promise.all(p).then(outPut => {
                document.querySelector("#calendar_header").innerHTML += `
              <select id="calendar_children" onchange="location = this.value;">
                <option class="calendar_child">Select Child</option>
                ${outPut.map(x => `<option class="calendar_child" value="calendar?include_contexts=${x.courses1}">${x.childName}</option>`)}
              </select>
            `;
            });
        }
    });
  }
}

function iframeLonger() {
  const checkIfNull = async selector => {
    while (document.querySelector(selector) === null) {
      await new Promise(resolve => requestAnimationFrame(resolve));
    }
    return document.querySelector(selector);
  };

  checkIfNull("#main").then(() => {
    const edgyHeight = 1450;
    const flvsHeight = 800;
    const edgyCourses = ["1756", "2737", "1757", "2738", "1758", "41"];
    const flvsCourses = ["1035"];
    const currentCourseNum = window.location.pathname
      .split("courses/")
      .pop()
      .split("/")[0];

    const handleLTI = (ltiTool,pixels) => {
      console.info(
        `this is an Edgy Class set iFrame height to ${pixels}`
      );
      ltiTool.removeAttribute("style");
      setTimeout(() => {
        ltiTool.setAttribute("style", `height: ${pixels}px`);
        //console.log(ltiTool);
      }, 2000);
    };
    if (edgyCourses.includes(currentCourseNum)) {
      // set up the mutation observer
      let observer = new MutationObserver(() => {
        let ltiTool = document.querySelector(".tool_content_wrapper");
        if (ltiTool) {
          handleLTI(ltiTool,edgyHeight);
          return;
        }
      });
      // start observing
      observer.observe(document, {
        childList: true,
        subtree: true
      });
    }
    if (flvsCourses.includes(currentCourseNum)) {
      // set up the mutation observer
      let observer1 = new MutationObserver(() => {
        let ltiTool = document.querySelector(".tool_content_wrapper");
        if (ltiTool) {
          handleLTI(ltiTool,flvsHeight);
          return;
        }
      });
      // start observing
      observer1.observe(document, {
        childList: true,
        subtree: true
      });
    }
  });
}

function sortGradesObservers() {
  const checkIfNull = async selector => {
    while (document.querySelector(selector) === null) {
      await new Promise(resolve => requestAnimationFrame(resolve));
    }
    return document.querySelector(selector);
  };

  checkIfNull("table.course_details.observer_grades").then(() => {
    //console.info(ENV.current_user_roles.includes("observer"),window.location.pathname.includes("/grades"));
    if (
      ENV.current_user_roles.includes("observer") &&
      window.location.pathname.includes("/grades")
    ) {
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
          if (one.innerText === "no grade") {
            one.parentNode.style.display = "none";
          }
        });
        switching = true;
        while (switching) {
          switching = false;
          rows = table.rows;
          for (i = 0; i < rows.length; i++) {
            shouldSwitch = false;
            thisRow = rows[i].querySelectorAll("td")[0];
            if (i !== rows.length - 1) {
              nextRow = rows[i + 1].querySelectorAll("td")[0];
            }
            if (
              thisRow.innerText.toLowerCase() > nextRow.innerText.toLowerCase()
            ) {
              shouldSwitch = true;
              break;
            }
          }
          if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
          }
        }
      // set up the mutation observer
    }
  });
}

function libraryMainNav() {
  const checkIfNull = async selector => {
    while (document.querySelector(selector) === null) {
      await new Promise(resolve => requestAnimationFrame(resolve));
    }
    return document.querySelector(selector);
  };
  checkIfNull("#menu").then(() => {
    const mainMenu = document.querySelector("#menu.ic-app-header__menu-list");
    let temp = new DocumentFragment();
    let liNode = document.createElement("li");
    liNode.setAttribute("class", "menu-item ic-app-header__menu-list-item");
    temp.appendChild(liNode);
    const liNodeApp = temp.querySelector(
      ".menu-item.ic-app-header__menu-list-item"
    );
    liNodeApp.innerHTML = `
<a id="global_nav_library_link" class="ic-app-header__menu-list-link" href="https://clever.com/oauth/instant-login?client_id=e9883f835c1c58894763&district_id=5c9915855260ef0001c80f9b" target="_blank">
              <div class="menu-item-icon-container">
                <span aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" class="ic-icon-svg ic-icon-svg--inbox" version="1.1" x="0" y="0" viewBox="0 0 500 500" enable-background="new 0 0 280 280" xml:space="preserve"><path fill="currentColor" d="M459.91 192.02c-.7 0-1.39.02-2.06.05-49.8 2.84-140.51 13-201.84 47.57-61.33-34.57-152.05-44.73-201.84-47.57-.67-.04-1.36-.05-2.06-.05C31.71 192.01 0 206.36 0 242.22v178.05c0 26.69 21.25 48.7 48.34 50.12 34.41 1.81 120.56 9.08 177 37.47 4.68 2.37 9.66 3.5 14.66 3.84v.27h2.27c.09 0 .18.03.26.03h26.94c.09 0 .18-.03.26-.03H272v-.27c5-.34 9.98-1.48 14.66-3.84 56.44-28.39 142.59-35.65 177-37.47 27.09-1.42 48.34-23.44 48.34-50.12V242.22c0-35.86-31.71-50.2-52.09-50.2zM240 479.35c-.09-.04-.18-.02-.28-.07-59.59-29.97-144.43-38.45-189.7-40.84-10.1-.53-18.02-8.51-18.02-18.17V242.22c0-6.05 1.77-10 5.93-13.2 4.47-3.44 10.47-5.01 14.4-5.01 37.01 2.11 129.27 10.58 187.67 43.36v211.98zm240-59.08c0 9.66-7.92 17.64-18.03 18.17-45.27 2.38-130.11 10.86-189.76 40.87-.07.04-.14.02-.22.05V267.37c58.39-32.79 150.66-41.25 187.51-43.35l.39-.01c.2 0 20.09.49 20.09 18.21v178.05zM256 191.99c53.02 0 96-42.98 96-95.99S309.02 0 256 0s-96 42.98-96 95.99 42.98 96 96 96zM256 32c35.29 0 64 28.71 64 64s-28.71 64-64 64-64-28.71-64-64 28.71-64 64-64z"></path></svg></span>
              </div>
              <div class="menu-item__text">
                Library
              </div>
            </a>
`;
    mainMenu.appendChild(temp);
  });
}

function addObserverEmailButton() {
  const checkIfNull = async selector => {
    while (document.querySelector(selector) === null) {
      await new Promise(resolve => requestAnimationFrame(resolve));
    }
    return document.querySelector(selector);
  };
  checkIfNull("#compose-btn").then(() => {
    if (
      ENV.current_user_roles.includes("teacher") ||
      ENV.current_user_roles.includes("admin")
    ) {
      const delay = ms => new Promise(res => setTimeout(res, ms));
      let conversationsNav = document.querySelector(
        "div.ui-dialog-buttonpane.ui-widget-content.ui-helper-clearfix"
      );
      let parentButton = document.createElement("div");
      let classesToAdd = [
        "ui-button",
        "ui-widget",
        "ui-state-default",
        "ui-corner-all",
        "ui-button-text-only",
        "includeObserver"
      ];
      parentButton.classList.add(...classesToAdd);
      parentButton.setAttribute(
        "style",
        "margin:0 2px; min-width: 110px; background-color:wheat;"
      );
      parentButton.innerHTML = "Include Observers";
      conversationsNav.insertBefore(
        parentButton,
        conversationsNav.childNodes[1]
      );

      let pmLoader = document.createElement("div");
      let classesToAddPM = [
        "gameLoader",
        "pacMan"
      ];
      pmLoader.classList.add(...classesToAddPM);
      conversationsNav.insertBefore(
        pmLoader,
        conversationsNav.childNodes[2]
      );

      conversationsNav.querySelector(".includeObserver").addEventListener(
        "click",
        () => {
          let course = document.querySelector(
            '.message-header-input > input[type="hidden"]'
          );
          let courseNum = course.value.split("_")[1];
          let parentCollection = {data:[]};
          let kiddosArr = [];
          let emailParents = [];

          if (course.value) {
            //loading animation
            document.querySelector('.gameLoader.pacMan').style.setProperty("--playState", "play");
            //loading animation
            const fetchObservees = `/api/v1/courses/${courseNum}/enrollments?type[]=ObserverEnrollment&per_page=100`;

            function nextURL(linkTxt) {
              if (linkTxt) {
                let links = linkTxt.split(",");
                let nextRegEx = new RegExp('^<(.*)>; rel="next"$');

                for (let i = 0; i < links.length; i++) {
                  let matches = nextRegEx.exec(links[i]);
                  if (matches && matches[1]) {
                    //return right away
                    return matches[1];
                  }
                }
              } else {
                return false;
              }
            }
            //Next define your main call:

            const OPTIONS = {
              credentials: "same-origin",
              headers: {
                accept: "application/json"
              },
              timeout: 5000
            };
            async function main() {
              const response = await fetch(fetchObservees, OPTIONS);
              let data = await response.json();
              let res = {
                data: data,
                ok: response.ok,
                headers: response.headers
              };
              parentCollection.data = res.data;
              await loop(res);
            }
            //And then your loop

            async function loop(parents) {
              if (nextURL(parents.headers.get("Link")) === undefined) {
                return;
                //otherwise keep going.
              } else {
                const RESPONSE = await fetch(
                  nextURL(parents.headers.get("Link")),
                  OPTIONS
                );
                let data = await RESPONSE.json();
                let res = {
                  data: data,
                  ok: RESPONSE.ok,
                  headers: RESPONSE.headers
                };
                if (res.ok) {
                  //console.log(res.data);
                  parentCollection.data = parentCollection.data.concat(res.data);
                  //console.log(parents.data);
                  //console.info(Object.keys(parents.data).length);
                  //console.info(Object.keys(parentCollection.data).length);
                }
                await loop(res);
                //or:
                //await loop(res);
                //if you want to wait for it.

                //You need to call it from within an async function.
              }
            }
            //Now all you need to do is call the main function:
            const waitForMom = async () => {
              await main();
            };
            //or:
            //await main();
            //if you want to wait for it.
            //You need to call it from within an async function.
            waitForMom()
              .then(async () => {
                //console.log(parentCollection.data);
                document
                  .querySelectorAll(
                    'div.message-header-input input[name="recipients[]"]'
                  )
                  .forEach(kiddo => {
                    kiddosArr.push(kiddo.value);
                  });
                //console.log(kiddosArr);
                kiddosArr = kiddosArr.map(x => {
                  return parseInt(x, 10);
                });
              })
              .then(async () => {
                  parentCollection.data.forEach(element => {
                    //console.log(element.associated_user_id);
                    if (kiddosArr.includes(element.associated_user_id)) {
                      emailParents.push([element.user_id, element.user.name]);
                    }
                  });
                //}
              })
              .then(async () => {
                await delay(1000);
                if (emailParents.length > 0) {
                   //loading animation
                  document.querySelector('.gameLoader.pacMan').style.setProperty("--playState", "paused");
                  //loading animation
                  emailParents.forEach(parent => {
                    console.table(parent);
                    document.querySelectorAll(
                      ".ac-token-list"
                    )[1].innerHTML += 
                    `<li class="ac-token" style="background-color:wheat;">
                    ${parent[1]}
                    <a href="#" class="ac-token-remove-btn">
                      <i class="icon-x icon-messageRecipient--cancel"></i>
                      <span class="screenreader-only">
                        Remove recipient ${parent[1]}
                      </span>
                    </a>
                    <input type="hidden" name="recipients[]" value="${parent[0]}">
                    </li>`;
                  });
                } else {
                  popUpError(
                    `( ⊙０⊙) - I am not seeing an observers associated. Sorry. - (⊙▂⊙ )`
                  );
                }
              });
          } else {
            popUpError(
              `(×_×;）-In order to add parents you must select a course first. Re-fresh to try again. -（ｏ。ｏ；）`
            );
          }
        },
        { once: true }
      );
    }
  });
  //---------------------------------------------------------------------------
  const popUpError = msgTxt => {
    const msgHolder = document.querySelector("#flash_message_holder");
    const timeout = 9000;
    const daMsg = (msgHolder.innerHTML = 
    `<div role="alert" class="ic-flash-static ic-flash-error popUp">
    <div class="ic-flash__icon" aria-hidden="true">
      <i class="icon-warning"></i>
    </div>
    <h1>${msgTxt}</h1>
    </div>`);
    daMsg;
    setTimeout(() => {
      let popUp = document.querySelector(".popUp");
      popUp.parentNode.removeChild(popUp);
    }, timeout);
  };
  //---------------------------------------------------------------------------
}

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

//--------------------------------------------------TESTING PARTITION-----------------------------------------------//

// const apiTest = () => {
//   const url1 = "/api/v1/";
//   const options = {
//     'credentials': 'same-origin',
//     'headers': {
//       'accept': 'application/json'
//     },
//     'timeout': 5000
//   };
//   fetch("/api/v1/users/self/", options)
//     .then(response =>
//       response.json()
//         .then(data => ({
//           data: data,
//           ok: response.ok
//         })
//         ).then(res => {
//           console.log(res.data, res.ok);
//           let parent = res.data.id;

//         }));
// }
// apiTest();