import React from 'react';
import image1 from '../../assets/home/aboutUs/image1.svg'
import shadow from '../../assets/home/aboutUs/shadow.svg'

const AboutUs = () => {
  return (
    <div className="container mx-auto    py-12">
      <div className="flex flex-col-reverse md:px-16  md:flex-row items-center">
        <div className="md:w-1/2 w-[90%] md:mt-0 mt-2">
          <h2 className="text-sm font-sans text-gray-500 font-bold ">About us</h2>
          <h1 className="text-4xl font-bold font-sans mb-2">My air deal</h1>
          <p className="text-gray-700 font-semibold mb-6">Welcome to My air deal, your trusted Flight booking company.</p>

          <div className="mb-8">
            <div className="flex items-center mb-2">
              <div className="bg-blue-200 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl w-full border-b font-semibold ml-4">Guaranteed Results</h3>
              </div>
            </div>
            <p className="text-gray-600 pl-12">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
          </div>

          <div>
            <div className="flex items-center mb-2">
              <div className="bg-blue-200 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 7l9-5-9-5-9 5 9 5z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl border-b font-semibold ml-4">Team of Industry Experts</h3>
              </div>
            </div>
            <p className="text-gray-600 pl-12">Consectetur amet dolor sit comeneer tiremsilom dolce issilm acalrm leoinison duycqoqun consemlenit lorem.</p>
          </div>
        </div>

        <div className="md:w-1/2 md:mb-0 mb-2 flex justify-center relative  ">
          <div className='w-full flex justify-center'>
            <img src={image1} className='w-[250px] md:w-[350px]' alt="image-2" width={350} />
          </div>
          <div className='flex -mt-5 -mr-10 justify-center absolute -z-10  '>
            <img src={shadow} alt="shadow" className='w-[250px] md:w-[350px]' width={350}  />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
