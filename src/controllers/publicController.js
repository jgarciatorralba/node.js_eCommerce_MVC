// Import native 'node.js' modules
import path from "path";

// Import models
import { ProductModel } from "../models/ProductModel.js";
const Product = new ProductModel();
import { ImageModel } from "../models/ImageModel.js";
const Image = new ImageModel();

// Import VIEWS path
import {
  VIEWS
} from "./../config/app-config.js";

// Controller class
export class PublicController {

  async index(req, res){
    try {
      let products = await Product.get();
      let images = await Image.get();
      res.render(
        path.resolve(VIEWS, "public", "homepage"), {
          title: "Homepage",
          images: images,
          products: products
        }
      )
    } catch(e){
      throw e;
    }
  }

  async paginatedIndex(req, res){
    try{
      let results = await Product.getNumProducts();
      let numProducts = results[0].numProducts;
      let pageSize = Product.pageSize;
      let totalPages = Math.ceil(numProducts / pageSize);
      let products = await Product.getPage(1);
      let images = await Image.get();
      res.render(
        path.resolve(VIEWS, "public", "homepage"), {
          title: "Homepage",
          images: images,
          products: products,
          totalPages: totalPages
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
      res.send({
        products: products,
        images: images
      });
    } catch(e) {
      throw e;
    }
  }

  async getProduct(req, res){
    try {
      let product = await Product.getById(req.params.id);
      let images = await Image.getByProductId(req.params.id);
      res.render(
        path.resolve(VIEWS, "public", "product", "product-details"), {
          title: "Product",
          product: product,
          images: images
        }
      );
    } catch(e) {
      // res.redirect("/");
      res.status(404).render(path.resolve(VIEWS, "404.ejs"), {title: "Error", layout: "./public/layouts/layout-user"});
      throw e;
    }
  }

  goToCart(req, res){
    res.render(path.resolve(VIEWS, "public", "product", "cart.ejs"), { title: "Shopping cart" });
  }

  goToCheckout(req, res){
    let step = req.params.step;
    let checkoutView = "checkout-" + step + ".ejs";
    res.render(path.resolve(VIEWS, "public", "product", checkoutView), {
      title: "Checkout"
    });
  }
}