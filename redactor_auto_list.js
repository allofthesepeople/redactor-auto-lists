/**
 * Plugin to generate an unorderd list on use of ‘-’ or ‘*’, will also
 * create an ordered list of keying ‘1.’.
 */

if (typeof RedactorPlugins === 'undefined') var RedactorPlugins = {};

RedactorPlugins.myPlugins = {
  autoLists: function(e) {
    if (e.which != 32) return;  // Check if current charater is a space
    var c = this.getBlock();  // Get existing content of this block
    var t = (c.innerText || c.textContent).trim()  // Get the string from the html
    if (t.length > 2) return;  // Forget anything over 3 characters
    var l = '';
    switch(t) {
      case '*':
      case '-':
        l = 'insertunorderedlist'
        break;
      case '1.':
        l = 'insertorderedlist'
        break;
      default:
        return;
    }
    this.exec(l);
    this.getBlock().innerHTML = "";
    e.preventDefault();
  }
}

// Use with something like:
// $('#body').redactor({
//   plugins: ['myPlugins'],
//   keydownCallback: function(e) {
//     this.autoLists(e);
//   },
// });
