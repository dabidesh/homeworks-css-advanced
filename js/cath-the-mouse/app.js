var windowRazmeri = new Array(0, 0);
windowRazmeri = daiWinInnerWH();

window.onload = function () {
    var img = document.getElementById("imageId")
    addEvent('click', img, catchMouse)
    addEvent('mouseover', img, chaseMouse)
    chaseMouse();
}


function chaseMouse() {
    img = document.getElementById('imageId');
    //alert(img3)
    //style = window.getComputedStyle(img);
    //posi = style.getPropertyValue('position');
    img.style.position = "absolute";
    img.style.left = (Math.random() * (windowRazmeri[0]-100)) + "px";
    img.style.top = (Math.random() * (windowRazmeri[1]-100)) + "px";
    //alert((Math.random() * 300) + "px")
}
function catchMouse() {
    alert("Congratulations, You catch the mouse Jerry!");
}

function addEvent(event, elem, func) {
if (elem.addEventListener) // W3C DOM
    elem.addEventListener(event, func, false);
else if (elem.attachEvent) { // Експлодър DOM
    elem.attachEvent("on" + event, func);
}
else {
    elem[event] = func;
}
}
function getElementById0(name) {
    var o = document.getElementById
        ? document.getElementById(name) : document.all
            ? document.all[name] : document.layers[name]
    return o
}
//вътрешни р-ри на джама
//@return [W,H]
function daiWinInnerWH() {
    var myWidth = 0, myHeight = 0;
    if (typeof (window.innerWidth) == 'number') {
        //Добър уеб четец
        myWidth = window.innerWidth;
        myHeight = window.innerHeight;
    } else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
        //Експлодър 6+ в режим 'standards compliant mode'
        myWidth = document.documentElement.clientWidth;
        myHeight = document.documentElement.clientHeight;
    } else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
        //Експлодър 4
        myWidth = document.body.clientWidth;
        myHeight = document.body.clientHeight;
    }
    return [myWidth, myHeight];
}