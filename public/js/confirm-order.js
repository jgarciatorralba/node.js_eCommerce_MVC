$('#btn-confirmOrder').on('click', function() {

  let termsAccepted = $('#terms').is(':checked');

  let token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

  if (!termsAccepted) {
    $('#alert-noTerms span').text('Please accept the terms and conditions')
    $('#alert-noTerms').fadeIn(800).delay(2000).fadeOut(800)
  } else {

    let customerId = parseInt($(this).attr('data-userid'));
    let totalOrder = parseFloat($('#totalOrder').text());
    let products = [];

    $('.product').each(function(index, element) {
      let productId = parseInt($(element).find('.product-price').attr('data-productId'))
      let productPrice = parseFloat($(element).find('.product-price').text())
      let productQty = parseFloat($(element).find('.product-quantity').text())
      let product = {
        id: productId,
        price: productPrice,
        quantity: productQty
      };
      products.push(product);
    })

    $.ajax({
      url: '/checkout/3',
      xhrFields: { withCredentials: true },
      headers: { 'x-csrf-token': token },
      method: 'POST',
      data: {
        customer_id: customerId,
        total_order: totalOrder,
        products_stringified: JSON.stringify(products)
      }
    }).done(response => {
      if (response == "Database error") {
        $('#alert-ajax span').text(response)
        $('#alert-ajax').fadeIn(800).delay(2000).fadeOut(800)
      } else if (response == "All items removed from the cart") {
        let urlParts = window.location.href.split("/");
        urlParts[urlParts.length - 1] = 4;
        let newUrl = urlParts.join("/");
        window.location.href = newUrl;
      }
    })
  }
})