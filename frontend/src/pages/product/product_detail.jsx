import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ReviewSection, useAuth, AppwriteService, Button, ENV_File, Container, useCartWishlist } from '../../FilesPaths/all_path.js';
import axios from "axios";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { motion } from "framer-motion";
import { FaTag, FaCheckCircle, FaTimesCircle, FaTruck, FaStar } from "react-icons/fa";

const ProductDetail = () => {
    const { user } = useAuth();
    const { productId } = useParams();
    const { fetchCounts } = useCartWishlist();

    const [userid, setuserid] = useState(null);
    const [product, setProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [pricingMode, setPricingMode] = useState("retail");

    // Review state
    const [reviews, setReviews] = useState([]);
    const [reviewText, setReviewText] = useState("");
    const [reviewRating, setReviewRating] = useState(0);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (user) {
            setuserid(user._id);
        }
    }, [user]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`${ENV_File.backendURL}/admin/${productId}`);
                setProduct(res.data);

                // Ensure quantity meets wholesale minimum if wholesale mode is selected
                if (pricingMode === "wholesale" && res.data.wholeSaleQuantity) {
                    setQuantity(res.data.wholeSaleQuantity);
                }
            } catch (err) {
                console.warn(err);
            }
        };
        fetchProduct();
    }, [productId]);

    // Fetch reviews for this product
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await axios.get(`${ENV_File.backendURL}/review/${productId}`);
                setReviews(res.data || []);
            } catch (err) {
                setReviews([]);
            }
        };
        fetchReviews();
    }, [productId]);

    const handleSizeSelect = (size) => {
        setSelectedSize(size);
    };

    const increaseQuantity = () => {
        setQuantity((prev) => {
            if (pricingMode === "wholesale") {
                return Math.max(prev + 1, product?.wholeSaleQuantity || 1);
            }
            return prev + 1;
        });
    };

    const decreaseQuantity = () => {
        setQuantity((prev) => {
            if (pricingMode === "wholesale") {
                return Math.max(product?.wholeSaleQuantity || 1, prev - 1);
            }
            return prev > 1 ? prev - 1 : 1;
        });
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

    const addToCart = async () => {
        if (!userid) {
            alert("User ID is not available. Please log in.");
            return;
        }

        if (!selectedSize) {
            alert("Please select a size.");
            return;
        }

        const cartData = {
            userId: userid,
            productId: productId,
            header: product.header,
            description: product.description,
            images: product.images,
            buyingMehtod: pricingMode === "retail" ? 'Retail' : 'Wholesale',
            size: selectedSize,
            price: pricingMode === "retail" ? product.price : product.WholeSalePrice,
            quantity: pricingMode === "retail" ? quantity : product.wholeSaleQuantity,
            addressId: null,
        };

        try {
            const res = await axios.post(`${ENV_File.backendURL}/order/add`, cartData);
            fetchCounts();
            alert(`${product.header} (${pricingMode}) - Qty: ${quantity} Size: ${selectedSize} added to cart`);
            console.log(res.data);
        } catch (err) {
            console.warn('Error adding to cart:', err);
        }
    };

    const addTowishlist = async () => {
        if (!userid) {
            alert("User ID is not available. Please log in.");
            return;
        }

        if (!selectedSize) {
            alert("Please select a size.");
            return;
        }

        const wihslistdata = {
            userId: userid,
            productId: productId,
            header: product.header,
            description: product.description,
            images: product.images,
            buyingMehtod: pricingMode === "retail" ? 'Retail' : 'Wholesale',
            size: selectedSize,
            price: pricingMode === "retail" ? product.price : product.WholeSalePrice,
            quantity: pricingMode === "retail" ? quantity : product.wholeSaleQuantity,
        };

        try {
            const res = await axios.post(`${ENV_File.backendURL}/wishlist/add`, wihslistdata);
            fetchCounts();
            alert(`${product.header} (${pricingMode}) - Qty: ${quantity} Size: ${selectedSize} added to cart`);
            console.log(res.data);
        } catch (err) {
            console.warn('Error adding to cart:', err);
        }
    };

    // Submit review
    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            alert("Please log in to submit a review.");
            return;
        }
        if (!reviewText.trim() || reviewRating === 0) {
            alert("Please provide a rating and review text.");
            return;
        }
        setSubmitting(true);
        try {
            await axios.post(`${ENV_File.backendURL}/review/add`, {
                userId: user._id,
                productId,
                rating: reviewRating,
                text: reviewText,
                name: user.name || "User"
            });
            setReviewText("");
            setReviewRating(0);
            // Refresh reviews
            const res = await axios.get(`${ENV_File.backendURL}/review/${productId}`);
            setReviews(res.data || []);
        } catch (err) {
            alert("Failed to submit review.");
        }
        setSubmitting(false);
    };

    if (!product) return <div className="text-center mt-10">Loading...</div>;
    return (
        <Container>
            <div className="max-w-6xl z-0 h-[94.2vh] overflow-scroll pb-10 mx-auto p-4 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-10  bg-gradient-to-br from-amber-50 via-white to-rose-50 rounded-lg shadow-xl">
                {/* Swiper */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="w-full h-[64vh] md:h-[500px] flex items-center"
                >
                    <Swiper
                        modules={[Navigation, Pagination]}
                        spaceBetween={10}
                        slidesPerView={1}
                        navigation
                        pagination={{ clickable: true }}
                        className="rounded-xl h-full shadow-lg"
                    >
                        {product.images?.map((img, i) => (
                            <SwiperSlide key={i}>
                                <img
                                    src={AppwriteService.getFileViewUrl(img)}
                                    alt={`product-img-${i}`}
                                    className="w-full h-[] md:h-[500px] object-contain rounded-xl"
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
                    className="space-y-5"
                >
                    <div>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-rose-700 mb-1">{product.header}</h2>
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
                        <div className="flex items-center justify-center space-x-4  bg-rose-100/20">
                            <button
                                className="w-1/4 py-2 bg-rose-200/50 border border-rose-300 rounded  text-center font-extrabold text-2xl"
                                onClick={decreaseQuantity}
                            >
                                -
                            </button>
                            <span className="text-xl  font-semibold  w-3/5 text-center">{quantity}</span>
                            <button
                                className="w-1/4 py-2 bg-rose-200/50 border border-rose-300 rounded  text-center font-bold text-lg"
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
                                        className={`px-3 py-1 border rounded-full text-sm cursor-pointer transition-all duration-200
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
                    {/* Add to Cart */}
                    <div className="pt-4 flex gap-1">
                        <motion.div
                            whileTap={{ scale: 0.97 }}
                            whileHover={{ scale: 1.03 }}
                            className="w-1/2 flex gap-1"
                        >
                            <Button onClick={addTowishlist} className="w-full py-3 text-lg bg-blue-500/90 border-2 border-blue-700 hover:bg-rose-700 text-white rounded-lg shadow-lg transition-all duration-200">
                                Wishlist
                            </Button>
                        </motion.div>
                        <motion.div
                            whileTap={{ scale: 0.97 }}
                            whileHover={{ scale: 1.03 }}
                            className=" flex gap-1 w-1/2"
                        >
                            <Button onClick={addToCart} className="w-full py-3 text-lg bg-rose-500 border-2 border-red-800 hover:bg-rose-700 text-white rounded-lg shadow-lg transition-all duration-200">
                                Add to Cart
                            </Button>
                        </motion.div>
                    </div>

                    {/* Review Section */}
                    <ReviewSection productId={productId} userId={userid} />



                </motion.div>
            </div>
        </Container>
    );
}
export default ProductDetail;