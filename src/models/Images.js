/**
 * Methods for Model "Image", used to manipulate the table "images"
 * in the database
 */

// Get all products in the db
export function get(con, callback){
  con.query("SELECT * FROM images", callback)
}

export function getById(con, id, callback){
  con.query("SELECT * FROM images WHERE id = ?", [id], callback)
}