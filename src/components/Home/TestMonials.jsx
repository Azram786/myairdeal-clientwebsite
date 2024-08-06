import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import TestimonialCard from './TestMonialCard';
import profile from '../../assets/home/whyChooseUs/profile.png'
import profile1 from '../../assets/home/whyChooseUs/profile2.png'
import Avatar from '../../assets/home/banner/avatar.png'


const testimonials = [
  {
    name: "Sarah Thompson",
    role: "Frequent Flyer",
    image: profile,
    text: "My air deal has completely transformed how I book my flights. The app is intuitive, and I always find great deals. I've saved hundreds on my business trips this year alone. Their customer service is top-notch too – always there when I need them!"
  },
  {
    name: "David Chen",
    role: "Family Vacation Planner",
    image: profile1,
    text: "Planning family trips used to be a headache, but My air deal makes it so easy. I can compare multiple flights, and even select our seats all in one place. The price alerts feature helped us snag an amazing deal for our summer vacation!"
  },
  {
    name: "Emily Rodriguez",
    role: "Adventure Traveler",
    image: "",
    text: "As someone who loves spontaneous trips, My air deal is a game-changer. Their last-minute deals are unbeatable, and the flexible date search helps me find the best prices. I've discovered new destinations I never thought I could afford to visit."
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-blue-50">
      <h2 className="text-center font-bold text-gray-500 text-base">Testimonials</h2>
      <h1 className="text-center text-xl sm:text-3xl font-bold mb-8">What Our Clients Say About Us</h1>
      <div className='px-4'>
        <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="p-4 mt-3">
              <div className="bg-white rounded-lg shadow-lg p-4 relative">
                <img src={testimonial?.image || Avatar} alt={testimonial.name} className="w-16 h-16 rounded-full mx-auto absolute -top-6 left-1/2 transform -translate-x-1/2" />
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
    </div>
  );
};

export default Testimonials;
