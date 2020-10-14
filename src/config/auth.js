// Authentication middleware to protect routes
export class AuthUtil {

  // Function to redirect to 'login' page if not authenticated
  ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
      return next();
    }
    req.flash('warning_msg', "Please log in to view this resource");
    res.redirect("/user/login");
  }

  // Function to redirect to 'homepage' if authenticated
  ensureNotAuthenticated(req, res, next){
    if(req.isAuthenticated()){
      req.flash('warning_msg', "You are already logged in");
      res.redirect("/");
    } else {
      return next();
    }
  }
}