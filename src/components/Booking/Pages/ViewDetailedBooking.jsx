import React, { useEffect, useState } from "react";
import { CiSaveDown1 } from "react-icons/ci";
import ViewDetailedBookingCard from "../viewDetailedBooking/ViewDetailedBookingCard";
import TermsAndConditions from "../viewDetailedBooking/TermsAndConditions";
import { useLocation } from "react-router-dom";
import { getQueryParams } from "../../util/getQueryParams";
import axios from "axios";
import { useSelector } from "react-redux";
import { FaAngleDoubleDown } from "react-icons/fa";
import TicketLinks from "../viewDetailedBooking/TicketLinks";
import Header from "../../Home/Header";
import Footer from "../../Home/Footer";
import Spinner from "../../Profile/Spinner";
import { motion } from "framer-motion";
import ViewAmendmentDetails from "../viewDetailedBooking/ViewAmendmentDetails";

const ViewDetailedBooking = () => {
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(null);

  const { token } = useSelector((state) => state.auth);
  const [singleBookingData, setSingleBookingData] = useState(null);
  const queryParams = getQueryParams(location.search);
  const { bookingId, bookingFilter } = queryParams;
  const [loading, setLoading] = useState(true);
  const [amendment, setAmendment] = useState([]);
  const getSingleTicketDetailHandler = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}booking/retrieve-booking`,
        { bookingId }, // Body of the request
        {
          headers: {
            Authorization: `Bearer ${token}`, // Authorization header
          },
        }
      );

      setSearchQuery(response.data.searchQuery);
      setSingleBookingData(response.data.data);
      setAmendment(response.data.amendment);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      ReactToast(error.message);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const DownloadInvoice = async () => {
    try {
      await axios
        .post(
          `${import.meta.env.VITE_SERVER_URL}invoice/generate`,
          {
            bookingId: singleBookingData.order.bookingId,
          },
          {
            headers: {
              authorization: ` Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          const linkSource = `data: application/pdf;base64,${res.data.base64String}`;
          const downloadLink = document.createElement("a");
          const fileName = `${singleBookingData.order.bookingId}.pdf`;

          downloadLink.href = linkSource;
          downloadLink.download = fileName;
          downloadLink.click();
        });

      // If the request is successful and returns a PDF file, you can handle the file here
    } catch (error) {
      // console.log(error);
      ReactTost(error.message);
    }
  };
  useEffect(() => {
    getSingleTicketDetailHandler();
  }, []);

  return (
    <div className="">
      <Header />
      {loading ? (
        <div className="h-[85vh] w-full flex  justify-center items-center ">
          <Spinner />
        </div>
      ) : (
        <div className="  p-2 border rounded-lg md:px-10  mt-3  flex justify-center items-center  ">
          <div className=" flex flex-col w-full   ">
            <div className=" bg-[#1B1D29] border-2 gap-2 flex flex-wrap justify-between items-center text-[#D7B56D] rounded-xl px-10   py-4">
              <div className="text-[1.3rem] flex  font-bold">
                Ticket booking
              </div>
              <div className="flex gap-3">
                {/* <div className="">
                <button className="bg-red-500  flex justify-center items-center text-white p-2 w-[200px] rounded-lg">Cancel booking</button>
              </div> */}
                <div className="">
                  <button
                    className="bg-[#1B1D29] border-white border-2 flex justify-center items-center text-[#D7B56D] p-2 w-[200px] rounded-lg"
                    onClick={DownloadInvoice}
                  >
                    <CiSaveDown1 />
                    Download ticket
                  </button>
                </div>
              </div>
            </div>
            <div className="flex w-full flex-wrap justify-center     ">
              {/* <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full lg:w-[70%]"
                > */}
              <ViewDetailedBookingCard
                singleBookingData={singleBookingData}
                searchQuery={searchQuery}
                amendment={amendment}
              />
              {/* </motion.div> */}
              <div className="m-2 w-full lg:w-[20%] flex flex-col  p-5 rounded-lg shadow-lg  border">
                <div className=" py-4 text-[1rem]">
                  <h2 className="font-montserrat">
                    Your booking is protected by{" "}
                    <span className="font-semibold">MY AIR DEAL</span>{" "}
                  </h2>
                </div>
                <div className="flex   flex-col gap-3">
                  <div className="font-bold">Price Details</div>
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between">
                      <div>Base Fare</div>
                      <div className="flex ">
                        ₹{" "}
                        {
                          singleBookingData?.itemInfos.AIR.totalPriceInfo
                            .totalFareDetail.fC.BF
                        }
                      </div>
                    </div>
                    <div className=" flex flex-col">
                      <div
                        className="flex justify-between  cursor-pointer"
                        onClick={toggleDropdown}
                      >
                        <div className="flex justify-center items-end gap-1">
                          <div>Total Additional Fare</div>{" "}
                          <FaAngleDoubleDown color="green" />
                        </div>

                        <div className="flex items-end">
                          {`₹${singleBookingData?.itemInfos.AIR.totalPriceInfo.totalFareDetail.fC.TAF}`}
                        </div>
                      </div>
                      {isDropdownOpen && (
                        <div className="mt-2 ml-4  bg-slate-200 p-2 shadow-sm rounded-lg">
                          <div className="flex justify-between">
                            <div>IGST</div>
                            <div className="flex">
                              ₹
                              {singleBookingData?.itemInfos.AIR.totalPriceInfo
                                .totalFareDetail.afC.TAF?.AGST || "N/A"}
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <div>Other Taxes</div>
                            <div>
                              ₹
                              {singleBookingData?.itemInfos.AIR.totalPriceInfo
                                .totalFareDetail.afC?.TAF?.OT || "N/A"}
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <div>Fuel Surcharge</div>
                            <div>
                              ₹
                              {singleBookingData?.itemInfos.AIR.totalPriceInfo
                                .totalFareDetail.afC.TAF?.YR || "N/A"}
                            </div>
                          </div>
                          {/* Add other details as needed */}
                        </div>
                      )}
                    </div>
                    {/* Uncomment if needed
        <div className="flex justify-between">
          <div>Taxes</div>
          <div>1400</div>
        </div>
        <div className="flex justify-between">
          <div>Service Fee</div>
          <div>400</div>
        </div> */}
                  </div>
                  <div className="flex justify-between pt-3 border-t">
                    <div>Total</div>
                    <div className="flex">
                      ₹{" "}
                      {
                        singleBookingData?.itemInfos.AIR.totalPriceInfo
                          .totalFareDetail.fC.TF
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <ViewAmendmentDetails amendment={amendment} />

            <TicketLinks
              singleBookingData={singleBookingData}
              bookingFilter={bookingFilter}
            />
            <TermsAndConditions />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ViewDetailedBooking;
