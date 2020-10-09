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

export function getProduct(req, res){
  Product.getById(req.con, req.params.id, (err, product) => {
    res.render(
      path.resolve(VIEWS, "public", "product-details"), {
        title: "Product",
        product: product
      });
  })
}