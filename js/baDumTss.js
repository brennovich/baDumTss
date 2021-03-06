(function() {
  jQuery(function() {
    $.baDumTss = function(element, options) {
      var state;
      state = '';
      this.settings = {};
      this.$element = $(element);
      this.callback = function(name, args) {
        if (args == null) {
          args = [];
        }
        return this.settings[name].apply(this, args);
      };
      this.setState = function(_state) {
        return state = _state;
      };
      this.getState = function() {
        return state;
      };
      this.init = function() {
        this.settings = $.extend({}, this.defaults, options);
        this.settings.spinConfig.top = this.settings.expanderHeight * 0.4;
        this.$imageList = this.$element.find(this.settings.listSelector);
        this.bindImageAnchorEvents();
        return this.setState('ready');
      };
      this.bindImageAnchorEvents = function() {
        var _this = this;
        return this.$imageList.children('a').on('click', function(e) {
          e.preventDefault();
          return _this.appendExpander($(e.currentTarget));
        });
      };
      this.appendExpander = function($anchor) {
        var $globalExpander, $internalExpander, $listItem, createCallback;
        $listItem = $anchor.parent();
        $internalExpander = $listItem.children('.expander');
        $globalExpander = this.$imageList.find('.expander');
        $listItem.addClass('active');
        if ($globalExpander.length) {
          if ($listItem.hasClass('active') && !$globalExpander.is($internalExpander)) {
            createCallback = this.buildExpander;
          }
          return this.removeExpander($globalExpander, createCallback, [$listItem, $anchor]);
        } else {
          return this.buildExpander($listItem, $anchor);
        }
      };
      this.expanderMarkup = function() {
        return $('<div>', {
          "class": 'expander',
          html: $('<div>', {
            "class": 'expander-container'
          })
        });
      };
      this.containerContentMarkup = function($anchor) {
        return $('<figure>', {
          html: $('<img>', {
            src: $anchor.prop('href')
          })
        })[0].outerHTML + $('<div>', {
          "class": 'details'
        })[0].outerHTML + $('<a>', {
          "class": 'close',
          href: '#',
          text: 'X'
        })[0].outerHTML + $('<a>', {
          "class": 'prev',
          href: '#',
          text: '<'
        })[0].outerHTML + $('<a>', {
          "class": 'next',
          href: '#',
          text: '>'
        })[0].outerHTML;
      };
      this.buildExpander = function($el, $anchor) {
        var $details, $expander, $img,
          _this = this;
        $el.append(this.expanderMarkup());
        $el.find('.expander .expander-container').append(this.containerContentMarkup($anchor));
        this.bindCloseAction($el);
        this.bindNavigation($el);
        $expander = $el.children('.expander');
        $details = $expander.find('.details');
        $img = $expander.find('img');
        $expander.height(this.settings.expanderHeight);
        $el.height(this.settings.expanderHeight + $el.height());
        $img.height($expander.find('figure').height);
        $expander.spin(this.settings.spinConfig);
        return $img.load(function() {
          $details.append($('<h3>', {
            html: $anchor.children('img').prop('title')
          })).append($('<p>', {
            html: $anchor.children('img').data('description')
          }));
          $details.css('opacity', 1);
          $img.css('opacity', 1);
          $expander.spin(false);
          return _this.focusToEl($el);
        });
      };
      this.focusToEl = function($el) {
        var offset, smartOffset, windowDifference;
        windowDifference = $(window).height() - $(window).height() - 2;
        offset = $el.offset().top + this.settings.scrollOffset;
        smartOffset = offset + windowDifference;
        if (windowDifference < 0 && (smartOffset > Math.abs(windowDifference))) {
          offset = smartOffset;
        }
        return $('html, body').animate({
          scrollTop: offset
        }, 'fast');
      };
      this.removeExpander = function($expander, callback, args) {
        var removeAction,
          _this = this;
        if (args == null) {
          args = [];
        }
        removeAction = function() {
          $expander.parent().height('auto');
          $expander.remove();
          if (callback) {
            return callback.apply(_this, args);
          }
        };
        $expander.parent().removeClass('active');
        $expander.html('');
        $expander.css({
          height: 0,
          opacity: 0
        });
        if ($expander.length) {
          return removeAction();
        }
      };
      this.bindCloseAction = function($el) {
        return $el.find('a.close').click(function(e) {
          e.preventDefault();
          return $el.children('a').trigger('click');
        });
      };
      this.bindNavigation = function($el) {
        var _this = this;
        $el.find('a.prev').click(function(e) {
          var prevEl;
          e.preventDefault();
          prevEl = $el.prev('li').children('a');
          prevEl.trigger('click');
          if (!prevEl.length) {
            return _this.$imageList.last().children('a').trigger('click');
          }
        });
        return $el.find('a.next').click(function(e) {
          var nextEl;
          e.preventDefault();
          nextEl = $el.next('li').children('a');
          nextEl.trigger('click');
          if (!nextEl.length) {
            return _this.$imageList.first().children('a').trigger('click');
          }
        });
      };
      this.init();
      return this;
    };
    $.baDumTss.prototype.defaults = {
      listSelector: 'ul li',
      scrollOffset: 120,
      expanderHeight: 350,
      spinConfig: {
        lines: 9,
        length: 0,
        width: 12,
        radius: 17,
        corners: 1,
        rotate: 24,
        direction: 1,
        color: '#454545',
        speed: 0.8,
        trail: 62,
        shadow: false,
        hwaccel: true,
        className: 'spinner',
        zIndex: 2e9,
        left: 'auto'
      }
    };
    return $.fn.baDumTss = function(options) {
      return this.each(function() {
        var plugin;
        if ($(this).data('baDumTss') === void 0) {
          plugin = new $.baDumTss(this, options);
          return $(this).data('baDumTss', plugin);
        }
      });
    };
  });

}).call(this);
