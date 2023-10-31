//top
var btn = $("#top");
$(window).scroll(function () {
    if ($(window).scrollTop() > 300) {
        btn.addClass("show");
    } else {
        btn.removeClass("show");
    }
});
btn.on("click", function (e) {
    e.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, "300");
});
// phone
document.addEventListener("DOMContentLoaded", function () {
    var eventCalllback = function (e) {
        var el = e.target,
        clearVal = el.dataset.phoneClear,
        pattern = el.dataset.phonePattern,
        matrix_def = "+998 __ ___ __ __",
        matrix = pattern ? pattern : matrix_def,
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = e.target.value.replace(/\D/g, "");
        if (clearVal !== 'false' && e.type === 'blur') {
            if (val.length < matrix.match(/([\_\d])/g).length) {
                e.target.value = '';
                return;
            }
        }
        if (def.length >= val.length) val = def;
        e.target.value = matrix.replace(/./g, function (a) {
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
        });
    }
    var phone_inputs = document.querySelectorAll('[data-phone-pattern]');
    for (let elem of phone_inputs) {
        for (let ev of ['input', 'blur', 'focus']) {
            elem.addEventListener(ev, eventCalllback);
        }
    }
  });
// sliders
$(document).ready(function(){
    $(".main-slider").owlCarousel({
        items: 1,
        margin: 30,
        autoPlay: true,
        dots: true,
        nav: true,
        mouseDrag: false,
        animateOut: 'fadeOut',
        navText: [
            '<span class="icon-arrL"></span>',
            '<span class="icon-arrR"></span>',
        ]
    });
    $(".newavto-slider").owlCarousel({
        items: 1,
        margin: 30,
        autoPlay: true,
        dots: true,
        nav: true,
        mouseDrag: false,
        animateOut: 'fadeOut',
        navText: [
            '<span class="icon-arrL"></span>',
            '<span class="icon-arrR"></span>',
        ],
        responsive : {
            0 : {
                autoHeight:true,

            },
            992 : {
                autoHeight:false,
            },
        }
    });
    $(".olam-info_slider").owlCarousel({
        items: 2,
        margin: 30,
        autoPlay: false,
        nav: false,
        mouseDrag: false,
        navText: [
            '<span class="icon-arrL"></span>',
            '<span class="icon-arrR"></span>',
        ],
        responsive : {
            0 : {
                items: 1,

            },
            992 : {
                items: 2,
            },
        }
    });
    $(".oldavto_slider").owlCarousel({
        items: 3,
        margin: 30,
        autoPlay: false,
        nav: true,
        mouseDrag: false,
        dots: false,
        navText: [
            '<span class="icon-arrL"></span>',
            '<span class="icon-arrR"></span>',
        ],
        responsive : {
            0 : {
                items: 1,
            },
            768 : {
                items: 2,
            },
            992 : {
                items: 3,
            },
        }
    });
    $(".customer-reviews_slider").owlCarousel({
        items: 1,
        margin: 30,
        autoPlay: false,
        nav: true,
        mouseDrag: false,
        dots: true,
        navText: [
            '<span class="icon-arrL"></span>',
            '<span class="icon-arrR"></span>',
        ],
        responsive : {
            0 : {
                nav: false
            },
            992 : {
                nav: true
            },
        }
    });
    $(".autoblog-slider").owlCarousel({
        items: 1,
        margin: 30,
        autoPlay: false,
        nav: true,
        mouseDrag: false,
        dots: true,
        navText: [
            '<span class="icon-arrL"></span>',
            '<span class="icon-arrR"></span>',
        ],
        responsive : {
            0 : {
                nav: false
            },
            992 : {
                nav: true
            },
        }
    });
    $('.avto-description, .autoblog-slider').each(function(index, element) {
        var slider = $(element);
        slider.owlCarousel({
            items: 1,
            margin: 30,
            autoPlay: false,
            nav: true,
            mouseDrag: false,
            dots: true,
            animateOut: 'fadeOut',
            navText: [
                '<span class="icon-arrL"></span>',
                '<span class="icon-arrR"></span>',
            ],
            responsive : {
                0 : {
                    nav: false,
                    autoHeight:true,
                },
                992 : {
                    nav: true,
                    autoHeight:false,
                },
            }
        });
        var container = $('<div class="autoblogSliderNav"></div>');
        var autoblogSliderNav = $('<div class="container position-relative"></div>');
        container.append(slider.find('.owl-nav'));
        container.append(slider.find('.owl-dots'));
        autoblogSliderNav.append(container);
        slider.prepend(autoblogSliderNav);
    });
})
// find count avto
$(document).ready(function() {
    function updateCarCount() {
        var selectedTab = $(".main-slider_form--tabs .selected").attr("id");
        var selectedBrand = $(".main-slider_form #brand").val();
        var selectedModel = $(".main-slider_form #model").val();
        $.ajax({
            type: "POST",
            url: "обработчик-запроса.php",
            data: {
                action: "updateCarCount",
                selectedTab: selectedTab,
                selectedBrand: selectedBrand,
                selectedModel: selectedModel
            },
            success: function(response) {
                $("#mainSliderFindAvtoCount").text(response); 
            }
        });
    }
    $(".main-slider_form--tabs button").click(function() {
        $(".main-slider_form--tabs button").removeClass("selected");
        $(this).addClass("selected");
        updateCarCount();
    });
    $("#brand").change(function() {
        updateCarCount(); 
    });
    $("#model").change(function() {
        updateCarCount();
    });
    updateCarCount();
    $(".custom-option").on("click", function() {
        var value = $(this).data("value");
        var isBrand = $(this).data("brand");
        var isModel = $(this).data("model"); 
        var selectElement = isBrand ? $("#brand") : (isModel ? $("#model") : null);
        if (selectElement) {
            selectElement.val(value);
            selectElement.trigger("change");
        }
        $(this).parents(".custom-options").find(".custom-option").removeClass("selection");
        $(this).addClass("selection");
        $(this).parents(".custom-select").removeClass("opened");
        $(this).parents(".custom-select").find(".custom-select-trigger").text($(this).text());
        updateCarCount();
    });
 });
// custom select
$(".custom-select").each(function() {
    var classes = $(this).attr("class"),
        id      = $(this).attr("id"),
        name    = $(this).attr("name");
    var template =  '<div class="' + classes + '">';
    template += '<span class="custom-select-trigger" data-model="'+ $(this).attr("placeholder") +'">' + $(this).attr("placeholder") + '</span>';
    template += '<div class="custom-options">';
    $(this).find("option").each(function() {
        template += '<span class="btn-model custom-option ' + $(this).attr("class") + '" data-value="' + $(this).attr("value") + '">' + $(this).html() + '</span>';
    });
    template += '</div></div>';
    $(this).wrap('<div class="custom-select-wrapper col-4"></div>');
    $(this).hide();
    $(this).after(template);
});
$(".custom-option:first-of-type").hover(function() {
    $(this).parents(".custom-options").addClass("option-hover");
}, function() {
    $(this).parents(".custom-options").removeClass("option-hover");
});
$(".custom-select-trigger").on("click", function() {
    $(this).parents(".custom-select").toggleClass("opened");
    event.stopPropagation();
});
// seo more btn
$(document).ready(function() {
    $('.seo-text_moreBtn').click(function() {
      var seoTextContent = $('.seo-text_content');
      seoTextContent.css('max-height', 'none');
      seoTextContent.removeClass('before');
      $(this).hide();
    });
  });
//  custom accordion
$(document).ready(function() {
    $('.custom-accordion-header').click(function () {
      var $item = $(this).parent();
      if ($item.hasClass('active')) {
        $item.removeClass('active');
        $item.find('.custom-accordion-content').slideUp();
      } else {
        $('.custom-accordion-item').removeClass('active');
        $('.custom-accordion-item .custom-accordion-content').slideUp();
        $item.addClass('active');
        $item.find('.custom-accordion-content').slideDown();
      }
    });
});
// add/remove disabled in selecteds
$(document).ready(function(){
    $('.brand, .model').on('click', function() {
        $('.modelList').removeClass('disabled');
        $('.generationList').removeClass('disabled');
        $('.carcaseList').removeClass('disabled');
        $('.fuelList').removeClass('disabled');
        $('.transmissionList').removeClass('disabled');
        $('.driveUnitList').removeClass('disabled');
        $('.colorList').removeClass('disabled');
    });
});
// search-avto_ranges
$(document).ready(function(){
    $(function() {
        $(".range-slider").each(function() {
          const slider = $(this).find(".slider");
          const minInput = $(this).find(".min-value");
          const maxInput = $(this).find(".max-value");
          const min = parseFloat($(this).data("min"));
          const max = parseFloat($(this).data("max"));
          const step = parseFloat($(this).data("step"));
          const formatNumber = (number, isYear) => {
            if (isYear) {
              return number.toFixed(0);
            } else {
              return number.toLocaleString("ru-RU");
            }
          };
          const isYearSlider = $(this).hasClass("year-slider");
          slider.slider({
            range: true,
            min: min,
            max: max,
            step: step,
            values: [min, max],
            slide: function(event, ui) {
              minInput.val(formatNumber(ui.values[0], isYearSlider));
              maxInput.val(formatNumber(ui.values[1], isYearSlider));
            }
          });
          minInput.val(formatNumber(slider.slider("values", 0), isYearSlider));
          maxInput.val(formatNumber(slider.slider("values", 1), isYearSlider));
        });
    });
    $('#search-avto_morebtn').click(function() {
        if ($(this).hasClass('active')) {
            $('.volume-slider, .mileage-slider, .search-avto_selects .custom-select-wrapper:nth-last-child(-n+5)').css('display', 'none');
            $(this).html('Расширенный поиск<span class="icon-chevroneDown"></span>');
        } else {
            $('.volume-slider, .mileage-slider, .search-avto_selects .custom-select-wrapper:nth-last-child(-n+5)').css('display', 'inline-block');
            $(this).html('Скрыть<span class="icon-chevroneDown active"></span>');
        }
        $(this).toggleClass('active');
    });
})
// select avto color
$(document).ready(function() {
    $(".avto-color a").click(function() {
      $(".avto-color a").removeClass("is-active");
      $(".car-color-img").removeClass("is-active");
      $(".avto-color-name").removeClass("is-active");
      $(this).addClass("is-active");
      var index = $(this).index();
      $(".car-color-img").eq(index).addClass("is-active");
      $(".avto-color-name").eq(index).addClass("is-active");
      return false;
    });
});
$(document).ready(function() {
    $(".avto-text_btn").click(function(e) {
        e.preventDefault();
        $(".avto-text p:gt(0)").toggle();
        $(this).hide()
        return false;
    });
});
$('.avto-btns a').click(function() {
    return false
})
// rate car form
