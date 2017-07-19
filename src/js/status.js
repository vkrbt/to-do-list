function bindStatusChangeEvent() {
  $('.check').bind('click', function(e) {
    statusChange(e.target.closest('.item').id, !e.target.checked);
  })
}

function statusChange(id, status) {
  $.ajax({
    url: 'http://localhost:3000/' + id,
    data: { active: status },
    type: 'PUT',
    success: function(data) {
      console.log(data);
    }
  });
}