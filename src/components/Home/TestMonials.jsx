import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import TestimonialCard from './TestMonialCard';
import profile from '../../assets/home/whyChooseUs/profile.png'


const testimonials = [
  {
    name: "Hannah Schmitt",
    role: "Lead designer",
    image: profile,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus malesuada. Suspendisse sed magna eget nibh in turpis. Consequat dui diam lacus arcu. Faucibus venenatis felis id augue sit cursus pellentesque enim."
  },
  {
    name: "Hannah Schmitt",
    role: "Lead designer",
    image: "path_to_image2",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus malesuada. Suspendisse sed magna eget nibh in turpis. Consequat dui diam lacus arcu. Faucibus venenatis felis id augue sit cursus pellentesque enim."
  },
  {
    name: "Hannah Schmitt",
    role: "Lead designer",
    image: "path_to_image3",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus malesuada. Suspendisse sed magna eget nibh in turpis. Consequat dui diam lacus arcu. Faucibus venenatis felis id augue sit cursus pellentesque enim."
  }
];

const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-blue-50">
      <h2 className="text-center text-gray-500 text-sm">Testimonials</h2>
      <h1 className="text-center text-3xl font-bold mb-8">What Our Clients Say About Us</h1>
      <Slider {...settings}>
        {testimonials.map((testimonial, index) => (
          <div key={index} className="p-4 mt-3">
            <div className="bg-white rounded-lg shadow-lg p-4 relative">
              <img src={testimonial?.image} alt={testimonial.name} className="w-16 h-16 rounded-full mx-auto absolute -top-6 left-1/2 transform -translate-x-1/2" />
              <div className="pt-8 text-center">
                <h3 className="text-xl font-semibold">{testimonial.name}</h3>
                <p className="text-gray-500">{testimonial.role}</p>
                <p className="mt-2 text-gray-700">{testimonial.text}</p>
              </div>
            </div>
          </div>
          // <TestimonialCard />
        ))}
      </Slider>
    </div>
  );
};

export default Testimonials;
