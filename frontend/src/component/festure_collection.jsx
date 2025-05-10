import React, { useEffect, useState } from 'react';
import { AppwriteService } from '../FilesPaths/all_path';
import { Link } from 'react-router-dom';

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

  return (
    <section className="rounded-sm mt-0.5 bg-white py-12 px-4 md:px-16">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-rose-700">🌟 Featured Collection</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
        {productList.length > 0 ? (
          productList.map((product) => {
            const imgId = product.images && product.images[0]; // Ensure 'images' exist
            const imageUrl = imgId ? getImageUrl(imgId) : ''; // Construct full image URL

            return (
              <div
                key={product._id}
                className="bg-white shadow-lg rounded overflow-hidden hover:scale-105 transition-transform"
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
                </Link>
              </div>
            );
          })
        ) : (
          <div className="col-span-3 text-center">No products available</div>
        )}
      </div>
    </section>
  );
};

export default FeaturedCollection;
