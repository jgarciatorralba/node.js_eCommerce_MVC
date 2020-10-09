/**
 * Methods for Model "Product", used to manipulate the table "products"
 * in the database
 */

export function get(con, callback){
  con.query("SELECT * FROM products", callback)
}