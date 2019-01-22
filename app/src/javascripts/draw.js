// CanvasRenderingContext2D.prototype.wrapText = function (text, x, y, maxWidth, lineHeight) {
//     if (typeof text != 'string' || typeof x != 'number' || typeof y != 'number') {
//         return;
//     }

//     var context = this;
//     var canvas = context.canvas;

//     if (typeof maxWidth == 'undefined') {
//         maxWidth = (canvas && canvas.width) || 300;
//     }
//     if (typeof lineHeight == 'undefined') {
//         lineHeight = (canvas && parseInt(window.getComputedStyle(canvas).lineHeight)) || parseInt(window.getComputedStyle(document.body).lineHeight);
//     }

//     // 字符分隔为数组
//     var arrText = text.split('');
//     var line = '';

//     for (var n = 0; n < arrText.length; n++) {
//         var testLine = line + arrText[n];
//         if (arrText[n+1])
//         var metrics = context.measureText(testLine);
//         var testWidth = metrics.width;
//         if (testWidth > maxWidth && n > 0) {
//             context.fillText(line, x, y);
//             line = arrText[n];
//             y += lineHeight;
//         } else {
//             line = testLine;
//         }
//     }
//     context.fillText(line, x, y);
// };

module.exports = function (config) {
    var cvs = document.getElementById(config.cvs);
    var ctx = cvs.getContext("2d");
    var iw = config.iw || 750;       // image's width
    var ih = config.ih || 1334;       // image's height
    var ew = config.ew || 390;     // element's width
    var eh = config.eh;     // element's height
    var ex = config.ex || 185;     // element's position x
    var ey = config.ey || 1040;     // element's position y
    var vw = document.body.clientWidth;     // viewport's width
    var vh = document.body.clientHeight;    // viewport's height
    var lineh = 38;
    var text1 = config.text1;
    var text2 = config.text2;
    var text3 = config.text3;
    var img = config.img;

    ctx.drawImage(img, 0, 0, iw, ih);
    ctx.font = '26px Arial';
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.shadowColor = '#1e49ac';
    ctx.ShadowOffsetX = 1;
    ctx.shadowOffsetY = 1;
    ctx.shadowBlur = 6;
    ctx.fillText(text1, iw / 2, ey, ew);
    ctx.fillText(text2, iw / 2, ey + lineh, ew);
    ctx.fillText(text3, iw / 2, ey + 2 * lineh, ew);
}