/* ============================================= *
 *    __   ___ _______  ___  ___  _______        *
 *   |  | /  /|       ||   \/   ||   _   |       *
 *   |  |/  / |   _   ||        ||  |_|  |       *
 *   |     /  |  | |  ||  |\/|  ||   _   |       *
 *   |     \  |  |_|  ||  |  |  ||  | |  |       *
 *   |  |\  \ |       ||  |  |  ||  | |  |  _    *
 *   |__| \__\|_______||__|  |__||__| |__| (_)   *
 *                                               *
 *                  KOMA PLUGINS                 *
 *                                               *
 *          Copyright 2019 Eko Mardiatno         *
 *              instagram.com/fewdev             *
 *               facebook.com/emrdtn             *
 *            twitter.com/ekomardiatno           *
 *               wa.me/6282219299071             *
 *               line @ekomardiatno              *
 * ============================================= */

if (typeof jQuery === 'undefined') {
  throw new Error('Koma Plugins requires jQuery')
}

/* ========================================================================
 * View Image by Ratio
 * ======================================================================== */

+function ($) {
  'use strict'
  
  var defaults = {
    ratio_x: 1,
    ratio_y: 1,
    responsive: null
  }

  function startImageByRatio ( settings, imgEl, parent, widthImg, heightImg, ratio_x, ratio_y ) {
    if ( settings.responsive != null ) {
      var wwin = $(window).width()
      for(var i in settings.responsive) {
        if(wwin <= i) {
          ratio_x = settings.responsive[i].ratio_x
          ratio_y = settings.responsive[i].ratio_y
          break
        }
      }
    }
  
    var widthParent = parent.width(),
        heightParent = widthParent / ratio_x * ratio_y,
        widthByRatioImg = heightParent / heightImg * widthImg,
        heightByRatioImg = widthParent / widthImg * heightImg,
        diff,
        transformCss,
        widthImgCss,
        heightImgCss
    
    if ( (widthImg > heightImg && heightByRatioImg < heightParent) || (widthImg < heightImg && widthByRatioImg > widthParent) ) {
      diff = (widthByRatioImg - widthParent) / 2
      transformCss = 'translateX(-' + diff + 'px)'
      widthImgCss = 'auto'
      heightImgCss =' 100%'
    } else {
      diff = (heightByRatioImg - heightParent) / 2
      transformCss = 'translateY(-' + diff + 'px)'
      widthImgCss = '100%'
      heightImgCss =' auto'
    }
    imgEl.css({
      'max-width': 'none',
      'max-height': 'none',
      width: widthImgCss,
      height: heightImgCss,
      transform: transformCss
    })
    parent.css({
      overflow: 'hidden',
      height: heightParent
    })
    parent.attr('ratio-x', ratio_x)
    parent.attr('ratio-y', ratio_y)
  }

  $.fn.imageByRatio = function (options) {
    var settings = $.extend({},defaults,options),
        ratio_x = settings.ratio_x,
        ratio_y = settings.ratio_y,
        className = 'frame-imgByRatio'

    return this.each(function () {
      var a = $(this),
          b = this,
          widthImg = b.naturalWidth,
          heightImg = b.naturalHeight
      a.before('<div class="' + className + '"></div>')
      var parent = a.prev('.' + className)
      a.appendTo(parent)
      var imgEl = parent.children('img')

      startImageByRatio(settings, imgEl, parent, widthImg, heightImg, ratio_x, ratio_y)
      $(window).on('resize', function () {
        startImageByRatio(settings, imgEl, parent, widthImg, heightImg, ratio_x, ratio_y)
      })
    })
  }
}(jQuery)

/* ========================================================================
 * Animate.css Scroll
 * ======================================================================== */

+function ($) {
  'use strict'

  function startAnimation(wintop, top, height, parent, nameClass, repeat) {
      if ( wintop >= top - $(window).height() && wintop <= top + height ) {
          parent.addClass(nameClass)
      } else {
          if ( repeat != undefined ) {
              parent.attr('class', 'animation-wrap')
          }
      }
  }

  $.fn.animationScroll = function () {
      return this.each(function () {
          var a = $(this),
              top = a.offset().top,
              name = a.attr('animation-name') + ' ',
              duration = a.attr('animation-duration'),
              delay = a.attr('animation-delay'),
              repeat = a.attr('animation-repeat'),
              height = a.height()

          a.before('<div class="animation-wrap"></div>')
          var parent = a.prev('.animation-wrap')
          a.appendTo(parent)

          duration == undefined ? duration = '' : duration = duration + ' '
          delay == undefined ? delay = '' : delay = 'delay-' + delay + 's '

          var nameClass = name + duration + delay + 'animated'

          var wintop = $(window).scrollTop()
          startAnimation(wintop, top, height, parent, nameClass, repeat)

          $(window).on('scroll', function () {
              var wintop = $(this).scrollTop()
              startAnimation(wintop, top, height, parent, nameClass, repeat)
          })
      })
  }
  
}(jQuery)

/* ========================================================================
 * Preloader with Animate.css
 * ======================================================================== */

+function ($) {
  'use strict'

  var CloseWrapper
  CloseWrapper = function ($this, animate) {
    $(window).on('load', function () {
      if(animate == undefined) {
        $this.fadeOut(1000)
      } else {
        $this.addClass(animate + ' animated')
        setTimeout(function () {
          $this.hide()
        }, 1000)
      }
    })
  }

  $.fn.preloader = function () {
    return this.each(function () {
      CloseWrapper($(this), $(this).attr('animation-name'))
    })
  }
}(jQuery)