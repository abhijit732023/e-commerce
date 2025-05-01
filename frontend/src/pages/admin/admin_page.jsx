import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { ENV_File } from '../../FilesPaths/all_path';

export default function ProductForm() {
  const { register, handleSubmit, reset } = useForm();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch all uploaded products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${ENV_File.backendURL}/add/images`);
      console.log('response',response);
      
      setProducts(response.data);
      setError('');
    } catch (err) {
      console.error('Failed to fetch products:', err);
      setError('Failed to fetch products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('price', data.price);
    formData.append('description', data.description);

    for (let i = 0; i < data.images.length; i++) {
      formData.append('images', data.images[i]);
    }

    try {
      await axios.post(`${ENV_File.backendURL}/add/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      reset();
      fetchProducts();
      setError('');
    } catch (err) {
      console.error('Upload failed:', err);
      setError('Upload failed. Please check your network or try again.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Upload New Product</h2>

      {/* Upload Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 shadow-md rounded-lg mb-10 max-w-md mx-auto space-y-4"
      >
        <input
          {...register('name')}
          type="text"
          placeholder="Product Name"
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          {...register('price')}
          type="number"
          placeholder="Price"
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
        <textarea
          {...register('description')}
          placeholder="Description"
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          {...register('images')}
          type="file"
          multiple
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition duration-300"
        >
          Upload Product
        </button>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </form>

      {/* Products Section */}
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Uploaded Products</h3>

      {loading ? (
        <p className="text-center text-gray-500">Loading products...</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500">No products uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="border rounded-lg shadow p-4 bg-white transition-transform transform hover:scale-105"
            >
              <h4 className="text-lg font-bold mb-1 text-blue-800">{product.name}</h4>
              <p className="text-sm text-gray-600 mb-2">{product.description}</p>
              <p className="font-semibold text-green-600 mb-2">₹{product.price}</p>
              <div className="grid grid-cols-2 gap-2">
                {product.imageUrls.map((url, index) => (
                  
                  <img
                    key={index}
                    src={url}
                    alt={`Product ${index}`}
                    className="w-full h-50 object-cover rounded"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
