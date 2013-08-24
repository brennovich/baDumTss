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

    @getSetting = (key) ->
      @settings[key]

    @callSettingFunction = (name, args = []) ->
      @settings[name].apply(this, args)

    @init = ->
      @settings = $.extend({}, @defaults, options)

    @init()

    @

  $.baDumTss::defaults =
    listElement: 'ul'
    scrollOffset: 120
    expanderMargin: 50

  $.fn.baDumTss = (options) ->
    @each ->
      if $(@).data('baDumTss') is undefined
        plugin = new $.baDumTss(@, options)
        $(@).data('baDumTss', plugin)
