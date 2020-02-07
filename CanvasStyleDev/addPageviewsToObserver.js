function viewKidPPV() {
  const checkIfNull = async selector => {
    while (document.querySelector(selector) === null) {
      await new Promise(resolve => requestAnimationFrame(resolve));
    }
    return document.querySelector(selector);
  };

  checkIfNull(".user-observees").then(element => {
    const obsList = document.querySelector('.observees-list.collectionViewItems');
    let listOfKiddos = obsList.querySelectorAll('li');
    console.table(listOfKiddos);
    for (let kid of listOfKiddos) {
      let kidName = kid.innerHTML;
      kid.innerHTML = `<a class="element_toggler" aria-controls="simple_modal"
      aria-label="Toggle simple_modal modal">
      ${kidName}</a>
      <div id="simple_modal" style="display: none;">
          <div class="ui-widget-overlay container middle-xs center-xs"
          style="text-align: left; display: flex; position: fixed; z-index: 11; 
                          left: 84px; top: 0; width: 100%; height: 100%;">
              <div id="modal" class="ui-corner-all" 
                   style="background-color: #fff; padding: 10px; position: absolute;
                          width: 100vw; max-width: 600px;">
                  ${kidPageViews}
                  <div class="text-right">
                      <a class="element_toggler btn btn-primary ui-corner-all"
                      role="button" aria-controls="simple_modal"
                      aria-label="Toggle simple_modal modal">
                          <span class="ui-button-text">Close</span>
                      </a>
                  </div>
              </div>
          </div>
      </div>`
    }
  });}