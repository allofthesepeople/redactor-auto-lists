(function($) {
  $.Redactor.prototype.autoLists = function() {

    // Valid keyCodes: '*', '-', '1', '.'
    var keyCodes   = [42, 45, 49, 46];
    var prevKey    = false;
    var action     = false;


    /**
     * Registers the plugin with redactor.
     *
     * @return {void}
     */
    function init() {
      this.$editor.on('keypress', $.proxy(keyHandler, this));
      this.$editor.on('keydown', $.proxy(spaceHandler, this));
    }


    /**
     * Triggers the toggle list action.
     *
     * @param {window.event} ev
     * @return {void}
     */
    function spaceHandler(ev) {
      if (ev.which !== 32 || action === false) return;

      var strLen = currentStrLen(this.selection.getCurrent());

      if ((strLen !== 1 && action === 'unorderedlist') || (strLen !== 2 && action === 'orderedlist')) {
        action = false;
        return;
      }

      ev.preventDefault();

      this.list.toggle(action);
      var el = this.selection.getCurrent();

      // Get rid of the span that redactor can add
      while (el.firstChild) el.removeChild(el.firstChild);

      // Safari didn't want to work with jQuery’s empty()/text('') so: javascript
      (el.textContent !== undefined) ? el.textContent = '': el.innerText = '';

      action = false;
    }


    /**
     * Figurs out what sort of list we want to make
     *
     * @param {window.event} ev
     * @return {void}
     */
    function keyHandler(ev) {
      var key = ev.which;

      if ($.inArray( key, keyCodes) === -1 && key !== 32) {
        prevKey = false;
        return;
      }

      if (currentStrLen(this.selection.getCurrent()) > 1) return;

      switch (key) {
        case 42:
        case 45:
          action = 'unorderedlist';
          break;
        case 49:
         prevKey = 49;
         break;
        case 46:
          if (prevKey !== 49) return;
          action = 'orderedlist';
          prevKey = false;
          break;
        default:
          return;
      }
      return;
    }


    /**
     * Simple helper to determine the string leangth of the content.
     *
     * NOTE: the editor will add the `&#8203;` character, e.g. after
     * closing previous lists. We need to check for it.
     *
     * @param {DOM element} el
     * @return {integer}
     */
    function currentStrLen(el) {
      return $(el).text().replace(/[\u200B]/g, '').trim().length;
    }


    return {
        init: init
    };
  };
})($);
