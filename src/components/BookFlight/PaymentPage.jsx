import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import logo from '../../assets/home/logo/main_logo.png';
import ReactToast from './Util/ReactToast';
import Spinner from '../Profile/Spinner';


const PaymentPage = ({ passengersData, data }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  console.log(passengersData.gstDetails,"hoe")

  const calculatePassengerDetails = useMemo(() => {
    return passengersData?.passengers?.map(passenger => {
      const baseFare = data?.totalPriceInfo?.totalFareDetail.fC?.TF || 0;
      const mealsCost = Object.values(passenger.selectedMeals || {}).reduce((sum, meal) => sum + (meal.amount || 0), 0);
      const seatsCost = (passenger.SelectedSeat || []).reduce((sum, seat) => sum + (seat.amount || 0), 0);
      const baggageCost = (passenger.selectedBaggage || []).reduce((sum, baggage) => sum + (baggage.amount || 0), 0);
      const totalCost = baseFare + mealsCost + seatsCost + baggageCost;

      return {
        name: `${passenger.firstName} ${passenger.lastName}`,
        type: passenger.passengerType,
        baseFare,
        mealsCost,
        seatsCost,
        baggageCost,
        totalCost
      };
    });
  }, [passengersData, data]);

  const totalAmount = useMemo(() => {
    return calculatePassengerDetails.reduce((sum, passenger) => sum + passenger.totalCost, 0);
  }, [calculatePassengerDetails]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    const preventNavigation = (event) => {
      if (isProcessing) {
        event.preventDefault();
        event.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', preventNavigation);
    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', preventNavigation);

    return () => {
      window.removeEventListener('beforeunload', preventNavigation);
      window.removeEventListener('popstate', preventNavigation);
    };
  }, [isProcessing]);

  const prepareApiData = (paymentResponse) => {
    const travellerInfo = passengersData.passengers.map(passenger => ({
      ti: passenger.title,
      fN: passenger.firstName,
      lN: passenger.lastName,
      pt: passenger.passengerType,
      dob: passenger.dob,
      ssrSeatInfos: passenger.SelectedSeat.map(seat => ({
        key: seat.key,
        code: seat.code
      }))
    }));

    const apiData = {
      booking: {
        bookingId: data.bookingId,
        paymentInfos: [{
          amount: totalAmount
        }],
        travellerInfo: travellerInfo,
        gstInfo: {
          gstNumber:passengersData.gstDetails.gstNumber,
          email: passengersData.gstDetails.email,
          registeredName: passengersData.gstDetails.companyName,
          mobile: passengersData.gstDetails.phone,
          address: passengersData.gstDetails.address
        },
        deliveryInfo: {
          emails: passengersData.passengers.map(p => p.email),
          contacts: passengersData.passengers.map(p => p.phone)
        }
      },
      searchQuery: data?.searchQuery
    };

    return apiData;
  };

  const callBookingApi = async (paymentResponse) => {
    const { searchQuery, booking } = prepareApiData(paymentResponse);
    setIsLoading(true);

    try {
      const response = await axios.post('https://api.myairdeal.com/booking/complete', {
        searchQuery, booking
      }, { headers: { authorization: `Bearer ${token}` }});
      
      if (!response.data) {
        throw new Error('Booking API call failed');
      }
      console.log('Booking successful:', response);

      if (response.data?.status?.success) {
        ReactToast('Booking successful!');
        navigate(`/view-detailed-booking?bookingId=${response?.data?.bookingId}&bookingFilter=UPCOMING`);
      }
    } catch (error) {
      console.error('Booking API error:', error);
      ReactToast('Booking failed. Please contact customer support.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentSuccess = async (response) => {
    console.log('Payment successful:', response);
    setIsProcessing(false);
    ReactToast('Payment successful! Processing your booking...');
    await callBookingApi(response);
  };

  const handlePaymentError = (error) => {
    console.error('Payment failed:', error);
    ReactToast('Payment failed. Please try again.');
    setIsProcessing(false);
  };

  const openRazorpay = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const res = await new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });

      if (!res) {
        throw new Error('Razorpay SDK failed to load. Are you online?');
      }

      const options = {
        key: import.meta.env.VITE_RZP_KEY_ID,
        amount: totalAmount * 100, 
        currency: 'INR',
        name: 'My Air Deal',
        description: 'Flight Booking Payment',
        image: logo,
        handler: handlePaymentSuccess,
        prefill: {
          name: `${passengersData.passengers[0]?.firstName} ${passengersData.passengers[0]?.lastName}`,
          email: passengersData.passengers[0].email || '',
          contact: passengersData.passengers[0]?.phone || ''
        },
        theme: { color: '#3399cc' },
        modal: { ondismiss: () => setIsProcessing(false) }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.on('payment.failed', handlePaymentError);
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
         <Spinner /> <h1 className="italic">Please wait , Don't refresh or go back</h1>
       </div>
     </div>
    );
  }

  return (
    <div className='flex flex-col w-full h-full justify-center  items-center '>
      <h2 className="text-2xl font-bold mb-4">Payment Details</h2>
      
      <table className="w-full border-collapse border overflow-auto max-h-80 border-gray-300 mb-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Passenger</th>
            <th className="border border-gray-300 p-2">Type</th>
            <th className="border border-gray-300 p-2">Base Fare</th>
            <th className="border border-gray-300 p-2">Meals</th>
            <th className="border border-gray-300 p-2">Seat</th>
            <th className="border border-gray-300 p-2">Baggage</th>
            <th className="border border-gray-300 p-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {calculatePassengerDetails.map((passenger, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-2">{passenger.name}</td>
              <td className="border border-gray-300 p-2">{passenger.type}</td>
              <td className="border border-gray-300 p-2">₹{passenger.baseFare.toFixed(2)}</td>
              <td className="border border-gray-300 p-2">₹{passenger.mealsCost.toFixed(2)}</td>
              <td className="border border-gray-300 p-2">₹{passenger.seatsCost.toFixed(2)}</td>
              <td className="border border-gray-300 p-2">₹{passenger.baggageCost.toFixed(2)}</td>
              <td className="border border-gray-300 p-2 font-bold">₹{passenger.totalCost.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-gray-100">
            <td colSpan={6} className="border border-gray-300 p-2 text-right font-bold">Total Amount:</td>
            <td className="border border-gray-300 p-2 font-bold">₹{totalAmount.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>

      <button 
        className='bg-[#007EC4] rounded-md text-white font-semibold text-xl px-5 py-2 mt-4 disabled:opacity-50 flex items-center justify-center'
        onClick={openRazorpay}
        disabled={isProcessing}
      >
        {isProcessing ? (
          <>
            <Spinner className="mr-2 h-4 w-4" />
            Processing...
          </>
        ) : (
          'Proceed to Payment'
        )}
      </button>
    </div>
  );
};

export default PaymentPage;