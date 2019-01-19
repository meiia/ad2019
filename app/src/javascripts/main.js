(function () {
    'use strict';

    // load dependencies
    var animationControl = require('./animation-control.js');
    var reposition = require('./reposition.js');

    $(document).ready(function () {
        var bgMusic = $('audio').get(0);
        var $btnMusic = $('.btn-music');
        var $upArrow = $('.up-arrow');
        var $enterJinjaBtn = $('#enterJinja');
        var $enterForm = $('#enterForm');

        // background music control
        $btnMusic.click(function () {
            if (bgMusic.paused) {
                bgMusic.play();
                $(this).removeClass('paused');
            } else {
                bgMusic.pause();
                $(this).addClass('paused');
            }
        });

        // init Swiper
        var mySwiper = new Swiper('.swiper-container', {
            mousewheelControl: true,
            effect: 'coverflow',    // slide, fade, coverflow or flip
            speed: 400,
            direction: 'vertical',  // 'horizontal' or 'vertical' is OK
            fade: {
                crossFade: false
            },
            coverflow: {
                rotate: 100,
                stretch: 0,
                depth: 300,
                modifier: 1,
                slideShadows: false     // do disable shadows for better performance
            },
            flip: {
                limitRotation: true,
                slideShadows: false     // do disable shadows for better performance
            },
            onInit: function (swiper) {
                animationControl.initAnimationItems();  // get items ready for animations
                animationControl.playAnimation(swiper); // play animations of the first slide
            },
            onTransitionStart: function (swiper) {     // on the last slide, hide .btn-swipe
                // if (swiper.activeIndex === swiper.slides.length - 1) {
                if (swiper.activeIndex === 0) {
                    $upArrow.show();
                } else {
                    $upArrow.hide();
                }
            },
            onTransitionEnd: function (swiper) {       // play animations of the current slide
                animationControl.playAnimation(swiper);
            },
            onTouchStart: function (swiper, event) {    // mobile devices don't allow audios to play automatically, it has to be triggered by a user event(click / touch).
                if (!$btnMusic.hasClass('paused') && bgMusic.paused) {
                    bgMusic.play();
                }
            }
        });

        // enter jinja
        $enterJinjaBtn.click(function () {
            mySwiper.slideTo(3);
        });

        // enter form
        $enterForm.click(function () {
            mySwiper.slideTo(4);
        });

        // reposition when the window resized
        var repostionHands = function () {
            var pos = reposition({
                iw: 549,
                ih: 978,
                ew: 681,
                eh: 400,
                ex: 42,
                ey: 355
            });
            
            $('.item-hands').css({
                width: pos.w,
                height: pos.h,
                top: pos.y,
                left: pos.x
            });
        }
        repostionHands();
        window.onresize = repostionHands;

        // set the default age to 25
        // $('#ageinput').click(function (e) {
        //     e.preventDefault();
        //     $('#ageinput').hide();
        //     $('#ageselect_dummy').show();
        //     $('#ageselect_dummy').click();
        // });
        var options = '';
        for (var i = 1; i <= 100; i++) {
            options += '<option value="' + i + '">' + i + '</option>';
        }
        $('#ageselect').html(options);
        $('#ageselect').val('20');
        // $('#ageselect').mobiscroll().select({
        //     // theme: 'ios',
        //     lang: 'zh',
        //     display: 'bottom',
        //     // minWidth: 200
        // });

        // hide loading animation since everything is ready
        $('.loading-overlay').slideUp();
    });
})();
