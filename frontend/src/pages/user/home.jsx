import axios from 'axios';
import React, { useState, useEffect, useMemo } from 'react';
import {
  Container, BottomMenuBar, SSSpecialCarousel, FeaturedCollection,
  Header, ENV_File, AppwriteService, SecondSection
} from '../../FilesPaths/all_path';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${ENV_File.backendURL}/admin/product/detail`);
        const withURLs = response.data.map(product => ({
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

  const secondSectionImages = products.map(p => p.previewImage);

  return (
    <Container>

      <section className="relative bg-white w-full rounded-lg h-screen overflow-hidden">
        {imageURLs.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Slide ${idx}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${idx === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
        <div className="absolute inset-0 z-10 bg-black/50 flex flex-col justify-center items-center text-center px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-wide leading-tight mb-4">
            Welcome to <span className="text-white">SS Collection</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl animate-fade-in">
            Discover powerful experiences crafted for your unique style.
          </p>
        </div>
      </section>

      <section className="bg-white mt-1 py-10">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">New Arrivals</h2>
        <SecondSection images={secondSectionImages} />
      </section>

      <section className="w-screen bg-white py-10">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Experience Our Vibe</h2>
        <video
          src="/videos/video.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full max-w-full shadow-lg object-cover"
        >
          Sorry, your browser doesn't support embedded videos.
        </video>
      </section>

      <section className="bg-white py-10">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Featured Collection</h2>
        <FeaturedCollection products={products} />
      </section>

      <section className="py-10 bg-white">
        <h2 className="text-3xl font-bold text-center text-gray-800 ">SS Special Picks</h2>
        <SSSpecialCarousel products={products} />
      </section>

      <footer className="rounded-t-lg mt-0.5 bg-black text-white pb-20 py-10 px-4 text-center">
                <h4 className="text-xl font-semibold mb-2">SS Collection</h4>
                <p className="text-sm text-taupe max-w-xl mx-auto">
                    Innovative and artistic, SS Collection celebrates the rich crafts of India. We design for the modern Indian woman who blends international style with ethnic elegance.
                </p>
                <div className="flex justify-center space-x-6 mt-4">
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-pink-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-current" viewBox="0 0 24 24"><path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5a4.25 4.25 0 004.25-4.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5zm8.75 2.25a.75.75 0 110 1.5.75.75 0 010-1.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z"/></svg>
                    </a>
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-blue-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-current" viewBox="0 0 24 24"><path d="M22 12a10 10 0 10-11.5 9.87v-6.98h-2.1v-2.9h2.1v-2.2c0-2.07 1.23-3.22 3.12-3.22.9 0 1.84.16 1.84.16v2.02h-1.04c-1.03 0-1.35.64-1.35 1.3v1.94h2.3l-.37 2.9h-1.93v6.98A10 10 0 0022 12z"/></svg>
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="X" className="hover:text-blue-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-current" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14.86 4.48 4.48 0 001.98-2.48 9.14 9.14 0 01-2.88 1.1 4.52 4.52 0 00-7.7 4.13A12.8 12.8 0 013 4.89a4.52 4.52 0 001.4 6.04 4.48 4.48 0 01-2.05-.57v.06a4.52 4.52 0 003.63 4.43 4.52 4.52 0 01-2.04.08 4.52 4.52 0 004.22 3.14A9.05 9.05 0 013 19.54a12.8 12.8 0 006.92 2.03c8.3 0 12.84-6.87 12.84-12.83 0-.2 0-.42-.02-.63A9.22 9.22 0 0023 3z"/></svg>
                    </a>
                </div>
                <p className="text-xs text-taupe mt-6">© 2025 SS Collection. All rights reserved.</p>
            </footer>

      {/* <BottomMenuBar /> */}
    </Container>
  );
};

export default Home;
