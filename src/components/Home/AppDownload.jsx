

import React from "react";
import mobile from "../../assets/home/mobile/mobile.png";

const DownloadApp = () => {
  return (
    <div className="px-3 md:px-16 mx-auto p-6 font-poppins overflow-hidden relative m-5">
      {/* <h2 className="text-base font-sans text-gray-500 font-bold">Download</h2> */}
      <h1 className="text-xl md:text-3xl font-bold mb-8">Download our app</h1>
      <div className="relative flex flex-col md:flex-row items-center  bg-[#1B1D29] justify-between p-8 rounded-lg md:h-56">
        <div className=" w-full  flex  rounded-lg ">
          <section className=" text-white md:w-3/4">
            <h2 className="text-base md:text-2xl font-bold mb-4">
              We Are Available On PlayStore & AppStore!
            </h2>
            <p className="mb-6">
              Available for Android and iOS. It's Free! Download Now!
            </p>
            <div className="flex justify-around md:justify-start gap-4">
              <button className="text-sm md:text-base bg-[#D7B56D] px-4 text-black border-none py-2  md:px-6 rounded-full">
                Play Store
              </button>
              <button className="text-sm md:text-base bg-white text-[#0f1e35] py-2 px-4 md:px-6 rounded-full">
                App Store
              </button>
            </div>
          </section>
          <div className="absolute md:flex hidden right-1 lg-custom:right-16  lg:right-20  -top-20 z-50 ">
            <img
              src={mobile}
              alt="Mobile app preview"
              className=" w-[200px] ml-2 lg-custom:w-[280px] h-auto "
              //   style={{ maxHeight: "100%", objectFit: "contain" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadApp;