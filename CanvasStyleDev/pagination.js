const nextURL = linkTxt => {
  if (linkTxt) {
    let links = linkTxt.split(",");
    let nextRegEx = new RegExp('^<(.*)>; rel="next"$');

    for (let i = 0; i < links.length; i++) {
      let matches = nextRegEx.exec(links[i]);
      if (matches && matches[1]) {
        //return right away
        return matches[1];
      }
    }
  } else {
    return false;
  }
};