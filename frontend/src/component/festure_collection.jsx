import React, { useEffect, useState } from 'react';
import { AppwriteService, ENV_File } from '../FilesPaths/all_path';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const FeaturedCollection = ({ products }) => {
  const [productList, setProductList] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (!hasLoaded && products && products.length > 0) {
      setProductList(products);
      setHasLoaded(true);
    }
  }, [products, hasLoaded]);

  const getImageUrl = (imgId) => imgId;

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
    hover: {
      scale: 1.07,
      boxShadow: '0 8px 32px 0 rgba(255, 72, 66, 0.15)',
      transition: { duration: 0.3 },
    },
  };

  return (
    <section className="rounded-sm bg-gradient-to-br from-amber-50 via-white to-rose-50 border border-amber-100/60 px-2 md:px-10 py-10 shadow-xl">
      <h2 className="text-3xl md:text-5xl font-extrabold text-rose-700 text-center mb-5 pt-14 tracking-tight drop-shadow">
        Featured Collection
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-10">
        {productList.length > 0 ? (
          productList.map((product) => {
            const imgId = product.images?.[0];
            const imageUrl = imgId ? getImageUrl(imgId) : '';

            return (
              <motion.div
                key={product._id}
                className="bg-white border-amber-200 shadow-xl rounded-sm overflow-hidden relative group border hover:border-rose-300 transition-all duration-300"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true, amount: 0.3 }}
              >
                <Link to={`/product/${product._id}`}>
                  {imageUrl ? (
                    <img
                      src={ENV_File.backendURL + imageUrl}
                      alt={product.header}
                      className="w-full h-70 md:h-80 object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-64 md:h-80 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">No Image</span>
                    </div>
                  )}

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center">
                    <p className="text-white text-lg font-bold mb-6 px-4 text-center drop-shadow">
                      {product.header}
                    </p>
                  </div>
                </Link>
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
