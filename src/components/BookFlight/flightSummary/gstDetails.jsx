import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const GstDetails = ({ gstDetails, setGstDetails, expanded, toggleCard }) => {
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGstDetails((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "gstNumber":
        error =
          value && !validateGSTNumber(value)
            ? "Please enter a valid 15-digit GST Number"
            : "";
        break;
      case "companyName":
        error =
          value.length > 35
            ? "Company Name should not exceed 35 characters"
            : "";
        break;
      case "email":
        error = !/\S+@\S+\.\S+/.test(value)
          ? "Please enter a valid email address"
          : "";
        break;
      case "phone":
        error = !/^\d{10}$/.test(value)
          ? "Please enter a valid 10-digit phone number"
          : "";
        break;
      case "address":
        error =
          value.length > 70 ? "Address should not exceed 70 characters" : "";
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateGSTNumber = (gstNumber) => {
    const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/;
    return gstRegex.test(gstNumber);
  };

  const handleSaveGSTDetails = () => {
    const newErrors = {};
    const validators = {
      gstNumber: validateGSTNumber,
      companyName: (value) => value.length <= 35,
      email: (value) => /\S+@\S+\.\S+/.test(value),
      phone: (value) => /^\d{10}$/.test(value),
      address: (value) => value.length <= 70,
    };

    Object.keys(validators).forEach((key) => {
      if (!validators[key](gstDetails[key])) {
        newErrors[key] = getErrorMessage(key, gstDetails[key]);
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // console.log("GST Details saved:", gstDetails);
    }
  };

  const getErrorMessage = (name, value) => {
    switch (name) {
      case "gstNumber":
        return "Please enter a valid 15-digit GST Number";
      case "companyName":
        return "Company Name should not exceed 35 characters";
      case "email":
        return "Please enter a valid email address";
      case "phone":
        return "Please enter a valid 10-digit phone number";
      case "address":
        return "Address should not exceed 70 characters";
      default:
        return "";
    }
  };

  const inputClass = `block w-full max-w-md py-2 px-3 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`;

  return (
    <div className="rounded-lg overflow-hidden">
      <div
        // className="p-4 bg-gray-50 cursor-pointer flex justify-between items-center "
        className="p-3 cursor-pointer flex justify-between items-center "
        onClick={toggleCard}
      >
        <div>
          <div className="font-bold text-lg">
            GST Number for Business Travel (optional)
          </div>
          <div className="text-sm text-gray-500">
            To claim credit of GST charged by airlines, please enter your
            company's GST details
          </div>
        </div>
        <div>{expanded ? <FaChevronUp /> : <FaChevronDown />}</div>
      </div>
      {expanded && (
        <div className="p-4 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 box-border">
            {[
              {
                id: "gstNumber",
                label: "Registration Number",
                type: "text",
                placeholder: "Enter 15-digit GST Number",
                maxLength: 15,
              },
              {
                id: "companyName",
                label: "Registered Company Name",
                type: "text",
                placeholder: "Enter Registered Company Name",
                maxLength: 35,
              },
              {
                id: "email",
                label: "Registered Email",
                type: "email",
                placeholder: "Enter Registered Email",
              },
              {
                id: "phone",
                label: "Registered Phone",
                type: "tel",
                placeholder: "Enter Registered Phone",
                maxLength: 10,
              },
            ].map(({ id, label, type, placeholder, maxLength }) => (
              <div key={id}>
                <label
                  htmlFor={id}
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {label}
                </label>
                <input
                  type={type}
                  id={id}
                  name={id}
                  value={gstDetails[id] || ""}
                  onChange={handleInputChange}
                  className={`${inputClass} ${
                    errors[id] ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder={placeholder}
                  maxLength={maxLength}
                />
                {errors[id] && (
                  <p className="mt-1 text-xs text-red-500">{errors[id]}</p>
                )}
              </div>
            ))}
          </div>
          <div className="mt-6 box-border">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Registered Address
            </label>
            <textarea
              id="address"
              name="address"
              value={gstDetails.address || ""}
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
              className="bg-[#D7B56D] text-white px-4 py-2 rounded hover:bg-[#006aa3] transition-colors"
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
