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
    clearTimeout(super.timeoutId);
    if (Router.getCurrentPath().slice(2) != 'all') {
      super.timeoutId = setTimeout(function() {
        getNotes(Router.getCurrentPath().slice(2));
      }, 1000);
    }
  }
  undo() {
    statusChange(this.id, !this.status);
    clearTimeout(super.timeoutId);
    if (Router.getCurrentPath().slice(2) == 'all') {
      changeCheckbox(this.id, !this.status);
    } else {
      setTimeout(function() {
        getNotes(Router.getCurrentPath().slice(2));
      }, 100)
    }
  }
}