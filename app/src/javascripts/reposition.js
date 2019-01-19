/**
 * Reposition function
 * when the window is resizing, we will calculate the new position of the element.
 */
module.exports = function (config) {
    var iw = config.iw;       // image's width
    var ih = config.ih;       // image's height
    var ew = config.ew;     // element's width
    var eh = config.eh;     // element's height
    var ex = config.ex;     // element's position x
    var ey = config.ey;     // element's position y
    var vw = document.body.clientWidth;     // viewport's width
    var vh = document.body.clientHeight;    // viewport's height

    // when the window's width is bigger
    if (vw/vh > iw/ih) {
        return {
            w: vw * ew / iw,
            h: vw * eh / iw,
            x: (vw - vw * ew / iw) / 2,
            y: ey - (vw * ih / iw - vh) / 2 
        }
    } else {
        return {
            w: vh * ew / ih,
            h: vh * eh / ih,
            x: ex - (vh * iw / ih - vw) / 2,
            y: (vh - vh * eh / ih) / 2
        }
    }
}