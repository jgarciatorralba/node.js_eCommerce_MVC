// Import native 'node.js' modules
import path from "path";

// Import dependencies
import express from "express";
import expressLayouts from "express-ejs-layouts";
import {} from "dotenv/config.js";

// Import constants from own file 'app-config.js'
import {
  APP_PORT,
  VIEWS
} from "./src/config/app-config.js";

const app = express();

// Allow "public" folder to serve static files
app.use(express.static('public'));
// Allow Bootstrap
app.use("/styles/css", express.static(path.resolve(process.cwd(), "node_modules/bootstrap/dist/css")));
app.use("/js", express.static(path.resolve(process.cwd(), "node_modules/bootstrap/dist/js")));
// Allow jQuery
app.use("/js", express.static(path.resolve(process.cwd(), "node_modules/jquery/dist")));

// EJS

// Set path to folder 'views'
app.set('views', VIEWS);

// PUBLIC-FACING VIEWS

// Set templating engine
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Set main layout file
app.set('layout', path.resolve(VIEWS, "public", "layouts", "layout-main.ejs"));

// Routes for views in 'views/public'
import { router as router_public } from "./src/routes/public.js";
app.use("/", router_public);

import { router as router_user } from "./src/routes/user.js";
app.use("/user", router_user);

// DASHBOARD VIEWS

// Routes for views in 'views/dashboard'
import { router as router_dashboard } from "./src/routes/dashboard.js";
app.use("/dashboard", router_dashboard);

// 404 Error page
app.use((req, res) => {
  res.status(404).render(path.resolve(VIEWS, "404.ejs"), {title: "Error", layout: "./public/layouts/layout-user"});
})

app.listen(APP_PORT, () => {
  console.log(`Server started on port ${APP_PORT}...`);
});