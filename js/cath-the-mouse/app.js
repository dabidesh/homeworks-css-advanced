var windowRazmeri = new Array(0, 0);
var interv = 0;
var chase = 0;
windowRazmeri = daiWinInnerWH();

var widthMouse = 200
var heightMouse = 200

var img, elChaseId, interval_txt0, itxt;

window.onload = function () {
    var img = document.getElementById("imageId")

    addEvent('click', img, catchMouse)
    addEvent('mouseover', img, chaseMouse)
    chaseMouse();

    //добавя текст
    interval_txt0 = getElementById0('nMouse');
    itxt = ('innerText' in interval_txt0) ? 'innerText' : 'textContent';
    interval_txt0[itxt] = Number(interv) + ' мишлета';  //после само с това

    elChaseId = getElementById0('nChase');
    elChaseId['innerText'] = Number(chase)
}
window.onresize = function () {
    windowRazmeri = daiWinInnerWH();
    chaseMouse();

    elChaseId = getElementById0('nChase');
    elChaseId['innerText'] = Number(chase--)
}

function chaseMouse() {
    img = document.getElementById('imageId');
    //alert(img3)
    //style = window.getComputedStyle(img);
    //posi = style.getPropertyValue('position');
    img.style.position = "absolute";
    img.style.left = (Math.random() * (windowRazmeri[0] - widthMouse)) + "px";
    img.style.top = (Math.random() * (windowRazmeri[1] - heightMouse)) + "px";

    elChaseId = getElementById0('nChase');
    elChaseId['innerText'] = Number(chase++)

}
function catchMouse() {
    //alert("Congratulations, You catch the mouse Jerry!");
    interv++
    interval_txt0[itxt] = Number(interv) + ' мишлета';

    chaseMouse()

    elChaseId = getElementById0('nChase');
    elChaseId['innerText'] = Number(chase--);
}
function incMouse() {
    //img = document.getElementById('imageId');
    widthMouse = widthMouse + 100
    heightMouse = heightMouse + 100
    img.style.width = widthMouse + "px"
    img.style.height = heightMouse + "px"

    chaseMouse()

    elChaseId = getElementById0('nChase');
    elChaseId['innerText'] = Number(chase--);
}
function decMouse() {
    widthMouse = widthMouse - 50
    heightMouse = heightMouse - 50
    img.style.width = widthMouse + "px"
    img.style.height = heightMouse + "px"
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