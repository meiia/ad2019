(function () {
    // 'use strict';

    // load dependencies
    var animationControl = require('./animation-control.js');
    // var reposition = require('./reposition.js');
    var draw = require('./draw.js');
    var message = require('./message.js');

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

        // bgm auto play(when the screen is first touched)
        $('html').one('touchstart', function () {
            bgMusic.play();
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
                if (swiper.activeIndex === 0) {
                    swiper.enableTouchControl();
                } else {
                    swiper.disableTouchControl();
                }
            }
        });

        // enter jinja
        $enterJinjaBtn.click(function () {
            mySwiper.slideTo(2);
        });

        // enter form
        $enterForm.click(function () {
            mySwiper.slideTo(3);
        });

        // reposition when the window resized
        // var repostionHands = function () {
        //     var pos = reposition({
        //         iw: 549,
        //         ih: 978,
        //         ew: 681,
        //         eh: 400,
        //         ex: 42,
        //         ey: 355
        //     });
            
        //     $('.item-hands').css({
        //         width: pos.w,
        //         height: pos.h,
        //         top: pos.y,
        //         left: pos.x
        //     });
        // }
        // repostionHands();
        // window.onresize = repostionHands;

        // When click the age input, turn it to a date type input.
        $('#ageinput').on('focus', function () {
            // var $this = $(this);
            this.type = 'date';
            this.focus();
        })

        // Submit
        $('#submit').click(function () {
            var name = encodeURI($('#name').val());
            var sex = $('#sex').val();
            var birthday = $('#birthday').val();

            if (name == '') {
                return alert('请输入姓名');
            } else if (sex == '') {
                return alert('请选择性别');
            } else if (birthday == '') {
                return alert('请选择生日');
            }

            // get data
            $.getJSON('./search', {
                name: decodeURI(name),
                sex: sex,
                birthday: birthday
            }, function (res) {
                // var res = {
                //     status: 200,
                //     data: {
                //         name: '美丫小姐姐',
                //         text1: '在Adobe之神的庇护下',
                //         text2: '工作更加得心应手，并获得',
                //         text3: '每3稿出现1次1稿过的隐藏技能！',
                //         result: 1,
                //         color: '#a10266'
                //     }
                // }
                if (res.status == 200) {
                    $('.item-drawing').show();
                    var img = new Image();
                    img.src = '../images/' + res.data.result + '.jpg';
                    img.onload = function () {
                        $('.item-drawing').hide();
                        draw({
                            cvs: 'result',
                            img: img,
                            text1: res.data.name + res.data.text1,
                            text2: res.data.text2,
                            text3: res.data.text3,
                        });
                        $('.slide-5').css('background-color', res.data.color);
                        // if ($('.result').height()/$('.result').width() > 1334/750) {
                        //     $('#result').css('width', '100%');
                        // } else {
                        //     $('#result').css('height', '100%');
                        // }
                        mySwiper.slideTo(5);
                    }
                } else {
                    alert(data.message);
                }
            });
        });

        $('#replaybtn').click(function () {
            mySwiper.slideTo(0);
        });

        $('#sharebtn').click(function () {
            message('长按保存图片，<br/>分享好运好朋友圈吧！');
        });

        // hide loading animation since everything is ready
        $('.loading-overlay').slideUp();
    });
})();
