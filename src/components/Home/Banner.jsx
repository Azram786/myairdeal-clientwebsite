import BannerImage from "../../assets/home/banner/Banner.png";
const Banner = () => {
  return (
    <div className="relative min-w-[250px] h-[40vh] max-w-[1900px] mx-auto md:h-[50vh] lg:h-[70vh]  ">
      <img
        className="absolute top-0 left-0 w-full h-full object-cover
       "
        src={BannerImage}
        alt="Banner"
      />

      <div className="relative items-center h-full   left-[10%] flex flex-col justify-center  text-white  w-[30%] ">
        <h3 className="font-bold text-[.9rem] md:text-[1.3rem] lg:text-3xl leading-[1.3] 2xl:text-[2.2rem] 2xl:leading-[1.4]">
          Make your travel wishlist, we'll do the rest
        </h3>
        <h4
          className="mt-4 text-[0.6rem] md:text-[0.9rem] lg:text-2x 2xl:text-[1.7rem]
        "
        >
          Special offers to suit your plan
        </h4>
      </div>
    </div>
  );
};

export default Banner;
