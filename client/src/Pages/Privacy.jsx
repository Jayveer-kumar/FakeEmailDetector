import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#0c140d] text-white">
      <Navbar />

      <main className="max-w-4xl mx-auto py-20 px-5">
        <h1 className="text-4xl font-bold mb-8 text-green-400">
          Privacy Policy
        </h1>

        <p className="text-gray-300 mb-6 leading-7">
          Your privacy is important to us. This Privacy Policy explains how Fake Email Detector
          collects, uses, and protects your personal information.
        </p>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">1. Information We Collect</h2>
          <p className="text-gray-300 leading-7">
            We may collect the email addresses you enter for verification, usage data,
            and technical information about your device. We do not collect sensitive personal information.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">2. How We Use Your Information</h2>
          <p className="text-gray-300 leading-7">
            The data we collect is used solely to provide our email verification service,
            improve functionality, and ensure the reliability of our platform.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">3. Data Sharing</h2>
          <p className="text-gray-300 leading-7">
            We do not sell or share your data with third parties except as required by law.
            All information remains confidential and is used only for service improvement.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">4. Security</h2>
          <p className="text-gray-300 leading-7">
            We implement appropriate technical and organizational measures to protect
            your information from unauthorized access, alteration, disclosure, or destruction.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">5. Cookies</h2>
          <p className="text-gray-300 leading-7">
            We may use cookies and similar technologies to enhance user experience and analyze traffic.
            You can control cookie settings in your browser.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">6. Third-Party Services</h2>
          <p className="text-gray-300 leading-7">
            Our platform may use third-party services for analytics or hosting. 
            These services are bound to respect your privacy and comply with applicable regulations.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">7. Changes to this Policy</h2>
          <p className="text-gray-300 leading-7">
            We may update this Privacy Policy from time to time. Updates will be posted on this page.
            Your continued use of the service constitutes acceptance of the updated policy.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">8. Contact Us</h2>
          <p className="text-gray-300 leading-7">
            For any questions about this Privacy Policy, please contact us at 
            <span className="text-green-400 font-semibold"> support@fakeemaildetector.com</span>.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
