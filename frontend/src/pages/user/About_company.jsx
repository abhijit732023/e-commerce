import React from "react";
import logo from "../../images/logo4.png";
import { Container } from "../../FilesPaths/all_path";

const AboutUs = () => {
  return (
  <Container>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 text-gray-800 px-6 py-12 md:px-24 overflow-y-auto max-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6 drop-shadow-lg">
            About SS Collection
          </h1>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            At SS Collection, fashion meets comfort and quality. We are a home-grown clothing brand dedicated to providing stylish, affordable, and high-quality apparel for everyone.
          </p>
        </div>

        {/* Image + Description Grid */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
          {/* Image Section */}
          <div className="flex justify-center">
            <img
              src={logo}
              alt="SS Collection Store"
              className="rounded-3xl w-3/4 md:w-2/3 object-contain "
            />
          </div>

          {/* Text Section */}
          <div className="text-left">
            <h2 className="text-3xl font-semibold mb-6 text-gray-900">
              Our Journey
            </h2>
            <p className="text-gray-700 mb-8 leading-relaxed text-lg">
              What started as a passion for trendy and affordable fashion has now become a go-to destination for customers seeking modern clothing. Every piece in our collection is thoughtfully designed with attention to detail.
            </p>

            <h2 className="text-3xl font-semibold mb-6 text-gray-900">
              Our Mission
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              We aim to empower individuals by helping them express themselves through fashion. SS Collection blends creativity with quality to bring you outfits you'll love to wear again and again.
            </p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="text-center">
          <h2 className="text-3xl font-semibold mb-8 text-gray-900">
            Why Choose Us?
          </h2>
          <ul className="max-w-xl mx-auto text-gray-700 space-y-6 text-left text-lg">
            {[
              "Unique & Trendy Designs",
              "Premium Quality Fabrics",
              "Affordable Prices",
              "Excellent Customer Support",
              "Fast & Reliable Delivery",
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-4">
                <span className="text-green-600 text-2xl">✔</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Call-to-Action */}
        <div className="text-center mt-20">
          <a
            href="/shop"
            className="inline-block bg-black text-white px-8 py-4 rounded-full text-xl hover:bg-gray-800 transition duration-300 shadow-lg"
          >
            Explore Our Collection
          </a>
        </div>
      </div>
    </div>
  </Container>
  );
};

export default AboutUs;
