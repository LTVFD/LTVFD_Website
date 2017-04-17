$(document).ready(function() {
    "use strict";

    //Parallax Effect
    $('.parallax').parallax("50%", 0.2);

    // Custom Scrollbar
    var nice = $("html").niceScroll({
        cursorwidth: 8,
        cursorborder: "0px solid #fff",
        cursorborderradius: '0'
    });

    // prettyPhoto image lightbox
    $("a[data-lightbox^='prettyPhoto']").prettyPhoto({
        hook: 'data-lightbox'
    });

    // Gallery Carousel
    $(".appscreens ul").owlCarousel({
        items: 4,
        pagination: true,
    });

    // Custom Scrollbar
    $(".client-testimonials ul").owlCarousel({
        items: 1,
        pagination: true,
        singleItem: true,
    });

    // Custom Scrollbar
    $(".our-clients ul").owlCarousel({
        items: 5,
        pagination: true,
    });

    // Headhesive init
    var options = { // set options
        offset: 350,
        classes: {
            clone: 'at-clone',
            stick: 'at-stick',
            unstick: 'at-unstick'
        },
        onInit: function() {
            $('.at-clone .at-btn').removeClass('at-btn-white');
            $('.at-clone .logo img').prop('src', "images/LTVFD_logo_K.png");
        }
    };

    var at_fixed_menu = new Headhesive('.header-navbar', options); // init

    // One page nav
    $('.main-nav ul').onePageNav({
        changeHash: true,
    });





    // FunFact
    $('.at-funfact-counter').appear();
    $(document.body).on('appear', '.at-funfact-counter', function(e, $affected) {
        $affected.each(function(i) {

            if (parseInt($(this).data('runit'))) {
                $(this).countTo({
                    speed: 3000,
                    refreshInterval: 50
                });
                $(this).data('runit', "0");
            };

        });
    });
    ////// mailchimp //////
    $(".mc-subscribe").ajaxChimp({
        callback: mcCallback,
        url: "//facebook.us15.list-manage.com/subscribe/post?u=089804d610863b49f05152ce1&amp;id=45e1b39b68" // Replace your mailchimp post url inside double quote "".  
    });

    function mcCallback(res) {
        if (res.result === 'success') {
            $('.subscribe-result').html('<i class="pe-7s-check"></i>' + res.msg).delay(500).slideDown(1000).delay(10000).slideUp(1000);
        } else if (res.result === 'error') {
            $('.subscribe-result').html('<i class="pe-7s-close-circle"></i>' + res.msg).delay(500).slideDown(1000).delay(10000).slideUp(1000);
        }
    }

    /*
     * Contact Form Validation Code
     */
    function checkEmpty(selector) {
        if (selector.val() == "" || selector.val() == selector.prop("placeholder")) {
            selector.addClass('formFieldError', 500);
            return false;
        } else {
            selector.removeClass('formFieldError', 500);
            return true;
        }
    }

    function validateEmail(email) {
        var regex = /^[a-zA-Z0-9._-]+@([a-zA-Z0-9.-]+\.)+[a-zA-Z0-9.-]{2,4}$/;
        if (!regex.test(email.val())) {
            email.addClass('formFieldError', 500);
            return false;
        } else {
            email.removeClass('formFieldError', 500);
            return true;
        }
    }

    $('.contact-form').submit(function() {
        var $this = $(this),
            result = true;
        
        if (!checkEmpty($this.find('#fname'))) {
            result = false;
        }
        if (!validateEmail($this.find('#memail'))) {
            result = false;
        }
        if (!checkEmpty($this.find('#mmessage'))) {
            result = false;
        }

        if (result == false) {
            return false;
        }

        var $btn = $("#send").button('loading');
        var data = $this.serialize();

        $.ajax({
            url: "https://formspree.io/firelieutenant@lebanontownshipfire.org",
            method: "POST",
            crossDomain: true,
            data: data,
            cache: false,
            dataType: "json",
            success: function(html) {
                if (html.success == 'email sent') {
                    $('#result-message').addClass('alert alert-success').html('<strong>Success!</strong> Message Sent. We will be in contact with you soon.').delay(500).slideDown(500).delay(10000).slideUp('slow');

                    $('#send').prop('disabled', true);
                    $btn.button('reset')
                }
                else {
                    $('#result-message').addClass('alert alert-danger').html('<strong>Error!</strong> Message Sending Error! Please try again or call us at 908-638-4550.').delay(500).slideDown(500).delay(10000).slideUp('slow');
                    $btn.button('reset')
                }
            },
            error: function(a, b) {
                if (b == 'error') {
                    $('#result-message').addClass('alert alert-danger').html('<strong>Error!</strong> Message Sending Error! Please try again or call us at 908-638-4550.').delay(500).slideDown(500).delay(10000).slideUp('slow');
                };
                $btn.button('reset')
            },
        });

        return false;
    });


    ///////////////////////////////////////////////////////
    //////////////// Animate Background ///////////////////
    ///////////////////////////////////////////////////////

    $('.animatebg').each(function() {
        var currentValues = {
            light1_ambient: '#384452',
            light1_diffuse: '#5b8291',
            light2_ambient: '#000000',
            light2_diffuse: '#0f0d0e',
            columns: 25,
            rows: 15,
            material_ambient: '#444444',
            material_diffuse: '#ffffff',
            light_zoffset: 100,
            depth: 1,
            speed: 0.002,
            threeD: true
        };

        if ($(this).data('fss-light1-ambient') !== undefined && $(this).data('fss-light1-ambient') !== false) {
            currentValues.light1_ambient = $(this).data('fss-light1-ambient');
        }
        if ($(this).data('fss-light1-diffuse') !== undefined && $(this).data('fss-light1-diffuse') !== false) {
            currentValues.light1_diffuse = $(this).data('fss-light1-diffuse');
        }
        if ($(this).data('fss-light2-ambient') !== undefined && $(this).data('fss-light2-ambient') !== false) {
            currentValues.light2_ambient = $(this).data('fss-light2-ambient');
        }
        if ($(this).data('fss-light2-diffuse') !== undefined && $(this).data('fss-light2-diffuse') !== false) {
            currentValues.light2_diffuse = $(this).data('fss-light2-diffuse');
        }
        if ($(this).data('fss-columns') !== undefined && $(this).data('fss-columns') !== false) {
            currentValues.columns = $(this).data('fss-columns');
        }
        if ($(this).data('fss-rows') !== undefined && $(this).data('fss-rows') !== false) {
            currentValues.rows = $(this).data('fss-rows');
        }
        if ($(this).data('fss-material-ambient') !== undefined && $(this).data('fss-material-ambient') !== false) {
            currentValues.material_ambient = $(this).data('fss-material-ambient');
        }
        if ($(this).data('fss-material-diffuse') !== undefined && $(this).data('fss-material-diffuse') !== false) {
            currentValues.material_diffuse = $(this).data('fss-material-diffuse');
        }
        if ($(this).data('fss-light-zoffset') !== undefined && $(this).data('fss-light-zoffset') !== false) {
            currentValues.light_zoffset = $(this).data('fss-light-zoffset');
        }
        if ($(this).data('fss-depth') !== undefined && $(this).data('fss-depth') !== false) {
            currentValues.depth = $(this).data('fss-depth');
        }
        if ($(this).data('fss-speed') !== undefined && $(this).data('fss-speed') !== false) {
            currentValues.speed = $(this).data('fss-speed');
        }
        if ($(this).data('fss-threed') !== undefined) {
            currentValues.threeD = $(this).data('fss-threed');
        }
        var container = this,
            renderer = new FSS.SVGRenderer(),
            scene = new FSS.Scene(),
            light = new FSS.Light(currentValues.light1_ambient, currentValues.light1_diffuse),
            light2 = new FSS.Light(currentValues.light2_ambient, currentValues.light2_diffuse),
            geometry = new FSS.Plane(2500, 1500, currentValues.columns, currentValues.rows),
            material = new FSS.Material(currentValues.material_ambient, currentValues.material_diffuse),
            mesh = new FSS.Mesh(geometry, material);



        // Augment vertices for animation
        var v, vertex;
        for (v = geometry.vertices.length - 1; v >= 0; v--) {
            vertex = geometry.vertices[v];
            vertex.anchor = FSS.Vector3.clone(vertex.position);
            vertex.step = FSS.Vector3.create(
                Math.randomInRange(0.2, 1.0),
                Math.randomInRange(0.2, 1.0),
                Math.randomInRange(0.2, 1.0)
            );
            vertex.time = Math.randomInRange(0, Math.PIM2);
        }

        var now, start = Date.now();



        function initialise() {
            scene.add(mesh);
            scene.add(light);
            scene.add(light2);
            container.appendChild(renderer.element);
            window.addEventListener('resize', resize);
        }

        function resize() {
            renderer.setSize(container.offsetWidth, container.offsetHeight);
        }

        function animate() {
            now = Date.now() - start;
            if (currentValues.threeD) {
                update();
            };

            light.setPosition(300 * Math.sin(now * 0.001), 200 * Math.cos(now * 0.0005), currentValues.light_zoffset);
            light2.setPosition(600 * Math.sin(now * 0.001), 400 * Math.cos(now * 0.0005), currentValues.light_zoffset);
            renderer.render(scene);
            requestAnimationFrame(animate);
        }


        function update() {
            var ox, oy, oz, v, vertex, offset = currentValues.depth;


            // Animate Vertices
            for (v = geometry.vertices.length - 1; v >= 0; v--) {
                vertex = geometry.vertices[v];
                ox = Math.sin(vertex.time + vertex.step[0] * now * currentValues.speed);
                oy = Math.cos(vertex.time + vertex.step[1] * now * currentValues.speed);
                oz = Math.sin(vertex.time + vertex.step[2] * now * currentValues.speed);
                FSS.Vector3.set(vertex.position,
                    0.8 * geometry.segmentWidth * ox,
                    0.1 * geometry.sliceHeight * oy,
                    1 * offset * oz - offset);
                FSS.Vector3.add(vertex.position, vertex.anchor);
            }

            // Set the Geometry to dirty
            geometry.dirty = true;
        }

        initialise();
        resize();
        animate();

    });


    $('.testimonials .client-info').each(function() {
        var width = $(this).outerWidth(),
            lMargin = width / 2;

        $(this).css('margin-left', '-' + lMargin + 'px');
    });


    function ext_features_line() {
        $('.ext-feature').each(function() {
            var $this = $(this),
                height = $this.outerHeight(),
                margBottom = $this.css('margin-bottom'),
                totalHeight = height + parseInt(margBottom) - 101,
                topPos = height - 102,
                element = $this.find('.join-line');
            element.height(totalHeight).css({
                "margin-top": '-' + topPos + 'px'
            });
        });
    }

    ext_features_line();

    $(window).resize(function() {
        ext_features_line();
    });

    $('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
        ext_features_line();
    })

    $(document).on('show.bs.collapse hide.bs.collapse', '.panel-group', function(e) {
        var $target = $(e.target);
        $target.parent('.panel').toggleClass("at-collapse-active");
    });



    ////////////////////////////////
    ////////////DEMO///////////////
    ///////////////////////////////
    $(".opt-show-hide").click(function() {
        var conParent = $(this).parents('.option-panel');
        if (conParent.hasClass('shown')) {
            conParent.removeClass('shown');
        } else {
            conParent.addClass('shown');
        }
    });

    $('head').append('<link href="css/style.css" id="custom-styles" rel="stylesheet">');

    $('.theme-color .color-code').click(function() {
        var cssFile = $(this).data('color');

        $('#custom-styles').prop('href', "css/" + cssFile);
    });

    var mode = $('.box-mod-switch input[name="bmod"]');
    mode.change(function() {
        var modeVal = $('.box-mod-switch input[name="bmod"]:checked').val();

        if (modeVal != "1") {
            $('body').removeClass("dark");
            $('.dark-btn-demo').removeClass("btn-o-white").addClass("btn-o-dark");
        } else {

            $('body').addClass("dark");
            $('.btn-o-dark').removeClass("btn-o-dark").addClass("btn-o-white dark-btn-demo");

        }
    });

});