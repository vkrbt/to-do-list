'use strict';


function bindDeleteEvent() {
  $('.delete').bind('click', function(e) {
    deleteNote(e.target.closest('.item').id);
  });
}

function deleteNote(id) {
  $.ajax({
    url: config.getLink() + id,
    type: 'DELETE',
    success: function(data) {
      if (data) {
        getNotes(Router.getCurrentPath().slice(2));
      }
    }
  });
}

class DeleteNote extends Command {
  constructor(id) {
    super();
    this.id = id;
  }
  do() {
    this.fullNotePromise = getOne(this.id);
    console.log(this);
    deleteNote(this.id);
  }
  undo() {
    console.log(this);
    this.fullNotePromise.then(function(data) {
      restoreNote(data[0]).then(function(res) {
        this.id = res[0]._id;
      });
    })
  }
}