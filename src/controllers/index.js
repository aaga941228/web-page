const nodemailer = require("nodemailer");
const config = require("../config");

function index(req, res) {
  res.render("index");
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

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    res.send("ok");
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
}

module.exports = { index, sendEmail };
