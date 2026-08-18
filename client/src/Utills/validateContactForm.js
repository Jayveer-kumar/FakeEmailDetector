import { validateEmail } from "./valiDateEmail";

export const validateContactForm = ({ name, email, message }) => {
  if (!name.trim()) {
    return { valid: false, msg: "Please enter your name", type: "error" };
  }

  if (!email.trim()) {
    return { valid: false, msg: "Please enter your email", type: "error" };
  }

  if (!validateEmail(email)) {
    return { valid: false, msg: "Invalid email format", type: "error" };
  }

  if (!message.trim()) {
    return { valid: false, msg: "Please enter your message", type: "error" };
  }

  return { valid: true, msg: "Form submitted successfully", type: "success" };
};
