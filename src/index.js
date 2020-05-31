const express = require("express");
const exphbs = require("express-handlebars");
const morgan = require("morgan");
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
app.use(require("./routes"));
app.use("/statics", express.static(path.join(__dirname, "public")));
app.listen(port, () => {
  console.log(`server on port ${port}`);
});
