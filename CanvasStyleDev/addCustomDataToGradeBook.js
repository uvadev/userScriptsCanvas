function addCustomDataToGradeBook() 
{
  const checkIfNull = async selector => {
    while (document.querySelector(selector) === null) {
      await new Promise(resolve => requestAnimationFrame(resolve));
    }
    return document.querySelector(selector);
  };
  checkIfNull("div.canvas_0.grid-canvas").then(() => 
  {
    if (ENV.current_user_roles.includes('teacher')){
      setTimeout(() => {
    console.log(`time`);
    {
        console.clear();
        //let getThemeColor = getComputedStyle(document.documentElement).getPropertyValue('--ic-brand-primary-darkened-15');
        const TTS =`<svg height="17" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M288 144a110.94 110.94 0 0 0-31.24 5 55.4 55.4 0 0 1 7.24 27 56 56 0 0 1-56 56 55.4 55.4 0 0 1-27-7.24A111.71 111.71 0 1 0 288 144zm284.52 97.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400c-98.65 0-189.09-55-237.93-144C98.91 167 189.34 112 288 112s189.09 55 237.93 144C477.1 345 386.66 400 288 400z"></path></svg>`;
        const HR = `<svg height="17" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M352 96c0-53.02-42.98-96-96-96s-96 42.98-96 96 42.98 96 96 96 96-42.98 96-96zM233.59 241.1c-59.33-36.32-155.43-46.3-203.79-49.05C13.55 191.13 0 203.51 0 219.14v222.8c0 14.33 11.59 26.28 26.49 27.05 43.66 2.29 131.99 10.68 193.04 41.43 9.37 4.72 20.48-1.71 20.48-11.87V252.56c-.01-4.67-2.32-8.95-6.42-11.46zm248.61-49.05c-48.35 2.74-144.46 12.73-203.78 49.05-4.1 2.51-6.41 6.96-6.41 11.63v245.79c0 10.19 11.14 16.63 20.54 11.9 61.04-30.72 149.32-39.11 192.97-41.4 14.9-.78 26.49-12.73 26.49-27.06V219.14c-.01-15.63-13.56-28.01-29.81-27.09z"></path></svg>`;
        const CALC = `<svg height="17" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M400 0H48C22.4 0 0 22.4 0 48v416c0 25.6 22.4 48 48 48h352c25.6 0 48-22.4 48-48V48c0-25.6-22.4-48-48-48zM128 435.2c0 6.4-6.4 12.8-12.8 12.8H76.8c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4zm0-128c0 6.4-6.4 12.8-12.8 12.8H76.8c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4zm128 128c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4zm0-128c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4zm128 128c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8V268.8c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v166.4zm0-256c0 6.4-6.4 12.8-12.8 12.8H76.8c-6.4 0-12.8-6.4-12.8-12.8V76.8C64 70.4 70.4 64 76.8 64h294.4c6.4 0 12.8 6.4 12.8 12.8v102.4z"></path></svg>`;
        //const SG = `<svg height="17" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M256 288c0 35.35 28.66 64 64 64 35.35 0 64-28.65 64-64s-28.65-64-64-64c-35.34 0-64 28.65-64 64zm224 0c0 35.35 28.66 64 64 64 35.35 0 64-28.65 64-64s-28.65-64-64-64c-35.34 0-64 28.65-64 64zM96 352c35.35 0 64-28.65 64-64s-28.65-64-64-64c-35.34 0-64 28.65-64 64s28.66 64 64 64zm480 32h-64c-35.34 0-64 28.65-64 64v32c0 17.67 14.33 32 32 32h128c17.67 0 32-14.33 32-32v-32c0-35.35-28.66-64-64-64zm-224 0h-64c-35.34 0-64 28.65-64 64v32c0 17.67 14.33 32 32 32h128c17.67 0 32-14.33 32-32v-32c0-35.35-28.66-64-64-64zm-224 0H64c-35.34 0-64 28.65-64 64v32c0 17.67 14.33 32 32 32h128c17.67 0 32-14.33 32-32v-32c0-35.35-28.66-64-64-64zM96 64h448v128c24.68 0 46.98 9.62 64 24.97V49.59C608 22.25 586.47 0 560 0H80C53.53 0 32 22.25 32 49.59v167.38C49.02 201.62 71.33 192 96 192V64z"></path></svg>`;
        //const IND = `<svg height="17" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path></svg>`;
        const STT = `<svg height="17" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M448 0H64C28.7 0 0 28.7 0 64v288c0 35.3 28.7 64 64 64h96v84c0 9.8 11.2 15.5 19.1 9.7L304 416h144c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64zM215.4 310.6l-48.2 5.4c-6.5.7-11.9-4.8-11.2-11.2l5.4-48.2 96.3-96.3 54 54-96.3 96.3zm150.7-150.7l-31.8 31.8-54-54 31.8-31.8c7.9-7.9 20.7-7.9 28.6 0l25.4 25.4c7.9 7.9 7.9 20.7 0 28.6z"></path></svg>`;
        const ET = `<svg height="17" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M368 32h4c6.627 0 12-5.373 12-12v-8c0-6.627-5.373-12-12-12H12C5.373 0 0 5.373 0 12v8c0 6.627 5.373 12 12 12h4c0 91.821 44.108 193.657 129.646 224C59.832 286.441 16 388.477 16 480h-4c-6.627 0-12 5.373-12 12v8c0 6.627 5.373 12 12 12h360c6.627 0 12-5.373 12-12v-8c0-6.627-5.373-12-12-12h-4c0-91.821-44.108-193.657-129.646-224C324.168 225.559 368 123.523 368 32zM48 32h288c0 110.457-64.471 200-144 200S48 142.457 48 32zm288 448H48c0-110.457 64.471-200 144-200s144 89.543 144 200zM285.621 96H98.379a12.01 12.01 0 0 1-11.602-8.903 199.464 199.464 0 0 1-2.059-8.43C83.054 71.145 88.718 64 96.422 64h191.157c7.704 0 13.368 7.145 11.704 14.667a199.464 199.464 0 0 1-2.059 8.43A12.013 12.013 0 0 1 285.621 96zm-15.961 50.912a141.625 141.625 0 0 1-6.774 8.739c-2.301 2.738-5.671 4.348-9.248 4.348H130.362c-3.576 0-6.947-1.61-9.248-4.348a142.319 142.319 0 0 1-6.774-8.739c-5.657-7.91.088-18.912 9.813-18.912h135.694c9.725 0 15.469 11.003 9.813 18.912z"></path></svg>`;
        //const PS = `<svg height="17" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M445.13 326.27l-10.66-31.97c-7.33-22.02-27.44-36.74-50.44-37.87L384 128C384 57.31 326.69 0 256 0h-64C121.31 0 64 57.31 64 128l-.03 128.43c-23 1.13-43.11 15.85-50.41 37.84L2.85 326.3c-5.66 17.03-2.78 35.89 7.72 50.44 5.57 7.73 13.02 13.65 21.41 17.65L32 496c0 8.84 7.16 16 16 16h16c8.84 0 16-7.16 16-16v-96h288.04l-.04 96c0 8.84 7.16 16 16 16h16c8.84 0 16-7.16 16-16l.04-101.61c8.39-4 15.84-9.92 21.41-17.65 10.49-14.55 13.37-33.41 7.68-50.47zM296 59.13c23.8 13.88 40 39.39 40 68.87v128h-40V59.13zM200 48h48v208h-48V48zm-48 11.13V256h-40V128c0-29.48 16.2-54.99 40-68.87zM48.38 341.48l10.72-32.03c1.06-3.27 4.12-5.45 7.56-5.45h314.69c3.44 0 6.5 2.19 7.59 5.48l10.66 31.97c1.77 5.33-2.24 10.55-7.59 10.55H56c-5.42 0-9.33-5.28-7.62-10.52z" ></path></svg>`;
        //const AB = `<svg height-"17" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M372.57 112.641v-10.825c0-43.612-40.52-76.691-83.039-65.546-25.629-49.5-94.09-47.45-117.982.747C130.269 26.456 89.144 57.945 89.144 102v126.13c-19.953-7.427-43.308-5.068-62.083 8.871-29.355 21.796-35.794 63.333-14.55 93.153L132.48 498.569a32 32 0 0 0 26.062 13.432h222.897c14.904 0 27.835-10.289 31.182-24.813l30.184-130.958A203.637 203.637 0 0 0 448 310.564V179c0-40.62-35.523-71.992-75.43-66.359zm27.427 197.922c0 11.731-1.334 23.469-3.965 34.886L368.707 464h-201.92L51.591 302.303c-14.439-20.27 15.023-42.776 29.394-22.605l27.128 38.079c8.995 12.626 29.031 6.287 29.031-9.283V102c0-25.645 36.571-24.81 36.571.691V256c0 8.837 7.163 16 16 16h6.856c8.837 0 16-7.163 16-16V67c0-25.663 36.571-24.81 36.571.691V256c0 8.837 7.163 16 16 16h6.856c8.837 0 16-7.163 16-16V101.125c0-25.672 36.57-24.81 36.57.691V256c0 8.837 7.163 16 16 16h6.857c8.837 0 16-7.163 16-16v-76.309c0-26.242 36.57-25.64 36.57-.691v131.563z"></path></svg>`;
        const FILL = `<svg height="17" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z"></path></svg>`
        const students = Array.prototype.slice.apply(document.querySelectorAll("a.student-grades-link"));

          students.forEach((student) => {
            console.info(student);
              let studentId = student.getAttribute('data-student_id');
                    const fetchUrl = `/api/v1/users/${studentId}/custom_data/user_accommodations?ns=accommodations`;
                    const options = {
                      'credentials': 'same-origin',
                      'headers': {
                        'accept': 'application/json'
                      },
                      'timeout': 5000
                    };
                    fetch(fetchUrl, options)
                      .then(response =>
                        response.json()
                          .then(data => ({
                            data: data,
                            ok: response.ok
                          })
                          ).then(res => {
                            if (res.ok){
                            if(res.data.data.TTS){student.innerHTML += TTS};
                            if(res.data.data.HR){student.innerHTML += HR};
                            if(res.data.data.Calc){student.innerHTML += CALC};
                            //if(res.data.data.SG){student.innerHTML += SG};
                            //if(res.data.data.IND){student.innerHTML += IND};
                            if(res.data.data.STT){student.innerHTML += STT};
                            if(res.data.data.ET){student.innerHTML += ET};
                            //if(res.data.data.AB){student.innerHTML += AB};
                            //if(res.data.data.PS){student.innerHTML += PS};
                          }else{
                            student.innerHTML += FILL;
                          }
                          }));
          });
        }
      }, 6000);
      }
    });
}

// let observer = new MutationObserver(function(mutations, me) {
//   // `mutations` is an array of mutations that occurred
//   // `me` is the MutationObserver instance
//   let studentContainer = document.querySelector("container_0");
//   if (studentContainer) {
//     handleLTI(ltiTool);

//     students.forEach(student => {
//       console.info(student);
//       let studentId = student.getAttribute("data-student_id");
//       const fetchUrl = `/api/v1/users/${studentId}/custom_data/user_accommodations?ns=accommodations`;
//       const options = {
//         credentials: "same-origin",
//         headers: {
//           accept: "application/json"
//         },
//         timeout: 5000
//       };
//       fetch(fetchUrl, options).then(response =>
//         response
//           .json()
//           .then(data => ({
//             data: data,
//             ok: response.ok
//           }))
//           .then(res => {
//             if (res.ok) {
//               if (res.data.data.TTS) {
//                 student.innerHTML += TTS;
//               }
//               if (res.data.data.HR) {
//                 student.innerHTML += HR;
//               }
//               if (res.data.data.Calc) {
//                 student.innerHTML += CALC;
//               }
//               //if(res.data.data.SG){student.innerHTML += SG};
//               //if(res.data.data.IND){student.innerHTML += IND};
//               if (res.data.data.STT) {
//                 student.innerHTML += STT;
//               }
//               if (res.data.data.ET) {
//                 student.innerHTML += ET;
//               }
//               //if(res.data.data.AB){student.innerHTML += AB};
//               //if(res.data.data.PS){student.innerHTML += PS};
//             } else {
//               student.innerHTML += FILL;
//             }
//           })
//       );
//     });
//     return;
//   }
// });
// // start observing
// observer.observe(document, {
//   childList: true,
//   subtree: true
// });
// }
// }, 6000);
// }
// });
// }
