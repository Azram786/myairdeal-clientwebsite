


import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import axios from "axios";
import ReactToast from "../util/ReactToast";

const EnquiryForm = () => {
  
  const getEnquiryDetails = async (currentPage) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}enquiry/get-tickets?page=${currentPage}&pageSize=${pageSize}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { enquiries, totalCount } = response.data;
      setPreviousEnquiries(enquiries);
      setTotalPages(Math.ceil(totalCount / pageSize));
      setPage(currentPage);
    } catch (error) {
      console.log(error.message);
      ReactToast("Error fetching enquiries");
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <div className="mx-auto p-6 rounded-lg shadow-md text-white">
   

      <h3 className="text-lg font-bold mt-8 text-[#D7B56D]">
        Previous Enquiries
      </h3>
      <div className="mt-4">
        {previousEnquiries.map((enquiry) => (
          <div key={enquiry._id} className="mb-2">
            
          
          </div>
        ))}

        {isLoading && (
          <div className="text-center mt-4">
            <button className="bg-[#D7B56D] text-[#1B1D29] py-2 px-4 rounded-md font-semibold hover:bg-[#c9a757] transition-colors">
              Loading....
            </button>
          </div>
        )}

        {!isLoading && totalPages > 1 && (
          <div className="flex justify-center mt-4">
            {renderPagination()}
          </div>
        )}
      </div>
    </div>
  );
};

export default EnquiryForm;