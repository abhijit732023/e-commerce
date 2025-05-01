// Same imports as before
import React, { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { FaPhone, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import { motion } from 'framer-motion';
import {AppwriteService} from './../../FilesPaths/all_path.js'
// import bgimage from '../../images/cloth.webp';
// import bgimage1 from '../../images/blue.webp';
// import bgimage2 from '../../images/th.webp';
// import bgimage3 from '../../images/got.webp';
// import bgimage4 from '../../images/get.webp';
// import bgimage5 from '../../images/hat.webp';
// import bgimage6 from '../../images/wah.webp';
import { Navbar } from '../../FilesPaths/all_path.js'

const Home = () => {
    const scrollRef = useRef(null);
    console.log(AppwriteService.getFileViewUrl('6811d24e003cc44b908a'));
    

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

    return (
        // <div className="w-full">
        //     <Navbar />
        //     {/* HERO SECTION */}
        //     <section className="relative h-[60vh] md:h-[80vh]">
        //         <Swiper
        //             spaceBetween={10}
        //             slidesPerView={1}
        //             loop
        //             autoplay={{ delay: 3000 }}
        //             className="h-full"
        //         >
        //             {[bgimage, bgimage1, bgimage2].map((img, idx) => (
        //                 <SwiperSlide key={idx}>
        //                     <div
        //                         className="h-full w-full bg-cover bg-center flex items-center justify-center"
        //                         style={{ backgroundImage: `url(${img})` }}
        //                     >
        //                         <div className="bg-black/40 p-6 md:p-10 absolute bottom-4 w-[90%] md:w-[60%] mx-auto backdrop-blur-xl rounded">
        //                             <h1 className="text-white text-3xl md:text-5xl font-bold text-center">Discover the Elegance</h1>
        //                             <p className="text-white text-base md:text-xl text-center mt-2">Tradition meets modern style</p>
        //                         </div>
        //                     </div>
        //                 </SwiperSlide>
        //             ))}
        //         </Swiper>
        //     </section>

        //     {/* FEATURED COLLECTION */}
        //     <section className="bg-rose-50/50 py-12 px-4 md:px-16">
        //         <h2 className="text-2xl md:text-3xl font-bold mb-6 text-rose-700">🌟 Featured Collection</h2>
        //         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        //             {[bgimage1, bgimage2].map((img, i) => (
        //                 <motion.div
        //                     key={i}
        //                     whileInView={{ opacity: 1, scale: 1 }}
        //                     initial={{ opacity: 0, scale: 0.9 }}
        //                     transition={{ duration: 0.6 }}
        //                     className="bg-white shadow-lg rounded overflow-hidden hover:scale-105 transition-transform"
        //                 >
        //                     <img src={img} alt={`Product ${i}`} className="w-full h-64 md:h-80 object-cover" />
        //                     <div className="p-6">
        //                         <h3 className="text-lg font-semibold">Lehenga {i + 1}</h3>
        //                         <p className="text-red-600 mt-2 text-lg">₹{(i + 1) * 16900}.00</p>
        //                     </div>
        //                 </motion.div>
        //             ))}
        //         </div>
        //     </section>

        //     {/* SS SPECIAL */}
        //     <section className="bg-rose-100/20 border-t-2 border-rose-300/20 py-12 md:h-1/2 px-4 md:px-16">
        //         <h2 className="text-2xl md:text-3xl font-bold mb-6 text-rose-800">💎 SS Special</h2>
        //         <div
        //             ref={scrollRef}
        //             className="overflow-x-auto flex space-x-2 min-md:space-x-100 snap-x snap-mandatory overflow-y-hidden scroll-smooth"
        //         >
        //             {[bgimage2, bgimage5, bgimage6, bgimage1, bgimage3, bgimage4].map((img, i) => (
        //                 <motion.div
        //                     key={i}
        //                     className="bg-contain contain-content  bg-white shadow min-w-[80%] md:min-w-[30%] rounded snap-center overflow-hidden hover:scale-105 transition-transform"
        //                     initial={{ scale: 0.85 }}
        //                     whileInView={{ scale: 1.10 }}
        //                     viewport={{ once: false, amount: 0.7 }}
        //                     transition={{ type: "spring", stiffness: 100 }}
        //                 >
        //                     <img src={img} alt={`SS Special ${i}`} className="w-full h-64 object-cover" />
        //                     <div className="p-4">
        //                         <h3 className="text-lg font-semibold">Special {i + 1}</h3>
        //                         <p className="text-red-600 mt-2">₹{(i + 1) * 50000}.00</p>
        //                     </div>
        //                 </motion.div>
        //             ))}
        //         </div>
        //     </section>

        //     {/* SHOP BY CATEGORY */}
        //     <section className="bg-rose-200/20 border-t-2 border-rose-400/20 py-12 px-4 md:px-16">
        //         <h2 className="text-2xl md:text-3xl font-bold mb-6 text-rose-900">🛍️ Shop by Category</h2>
        //         <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        //             {["Sarees", "Lehengas", "Gowns", "Accessories"].map((category, index) => (
        //                 <motion.div
        //                     key={index}
        //                     whileHover={{ scale: 1.1 }}
        //                     className="bg-white shadow-md rounded-lg p-4 transition-transform text-center"
        //                 >
        //                     <img src={bgimage4} alt={category} className="h-24 w-24 object-cover mx-auto rounded-full mb-3" />
        //                     <h3 className="text-md font-semibold">{category}</h3>
        //                 </motion.div>
        //             ))}
        //         </div>
        //     </section>

        //     {/* FAMOUS COLLECTION */}
        //     <section className="bg-rose-300/20 border-t-2 border-t-rose-300/20 py-12 px-4 md:px-16">
        //         <h2 className="text-2xl md:text-3xl font-bold mb-6 text-rose-950">🔥 Famous Collection</h2>
        //         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        //             {[bgimage6, bgimage5].map((img, i) => (
        //                 <motion.div
        //                     key={i}
        //                     initial={{ opacity: 0, y: 50 }}
        //                     whileInView={{ opacity: 1, y: 0 }}
        //                     viewport={{ once: true }}
        //                     transition={{ duration: 0.6 }}
        //                     className="bg-white shadow-lg rounded overflow-hidden hover:scale-105 transition-transform"
        //                 >
        //                     <img src={img} alt={`Famous ${i}`} className="w-full h-64 md:h-80 object-cover" />
        //                     <div className="p-6">
        //                         <h3 className="text-xl font-semibold">Lehenga {i + 5}</h3>
        //                         <p className="text-red-600 mt-2 text-lg">₹{(i + 5) * 10000}.00</p>
        //                     </div>
        //                 </motion.div>
        //             ))}
        //         </div>
        //     </section>

        //     {/* FOOTER */}
        //     <motion.footer
        //         initial={{ opacity: 0, y: 100 }}
        //         whileInView={{ opacity: 1, y: 0 }}
        //         transition={{ duration: 0.7 }}
        //         className="bg-black/80 backdrop-blur-2xl text-white py-12 px-6 md:px-20"
        //     >
        //         <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
        //             <div>
        //                 <h4 className="text-xl font-semibold mb-4">About SS CollectionFashion</h4>
        //                 <p className="text-sm text-gray-300">
        //                     Innovative and artistic, SS CollectionFashion celebrates the rich crafts of India. We design for the modern Indian woman who blends international style with ethnic elegance.
        //                 </p>
        //             </div>
        //             <div>
        //                 <h4 className="text-xl font-semibold mb-4">The Company</h4>
        //                 <ul className="space-y-2 text-sm text-gray-300">
        //                     <li>Store Locator</li>
        //                     <li>Custom Measurement</li>
        //                     <li>Shipping & Payments Terms</li>
        //                     <li>Refunds & Returns</li>
        //                     <li>FAQ</li>
        //                 </ul>
        //             </div>
        //             <div>
        //                 <h4 className="text-xl font-semibold mb-4">Need Help</h4>
        //                 <ul className="space-y-2 text-sm text-gray-300">
        //                     <li className="flex items-center gap-2"><FaPhone /> +91-90000-00000</li>
        //                     <li className="flex items-center gap-2"><FaEnvelope /> support@sscollection.in</li>
        //                     <li className="flex items-center gap-2"><FaMapMarkerAlt /> Mumbai, India</li>
        //                     <li>Privacy Policy</li>
        //                     <li>Terms & Conditions</li>
        //                 </ul>
        //             </div>
        //         </div>
        //         <p className="text-center text-xs text-gray-400 mt-8">© 2025 SS CollectionFashion. All rights reserved.</p>
        //     </motion.footer>
        // </div>
        <div>hi</div>

    );
};

export default Home;
