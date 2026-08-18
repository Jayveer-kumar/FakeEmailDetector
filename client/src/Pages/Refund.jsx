import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function Refund() {
  return (
    <div className="min-h-screen bg-[#0c140d] text-white">
      <Navbar />

      <main className="max-w-4xl mx-auto py-20 px-5">
        <h1 className="text-4xl font-bold mb-8 text-green-400">
          Refund Policy
        </h1>

        <p className="text-gray-300 mb-6 leading-7">
          At Fake Email Detector, we are committed to providing quality services. 
          This Refund Policy explains the conditions under which refunds may be granted.
        </p>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">1. Refund Eligibility</h2>
          <p className="text-gray-300 leading-7">
            Refunds are considered only if the service was not delivered as promised
            or there was a technical issue that prevented usage. Refund requests must
            be submitted within 7 days of purchase.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">2. Non-Refundable Cases</h2>
          <p className="text-gray-300 leading-7">
            Refunds will not be issued for:  
            <ul className="list-disc ml-6 mt-2">
              <li>Partial usage of the service after activation.</li>
              <li>Incorrect usage of the platform by the user.</li>
              <li>Change of mind or personal preference.</li>
              <li>Violation of terms of service.</li>
            </ul>
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">3. How to Request a Refund</h2>
          <p className="text-gray-300 leading-7">
            To request a refund, contact our support team at 
            <span className="text-green-400 font-semibold"> support@fakeemaildetector.com</span>
            with your purchase details and a clear explanation of the issue.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">4. Refund Processing</h2>
          <p className="text-gray-300 leading-7">
            Approved refunds will be processed within 7–10 business days 
            using the original payment method. You will receive an email confirmation
            once the refund has been issued.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">5. Contact</h2>
          <p className="text-gray-300 leading-7">
            For questions regarding this Refund Policy, please reach out to us at 
            <span className="text-green-400 font-semibold"> support@fakeemaildetector.com</span>.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
