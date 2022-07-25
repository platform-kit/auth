var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var dotenv = require("dotenv").config();
var proxy = require("express-http-proxy");
var authRouter = require("./routes/auth");
var app = express();

// Configure Session
var session = require("express-session");
var sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {},
};
if (app.get("env") === "production") {
  app.set("trust proxy", 1); // trust first proxy
  sess.cookie.secure = true; // serve secure cookies
}
app.use(session(sess));

// view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
// Custom Routes
if (process.env.REPO != null && process.env.REPO != "") {
  var routes = "routes";
  if (
    process.env.ROUTES_DIRECTORY != null &&
    process.env.ROUTES_DIRECTORY != ""
  ) {
    routes = process.env.ROUTES_DIRECTORY;
  }
  var customRouter = require("./workspace/" + routes);
  app.use("/", customRouter);
}
// Default Routes
app.use("/", authRouter);
if (process.env.ENVIRONMENT == "development") {
  if (process.env.DEV_PATH != null && process.env.DEV_PATH != "") {
    app.use("/", proxy(process.env.DEV_PATH));
  } else {
    app.use("/", proxy("localhost:4000"));
  }
} else {
  app.use(express.static(path.join(__dirname, "./ui/dist")));
}

// Custom Statically Generated UI
if (
  process.env.REPO != null &&
  process.env.REPO != "" &&
  process.env.UI_DIRECTORY != null &&
  process.env.UI_DIRECTORY != ""
) {
  app.use(
    express.static(
      path.join(__dirname, "workspace/" + process.env.UI_DIRECTORY)
    )
  );
}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  //res.render("error");
  res.redirect("/error");
});

module.exports = app;
