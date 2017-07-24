'use strict';

function addNote(note) {
  let data = {
    text: note,
    active: true
  };
  return $.post(config.getLink(), data, function(data) {
    $('#new-note')[0].value = '';
  })
}


class AddCommand extends Command {
  constructor(note) {
    super();
    this.note = note;
  }
  do() {
    let self = this;
    addNote(this.note).then(function(data) {
      self.fullNote = data[0];
      if (Router.getPathParam() != 'done') {
        addNoteNode('#' + Router.getPathParam(), data[0]);
        bindEvents(self._id);
      }
    });
  }
  undo() {
    deleteNote(this.fullNote._id);
  }
}