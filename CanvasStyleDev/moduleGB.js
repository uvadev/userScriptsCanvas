function moduleGB() {
    const checkIfNull = async selector => {
      while (document.querySelector(selector) === null) {
        await new Promise(resolve => requestAnimationFrame(resolve));
      }
      return document.querySelector(selector);
    };
  
    checkIfNull(".sJGfW_bGBk").then(element => {
        document.querySelector(".sJGfW_bGBk").setAttribute('aria-checked','true');
    });
  }