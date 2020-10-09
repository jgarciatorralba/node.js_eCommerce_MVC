/**
 * Methods for Model "Product", used to manipulate the table "products"
 * in the database
 */

// Get all products in the db
export function get(con, callback){
  con.query("SELECT * FROM products", callback)
}

export function getById(con, id, callback){
  con.query("SELECT * FROM products WHERE id = ?", [id], callback)
}