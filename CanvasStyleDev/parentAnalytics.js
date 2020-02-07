const fetchObservees = `/api/v1/users/self/observees?per_page=50`;
                    const options = {
                      'credentials': 'same-origin',
                      'headers': {
                        'accept': 'application/json'
                      },
                      'timeout': 5000
                    };
                    fetch(fetchObservees, options)
                      .then(response =>
                        response.json()
                          .then(data => ({
                            data: data,
                            ok: response.ok
                          })
                          ).then(res => {
                            if (res.ok){
                            console.log(res);
                            const children = res.data;
                            children.forEach(child => {
                              console.log(child);
                              let childId = child.id;
                              const fetchCourses = `/api/v1/users/${childId}/courses?per_page=50&include[]=term`;
                    const options0 = {
                      'credentials': 'same-origin',
                      'headers': {
                        'accept': 'application/json'
                      },
                      'timeout': 5000
                    };
                    fetch(fetchCourses, options0)
                      .then(response0 =>
                        response0.json()
                          .then(data0 => ({
                            data: data0,
                            ok: response0.ok
                          })
                          ).then(courses => {
                            if (courses.ok){
                              console.log(courses)

                          }else{

                          }
                          }));
                            });
                          }else{
                            
                          }
                          }));
                          