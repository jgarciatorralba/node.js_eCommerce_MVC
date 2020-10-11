$('#loadPage').on('click', () => {
  let currentPage = $('#loadPage').data('currentpage');
  let totalPages = $('#loadPage').data('totalpages');
  console.log(currentPage);
  console.log(totalPages);

  $.ajax({
    url: '/products/' + (currentPage + 1),
    method: 'GET'
  }).done(response => {
      console.log(response);
  });
})