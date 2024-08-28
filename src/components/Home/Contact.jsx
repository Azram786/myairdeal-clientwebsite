import React, { useState } from "react";
import axios from "axios";
import { IoCallOutline } from "react-icons/io5";
import { CiLocationOn, CiMail } from "react-icons/ci";
import { FaChevronDown } from "react-icons/fa";


import contactMain from "../../assets/home/contact/background.png";
import ReactToast from "../BookFlight/Util/ReactToast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    agree: false,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.agree) {
      ReactToast("Please agree to the Terms of Use and Privacy Policy.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}contact/create`,
        formData
      );
      
      if (response.data && response.data.message) {
        ReactToast(response.data.message);
      } else {
        RaectToast("Your message has been sent successfully!");
      }

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        agree: false,
      });
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        ReactToast(error.response.data.message);
      } else {
       ReactToast("Failed to send message. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-[#1B1D29] py-10 max-w-[1900px] min-w-[250px] mx-auto font-poppins">
    
      
      <div className="md:flex-row flex flex-col gap-4 sm:px-10 items-center">
        {/* Image Section */}
        <div className="flex items-center justify-center">
          <img
            src={contactMain}
            className="h-[100%] object-cover"
            alt="Contact"
          />
        </div>

        {/* Contact Form Section */}
        <div className="flex flex-col w-full justify-center items-center">
          <div className="mb-5 px-6 md:w-[85%] lg:mb-10">
            <h2 className="text-base font-sans text-white font-bold">
              Contact us
            </h2>
            <div className="flex w-full">
              <h1 className="text-[#D7B56D] w-full text-start text-2xl sm:text-3xl lg:text-4xl font-bold">
                Let us know how we can help you!
              </h1>
            </div>
          </div>
          <div className="w-full sm:w-[90%] mt-6">
            <form
              onSubmit={handleSubmit}
              className="w-full sm:w-[90%] mt-6 px-6"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="w-full flex flex-col">
                  <label htmlFor="name" className="text-white text-sm">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter Your Name"
                    className="p-2 mt-1 text-xs rounded-md border border-gray-500 text-black bg-white"
                    required
                  />
                </div>
                <div className="w-full flex flex-col">
                  <label htmlFor="email" className="text-white text-sm">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter Your Email"
                    className="p-2 mt-1 text-xs rounded-md bg-white border border-gray-500 text-black"
                    required
                  />
                </div>
                <div className="w-full flex flex-col">
                  <label htmlFor="phone" className="text-white text-sm">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter Your Number"
                    className="p-2 mt-1 text-xs rounded-md bg-white border border-gray-500 text-black"
                    maxLength={13}
                    required
                  />
                </div>
              </div>
              <div className="flex w-full flex-col my-2">
                <label htmlFor="message" className="text-white text-sm">
                  Your Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  className="p-2 mt-1 text-sm rounded-md bg-white border border-gray-500 text-black h-20"
                  required
                ></textarea>
              </div>
              <div className="sm:col-span-2 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="agree"
                  checked={formData.agree}
                  onChange={handleChange}
                  className="text-[#1B1D29]"
                  required
                />
                <label htmlFor="agree" className="text-white text-sm">
                  I agree with Terms of Use and Privacy Policy
                </label>
              </div>
              <div className="w-full">
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-4 py-2 flex gap-2 items-center justify-between w-full text-black rounded-lg bg-gradient-to-r from-[#D7B56D] via-[#ceb275] to-[#d7c295]"
                >
                  <span className="px-3">
                    {loading ? "Sending..." : "Send Message"}
                  </span>
                  <span className="text-xs -rotate-90 px-3">
                    <FaChevronDown />
                  </span>
                </button>
              </div>

              {/* Contact Info Section */}
              <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg-custom:grid-cols-3 gap-4 mt-6">
                <div className="flex items-start gap-2">
                  <div className="flex-shrink-0 p-1 rounded-full bg-white">
                    <IoCallOutline className="text-[#D7B56D] text-[1.25rem]" />
                  </div>
                  <div className="flex flex-col text-sm">
                    <span className="text-white font-semibold">Phone</span>
                    <span className="text-white">+61 234-5678 910</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="flex-shrink-0 p-1 rounded-full bg-white">
                    <CiLocationOn className="text-[#D7B56D] text-[1.25rem]" />
                  </div>
                  <div className="flex flex-col text-sm">
                    <span className="text-white font-semibold">Address</span>
                    <span className="text-white">
                      123 Main Street, City, Country
                    </span>
                  </div>
                </div>
                <div className="flex flex-1 items-start gap-2">
                  <div className="flex-shrink-0 p-1 rounded-full bg-white">
                    <CiMail className="text-[#D7B56D] text-[1.25rem]" />
                  </div>
                  <div className="flex flex-col text-sm">
                    <span className="text-white font-semibold">Email</span>
                    <span className="text-white">contact@example.com</span>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;