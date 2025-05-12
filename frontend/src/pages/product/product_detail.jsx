import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth,AppwriteService, Button, ENV_File, Container } from '../../FilesPaths/all_path.js';
import axios from "axios";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// ...imports (unchanged)

const ProductDetail = () => {
    const { user } = useAuth();
    console.log(user);
    
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [pricingMode, setPricingMode] = useState("retail");
    

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`${ENV_File.backendURL}/admin/${productId}`);
                console.log(res.data);
                
                setProduct(res.data);
                // If wholesale mode is default or set later, ensure quantity meets the minimum
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
        if (!selectedSize) {
            alert("Please select a size.");
            return;
        }

        const cartData = {
            userId:user._id,
            productId: product._id,
            header:product.header,
            description:product.description,
            images:product.images,
            buyingMehtod:pricingMode === "retail" ? 'Retail' : 'Wholesale',
            size:selectedSize,
            price:pricingMode === "retail" ? product.price : product.WholeSalePrice,
            quantity:pricingMode === "retail" ? quantity:product.wholeSaleQuantity,
            
            
        };
        console.log(cartData);
        

        try {
            const res= await axios.post(`${ENV_File.backendURL}/order/add`, cartData);
            alert(`${product.header} (${pricingMode}) - Qty: ${quantity} Size: ${selectedSize} added to cart`);
            console.log(res.data);
        } catch (err) {
            console.warn('Error adding to cart:', err);
        }
    };

    if (!product) return <div className="text-center mt-10">Loading...</div>;

    return (
       <Container>
         <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-10 pb-20">
            {/* Swiper (unchanged) */}
            <div className="w-full h-[500px]">
                <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={10}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    className="rounded-xl h-full"
                >
                    {product.images?.map((img, i) => (
                        <SwiperSlide key={i}>
                            <img
                                src={AppwriteService.getFileViewUrl(img)}
                                alt={`product-img-${i}`}
                                className="w-full h-[500px] object-cover rounded-xl"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
                <div>
                    <h2 className="text-3xl font-bold">{product.header}</h2>
                    <p className="text-sm text-gray-500 mt-1">Brand: <span className="font-medium">{product.brand}</span></p>
                    <p className="text-sm text-gray-500">Category: <span className="font-medium">{product.category}</span></p>
                </div>

                <p className="text-gray-600">{product.description}</p>

                {/* Retail / Wholesale Toggle */}
                <div className="grid grid-cols-2 gap-2">
                    <button
                        className={`py-2 rounded-md border ${pricingMode === 'retail' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'}`}
                        onClick={() => handlePricingMode('retail')}
                    >
                        Retail
                    </button>
                    <button
                        className={`py-2 rounded-md border ${pricingMode === 'wholesale' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'}`}
                        onClick={() => handlePricingMode('wholesale')}
                    >
                        Wholesale
                    </button>
                </div>

                {/* Pricing */}
                <div className="flex items-center gap-2">
                    {pricingMode === "retail" ? (
                        <>
                            <p className="text-xl font-bold text-green-600">₹{product.price}</p>
                            <p className="text-xl font-semibold line-through text-gray-400">₹{product.fakePrie}</p>
                            <p className="text-lg text-red-500 font-semibold">{product.discount}% OFF</p>
                        </>
                    ) : (
                        <>
                            <p className="text-xl font-bold text-green-600">₹{product.WholeSalePrice}</p>
                            <p className="text-sm text-gray-500">Min Qty: {product.wholeSaleQuantity}</p>
                        </>
                    )}
                </div>

                {/* Quantity Selector */}
                <div>
                    <p className="text-sm text-gray-500 mb-1">Quantity</p>
                    <div className="flex items-center justify-center space-x-4 py-1 bg-gray-100">
                        <button
                            className="w-1/4 py-2 bg-gray-800/40 rounded text-lg text-center"
                            onClick={decreaseQuantity}
                        >
                            -
                        </button>
                        <span className="text-xl font-semibold w-3/5 text-center">{quantity}</span>
                        <button
                            className="w-1/4 py-2 bg-gray-800/40 rounded text-lg text-center"
                            onClick={increaseQuantity}
                        >
                            +
                        </button>
                    </div>
                </div>

                {/* Size Selection */}
                <div>
                    <p className="text-sm text-gray-500">Available Sizes</p>
                    <div className="flex gap-2 flex-wrap">
                        {["XS", "S", "M", "L", "XL", "XXL", "CUSTOM-SIZE"].map((size) => {
                            const isAvailable = product.size?.includes(size);
                            return (
                                <span
                                    key={size}
                                    className={`px-3 py-1 border rounded-full text-sm cursor-pointer 
                                    ${selectedSize === size ? 'bg-blue-500 text-white' : isAvailable ? 'bg-gray-100' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                                    onClick={() => {
                                        if (isAvailable) {
                                            handleSizeSelect(size);
                                        }
                                    }}
                                >
                                    {size}
                                </span>
                            );
                        })}
                    </div>
                </div>

                {/* Tags */}
                <div>
                    <p className="text-sm text-gray-500">Tags</p>
                    <div className="flex gap-2 flex-wrap">
                        {product.tags?.map((tag) => (
                            <span key={tag} className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Stock */}
                <div>
                    <p className="text-sm text-gray-500">In Stock</p>
                    <p className={`text-lg font-semibold ${product.inStockStatus ? 'text-green-600' : 'text-red-500'}`}>
                        {product.inStockStatus ? 'Available' : 'Out of Stock'}
                    </p>
                </div>

                {/* Delivery */}
                <div>
                    <p className="text-sm text-gray-500">Delivery By</p>
                    <p className="text-base font-medium">{new Date(product.dateToDeliver).toDateString()}</p>
                </div>

                {/* Add to Cart */}
                <div className="pt-4">
                    <Button onClick={addToCart} className="w-full py-3 text-lg">
                        Add to Cart
                    </Button>
                </div>
            </div>
        </div>
       </Container>
    );
};

export default ProductDetail;
