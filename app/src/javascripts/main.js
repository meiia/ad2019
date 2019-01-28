(function () {
    // 'use strict';

    // load dependencies
    var animationControl = require('./animation-control.js');
    var draw = require('./draw.js');
    var message = require('./message.js');
    var loadImg = require('./loadImg.js');

    $(document).ready(function () {
        var bgMusic = $('audio').get(0);
        var $btnMusic = $('.btn-music');
        var $upArrow = $('.up-arrow');
        // var $enterJinjaBtn = $('#enterJinja');
        var $enterForm = $('#enterForm');
        var resultHistory = [];

        // reset swiper-container height and width
        $('.swiper-container').css({
            height: document.body.clientHeight,
            width: document.body.clientWidth
        })

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
            // mousewheelControl: true,
            effect: 'fade',    // slide, fade, coverflow or flip
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
            // onTransitionStart: function (swiper) {     // on the last slide, hide .btn-swipe
            //     // if (swiper.activeIndex === swiper.slides.length - 1) {
            //     if (swiper.activeIndex === 0) {
            //         $upArrow.show();
            //     } else {
            //         $upArrow.hide();
            //     }
            // },
            onTransitionEnd: function (swiper) {       // play animations of the current slide
                animationControl.playAnimation(swiper);
                if (swiper.activeIndex != 3) {
                    swiper.enableTouchControl();
                } else {
                    swiper.disableTouchControl();
                }
            }
        });

        // enter jinja
        $('.slide-2 .item-image-3').click(function () {
            $('#wave').show();
            setTimeout(function () {
                $('#wave').hide();
            }, 2000);
            setTimeout(function () {
                mySwiper.slideTo(2);
            }, 1000);
        });

        // enter form
        $enterForm.click(function () {
            mySwiper.slideTo(3);
        });

        // When click the age input, turn it to a date type input.
        $('#birthdayselect').click(function () {
            $('#birthdayselect').css('opacity', 1);
        })
        $('input, select').blur(function () {
            document.body.scrollTop = 0;
        })
        $('#sex').change(function () {
            if ($(this).val() !== '') {
                $(this).css('color', '#fff');
            } else {
                $(this).css('color', '#f7f397');
            }
        })

        // Submit
        $('#submit').click(function () {
            var name = encodeURI($('#name').val());
            var sex = $('#sex').val();
            var birthday = $('#birthdayselect').val();
            if (name == '') {
                return message('请输入姓名');
            // } else if (name.length > 5) {
                // return message('姓名不能超过5个字，<br />请重新输入');
            } else if (sex == '') {
                return message('请选择性别');
            } else if (birthday == '') {
                return message('请选择生日');
            }
            $('.drawing').show();

            var qrcode = new Image();
            qrcode.src = '../images/qrcode_02.png';

            // $.getJSON('http://47.101.222.238/search', {
            $.getJSON('./search', {
                name: decodeURI(name),
                sex: sex,
                birthday: birthday,
                history: resultHistory.join(',')
            }, function (res) {
                if (res.status == 200) {
                    var d = function (img) {
                        $('.drawing').hide();
                        draw({
                            cvs: 'result',
                            img: img,
                            text1: res.data.name + res.data.text1,
                            text2: res.data.text2,
                            text3: res.data.text3,
                            qrcode: qrcode
                        });
                        $('.slide-5').css('background-color', res.data.color);
                        mySwiper.slideTo(5);
                    };
                    var timeYes = false;
                    var imageYes = false;
                    var hasShown = false;
                    var img = new Image();

                    if (resultHistory.length >= 21) {
                        resultHistory = [];
                    }
                    resultHistory.push(res.data.result);
                    img.src = '../images/' + res.data.result + '.jpg';
                    img.onload = function () {
                        imageYes = true;
                        if (timeYes && !hasShown) {
                            d(img);
                            hasShown = true;
                        }
                    }
                    setTimeout(function () {
                        timeYes = true;
                        if (imageYes && !hasShown) {
                            d(img);
                            hasShown = true;
                        }
                    }, 3000);
                } else {
                    message(data.message);
                }
            });
        });

        $('#replaybtn').click(function () {
            message('不满足这张符文，</br>还想换成其他的？', true);
        });

        $('#sharebtn').click(function () {
            message('长按保存图片，<br/>将好运分享出去吧！');
        });

        // hide loading animation since everything is ready
        loadImg([
            '../images/01_light.png',
            '../images/01_bg.png',
        ], function () {
            $('.loading-text').hide();
            $('.loaded-text').show();
            $('.loading-overlay').click(function () {
                $('.loading-overlay').slideUp(function () {
                    $('.slide-1 .item-text').show();
                    if (!$btnMusic.hasClass('paused') && bgMusic.paused) {
                        bgMusic.play();
                    }
                    $btnMusic.show();
                    $upArrow.show();
                });
            })
        });
    });
})();
