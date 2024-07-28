import Logo from "../../assets/home/logo/main_logo.png";
import SliderImg from "../../assets/auth/slider.png";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import OTPInput from "./OTP";
import { RiHome7Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

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
    console.log({ countryData });
    console.log({ value });
    setPhone(value);
    let newPhno = value
      .split("")
      .filter((e, i) => i >= countryData?.dialCode?.length)
      .join("");
    console.log({ newPhno });
    setCountry({
      dialCode: countryData.dialCode,
      countryCode: countryData.countryCode.toUpperCase(),
      country: countryData.name,
      onlyPhoneNumber: newPhno,
    });
    console.log({ newPhno });
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
      console.log({ query });

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
      console.log(error.message);
    }
  };

  const handleResendOTP = () => {
    handleSendOTP();
  };

  const handleSubmit = () => {
    handleSendOTP();
  };

  return (
    <div className="h-screen flex">
      <div className="flex w-[90%] mx-auto">
        <div
          onClick={() => {
            navigate("/");
          }}
          className="absolute md:top-[15%] left-[9%] text-[2rem] cursor-pointer"
        >
          <RiHome7Fill />
        </div>
        <div className="bg-blue w-[50%] flex flex-col items-center justify-center">
          <div className="flex flex-col w-[85%] gap-4">
            <div className="flex items-center gap-7">
              <div>
                <img className="h-[80px]" src={Logo} alt="Logo" />
              </div>
              <div className="text-[1.6rem] font-bold text-[#1F61BC]">
                <h3>My Air Deal</h3>
              </div>
            </div>
            <h2 className="font-medium text-[2.3rem]">Login</h2>
            <div className="mb-3">
              <h3 className="font-light text-[#112211] text-[1.2rem]">
                Login to access your Golobe account.
              </h3>
            </div>

            <div className="">
              {step === "sent-otp" && (
                <PhoneInput
                  country={"in"}
                  value={phone}
                  onChange={handleOnChange}
                  containerClass="h-[45px] border border-black rounded-md flex flex-row gap-2"
                  inputProps={{
                    name: "phone",
                    required: true,
                    autoFocus: true,
                    className:
                      "p-2 border-none w-full th-full outline-none rounded-md  ml-12 flex  h-full w-3/4",
                  }}
                  buttonClass=""
                  dropdownClass="absolute bg-white border border-gray-300 shadow-lg"
                  enableSearch
                />
              )}
              {step === "otp-sent-success" && (
                <div>
                  <OTPInput value={country} />
                  <div className="mt-2 text-center">
                    {timer > 0 ? (
                      <p>Resend OTP in {timer} seconds</p>
                    ) : (
                      <button
                        onClick={handleResendOTP}
                        className="bg-[#007EC4] text-white h-[45px] rounded-md mt-5 w-full"
                        disabled={loading}
                      >
                        {loading ? "Loading..." : "Resend OTP"}
                      </button>
                    )}
                  </div>
                </div>
              )}

              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
            {step === "sent-otp" && (
              <button
                disabled={loading}
                onClick={handleSubmit}
                className="bg-[#007EC4] text-white h-[45px] rounded-md mt-5"
              >
                {loading ? "Loading...." : " Send OTP"}
              </button>
            )}
            {step !== "sent-otp" && (
              <div className="flex flex-row items-center w-full justify-center">
                <h2 className="flex items-center underline text-red-600">
                  <a href="/sign-in"> Change number</a>
                </h2>
              </div>
            )}
          </div>
        </div>
        <div className="w-[50%] flex items-center h-full">
          <div className="h-full flex w-full justify-center items-center">
            <img className="h-[90%]" src={SliderImg} alt="Slider" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
