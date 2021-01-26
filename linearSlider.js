(function ($) {
  $.fn.linearSlider = function () {
    return this.each(function () {
      // build html
      $(this).wrap('<div class="linear-slider-container"></div>');
      $(this).parent().append('<button class="btn linear-slider-arrow linear-slider-arrow-prev"><i class="fal fa-angle-left"></i></button>' +
        '<button class="btn linear-slider-arrow linear-slider-arrow-next"><i class="fal fa-angle-right"></i></button>');
      $(this).parent().append('<div class="linear-slider-slider"><input type="range" value="0" min="0" max="100"></div>');
      $(this).find('.slide-item').wrapAll('<div class="slider-track transition"></div>')

      // cache elements
      var $slider = $(this);
      var $sliderContainer = $slider.parents('.linear-slider-container');
      var $sliderTrack = $slider.find('.slider-track');
      var $sliderslider = $sliderContainer.find('.linear-slider-slider');
      var $sliderHandle;
      var $prev = $sliderContainer.find('.linear-slider-arrow-prev');
      var $next = $sliderContainer.find('.linear-slider-arrow-next');


      var trackWidth = getTrackWidth();
      var translate = 0;
      var itemWidth = $slider.find('.slide-item').outerWidth(true);


      $prev.hide();
      $sliderTrack.width(trackWidth + 'px');

      if(trackWidth < $sliderContainer.width()) {
        $prev.hide();
        $next.hide();
        $sliderslider.hide();
      }

      $prev.click(function () {
        $sliderTrack.css('transform', 'translate3d(-' + (translate - itemWidth) + 'px, 0, 0)');
        translate -= itemWidth;
        $sliderTrack;

        sliderHandle();
        sliderArrow();
      })

      $next.click(function () {
        $sliderTrack.css('transform', 'translate3d(-' + (translate + itemWidth) + 'px, 0, 0)');
        translate += itemWidth;
        $sliderTrack;

        sliderHandle();
        sliderArrow();
      })

      $sliderslider.find('input').slider({
        start: function (event, ui) {
          $sliderTrack.removeClass('transition');
        },
        stop: function (event, ui) {
          $sliderTrack.addClass('transition');
        }
      });


      $sliderHandle = $sliderslider.find('.ui-slider-handle');


      $sliderslider.find('input').change(function () {
        // console.log($(this).val());
        translate = ((trackWidth - $sliderContainer.width()) / $sliderslider.width()) * $sliderHandle.position().left;
        $sliderTrack.css('transform', 'translate3d(-' + (translate) + 'px, 0, 0)');

        sliderArrow();
      })


      function sliderHandle() {
        var left = translate / ((trackWidth - $sliderContainer.width()) / $sliderslider.width())
        $sliderHandle.css('left', left + 'px');
      }

      function sliderArrow() {
        // console.log(translate);
        if (translate > 290) {
          $prev.show();
        } else {
          $prev.hide();
        }

        if (translate > (trackWidth - $sliderContainer.width() - 290)) {
          $next.hide();
        } else {
          $next.show();
        }
      }



      function getTrackWidth() {
        var width = 0;

        $slider.find('.slide-item').each(function () {
          width += parseInt($(this).outerWidth(true));
        })
        return width;
      }
    });
  };
}(jQuery));