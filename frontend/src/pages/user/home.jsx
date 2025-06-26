import axios from 'axios';
import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Container,
  BottomMenuBar,
  SSSpecialCarousel,
  FeaturedCollection,
  Header,
  ENV_File,
  AppwriteService,
  SecondSection
} from '../../FilesPaths/all_path';
import logo from '../../images/logo4.png';
import { Link } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const preloadedImagesRef = useRef([]);
  const imageURLsRef = useRef([]);

  // Fetch products and extract preview image URLs
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${ENV_File.backendURL}/admin/product/detail`);
        const reversed = [...response.data].reverse().map(product => ({
          ...product,
          previewImage: product.images[0]
        }));
        setProducts(reversed);
        imageURLsRef.current = reversed.map(p => p.previewImage);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Preload and store images once
  useEffect(() => {
    if (imageURLsRef.current.length === 0) return;

    const preloadImages = async () => {
      preloadedImagesRef.current = [];

      const promises = imageURLsRef.current.map((src) => {
        return new Promise(resolve => {
          const img = new Image();
          img.src = ENV_File.backendURL + src;
          img.onload = () => {
            preloadedImagesRef.current.push(img);
            resolve();
          };
          img.onerror = resolve;
        });
      });

      await Promise.all(promises);
      setAllImagesLoaded(true);
    };

    preloadImages();
  }, [products]);

  // Auto-rotate images
  useEffect(() => {
    if (!allImagesLoaded || preloadedImagesRef.current.length === 0) return;
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % preloadedImagesRef.current.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [allImagesLoaded]);

  const secondSectionImages = useMemo(
    () => (products ? products.map(p => p.previewImage).filter(Boolean) : []),
    [products]
  );

  if (!allImagesLoaded) {
    return (
      <Container>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-6">
          {[...Array(10)].map((_, idx) => (
            <div
              key={idx}
              className="bg-white/70 rounded-2xl shadow-lg p-4 animate-pulse flex flex-col"
            >
              <div className="h-40 md:h-48 bg-gray-200/50 rounded-xl mb-4 shadow-inner"></div>
              <div className="h-5 bg-gray-200/50 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200/50 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-200/50 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="grid min-h-[85vh] grid-cols-1 md:grid-cols-1 bg-gradient-to-br from-amber-50 via-white to-rose-50 rounded-sm shadow-xl overflow-y-auto ">
        {/* Hero Section */}
        <section className="relative h-[100vh] md:h-[60vh] lg:h-[70vh] rounded-xl shadow-2xl border border-rose-100 bg-gradient-to-br from-rose-50 via-white to-amber-50 mb-0.5">
          {preloadedImagesRef.current.map((img, idx) => (
            <img
              key={idx}
              src={img.src}
              alt={`Slide ${idx}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                idx === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ zIndex: 1 }}
            />
          ))}
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/30 via-black/50 to-black/60 flex flex-col justify-center items-center text-center px-[4vw]">
            <h1 className="text-[7vw] md:text-4xl lg:text-5xl font-extrabold text-white tracking-wide leading-tight mb-[2vw] drop-shadow-lg">
              Welcome to<br />
              <span className="text-rose-200 text-[8vw] md:text-5xl lg:text-6xl">Khuwab Collection</span>
            </h1>
            <p className="text-[4vw] md:text-xl lg:text-2xl text-white/90 max-w-[90vw] md:max-w-[40vw] mb-[2vw] font-medium drop-shadow animate-fade-in">
              Discover powerful experiences crafted for your unique style.
            </p>
            <Link
              to={"/product"}
              className="inline-block mt-1 px-[6vw] py-[2vw] md:px-8 md:py-3 bg-rose-600 text-white font-bold rounded-full shadow-lg hover:bg-rose-700 transition-all duration-200 text-[4vw] md:text-lg"
            >
              Shop Now
            </Link>
          </div>
          <div className="absolute inset-0 pointer-events-none rounded-3xl border-4 border-transparent bg-gradient-to-br from-rose-200/40 via-amber-100/30 to-white/0"></div>
        </section>

        {/* Second Section Image Strip */}
        <section className="mt-0.5 h-full">
          <SecondSection images={secondSectionImages} />
        </section>

        {/* Video Section */}
        <section className="mt-1 rounded-xl w-full bg-gradient-to-br from-amber-50 via-white to-rose-50 md:px-0 flex flex-col items-center shadow-2xl shadow-black/30">
          <h2 className="text-[7vw] md:text-4xl lg:text-5xl font-extrabold text-rose-700 text-center pt-8 mb-8 tracking-tight drop-shadow">
            Experience Our Vibe
          </h2>
          <div className="w-full max-w-full md:max-w-full overflow-hidden shadow-2xl border border-rose-100">
            <video
              src="/videos/video.mp4"
              autoPlay
              loop
              muted
              className="w-full h-[30vh] md:h-[40vh] lg:h-[480px] rounded-b-sm object-cover"
              poster="/images/video-poster.jpg"
            >
              Sorry, your browser doesn't support embedded videos.
            </video>
          </div>
        </section>

        {/* Featured Collection */}
        <section className="mt-1">
          <FeaturedCollection products={products} />
        </section>

        {/* Special Carousel Section */}
        <section className="mt-1">
          <SSSpecialCarousel products={products} />
        </section>

        {/* Footer */}
        <footer className="rounded-t-xl pb-16  bg-gradient-to-br from-rose-50 via-white to-amber-50 text-gray-800 py-8 px-4 md:px-8 text-center shadow-2xl border-t border-rose-100">
          <div className="w-full flex justify-center py-4">
            <img src={logo} className="w-[30vw] md:w-40 drop-shadow-lg rounded-xl" alt="Khuwab Collection" />
          </div>
          <p className="text-[3vw] md:text-lg text-gray-600 max-w-[90vw] md:max-w-2xl mx-auto mt-2 mb-4 font-medium">
            <span className="font-semibold text-rose-700">Innovative & Artistic:</span> Khuwab Collection celebrates the rich crafts of India. We design for the modern Indian woman who blends international style with ethnic elegance.
          </p>
          <div className="flex justify-center space-x-6 mt-4">
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-pink-500 transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 fill-current" viewBox="0 0 24 24"><path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5a4.25 4.25 0 004.25-4.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5zm8.75 2.25a.75.75 0 110 1.5.75.75 0 010-1.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z" /></svg>
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-blue-600 transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 fill-current" viewBox="0 0 24 24"><path d="M22 12a10 10 0 10-11.5 9.87v-6.98h-2.1v-2.9h2.1v-2.2c0-2.07 1.23-3.22 3.12-3.22.9 0 1.84.16 1.84.16v2.02h-1.04c-1.03 0-1.35.64-1.35 1.3v1.94h2.3l-.37 2.9h-1.93v6.98A10 10 0 0022 12z" /></svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="X" className="hover:text-blue-400 transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 fill-current" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14.86 4.48 4.48 0 001.98-2.48 9.14 9.14 0 01-2.88 1.1 4.52 4.52 0 00-7.7 4.13A12.8 12.8 0 013 4.89a4.52 4.52 0 001.4 6.04 4.48 4.48 0 01-2.05-.57v.06a4.52 4.52 0 003.63 4.43 4.52 4.52 0 01-2.04.08 4.52 4.52 0 004.22 3.14A9.05 9.05 0 013 19.54a12.8 12.8 0 006.92 2.03c8.3 0 12.84-6.87 12.84-12.83 0-.2 0-.42-.02-.63A9.22 9.22 0 0023 3z" /></svg>
            </a>
          </div>
          <p className="text-xs text-gray-500 mt-8 tracking-wide">
            <span className="font-semibold text-rose-700">Khuwab Collection<span className='text-xl'>&trade; </span></span>. All rights reserved.
          </p>
        </footer>
      </div>
    </Container>
  );
};

export default Home;