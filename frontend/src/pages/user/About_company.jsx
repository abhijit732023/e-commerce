import React from "react";
import logo from "../../images/logo4.png";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 text-gray-800 px-4 py-10 md:px-20">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">About SS Collection</h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            At SS Collection, fashion meets comfort and quality. We are a home-grown clothing brand dedicated to providing stylish, affordable, and high-quality apparel for everyone.
          </p>
        </div>

        {/* Image + Description Grid */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          {/* Image Section */}
          <div className="flex justify-center">
            <img
              src={logo}
              alt="SS Collection Store"
              className="rounded-2xl w-3/4 md:w-2/3 object-contain shadow-lg"
            />
          </div>

          {/* Text Section */}
          <div className="text-left">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">Our Journey</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              What started as a passion for trendy and affordable fashion has now become a go-to destination for customers seeking modern clothing. Every piece in our collection is thoughtfully designed with attention to detail.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-900">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              We aim to empower individuals by helping them express themselves through fashion. SS Collection blends creativity with quality to bring you outfits you'll love to wear again and again.
            </p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900">Why Choose Us?</h2>
          <ul className="max-w-xl mx-auto text-gray-600 space-y-4 text-left">
            {[
              "Unique & Trendy Designs",
              "Premium Quality Fabrics",
              "Affordable Prices",
              "Excellent Customer Support",
              "Fast & Reliable Delivery",
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-green-600 text-xl">✔</span>
                <span className="text-base md:text-lg">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Call-to-Action */}
        <div className="text-center mt-16">
          <a
            href="/shop"
            className="inline-block bg-black text-white px-6 py-3 rounded-full text-lg hover:bg-gray-800 transition duration-300"
          >
            Explore Our Collection
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
