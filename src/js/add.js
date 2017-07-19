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
    addNote(note);
  } else {
    alert('Your input is empty');
  }
}

function addNote(note) {
  let data = {
    text: note,
    active: true
  };
  return $.post(config.getLink(), data, function(data) {
    $('#new-note')[0].value = '';
    //alert('Note was added');
    getNotes(Router.getCurrentPath().slice(2));
  })
}

function restoreNote(note){
  let data = {
    text: note.text,
    active: note.active
  };
  return $.post(config.getLink(), data, function(){
    getNotes(Router.getCurrentPath().slice(2));
  });
}

class AddNote extends Command{
  constructor(note){
    super();
    this.note = note;
  }
  do(){
    this.fullNotePromise = addNote(this.note);
  }
  undo(){
    this.fullNotePromise.then(function(data){
      deleteNote(data[0]._id);
    })
  }
}
