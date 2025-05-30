import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  ReviewSection,
  useAuth,
  AppwriteService,
  Button,
  ENV_File,
  Container,
  useCartWishlist
} from "../../FilesPaths/all_path.js";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTag,
  FaCheckCircle,
  FaTimesCircle,
  FaTruck,
} from "react-icons/fa";

// ✅ Success Message Component
const SuccessMessage = ({ message, onClose }) => (
  <AnimatePresence>
    {message && (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className="fixed top-1/7 left-1/2 transform -translate-x-1/2 z-[9999] bg-green-100 border border-green-400 text-green-800 px-6 py-3 rounded-md shadow-md text-center"
      >
        {message}
      </motion.div>
    )}
  </AnimatePresence>
);

const ProductDetail = () => {
  const { user } = useAuth();
  const { productId } = useParams();
  const { fetchCounts } = useCartWishlist() || {};

  const [userid, setuserid] = useState(null);
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [pricingMode, setPricingMode] = useState("retail");

  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (user) setuserid(user._id);
  }, [user]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${ENV_File.backendURL}/admin/${productId}`);
        setProduct(res.data);
        if (pricingMode === "wholesale" && res.data.wholeSaleQuantity) {
          setQuantity(res.data.wholeSaleQuantity);
        }
      } catch (err) {
        console.warn(err);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const increaseQuantity = () => {
    setQuantity((prev) =>
      pricingMode === "wholesale"
        ? Math.max(prev + 1, product?.wholeSaleQuantity || 1)
        : prev + 1
    );
  };

  const decreaseQuantity = () => {
    setQuantity((prev) =>
      pricingMode === "wholesale"
        ? Math.max(product?.wholeSaleQuantity || 1, prev - 1)
        : prev > 1 ? prev - 1 : 1
    );
  };

  const handlePricingMode = (mode) => {
    setPricingMode(mode);
    if (mode === "wholesale" && quantity < product?.wholeSaleQuantity) {
      setQuantity(product.wholeSaleQuantity || 10);
    }
    if (mode === "retail") {
      setQuantity(1);
    }
  };

  const showSuccess = (msg) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const addToCart = async () => {
    if (!userid) return alert("Please log in.");
    if (!selectedSize) return alert("Please select a size.");

    const cartData = {
      userId: userid,
      productId,
      header: product.header,
      description: product.description,
      images: product.images,
      buyingMehtod: pricingMode === "retail" ? "Retail" : "Wholesale",
      size: selectedSize,
      price: pricingMode === "retail" ? product.price : product.WholeSalePrice,
      quantity:
        pricingMode === "retail" ? quantity : product.wholeSaleQuantity,
      addressId: null,
    };

    if (pricingMode === "wholesale") {
      const phone = "918657196476";
      const msg = encodeURIComponent(
        `Wholesale Order Request:\n\nProduct: ${product.header}\nQuantity: ${product.wholeSaleQuantity}\nPrice: ₹${product.WholeSalePrice}\nUser: ${user?.username || "User"}\nPhone: ${user?.mobileNumber || ""}\nEmail:${user?.email || ""}\n\nPlease confirm the order.`
      );
      window.open(`https://wa.me/${phone}?text=${msg}`, "_blank");
      return;
    }

    try {
      await axios.post(`${ENV_File.backendURL}/order/add`, cartData);
      fetchCounts && fetchCounts();
      showSuccess("Item added to cart successfully.");
    } catch (err) {
      console.warn("Error adding to cart:", err);
    }
  };

  const addTowishlist = async () => {
    if (!userid) return alert("Please log in.");
    if (!selectedSize) return alert("Please select a size.");

    const wishlistData = {
      userId: userid,
      productId,
      header: product.header,
      description: product.description,
      images: product.images,
      buyingMehtod: pricingMode === "retail" ? "Retail" : "Wholesale",
      size: selectedSize,
      price: pricingMode === "retail" ? product.price : product.WholeSalePrice,
      quantity:
        pricingMode === "retail" ? quantity : product.wholeSaleQuantity,
    };

    if (pricingMode === "wholesale") {
      const phone = "918657196476";
      const msg = encodeURIComponent(
        `Wholesale Order Request:\n\nProduct: ${product.header}\nQuantity: ${product.wholeSaleQuantity}\nPrice: ₹${product.WholeSalePrice}\nUser: ${user?.username || "User"}\nPhone: ${user?.mobileNumber || ""}\nEmail:${user?.email || ""}\n\nPlease confirm the order.`
      );
      window.open(`https://wa.me/${phone}?text=${msg}`, "_blank");
      return;
    }

    try {
      await axios.post(`${ENV_File.backendURL}/wishlist/add`, wishlistData);
      fetchCounts && fetchCounts();
      showSuccess("Item added to wishlist successfully.");
    } catch (err) {
      console.warn("Error adding to wishlist:", err);
    }
  };

  if (!product) return <div className="text-center">Loading...</div>;

  return (
    <>
      <SuccessMessage message={successMessage} />
      <Container>
        {/* Your product detail JSX code continues here... */}
        {/* Leave it unchanged or paste your existing layout (swiper, product info, buttons) */}
        {/* Just make sure buttons call addToCart and addTowishlist */}
         <div className="mt-0.5 overflow-scroll pb-30 max-w-6xl z-0 h-full overflow-y-auto  mx-auto p-3 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-10 bg-gradient-to-br from-amber-50 via-white to-rose-50 rounded-xl shadow-2xl border border-rose-100">
                {/* Swiper */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="w-full h-[64vh] md:h-[500px] lg:h-[75vh] lg:w-[80%] flex items-center"
                >
                    <Swiper
                        modules={[Navigation, Pagination]}
                        spaceBetween={10}
                        slidesPerView={1}
                        navigation
                        pagination={{ clickable: true }}
                        className="rounded-2xl h-full shadow-xl border border-rose-100 bg-white"
                    >
                        {product.images?.map((img, i) => (
                            <SwiperSlide key={i}>
                                <img
                                    src={img}
                                    alt={`product-img-${i}`}
                                    className="w-full h-full lg:h-full lg:w-full md:h-[500px] lg:object-cover object-cover rounded-2xl"
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </motion.div>

                {/* Product Details */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="space-y-7"
                >
                    <div>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-rose-700 mb-1 drop-shadow">{product.header}</h2>
                        <div className="flex flex-wrap gap-3 text-sm text-gray-500 mb-2">
                            <span>Category: <span className="font-medium text-gray-700">{product.category}</span></span>
                        </div>
                    </div>

                    <p className="text-gray-700 text-base md:text-lg">{product.description}</p>

                    {/* Retail / Wholesale Toggle */}
                    <div className="grid grid-cols-2 gap-2">
                        <button
                            className={`py-2 rounded-md border font-semibold transition-all duration-200
                            ${pricingMode === 'retail'
                                    ? 'bg-rose-600 text-white border-rose-600 shadow'
                                    : 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-rose-50'
                                }`}
                            onClick={() => handlePricingMode('retail')}
                        >
                            Retail
                        </button>
                        <button
                            className={`py-2 rounded-md border font-semibold transition-all duration-200
                            ${pricingMode === 'wholesale'
                                    ? 'bg-rose-600 text-white border-rose-600 shadow'
                                    : 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-rose-50'
                                }`}
                            onClick={() => handlePricingMode('wholesale')}
                        >
                            Wholesale
                        </button>
                    </div>

                    {/* Pricing */}
                    <div className="flex items-center gap-3">
                        {pricingMode === "retail" ? (
                            <>
                                <p className="text-2xl font-bold text-green-600">₹{product.price}</p>
                                {product.fakePrie && (
                                    <p className="text-lg font-semibold line-through text-gray-400">₹{product.fakePrie}</p>
                                )}
                                {product.discount && (
                                    <p className="text-base text-red-500 font-semibold">{product.discount}% OFF</p>
                                )}
                            </>
                        ) : (
                            <>
                                <p className="text-2xl font-bold text-green-600">₹{product.WholeSalePrice}</p>
                                <p className="text-sm text-gray-500">Min Qty: {product.wholeSaleQuantity}</p>
                            </>
                        )}
                    </div>
                    {/* Quantity Selector */}
                    <div>
                        <p className="text-sm text-gray-500 mb-1">Quantity</p>
                        <div className="flex items-center justify-between space-x-4 bg-rose-100/30 rounded-lg py-2">
                            <button
                                className="w-10 h-10 bg-rose-200/60 border border-rose-300 rounded-full text-center font-extrabold text-2xl hover:bg-rose-300 transition"
                                onClick={decreaseQuantity}
                            >
                                -
                            </button>
                            <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                            <button
                                className="w-10 h-10 bg-rose-200/60 border border-rose-300 rounded-full text-center font-bold text-lg hover:bg-rose-300 transition"
                                onClick={increaseQuantity}
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {/* Size Selection */}
                    <div>
                        <p className="text-sm text-gray-500 mb-1">Available Sizes</p>
                        <div className="flex gap-2 flex-wrap">
                            {["XS", "S", "M", "L", "XL", "XXL", "CUSTOM-SIZE"].map((size) => {
                                const isAvailable = product.size?.includes(size);
                                return (
                                    <motion.span
                                        whileTap={isAvailable ? { scale: 0.92 } : {}}
                                        key={size}
                                        className={`px-4 py-1 border rounded-full text-sm cursor-pointer transition-all duration-200
                                        ${selectedSize === size
                                                ? 'bg-rose-600 text-white border-rose-600 shadow'
                                                : isAvailable
                                                    ? 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-rose-50'
                                                    : 'bg-gray-300 text-gray-400 border-gray-300 cursor-not-allowed'
                                            }`}
                                        onClick={() => {
                                            if (isAvailable) {
                                                handleSizeSelect(size);
                                            }
                                        }}
                                    >
                                        {size}
                                    </motion.span>
                                );
                            })}
                        </div>
                    </div>

                    {/* Tags */}
                    {product.tags?.length > 0 && (
                        <div>
                            <p className="text-sm text-gray-500 mb-1 flex items-center gap-1"><FaTag className="inline" /> Tags</p>
                            <div className="flex gap-2 flex-wrap">
                                {product.tags.map((tag) => (
                                    <span key={tag} className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Stock */}
                    <div className="flex items-center gap-2">
                        <p className="text-sm text-gray-500">In Stock</p>
                        {product.inStockStatus ? (
                            <span className="flex items-center gap-1 text-green-600 font-semibold text-base">
                                <FaCheckCircle /> Available
                            </span>
                        ) : (
                            <span className="flex items-center gap-1 text-red-500 font-semibold text-base">
                                <FaTimesCircle /> Out of Stock
                            </span>
                        )}
                    </div>

                    {/* Delivery */}
                    <div className="flex items-center gap-2">
                        <FaTruck className="text-rose-500" />
                        <p className="text-sm text-gray-500">Delivery By</p>
                        <p className="text-base font-medium">
                            {
                                new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toDateString()
                            }
                        </p>
                    </div>
                    {/* Add to Cart / Wishlist */}
                    <div className="pt-4 flex gap-3">
                        <motion.div
                            whileTap={{ scale: 0.97 }}
                            whileHover={{ scale: 1.03 }}
                            className="w-1/2 flex gap-1"
                        >
                            <Button onClick={addTowishlist} className="w-full py-3 text-lg bg-blue-500/90 border-2 border-blue-700 hover:bg-blue-700 text-white rounded-lg shadow-lg transition-all duration-200">
                                Wishlist
                            </Button>
                        </motion.div>
                        <motion.div
                            whileTap={{ scale: 0.97 }}
                            whileHover={{ scale: 1.03 }}
                            className="flex gap-1 w-1/2"
                        >
                            <Button onClick={addToCart} className="w-full py-3 text-lg bg-rose-500 border-2 border-rose-700 hover:bg-rose-700 text-white rounded-lg shadow-lg transition-all duration-200">
                                Add to Cart
                            </Button>
                        </motion.div>
                    </div>

                    {/* Review Section */}
                    <ReviewSection productId={productId} userId={userid} />
                </motion.div>
            </div>
      </Container>
    </>
  );
};

export default ProductDetail;
