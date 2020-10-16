$('.quantity').on('change', function() {
  let customerId = parseInt($(this).attr('data-userid'));
  let productId = parseInt($(this).attr('data-productid'));
  let newQty = parseInt($(this).val());
  let action = "";

  let token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

  if (newQty <= 0) {
    // Remove item from cart
    action = "removeFromCart"
  } else {
    // Update cart item quantity if possible (check for stock)
    action = "updateCart"
  }

  $.ajax({
    url: '/cart/' + action,
    xhrFields: { withCredentials: true },
    headers: {'x-csrf-token': token},
    method: 'POST',
    data: {
      customer_id: customerId,
      product_id: productId,
      new_quantity: newQty
    }
  }).done(response => {
    if (response.message !== undefined) {
      $('.alert-danger span').text(response.message);
      $('.alert-danger').fadeIn(800).delay(2000).fadeOut(800);
      $('.alert-danger').removeClass('d-none');
    }

    if (response.messageCart == "Product updated in customer cart") {
      console.log(response.messageCart);
    } else if (response.messageCart == "Product removed from customer cart") {
      console.log(response.messageCart);
      let productCount = parseInt($('#productCount').text());
      $('#productCount').text(productCount - 1);
      $(this).parent().parent().remove();
      if ($('.product').length == 0) {
        let paragraph = `
          <div class="row no-products">
            <h5 class="h6 mx-auto my-3">
              There are no more products in your cart.
            </h5>
          </div>
        `;
        $('.header-cart').after(paragraph);
        $('#btn-checkout').addClass('disabled');
      }
    }
  });
})