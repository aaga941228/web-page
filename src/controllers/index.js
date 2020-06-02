const nodemailer = require("nodemailer");
const config = require("../config");

function index(req, res) {
  res.status(200).render("index");
}

async function sendEmail(req, res) {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: config.nodemailerUsername,
        pass: config.nodemailerPassword,
      },
    });

    const mailOptions = {
      from: req.body.email,
      to: config.personalEmail,
      subject: req.body.name,
      text: req.body.message,
    };

    const info = await transporter.sendMail(mailOptions);
    res.status(200).redirect("success");
  } catch (err) {
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

module.exports = { index, sendEmail, successEmail, notFound, internalError };
