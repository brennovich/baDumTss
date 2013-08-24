(function() {
  describe('BaDumTss', function() {
    beforeEach(function() {
      loadFixtures('fragment.html');
      return this.$element = $('#fixtures');
    });
    return describe('plugin behavior', function() {
      it('should be available on the jQuery object', function() {
        return expect($.fn.baDumTss).toBeDefined();
      });
      it('should be chainable', function() {
        return expect(this.$element.baDumTss()).toBe(this.$element);
      });
      it('should offers default values', function() {
        var plugin;
        plugin = new $.baDumTss(this.$element);
        return expect(plugin.defaults).toBeDefined();
      });
      return it('should overwrites the settings', function() {
        var customOptions, plugin;
        customOptions = {
          scrollOffset: 80
        };
        plugin = new $.baDumTss(this.$element, customOptions);
        return expect(plugin.settings.scrollOffset).toBe(customOptions.scrollOffset);
      });
    });
  });

}).call(this);
