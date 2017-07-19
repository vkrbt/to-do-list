function bindStatusChangeEvent() {
  $('.check').bind('click', function(e) {
    statusChange(e.target.closest('.item').id, !e.target.checked);
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

class ChangeStatusNote extends Command {
  constructor(id, status) {
    super();
    this.id = id;
    this.status = status;
  }
  do() {
    statusChange(this.id, this.status);
    getNotes(Router.getCurrentPath().slice(2));
  }
  undo() {
    statusChange(this.id, !this.status);
    getNotes(Router.getCurrentPath().slice(2));
  }
}