$(document).ready(function(){
    function SliderInit() {
        var apiRevoSlider = $('.tp-banner').show().revolution(
            {
                sliderType: "standard",
                sliderLayout: "fullwidth",
                jsFileLocation: "assets/vendor/rs-plugin/js/",
                dottedOverlay: "none",
                delay: 16000,
                hideThumbs: 200,

                thumbWidth: 100,
                thumbHeight: 50,
                thumbAmount: 5,

                navigation: {
                    keyboardNavigation: "on",
                    keyboard_direction: "horizontal",
                    mouseScrollNavigation: "off",
                    onHoverStop: "off",
                    touch: {
                        touchenabled: "on",
                        swipe_threshold: 75,
                        swipe_min_touches: 1,
                        swipe_direction: "horizontal",
                        drag_block_vertical: false
                    },
                    arrows: {
                        style: "hades",
                        enable: true,
                        hide_onmobile: false,
                        hide_onleave: false,
                        tmp: '<div class="tp-arr-allwrapper">	<div class="tp-arr-imgholder"></div></div>',
                        left: {
                            h_align: "left",
                            v_align: "center",
                            h_offset: 10,
                            v_offset: 0
                        },
                        right: {
                            h_align: "right",
                            v_align: "center",
                            h_offset: 10,
                            v_offset: 0
                        }
                    },
                },

                touchenabled: "on",
                onHoverStop: "on",

                swipe_velocity: 0.7,
                swipe_min_touches: 1,
                swipe_max_touches: 1,
                drag_block_vertical: false,

                parallax: {
                    type: 'mouse+scroll',
                    origo: 'slidercenter',
                    speed: 400,
                    levels: [5, 10, 15, 20, 25, 30, 35, 40,
                        45, 46, 47, 48, 49, 50, 51, 55],
                    disable_onmobile: 'on'
                },
                parallaxBgFreeze: "on",
                parallaxLevels: [7, 4, 3, 2, 5, 4, 3, 2, 1, 0],

                keyboardNavigation: "off",

                navigationHAlign: "center",
                navigationVAlign: "bottom",
                navigationHOffset: 0,
                navigationVOffset: 20,

                soloArrowLeftHalign: "left",
                soloArrowLeftValign: "center",
                soloArrowLeftHOffset: 10,
                soloArrowLeftVOffset: 0,

                soloArrowRightHalign: "right",
                soloArrowRightValign: "center",
                soloArrowRightHOffset: 10,
                soloArrowRightVOffset: 0,

                shadow: 0,
                fullWidth: "on",
                fullScreen: "off",

                spinner: "spinner4",

                stopLoop: "off",
                stopAfterLoops: -1,
                stopAtSlide: -1,

                shuffle: "off",

                hideSliderAtLimit: 0,
                hideCaptionAtLimit: 0,
                hideAllCaptionAtLilmit: 0,
                startWithSlide: 0,
            });
    }

    function NavButtons(){
        $(".scrollTo").click(function(){
            $([document.documentElement, document.body]).animate({
                scrollTop: $($(this).attr("data-go")).offset().top
            }, 1500);
        });
    }

    function WayPoints(){
        var waypointAbout = new Waypoint({
            element: document.getElementById('nosotros'),
            handler: function (dir) {
                $("#nosotros").addClass("shown");
            },
            offset: '85%'
        });
        var waypointProductos = new Waypoint({
            element: document.getElementById('productos'),
            handler: function (dir) {
                $("#productos").addClass("shown");
            },
            offset: '85%'
        });

        var waypointContacto = new Waypoint({
            element: document.getElementById('contacto'),
            handler: function (dir) {
                $("#contacto").addClass("shown");
            },
            offset: '85%'
        });
    }

    function Gallery(){
        $('.popup-gallery').magnificPopup({
            delegate: 'a', // child items selector, by clicking on it popup will open
            type: 'image'
            // other options
        });
    }

    function Contact(){
        $("#contactForm").submit(function(e){
            e.preventDefault();
            var jsonData = SerializeForm("#contactForm");
            console.log(jsonData);

            // Initialize Cloud Firestore through Firebase
            var db = firebase.firestore();
            db.collection("contactos").add({
                email: jsonData.mail,
                tel: jsonData.phone,
                comment: jsonData.message
            })
            .then(function (docRef) {
                swal({
                    title: "Mensaje enviado",
                    text: "Muchas gracias por contactarte con nosotros, pronto nos pondremos en contacto contigo.",
                    buttons: {
                        confirm: true,
                    },
                    icon: "success"
                });
                $("#contactForm")[0].reset();
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
                swal({
                    title: "Mensaje no enviado",
                    text: "Lo sentimos, ocurrió un problema, intentalo mas tarde.",
                    buttons: {
                        confirm: true,
                    },
                    icon: "error"
                });
                $("#contactForm")[0].reset();
            });

        })
    }
    function SerializeForm(form){
        var arr = $(form).serializeArray();
        var data = {};
        for(var i in arr){
            data[arr[i].name] = arr[i].value;
        }
        return data;
    }
    
    setTimeout(() => {
        $("#preloader").fadeOut();
        $(".wrapper").css("display", "block");
        $(".wrapper").css("opacity", "1");
        SliderInit();
        NavButtons();
        Gallery();
        Contact();
        setTimeout(() => {
            WayPoints();
        }, 500);
    }, 1750);
});