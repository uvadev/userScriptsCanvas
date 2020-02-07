function iframeLonger() {
  const checkIfNull = async selector => {
    while (document.querySelector(selector) === null) {
      await new Promise(resolve => requestAnimationFrame(resolve));
    }
    return document.querySelector(selector);
  };

  checkIfNull("#main").then(() => {
    const iframeHeight = 1450;
    const edgyCourses = ['1756','2737','1757','2738','1758','1035'];
    const currentCourseNum = window.location.pathname
      .split("courses/")
      .pop()
      .split("/")[0];
    if (edgyCourses.includes(currentCourseNum)) {
      
      const handleLTI = (ltiTool) => { 
        console.info(
          `this is an Edgy Class set iFrame height to ${iframeHeight}`
        );
        ltiTool.removeAttribute("style");
        setTimeout(() => {
          ltiTool.setAttribute("style", `height: ${iframeHeight}px`);
        }, 2000);
       }

// set up the mutation observer
let observer = new MutationObserver((mutations, me) => {
  // `mutations` is an array of mutations that occurred
  console.log(mutations);
  console.log(me);
  // `me` is the MutationObserver instance
  let ltiTool = document.querySelector(".tool_content_wrapper");
  if (ltiTool) {
    handleLTI(ltiTool);
    return;
  }
});

// start observing
observer.observe(document, {
  childList: true,
  subtree: true
});
    }
  });
}