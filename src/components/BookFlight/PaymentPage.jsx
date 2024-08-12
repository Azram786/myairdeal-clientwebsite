import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import logo from "../../assets/home/logo/main_logo.png";
import ReactToast from "./Util/ReactToast";
import Spinner from "../Profile/Spinner";

const PaymentPage = ({ passengersData, data }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [bankDetails, setBankDetails] = useState({
    accountNumber: "",
    bankName: "",
    ifscCode: "",
  });
  const [transferDetails, setTransferDetails] = useState({
    upiId: "",
    referenceNumber: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("");
  const [errors, setErrors] = useState({});

  console.log(passengersData.gstDetails, "hoe");

  const calculatePassengerDetails = useMemo(() => {
    return passengersData?.passengers?.map((passenger) => {
      const baseFare = data?.totalPriceInfo?.totalFareDetail.fC?.TF || 0;
      const mealsCost = Object.values(passenger.selectedMeals || {}).reduce(
        (sum, meal) => sum + (meal.amount || 0),
        0
      );
      const seatsCost = (passenger.SelectedSeat || []).reduce(
        (sum, seat) => sum + (seat.amount || 0),
        0
      );
      const baggageCost = (passenger.selectedBaggage || []).reduce(
        (sum, baggage) => sum + (baggage.amount || 0),
        0
      );
      const totalCost = baseFare + mealsCost + seatsCost + baggageCost;

      return {
        name: `${passenger.firstName} ${passenger.lastName}`,
        type: passenger.passengerType,
        baseFare,
        mealsCost,
        seatsCost,
        baggageCost,
        totalCost,
      };
    });
  }, [passengersData, data]);

  const totalAmount = useMemo(() => {
    return calculatePassengerDetails.reduce(
      (sum, passenger) => sum + passenger.totalCost,
      0
    );
  }, [calculatePassengerDetails]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    const preventNavigation = (event) => {
      if (isProcessing) {
        event.preventDefault();
        event.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", preventNavigation);
    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", preventNavigation);

    return () => {
      window.removeEventListener("beforeunload", preventNavigation);
      window.removeEventListener("popstate", preventNavigation);
    };
  }, [isProcessing]);

  const prepareApiData = (paymentResponse) => {
    const travellerInfo = passengersData.passengers.map((passenger) => ({
      ti: passenger.title,
      fN: passenger.firstName,
      lN: passenger.lastName,
      pt: passenger.passengerType,
      dob: passenger.dob,
      ssrSeatInfos: passenger.SelectedSeat.map((seat) => ({
        key: seat.key,
        code: seat.code,
      })),
    }));

    const apiData = {
      booking: {
        bookingId: data.bookingId,
        paymentInfos: [
          {
            amount: totalAmount,
          },
        ],
        travellerInfo: travellerInfo,
        gstInfo: {
          gstNumber: passengersData.gstDetails.gstNumber,
          email: passengersData.gstDetails.email,
          registeredName: passengersData.gstDetails.companyName,
          mobile: passengersData.gstDetails.phone,
          address: passengersData.gstDetails.address,
        },
        deliveryInfo: {
          emails: passengersData.passengers.map((p) => p.email),
          contacts: passengersData.passengers.map((p) => p.phone),
        },
      },
      searchQuery: data?.searchQuery,
    };

    return apiData;
  };

  const callBookingApi = async (paymentResponse) => {
    const { searchQuery, booking } = prepareApiData(paymentResponse);
    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://api.myairdeal.com/booking/complete",
        {
          searchQuery,
          booking,
        },
        { headers: { authorization: `Bearer ${token}` } }
      );

      if (!response.data) {
        throw new Error("Booking API call failed");
      }
      console.log("Booking successful:", response);

      if (response.data?.status?.success) {
        ReactToast("Booking successful!");
        navigate(
          `/view-detailed-booking?bookingId=${response?.data?.bookingId}&bookingFilter=UPCOMING`
        );
      }
    } catch (error) {
      console.error("Booking API error:", error);
      ReactToast("Booking failed. Please contact customer support.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentSuccess = async (response) => {
    console.log("Payment successful:", response);
    setIsProcessing(false);
    ReactToast("Payment successful! Processing your booking...");
    await callBookingApi(response);
  };

  const handlePaymentError = (error) => {
    console.error("Payment failed:", error);
    ReactToast("Payment failed. Please try again.");
    setIsProcessing(false);
  };

  const openRazorpay = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const res = await new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });

      if (!res) {
        throw new Error("Razorpay SDK failed to load. Are you online?");
      }

      const options = {
        key: import.meta.env.VITE_RZP_KEY_ID,
        amount: totalAmount * 100,
        currency: "INR",
        name: "My Air Deal",
        description: "Flight Booking Payment",
        image: logo,
        handler: handlePaymentSuccess,
        prefill: {
          name: `${passengersData.passengers[0]?.firstName} ${passengersData.passengers[0]?.lastName}`,
          email: passengersData.passengers[0].email || "",
          contact: passengersData.passengers[0]?.phone || "",
        },
        theme: { color: "#3399cc" },
        modal: { ondismiss: () => setIsProcessing(false) },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.on("payment.failed", handlePaymentError);
      paymentObject.open();
    } catch (error) {
      ReactToast(error.message);
      setIsProcessing(false);
    }
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
    setErrors({});
  };

  const handleCardDetailsChange = (e) => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
  };

  const validateCardDetails = () => {
    const { cardNumber, expiryDate, cvv } = cardDetails;
    const errors = {};

    if (!cardNumber || cardNumber.length !== 16) {
      errors.cardNumber = "Card number must be 16 digits";
    }
    if (!expiryDate || !/^\d{2}\/\d{2}$/.test(expiryDate)) {
      errors.expiryDate = "Expiry date must be in MM/YY format";
    }
    if (!cvv || cvv.length !== 3) {
      errors.cvv = "CVV must be 3 digits";
    }

    return errors;
  };

  const handleBankDetailsChange = (e) => {
    setBankDetails({ ...bankDetails, [e.target.name]: e.target.value });
  };

  const validateBankDetails = () => {
    const { accountNumber, bankName, ifscCode } = bankDetails;
    const errors = {};

    if (!accountNumber) {
      errors.accountNumber = "Account number is required";
    }
    if (!bankName) {
      errors.bankName = "Bank name is required";
    }
    if (!ifscCode || !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifscCode)) {
      errors.ifscCode = "Invalid IFSC Code";
    }

    return errors;
  };

  const handleTransferDetailsChange = (e) => {
    setTransferDetails({ ...transferDetails, [e.target.name]: e.target.value });
  };

  const validateTransferDetails = () => {
    const { upiId, referenceNumber } = transferDetails;
    const errors = {};

    if (!upiId) {
      errors.upiId = "UPI ID is required";
    }
    if (!referenceNumber) {
      errors.referenceNumber = "Reference number is required";
    }

    return errors;
  };
  const handlePayment = () => {
    let validationErrors = {};

    if (paymentMethod === "card") {
      validationErrors = validateCardDetails();
    } else if (paymentMethod === "bank") {
      validationErrors = validateBankDetails();
    } else if (paymentMethod === "transfer") {
      validationErrors = validateTransferDetails();
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Proceed with payment processing
    openRazorpay();
  };

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div className="flex-col flex gap-3">
          <Spinner />{" "}
          <h1 className="italic">Please wait , Don't refresh or go back</h1>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="h-screen flex flex-col w-[95%] mb-8 items-center">
        <h2 className="text-2xl text-left border-b-2 w-full leading-10 font-bold mb-4">
          Payment
        </h2>
        <div className="w-full text-left">
          <div className="w-full text-left mb-4">
            <p className="text-base md:text-lg font-semibold">Pay with:</p>
            <div className="flex gap-4 text-sm  md:text-base">
              <label className="flex  justify-center items-center">
                <input
                  type="radio"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={handlePaymentMethodChange}
                  className="mr-2"
                />
                Card
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="bank"
                  checked={paymentMethod === "bank"}
                  onChange={handlePaymentMethodChange}
                  className="mr-2"
                />
                Bank
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="transfer"
                  checked={paymentMethod === "transfer"}
                  onChange={handlePaymentMethodChange}
                  className="mr-2"
                />
                Transfer
              </label>
            </div>
          </div>

          {/* Card Payment Fields */}
          {paymentMethod === "card" && (
            <div className="w-full text-left">
              <p className="text-base font-semibold">Card Number:</p>
              <input
                type="number"
                name="cardNumber"
                placeholder="Enter Card Number"
                className="w-full p-2 border border-gray-300 text-sm rounded mb-4"
                value={cardDetails.cardNumber}
                onChange={handleCardDetailsChange}
              />
              {errors.cardNumber && (
                <p className="text-red-500 text-sm">{errors.cardNumber}</p>
              )}

              <div className="flex w-full justify-between items-center  gap-4">
                <div className="w-[45%] flex flex-col">
                  <p className="text-base font-semibold">Expiry Date:</p>
                  <input
                    type="text"
                    name="expiryDate"
                    placeholder="MM/YY"
                    className="w-full p-2 border my-2 border-gray-300 rounded mb-4 text-sm"
                    value={cardDetails.expiryDate}
                    onChange={handleCardDetailsChange}
                  />
                  {errors.expiryDate && (
                    <p className="text-red-500 text-sm">{errors.expiryDate}</p>
                  )}
                </div>
                <div className="w-[45%] flex flex-col">
                  <p className="text-base font-semibold">CVV:</p>
                  <input
                    type="password"
                    name="cvv"
                    placeholder="CVV"
                    className="w-full p-2 border my-2 text-sm border-gray-300 rounded mb-4"
                    value={cardDetails.cvv}
                    onChange={handleCardDetailsChange}
                  />

                  {errors.cvv && (
                    <p className="text-red-500 text-sm">{errors.cvv}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Bank Payment Fields */}
          {paymentMethod === "bank" && (
            <div className="w-full text-left">
              <p className="text-base font-semibold">Account Number:</p>
              <input
                type="text"
                name="accountNumber"
                placeholder="Enter Account Number"
                className="w-full p-2 border text-sm border-gray-300 rounded mb-4"
                value={bankDetails.accountNumber}
                onChange={handleBankDetailsChange}
              />
              {errors.accountNumber && (
                <p className="text-red-500 text-sm">{errors.accountNumber}</p>
              )}
              <div className="w-full justify-between flex items-center">
                <div className=" w-[45%] flex flex-col">
                  <p className="text-base font-semibold">Bank Name:</p>
                  <input
                    type="text"
                    name="bankName"
                    placeholder="Enter Bank Name"
                    className="w-full p-2 border text-sm border-gray-300 rounded mb-4"
                    value={bankDetails.bankName}
                    onChange={handleBankDetailsChange}
                  />
                  {errors.bankName && (
                    <p className="text-red-500 text-sm">{errors.bankName}</p>
                  )}
                </div>
                <div className="w-[45%] flex flex-col">
                  <p className="text-base font-semibold">IFSC Code:</p>
                  <input
                    type="text"
                    name="ifscCode"
                    placeholder="Enter IFSC Code"
                    className="w-full p-2 border text-sm border-gray-300 rounded mb-4"
                    value={bankDetails.ifscCode}
                    onChange={handleBankDetailsChange}
                  />

                  {errors.ifscCode && (
                    <p className="text-red-500 text-sm">{errors.ifscCode}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Transfer Payment Fields */}
          {paymentMethod === "transfer" && (
            <div className="w-full text-left">
              <p className="text-base font-semibold">UPI ID:</p>
              <input
                type="text"
                name="upiId"
                placeholder="Enter UPI ID"
                className="w-full p-2 border text-sm border-gray-300 rounded mb-4"
                value={transferDetails.upiId}
                onChange={handleTransferDetailsChange}
              />
              {errors.upiId && (
                <p className="text-red-500 text-sm">{errors.upiId}</p>
              )}

              <p className="text-base font-semibold">Reference Number:</p>
              <input
                type="text"
                name="referenceNumber"
                placeholder="Enter Reference Number"
                className="w-full p-2 border text-sm border-gray-300 rounded mb-4"
                value={transferDetails.referenceNumber}
                onChange={handleTransferDetailsChange}
              />
              {errors.referenceNumber && (
                <p className="text-red-500 text-sm">{errors.referenceNumber}</p>
              )}
            </div>
          )}
        </div>
        <p className="text-sm">
          Your personal data will be used to process your order, support your
          experience throughout this website, and for other purposes described
          in our privacy policy.
        </p>

        <button
          className="bg-[#007EC4] rounded-md mb-4 text-white font-semibold text-sm md:text-base px-5 py-2 mt-4 disabled:opacity-50 flex items-center justify-center"
          onClick={handlePayment}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>
              <Spinner className="mr-2 h-4 w-4" />
              Processing...
            </>
          ) : (
            "Proceed to Payment"
          )}
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
