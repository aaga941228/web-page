if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

module.exports = {
  port: process.env.PORT || 3000,
  personalEmail: process.env.PERSONAL_EMAIL,
  nodemailerUsername: process.env.NODEMAILER_USERNAME,
  nodemailerPassword: process.env.NODEMAILER_PASSWORD,
};
