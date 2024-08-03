// import React from "react";
// import mobile from "../../assets/home/mobile/mobile.png";

// const DownloadApp = () => {
//   return (
//     <div className="max-w-6xl mx-auto p-6 font-poppins relative m-5">
//       <h1 className="text-3xl font-bold mb-8">Download our app</h1>
//       <div className="relative flex flex-col md:flex-row items-center justify-between p-8 rounded-lg overflow-hidden bg-[#0f1e35]">
//         <div className="absolute inset-0 w-full h-[85%] bg-[#0f1e35] rounded-lg z-0"></div>
//         <section className="relative z-10 text-white md:w-3/4">
//           <h2 className="text-2xl font-bold mb-4">
//             We Are Available On PlayStore & AppStore!
//           </h2>
//           <p className="mb-6">
//             Available for Android and iOS. It's Free! Download Now!
//           </p>
//           <div className="flex gap-4">
//             <button className="bg-[#0f1e35] text-white border border-white py-2 px-6 rounded-full">
//               Play Store
//             </button>
//             <button className="bg-white text-[#0f1e35] py-2 px-6 rounded-full">
//               App Store
//             </button>
//           </div>
//         </section>
//         <div className="relative z-10 mt-8 md:mt-0 overflow-hidden">
//           <img
//             src={mobile}
//             alt="Mobile app preview"
//             className="w-full max-w-[300px] h-auto md:max-w-none md:h-full"
//             style={{ maxHeight: "100%", objectFit: "contain" }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DownloadApp;

import React from "react";
import mobile from "../../assets/home/mobile/mobile.png";

const DownloadApp = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 font-poppins overflow-hidden relative m-5">
      <h1 className="text-3xl font-bold mb-8">Download our app</h1>
      <div className="relative flex flex-col md:flex-row items-center  bg-[#253B59] justify-between p-8 rounded-lg h-56">
        <div className=" w-full  flex  rounded-lg ">
          <section className=" text-white md:w-3/4">
            <h2 className="text-2xl font-bold mb-4">
              We Are Available On PlayStore & AppStore!
            </h2>
            <p className="mb-6">
              Available for Android and iOS. It's Free! Download Now!
            </p>
            <div className="flex gap-4">
              <button className="bg-[#0f1e35] text-white border border-white py-2 px-6 rounded-full">
                Play Store
              </button>
              <button className="bg-white text-[#0f1e35] py-2 px-6 rounded-full">
                App Store
              </button>
            </div>
          </section>
          <div className="absolute md:flex hidden right-20  -top-20 z-50 ">
            <img
              src={mobile}
              alt="Mobile app preview"
              className=" w-[280px] h-auto "
              //   style={{ maxHeight: "100%", objectFit: "contain" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadApp;