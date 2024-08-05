import React, { useState } from 'react';
import girlimage from '../../assets/home/whyChooseUs/girlimage.png'
import shadow from '../../assets/home/whyChooseUs/girlimageshadow.png'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const AccordionItem = ({ id, title, content, isOpen, toggleAccordion }) => {
  return (
    <div className="border-b">
      <button
        className="w-full text-left py-4 focus:outline-none"
        onClick={() => toggleAccordion(id)}
      >
        <h3 className=" sm:text-xl font-semibold flex items-center">
          <span className='text-gray-500 font-sans mr-4'>{id}</span>
          {title}
          <span className={`ml-auto transform transition-transform duration-200 `}>
          {isOpen ? <FaChevronUp/> :<FaChevronDown/> }
            
          </span>
        </h3>
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-40' : 'max-h-0'
        }`}
      >
        <p className="py-4">{content}</p>
      </div>
    </div>
  );
};

const WhyChooseUs = () => {
  const [openItem, setOpenItem] = useState(null);

  const items = [
    { id: '01', title: 'Guaranteed Results', content: 'We ensure satisfaction with our proven track record of success.' },
    { id: '02', title: 'Expert Team', content: 'Our team consists of industry professionals with years of experience.' },
    { id: '03', title: 'Customer-Centric Approach', content: 'We prioritize your needs and provide personalized solutions.' },
  ];

  const toggleAccordion = (itemId) => {
    setOpenItem(openItem === itemId ? null : itemId);
  };

  return (
    <div className=" mx-auto py-12">
      <div className="flex flex-col md:px-16 md:flex-row items-center">
        <div className="md:w-1/2 md:mb-0 mb-2 flex justify-center relative">
          <div className='w-full flex justify-center z-10'>
            <img src={girlimage} className='w-[250px] md:w-[350px]' alt="image-2" width={350} />
          </div>
          <div className='flex -mt-5 -ml-10 justify-center absolute -z-10  '>
            <img src={shadow} alt="shadow" className='w-[250px] md:w-[350px]' width={350}  />
          </div>
        </div>

        <div className="md:w-1/2 w-[90%] md:mt-0 mt-2">
          <h2 className="text-base font-sans text-gray-500 font-bold">Why Choose Us?</h2>
          <h1 className="text-xl sm:text-3xl  font-bold font-sans mb-2">98% of Client Satisfied <br/>with our Service</h1>

          <div className="mb-8 w-full h-full">
            {items.map((item) => (
              <AccordionItem
                key={item.id}
                id={item.id}
                title={item.title}
                content={item.content}
                isOpen={openItem === item.id}
                toggleAccordion={toggleAccordion}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;