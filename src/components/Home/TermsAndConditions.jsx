import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Terms and Conditions
      </h1>
      <p className="text-lg mb-8">
        Welcome to [Your App Name], your trusted flight ticket booking platform.
        By accessing or using our services, you agree to comply with and be
        bound by the following terms and conditions. Please read them carefully
        before using our app or website.
      </p>

      <h2 className="text-2xl font-semibold mb-4">Acceptance of Terms</h2>
      <p className="mb-6">
        By using our services, you acknowledge that you have read, understood,
        and agree to be bound by these terms, as well as our Privacy Policy. If
        you do not agree with any part of these terms, please do not use our
        services.
      </p>

      <h2 className="text-2xl font-semibold mb-4">Use of Our Services</h2>
      <ul className="list-disc pl-6 mb-6">
        <li>
          Our platform allows users to search, compare, book, and manage flight
          tickets.
        </li>
        <li>
          You must be at least 18 years old or have the legal capacity to enter
          into contracts to use our services.
        </li>
        <li>
          You agree to provide accurate, current, and complete information
          during the registration process and booking transactions.
        </li>
        <li>
          You are responsible for maintaining the confidentiality of your
          account and password.
        </li>
        <li>
          You agree not to use our services for any unlawful or prohibited
          purpose.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">Booking and Payment</h2>
      <ul className="list-disc pl-6 mb-6">
        <li>
          All bookings are subject to availability and the terms and conditions
          of the respective airlines.
        </li>
        <li>
          Prices displayed include base fare, taxes, and our service fees,
          unless otherwise stated.
        </li>
        <li>
          Payment must be made in full at the time of booking using the
          available payment methods.
        </li>
        <li>
          You are responsible for reviewing all details of your booking before
          confirmation.
        </li>
        <li>
          We reserve the right to cancel bookings in cases of suspected fraud,
          illegal activity, or violation of our terms.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">
        Cancellations, Changes, and Refunds
      </h2>
      <ul className="list-disc pl-6 mb-6">
        <li>
          Cancellation and change policies vary by airline and fare type. Please
          review the specific terms before booking.
        </li>
        <li>
          Refunds are processed according to the airline's policy and may be
          subject to cancellation fees.
        </li>
        <li>Our service fees are non-refundable unless required by law.</li>
        <li>
          In case of flight cancellations or significant changes by the airline,
          we will assist you in accordance with the airline's policies.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">User Responsibilities</h2>
      <ul className="list-disc pl-6 mb-6">
        <li>
          You are responsible for ensuring you have valid travel documents
          (e.g., passports, visas) required for your journey.
        </li>
        <li>
          It is your responsibility to check and comply with airline policies,
          including baggage allowances and check-in times.
        </li>
        <li>
          You must provide accurate contact information to receive important
          updates about your booking.
        </li>
        <li>
          Any special requests or requirements should be communicated directly
          to the airline.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
      <ul className="list-disc pl-6 mb-6">
        <li>
          We act as an intermediary between you and the airlines. We are not
          responsible for the services provided by the airlines.
        </li>
        <li>
          We are not liable for any direct, indirect, incidental, or
          consequential damages arising from the use of our services.
        </li>
        <li>
          Our liability is limited to the extent permitted by applicable law and
          shall not exceed the amount paid for the booking.
        </li>
        <li>
          We are not responsible for any losses or damages resulting from events
          beyond our control (e.g., natural disasters, strikes).
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
      <ul className="list-disc pl-6 mb-6">
        <li>
          All content on our platform, including text, graphics, logos, and
          software, is protected by copyright and other intellectual property
          laws.
        </li>
        <li>
          You may not reproduce, modify, distribute, or use any content from our
          platform without our explicit permission.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">Modifications to Terms</h2>
      <p className="mb-6">
        We reserve the right to modify these terms and conditions at any time.
        Changes will be effective immediately upon posting on our platform. Your
        continued use of our services after any changes indicates your
        acceptance of the modified terms.
      </p>

      <h2 className="text-2xl font-semibold mb-4">Governing Law</h2>
      <p className="mb-6">
        These terms and conditions are governed by and construed in accordance
        with the laws of [Your Jurisdiction]. Any disputes arising from these
        terms shall be subject to the exclusive jurisdiction of the courts in
        [Your Jurisdiction].
      </p>

      <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
      <p className="mb-6">
        If you have any questions or concerns regarding these terms and
        conditions, please contact our customer support team at:
      </p>
      <p className="mb-2">Email: support@[yourappname].com</p>
      <p className="mb-2">Phone: [Your Contact Number]</p>

      <p className="text-lg mt-8 italic">Last updated: [Date]</p>
    </div>
  );
};

export default TermsAndConditions;
