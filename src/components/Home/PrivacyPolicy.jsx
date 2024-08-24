import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-6 text-center">Privacy Policy</h1>
      <p className="text-lg mb-8">
        At [Your App Name], we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you use our flight ticket booking services. By using our app, you consent to the practices described in this policy.
      </p>

      <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
      <p className="mb-4">
        We collect various types of information to provide and improve our services:
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li>Personal information (e.g., name, email address, phone number)</li>
        <li>Travel documentation details (e.g., passport information, visa details)</li>
        <li>Payment information</li>
        <li>Travel preferences and history</li>
        <li>Device and usage information</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
      <p className="mb-6">
        We use your information for various purposes, including:
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li>Processing and managing your flight bookings</li>
        <li>Providing customer support and responding to inquiries</li>
        <li>Personalizing your experience and offering tailored recommendations</li>
        <li>Sending important travel updates and notifications</li>
        <li>Improving our services and developing new features</li>
        <li>Conducting research and analytics to enhance user experience</li>
        <li>Complying with legal obligations and preventing fraudulent activities</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">Information Sharing and Disclosure</h2>
      <p className="mb-6">
        We may share your information with:
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li>Airlines and other travel service providers to fulfill your bookings</li>
        <li>Payment processors to handle transactions</li>
        <li>Third-party service providers who assist in our operations</li>
        <li>Legal authorities when required by law or to protect our rights</li>
      </ul>
      <p className="mb-6">
        We do not sell your personal information to third parties for marketing purposes.
      </p>

      <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
      <p className="mb-6">
        We implement industry-standard security measures to protect your data, including encryption, secure servers, and regular security audits. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
      </p>

      <h2 className="text-2xl font-semibold mb-4">Your Rights and Choices</h2>
      <p className="mb-6">
        You have certain rights regarding your personal information:
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li>Access and update your personal information</li>
        <li>Request deletion of your data (subject to legal requirements)</li>
        <li>Opt-out of marketing communications</li>
        <li>Set your privacy preferences within the app</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">Cookies and Tracking Technologies</h2>
      <p className="mb-6">
        We use cookies and similar technologies to enhance your experience, analyze usage patterns, and provide personalized content. You can manage your cookie preferences through your browser settings.
      </p>

      <h2 className="text-2xl font-semibold mb-4">Changes to This Policy</h2>
      <p className="mb-6">
        We may update this Privacy Policy from time to time. We will notify you of any significant changes through the app or via email. Your continued use of our services after such modifications will constitute your acknowledgment of the modified policy.
      </p>

      <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
      <p className="mb-6">
        If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact our Privacy Team at:
      </p>
      <p className="mb-2">Email: privacy@[yourappname].com</p>
      <p className="mb-2">Address: [Your Company Address]</p>
      <p>Phone: [Your Contact Number]</p>

      <p className="text-lg mt-8 italic">
        Last updated: [Date]
      </p>
    </div>
  );
};

export default PrivacyPolicy;