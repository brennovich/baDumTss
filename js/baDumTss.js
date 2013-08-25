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
      this.buildExpander = function($el, $anchor) {
        var $details, $expander, $img,
          _this = this;
        $('<div>', {
          "class": 'expander',
          html: $('<div>', {
            "class": 'expander-container'
          })
        }).appendTo($el);
        $el.find('.expander .expander-container').append($('<figure>', {
          html: $('<img>', {
            src: $anchor.prop('href')
          })
        })).append($('<div>', {
          "class": 'details'
        })).append($('<a>', {
          "class": 'close',
          href: '#',
          text: 'X'
        }));
        $el.find('a.close').click(function(e) {
          e.preventDefault();
          return $anchor.trigger('click');
        });
        $expander = $el.children('.expander');
        $details = $expander.find('.details');
        $img = $expander.find('img');
        $expander.height(this.settings.expanderHeight);
        $el.height(this.settings.expanderHeight + $el.height());
        $img.height($expander.find('figure').height);
        return $img.load(function() {
          $details.append($('<h3>', {
            html: $anchor.children('img').prop('title')
          })).append($('<p>', {
            html: $anchor.children('img').data('description')
          }));
          $details.css('opacity', 1);
          $img.css('opacity', 1);
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
        var _this = this;
        if (args == null) {
          args = [];
        }
        $expander.on('webkitAnimationEnd transitionend', function() {
          $expander.parent().height('auto');
          $expander.remove();
          if (callback) {
            return callback.apply(_this, args);
          }
        });
        $expander.parent().removeClass('active');
        $expander.html('');
        return $expander.css({
          height: 0,
          opacity: 0
        });
      };
      this.init();
      return this;
    };
    $.baDumTss.prototype.defaults = {
      listSelector: 'ul li',
      scrollOffset: 120,
      expanderHeight: 350
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
