import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { Container, BottomMenuBar, SSSpecialCarousel, FeaturedCollection, Header, ENV_File, AppwriteService, SecondSection, useAuth } from '../../FilesPaths/all_path';
import { motion } from 'framer-motion';

const Home = () => {
    const{logout}=useAuth()
    const [products, setProducts] = useState([]);
    const [imagess, setImages] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const scrollRef = useRef(null);

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

    useEffect(() => {
        const allImageIds = products.flatMap(product => product.images);
        if (allImageIds) setImages(allImageIds);

        if (heroImages.length < 2) return;
        const interval = setInterval(() => {
            setCurrentImageIndex(prev => (prev + 1) % heroImages.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [products]);

    return (
        <Container>
            {/* Header */}
            <Header />

            {/* Hero Section */}
            <section className="rounded-md mt-0.5 relative w-full h-screen  backdrop-blur-2xl overflow-hidden">
                {heroImages.map((img, idx) => (
                    <img
                        key={idx}
                        src={img}
                        alt={`Slide ${idx}`}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${idx === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
                    />
                ))}
                <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center px-4 md:px-10 text-cream bg-black/30">
                    <h1 className="text-3xl md:text-6xl font-bold animate-pulse">Welcome to SS Collection</h1>
                    <p className="mt-4 text-base md:text-xl opacity-90 animate-fade-in">
                        Discover powerful experiences crafted for you.
                    </p>
                </div>
            </section>

            {/* Second Section */}
            <SecondSection images={secondSectionImages} />

            {/* Video Section */}
            <section className="w-full">
                <div>video</div>
              <video
                src="/videos/video.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto object-cover"
              >
                Sorry, your browser doesn't support embedded videos.
              </video>
            </section>

            {/* Featured Collection */}
            <FeaturedCollection products={products} />

            {/* SS Special Carousel */}
            <SSSpecialCarousel products={products} />

            {/* Footer */}
            <footer className="rounded-xl mt-6 bg-black text-white pb-30 py-10 px-4 text-center">
                <h4 className="text-xl font-semibold mb-2">SS Collection</h4>
                <p className="text-sm text-taupe max-w-xl mx-auto">
                    Innovative and artistic, SS Collection celebrates the rich crafts of India. We design for the modern Indian woman who blends international style with ethnic elegance.
                </p>
                <p className="text-xs text-taupe mt-6">© 2025 SS Collection. All rights reserved.</p>
            </footer>

            <BottomMenuBar />
        </Container>
    );
};

export default Home;
