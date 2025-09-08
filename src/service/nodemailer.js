const nodemailer = require("nodemailer");
//   host: process.env.SMTP_HOST,
//   port: process.env.SMTP_PORT,
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASS,
//   },
// });

let transporter = nodemailer.createTransport({
  host: "smtp.titan.email",
  port: 465,
  secure: true,
  auth: {
    user: "info@beyondhimalayatech.com.au", // Your email address
    pass: "#,}!Q.0e?{3Hf&(", // Your password
  },
});

const sendEbookDownloadEmail = async ({email, fullName }) => {
  console.log(email, fullName, "I am here to test")
  await transporter.sendMail({
    from: `"Beyond Himalaya Tech"<info@beyondhimalayatech.com.au>`,
    to: email,
    subject: "The e-book you requested.",
    html: `
    <p>Hi ${fullName},</p>
    <p>Thanks for signing up. You can download your free e-book below:</p>
    <p><a href="https://marketing-funnel-lemon.vercel.app/ebook.pdf">Download e-book</a></p>
    <p>Enjoy!</p>
  `,
  });
};

module.exports = {
  sendEbookDownloadEmail,
};
