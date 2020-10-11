$('#loadPage').on('click', () => {
  let currentPage = parseInt($('#loadPage').attr('data-currentpage'));
  let totalPages = parseInt($('#loadPage').attr('data-totalpages'));

  $('#loadPage').attr('data-currentPage', currentPage + 1);

  $.ajax({
    url: '/products/' + (currentPage + 1),
    method: 'GET'
  }).done(response => {
    response.products.forEach(product => {
      printCard(product, response.images);
    })

    currentPage++;

    if(currentPage >= totalPages) {
      $('#loadPage').prop('disabled', true);
    } else {
      $('#loadPage').attr('data-currentPage', currentPage);
    }
  });
})

function printCard(product, images) {
  let productImages = [];
  images.forEach(image => {
    if (image.product_id == product.id) {
      productImages.push(image);
    }
  })

  let productCard = `
    <div class="col-md-4">
      <div class="card mb-4 shadow-sm">
        <img 
          src="${productImages[0].path}" 
          alt="" 
          width="100%"
        >
        <div class="card-body border-top">
          <b class="card-text">
            ${product.title}
          </b>
          <p class="card-text mt-2">
            ${product.description}
          </p>
          <div class="d-flex justify-content-between align-items-center">
            <button 
              type="button" 
              class="btn btn-sm btn-outline-secondary" 
              data-product_id="${product.id}"
            >
              Add to cart
            </button>
            <b class="text-body">
              ${product.price} €
            </b>
          </div>
        </div>
      </div>
    </div>
  `;

  $('.album .container .row').append(productCard);
}