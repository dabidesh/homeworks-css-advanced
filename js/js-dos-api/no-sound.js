window.onload = () => {
  let intViewportWidth = window.innerWidth
  let intViewportHeight = window.innerHeight

  const style = window.getComputedStyle(startMessageId)
  let width = style.getPropertyValue('width')
  let height = style.getPropertyValue('height')

  width = width.substring(0, width.length - 2)
  height = height.substring(0, height.length - 2)

  startMessageId.style.top = ((intViewportHeight / 2) -
    ((+height) / 2)) + 'px'
  startMessageId.style.left = ((intViewportWidth / 2) -
    ((+width) / 2)) + 'px'
  startMessageId.style.position = 'fixed'
};

document.onkeydown = evn => {
  evn = evn || window.event

  if (evn.keyCode === 123) {
    let canvasId = document.getElementById('jsdos')
    canvasId.style.width = '50%'
    canvasId.style.height = '50%'
  }
}