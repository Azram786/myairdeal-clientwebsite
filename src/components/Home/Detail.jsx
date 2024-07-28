import Detail1 from "../../assets/home/detail/Detail1.png";
import Detail2 from "../../assets/home/detail/Detail2.png";
import Detail3 from "../../assets/home/detail/Detail3.png";
import Detail4 from "../../assets/home/detail/Detail4.png";
const Detail = () => {
  return (
    <div className="h-[100%] lg:h-[100%] py-5 min-w-[250px] max-w-[1900px] ">
      <div
        className="h-[20%]  mt-3 lg:mt-0
       lg:h-[30%] w-[85%] m-auto  flex justify-center md:gap-1 lg:gap-4 flex-col"
      >
        <h2 className="font-semibold sm:text-xl md:text-2xl lg:text-4xl">
          Fall into travel
        </h2>
        <h4 className="font-light text-[.7rem]  sm:text-[.9rem]  md:text-sm lg:text-[1rem] ">
          {/* Going somewhere to celebrate this season? Whether you're going home or
          somewhere to roam, we've got the travel tools to get you to your
          destination. */}
        </h4>
      </div>

      <div
        className="h-[80%] lg:my-7 gap-x-2 lg:gap-x-3
       lg:gap-y-3  grid  grid-cols-4 lg:grid-cols-7 lg:grid-rows-6  w-[85%] m-auto content-center items-center"
      >
        <div
          className="h-[100%] rounded-lg 
       col-span-4 lg:col-span-3 order-last lg:order-first bg-black
        lg:row-span-8 "
        >
          <div className=" text-white flex flex-col justify-between bg-black md:h-[35vh] lg:h-[90%] p-3  ">
            <div className="flex justify-between">
              <div className="font-bold text-lg md:text-2xl lg:text-4xl">
                Backpacking Sri Lanka
              </div>
              <div className="text-black bg-white  font-bold text-[0.7rem] md:text-sm p-2 lg:text-xl rounded-lg  text-center lg:m-auto">
                From 7000/-
              </div>
            </div>
            <div>
              <span className="text-[.8rem] md:text-lg sm:text-sm lg:text-xl">
                Traveling is a unique experience as it's the best way to unplug
                from the pushes and pulls of daily life. It helps us to forget
                abour our problems, frunstrations, and fears at home. During our
                journey, we experience life in different ways. We explore new
                places, cultures, cuisines, traditions, and ways of living.
              </span>
            </div>
            <button className="bg-white text-black w-1/2 mx-auto lg:w-[90%] font-bold p-2 md:p-3 rounded-lg ">
              Book Flight
            </button>
          </div>
        </div>
        <div className="  rounded-lg w-[100%] col-span-2 flex justify-center items-center  lg:col-span-2 lg:row-span-3  h-full">
          <img className="h-[85%] w-full" src={Detail1} alt="" />
        </div>
        <div className=" col-span-2 rounded-lg w-[100%] flex justify-center items-center  lg:col-span-2 lg:row-span-3  h-full">
          <img className="h-[85%] w-full" src={Detail1} alt="" />
        </div>

        <div className=" col-span-2 rounded-lg w-[100%] flex justify-center items-center  lg:col-span-2 lg:row-span-3  h-full">
          <img className="h-[85%] w-full" src={Detail1} alt="" />
        </div>
        <div className=" col-span-2 rounded-lg w-[100%] flex justify-center items-center  lg:col-span-2 lg:row-span-3  h-full">
          <img className="h-[85%] w-full" src={Detail1} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Detail;
