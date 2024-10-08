
import React from "react";


const TermsAndConditions = () => {
  return (
    <div className="font-poppins text-gray-800 p-6  mx-auto font-medium text-sm md:text-base ">
      <h1 className="text-lg md:text-xl lg:text-2xl font-bold mb-6">Terms and Conditions</h1>

      <section className="mb-8">
        <h2 className="text-sm md:text-base font-semibold mb-4">Payments</h2>
        <ul className="list-disc px-4 md:px-8 lg:px-16 space-y-2">
          <li>
            If you are purchasing your ticket using a debit or credit card via
            the Website, we will process these payments via the automated secure
            common payment gateway which will be subject to fraud screening
            purposes.
          </li>
          <li>
            If you do not supply the correct card billing address and/or
            cardholder information, your booking will not be confirmed and the
            overall cost may increase. We reserve the right to cancel your
            booking if payment is declined for any reason or if you have
            supplied incorrect card information. If we become aware of, or is
            notified of, any fraud or illegal activity associated with the
            payment for the booking, the booking will be cancelled and you will
            be liable for all costs and expenses arising from such cancellation,
            without prejudice to any action that may be taken against us.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold mb-4 ">Contact Us</h2>
        <p>
          If you have any questions about our Website or our Terms of Use,
          please contact:
        </p>
        <address className="mt-4 not-italic">
          <p>My <span className="text-[#D7B56D]">Air</span> Deal</p>
          <p>2nd Floor, Anjali Plaza,</p>
          <p>Jayanagar,Bengaluru,</p>
          <p> India-560076</p>
          {/* <p>Further contact details can be found at</p> */}
        </address>
      </section>
    </div>
  );
};

export default TermsAndConditions;

