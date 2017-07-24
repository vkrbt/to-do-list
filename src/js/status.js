'use strict';

function statusChange(id, status) {
  return $.ajax({
    url: config.getLink() + id,
    data: { active: status },
    type: 'PUT'
  });
}

function changeCheckbox(id, status) {
  $('#' + id).find('.check')[0].checked = !status;
}

class StatusChangeCommand extends Command {
  constructor(id, status) {
    super();
    this.id = id;
    this.status = status;
  }
  do() {
    statusChange(this.id, this.status);
    changeCheckbox(this.id, this.status);
    if (Router.getPathParam() != 'all') {
      this.timeoutId = setTimeout(() => {
        console.log(this);
        this.node = deleteNoteNode(this.id);
      }, 700);
    }
  }
  undo() {
    statusChange(this.id, !this.status);
    if (Router.getPathParam() != 'all') {
      clearTimeout(this.timeoutId);
      restoreNoteNode(this.node);
      changeCheckbox(this.id, !this.status);
    }
  }
}