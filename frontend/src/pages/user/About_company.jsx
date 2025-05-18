import React from "react";
import logo from '../../images/logo4.png'

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 px-4 py-12 md:px-20">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">About SS Collection</h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          At SS Collection, fashion meets comfort and quality. We are a home-grown clothing brand dedicated to providing stylish, affordable, and high-quality apparel for everyone.
        </p>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="flex justify-center">  
            <img
            src={logo}
            alt="SS Collection Store"
            className="rounded-2xl  w-1/2 object-cover"
          />
          </div>

          <div className="text-left">
            <h2 className="text-2xl font-semibold mb-4">Our Journey</h2>
            <p className="text-gray-600 mb-4">
              What started as a passion for trendy and affordable fashion has now become a go-to destination for customers seeking modern clothing. Every piece in our collection is thoughtfully designed with attention to detail.
            </p>

            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-600">
              We aim to empower individuals by helping them express themselves through fashion. SS Collection blends creativity with quality to bring you outfits you'll love to wear again and again.
            </p>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-4">Why Choose Us?</h2>
          <ul className="text-left max-w-xl mx-auto text-gray-600 space-y-2">
            <li>✅ Unique & Trendy Designs</li>
            <li>✅ Premium Quality Fabrics</li>
            <li>✅ Affordable Prices</li>
            <li>✅ Excellent Customer Support</li>
            <li>✅ Fast & Reliable Delivery</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
