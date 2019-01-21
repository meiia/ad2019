module.exports = function (config) {
    var cvs = document.getElementById(config.cvs);
    console.log(cvs)
    var ctx = cvs.getContext("2d");
    var iw = config.iw;       // image's width
    var ih = config.ih;       // image's height
    var ew = config.ew;     // element's width
    var eh = config.eh;     // element's height
    var ex = config.ex;     // element's position x
    var ey = config.ey;     // element's position y
    var vw = document.body.clientWidth;     // viewport's width
    var vh = document.body.clientHeight;    // viewport's height
    var img = new Image();

    img.src = "../images/1.jpg";
    // Content's width is bigger than height
    // if (vw/vh > iw/ih) {
    img.onload = function () {
        ctx.drawImage(img, 0, 0);
    }
    // }
}