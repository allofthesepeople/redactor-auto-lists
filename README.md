redactor-auto-lists
===================

*Simple plugin for redactor JavaScript html editor (http://imperavi.com/redactor/).*

Creates lists from text input, rather than having to use the menu bar; just like your favourite word processor or markdown syntax. Works on list conventions of '-', '*' for an unordered list and '1.' to start an ordered list.

## To install

Just add to the plugin as per docs:

```javascript

$(function() {
  $('#content').redactor({
    focus: true,
    plugins: ['autoLists'],
  });
});

```
