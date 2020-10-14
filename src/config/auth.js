// Authentication middleware to protect routes
export function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  req.flash('error_msg', "Please log in to view this resource");
  res.redirect("/user/login");
}