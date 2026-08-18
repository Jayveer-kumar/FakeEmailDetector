// import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,
//   port: Number(process.env.SMTP_PORT || "587"),
//   secure: process.env.SMTP_SECURE === "465",

//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASS,
//   },
// });

// export const verifyMailTransporter = async () => {
//   try {
//     await transporter.verify();
//     console.log("Mail server is ready");
//   } catch (error) {
//     console.error("Mail server connection failed:", error.message);
//   }
// };

// export default transporter;.


import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const verifyMailTransporter = async () => {
  // Yeh real mein verify karega ki configuration sahi hai ya nahi
  await transporter.verify();
};

export default transporter;
