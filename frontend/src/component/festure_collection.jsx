import React, { useMemo } from 'react';
import { ENV_File } from '../FilesPaths/all_path';
import { Link } from 'react-router-dom';

const FeaturedCollection = ({ products = [] }) => {
  const productList = useMemo(() => {
    return Array.isArray(products) ? products : [];
  }, [products]);

  return (
    <section className="rounded-sm bg-gradient-to-br from-amber-50 via-white to-rose-50 border border-amber-100/60 px-2 md:px-10 py-10">
      <h2 className="text-3xl md:text-5xl font-extrabold text-rose-700 text-center mb-5 pt-14 tracking-tight">
        Featured Collection
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-6 gap-4 md:gap-10">
        {productList.length > 0 ? (
          productList.map((product) => {
            const imagePath = product.images?.[0];
            const imageUrl = imagePath ? ENV_File.backendURL + imagePath : null;

            return (
              <div
                key={product._id}
                className="bg-white border-amber-200 rounded-sm overflow-hidden relative group border hover:border-rose-300 transition"
              >
                <Link to={`/product/${product._id}`} className="block">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={product.header || 'Featured Product'}
                      className="w-full h-70 md:h-80 object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-64 md:h-80 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                      No Image
                    </div>
                  )}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 flex items-end justify-center pointer-events-none transition-opacity duration-300">
                    <p className="text-white text-lg font-bold mb-6 px-4 text-center">
                      {product.header}
                    </p>
                  </div>
                </Link>
              </div>
            );
          })
        ) : (
          <div className="col-span-full text-center text-gray-500 text-lg font-medium py-10">
            No products available
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedCollection;
