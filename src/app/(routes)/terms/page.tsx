import Link from "next/link";
import React from "react";

const TermsOfService: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr from-blue-100 to-purple-100 p-4 md:p-8">
      <Link
        href="/"
        className="absolute top-4 right-4 px-4 py-2 bg-yellow-500 text-white rounded-lg shadow-md text-sm hover:scale-105 transition duration-300 ease-in-out"
      >
        ↩
      </Link>
      <div className="max-w-4xl bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl md:text-4xl font-extrabold text-black text-center mb-6">
          Terms of Service
        </h1>
        <p className="text-lg text-gray-700 mb-4">
          Welcome to <span className="font-bold">College Connect</span>. By using our services, you agree to comply with and be bound by the following terms of service. Please review these terms carefully.
        </p>

        <h2 className="text-xl font-bold text-black mb-4">1. Acceptance of Terms</h2>
        <p className="text-gray-700 mb-4">
          By accessing or using our website, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree, please do not use our services.
        </p>

        <h2 className="text-xl font-bold text-black mb-4">2. User Responsibilities</h2>
        <p className="text-gray-700 mb-4">
          You are responsible for the accuracy of the information you provide and for maintaining the confidentiality of your account credentials. You agree not to engage in any activity that disrupts or interferes with our services.
        </p>

        <h2 className="text-xl font-bold text-black mb-4">3. Content Submission</h2>
        <p className="text-gray-700 mb-4">
          By submitting content, including images and text, you grant us the right to use, modify, and share it as part of our services. You affirm that you have the necessary rights to share this content.
        </p>

        <h2 className="text-xl font-bold text-black mb-4">4. Prohibited Conduct</h2>
        <p className="text-gray-700 mb-4">
          You agree not to:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-6">
          <li>Submit false or misleading information.</li>
          <li>Upload harmful or inappropriate content.</li>
          <li>Engage in activities that violate any laws or regulations.</li>
        </ul>

        <h2 className="text-xl font-bold text-black mb-4">5. Limitation of Liability</h2>
        <p className="text-gray-700 mb-6">
          We are not liable for any indirect, incidental, or consequential damages arising from your use of our services. Our total liability is limited to the amount you have paid us, if applicable.
        </p>

        <h2 className="text-xl font-bold text-black mb-4">6. Termination</h2>
        <p className="text-gray-700 mb-6">
          We reserve the right to terminate or suspend your access to our services at any time, without notice, for conduct that violates these terms or is harmful to other users.
        </p>

        <h2 className="text-xl font-bold text-black mb-4">7. Changes to Terms</h2>
        <p className="text-gray-700 mb-6">
          We may update these Terms of Service from time to time. Any changes will be posted on this page with the Last Updated date.
        </p>

        <h2 className="text-xl font-bold text-black mb-4">8. Contact Us</h2>
        <p className="text-gray-700">
          If you have questions about these terms, please contact us at <a href="mailto:info@collegeconnect.com" className="text-yellow-500 hover:underline">info@collegeconnect.com</a>.
        </p>
      </div>
    </div>
  );
};

export default TermsOfService;
