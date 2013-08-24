(function() {
  jQuery(function() {
    $.baDumTss = function(element, options) {
      var state;
      state = '';
      this.settings = {};
      this.$element = $(element);
      this.getSetting = function(key) {
        return this.settings[key];
      };
      this.callSettingFunction = function(name, args) {
        if (args == null) {
          args = [];
        }
        return this.settings[name].apply(this, args);
      };
      this.init = function() {
        return this.settings = $.extend({}, this.defaults, options);
      };
      this.init();
      return this;
    };
    $.baDumTss.prototype.defaults = {
      listElement: 'ul',
      scrollOffset: 120,
      expanderMargin: 50
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
