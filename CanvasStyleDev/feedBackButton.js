function moduleFilter() 
{
  const checkIfNull = async selector => {
    while (document.querySelector(selector) === null) {
      await new Promise(resolve => requestAnimationFrame(resolve));
    }
    return document.querySelector(selector);
  };
  checkIfNull("div.file-upload-submission-attachment").then(element => 
  {
    if (ENV.current_user_roles.includes('student'))
    {
      const feedBackButton = document.querySelector("div.file-upload-submission-attachment .modal_preview_link");
      feedBackButton.classList.remove('Button--link');
      feedBackButton.setAttribute('class','Button Button--primary');
    }
  });
}
