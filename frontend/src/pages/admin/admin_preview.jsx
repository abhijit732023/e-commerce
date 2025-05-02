import React, { useEffect, useState } from "react";
import axios from "axios";
import { ENV_File, AppwriteService } from "../../FilesPaths/all_path";
import { Link } from "react-router-dom";

const AdminProductDetail = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${ENV_File.backendURL}/admin/product/detail`);
      console.log('details',response.data);
      
      setProducts(response.data);
    } catch (err) {
      console.error("Error fetching product details:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (productId, imageIds) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product? This action cannot be undone.");

    if (!confirmDelete) return;

    try {
      imageIds.forEach((id) => AppwriteService.deleteFile(id));
      await axios.delete(`${ENV_File.backendURL}/admin/delete/${productId}`);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product or images:", error);
      alert("Failed to delete product or images.");
    }
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-red-500 p-4">Error loading products.</div>;

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product._id} className="border rounded-lg shadow-md p-4 bg-white flex flex-col justify-between space-y-2 hover:shadow-lg transition-all duration-200">
          <Link to={`/product/${product._id}`}>
            <h2 className="text-lg font-semibold text-blue-600 hover:underline mb-1">{product.header}</h2>

            <div className="flex gap-2 overflow-x-auto">
              {product.images.map((imageId) => (
                <img
                  key={imageId}
                  src={AppwriteService.getFileViewUrl(imageId)}
                  className="w-24 h-28 object-cover rounded border"
                />
              ))}
            </div>

            <div className="text-sm text-gray-700 space-y-1 mt-2">
              <p><strong>Brand:</strong> {product.brand}</p>
              <p><strong>Category:</strong> {product.category}</p>
              <p><strong>Color:</strong> {product.color}</p>
              <p><strong>Description:</strong> {product.description}</p>
              <p><strong>Price:</strong> ₹{product.discountedPrice} <span className="line-through text-gray-500">₹{product.originalPrice}</span></p>
              <p><strong>Discount:</strong> {product.discountPercent}%</p>
              <p><strong>Rating:</strong> {product.rating}</p>
              <p><strong>Tags:</strong> {product.tags.join(", ")}</p>
              <p><strong>Sizes Available:</strong> {product.availableSizes.join(", ")}</p>
              <p><strong>Quantity:</strong> {product.quantity}</p>
              <p><strong>In Stock:</strong> {product.inStock ? "Yes" : "No"}</p>
              <p><strong>Deliver By:</strong> {new Date(product.dateToDeliver).toLocaleDateString('en-GB')}</p>
            </div>
          </Link>

          <div className="flex justify-between mt-3">
            <button
              onClick={() => handleDelete(product._id, product.images)}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 text-sm"
            >
              Delete
            </button>

            <Link
              to={`/admin/edit/${product._id}`}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 text-sm"
            >
              Edit
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminProductDetail;
