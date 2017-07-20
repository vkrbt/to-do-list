'use strict';


function bindDeleteEvent() {
  $('.delete').bind('click', function(e) {
    var deleteCommand = new DeleteCommand(e.target.closest('.item').id);
    go(deleteCommand);
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