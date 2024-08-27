import { useEffect, useState } from "react";
import BannerImage from "../../assets/home/banner/Banner.png";
import axios from "axios";
import ReactToast from "../util/ReactToast";

const Banner = ({ setLoading }) => {
  const [banners, setBanners] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const getBanners = async () => {
    try {
   
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}banner/get-banners-user`
      );
      // console.log({ banners: response },"Banners");
      setBanners(response.data);
      
    } catch (error) {
      ReactToast(error);
    }
  };

  useEffect(() => {
    getBanners();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [banners.length]);

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
      <div className="relative w-full h-full overflow-hidden">
        {banners.map((banner, index) => (
          <img
            key={index}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-10000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
            src={banner?.image || BannerImage}
            alt={`Banner ${index + 1}`}
          />
        ))}
      </div>

      <div className="absolute inset-0 flex items-center justify-start left-[10%] text-white w-2/3">
        <div className="flex flex-col">
          <h3 className="font-semibold leading-[1.5] flex-wrap text-[1.2rem] md:text-[2rem]">
            {banners[currentSlide]?.headingOne}
          </h3>
          <h4 className="md:mt-3 text-[1.2rem] font-poppins md:text-[1.5rem] lg:text-2x 2xl:text-[1.7rem]">
            {banners[currentSlide]?.headingTwo}
          </h4>
          <button
            onClick={() =>
              window.scrollTo({
                top: 276,
                behavior: "smooth",
              })
            }
            className="bg-[#1B1D29] text-white rounded-md mt-4 py-2 px-6 md:px-8 text-xs md:text-base w-32"
          >
            {banners[currentSlide]?.buttonText}
          </button>
        </div>
      </div>

      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
        style={{ width: "40px", height: "40px" }}
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
        style={{ width: "40px", height: "40px" }}
      >
        &#10095;
      </button>

      {/* Slide indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${
              currentSlide === index ? "bg-white" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Banner;
