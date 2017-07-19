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
  $.get('http://localhost:3000/').then(function(data) {
    insertNotes('#all', data);
    bindDeleteEvent();
    bindStatusChangeEvent();
  });
}

function loadActiveNotes() {
  $.get('http://localhost:3000/get-active').then(function(data) {
    insertNotes('#active', data);
    bindDeleteEvent();
    bindStatusChangeEvent();
  });
}

function loadDoneNotes() {
  $.get('http://localhost:3000/get-done').then(function(data) {
    insertNotes('#done', data);
    bindDeleteEvent();
    bindStatusChangeEvent();
  });
}

function insertNotes(container, data) {
  data.reverse();
  data.forEach(function(item) {
    $(container).append(`<div id=` + item._id + ` class="col-xs-12 item">
        <p class='pull-left'><input class='check' type='checkbox'` +
      (!toBoolean(item.active) ? 'checked' : '') + `>` + item.text +
      `</p>
          <div class='pull-right'>
            <button class="btn btn-danger delete"><i class="fa fa-trash" aria-hidden="true"></i></button>
          <div>
        </div>`);
  });
}