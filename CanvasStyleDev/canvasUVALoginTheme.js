////////////////////////////////////////////////////
// DESIGN TOOLS CONFIG                            //
////////////////////////////////////////////////////
// Copyright (C) 2017  Utah State University
const DT_variables = {
  iframeID: '',
  // Path to the hosted USU Design Tools
  path: 'https://designtools.ciditools.com/',
  templateCourse: '5896',
  // OPTIONAL: Button will be hidden from view until launched using shortcut keys
  hideButton: false,
 // OPTIONAL: Limit by course format
 limitByFormat: false, // Change to true to limit by format
 // adjust the formats as needed. Format must be set for the course and in this array for tools to load
 formatArray: [
      'online',
      'on-campus',
      'blended'
  ],
  // OPTIONAL: Limit tools loading by users role
  limitByRole: false, // set to true to limit to roles in the roleArray
  // adjust roles as needed
  roleArray: [
      'student',
      'teacher',
      'admin'
  ],
  // OPTIONAL: Limit tools to an array of Canvas user IDs
  limitByUser: false, // Change to true to limit by user
  // add users to array (Canvas user ID not SIS user ID)
  userArray: [
  ]
};

// Run the necessary code when a page loads
$(document).ready(function () {
'use strict';
// This runs code that looks at each page and determines what controls to create
$.getScript(DT_variables.path + 'js/master_controls.js', function () {
  console.log('master_controls.js loaded');
});
});
////////////////////////////////////////////////////
// END DESIGN TOOLS CONFIG                        //
////////////////////////////////////////////////////

const UVAFunctions = () =>{logIn(); observerContactChange(); missingSubmissionsObserver(); addObserverEmailButton(); libraryMainNav(); sortGradesObservers(); addChooseChild(); replaceSupportButton(); saraSudo(); replacePointsWithPercentage(); sortCoursesPeopleView();};
if (document.readyState !== "loading") {
  console.info("1");
  UVAFunctions();
} else {
  document.addEventListener("DOMContentLoaded", function() {
    console.info("2");
    UVAFunctions();
  });
};
//personalize canvas for students
//<strong class="uvaFirst"></strong>
//<strong class="uvaLast"></strong>
//<img class="uvaPicture" alt="my avatar" width="200" height="200">
const uvaFirstName = ENV.current_user.display_name.split(" ")[0];
const uvaFirst = document.querySelectorAll('.uvaFirst');
if (uvaFirst.length !== 0) {
  uvaFirst.forEach(refer => {
    refer.innerHTML = uvaFirstName;
  });
};

const uvaLastName = ENV.current_user.display_name.split(" ")[1];
const uvaLast = document.querySelectorAll('.uvaLast');
if (uvaLast.length !== 0) {
  uvaLast.forEach(refer => {
    refer.innerHTML = uvaLastName;
  });
};

const uvaAvatar = ENV.current_user.avatar_image_url;
const uvaPicture = document.querySelectorAll('.uvaPicture');
if (uvaPicture.length !== 0) {
  uvaPicture.forEach(refer => {
    refer.setAttribute("src", uvaAvatar);
  });
};

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
    changePairing();
  });
};

function toggleVisibility() {
  const getResetText = document.querySelector(".flip-to-front");
  const getHidden = document.querySelector("#forgot_password_form");
  const toggleLogin = document.querySelector("#login_form");
  toggleLogin.classList.toggle("front", "back");
  getHidden.classList.toggle("back", "front");
  if (getResetText !== null) {
    getResetText.innerHTML =
      '<span style="background-color:white;">after you submit please check your email</span>';
  };
};

function changePairing() {
  const checkIfNull = async selector => {
    while (document.querySelector(selector) === null) {
      await new Promise(resolve => requestAnimationFrame(resolve));
    }
    return document.querySelector(selector);
  };
  checkIfNull("#ui-id-2").then(() => {
    const getPairingLink = document.querySelector("#ui-id-2 .pairing-code-text > a");
    if (getPairingLink !== null){
      getPairingLink.setAttribute(`href`, `http://ior.ad/76YW`);
    }
  }
  );
};

function saraSudo() {
  if (ENV.current_user.display_name === "someNames" ) {
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
    const unAlive = document.querySelector(
      "#right-side a[href$='delete']"
    );
    const resetCourse = document.querySelector(
      "#right-side > div > a.Button.Button--link.Button--link--has-divider.Button--course-settings.reset_course_content_button"
    );
    if (crossLink !== null) {
      crossLink.style.cssText = "display:block !important;";
      unCrossList.style.cssText = "display:block !important;";
    }
    if (unAlive !== null) {
      unAlive.style.cssText = "display:block !important;";
    }
    if (resetCourse !== null) {
      resetCourse.style.cssText = "display:block !important;";
    }
  } else {
    console.info(
      `%c Hi my name is ${ENV.current_user.display_name} `,
      "color: #FF9FC1"
    );
  };
};

function observerContactChange() {
  if(ENV.current_user_id){
    if (ENV.current_user_roles.includes("observer") && window.location.href.indexOf("/profile/settings") > -1) {
      console.info(
        `%c parent, guardian, or learning coach ${ENV.current_user.display_name} `,
        "background: #222; color: #fcba03"
      );
      //enable email addition in the profile section
      const emailIcon = document.querySelector('a.add_email_link.icon-add');
      if (emailIcon !== null){
        emailIcon.style.display = "block";
      }
      /* enable the ability to change email in the profile options */
      const emailInput = document.querySelector("#communication_channel_email");
      if (emailInput !== null) {
        emailInput.style.display = "block";
      }
    }
  }
};

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
};

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
};

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
};

function addChooseChild() {
  if (ENV["current_user_roles"].includes("observer") && !ENV["current_user_roles"].includes("teacher") &&
    window.location.href.includes("calendar")) {
    const fetchObservees = `/api/v1/users/self/observees?per_page=50`;
    let preVal;
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
            //console.log(res);
            const children = res.data;
            let p = [];
            children.forEach(child => {
                p.push(new Promise(function (resolve) {
                    console.log(child);
                    let childId = child.id;
                    const fetchCourses = `/api/v1/users/${childId}/courses?per_page=100&include[]=term&enrollment_state=active`;
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
                            //console.info(courses);
                            let listCourses = [];
                            courses.data.forEach(courseX => {
                                //console.log(courseX);
                                if (courseX.term){
                                    listCourses.push("course_" + courseX.id);
                                    //console.log("here" + listCourses);
                                }
                            });
                            resolve({
                                childName: child.name,
                                childId: child.id,
                                courses1: listCourses
                            });
                        }
                    });
                }));
            });
            Promise.all(p).then(outPut => {
                const storeData = outPut.map(x => { return {childId: x.childId, courses1: x.courses1}});
                document.querySelector("#calendar_header").innerHTML += `
              <select id="calendar_children" onchange="check_status(check_status(this,this.value))">
                <option class="calendar_child">Select Child</option>
                ${outPut.map(x => `<option data-id=${x.childId} class="calendar_child" value="calendar?include_contexts=${x.courses1}">${x.childName}</option>`)}
              </select>
            `;
            setTimeout(()=>{parentCrossOffWrapper();},5000);
            });
        }
    });
  }
}
const check_status = (obj,val) =>{
    obj.options[obj.selectedIndex].getAttribute('data-id');
    console.info(obj);
    localStorage.setItem('idNum', JSON.stringify(obj.options[obj.selectedIndex].getAttribute('data-id')));
    localStorage.setItem('courseVal', JSON.stringify(val));
    location=val;}

const parentCrossOffWrapper = async () => {
  let date = new Date(),
    y = date.getFullYear(),
    m = date.getMonth();
  let firstDay = new Date(y, m, 1).toISOString();
  let lastDay = new Date(y, m + 1, 0).toISOString();

  let kidNum = JSON.parse(localStorage.getItem("idNum"));
  let courseList = [];
  let completed = [];
  let courseCollection;
  let courseArray = JSON.parse(localStorage.getItem("courseVal")).split(
    /(?:,|=)/
  );
  courseArray.shift();
  courseArray.forEach((course) => {
    courseList.push("context_codes[]=" + course);
  });
  courseList = courseList.join("&");

  const options = {
    credentials: "same-origin",
    headers: {
      accept: "application/json",
    },
    timeout: 5000,
  };

  const nextURL = (linkTxt) => {
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

  const loopy = async (courses) => {
    if (nextURL(courses.headers.get("Link")) === undefined) {
      return;
      //otherwise keep going.
    } else {
      const rspns = await fetch(nextURL(courses.headers.get("Link")), options);
      let moreData = await rspns.json();
      let resP = {
        data: moreData,
        ok: rspns.ok,
        headers: rspns.headers,
      };
      if (resP.ok) {
        //console.log(resP.data);
        courseCollection = courseCollection.concat(resP.data);
        // console.info(Object.keys(kidd.data).length);
        // console.info(Object.keys(dataCollection).length);
      }
      await loopy(resP);
    }
  };

  const parentCrossOff = async () => {
    const fetchUrl = `/api/v1/users/${kidNum}/calendar_events?${courseList}&type=assignment&excludes[]=description&start_date=${firstDay}&end_date=${lastDay}&per_page=100`;

    fetch(fetchUrl, options).then((response) =>
      response
        .json()
        .then(() => ({
          ok: response.ok,
          headers: response.headers
        }))
        .then(async (res) => {
          if (res.ok) {
            courseCollection = res.data;
            console.log(courseCollection);
            await loopy(res);
            console.info("courseCollection", courseCollection);
          }
        })
        .then(async () => {
          courseCollection.forEach((one) => {
            if (one.assignment.user_submitted === true) {
              completed.push(one.assignment.name);
            }
          });
          console.info("completed", completed);
        })
        .then(async () => {
          console.info("last", completed);
          [...document.querySelectorAll("#calendar-app span.fc-title")].forEach(
            (assName) => {
              if (completed.includes(assName.outerText.split(":\n")[1])) {
                assName.setAttribute("class", "calendar__event--completed");
              }
            }
          );
        })
    );
  };
  parentCrossOff();
};



function sortGradesObservers() {
  const checkIfNull = async selector => {
    while (document.querySelector(selector) === null) {
      await new Promise(resolve => requestAnimationFrame(resolve));
    }
    return document.querySelector(selector);
  };

  checkIfNull("table.course_details.observer_grades").then(() => {
    if (
      ENV.current_user_roles.includes("observer") &&
      window.location.pathname.includes("/grades")
    ) {
      let table, tRows;
      table = document.querySelector("table.course_details.observer_grades");
      tRows = document.querySelectorAll(
        "table.course_details.observer_grades > tbody > tr"
      );
      const filterRows = async () => {
        tRows.forEach(one => {
          if (
            !one.innerHTML.includes("select") &&
            one.querySelector(".percent").innerText.includes("no grade")
          ) {
            one.style.display = "none";
          }
        });
      };
      filterRows().then(() => {
        const getCellValue = (tr, idx) => tr.children[idx].innerText || tr.children[idx].textContent;

const comparer = (idx, asc) => (a, b) => ((v1, v2) => 
    v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2)
    )(getCellValue(asc ? a : b, idx), getCellValue(asc ? b : a, idx));

// do the work...
const daThing = th => {
    const table = document.querySelector("#content > table.course_details.observer_grades");
    Array.from(tRows)
        .sort(comparer(Array.from(th.parentNode.children).indexOf(th), this.asc = !this.asc))
        .forEach(tr => table.appendChild(tr) );
}
daThing(document.querySelectorAll('td')[0]);
      });
    }
  });
};

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
<a id="global_nav_library_link" class="ic-app-header__menu-list-link" href="https://clever.com/oauth/instant-login?client_id=..." target="_blank">
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
};

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
         }//,
        // { once: true }
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
};

function missingSubmissionsObserver() {
  const checkIfNull = async selector => {
    while (document.querySelector(selector) === null) {
      await new Promise(resolve => requestAnimationFrame(resolve));
    }
    return document.querySelector(selector);
  };
  checkIfNull(".recent-activity-header").then(() => {
    if (ENV.current_user_roles.includes("observer") && !ENV.current_user_roles.includes("teacher")) {

      const observeePage = document.querySelector(".recent-activity-header");
      const fetchObservees = `/api/v1/users/self/observees?per_page=30`;
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
      const tableClasses = [`ic-Table`, `ic-Table--condensed`];
      const filteringConfig = {
        'l8 sub after': `2022-01-06T01:01:01Z`, //ISO or function
        'locked for a user': false, //bool
        'omit from final grade': false, //bool
        'display points possible if greater or equal to': 0, //num
        'submittable':`&filter[]=submittable` //either `&filter[]=submittable` || `` blank
      };
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
        observeePage.insertAdjacentHTML( 'beforebegin',
        `
        <h2 id="being-observed">Students Being Observed</h2>
        <a href="/grades" class="Button">View Grades</a>
        <div class="gameLoader pacMan"></div>
        <br>
        <h5>Click a name below to see missing submissions</h5>
        <div class="observees-list-container"></div>
        <div class="missing-submissions-container"></div>
        `
        )
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
          `/api/v1/users/${progeny}/missing_submissions?include[]=course${filteringConfig['submittable']}&per_page=100`,
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
        let classesToAddDV = [`ic-Dashboard-Activity`]; //add more classes
        dataView.classList.add(...classesToAddDV);
        docFrag.appendChild(dataView);
        //dataView.appendChild(tHead);

        //header
        //LOOP
        let filteredDataCollection = dataCollection.filter(
          lex =>
            lex.due_at >= filteringConfig["l8 sub after"] &&
            lex.locked_for_user === filteringConfig["locked for a user"] &&
            lex.omit_from_final_grade === filteringConfig["omit from final grade"] &&
            lex.points_possible >= filteringConfig["display points possible if greater or equal to"]
        );
        filteredDataCollection.reverse();
        // console.log(filteredDataCollection);
        let totLen = Object.keys(filteredDataCollection).length;
        let totes = document.createElement("h3");
        totes.style.color = "#005299";
        totes.textContent = `${nomenclature} -> Current Total of Missing Assignments (${totLen})`;
        dataView.appendChild(totes);
        const kidTable = document.createElement("table");
        kidTable.classList.add(...tableClasses);
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
          let nameTrunc = lateSub.name.substring(0, 50);
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
          kidA.textContent += ` ${nameTrunc} `;
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
};

function sortCoursesPeopleView() {
  const checkIfNull = async (selector) => {
    while (document.querySelector(selector) === null) {
      await new Promise((resolve) => requestAnimationFrame(resolve));
    }
    return document.querySelector(selector);
  };
  checkIfNull("#user-info-fieldsets").then(() => {
    const enrollmentsFieldset = document.querySelector("#courses > #content");
    enrollmentsFieldset.setAttribute("style","resize: vertical; overflow: scroll; font-size: 0.8em; height:200px;");
    const subFieldset = document.querySelector("#courses_list > div > ul");
    subFieldset.setAttribute("style", "margin-left: 5px; font-size: 0.9em; margin-bottom: 10px; overflow:auto");

    let ulList = document.querySelector("#courses_list > div > ul");
    let items = ulList.querySelectorAll("li");

    for (
      let i = 0, arr = ["active", "completed", "unpublished"];
      i < arr.length;
      i++
    ) {
      for (let j = 0; j < items.length; j++) {
        if (~(" " + items[j].className + " ").indexOf(" " + arr[i] + " "))
          ulList.appendChild(items[j]);
      }
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
