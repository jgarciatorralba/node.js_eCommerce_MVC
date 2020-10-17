// Import native 'node.js' modules
import path from "path";

// Import models
import { ProductModel } from "../models/ProductModel.js";
const Product = new ProductModel();
import { ImageModel } from "../models/ImageModel.js";
const Image = new ImageModel();
import { UserModel } from "../models/UserModel.js";
const User = new UserModel();

// Import VIEWS path
import {
  VIEWS
} from "./../config/app-config.js";

// Controller class
export class PublicController {

  async paginatedIndex(req, res){
    try{
      let results = await Product.getNumProducts();
      let numProducts = results[0].numProducts;
      let pageSize = Product.pageSize;
      let totalPages = Math.ceil(numProducts / pageSize);
      let products = await Product.getPage(1);
      let images = await Image.get();
      let user = req.user;
      let cart = [];
      if (typeof(user) !== "undefined") {
        cart = await Product.getUserCart(user.id);
      }
      
      res.render(
        path.resolve(VIEWS, "public", "homepage"), {
          title: "Homepage",
          images: images,
          products: products,
          totalPages: totalPages,
          user: user,
          cart: cart,
          csrfToken: req.csrfToken()
        }
      )
    } catch(e) {
      throw e;
    }
  }

  async getPageContent(req, res){
    try{
      let products = await Product.getPage(req.params.page);
      let images = await Image.get();
      let user = req.user;
      let cart = [];
      if (typeof(user) !== "undefined") {
        cart = await Product.getUserCart(user.id);
      }
      res.send({
        products: products,
        images: images,
        cart: cart
      });
    } catch(e) {
      throw e;
    }
  }

  async goToProduct(req, res){
    try {
      let product = await Product.getById(req.params.id);
      let images = await Image.getByProductId(req.params.id);
      let user = req.user;
      let cart = [];
      if (typeof(user) !== "undefined") {
        cart = await Product.getUserCart(user.id);
      }

      res.render(
        path.resolve(VIEWS, "public", "product", "product-details"), {
          title: "Product",
          product: product,
          images: images,
          user: user,
          cart: cart,
          csrfToken: req.csrfToken()
        }
      );
    } catch(e) {
      res.status(404).render(path.resolve(VIEWS, "404.ejs"), {title: "Error", layout: "./public/layouts/layout-user"});
      throw e;
    }
  }

  async goToCart(req, res){
    let user = req.user;
    let cart = [];
    let products = [];
    let images = [];
    if (typeof(user) !== "undefined") {
      cart = await Product.getUserCart(user.id);
      products = await Product.get();
      images = await Image.get();
    }

    res.render(
      path.resolve(VIEWS, "public", "product", "cart.ejs"), {
        title: "Shopping cart",
        user: user,
        cart: cart,
        products: products,
        images: images,
        csrfToken: req.csrfToken()
      }
    );
  }

  async addToCart(req, res){
    try{
      const { customer_id, product_id } = req.body
      let resultStock = await Product.updateStock(product_id, -1)
      let resultCart = await Product.createInCart(customer_id, product_id)
      res.send({
        messageStock: resultStock,
        messageCart: resultCart
      });
    } catch(e) {
      res.send({
        message: e.message
      });
      throw e;
    }
  }

  async removeFromCart(req, res){
    try{
      const { customer_id, product_id } = req.body
      let cartItems = await Product.getCartItem(customer_id, product_id)
      let resultStock = await Product.updateStock(product_id, cartItems[0].quantity)
      let resultCart = await Product.deleteInCart(customer_id, product_id)
      res.send({
        messageStock: resultStock,
        messageCart: resultCart
      });
    } catch(e) {
      res.send({
        message: e.message
      });
      throw e;
    }
  }

  async updateCart(req, res){
    try{
      const { customer_id, product_id, new_quantity } = req.body
      let cartItems = await Product.getCartItem(customer_id, product_id)
      let difference = cartItems[0].quantity - new_quantity
      let resultStock = await Product.updateStock(product_id, difference);
      let resultCart = await Product.updateInCart(customer_id, product_id, new_quantity)

      res.send({
        messageStock: resultStock,
        messageCart: resultCart
      });
    } catch(e) {
      res.send({
        message: e.message
      });
      throw e;
    }
  }

  async goToCheckout(req, res){
    let step = req.params.step;
    let checkoutView = "checkout-" + step + ".ejs";

    let user = req.user;
    let cart = [];
    let products = [];
    let images = [];
    let lastOrders = [];
    let ordersItems = [];
    if (typeof(user) !== "undefined") {
      cart = await Product.getUserCart(user.id);
      products = await Product.get();
      images = await Image.get();
      lastOrders = await Product.getLastOrderUser(user.id);
      ordersItems = await Product.getOrderItems();
    }

    res.render(
      path.resolve(VIEWS, "public", "product", checkoutView), {
        title: "Checkout",
        user: user,
        cart: cart,
        products: products,
        images: images,
        lastOrders: lastOrders,
        ordersItems: ordersItems,
        csrfToken: req.csrfToken()
      }
    );
  }

  async validateShipping(req, res){
    const {
      address,
      zipCode,
      country,
      phoneNumber
    } = req.body

    let validated = true;
    /* Validation (we could place here whatever 
      we wanted to validate for each field) */

    if(!validated){
      let error = new Error("Invalid input fields")
      res.render(
        path.resolve(VIEWS, "public", "product", "checkout-1.ejs"), {
          title: "Checkout",
          address: address,
          zipCode: zipCode,
          country: country,
          phoneNumber: phoneNumber,
          message: error,
          user: req.user,
          csrfToken: req.csrfToken()
        }
      );
    } else {
      const promise = User.addShippingDetails(req.user, [address, zipCode, country, phoneNumber]);
      promise
        .then(result => {
          req.flash('success_msg', result)
          res.redirect('/checkout/2')
        })
        .catch(error => {
          res.render(
            path.resolve(VIEWS, "public", "product", "checkout-1.ejs"), {
              title: "Checkout",
              address: address,
              zipCode: zipCode,
              country: country,
              phoneNumber: phoneNumber,
              user: req.user,
              message: error,
              csrfToken: req.csrfToken()
            }
          );
        })
    }
  }

  async validatePayment(req, res){
    let {
      ccNumber,
      cvvNumber
    } = req.body

    // Form validation
    let validated = true;

    let ccNumberCurated = ccNumber.replace(/-/g, "")
    ccNumberCurated = ccNumberCurated.replace(/ /g, "")
    let cvvNumberCurated = cvvNumber.replace(/-/g, "")
    cvvNumberCurated = cvvNumberCurated.replace(/ /g, "")

    let regExVisa = /^4[0-9]{12}(?:[0-9]{3})?$/;
    let regExMastercard = /^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/;
    let regExCVV = /^([0-9]{3,4})$/;

    let error;
    if (!regExCVV.test(cvvNumberCurated)){
      validated = false
      error = new Error("Invalid CVV number")
    }
    if(!regExVisa.test(ccNumberCurated) && !regExMastercard.test(ccNumberCurated)){
      validated = false
      error = new Error("Invalid Credit Card number")
    }

    if(!validated){
      res.render(
        path.resolve(VIEWS, "public", "product", "checkout-2.ejs"), {
          title: "Checkout",
          ccNumber: ccNumber,
          cvvNumber: cvvNumber,
          message: error,
          user: req.user,
          csrfToken: req.csrfToken()
        }
      );
    } else {
      const promise = User.addPaymentDetails(req.user, [ccNumber, cvvNumber]);
      promise
        .then(result => {
          req.flash('success_msg', result)
          res.redirect('/checkout/3')
        })
        .catch(error => {
          res.render(
            path.resolve(VIEWS, "public", "product", "checkout-2.ejs"), {
              title: "Checkout",
              ccNumber: ccNumber,
              cvvNumber: cvvNumber,
              message: error,
              user: req.user,
              csrfToken: req.csrfToken()
            }
          );
        })
    }
  }

  async confirmOrder(req, res){
    const {
      customer_id,
      total_order,
      products_stringified
    } = req.body

    const products = JSON.parse(products_stringified);

    let promises = [];
    let createOrderPromise = Product.createOrder(customer_id, total_order)
    createOrderPromise
      .then(orderId => {
        products.forEach(product => {
          let promise = Product.createOrderItem(orderId, product.id, product.price, product.quantity)
          promises.push(promise)
        })
      })
      .catch(e => {
        res.send(e.message)
      })

    Promise.all(promises)
      .then(() => {
        return Product.deleteUserCart(customer_id)
      })
      .then(result => {
        res.send(result)
      })
      .catch(error => {
        res.send(error.message)
      })
  }
}