// Import native 'node.js' modules
import path from "path";

// Import model methods
import * as Product from "./../models/Products.js";

// Import VIEWS path
import {
  VIEWS
} from "./../config/app-config.js";

export function index(req, res){
  Product.get(req.con, (err, data) => {
    res.render(
      path.resolve(VIEWS, "public", "homepage"),
      { title: "Homepage", data: data }
      );
    console.log(data);
  })
}