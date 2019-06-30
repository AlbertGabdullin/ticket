$(function() {



	$(".play-button").animatedModal({
		color: "#000",
	});

	if($('#player').val().length === 0) {
		$('#modal__360-button').addClass('not-active');
	}

	if($('#family').val().length === 0) {
		$('#modal__360-button').addClass('not-active');
	}

	$('#player').on('input',function() {
		if($(this).val().length === 0) {
			$('#modal__360-button').addClass('not-active');
		}
		else {
			$('#modal__360-button').removeClass('not-active');
		}
	});

	$('#family').on('input',function() {
		if($(this).val().length === 0) {
			$('#modal__360-button').addClass('not-active');
		}
		else {
			$('#modal__360-button').removeClass('not-active');
		}
	});

	$('#modal__360-button').on('click', function(e) {
		if($(this).hasClass('not-active')) {
			e.preventDefault();
			return false;
		}
	});

	if($(window).width() > 992) {
		var ballAnimation = true;

		$('.section-3d').find('ul').children('li').removeClass('wow fadeInDown');
		$('.compose__img').find('img').removeClass('wow fadeInUp');

		$("main").onepage_scroll({
			sectionContainer: "section",     // sectionContainer accepts any kind of selector in case you don't want to use section
			easing: "ease",                  // Easing options accepts the CSS3 easing animation such "ease", "linear", "ease-in",														 // "ease-out", "ease-in-out", or even cubic bezier value such as "cubic-bezier(0.175, 0.885, 0.420, 1.310)"
			animationTime: 1000,             // AnimationTime let you define how long each section takes to animate
			pagination: true,                // You can either show or hide the pagination. Toggle true for show, false for hide.
			updateURL: false,                // Toggle this true if you want the URL to be updated automatically when the user scroll to each page.
			beforeMove: function(index) {
					if(index === 5) {
						$(".ball__item").removeClass("fadeInUp");
						$(".ball__item-img").removeClass("bounce");
						$(".ball__item-img").removeClass("turn");

					}
					if(index === 6) {
						$(".ball__item").addClass("fadeInUp");
						$(".ball__item-img:not(:nth-child(3))").addClass("bounce");
						$(".ball__item:nth-child(3) .ball__item-img").addClass("turn");
					}
			},  // This option accepts a callback function. The function will be called before the page moves.
			afterMove: function(index) {
				if(index !== 1) {
					$('header').addClass('active');
					$('.first-section').remove();
				}
				if(index === 6 && ballAnimation) {
					$(".ball__item").removeClass("wow");
					$(".ball__item-img").removeClass("wow");
					// new WOW().init();

					//$(".ball__item").attr("style", "visibility: visible; animation-name: fadeInUp;");
					ballAnimation = false;
				}
			},   // This option accepts a callback function. The function will be called after the page moves.
			loop: false,                     // You can have the page loop back to the top/bottom when the user navigates at up/down on the first/last page.
			keyboard: true,                  // You can activate the keyboard controls
			responsiveFallback: false,        // You can fallback to normal page scroll by defining the width of the browser in which
			// you want the responsive fallback to be triggered. For example, set this to 600 and whenever
			// the browser's width is less than 600, the fallback will kick in.
			direction: "vertical"            // You can now define the direction of the One Page Scroll animation. Options available are "vertical" and "horizontal". The default value is "vertical".
		});

		$('.scroll-link').on('click', function() {
			$('.main').moveTo(2);
		});

		$('nav.mobile ul li a').on('click', function(){
			$('.menu-btn').removeClass('menu-btn--active');
			$('nav.mobile').removeClass('active');
		});

		$('.ball__item').click(function(e) {
			if(!$(this).hasClass('ball__item--active')) {
				e.preventDefault();
				$('.main').moveTo(9);
			}
		});

		$('.button--top').click(function(){
			$('.main').moveTo(9);
		});

		$('nav.desktop ul li a').click(function(){
			var dataIndex = $(this).data('index');
			$('main').moveTo(dataIndex);
		});


	} else {
		$('body').addClass('disabled-onepage-scroll');
		$('body').addClass('not-active');
		$('.ball__item-img').removeClass('wow');

		$("nav.mobile li a").click(function(){
			var _href = $(this).attr("href");
			$("html, body").animate({scrollTop: $(_href).offset().top - 56 +"px"});
			return false;
		});
		$("nav.mobile .button--top").click(function() {
			var _href = $(this).attr("href");
			$("html, body").animate({scrollTop: $(_href).offset().top - 116 +"px"});
			return false;
		});

		$('.ball__item').click(function(){
			var _href = $(this).attr("href");
			$("html, body").animate({scrollTop: $(_href).offset().top - 56 +"px"});
			return false;
		});
	}

	if($(window).width() < 992) {
		var wow = new WOW(
			{
				mobile:       true,
			}
		)
		wow.init();
	};


	$('.ball__item').click(function(e) {
		if(!$(this).hasClass('ball__item--active')) {
			e.preventDefault();
			$('.main').moveTo(9);
		}
	});

	$('nav.mobile ul li a, nav.mobile .button').on('click', function(){
		$('.menu-btn').removeClass('menu-btn--active');
		$('nav.mobile').removeClass('active');
	});


	//swipe button code
	var swiperDragged = false,
		startX,
		endX = 0;

	function swipe(){
		var $swipe = $('.swiper'),
			$btn = $('.swipe-btn', $swipe);

		TweenLite.to('#swipe-arrow', 0, { x: 16, y: 11});
		TweenLite.to('#swipe-end', 0, { x: 235, y: 12});

		var tl = new TimelineMax({ repeat: -1 });
		tl.staggerFrom("#dotted-line circle", 0.7, { scale: 0.6, x: -2, y: .5, opacity: 0.7, delay:0.1, ease: Power2.easeInOut, repeat: 1, yoyo: true}, 0.15);

		$btn.on('click touchend', function(e){
			e.preventDefault();
		}).on('touchstart mousedown', function(e) {
			e.preventDefault();
			swiperDragged = true;
			startX = typeof e.pageX != 'undefined' ? e.pageX : e.originalEvent.touches[0].pageX;
			endX = 0;
		});

		$(document).on('touchmove mousemove', function(e){
			if (swiperDragged) {
				actualX = typeof e.pageX != 'undefined' ? e.pageX : e.originalEvent.touches[0].pageX;
				endX = Math.max(0, Math.min(215, actualX - startX));
				TweenLite.to('#swipe-btn', 0, { x: endX});
			}
		}).on('touchend mouseup', function(e) {
			if (swiperDragged) {
				swiperDragged = false;
				if (endX < 200) {
					//TweenLite.to('#swipe-btn', .5, { x: 0 });
				} else {
					// console.log($btn.attr('xlink:href'));
					TweenLite.to('#swipe-btn', .1, { x: 215});
					setTimeout(function(){
						TweenLite.to('#swipe-btn', .5, { x: 0 });
						$('html, body').removeClass('not-active');
						$('header').addClass('active');
						$('.first-section').fadeOut(100);

						new WOW().init();
					}, 0);
				}
				endX = 0;
			}
		});
	}

	swipe();
	//===swipper




//burger btn code
	$('.menu-btn').on('click', function() {
		$(this).toggleClass('menu-btn--active');
		if($('nav.mobile').hasClass('active')) {
			$('nav.mobile').removeClass('active');
		}
		else {
			$('nav.mobile').addClass('active');
		}
	});

	$('.play-button').on('click', function() {
		$('.video__modal').addClass('active');
		$('#video')[0].play();
	});

	$('.video__modal-close').on('click', function(){
		$('#video')[0].pause();
	});


	$('.compose__img').tilt({
		maxTilt:        10,
		perspective:    1000,
		easing:         "cubic-bezier(.03,.98,.52,.99)",
		scale:          1,
		speed:          300,
		transition:     true,
		disableAxis:    null,
		reset:          true,
		glare:          false,
		maxGlare:       1,
	});


	var success_modal = $('.success__modal');

	$('.close__btn').on('click', function() {
		success_modal.removeClass('active');
	});

	$(document).not(success_modal).click(function(){
		success_modal.removeClass('active');
	});
//forms

	$('.form1').submit(function () {
		return false;
	}).validate({
		rules : {
			"name" : {required : true, minlength: 1},
			"phone" : {required : true, minlength: 3},
			"agree" : {required : true},
		},
		messages : {
			"name" : {
				required : "Пожалуйста введите имя",
				minlength : "Не менее одной буквы"
			},
			"phone" : {
				required : "Пожалуйста введите телефон",
				minlength : "Не менее 10 цифр"
			},
			"agree" : {
				required : "Пожалуйста примимте соглашение",
			}

		},
		submitHandler: function(form){
			$.ajax({
				url:'/mail.php',
				data: $(form).serialize(),
				type: 'POST',
				cache: false,
				success: function(data){
					$('.success__modal').addClass('active');
					$('.success__modal-backdrop').click(function() {
						$('.success__modal').removeClass('active');
					})
				}
			});

		},
		errorPlacement: function (error, element) {
			$(element).siblings().last().after(error.addClass('f-help f-help-error'));
		},
		errorElement : 'div'
	});

	$('.main-form').submit(function () {
		return false;
	}).validate({
		rules : {
			"name" : {required : true, minlength: 1},
			"phone" : {required : true, minlength: 3},
			"club_name" : {required : false, minlength: 3},
			"email" : {required : false, minlength: 3},
			"role" : {required : false, minlength: 3},
			"agree1" : {required : true},
		},
		messages : {
			"name" : {
				required : "Пожалуйста введите имя",
				minlength : "Не менее одной буквы"
			},
			"phone" : {
				required : "Пожалуйста введите телефон",
				minlength : "Не менее 10 цифр"
			},
			"agree1" : {
				required : "Пожалуйста примимте соглашение",
			}

		},
		submitHandler: function(form){
			$.ajax({
				url:'/mail.php',
				data: $(form).serialize(),
				type: 'POST',
				cache: false,
				success: function(data){
					$('.success__modal').addClass('active');


				}
			});
		},
		errorPlacement: function (error, element) {
			$(element).siblings().last().after(error.addClass('f-help f-help-error'));
		},
		errorElement : 'div'
	});

	$("#modal__360-button").animatedModal({
		color: '#000',
		animatedIn: 'fadeIn',
		animatedOut: 'fadeOut',
		beforeOpen: function(){
			$('.modal__360-content').html('');
			var fam = $('#family').val();
			var player = $('#player').val();
			var url = `http://zenit.360ticket.org?fam=${fam}&number=${player}`;
			$('.modal__360-content').html(`
					<iframe src="${url}" allowFullScreen frameborder="0"></iframe>
			`);
		}
	});


	$('#modal__360-button').click(function(){
		$('.modal__360').css('display', 'block');
	});

//year detect
	var today = new Date();
	var year = today.getFullYear();

	$('.now-year').text(year);

//menu init
// $("nav.desktop ul li a").each(function() {
// 	var index = $(this).data('index');

// 	if(index === 1 || index === 3 || index === 8 || index === 9) {
// 		$(this).parent('li').hide();
// 	}
// 	if(index === 2)
// 		$(this).text('Главная');
// 	if(index === 4)
// 		$(this).text('Задачи');
// 	if(index === 5)
// 		$(this).text('Выгоды');
// 	if(index === 6)
// 		$(this).text('Применение');
// 	if(index === 7)
// 		$(this).text('Попробовать');
// });

});