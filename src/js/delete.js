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
    let self = this;
    getOne(this.id).then(function(data) {
      this.fullNote = data[0];
    });
    console.log(this);
    deleteNote(this.id);
  }
  undo() {
    let self = this;
    restoreNote(this.fullNote).then(function(res) {
      self.id = res[0]._id;
    });
  }
}