dotenv.config();
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import rateLimit from "express-rate-limit";

// Routes Imports
import emailRoutes from "./routes/emailRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import contactRoute from "./routes/contactRoute.js";

// Middleware Imports
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

// Mail Transporter
import { verifyMailTransporter } from "./config/mail.js";

const app = express();
const port = process.env.PORT || 5000;

// 2. Global Middlewares
app.use(cors());
app.use(express.json({ limit: "10kb" }));
app.set("trust proxy", 1);

// Rate Limiter Config
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests. Please try again after some time.",
  },
});

// 3. Database & Mail Connection Initializer
connectDb(); 

// Async wrapper to safely verify mail transporter
async function initMail() {
  try {
    await verifyMailTransporter();
    console.log("Mail Transporter verified successfully.");
  } catch (err) {
    console.error("Some Error Occurred in verifyMailTransporter:", err.message);
  }
}
initMail();

// 4. API Routes
app.use("/user/email", emailRoutes); 
app.use("/admin/adminRoute", adminRoutes);
app.use("/api/contact", contactLimiter, contactRoute);

// 5. Error Handling Middlewares 
app.use(notFound);
app.use(errorHandler);

// 6. Start Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
