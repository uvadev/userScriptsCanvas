function saraSudo() {
  let getUserValue = document
    .querySelector("div.ic-avatar > img")
    .getAttribute("alt");
  if (getUserValue !== null) {
    console.log(getUserValue);
    if (getUserValue === "Sara Mungall") {
      console.info(
        `%c all hail ${getUserValue} `,
        "background: #222; color: #0080ff"
      );
      const crossLink = document.querySelector(
        "a.btn.button-sidebar-wide.crosslist_link"
      );
      const unCrossList = document.querySelector(
        "a.btn.button-sidebar-wide.uncrosslist_link"
      );
      if (crossLink !== null) {
        crossLink.style.cssText = "display:block !important;";
        unCrossList.style.cssText = "display:block !important;";
      }
    }
  }
}
function saraSudo2() {
  if (ENV.current_user.display_name === "Sara Mungall") {
    console.info(
      `%c all hail ${ENV.current_user.display_name} `,
      "background: #222; color: #0080ff"
    );
    const crossLink = document.querySelector(
      "a.btn.button-sidebar-wide.crosslist_link"
    );
    const unCrossList = document.querySelector(
      "a.btn.button-sidebar-wide.uncrosslist_link"
    );
    if (crossLink !== null) {
      crossLink.style.cssText = "display:block !important;";
      unCrossList.style.cssText = "display:block !important;";
    }
  }
  else{
    console.info(
        `%c Hi my name is ${ENV.current_user.display_name}`,"color: #FF9FC1");
  }
}