import React, { useEffect, useState } from 'react';
import { AppwriteService } from '../FilesPaths/all_path';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const FeaturedCollection = ({ products }) => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    // Ensure that products are correctly loaded before setting them in state
    if (products && products.length > 0) {
      setProductList(products);
    }
  }, [products]); // Re-run effect when 'products' prop changes

  const getImageUrl = (imgId) => {
    // Use Appwrite service to fetch image URLs if needed
    return AppwriteService.getFileViewUrl(imgId);
  };

  // Animation variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  return (
    <section className="rounded-sm mt-0.5 bg-gradient-to-b from-gray-50 to-white py-12 px-4 md:px-16">
      <h2 className="text-2xl md:text-4xl font-bold text-gray-800 text-center mb-8">
        🌟 Featured Collection
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
        {productList.length > 0 ? (
          productList.map((product) => {
            const imgId = product.images && product.images[0]; // Ensure 'images' exist
            const imageUrl = imgId ? getImageUrl(imgId) : ''; // Construct full image URL

            return (
              <motion.div
                key={product._id}
                className="bg-white shadow-lg rounded-lg overflow-hidden relative group"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true, amount: 0.2 }}
              >
                <Link to={`product/${product._id}`}>
                  {imageUrl ? (
                    <img
                      src={`${imageUrl}`}
                      alt={product.header}
                      className="w-full h-64 md:h-80 object-cover"
                    />
                  ) : (
                    <div className="w-full h-64 md:h-80 bg-gray-300 flex items-center justify-center">
                      <span>No Image</span>
                    </div>
                  )}
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <p className="text-white text-lg font-semibold">{product.header}</p>
                  </div>
                </Link>
                {/* Product Info */}
                {/* <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 truncate">{product.header}</h3>
                  <p className="text-sm text-gray-500 truncate">{product.description}</p>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-lg font-bold text-green-600">₹{product.price}</p>
                    {product.fakePrie && (
                      <p className="text-sm line-through text-gray-400">₹{product.fakePrie}</p>
                    )}
                  </div>
                </div> */}
              </motion.div>
            );
          })
        ) : (
          <div className="col-span-3 text-center text-gray-500 text-lg font-medium">
            No products available
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedCollection;