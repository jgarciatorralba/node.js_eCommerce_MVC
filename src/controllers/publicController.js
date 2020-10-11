/**
 * Controller to handle all requests from the public-facing views
 */

// Import native 'node.js' modules
import path from "path";

// Import models and methods
import * as Product from "./../models/Products.js";
import * as Image from "./../models/Images.js";

// Import VIEWS path
import {
  VIEWS
} from "./../config/app-config.js";

export function index(req, res){
  Product.get(req.con, (err, products) => {
    Image.get(req.con, (err, images) => {
      res.render(
        path.resolve(VIEWS, "public", "homepage"), {
          title: "Homepage",
          images: images,
          products: products
        });
    })
  })
}

export function paginatedIndex(req, res){
  Product.getNumProducts(req.con, (err, results) => {
    let numProducts = results[0].numProducts;
    let pageSize = Product.pageSize;
    let totalPages = Math.ceil(numProducts / pageSize);

    Product.getPage(req.con, 1, (err, products) => {
      Image.get(req.con, (err, images) => {
        res.render(
          path.resolve(VIEWS, "public", "homepage"), {
            title: "Homepage",
            images: images,
            products: products,
            totalPages: totalPages
          });
      })
    })
  })
}

export function getPageContent(req, res){
  Product.getPage(req.con, req.params.page, (err, products) => {
    Image.get(req.con, (err, images) => {
      res.send({
        products: products,
        images: images
      });
    })
  })
}

export function getProduct(req, res){
  Product.getById(req.con, req.params.id, (err, product) => {
    res.render(
      path.resolve(VIEWS, "public", "product-details"), {
        title: "Product",
        product: product
      });
  })
}

export function goToCart(req, res){
  res.render(path.resolve(VIEWS, "public", "cart.ejs"), { title: "Shopping cart" });
}