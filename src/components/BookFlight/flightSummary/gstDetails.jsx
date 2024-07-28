import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const GstDetails = ({ gstDetails, setGstDetails, expanded, toggleCard }) => {
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGstDetails((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const validateGSTNumber = (gstNumber) => {
    const gstRegex =
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    return gstRegex.test(gstNumber);
  };

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "gstNumber":
        if (value && !validateGSTNumber(value)) {
          error = "Please enter a valid 15-digit GST Number";
        }
        break;
      case "companyName":
        if (value.length > 35) {
          error = "Company Name should not exceed 35 characters";
        }
        break;
      case "email":
        if (!/\S+@\S+\.\S+/.test(value)) {
          error = "Please enter a valid email address";
        }
        break;
      case "phone":
        if (!/^\d{10}$/.test(value)) {
          error = "Please enter a valid 10-digit phone number";
        }
        break;
      case "address":
        if (value.length > 70) {
          error = "Address should not exceed 70 characters";
        }
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSaveGSTDetails = () => {
    const newErrors = {};
    if (!validateGSTNumber(gstDetails.gstNumber)) {
      newErrors.gstNumber = "Please enter a valid 15-digit GST Number";
    }
    if (gstDetails.companyName.length > 35) {
      newErrors.companyName = "Company Name should not exceed 35 characters";
    }
    if (!/\S+@\S+\.\S+/.test(gstDetails.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!/^\d{10}$/.test(gstDetails.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }
    if (gstDetails.address.length > 70) {
      newErrors.address = "Address should not exceed 70 characters";
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      
      console.log("GST Details saved:", gstDetails);
    }
  };

  const inputClass = `block w-full max-w-md py-2 px-3 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`;

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <div
        className="p-4 bg-gray-50 cursor-pointer flex justify-between items-center"
        onClick={toggleCard}
      >
        <div>
          <div className="font-bold text-lg">
            GST Number for Business Travel (optional)
          </div>
          <div className="text-sm text-gray-500">
            To claim credit of GST charged by airlines, Please enter your
            company's GST details
          </div>
        </div>
        <div>
          {expanded ? (
            <FaChevronUp className="text-gray-500" />
          ) : (
            <FaChevronDown className="text-gray-500" />
          )}
        </div>
      </div>
      {expanded && (
        <div className="p-4 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="gstNumber"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Registration Number
              </label>
              <input
                type="text"
                id="gstNumber"
                name="gstNumber"
                value={gstDetails.gstNumber}
                onChange={handleInputChange}
                className={`${inputClass} ${
                  errors.gstNumber ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter 15-digit GST Number"
                maxLength={15}
              />
              {errors.gstNumber && (
                <p className="mt-1 text-xs text-red-500">{errors.gstNumber}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="companyName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Registered Company Name
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={gstDetails.companyName}
                onChange={handleInputChange}
                className={`${inputClass} ${
                  errors.companyName ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter Registered Company Name"
                maxLength={35}
              />
              {errors.companyName && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.companyName}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Registered Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={gstDetails.email}
                onChange={handleInputChange}
                className={`${inputClass} ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter Registered Email"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Registered Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={gstDetails.phone}
                onChange={handleInputChange}
                className={`${inputClass} ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter Registered Phone"
                maxLength={10}
              />
              {errors.phone && (
                <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
              )}
            </div>
          </div>
          <div className="mt-6">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Registered Address
            </label>
            <textarea
              id="address"
              name="address"
              value={gstDetails.address}
              onChange={handleInputChange}
              rows="3"
              className={`${inputClass} ${
                errors.address ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter Registered Address"
              maxLength={70}
            />
            {errors.address && (
              <p className="mt-1 text-xs text-red-500">{errors.address}</p>
            )}
          </div>
          <div className="mt-6 flex justify-end">
            <button
              className="bg-[#007ec4] text-white px-4 py-2 rounded hover:bg-[#006aa3] transition-colors"
              onClick={handleSaveGSTDetails}
            >
              Save GST Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GstDetails;
