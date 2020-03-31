const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
  host: "smtp.mailgun.org",
  port: 465,
  auth: {
    user: "postmaster@mg.overly.xyz",
    pass: "67c063403a5e8d0ea5a59276217f3f61"
  },
  secure: true // use TLS
})

// verify connection configuration
// transporter.verify(function(error, success) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Server is ready to take our messages");
//   }
// });

module.exports = transporter
