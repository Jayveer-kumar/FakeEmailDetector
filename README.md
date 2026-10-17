# FakeEmailDetector 🛡️

[FakeEmailDetector](https://fake-email-detector.vercel.app) is a full-stack web application designed to analyze and detect fake, disposable, or high-risk email addresses in real-time. It helps applications and users verify email authenticity by checking domain reputation, common fraudulent patterns, and overall security risks.

## ✨ Features

* **Domain Status Check:** Identifies whether an email domain is paid (custom/reliable) or unpaid (free/disposable).
* **Suspicious & Common Fake Patterns:** Detects patterns frequently used in spam or bot signups (e.g., random character strings, temporary mail providers).
* **Risk Score Calculation:** Generates an overall risk score to help determine the reliability of the email address.
* **Email Notification Support:** Integrated with the Resend package for sending verification results or alerts via email.

## 🛠️ Tech Stack

* **Frontend:** JavaScript, HTML, CSS (Hosted on [Vercel](https://fake-email-detector.vercel.app))
* **Backend:** Node.js / JavaScript (`server` folder)
* **Email Service:** Resend API

## 🚀 Project Structure

```text
FakeEmailDetector/
├── client/       # Frontend user interface and components
└── server/       # Backend logic, API routes, and email integration
