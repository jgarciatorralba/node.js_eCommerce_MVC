// Import native 'node.js' modules
import path from "path";

// Import dependencies
import express from "express";
import expressLayouts from "express-ejs-layouts";

// Import constants from own file 'app-config.js'
import {
  APP_PORT,
  VIEWS,
  con
} from "./src/config/app-config.js";

const app = express();

// Connecting route to db
app.use((req, res, next) => {
  req.con = con;
  next()
});

// EJS

// Set path to folder 'views'
app.set('views', VIEWS);

// PUBLIC-FACING VIEWS

// Set templating engine
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Set main layout folder
app.set('layout', path.resolve(VIEWS, "public", "layout.ejs"));

// Routes for views in 'views/public'
import { router as router_public } from "./src/routes/public.js";
app.use("/", router_public);

import { router as router_user } from "./src/routes/user.js";
app.use("/user", router_user);

// DASHBOARD VIEWS

// Routes for views in 'views/dashboard'
import { router as router_dashboard } from "./src/routes/dashboard.js";
app.use("/dashboard", router_dashboard);

app.listen(APP_PORT, () => {
  console.log(`Server started on port ${APP_PORT}...`);
});