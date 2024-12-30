import Link from "next/link";
import React from "react";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr from-rose-100 to-teal-100 p-4 md:p-8">
              <Link
        href = "/"
        className="absolute top-4 right-4 px-4 py-2 bg-yellow-500 text-white rounded-lg shadow-md text-sm hover:scale-105 transition duration-300 ease-in-out"
      >
        ↩
      </Link>
      <div className="max-w-4xl bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl md:text-4xl font-extrabold text-black text-center mb-6">
          Privacy Policy
        </h1>
        <p className="text-lg text-gray-700 mb-4">
          At <span className="font-bold">College Connect</span>, your privacy is a top priority. This policy explains how we collect, use, and protect your information when you use our website.
        </p>
        
        <h2 className="text-xl font-bold text-black mb-4">1. Information We Collect</h2>
        <p className="text-gray-700 mb-4">
          We collect the following information from users who submit our forms:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-6">
          <li>Name</li>
          <li>Email address</li>
          <li>High school and college affiliation</li>
          <li>Social media handles (e.g., Instagram)</li>
          <li>Other details provided voluntarily in the form</li>
        </ul>

        <h2 className="text-xl font-bold text-black mb-4">2. How We Use Your Information</h2>
        <p className="text-gray-700 mb-4">
          The information you provide is used for the following purposes:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-6">
          <li>To create posts for your affiliate Instagram college page.</li>
          <li>To help connect recent graduates with their future classmates.</li>
          <li>To improve and customize the College Connect user experience.</li>
        </ul>

        <h2 className="text-xl font-bold text-black mb-4">3. Sharing Your Information</h2>
        <p className="text-gray-700 mb-4">
          We share your information only in the following circumstances:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-6">
          <li>With your consent, for sharing on the affiliate Instagram page.</li>
          <li>To comply with legal obligations, such as a court order or legal process.</li>
        </ul>

        <h2 className="text-xl font-bold text-black mb-4">4. Data Security</h2>
        <p className="text-gray-700 mb-6">
          We implement industry-standard measures to protect your information. However, no data transmission over the Internet is 100% secure, so we cannot guarantee absolute security.
        </p>

        <h2 className="text-xl font-bold text-black mb-4">5. Your Rights</h2>
        <p className="text-gray-700 mb-6">
          You have the right to access, correct, or delete your personal information. To exercise these rights, please contact us at <a href="mailto:info@collegeconnect.com" className="text-yellow-500 hover:underline">info@collegeconnect.com</a>.
        </p>

        <h2 className="text-xl font-bold text-black mb-4">6. Updates to This Policy</h2>
        <p className="text-gray-700 mb-6">
          We may update this Privacy Policy from time to time. Changes will be posted on this page with the Last Updated date.
        </p>

        <h2 className="text-xl font-bold text-black mb-4">7. Contact Us</h2>
        <p className="text-gray-700">
          If you have questions about this policy or our practices, please contact us at <a href="mailto:info@collegeconnect.com" className="text-yellow-500 hover:underline">info@collegeconnect.com</a>.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
