import React, { useState } from "react";
import Logo from "../../assets/home/logo/main_logo.png";
import SliderImg from "../../assets/auth/slider.png";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  console.log("token", token);
  const onSubmit = async () => {
    try {
      console.log(formData);
      const data = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}user/add-detail`,
        formData, // Pass formData as the request body
        {
          headers: {
            "Content-Type": "application/json", // Set content type if needed
            Authorization: `Bearer ${token}`, // Include the authorization token
          },
        }
      );

      console.log(data);
      if (data.request.status === 200) navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="h-screen  flex    ">
      <div className="flex  w-[90%] mx-auto ">
        <div className="w-[45%] flex  items-center h-full mx-9 ">
          <div className="h-full flex w-full justify-center  items-center ">
            <img className="h-[90%]" src={SliderImg} alt="" />
          </div>
        </div>
        <div className="bg-blue w-[55%]  flex flex-col items-center justify-center     ">
          <div className=" flex  flex-col w-[85%] gap-4">
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
                {" "}
                Let's get you all set up so you can access your personal
                account.
              </h3>
            </div>

            <div className="flex flex-col gap-4">
              <input
                className="h-[45px] border border-black outline-none rounded-sm px-3"
                placeholder="First Name"
                type="text"
                value={formData?.firstName}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    firstName: e.target.value,
                  }))
                }
              />
              <input
                className="h-[45px] border  border-black outline-none rounded-sm px-3"
                placeholder="Last Name"
                value={formData?.lastName}
                type="text"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    lastName: e.target.value,
                  }))
                }
              />
              <input
                className="h-[45px] border border-black outline-none rounded-sm px-3"
                value={formData?.email}
                placeholder="Email "
                type="text"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
              />
            </div>
            <div className="flex gap-3">
              <input type="checkbox" />{" "}
              <label htmlFor="">
                I agree to all the{" "}
                <a className="text-red-700" href="">
                  Terms{" "}
                </a>{" "}
                and{" "}
                <a className="text-red-700" href="">
                  Privacy Policies
                </a>
              </label>
            </div>
            <button
              onClick={onSubmit}
              className="bg-[#007EC4] text-white h-[45px]  rounded-md "
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
