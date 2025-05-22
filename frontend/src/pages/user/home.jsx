import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {
  Container, BottomMenuBar, SSSpecialCarousel, FeaturedCollection,
  Header, ENV_File, AppwriteService, SecondSection
} from '../../FilesPaths/all_path';
import logo from '../../images/logo4.png'
import { Link } from 'react-router-dom';
import { useMemo } from 'react';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${ENV_File.backendURL}/admin/product/detail`);
        // Reverse products so newest appear first
        const withURLs = [...response.data].reverse().map(product => ({
          ...product,
          previewImage: AppwriteService.getFileViewUrl(product.images[0])
        }));
        setProducts(withURLs);
        setImageURLs(withURLs.map(p => p.previewImage));
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);

  const secondSectionImages = useMemo(
    () => (products && Array.isArray(products) ? products.map(p => p.previewImage).filter(Boolean) : []),
    [products]
  );
  useEffect(() => {
    if (imageURLs.length === 0) return;

    const preloadImages = async () => {
      await Promise.all(
        imageURLs.map(
          src => new Promise(resolve => {
            const img = new Image();
            img.src = src;
            img.onload = resolve;
            img.onerror = resolve;
          })
        )
      );
      setAllImagesLoaded(true);
    };

    preloadImages();
  }, [imageURLs]);

  useEffect(() => {
    if (!allImagesLoaded || imageURLs.length === 0) return;
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % imageURLs.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [allImagesLoaded, imageURLs]);

   if (!allImagesLoaded) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-white">
        <p className="text-gray-600 text-xl">Loading...</p>
      </div>
    );
  }


  return (
    <Container>
      <div className="w-full h-full grid  grid-cols-1 md:grid-cols-2 bg-gradient-to-br from-amber-50 via-white to-rose-50  shadow-xl overflow-y-auto">
        <section className="relative w-full h-[90vh] md:h-full rounded-xl overflow-hidden shadow-2xl border border-rose-100 bg-gradient-to-br from-rose-50 via-white to-amber-50">
          {/* Background Image Carousel */}
          {imageURLs.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Slide ${idx}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${idx === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
              style={{ zIndex: 1 }}
            />
          ))}
          {/* Overlay */}
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/30 via-black/50 to-black/60 flex flex-col justify-center items-center text-center px-[4vw]">
            <h1 className="text-[7vw] md:text-[3.5vw] font-extrabold text-white tracking-wide leading-tight mb-[2vw] drop-shadow-lg">
              Welcome to<br /> <span className="text-rose-200 text-[8vw] md:text-[3vw]">SS Collection</span>
            </h1>
            <p className="text-[4vw] md:text-[1.5vw] text-white/90 max-w-[90vw] md:max-w-[40vw] mb-[2vw] font-medium drop-shadow animate-fade-in">
              Discover powerful experiences crafted for your unique style.
            </p>
            <Link
              to={"/product"}
              className="inline-block mt-[2vw] px-[6vw] py-[2vw] md:px-[2vw] md:py-[1vw] bg-rose-600 text-white font-bold rounded-full shadow-lg hover:bg-rose-700 transition-all duration-200 text-[4vw] md:text-lg"
            >
              Shop Now
            </Link>
          </div>
          {/* Decorative Gradient Border */}
          <div className="absolute inset-0 pointer-events-none rounded-3xl border-4 border-transparent bg-gradient-to-br from-rose-200/40 via-amber-100/30 to-white/0"></div>
        </section>

        <section className="mt-[0.5vh] h-full">
          <SecondSection images={secondSectionImages} />
        </section>

        <section className="mt-[1vw] rounded-xl w-full bg-gradient-to-br from-amber-50 via-white to-rose-50 py-[4vw] px-[1vw] md:px-0 flex flex-col items-center shadow-2xl shadow-black/30">
          <h2 className="text-[7vw] md:text-5xl font-extrabold text-rose-700 text-center mb-[4vw] tracking-tight drop-shadow">
            Experience Our Vibe
          </h2>
          <div className="w-full max-w-[95vw] md:max-w-4xl rounded-sm overflow-hidden shadow-2xl border border-rose-100">
            <video
              src="/videos/video.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-[30vh] md:h-[480px] object-cover"
              poster="/images/video-poster.jpg"
            >
              Sorry, your browser doesn't support embedded videos.
            </video>
          </div>
        </section>

        <section className="mt-[1vw]">
          <FeaturedCollection products={products} />
        </section>

        <section className="mt-[1vw]">
          <SSSpecialCarousel products={products} />
        </section>

        <footer className="rounded-t-xl pb-15 mt-[0.5vw] bg-gradient-to-br from-rose-50 via-white to-amber-50 text-gray-800 py-[4vw] px-[2vw] text-center shadow-2xl border-t border-rose-100">
          <div className="w-full flex justify-center py-[1vw]">
            <img src={logo} className="w-[30vw] md:w-40 drop-shadow-lg rounded-xl" alt="SS Collection" />
          </div>
          <p className="text-[3vw] md:text-lg text-gray-600 max-w-[90vw] md:max-w-2xl mx-auto mt-[1vw] mb-[2vw] font-medium">
            <span className="font-semibold text-rose-700">Innovative & Artistic:</span> SS Collection celebrates the rich crafts of India. We design for the modern Indian woman who blends international style with ethnic elegance.
          </p>
          <div className="flex justify-center space-x-6 mt-[2vw]">
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-pink-500 transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-[7vw] md:h-7 w-[7vw] md:w-7 fill-current" viewBox="0 0 24 24"><path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5a4.25 4.25 0 004.25-4.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5zm8.75 2.25a.75.75 0 110 1.5.75.75 0 010-1.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z" /></svg>
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-blue-600 transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-[7vw] md:h-7 w-[7vw] md:w-7 fill-current" viewBox="0 0 24 24"><path d="M22 12a10 10 0 10-11.5 9.87v-6.98h-2.1v-2.9h2.1v-2.2c0-2.07 1.23-3.22 3.12-3.22.9 0 1.84.16 1.84.16v2.02h-1.04c-1.03 0-1.35.64-1.35 1.3v1.94h2.3l-.37 2.9h-1.93v6.98A10 10 0 0022 12z" /></svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="X" className="hover:text-blue-400 transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-[7vw] md:h-7 w-[7vw] md:w-7 fill-current" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14.86 4.48 4.48 0 001.98-2.48 9.14 9.14 0 01-2.88 1.1 4.52 4.52 0 00-7.7 4.13A12.8 12.8 0 013 4.89a4.52 4.52 0 001.4 6.04 4.48 4.48 0 01-2.05-.57v.06a4.52 4.52 0 003.63 4.43 4.52 4.52 0 01-2.04.08 4.52 4.52 0 004.22 3.14A9.05 9.05 0 013 19.54a12.8 12.8 0 006.92 2.03c8.3 0 12.84-6.87 12.84-12.83 0-.2 0-.42-.02-.63A9.22 9.22 0 0023 3z" /></svg>
            </a>
          </div>
          <p className="text-[2vw] md:text-xs text-gray-500 mt-[4vw] md:mt-8 tracking-wide">
            © 2025 <span className="font-semibold text-rose-700">SS Collection</span>. All rights reserved.
          </p>
        </footer>
      </div>
    </Container>
  );
};

export default Home;