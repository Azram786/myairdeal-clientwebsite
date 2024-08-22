import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import logo from "../../assets/home/logo/main_logo.png";
import ReactToast from "./Util/ReactToast";
import Spinner from "../Profile/Spinner";

const PaymentPage = ({ passengersData, data, totalFare, saveCommission }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const [convenienceFee, setConvenienceFee] = useState(0);
  const [errors, setErrors] = useState({});
  const [markUp, setMarkUp] = useState(null);

  const calculatePassengerDetails = useMemo(() => {
    return passengersData?.passengers?.map((passenger) => {
      const mealsCost = Object.values(passenger.selectedMeal || {}).reduce(
        (sum, meal) => sum + (meal.amount || 0),
        0
      );
      const seatsCost = (passenger.selectedSeat || []).reduce(
        (sum, seat) => sum + (seat.amount || 0),
        0
      );
      const baggageCost = (passenger.selectedBaggage || []).reduce(
        (sum, baggage) => sum + (baggage.amount || 0),
        0
      );
      const totalCost = mealsCost + seatsCost + baggageCost;

      return {
        name: `${passenger.firstName} ${passenger.lastName}`,
        type: passenger.passengerType,
        mealsCost,
        seatsCost,
        baggageCost,
        totalCost,
      };
    });
  }, [passengersData, data]);

  const totalAmount = useMemo(() => {
    const passengerTotalCost = calculatePassengerDetails.reduce(
      (sum, passenger) => sum + passenger.totalCost,
      0
    );

    const totalFare = data?.totalPriceInfo?.totalFareDetail.fC?.TF || 0;
    return passengerTotalCost + totalFare;
  }, [calculatePassengerDetails]);

  const getMarkUp = async () => {
    await axios
      .get(`${import.meta.env.VITE_SERVER_URL}markup/get-user-mark-up`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.flatPrice) {
          setConvenienceFee(res.data.value);
          saveCommission(res.data.value);
        } else if (res.data.percentage) {
          if (res.data.totalFare) {
            const markUpAmount = parseFloat((totalFare / 100) * res.data.value);
            setConvenienceFee(markUpAmount);
            saveCommission(markUpAmount);
          } else if (res.data.baseFare) {
            const bF = data?.totalPriceInfo?.totalFareDetail.fC?.BF;
            const markUpAmount = parseFloat((bF / 100) * res.data.value);
            setConvenienceFee(markUpAmount);
            saveCommission(markUpAmount);
          }
        }
        setMarkUp(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getMarkUp();
  }, []);

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
    const travellerInfo = passengersData.passengers.map((passenger) => {
      const passengerData = {
        ti: passenger.title,
        fN: passenger.firstName,
        lN: passenger.lastName,
        pt: passenger.passengerType,
        ssrSeatInfos: passenger?.selectedSeat?.map((seat) => ({
          key: seat.key,
          code: seat.code,
        })),
        ssrBaggageInfos: passenger?.selectedBaggage?.map((baggage) => ({
          key: baggage.key,
          code: baggage.code,
        })),
        ssrMealInfos: passenger?.selectedMeal?.map((meal) => ({
          key: meal.key,
          code: meal.code,
        })),
      };

      if (passenger.passportNumber !== "") {
        passengerData.pNum = passenger.passportNumber;
        passengerData.eD = passenger.expiryDate;
        passengerData.pNat = passenger.nationality;
        passengerData.pid = passenger.issueDate;
      }

      // Conditionally include 'dob' if the passenger is an infant
      if (passenger.passengerType === "INFANT") {
        passengerData.dob = passenger.dob;
      }

      return passengerData;
    });

    const apiData = {
      booking: {
        bookingId: data.bookingId,
        paymentInfos: [
          {
            amount: totalAmount,
          },
        ],
        travellerInfo: travellerInfo,
        // gstInfo: {
        //   gstNumber: passengersData.gstDetails.gstNumber,
        //   email: passengersData.gstDetails.email,
        //   registeredName: passengersData.gstDetails.companyName,
        //   mobile: passengersData.gstDetails.phone,
        //   address: passengersData.gstDetails.address,
        // },
        // deliveryInfo: {
        //   emails: passengersData.passengers.map((p) => p.email),
        //   contacts: passengersData.passengers.map((p) => p.phone),
        // },
        deliveryInfo: {
          emails: ["rjoshuasujith@gmail.com"],
          contacts: ["8105823389"],
        },
      },
      searchQuery: data?.searchQuery,
    };

    return apiData;
  };

  const callBookingApi = async (paymentResponse) => {
    const { searchQuery, booking } = prepareApiData(paymentResponse);
    setIsLoading(true);

    const payment = {
      razorpay_payment_id: paymentResponse.razorpay_payment_id,
      baseFare: data?.totalPriceInfo?.totalFareDetail.fC?.BF || 0,
      markUp,
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}booking/complete`,
        {
          searchQuery,
          booking,
          payment,
        },
        { headers: { authorization: `Bearer ${token}` } }
      );

      if (!response.data) {
        throw new Error("Booking API call failed");
      }

      if (response.data?.status?.success) {
        ReactToast("Booking successful!");
        navigate(
          `/view-detailed-booking?bookingId=${response?.data?.bookingId}&bookingFilter=UPCOMING`
        );
      }
    } catch (error) {
      console.error(error);
      ReactToast("Booking failed. Please contact customer support.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentSuccess = async (response) => {
    setIsProcessing(false);
    ReactToast("Payment successful! Processing your booking...");
    await callBookingApi(response);
  };

  const handlePaymentError = (error) => {
    console.error(error);
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
      const amountToPay = Math.round(totalAmount + convenienceFee);
      const options = {
        key: import.meta.env.VITE_RZP_KEY_ID,
        amount: amountToPay * 100,
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

        <p className="text-sm">
          Your personal data will be used to process your order, support your
          experience throughout this website, and for other purposes described
          in our privacy policy.
        </p>
        <button
          className="bg-[#1B1D29] rounded-md mb-4 text-[#D7B56D] font-semibold text-sm md:text-base px-5 py-2 mt-4 disabled:opacity-50 flex items-center justify-center"
          onClick={openRazorpay}
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
