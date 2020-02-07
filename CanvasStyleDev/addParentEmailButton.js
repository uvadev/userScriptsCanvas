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
                    console.log(matches[1]);
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
                  console.log(res.data);
                  console.info(Object.keys(parents.data).length);
                  console.info(Object.keys(parentCollection.data).length);
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
                console.log(parentCollection.data);
                document
                  .querySelectorAll(
                    'div.message-header-input input[name="recipients[]"]'
                  )
                  .forEach(kiddo => {
                    kiddosArr.push(kiddo.value);
                  });
                //console.log(kiddosArr);
              }).then(async () => {
                  kiddosArr = kiddosArr.map(x => {
                  return parseInt(x, 10);
                });
              })
              .then(async () => {
                  parentCollection.data.forEach(element => {
                    console.log(element.associated_user_id);
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
addObserverEmailButton();
