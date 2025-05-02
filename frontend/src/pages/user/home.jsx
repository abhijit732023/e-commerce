import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { FaBars, FaShoppingCart } from 'react-icons/fa';
import { Header,SliderSection, ENV_File, AppwriteService, SecondSection } from '../../FilesPaths/all_path';
import { motion } from 'framer-motion';
const Home = () => {
    const [products, setProducts] = useState([]);
    const [imagess, setImages] = useState([]);
    const [initialLoaded, setInitialLoaded] = useState(false);
    const scrollRef = useRef(null);
    // console.log(AppwriteService.getFileViewUrl('6811d24e003cc44b908a'));


    useEffect(() => {
        const scrollToCenter = () => {
            const container = scrollRef.current;
            if (container && container.children[2]) {
                const target = container.children[2];
                const scrollAmount = target.offsetLeft - (container.offsetWidth - target.offsetWidth) / 2;
                container.scrollTo({ left: scrollAmount, behavior: 'smooth' });
            }
        };

        scrollToCenter();
    }, []);



    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${ENV_File.backendURL}/admin/product/detail`);
                console.log(response.data);

                setProducts(response.data);


            } catch (error) {
                console.error("Failed to fetch products:", error);
            }
        };

        fetchProducts();
    }, []);



    const heroImages = products
        .filter((p) => p.images.length > 0)
        .map((p) => AppwriteService.getFileViewUrl(p.images[0]));

    const secondSectionImages = products
        .filter((p) => p.images.length > 0)
        .slice(3, 6)
        .map((p) => AppwriteService.getFileViewUrl(p.images[0]));

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const allImageIds = products.flatMap(product => product.images);
        if (allImageIds) {
            setImages(allImageIds)
            console.log(allImageIds);

        }


        if (heroImages.length < 2) return;
        const interval = setInterval(() => {
            setCurrentImageIndex(prev => (prev + 1) % heroImages.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [products]);
    const firstImage = heroImages[0];

    // console.log('imagess',imagess);



    return (
        <div className="w-full">
            {/* Menu Bar */}
             <Header/>

            {/* Hero Section */}
            {/* Hero Section */}
            {/* Hero Section */}
            <section className="relative w-full h-screen bg-black overflow-hidden">
                {/* Background Image Slider */}
                {heroImages.map((img, idx) => (
                    <img
                        key={idx}
                        src={img}
                        alt={`Slide ${idx}`}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${idx === currentImageIndex ? 'opacity-100 z-0' : 'opacity-0 z-0'
                            }`}
                        style={{
                            transitionDelay: idx === 0 ? '0s' : '0.3s',
                        }}
                    />
                ))}

                {/* Overlay Text */}
                <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center px-4 md:px-10 text-white bg-black/30">
                    <h1 className="text-3xl md:text-6xl font-bold animate-pulse">Welcome to SS Collection</h1>
                    <p className="mt-4 text-base md:text-xl opacity-90 animate-fade-in">
                        Discover powerful experiences crafted for you.
                    </p>
                </div>
            </section>





            {/* Second Section */}
            <SecondSection images={secondSectionImages} />


            {/* Why Choose Us */}
            {/* FEATURED COLLECTION */}
            <section className="bg-rose-50/50 py-12 px-4 md:px-16">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-rose-700">🌟 Featured Collection</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {heroImages.map((img, i) => (
                        <motion.div
                            key={i}
                            whileInView={{ opacity: 1, scale: 1 }}
                            initial={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.6 }}
                            className="bg-white shadow-lg rounded overflow-hidden hover:scale-105 transition-transform"
                        >
                            <img src={img} alt={`Product ${i}`} className="w-full herh-64 md:h-80 object-cover" />
                            <div className="p-6">
                                <h3 className="text-lg font-semibold">Lehenga {i + 1}</h3>
                                <p className="text-red-600 mt-2 text-lg">₹{(i + 1) * 16900}.00</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>


            {/* Explore Categories */}
            {/* <section className="bg-rose-300 py-12 px-4 text-center">
                <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">Explore Our Categories</h2>
                <p className="text-white text-sm md:text-base max-w-lg mx-auto">
                    Sarees, Kurtis, Western Wear, Accessories & More
                </p>
            </section> */}
            {/* <section
                className="bg-rose-100/20 border-t-2 border-rose-300/20 py-12 md:h-[50vh] px-4 md:px-16"
                style={{ aspectRatio: '2730 / 4096' }}
            >
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-rose-800">💎 SS Special</h2>

                <div
                    ref={scrollRef}
                    className="overflow-x-auto flex space-x-2 snap-x snap-mandatory overflow-y-hidden scroll-smooth h-full"
                >
                    {products.map((img, i) => (
                        <motion.div
                            key={i}
                            className="bg-white shadow min-w-[80%] md:min-w-[30%] rounded snap-center overflow-hidden h-full flex items-center"
                            initial={{ scale: 0.85 }}
                            whileInView={{ scale: 1.10 }}
                            viewport={{ once: false, amount: 0.7 }}
                            transition={{ type: "spring", stiffness: 100 }}
                        >
                            <img
                                src={AppwriteService.getFileViewUrl(img.images[0])}
                                alt={`SS Special ${i}`}
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                    ))}
                </div>
            </section> */}


<SliderSection products={products}/>
            {/* Footer */}
            <footer className="bg-black text-white py-10 px-4 text-center">
                <h4 className="text-xl font-semibold mb-2">SS Collection</h4>
                <p className="text-sm text-gray-300 max-w-xl mx-auto">
                    Innovative and artistic, SS Collection celebrates the rich crafts of India. We design for the modern Indian woman who blends international style with ethnic elegance.
                </p>
                <p className="text-xs text-gray-500 mt-6">© 2025 SS Collection. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Home;
