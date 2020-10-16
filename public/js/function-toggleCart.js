/**
 * Helper function to toggle functionality 
 * between "add to cart" and "remove from cart".
 */

function toggleCart(){
  let customerId = parseInt($(this).attr('data-userid'));
  let productId = parseInt($(this).attr('data-productid'));

  let token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

  let action = "";
  if ($(this).text().trim() == "Add to cart") {
    action = "addToCart"
  } else if ($(this).text().trim() == "Remove") {
    action = "removeFromCart"
  }

  $.ajax({
    url: '/cart/' + action,
    xhrFields: { withCredentials: true },
    headers: {'x-csrf-token': token},
    method: 'POST',
    data: {
      customer_id: customerId,
      product_id: productId
    }
  }).done(response => {
    let productCount = parseInt($('#productCount').text());
    if (response.messageCart == "Product added to customer cart") {
      $('#productCount').text(productCount + 1);
      $(this).text('Remove');
      $(this).removeClass('btn-outline-info');
      $(this).addClass('btn-outline-danger');
      if ($('#product-detail-stock') !== null) {
        let stock = parseInt($('#product-detail-stock').text())
        $('#product-detail-stock').text(stock - 1)
      }
    } else if (response.messageCart == "Product removed from customer cart") {
      $('#productCount').text(productCount - 1);
      $(this).text('Add to cart');
      $(this).removeClass('btn-outline-danger');
      $(this).addClass('btn-outline-info');
      if ($('#product-detail-stock') !== null) {
        let stock = parseInt($('#product-detail-stock').text())
        $('#product-detail-stock').text(stock + 1)
      }
    }
  });
}