const config = require("../config");
const { Admin, Message, Visit } = require("../models");

async function index(req, res) {
  const visit = await Visit.findOne({
    counter: "main",
  });
  visit.count++;
  await visit.save();
  res.status(200).render("index");
}

async function sendEmail(req, res) {
  try {
    const message = new Message({
      email: req.body.email,
      name: req.body.name,
      message: req.body.message,
    });
    await message.save();
    res.status(200).redirect("success");
  } catch (err) {
    console.error(err);
    next();
  }
}

function successEmail(req, res) {
  res.render("success");
}

function notFound(req, res) {
  res.render("notFound");
}

function internalError(req, res) {
  res.render("internalError");
}

function loginRender(req, res) {
  res.render("login");
}

async function login(req, res) {
  try {
    const data = await Admin.findOne({
      user: req.body.user,
    });
    if (data === null || data.password !== req.body.password) {
      return res.status(403).send("Are you admin???");
    }
    res.status(200).redirect("/admin/dashboard");
  } catch (err) {
    console.error(err);
    next();
  }
}

async function dashboard(req, res) {
  try {
    const messages = await Message.find();
    const visits = await Visit.find({ counter: "main" });
    res.render("dashboard", {
      messages,
      helpers: {
        email: function () {
          return this.email;
        },
        name: function () {
          return this.name;
        },
        message: function () {
          return this.message;
        },
        visits: function () {
          return visits[0].count;
        },
      },
    });
  } catch (err) {
    console.error(err);
    next();
  }
}

module.exports = {
  index,
  sendEmail,
  successEmail,
  notFound,
  internalError,
  login,
  loginRender,
  dashboard,
};
