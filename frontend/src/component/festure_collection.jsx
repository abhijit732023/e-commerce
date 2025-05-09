import React, { useEffect, useState } from 'react';
import { AppwriteService } from '../FilesPaths/all_path';
import { Link } from 'react-router-dom';
import bgimg from '../images/texture2.webp'


const FeaturedCollection = ({ products }) => {
  const[product,setproduct]=useState([])
  useEffect(()=>{
    try {
      if (products) {
        setproduct(products)
      }
      
    } catch (error) {
      
    }
  },[])

  // console.log('ppp',product);
  
  const imageBaseURL = "https://your-image-hosting.com/v1/images/"; // Replace this with your actual base URL

  return (
    <section className="rounded-xl mt-1 py-12 px-4 md:px-16 ">
      
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-rose-700">🌟 Featured Collection</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
        {products.map((product, i) => {
          const imgId = product.images[0];
          const imageUrl = `${AppwriteService.getFileViewUrl(imgId)}`; // Construct full image URL
          
          return (
            <div
              key={product._id}
              className="bg-white shadow-lg rounded overflow-hidden hover:scale-105 transition-transform"
            >
            <Link to={`product/${product._id}`}>
              <img
                src={imageUrl}
                alt={product.header}
                className="w-full h-64 md:h-80 object-cover"
              />
              {/* <div className="p-4">
                <h3 className="text-lg font-semibold">{product.header}</h3>
                <p className="text-red-600 mt-1 text-md">₹{product.discountedPrice}</p>
              </div> */}
            </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturedCollection;
