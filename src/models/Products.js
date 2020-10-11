/**
 * Methods for Model "Product", used to manipulate the table "products"
 * in the database
 */

let pageSize = 10;

// Get all products in the db
export function get(con, callback){
  con.query("SELECT * FROM products", callback)
}

// Get all products in the db with pagination
export function get(con, page, callback){
  let offset = (page - 1) * pageSize;
  let limit = pageSize;
  con.query("SELECT * FROM products LIMIT ?, ?", [offset, limit], callback)
}

export function getById(con, id, callback){
  con.query("SELECT * FROM products WHERE id = ?", [id], callback)
}