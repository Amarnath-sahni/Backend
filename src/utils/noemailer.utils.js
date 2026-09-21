import expressAsyncHandler from "express-async-handler";
import mailTransport from "../config/nodemailer.config.js";

export const sendMailer = expressAsyncHandler(
  async (req, res) => {

    const { to, subject, html } = req.body;

    if (!to || !subject || !html) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const info = await mailTransport.sendMail({
      from: `"AI Health" <${process.env.NODEMAILER_EMAIL}>`,
      to,
      subject,
      html,
    });

    res.status(200).json({
      success: true,
      message: "Email sent successfully",
      info,
    });
  }
);