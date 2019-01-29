var $modal = $('#modal');
$('#modal-change').click(function () {
    $('#submit').click();
    $modal.hide();
})
$('#modal-save').click(function () {
    $modal.hide();
})

module.exports = function (text, hasBtn) {
    $('#modal-text').html(text);
    $modal.show();
    if (hasBtn) {
        $('#modal .modal-btn').show();
        $('#modal').addClass('modal-hasbtn');
        return;
    }
    $('#modal').removeClass('modal-hasbtn');
    $('#modal .modal-btn').hide();
    setTimeout(function () {
        $modal.fadeOut(1000, function () {
            $modal.hide();
        })
    }, 1000);
}