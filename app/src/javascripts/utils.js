var loadImg = function (arr, callback) {
  var cnt = 0;
  var images = {};

  for (index in arr) {
    images[index] = new Image();
    images[index].src = arr[index];
    images[index].onload = function () {
      if (++ cnt >= arr.length) {
        callback(images)
      }
    };
  }
}

var checkLength = function(value, maxLength) {
  var txtLength = 0;
  for (var i = 0; i < value.length; i++) {
    if (/[\u4e00-\u9fa5]/.test(value[i])) { //通过正则表达式来识别汉字,每个汉字占两个字符
      txtLength += 2;
    } else {
      txtLength ++;
    }
    if (txtLength > maxLength) {
      value = value.substr(0, i);
      // alert("以达到最大输入值:"+maxLength+"个字符或"+maxLength/2+"个汉字!");
      // break;
      return false
    }
  }
  return true;
}

var getUrlParam = function (name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
  var r = window.location.search.substr(1).match(reg);  //匹配目标参数
  if (r != null) return unescape(r[2]); return null; //返回参数值
}

module.exports = {
  loadImg: loadImg,
  checkLength: checkLength,
  getUrlParam: getUrlParam
}