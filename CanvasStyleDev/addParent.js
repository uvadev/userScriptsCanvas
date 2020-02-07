// document.querySelectorAll('.ac-token-list')[1].innerHTML = `<li class="ac-token">
//   Kaleb Shelton

//   <a href="#" class="ac-token-remove-btn">
//     <i class="icon-x icon-messageRecipient--cancel"></i>
//     <span class="screenreader-only">
//       Remove recipient Kaleb Shelton
//     </span>
//   </a>


//   <input type="hidden" name="recipients[]" value="79">
// </li>` ;

// notes------------------------------------------------------------------------------------------

let course = document.querySelector('.message-header-input > input[type="hidden"]');
let courseNum = course.value.split('_')[1];
let parents = {};
let kiddosArr = [];
let emailParents = [];

const fetchObservees = `/api/v1/courses/${courseNum}/enrollments?enrollment_type=ObserverEnrollment`;
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
                            parents = res;
                          }else{
                            
                          }
                          })).then(
                            ()=>{
                              console.log(parents.data);
                              document.querySelectorAll('div.message-header-input input[name="recipients[]"]').forEach(kiddo=>{kiddosArr.push(kiddo.value)});
                              kiddosArr = kiddosArr.map(x => { 
                                return parseInt(x, 10); 
                              });
                            }).then(()=>{
                              parents.data.forEach(element => {
                                if (kiddosArr.includes(element.associated_user_id)){
                                  emailParents.push([element.user_id,element.user.name]);
                                }
                              });
                            //let filteredParents = kiddosArr.some(element => Object.keys(parents).includes(el))
                            }).then(()=>{
                              emailParents.forEach(parent => {
                                console.table(parent);
                               document.querySelectorAll(
                                ".ac-token-list"
                              )[1].innerHTML += `<li class="ac-token" style="background-color:wheat;">
  ${parent[1]}

  <a href="#" class="ac-token-remove-btn">
    <i class="icon-x icon-messageRecipient--cancel"></i>
    <span class="screenreader-only">
      Remove recipient ${parent[1]}
    </span>
  </a>


  <input type="hidden" name="recipients[]" value="${parent[0]}">
</li>`;
}); })
                          