const express = require("express");
const exphbs = require("express-handlebars");
const morgan = require("morgan");
const helmet = require("helmet");
const path = require("path");
const { port } = require("./config");

const app = express();

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
app.use("/statics", express.static(path.join(__dirname, "public")));
app.use(require("./routes"));
app.listen(port, () => {
  console.log(`server on port ${port}`);
});
