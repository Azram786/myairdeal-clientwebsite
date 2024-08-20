// import { useEffect, useState } from "react";
// import BannerImage from "../../assets/home/banner/Banner.png";
// import axios from "axios";
// const Banner = () => {

//   const [banner, setBanner] = useState([])

//   const getBanner = async () => {
//     try {
//       const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}banner/get-banners-user`)
//       console.log({ banner: response })
//       setBanner(response.data)

//     } catch (error) {
//       console.log(error)
//     }
//   }

//   useEffect(() => {
//     getBanner()
//   }, [])

//   return (
//     <div className="relative min-w-[250px] h-[60vh] max-w-[1900px] mx-auto md:h-[50vh] lg:h-[70vh]  ">
//       <img
//         className="absolute top-0 left-0 w-full h-full object-cover
//        "
//         src={banner[0].image || BannerImage}
//         alt="Banner"
//       />

//       <div className="relative items-start h-full   left-[10%] flex flex-col justify-center  text-white w-2/3 ">
//         <h3 className="font-semibold leading-[1.5]  flex-wrap text-[1.2rem] md:text-[2rem] ">
//           Make your travel wishlist, we'll do the rest!
//         </h3>
//         <h4
//           className="md:mt-3 text-[1.2rem]  font-poppins md:text-[1.5rem] lg:text-2x 2xl:text-[1.7rem]
//         "
//         >
//           Special offers to suit your plan
//         </h4>
//         <h4 className="md:mt-3"></h4>
//         <div> <button onClick={() => window.scrollTo({
//           top: 276,
//           behavior: 'smooth'
//         })} className="bg-[#01324D] px-6 text-xs md:text-base rounded-md mt-4 py-2">Explore</button></div>
//       </div>
//     </div>
//   );
// };

// export default Banner;
import { useEffect, useState } from "react";
import BannerImage from "../../assets/home/banner/Banner.png";
import axios from "axios";

const Banner = () => {
  const [banners, setBanners] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const getBanners = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}banner/get-banners-user`);
      // console.log({ banners: response },"Banners");
      setBanners(response.data);
    } catch (error) {
      ReactToast(error);
    }
  };

  useEffect(() => {
    getBanners();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  if (banners.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative min-w-[250px] h-[60vh] max-w-[1900px] mx-auto md:h-[50vh] lg:h-[70vh]">
      <img
        className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500"
        src={banners[currentSlide]?.image || BannerImage}
        alt={`Banner ${currentSlide + 1}`}
      />

      <div className="relative items-start h-full left-[10%] flex flex-col justify-center text-white w-2/3">
        <h3 className="font-semibold leading-[1.5] flex-wrap text-[1.2rem] md:text-[2rem]">
          {banners[currentSlide]?.headingOne }
        </h3>
        <h4 className="md:mt-3 text-[1.2rem] font-poppins md:text-[1.5rem] lg:text-2x 2xl:text-[1.7rem]">
        {banners[currentSlide]?.headingTwo}
        </h4>
        <div>
          <button
            onClick={() =>
              window.scrollTo({
                top: 276,
                behavior: "smooth",
              })
            }
            className="bg-[#01324D] px-6 text-xs md:text-base rounded-md mt-4 py-2"
          >
              {banners[currentSlide]?.buttonText}
          </button>
        </div>
      </div>

      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
      >
        &#10095;
      </button>

      {/* Slide indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${currentSlide === index ? "bg-white" : "bg-gray-400"
              }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Banner;
