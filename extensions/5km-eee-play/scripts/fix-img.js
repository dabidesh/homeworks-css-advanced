console.log('working ...');

window.onclick = (e) => {
  //check if the clicked element is an div
  if (e.target.tagName === 'A') {
    let parentElement = e.target.parentNode;
    if (parentElement.tagName == 'DIV') {
      e.preventDefault();

      let style = window.getComputedStyle(parentElement);
      let width = parseInt(style.width);
      let height = parseInt(style.height);
      console.log(width, height);

      debugger;
      if ((width === 300 || width === 150) && height === 200) {
        if (width === 300) {
          parentElement.style.width = '150px';
        } else if (width === 150) {
          parentElement.style.width = '300px';
        }
      }
    }
  }
};
