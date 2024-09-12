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
import ViewTickets from "../viewDetailedBooking/ViewTickets";

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
  const [data, setData] = useState(null);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const getSingleTicketDetailHandler = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}booking/retrieve-booking`,
        { bookingId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSearchQuery(response.data.searchQuery);
      setSingleBookingData(response.data.data);
      setAmendment(response.data.amendment);
      setData(response.data.completeBookingData);
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

  // Calculate total only if singleBookingData and data are available

  // const traveller = singleBookingData?.itemInfos?.AIR?.travellerInfos[0];

  // const combinedInfo = {};

  // for (const [segment, baggage] of Object.entries(
  //   traveller?.ssrBaggageInfos || {}
  // )) {
  //   combinedInfo[segment] = { ...combinedInfo[segment], baggage };
  // }

  // for (const [segment, meal] of Object.entries(traveller?.ssrMealInfos || {})) {
  //   combinedInfo[segment] = { ...combinedInfo[segment], meal };
  // }

  // for (const [segment, seat] of Object.entries(traveller?.ssrSeatInfos || {})) {
  //   combinedInfo[segment] = { ...combinedInfo[segment], seat };
  // }

  return (
    <div className="flex justify-center items-center w-full">
      {loading ? (
        <div className="h-[85vh] w-full flex  justify-center items-center ">
          <Spinner />
        </div>
      ) : (
        <div className="w-[90%]  p-2 border rounded-lg md:px-10  mt-3  flex justify-center items-center md:w-[100%]">
          <div className=" flex flex-col w-full   ">
            <div className=" bg-[#dce3e8] border-2 gap-2 flex flex-wrap justify-between items-center text-black rounded-xl px-10   py-4">
              <div className="text-[1.3rem] flex  font-bold">
                Ticket booking
              </div>
              <div className="flex gap-3">
                {/* <div className="">
                <button className="bg-red-500  flex justify-center items-center text-white p-2 w-[200px] rounded-lg">Cancel booking</button>
              </div> */}
                <div className="">
                  <button
                    className="bg-[#0A2546] border-white border-2 flex justify-center items-center text-[#D7B56D] p-2 w-[200px] rounded-lg"
                    onClick={DownloadInvoice}
                  >
                    <CiSaveDown1 />
                    Download ticket
                  </button>
                </div>
              </div>
            </div>
            <div className="flex w-full flex-wrap  justify-center     ">
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
                total={data?.payment?.amount}
              />
              {/* </motion.div> */}
              <div className="m-2 w-full lg:w-[20%] flex flex-col h-full  p-5 rounded-lg shadow-lg  border">
                <div className=" py-4 text-sm md:text-base">
                  <h2 className="font-montserrat">
                    Your booking is protected by{" "}
                    <span className="font-semibold">MY AIR DEAL</span>{" "}
                  </h2>
                </div>
                <div className="flex text-sm md:text-base flex-col gap-3">
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
                    <div className="flex justify-between">
                      <div>Meals,Baggae & Seats</div>
                      <div className="flex ">
                        ₹{" "}
                        {
                          singleBookingData?.itemInfos.AIR.totalPriceInfo
                            .totalFareDetail.fC.SSRP
                        }
                      </div>
                    </div>
                    {singleBookingData?.order?.status === "CANCELLED" && (
                      <div className="flex justify-between">
                        <div>Refundable Amount</div>
                        <div className="flex ">
                          ₹
                          {singleBookingData?.itemInfos.AIR.totalPriceInfo
                            .totalFareDetail.fC?.AAR -
                            singleBookingData?.itemInfos.AIR.totalPriceInfo
                              .totalFareDetail.fC?.AFS}
                        </div>
                      </div>
                    )}

                    {singleBookingData?.order?.status === "CANCELLED" && (
                      <div className="flex justify-between">
                        <div>Amendment Charge</div>
                        <div className="flex ">
                          ₹
                          {
                            singleBookingData?.itemInfos.AIR.totalPriceInfo
                              .totalFareDetail.fC?.AFS
                          }
                        </div>
                      </div>
                    )}

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
                        <div className="mt-2 ml-4 bg-slate-200 p-2 shadow-sm rounded-lg">
                          {Object.entries(
                            singleBookingData?.itemInfos.AIR.totalPriceInfo
                              .totalFareDetail.afC?.TAF || {}
                          ).map(([key, value]) => (
                            <div className="flex justify-between" key={key}>
                              <div>{key}</div>{" "}
                              {/* A function to map the key to a more readable label */}
                              <div className="flex">₹{value || "N/A"}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    {data?.promo?.code && (
                      <div className=" flex flex-col">
                        <div className="flex justify-between  cursor-pointer">
                          <div className="flex justify-center items-end gap-1">
                            <div>PROMO CODE: {data?.promo?.code}</div>{" "}
                          </div>

                          <div className="flex items-end">
                            -&nbsp;{`₹${data?.promo?.value}`}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between">
                    <div>Convenience Fees</div>
                    <div className="flex ">
                      ₹
                      {Math.abs(
                        data?.payment?.amount -
                          (singleBookingData?.itemInfos.AIR.totalPriceInfo
                            .totalFareDetail.fC?.AAR ??
                            singleBookingData?.itemInfos.AIR.totalPriceInfo
                              .totalFareDetail.fC.TF)
                      ) + (data?.promo?.value || 0)}
                    </div>
                  </div>
                  <div className="flex justify-between pt-3 border-t">
                    <div>Total</div>
                    <div className="flex">₹ {data?.payment?.amount}</div>
                  </div>
                </div>
              </div>
            </div>

            <ViewAmendmentDetails amendment={amendment} />
            <ViewTickets bookingId={bookingId} />
            <TicketLinks
              singleBookingData={singleBookingData}
              bookingFilter={bookingFilter}
              searchQuery={searchQuery}
            />
            <TermsAndConditions />
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewDetailedBooking;
