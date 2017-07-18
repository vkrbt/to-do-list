$('.delete').click(function(e) {
  console.log(e);
  console.log(e.target.closest('item'));
})