function replacePointsWithPercentage() {
    const checkIfNull = async selector => {
      while (document.querySelector(selector) === null) {
        await new Promise(resolve => requestAnimationFrame(resolve));
      }
      return document.querySelector(selector);
    };
    checkIfNull('#assignment_grading_type')
      .then((element) => {
        console.info(`%c set default grade view as percentage`, 'color:#f7f300');
        element.querySelector("option[value='points']").removeAttribute('selected');
        element.querySelector("option[value='percent']").setAttribute('selected','');
      });
}