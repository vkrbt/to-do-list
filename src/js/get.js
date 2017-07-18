function getNotes() {
  $('#all').html('');
  $.get('http://localhost:3000/').then(function(data) {
    return data.forEach(function(item) {
      $('#all').append(`<div id=`+item._id+` class="col-xs-12 item"><p class='pull-left'>` + item.text +
        `</p>
          <div class='pull-right'>
            <button class="btn btn-default"><i class="fa fa-pencil" aria-hidden="true"></i></button>
            <button class="btn btn-danger delete"><i class="fa fa-trash" aria-hidden="true"></i></button>
          <div>
        </div>`);
    });
  });
}

getNotes();