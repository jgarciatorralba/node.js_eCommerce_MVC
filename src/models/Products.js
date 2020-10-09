export function get(con, callback){
  con.query("SELECT * FROM products", callback)
}