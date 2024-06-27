"use client";

import ProductDetailsCard from "@/app/components/ProductDetailsCard";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import axios from 'axios';

const ProductDetailsComponent = () => {
    const searchParams = useSearchParams();
    let productId = searchParams.get('productId');

    const [product, setProduct] = useState({});

    const fetchProductDetails = async () => {
        const response = await axios.get('/api/product', { params: { productId: productId } });
        console.log(response.data[0]);
        setProduct(response.data[0]);
    }

    useEffect(() => {
        fetchProductDetails();
    }, [productId]);

    return (
        <>
            {product &&
                <ProductDetailsCard product={product} />
            }
        </>
    )
}

const ProductDetails = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <ProductDetailsComponent />
  </Suspense>
);

export default ProductDetails;
