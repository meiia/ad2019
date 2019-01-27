module.exports = function (arr, callback) {
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