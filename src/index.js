const express = require("express");
const exphbs = require("express-handlebars");
const morgan = require("morgan");
const path = require("path");
const { PORT } = require("./config");

express()
  .engine(
    ".hbs",
    exphbs({
      defaultLayout: "main",
      layoutsDir: path.join(__dirname, "views/layouts"),
      partialsDir: path.join(__dirname, "views/partials"),
      extname: ".hbs",
    })
  )
  .set("view engine", ".hbs")
  .use(morgan("dev"))
  .get("*", (req, res) => res.send("ok"))
  .listen(PORT, () => console.log(`server on port: ${PORT}`));
