import Logo from "../../assets/home/logo/FinalLogo.jpg";
import SliderImg from "../../assets/auth/slider.png";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import OTPInput from "./OTP";
import { RiHome7Fill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./CustomPhoneInput.css";
import ReactToast from "../util/ReactToast";
import "react-phone-input-2/lib/style.css";
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

const StyledPhoneInput = ({ value, onChange }) => {
  return (
    <PhoneInput
      country={"in"}
      value={value}
      onChange={onChange}
      containerClass="phone-input-container"
    />
  );
};

const Login = () => {
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState({});
  const [step, setStep] = useState("sent-otp");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let interval;
    if (step === "otp-sent-success" && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const handleOnChange = (value, countryData) => {
    setPhone(value);
    let newPhno = value
      .split("")
      .filter((e, i) => i >= countryData?.dialCode?.length)
      .join("");

    setCountry({
      dialCode: countryData.dialCode,
      countryCode: countryData.countryCode.toUpperCase(),
      country: countryData.name,
      onlyPhoneNumber: newPhno,
    });
  };

  const validatePhoneNumber = (phoneNumber, countryCode) => {
    const parsedPhoneNumber = parsePhoneNumberFromString(
      phoneNumber,
      countryCode
    );
    return parsedPhoneNumber && parsedPhoneNumber.isValid();
  };

  const handleSendOTP = async () => {
    try {
      if (!validatePhoneNumber(phone, country.countryCode)) {
        setError("Invalid phone number for the selected country.");
        return;
      }

      setError("");

      let query = {
        mobileNumber: country.onlyPhoneNumber,
        country: {
          dialCode: country.dialCode,
          countryCode: country.countryCode,
          countryName: country.country,
        },
      };

      setLoading(true);
      const data = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}user/send-sms`,
        query,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (data) {
        setLoading(false);
        setStep("otp-sent-success");
        setTimer(30); // Reset the timer
        setCanResend(false); // Disable the resend button
      }
    } catch (error) {
      setLoading(false);
      ReactToast("Try again");
    }
  };

  const handleSubmit = () => {
    handleSendOTP();
  };

  return (
    <div className="h-[90vh] flex ">
      <div className="flex  w-[90%] mx-auto">
        {/* <div
          onClick={() => {
            navigate("/");
          }}
          className="absolute top-[9%] left-[11%] md:left-[8%] text-[2rem] cursor-pointer"
        >
          <RiHome7Fill />
        </div> */}
        <div className="bg-blue w-full md:w-[50%] flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col w-[85%] gap-4"
          >
            <div className="flex items-center gap-7">
              <div>
                <Link to="/">
                  <img className="h-[80px]" src={Logo} alt="Logo" />
                </Link>
              </div>
              {/* <div className="text-[1.6rem] font-bold text-[#1B1D29]">
                <h3>My <span className="text-[#D7B56D]"> Air</span> Deal</h3>
              </div> */}
            </div>
            <h2 className="font-medium text-[2.3rem]">Login</h2>
            <div className="mb-3">
              <h3 className="font-semibold text-[#1B1D29] text-[1.2rem]">
                Login in to your account.
              </h3>
            </div>

            <div className="">
              {step === "sent-otp" && (
                <StyledPhoneInput value={phone} onChange={handleOnChange} />
              )}
              {step === "otp-sent-success" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <OTPInput
                    value={country}
                    timer={timer}
                    secondLoading={loading}
                    handleSendOTP={handleSendOTP}
                  />
                </motion.div>
              )}

              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
            {step === "sent-otp" && (
              <motion.button
                whileTap={{ scale: 0.85 }}
                disabled={loading}
                onClick={handleSubmit}
                className="bg-[#D7B56D] text-[#1B1D29] font-semibold h-[45px] rounded-md mt-5"
              >
                {loading ? (
                  <div className="flex justify-center items-center">
                    <motion.div
                      className="w-4 h-4 border-4 border-t-4 border-t-[#D7B56D] border-gray-200 rounded-full"
                      variants={spinnerVariants}
                      animate="animate"
                    />
                  </div>
                ) : (
                  "Send OTP"
                )}
              </motion.button>
            )}
            {step !== "sent-otp" && (
              <div className="flex flex-row items-center w-full justify-center">
                <h2 className="flex items-center text-sm md:text-[15px] text-red-600">
                  <a href="/sign-in">Wrong Number? <span className="text-blue-600 hover:underline">Click Here</span></a>
                </h2>
              </div>
            )}
          </motion.div>
        </div>
        <div className="hidden  md:w-[50%]  md:flex md:items-center md:h-full">
          <div className="h-full flex w-full justify-center items-center">
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="h-[90%]"
              src={SliderImg}
              alt="Slider"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
