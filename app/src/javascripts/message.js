module.exports = function (text) {
    var $modal = $('#modal');
    $('#modal-text').html(text);
    $modal.show();
    setTimeout(function () {
        $modal.fadeOut(1000, function () {
            $modal.hide();
        })
    }, 1000);
}