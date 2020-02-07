function replaceSupport() {
    const checkIfNull = async selector => {
      while (document.querySelector(selector) === null) {
        await new Promise(resolve => requestAnimationFrame(resolve));
      }
      return document.querySelector(selector);
    };
  
    checkIfNull('#help_tray > form')
      .then((element) => {
        element.removeAttribute('action');
        element.querySelectorAll('fieldset > input:not(.first)').forEach(el => el.remove());
        
        function updateFields() {
          let subjectInput = element.querySelector('fieldset').querySelectorAll('input')[0].value;
          subjectInput = encodeURIComponent(subjectInput);
          let descriptionInput = element.querySelector('fieldset').querySelector('textarea').value;
          descriptionInput = encodeURIComponent(descriptionInput);
          let affectingInput = element.querySelector('fieldset').querySelector('select.ic-Input').selectedOptions[0].text;
          affectingInput = encodeURIComponent(affectingInput);
          let mailToBuild = `mailto:support@uview.academy?subject=${subjectInput}%20${affectingInput}&body=${descriptionInput}`;
          console.info(`%c ${mailToBuild}`, 'color:#00a1f7');
          let submitTicket = element.querySelector('fieldset > .ic-HelpDialog__form-actions > button.Button.Button--primary');
          if(submitTicket !== null){submitTicket.parentNode.removeChild(submitTicket);}
          let submitTicketNew = element.querySelector('fieldset > .ic-HelpDialog__form-actions');
          let aExist = element.querySelector('fieldset > .ic-HelpDialog__form-actions > a');
          let newButton = submitTicketNew.innerHTML = `<a class="btn btn-primary thisOne" onClick="window.open(${mailToBuild}, 'Mail');event.preventDefault()" href=${mailToBuild} target="_blank">Send an e-mail</a>`;
          newButton;
          if(aExist){aExist.remove();newButton;};
          //return {subjectInput, descriptionInput, affectingInput,mailToBuild};
        }
        // let {subjectInput, descriptionInput, affectingInput,mailToBuild} = updateFields();
        element.addEventListener('input',updateFields);
      });
}