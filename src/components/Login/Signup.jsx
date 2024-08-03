import React, { useState } from "react";
import Logo from "../../assets/home/logo/main_logo.png";
import SliderImg from "../../assets/auth/slider.png";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import ReactToast from "../util/ReactToast";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
  });
  const [isAgreed, setIsAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [validation, setValidation] = useState({
    email: "",
    firstName: "",
    lastName: "",
    isAgreed: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  // const [loading, setLoading] = useState(false)

  const validate = () => {
    let isValid = true;
    const newValidation = { email: "", firstName: "", lastName: "", isAgreed: "" };
    if (!formData.firstName) {
      newValidation.firstName = "First name is required.";
      isValid = false;
    }
    if (!formData.lastName) {
      newValidation.lastName = "Last name is required.";
      isValid = false;
    }
    if (!formData.email) {
      newValidation.email = "Email is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newValidation.email = "Email is invalid.";
      isValid = false;
    }
    if (!isAgreed) {
      newValidation.isAgreed = "You must agree to the terms and privacy policies.";
      isValid = false;
    }

    setValidation(newValidation);
    return isValid;
  };

  const onSubmit = async () => {
    setLoading(true)
    if (!validate()) return;

    try {
      const data = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}user/add-detail`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false)
      if (data.request.status === 200) navigate("/");
    } catch (error) {
      setLoading(false)
      // console.log(error.message);
      ReactToast("Something went wrong try again")
    }
  };

  return (
    <div className="h-screen flex">
      <div className="flex w-[90%] mx-auto">
        <div className="w-[45%] hidden md:flex items-center h-full mx-9">
          <div className="h-full flex w-full justify-center items-center">
            <img className="h-[90%]" src={SliderImg} alt="" />
          </div>
        </div>
        <div className="bg-blue md:w-[55%] flex flex-col items-center justify-center">
          <div className="flex flex-col w-[85%] gap-4">
            <div className="flex items-center gap-7">
              <div>
                <img className="h-[80px]" src={Logo} alt="" />
              </div>
              <div className="text-[1.6rem] font-bold text-[#1F61BC]">
                <h3>My Air Deal</h3>
              </div>
            </div>
            <h2 className="font-medium text-[2.3rem]">Enter Details</h2>
            <div className="mb-3">
              <h3 className="font-light text-[#112211] text-[1.2rem]">
                Let's get you all set up so you can access your personal
                account.
              </h3>
            </div>

            <div className="flex flex-col gap-4">
              <input
                className="h-[45px] border border-black outline-none rounded-sm px-3"
                placeholder="First Name"
                type="text"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    firstName: e.target.value,
                  }))
                }
              />
              {validation.firstName && (
                <p className="text-red-600">{validation.firstName}</p>
              )}
              <input
                className="h-[45px] border border-black outline-none rounded-sm px-3"
                placeholder="Last Name"
                type="text"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    lastName: e.target.value,
                  }))
                }
              />
              {validation.lastName && (
                <p className="text-red-600">{validation.lastName}</p>
              )}
              <input
                className="h-[45px] border border-black outline-none rounded-sm px-3"
                placeholder="Email"
                type="text"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
              />
              {validation.email && (
                <p className="text-red-600">{validation.email}</p>
              )}
            </div>
            <div className="flex gap-3 items-center">
              <input
                type="checkbox"
                checked={isAgreed}
                onChange={(e) => setIsAgreed(e.target.checked)}
              />{" "}
              <label htmlFor="">
                I agree to all the{" "}
                <a className="text-red-700" href="">
                  Terms
                </a>{" "}
                and{" "}
                <a className="text-red-700" href="">
                  Privacy Policies
                </a>
              </label>
            </div>
            {validation.isAgreed && (
              <p className="text-red-600">{validation.isAgreed}</p>
            )}
            <button
              onClick={onSubmit}
              className="bg-[#007EC4] text-white h-[45px] rounded-md"
            >
              Add Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
