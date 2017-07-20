function bindStatusChangeEvent() {
  $('.check').bind('click', function(e) {
    let statusCommand = new StatusChangeCommand(e.target.closest('.item').id, !e.target.checked);
    go(statusCommand);
  })
}

function statusChange(id, status) {
  $.ajax({
    url: config.getLink() + id,
    data: { active: status },
    type: 'PUT',
    success: function(data) {
      console.log(data);
    }
  });
}

class StatusChangeCommand extends Command {
  constructor(id, status) {
    super();
    this.id = id;
    this.status = status;
  }
  do() {
    statusChange(this.id, this.status);
    //getNotes(Router.getCurrentPath().slice(2));
  }
  undo() {
    statusChange(this.id, !this.status);
    getNotes(Router.getCurrentPath().slice(2));
  }
}