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

    @callback = (name, args = []) -> @settings[name].apply(this, args)

    @setState = (_state) -> state = _state

    @getState = -> state

    @init = ->
      @settings = $.extend({}, @defaults, options)
      @settings.spinConfig.top = @settings.expanderHeight * 0.4
      @$imageList = @$element.find @settings.listSelector

      @bindImageAnchorEvents()
      @setState 'ready'


    @bindImageAnchorEvents = ->
      @$imageList.children('a').on 'click', (e) =>
        e.preventDefault()
        @appendExpander $(e.currentTarget)

    @appendExpander = ($anchor) ->
      $listItem = $anchor.parent()
      $internalExpander = $listItem.children('.expander')
      $globalExpander = @$imageList.find('.expander')

      $listItem.addClass 'active'

      if $globalExpander.length
        createCallback = @buildExpander if $listItem.hasClass('active') && !$globalExpander.is($internalExpander)
        @removeExpander $globalExpander, createCallback, [$listItem, $anchor]
      else
        @buildExpander $listItem, $anchor

    @expanderMarkup = $ '<div>', class: 'expander' html: $('<div>', class: 'expander-container')

    @containerContentMarkup = $ '<figure>', html: $('<img>', src: $anchor.prop('href')).append($('<div>', class: 'details')).append $('<a>', class: 'close', href: '#', text: 'X')

    @buildExpander = ($el, $anchor) ->
      @expanderMarkup.appendTo $el
      $el.find('.expander .expander-container').append @containerContentMarkup

      @bindCloseAction $el

      $expander = $el.children('.expander')
      $details = $expander.find('.details')
      $img = $expander.find('img')

      $expander.height @settings.expanderHeight
      $el.height @settings.expanderHeight + $el.height()
      $img.height $expander.find('figure').height
      $expander.spin @settings.spinConfig

      $img.load =>
        $details.append(
          $('<h3>', html: $anchor.children('img').prop('title'))
        ).append $('<p>', html: $anchor.children('img').data('description'))

        $details.css('opacity', 1)
        $img.css('opacity', 1)
        $expander.spin(false)

        @focusToEl $el

    @focusToEl = ($el) ->
      windowDifference = $(window).height() - $(window).height() - 2
      offset = $el.offset().top + @settings.scrollOffset
      smartOffset = offset + windowDifference

      if windowDifference < 0 and (smartOffset > Math.abs(windowDifference))
        offset = smartOffset

      $('html, body').animate scrollTop: offset, 'fast'

    @removeExpander = ($expander, callback, args = []) ->
      removeAction = =>
        $expander.parent().height 'auto'
        $expander.remove()

        callback.apply(@, args) if callback

      $expander.parent().removeClass 'active'
      $expander.html ''
      $expander.css height: 0, opacity: 0

      removeAction() if $expander.length

    @bindCloseAction = ($el)->
      $el.find('a.close').click (e) ->
        e.preventDefault()
        $el.children('a').trigger 'click'

    @init()

    @

  $.baDumTss::defaults =
    listSelector: 'ul li' # List element
    scrollOffset: 120 # Distance to avoid the top of browser stick on the expander
    expanderHeight: 350 # Height of the previewer
    spinConfig:
      lines: 9, # The number of lines to draw
      length: 0, # The length of each line
      width: 12, # The line thickness
      radius: 17, # The radius of the inner circle
      corners: 1, # Corner roundness (0..1)
      rotate: 24, # The rotation offset
      direction: 1, # 1: clockwise, -1: counterclockwise
      color: '#454545', # #rgb or #rrggbb or array of colors
      speed: 0.8, # Rounds per second
      trail: 62, # Afterglow percentage
      shadow: false, # Whether to render a shadow
      hwaccel: true, # Whether to use hardware acceleration
      className: 'spinner', # The CSS class to assign to the spinner
      zIndex: 2e9, # The z-index (defaults to 2000000000)
      left: 'auto' # Left position relative to parent in px

  $.fn.baDumTss = (options) ->
    @each ->
      if $(@).data('baDumTss') is undefined
        plugin = new $.baDumTss(@, options)
        $(@).data('baDumTss', plugin)
