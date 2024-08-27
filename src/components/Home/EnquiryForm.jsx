import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import axios from "axios";
import ReactToast from "../util/ReactToast";

const EnquiryForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    dialCode: "",
    type: "",
    description: "",
  });
  const { token } = useSelector((state) => state.auth);

  const [previousEnquiries, setPreviousEnquiries] = useState([]);
  const [expandedEnquiry, setExpandedEnquiry] = useState(null);
  const [errors, setErrors] = useState({});
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (value, country) => {
    setFormData({
      ...formData,
      phone: value,
      dialCode: country.dialCode,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (formData.phone.length < 5) {
      newErrors.phone = "Please enter a valid phone number";
    }
    if (!formData.type) {
      newErrors.type = "Please select a query type";
    }
    if (!formData.description) {
      newErrors.description = "Please enter a description";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}enquiry/create-registeredUser`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 201) {
          getEnquiryDetails(1, true);
          ReactToast("Form submitted successfully!");
          setFormData({
            email: "",
            phone: "",
            dialCode: "",
            type: "",
            description: "",
          });
        } else {
          ReactToast("Failed to submit the form. Please try again.");
        }
      } catch (error) {
        ReactToast("An error occurred while submitting the form.");
        console.log(error.message);
      }
    }
  };

  const toggleEnquiryDetails = (id) => {
    setExpandedEnquiry(expandedEnquiry === id ? null : id);
  };

  const getEnquiryDetails = async (currentPage, reset = false) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_SERVER_URL
        }enquiry/get-tickets?page=${currentPage}&pageSize=5`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const newEnquiries = response.data;
      if (newEnquiries.length > 0) {
        setPreviousEnquiries((prev) =>
          reset ? newEnquiries : [...prev, ...newEnquiries]
        );
        setHasMore(newEnquiries.length === 5);
        setPage(currentPage); // Update the page state
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log(error.message);
      ReactToast("Error fetching enquiries");
    } finally {
      setIsLoading(false);
    }
  };

  const loadMoreEnquiries = () => {
    if (!isLoading && hasMore) {
      const nextPage = page + 1;
      getEnquiryDetails(nextPage);
    }
  };

  useEffect(() => {
    getEnquiryDetails(1, true);
  }, []);

  return (
    <div className="mx-auto p-6 rounded-lg shadow-md text-white">
      
      <div className="lg-custom:w-1/2 mx-auto bg-[#1B1D29] rounded-2xl p-4">
        <form onSubmit={handleSubmit} className="w-3/4 mx-auto">
        <h2 className="text-xl font-bold mb-6  text-[#D7B56D] p-2  text-center rounded-md" >Enquiry Form</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full p-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-md bg-white text-sm text-black focus:outline-none`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Phone</label>
            <PhoneInput
              country={"in"}
              value={formData.phone}
              onChange={handlePhoneChange}
              inputStyle={{
                width: "103%",
           paddingLeft:"40px",
                padding: "10px",
                borderRadius: "6px",
                backgroundColor: "white",
                border: errors.phone
                  ? "1px solid #E53E3E"
                  : "1px solid #4A5568",
                color: "black",
              }}
              buttonStyle={{
                backgroundColor: "white",
                border: "none",
              }}
              dropdownStyle={{
                backgroundColor: "white",
                borderColor: "#4A5568",
                color: "red",
              }}
              enableSearch={true}
              searchPlaceholder="Search countries"
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Query Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className={`w-full p-2 border ${
                errors.type ? "border-red-500" : "border-gray-300"
              } rounded-md bg-white text-black focus:outline-none text-sm`}
            >
              <option value="">Select a type</option>
              <option value="Private Jet">Private Jet</option>
              <option value="Air Ambulance">Air Ambulance</option>
              <option value="Helicopter">Helicopter</option>
            </select>
            {errors.type && (
              <p className="text-red-500 text-xs mt-1">{errors.type}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className={`w-full p-2 border ${
                errors.description ? "border-red-500" : "border-gray-300"
              } rounded-md bg-white text-black focus:outline-none`}
              placeholder="Enter your description"
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">{errors.description}</p>
            )}
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-1/2 bg-[#D7B56D] text-[#1B1D29] py-2 rounded-md font-semibold hover:bg-[#c9a757] transition-colors"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      <h3 className="text-lg font-bold mt-8 text-[#D7B56D]">
        Previous Enquiries
      </h3>
      <div className="mt-4">
        {previousEnquiries.map((enquiry) => (
          <div key={enquiry._id} className="mb-2">
            <div
              className="p-3 bg-[#282C35] rounded-md flex justify-between items-center cursor-pointer"
              onClick={() => toggleEnquiryDetails(enquiry._id)}
            >
              <div className="text-sm">
                {enquiry.type} - {enquiry.email}
              </div>
              <div>
                {expandedEnquiry === enquiry._id ? (
                  <FaChevronUp />
                ) : (
                  <FaChevronDown />
                )}
              </div>
            </div>
            {expandedEnquiry === enquiry._id && (
              <div className="p-3 bg-[#D7B56D] text-black rounded-md mt-2 text-sm">
                <p>
                  <strong>Phone:</strong> {enquiry.phone}
                </p>
                <p>
                  <strong>Description:</strong> {enquiry.description}
                </p>
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="text-center mt-4">
            <button className="bg-[#D7B56D] text-[#1B1D29] py-2 px-4 rounded-md font-semibold hover:bg-[#c9a757] transition-colors">
              Loading....
            </button>
          </div>
        )}

        {!isLoading && hasMore && (
          <div className="text-center mt-4">
            <button
              onClick={loadMoreEnquiries}
              className="bg-[#D7B56D] text-[#1B1D29] py-2 px-4 rounded-md font-semibold hover:bg-[#c9a757] transition-colors"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnquiryForm;
