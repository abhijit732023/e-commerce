import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import axios from 'axios';
import { ENV_File } from '../../FilesPaths/all_path';

export default function ProductForm({ productId }) {
  const { register, handleSubmit, reset, setValue, control, getValues } = useForm();
  const { fields, append, remove } = useFieldArray({ control, name: "sizes" });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const sizesAvailable = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  // Fetch all uploaded products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${ENV_File.backendURL}/add/images`);
      setProducts(response.data);
    } catch (err) {
      setError('Failed to fetch products.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch product by ID when editing
  useEffect(() => {
    if (productId) {
      const fetchProductById = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`${ENV_File.backendURL}/add/images/${productId}`);
          const product = response.data;

          // Set default values for form fields
          reset({
            name: product.name,
            brand: product.brand,
            price: product.price,
            offerPrice: product.offerPrice,
            stockStatus: product.stockStatus === 'In Stock', // checkbox default value
            description: product.description,
          });

          // Set sizes as an array of selected sizes
          sizesAvailable.forEach((size) => {
            if (product.sizes.includes(size)) {
              append({ size: size });
            }
          });
        } catch (err) {
          setError('Error fetching product data.');
        } finally {
          setLoading(false);
        }
      };
      fetchProductById();
    }
  }, [productId, reset, append]);

  const onSubmit = async (data) => {
    const selectedSizes = sizesAvailable.filter((size) => getValues(`size_${size}`));

    // Get stock status (In Stock or Out of Stock)
    const stockStatus = getValues('stockStatus') ? 'In Stock' : 'Out of Stock';

    // Prepare form data
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('brand', data.brand);
    formData.append('price', data.price);
    formData.append('offerPrice', data.offerPrice);
    formData.append('stockStatus', stockStatus); // Added stock status
    formData.append('description', data.description);
    formData.append('sizes', JSON.stringify(selectedSizes));

    // Append image files to FormData
    for (let i = 0; i < data.images.length; i++) {
      formData.append('images', data.images[i]);
    }

    try {
      const response = await axios.put(`${ENV_File.backendURL}/add/upload/${productId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // Reset form and fetch updated products
      reset();
      fetchProducts();
      setSuccessMessage(response.data.message || 'Product updated successfully!');
      setError('');
    } catch (err) {
      setError('Update failed. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="max-w-6xl mx-auto  p-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">{productId ? 'Edit Product' : 'Add New Product'}</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 shadow-lg rounded-lg max-w-2xl mx-auto space-y-4 "
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
          <input
            {...register('name', { required: true })}
            type="text"
            placeholder="Product Name"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
          <input
            {...register('brand', { required: true })}
            type="text"
            placeholder="Brand"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
          <input
            {...register('price', { required: true })}
            type="number"
            placeholder="Price"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Offer Price</label>
          <input
            {...register('offerPrice')}
            type="number"
            placeholder="Offer Price"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">In Stock</label>
          <input
            {...register('stockStatus')}
            type="checkbox"
            className="form-checkbox"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            {...register('description', { required: true })}
            placeholder="Product Description"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Sizes</label>
          <div className="flex flex-wrap gap-3">
            {sizesAvailable.map((size) => (
              <label key={size} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  {...register(`size_${size}`)}
                  className="form-checkbox"
                />
                <span className="text-sm text-gray-700">{size}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Images</label>
          <input
            {...register('images')}
            type="file"
            multiple
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition duration-300"
        >
          {productId ? 'Update Product' : 'Upload Product'}
        </button>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        {successMessage && <p className="text-green-500 text-sm mt-2">{successMessage}</p>}
      </form>

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
              <p className="mt-2 font-semibold text-gray-700">{product.stockStatus}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
