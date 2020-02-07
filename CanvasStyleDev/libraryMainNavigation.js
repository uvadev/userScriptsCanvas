function LibraryMainNav() {
  const checkIfNull = async selector => {
    while (document.querySelector(selector) === null) {
      await new Promise(resolve => requestAnimationFrame(resolve));
    }
    return document.querySelector(selector);
  };
  checkIfNull("#menu").then(() => {
    const mainMenu = document.querySelector('#menu.ic-app-header__menu-list');
let temp = new DocumentFragment();
let liNode = document.createElement('li');
liNode.setAttribute('class','menu-item ic-app-header__menu-list-item');
temp.appendChild(liNode);
const liNodeApp = temp.querySelector('.menu-item.ic-app-header__menu-list-item');
liNodeApp.innerHTML=`
<a id="global_nav_library_link" class="ic-app-header__menu-list-link" href="https://clever.com/oauth/instant-login?client_id=e9883f835c1c58894763&district_id=5c9915855260ef0001c80f9b" target="_blank">
              <div class="menu-item-icon-container">
                <span aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" class="ic-icon-svg ic-icon-svg--inbox" version="1.1" x="0" y="0" viewBox="0 0 500 500" enable-background="new 0 0 280 280" xml:space="preserve"><path fill="currentColor" d="M459.91 192.02c-.7 0-1.39.02-2.06.05-49.8 2.84-140.51 13-201.84 47.57-61.33-34.57-152.05-44.73-201.84-47.57-.67-.04-1.36-.05-2.06-.05C31.71 192.01 0 206.36 0 242.22v178.05c0 26.69 21.25 48.7 48.34 50.12 34.41 1.81 120.56 9.08 177 37.47 4.68 2.37 9.66 3.5 14.66 3.84v.27h2.27c.09 0 .18.03.26.03h26.94c.09 0 .18-.03.26-.03H272v-.27c5-.34 9.98-1.48 14.66-3.84 56.44-28.39 142.59-35.65 177-37.47 27.09-1.42 48.34-23.44 48.34-50.12V242.22c0-35.86-31.71-50.2-52.09-50.2zM240 479.35c-.09-.04-.18-.02-.28-.07-59.59-29.97-144.43-38.45-189.7-40.84-10.1-.53-18.02-8.51-18.02-18.17V242.22c0-6.05 1.77-10 5.93-13.2 4.47-3.44 10.47-5.01 14.4-5.01 37.01 2.11 129.27 10.58 187.67 43.36v211.98zm240-59.08c0 9.66-7.92 17.64-18.03 18.17-45.27 2.38-130.11 10.86-189.76 40.87-.07.04-.14.02-.22.05V267.37c58.39-32.79 150.66-41.25 187.51-43.35l.39-.01c.2 0 20.09.49 20.09 18.21v178.05zM256 191.99c53.02 0 96-42.98 96-95.99S309.02 0 256 0s-96 42.98-96 95.99 42.98 96 96 96zM256 32c35.29 0 64 28.71 64 64s-28.71 64-64 64-64-28.71-64-64 28.71-64 64-64z"></path></svg></span>
              </div>
              <div class="menu-item__text">
                Library
              </div>
            </a>
`;
console.log(temp);
mainMenu.appendChild(temp);
  });
}