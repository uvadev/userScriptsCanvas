console.info(`more than 1 kiddo`);
    $.ajax({
      method: "get",
      url: "/api/v1/users/self/observees?per_page=50",
      dataType: "json"
    })
      .then(children => {
        var p = [];
        for (let child of children) {
          p.push(
            new Promise(function(resolve, reject) {
              $.ajax({
                method: "get",
                url:
                  "/api/v1/users/" +
                  child.id +
                  "/courses?per_page=50&include[]=term",
                dataType: "json"
              })
                .then(courses => {
                  var listCourses = [];
                  for (let course of courses) {
                    if (
                      course.term &&
                      Date.now() > Date.parse(course.term.start_at) &&
                      Date.now() < Date.parse(course.term.end_at)
                    ) {
                      listCourses.push("course_" + course.id);
                    }
                  }
                  resolve({
                    name: child.name,
                    courses: listCourses
                  });
                })
                .fail(err => {
                  reject(err);
                });
            })
          );
        }
        Promise.all(p).then(res => {
          $("#calendar_header").append(`
        <select id="calendar_children" onchange="location = this.value;">
          <option class="calendar_child">Select Child</option>
          ${res.map(
            x =>
              `<option class="calendar_child" value="calendar?include_contexts=${x.courses}">${x.name}</option>`
          )}
        </select>
      `);
        });
      })
      .fail(err => {
        throw err;
      });