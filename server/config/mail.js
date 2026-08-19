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
  connectionTimeout: 10000, // 👈 10s me fail ho jaye, hang na ho
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

export const verifyMailTransporter = async () => {
  // Yeh real mein verify karega ki configuration sahi hai ya nahi
  await transporter.verify();
};

export default transporter;
