const nodemailer = require("nodemailer");
const { ACCOUNT_VERIFY } = require("./emailtemplate");

module.exports = {
  async sendMail(to, subject, html) {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "rythmbhatia5028@gmail.com",
        pass: "soqwgkhkacvgnolr",
      },
    });

    const mailOptions = {
      from: "rythmbhatia5028@gmail.com",
      to: to,
      subject: subject,
      html: html,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent: " + info.response);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  },

  async verifyAccount(email, otp, name) {
    const subject = "OTP for Account Verification";
    const html = await ACCOUNT_VERIFY(name, otp); 
    await this.sendMail(email, subject, html);
  },

  async forgotPassword(email, username, otp) {
    const subject = "OTP for Reset Password";
    const html = await ACCOUNT_VERIFY(username, otp); 
    await this.sendMail(email, subject, html);
  },
};
