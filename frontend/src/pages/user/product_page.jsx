import React, { useEffect, useState } from "react";
import {SwipeImageViewer, AppwriteService, ENV_File, } from "../../FilesPaths/all_path";
import axios from "axios";



const ProductPage = () => {
    const [image1, setimage1] = useState([])
    const [image2, setimage2] = useState([])
    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchimages = async () => {

            try {
                const response = await axios.get(`${ENV_File.backendURL}/admin/product/detail`);
                setProducts(response.data)
                console.log(response.data);

            } catch (error) {

            }
        }
        fetchimages()

    }, [])

    useEffect(() => {
        try {
            const filter = products.flatMap((p) => { p.images })
            if (filter) {
                console.log('filter', filter);

                setimage1(filter)

            }
        } catch (error) {
            l
        }
    }, [products])


    return (
        <div className="p-2 md:p-4">
            <h2 className="text-lg font-bold mb-3 md:text-2xl">Shop Bridal Collection</h2>

            {/* Product Grid - Compact */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-4">
                {products.map((product, i) => {
                    const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);
                    return (
                        <div
                            key={product._id}
                            className="border rounded-md overflow-hidden shadow-sm hover:shadow-md transition text-sm"
                        >
                            <div className="flex overflow-x-auto gap-2">
                            <SwipeImageViewer images={product.images} name={product.name} />

                            </div>

                            <div className="p-2">
                                <div>{product.images}</div>
                                <h4 className="font-semibold truncate">{product.brand}</h4>
                                <p className="text-xs truncate">{product.name}</p>
                                <div className="flex items-center space-x-1 mt-1">
                                    <span className="font-bold text-sm">₹{product.price}</span>
                                    <span className="line-through text-gray-500 text-xs">₹{product.mrp}</span>
                                    <span className="text-green-600 text-xs">{discount}% OFF</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ProductPage;
