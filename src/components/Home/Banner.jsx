import BannerImage from "../../assets/home/banner/Banner.png";
const Banner = () => {
  return (
    <div className="relative min-w-[250px] h-[60vh] max-w-[1900px] mx-auto md:h-[50vh] lg:h-[70vh]  ">
      <img
        className="absolute top-0 left-0 w-full h-full object-cover
       "
        src={BannerImage}
        alt="Banner"
      />

      <div className="relative items-start h-full   left-[10%] flex flex-col justify-center  text-white w-2/3 ">
        <h3 className="font-semibold leading-[1.5]  flex-wrap text-[1.2rem] md:text-[2rem] ">
          Make your travel wishlist, we'll do the rest!
        </h3>
        <h4
          className="md:mt-3 text-[1.2rem]  font-poppins md:text-[1.5rem] lg:text-2x 2xl:text-[1.7rem]
        "
        >
          Special offers to suit your plan
        </h4>
        <h4 className="md:mt-3"></h4>
      <div> <button onClick={() => window.scrollTo({
      top: 276,
      behavior: 'smooth'
    })} className="bg-[#01324D] px-6 text-xs md:text-base rounded-md mt-4 py-2">Explore</button></div>
      </div>
    </div>
  );
};

export default Banner;
