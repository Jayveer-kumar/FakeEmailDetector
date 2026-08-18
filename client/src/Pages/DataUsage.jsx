import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function DataUsage() {
  return (
    <div className="min-h-screen bg-[#0c140d] text-white">
      <Navbar />

      <main className="max-w-4xl mx-auto py-20 px-5">
        <h1 className="text-4xl font-bold mb-8 text-green-400">
          Data Usage Policy
        </h1>

        <p className="text-gray-300 mb-6 leading-7">
          This Data Usage Policy explains how Fake Email Detector collects, stores,
          and uses the data you provide while using our services. Ensuring your data
          privacy and transparency is our priority.
        </p>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">1. Types of Data Collected</h2>
          <p className="text-gray-300 leading-7">
            We collect the following types of data:  
            <ul className="list-disc ml-6 mt-2">
              <li>Email addresses entered for verification.</li>
              <li>Technical information about your device and browser.</li>
              <li>Usage data, such as API requests and feature interactions.</li>
              <li>Cookies and similar tracking technologies (if enabled).</li>
            </ul>
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">2. Purpose of Data Collection</h2>
          <p className="text-gray-300 leading-7">
            Collected data is used to:  
            <ul className="list-disc ml-6 mt-2">
              <li>Provide and improve email verification services.</li>
              <li>Analyze platform usage and optimize performance.</li>
              <li>Ensure security and detect fraudulent activity.</li>
              <li>Communicate important updates or service notifications.</li>
            </ul>
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">3. Data Retention</h2>
          <p className="text-gray-300 leading-7">
            We retain your data only for as long as necessary to provide the service
            and comply with legal obligations. Unused or expired data is securely deleted.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">4. Data Sharing</h2>
          <p className="text-gray-300 leading-7">
            We do not share personal data with third parties except:  
            <ul className="list-disc ml-6 mt-2">
              <li>When required by law or legal processes.</li>
              <li>To protect our rights, property, or safety of users.</li>
            </ul>
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">5. Security Measures</h2>
          <p className="text-gray-300 leading-7">
            We implement technical and organizational measures to protect your data
            from unauthorized access, alteration, disclosure, or destruction.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">6. Contact</h2>
          <p className="text-gray-300 leading-7">
            If you have questions about our Data Usage Policy, please contact us at
            <span className="text-green-400 font-semibold"> support@fakeemaildetector.com</span>.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
