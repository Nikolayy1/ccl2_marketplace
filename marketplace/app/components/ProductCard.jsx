"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import axios from 'axios';

const ProductCard = ({ productId }) => {

    const [product, setProduct] = useState({});

    const fetchProduct = async () => {
        try {
            const response = await axios.get('/api/product', { params: { productId: productId } });
            setProduct(response.data[0]);
        } catch (error) {
            console.error("Error fetching product:", error);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, []);

    return (
        <div className="rounded-lg mt-2 mb-4 w-full max-w-sm md:w-3/5 bg-slate-50 m-auto shadow-lg">
            <Link href={`/productDetails?productId=${product.productId}`}>
                <div className='aspect-square relative'>
                    <Image className="rounded-t-lg" src={`/api/uploads/product-${product.productId}.png`} alt='Product Image' layout='fill' />
                    <div className='customOrange absolute bottom-4 right-2 text-white p-2 rounded-xl shadow-xl shadow-black font-semibold'>{product.price}€</div>
                </div>
                <div className="p-5 bg-white rounded-b-lg border-t">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-sky-500">{product.name}</h5>
                    <p className="mb-3 font-normal text-black">{product.description}</p>
                </div>
            </Link>
        </div>

    );
}

export default ProductCard;