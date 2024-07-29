import React, { useState, useRef } from "react";
import ReactToast from "../util/ReactToast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setToken } from "../../store/slices/aut.slice";
import { useDispatch, useSelector } from "react-redux";

const OTPInput = ({ value }) => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputsRef = useRef([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (/[^0-9]/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const pastedData = e.clipboardData.getData("Text");
    if (/^\d{4}$/.test(pastedData)) {
      setOtp(pastedData.split(""));
      inputsRef.current[3].focus();
    }
  };

  const onSubmit = async () => {
    try {
      setLoading(true);

      const otpString = otp.join("");

      if (otpString.length !== 4) {
        ReactToast("Enter OTP");
        setLoading(false);
        return;
      }

      const serverUrl = `${import.meta.env.VITE_SERVER_URL}user/verify-otp`;

      const response = await axios.post(
        serverUrl,
        {
          otp: otpString,
          phone: value.onlyPhoneNumber,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setLoading(false);
      dispatch(setToken(response.data.token));

      if (response && response.data) {
        if (response.data.profile === false)
          navigate(`/enter-detail?token=${response.data.token}`);
        else navigate("/");
      } else {
        throw new Error("Invalid OTP");
      }
    } catch (error) {
      setLoading(false);
      console.log("Error verifying OTP:", error.message);
    }
  };

  return (
    <div>
      <div className="flex gap-2 w-full justify-evenly">
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            ref={(el) => (inputsRef.current[index] = el)}
            maxLength="1"
            className="w-12 h-12 text-center border rounded-md"
            onPaste={handlePaste}
          />
        ))}
      </div>
      {loading ? (
        <button className="bg-[#007EC4] text-white h-[45px] rounded-md mt-5 w-full">
          Verifying...
        </button>
      ) : (
        <button
          onClick={onSubmit}
          className="bg-[#007EC4] text-white h-[45px] rounded-md mt-5 w-full"
        >
          Verify OTP
        </button>
      )}
    </div>
  );
};

export default OTPInput;
