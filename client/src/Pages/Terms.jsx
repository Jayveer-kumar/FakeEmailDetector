import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function Terms() {
  return (
    <div className="min-h-screen bg-[#0c140d] text-white">
      <Navbar />

      <main className="max-w-4xl mx-auto py-20 px-5">
        <h1 className="text-4xl font-bold mb-8 text-green-400">
          Terms & Conditions
        </h1>

        <p className="text-gray-300 mb-6 leading-7">
          Welcome to Fake Email Detector. By accessing or using our website,
          you agree to comply with and be bound by the following Terms & Conditions.
          Please read them carefully.
        </p>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">1. Use of Service</h2>
          <p className="text-gray-300 leading-7">
            You may use our service only for lawful purposes. You agree not to use
            the service to transmit spam, harass others, or engage in fraudulent activities.
            Any misuse may result in immediate termination of your access.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">2. Accuracy of Information</h2>
          <p className="text-gray-300 leading-7">
            Fake Email Detector provides information based on available data sources.
            We strive for accuracy but cannot guarantee that all information is correct,
            complete, or up-to-date. Use the results at your own discretion.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">3. Intellectual Property</h2>
          <p className="text-gray-300 leading-7">
            All content on this website, including text, graphics, logos, and software,
            is the property of Fake Email Detector and protected by copyright laws.
            You may not copy, reproduce, or redistribute our content without prior permission.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">4. Limitation of Liability</h2>
          <p className="text-gray-300 leading-7">
            We are not responsible for any damages arising from the use or inability
            to use the service. The service is provided "as is" without warranties
            of any kind.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">5. Privacy</h2>
          <p className="text-gray-300 leading-7">
            Your data privacy is important to us. Please review our
            <span className="text-green-400 font-semibold"> Privacy Policy </span>
            to understand how we collect and handle your information.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">6. Changes to Terms</h2>
          <p className="text-gray-300 leading-7">
            We may update these Terms & Conditions from time to time. Any changes
            will be posted on this page, and your continued use of the service
            constitutes acceptance of the new terms.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">7. Contact Information</h2>
          <p className="text-gray-300 leading-7">
            For questions or concerns regarding these terms, please contact us
            at <span className="text-green-400 font-semibold">support@fakeemaildetector.com</span>.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
