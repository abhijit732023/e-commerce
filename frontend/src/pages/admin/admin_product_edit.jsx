import React, { useEffect, useState } from "react";
import axios from "axios";
import { AppwriteService, ENV_File } from "../../FilesPaths/all_path";
import { useNavigate } from "react-router-dom";

const AdminProductEditList = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState({});
  const [imageFiles, setImageFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${ENV_File.backendURL}/admin/product/detail`);
        setProducts(res.data.reverse());
      } catch (err) {
        setMessage("Failed to load products.");
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  // When editing, set form data
  useEffect(() => {
    if (editingProduct) {
      setForm(editingProduct);
      setImageFiles([]); // reset image files
      setMessage("");
    }
  }, [editingProduct]);

  const handleEditClick = (product) => {
    setEditingProduct(product);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setForm((prev) => ({
        ...prev,
        [name]: checked
          ? [...(prev[name] || []), value]
          : (prev[name] || []).filter((v) => v !== value),
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e) => {
    setImageFiles(e.target.files);
  };

  // Simulate upload and return file names (replace with your upload logic)
  const uploadImages = async (files) => {
    // Example: just return file names, replace with actual upload logic
    // You may want to POST to your backend and get back image IDs/URLs
    return Array.from(files).map((file) => file.name);
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setSaving(true);
  setMessage("");
  try {
    // Prepare updated form data
    const updatedForm = { ...form };
    console.log('from',updatedForm);
    

    // If new images are selected, upload and merge with existing images
    if (imageFiles.length > 0) {
      const uploadedImages = await uploadImages(imageFiles);
      // Merge new images with existing ones (keep old images)
      updatedForm.images = [
        ...(Array.isArray(form.images) ? form.images : []),
        ...uploadedImages,
      ];
    } else {
      // No new images selected, keep existing images as is
      updatedForm.images = Array.isArray(form.images) ? form.images : [];
    }
    console.log(updatedForm);
    

    // Update product in backend
    const res = await axios.put(`${ENV_File.backendURL}/admin/update/${form._id}`, updatedForm);
    console.log('hey upadte',res.data);

    setMessage("Product updated successfully!");

    // Update product in local state
    setProducts((prev) =>
      prev.map((p) => (p._id === form._id ? { ...p, ...updatedForm } : p))
    );

    // Reset editing state after a short delay
    setTimeout(() => {
      setEditingProduct(null);
      setMessage("");
      setImageFiles([]);
    }, 1200);
  } catch (err) {
    setMessage("Failed to update product.");
  }
  setSaving(false);
};

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg text-rose-600">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-rose-50 flex flex-col items-center py-6 overflow-auto max-h-screen">
      <h2 className="text-2xl font-extrabold text-rose-600 mb-4 text-center drop-shadow-md">Edit Products</h2>
      {message && (
        <div className={`mb-6 text-center font-semibold ${message.includes("success") ? "text-green-700" : "text-rose-700"}`}>
          {message}
        </div>
      )}

      {!editingProduct ? (
        <div className="w-full max-w-5xl overflow-auto px-4 ">
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-6 pb-15">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white border border-rose-100 rounded-2xl shadow-md p-2 flex flex-col gap-3 hover:shadow-xl transition cursor-pointer"
                onClick={() => handleEditClick(product)}
              >
                {/* Display first product image if available */}
                <div>
                  {product.images && product.images.length > 0 && (
                    <img
                      src={AppwriteService.getFileViewUrl(product.images[0])}
                      alt={product.header}
                      className="w-full h-44 object-cover rounded-xl mb-3 border border-rose-200"
                    />
                  )}
                </div>
                <div>
                  <div className="font-extrabold text-xl text-rose-700">{product.header}</div>
                  <div className="text-gray-600 text-sm truncate">{product.description}</div>
                  <div className="flex gap-3 text-sm mt-2">
                    <span className="text-amber-700 font-semibold">₹{product.price}</span>
                    <span className="text-gray-400 line-through">₹{product.fakePrie}</span>
                    <span className="text-rose-500">{product.category}</span>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">ID: {product._id}</div>
                  <button
                    className="mt-3 px-5 py-2 bg-rose-500 text-white rounded-2xl font-semibold hover:bg-rose-600 transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditClick(product);
                    }}
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full max-w-3xl overflow-auto bg-white rounded-3xl shadow-2xl p-10 border border-rose-300 pb-25">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-extrabold mb-2 text-rose-600">Title</label>
              <input
                name="header"
                value={form.header || ""}
                onChange={handleChange}
                className="w-full border border-rose-300 rounded-xl p-3 bg-rose-50 focus:outline-none focus:ring-2 focus:ring-rose-400"
                required
              />
            </div>
            <div>
              <label className="block font-extrabold mb-2 text-rose-600">Description</label>
              <textarea
                name="description"
                value={form.description || ""}
                onChange={handleChange}
                className="w-full border border-rose-300 rounded-xl p-3 bg-rose-50 focus:outline-none focus:ring-2 focus:ring-rose-400"
                rows={4}
                required
              />
            </div>
            <div className="flex gap-6">
              <div className="flex-1">
                <label className="block font-extrabold mb-2 text-rose-600">Price</label>
                <input
                  name="price"
                  type="number"
                  value={form.price || ""}
                  onChange={handleChange}
                  className="w-full border border-amber-300 rounded-xl p-3 bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block font-extrabold mb-2 text-rose-600">Fake Price</label>
                <input
                  name="fakePrie"
                  type="number"
                  value={form.fakePrie || ""}
                  onChange={handleChange}
                  className="w-full border border-amber-300 rounded-xl p-3 bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  required
                />
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-1">
                <label className="block font-extrabold mb-2 text-amber-700">Wholesale Quantity</label>
                <input
                  name="wholeSaleQuantity"
                  type="number"
                  value={form.wholeSaleQuantity || ""}
                  onChange={handleChange}
                  className="w-full border border-amber-300 rounded-xl p-3 bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block font-extrabold mb-2 text-amber-700">Wholesale Price</label>
                <input
                  name="WholeSalePrice"
                  type="number"
                  value={form.WholeSalePrice || ""}
                  onChange={handleChange}
                  className="w-full border border-amber-300 rounded-xl p-3 bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  required
                />
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-1">
                <label className="block font-extrabold mb-2 text-rose-600">Category</label>
                <select
                  name="category"
                  value={form.category || ""}
                  onChange={handleChange}
                  className="w-full border border-rose-300 rounded-xl p-3 bg-rose-50 focus:outline-none focus:ring-2 focus:ring-rose-400"
                >
                  <option value="Regular">Regular</option>
                  <option value="Premium">Premium</option>
                  <option value="SSspecial">SSspecial</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block font-extrabold mb-2 text-rose-600">Stock Status</label>
                <select
                  name="inStockStatus"
                  value={form.inStockStatus || ""}
                  onChange={handleChange}
                  className="w-full border border-rose-300 rounded-xl p-3 bg-rose-50 focus:outline-none focus:ring-2 focus:ring-rose-400"
                >
                  <option value="In Stock">In Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block font-extrabold mb-2 text-amber-700">Delivery Date</label>
              <input
                name="dateToDeliver"
                type="date"
                value={form.dateToDeliver ? form.dateToDeliver.slice(0, 10) : ""}
                onChange={handleChange}
                className="w-full border border-amber-300 rounded-xl p-3 bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-400"
                required
              />
            </div>
            <div className="flex gap-6">
              <div className="flex-1">
                <label className="block font-extrabold mb-2 text-rose-600">Tags</label>
                <input
                  name="tags"
                  value={Array.isArray(form.tags) ? form.tags.join(", ") : form.tags || ""}
                  onChange={handleChange}
                  placeholder="e.g. summer, casual, trending"
                  className="w-full border border-rose-300 rounded-xl p-3 bg-rose-50 focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
              </div>
              <div className="flex-1">
                <label className="block font-extrabold mb-2 text-rose-600">Color</label>
                <input
                  name="color"
                  value={form.color || ""}
                  onChange={handleChange}
                  placeholder="Color"
                  className="w-full border border-rose-300 rounded-xl p-3 bg-rose-50 focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
              </div>
            </div>
            {/* Images Section */}
            <div>
              <label className="block font-extrabold mb-2 text-rose-600">Product Images</label>
              <input
                type="file"
                multiple
                onChange={handleImageChange}
                className="w-full border border-rose-300 rounded-xl p-3 bg-rose-50 focus:outline-none focus:ring-2 focus:ring-rose-400"
              />
              <div className="flex flex-wrap gap-3 mt-3">
                {/* Show existing images */}
                {form.images && Array.isArray(form.images) && form.images.map((img, idx) => (
                  <span
                    key={idx}
                    className="inline-block bg-amber-100 text-rose-700 px-4 py-1 rounded-full text-sm font-semibold"
                  >
                    {typeof img === "string" ? img : img?.name}
                  </span>
                ))}
                {/* Show new images to be uploaded */}
                {imageFiles &&
                  Array.from(imageFiles).map((file, idx) => (
                    <span
                      key={idx}
                      className="inline-block bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-semibold"
                    >
                      {file.name}
                    </span>
                  ))}
              </div>
            </div>
            <div className="flex gap-6">
              <button
                type="button"
                className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-400 transition"
                onClick={() => setEditingProduct(null)}
                disabled={saving}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`flex-1 bg-gradient-to-r from-rose-600 via-amber-500 to-rose-500 hover:from-rose-700 hover:to-amber-600 transition text-white py-3 rounded-xl font-bold text-lg shadow-lg ${saving ? "opacity-70 cursor-not-allowed" : ""}`}
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminProductEditList;