const express = require("express");
const exphbs = require("express-handlebars");
const morgan = require("morgan");
const helmet = require("helmet");
const session = require("express-session");
const passport = require("passport");
const path = require("path");
const { PORT, SECRET } = require("./config");
const { notFound, internalError } = require("./controllers");

const app = express();
require("./database");
require("./auth/passport");

app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  exphbs({
    defaultLayout: "main",
    partialsDir: path.join(app.get("views"), "partials"),
    layoutsDir: path.join(app.get("views"), "layouts"),
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");

app.use(morgan("dev"));
app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    secret: SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/statics", express.static(path.join(__dirname, "public")));
app.use(require("./routes"));
app.use(internalError);
app.use(notFound);

app.listen(PORT, () => {
  console.log(`server on PORT ${PORT}`);
});
