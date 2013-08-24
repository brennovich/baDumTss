describe 'BaDumTss', ->
  beforeEach ->
    loadFixtures 'fragment.html'
    @$element = $('#fixtures')

  describe 'plugin behavior', ->
    it 'should be available on the jQuery object', ->
      expect($.fn.baDumTss).toBeDefined()

    it 'should be chainable', ->
      expect(@$element.baDumTss()).toBe @$element

    it 'should offers default values', ->
      plugin = new $.baDumTss(@$element)

      expect(plugin.defaults).toBeDefined()

    it 'should overwrites the settings', ->
      customOptions = scrollOffset: 80
      plugin = new $.baDumTss(@$element, customOptions)

      expect(plugin.settings.scrollOffset).toBe(customOptions.scrollOffset)

