import resend from "../config/mail.js";
import { contactSchema } from "../validations/contactValidation.js";

export const sendContactEmail = async (req, res, next) => {
  console.log("Request Recieved for contact form");
  try {
    // 1. Validate request body
    const result = contactSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: result.error.flatten().fieldErrors,
      });
    }

    const { name, email, message } = result.data;

    // 2. Create email
    const mailOptions = {
      from: process.env.MAIL_FROM,
      to: process.env.MAIL_TO,
      reply_to: email, // 👈 Resend me "reply_to" (snake_case), replyTo nahi
      subject: `New Contact Message from ${name}`,
      text: `Name: ${name} Email: ${email} Message: ${message} `,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <hr />
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
        </div>
      `,
    };

    // 3. Send email
    const { error } = await resend.emails.send(mailOptions);
    if (error) throw new Error(error.message || "Failed to send email");

    // 4. Success response
    return res.status(200).json({
      success: true,
      message: "Hello Your message has been sent successfully.",
    });
  } catch (error) {
    next(error);
  }
};