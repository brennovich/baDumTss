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

    @buildExpander = ($el, $anchor) ->
      $('<div>',
        class: 'expander'
        html: $('<div>', class: 'expander-container')
      ).appendTo $el

      $el.find('.expander .expander-container').append(
        $ '<figure>', html: $('<img>', src: $anchor.prop('href'))
      ).append(
        $('<div>', class: 'details')
      ).append $('<a>', class: 'close', href: '#', text: 'X')

      $el.find('a.close').click (e) ->
        e.preventDefault()
        $anchor.trigger 'click'

      $expander = $el.children('.expander')
      $details = $expander.find('.details')
      $img = $expander.find('img')

      $expander.height @settings.expanderHeight
      $el.height @settings.expanderHeight + $el.height()
      $img.height $expander.find('figure').height

      $img.load =>
        $details.append(
          $('<h3>', html: $anchor.children('img').prop('title'))
        ).append $('<p>', html: $anchor.children('img').data('description'))

        $details.css('opacity', 1)
        $img.css('opacity', 1)

        @focusToEl $el

    @focusToEl = ($el) ->
      windowDifference = $(window).height() - $(window).height() - 2
      offset = $el.offset().top + @settings.scrollOffset
      smartOffset = offset + windowDifference

      if windowDifference < 0 and (smartOffset > Math.abs(windowDifference))
        offset = smartOffset

      $('html, body').animate scrollTop: offset, 'fast'

    @removeExpander = ($expander, callback, args = []) ->
      $expander.on 'webkitAnimationEnd transitionend', =>
        $expander.parent().height 'auto'
        $expander.remove()

        callback.apply(@, args) if callback

      $expander.parent().removeClass 'active'
      $expander.html ''
      $expander.css height: 0, opacity: 0

    @init()

    @

  $.baDumTss::defaults =
    listSelector: 'ul li'
    scrollOffset: 120
    expanderHeight: 350

  $.fn.baDumTss = (options) ->
    @each ->
      if $(@).data('baDumTss') is undefined
        plugin = new $.baDumTss(@, options)
        $(@).data('baDumTss', plugin)
