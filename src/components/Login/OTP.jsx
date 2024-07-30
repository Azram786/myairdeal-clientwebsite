import React, { useState, useRef } from "react";
import ReactToast from "../util/ReactToast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setToken } from "../../store/slices/aut.slice";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
const OTPInput = ({ value, timer, secondLoading, handleSendOTP }) => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputsRef = useRef([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const spinnerVariants = {
    animate: {
      rotate: [0, 360],
      transition: {
        repeat: Infinity,
        duration: 1,
        ease: "linear",
      },
    },
  };
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
  const handleResendOTP = () => {
    handleSendOTP();
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
            className="w-12 h-12 text-center border border-[#007EC4] rounded-md"
            onPaste={handlePaste}
          />
        ))}
      </div>
      <div className="flex w-full items-center gap-1">

        {loading ? (
          <motion.button
            whileTap={{ scale: 0.85 }} className="bg-[#007EC4] text-white h-[45px] rounded-md mt-5 w-1/2">
            <div className="flex justify-center items-center">
              <motion.div
                className="w-4 h-4 border-4 border-t-4 border-t-blue-500 border-gray-200 rounded-full"
                variants={spinnerVariants}
                animate="animate"
              />
            </div>
          </motion.button>
        ) : (
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={onSubmit}
            className="bg-[#007EC4] text-white h-[45px] rounded-md mt-5 w-1/2"
          >
            Verify OTP
          </motion.button>
        )}
        <div className="text-center h-full w-1/2 flex justify-center items-center ">
          {timer > 0 ? (
            <p >Resend OTP in {timer} seconds</p>
          ) : (
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={handleResendOTP}
              className="text-[#007EC4] border border-[#007EC4] bg-white h-[45px] rounded-md mt-5 w-full"
              disabled={secondLoading}
            >
              {secondLoading ? <div className="flex justify-center items-center">
                <motion.div
                  className="w-4 h-4 border-4 border-t-4 border-t-blue-500 border-gray-200 rounded-full"
                  variants={spinnerVariants}
                  animate="animate"
                />
              </div> : "Resend OTP"}
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OTPInput;
