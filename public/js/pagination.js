$('#loadPage').on('click', function() {
  let currentPage = parseInt($('#loadPage').attr('data-currentpage'));
  let totalPages = parseInt($('#loadPage').attr('data-totalpages'));
  let userId = $('#loadPage').attr('data-userid');

  $('#loadPage').attr('data-currentPage', currentPage + 1);

  $.ajax({
    url: '/products/' + (currentPage + 1),
    method: 'GET'
  }).done(response => {
    let cart = response.cart;

    response.products.forEach(product => {
      printCard(product, userId, cart, response.images);
    })

    $('.btn-cart').each(function(index, element) {
      if ($(element).attr('data-listener') == undefined){
        $(element).on('click', toggleCart);
        $(element).attr('data-listener', 'true')
      }
    })

    currentPage++;

    if(currentPage >= totalPages) {
      $('#loadPage').prop('disabled', true);
    } else {
      $('#loadPage').attr('data-currentPage', currentPage);
    }
  });
})

function printCard(product, userId, cart, images) {
  let productImages = [];
  images.forEach(image => {
    if (image.product_id == product.id) {
      productImages.push(image);
    }
  })

  let disabled = "";
  if (product.stock == 0) disabled = "disabled";
  if (userId == "") disabled = "disabled";

  let productIsInCustomerCart = false;
  cart.forEach(item => {
    if (item.product_id == product.id && item.customer_id == userId) {
      productIsInCustomerCart = true;
    }
  })

  let productCard = "";
  if (productIsInCustomerCart) {
    productCard = `
      <div class="col-md-4">
        <div class="card mb-4 shadow-sm">
          <a href="/product/${product.id}">
            <img 
              src="${productImages[0].path}" 
              alt="" 
              width="100%"
            >
          </a>
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
                class="btn btn-sm btn-outline-danger btn-cart" 
                data-userId="${userId}" 
                data-productId="${product.id}"` + 
                disabled + 
              `>
                Remove
              </button>
              <b class="text-body">
                ${product.price} €
              </b>
            </div>
          </div>
        </div>
      </div>
    `;
  } else {
    productCard = `
    <div class="col-md-4">
      <div class="card mb-4 shadow-sm">
        <a href="/product/${product.id}">
          <img 
            src="${productImages[0].path}" 
            alt="" 
            width="100%"
          >
        </a>
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
              class="btn btn-sm btn-outline-info btn-cart" 
              data-userId="${userId}" 
              data-productId="${product.id}"` + 
              disabled + 
            `>
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
  }

  $('.album .container .row').append(productCard);
}