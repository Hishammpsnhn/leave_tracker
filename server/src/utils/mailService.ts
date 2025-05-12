import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  secure: true,
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.PASS_KEY,
  },
});

export const sendEmail = async (to: string, subject: string, text: string) => {
  console.log("sending...");
  await transporter.sendMail({
    from: '"HR Team" <your-email@example.com>',
    to,
    subject,
    text,
  });
};
