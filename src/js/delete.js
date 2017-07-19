'use strict';


function bindDeleteEvent() {
  $('.delete').bind('click', function(e) {
    deleteNote(e.target.closest('.item').id);
  });
}

function deleteNote(id) {
  $.ajax({
    url: 'http://localhost:3000/' + id,
    type: 'DELETE',
    success: function(data) {
      if(data){
        getNotes();
      }
    }
  });
}