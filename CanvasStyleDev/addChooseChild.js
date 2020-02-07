function addChooseChild() {
  if (ENV["current_user_roles"].includes("observer") &&
    window.location.href.includes("calendar")) {
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
                                console.log(courseX);
                                if (courseX.term &&
                                    Date.now() > Date.parse(courseX.term.start_at) &&
                                    Date.now() < Date.parse(courseX.term.end_at)) {
                                    listCourses.push("course_" + courseX.id);
                                    console.log("here" + listCourses);
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