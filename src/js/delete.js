'use strict';

function deleteNote(id) {
  $.ajax({
    url: config.getLink() + id,
    type: 'DELETE',
    success: function(data) {
      if (data) {
        deleteNoteNode(id);
      }
    }
  });
}

function restoreNote(note) {
  console.log(note)
  let data = {
    text: note.text,
    active: note.active
  };
  return $.post(config.getLink(), data, function() {
    getNotes(Router.getPathParam());
  });
}

class DeleteCommand extends Command {
  constructor(id) {
    super();
    this.id = id;
  }
  do() {
    let self = this;
    getOne(this.id).then(function(data) {
      self.fullNote = data[0];
    });
    deleteNote(this.id);
  }
  undo() {
    let self = this;
    console.log(this);
    restoreNote(this.fullNote).then(function(res) {
      self.id = res[0]._id;
    });
  }
}