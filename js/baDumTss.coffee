#
# Name: Ba Dum Tss
# Author: Brenno Costa, http://brennovich.com, @brennovich
# Version: 0.1.0
# Repo: http://github.com/brennovich/baDumTss
# Website: 
#

jQuery ->
  $.baDumTss = (element, options) ->
    state = ''

    @settings = {}

    @$element = $ element

    @setState = (_state) -> state = _state

    @getState = -> state

    @getSetting = (key) ->
      @settings[key]

    @callSettingFunction = (name, args = []) ->
      @settings[name].apply(this, args)

    @init = ->
      @settings = $.extend({}, @defaults, options)

      @setState 'ready'

    @init()

    @

  $.baDumTss::defaults =
      message: 'Hello world'

  $.fn.baDumTss = (options) ->
    this.each ->
      if $(this).data('baDumTss') is undefined
        plugin = new $.baDumTss(this, options)
        $(this).data('baDumTss', plugin)
