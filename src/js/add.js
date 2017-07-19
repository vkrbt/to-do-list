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
  $.post('http://localhost:3000/', data, function(data) {
    $('#new-note')[0].value = '';
    alert('Note was added');
    getNotes();
  })
}

class AddNote extends Command{
  constructor(note){
    super();
    this.note = note;
  }
  do(){
    
  }
  undo(){

  }
}
