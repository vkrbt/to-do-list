'use strict';

$('#add').click(function(e) {
  addNoteEvent();
})

$('#new-note').keydown(function(event) {
  if (event.keyCode == 13) {
    addNoteEvent();
  }
});

function addNoteEvent() {
  let note = $('#new-note')[0].value;
  if (note) {
    var addCommand = new AddCommand(note);
    go(addCommand);
  } else {
    alert('Your input is empty');
  }
}

function deleteNoteNode(id) {
  return $('#' + id).remove()[0];
}

function restoreNoteNode(node) {
  $('#' + Router.getPathParam()).prepend(node);
}

function bindDeleteEvent(id) {
  function deleteEvent(e) {
    console.log(e);
    var deleteCommand = new DeleteCommand(e.target.closest('.item').id);
    go(deleteCommand);
  }
  if (id != undefined) {
    console.log($('#' + id + ' .delete').bind('click', deleteEvent));
  } else {
    $('.delete').bind('click', deleteEvent);
  }
}

function bindStatusChangeEvent(id) {
  function statusChangeEvent(e) {
    let statusCommand = new StatusChangeCommand(e.target.closest('.item').id, !e.target.checked);
    go(statusCommand);
  }
  if (id != undefined) {
    $('#' + id + ' .check').bind('click', statusChangeEvent);
  } else {
    $('.check').bind('click', statusChangeEvent);
  }
}

function bindEvents(id) {
  bindDeleteEvent(id);
  bindStatusChangeEvent(id);
}