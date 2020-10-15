/**
 * Helper function to toggle functionality 
 * between "add to cart" and "remove from cart".
 */

function toggleCart(){
  let customerId = parseInt($(this).attr('data-userid'));
  let productId = parseInt($(this).attr('data-productid'));

  let action = "";
  if ($(this).text().trim() == "Add to cart") {
    action = "addToCart"
  } else if ($(this).text().trim() == "Remove") {
    action = "removeFromCart"
  }

  $.ajax({
    url: '/cart/' + action,
    method: 'POST',
    data: {
      customer_id: customerId,
      product_id: productId
    }
  }).done(response => {
    let productCount = parseInt($('#productCount').text());
    if (response.result == "Product added to customer cart") {
      $('#productCount').text(productCount + 1);
      $(this).text('Remove');
      $(this).removeClass('btn-outline-info');
      $(this).addClass('btn-outline-danger');
    } else if (response.result == "Product removed from customer cart") {
      $('#productCount').text(productCount - 1);
      $(this).text('Add to cart');
      $(this).removeClass('btn-outline-danger');
      $(this).addClass('btn-outline-info');
    }
  });
}