/**
 * Methods for Model "Product", used to manipulate the table "products"
 * in the database
 */

export const pageSize = 3;

// Get all products in the db
export function get(con, callback){
  con.query("SELECT * FROM products", callback)
}

// Get products count
export function getNumProducts(con, callback){
  con.query("SELECT COUNT(*) AS numProducts FROM products", callback);
}

// Get all products in the db with pagination
export function getPage(con, page, callback){
  let offset = (page - 1) * pageSize;
  let limit = pageSize;
  con.query("SELECT * FROM products LIMIT ?, ?", [offset, limit], callback)
}

// Get a product by its id
export function getById(con, id, callback){
  con.query("SELECT * FROM products WHERE id = ?", [id], callback)
}