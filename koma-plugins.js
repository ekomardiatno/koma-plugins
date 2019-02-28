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
 * Image by Ratio
 * ======================================================================== */

+function ($) {
  'use strict'
  var defaults = {
    ratio_x: 1,
    ratio_y: 1,
    responsive: null
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