'use strict';

function getNotes(status) {
  $('#' + status).html('');
  if (status == 'all') {
    loadAllNotes();
  }
  if (status == 'active') {
    loadActiveNotes();
  }
  if (status == 'done') {
    loadDoneNotes();
  }
}

function loadAllNotes() {
  $.get(config.getLink()).then(function(data) {
    insertNotes('#all', data);
    bindEvents();
  });
}

function loadActiveNotes() {
  $.get(config.getLink() + 'get-active').then(function(data) {
    insertNotes('#active', data);
    bindEvents();
  });
}

function loadDoneNotes() {
  $.get(config.getLink() + 'get-done').then(function(data) {
    insertNotes('#done', data);
    bindEvents();
  });
}

function addNoteNode(container, item) {
  $(container).prepend(`<div id=${item._id} class="col-xs-12 item">
  <p class='pull-left'>
    <input class='check' type='checkbox' ${(!stringToBoolean(item.active) ? 'checked' : '')} >${item.text}
  </p>
  <div class='pull-right'>
    <button class="btn btn-danger delete"><i class="fa fa-trash" aria-hidden="true"></i></button>
  <div>
</div>`);
}

function insertNotes(container, data) {
  data.forEach(function(item) {
    addNoteNode(container, item);
  });
}

function getOne(id) {
  return $.get(config.getLink() + 'get/' + id);
}