"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useRef, useState } from 'react';
import { register } from 'swiper/element/bundle';
import PriceTag from "./PriceTag";
import Link from "next/link";
import { useRouter } from 'next/navigation';

const RandomProduct = () => {
    const swiperElRef = useRef(null);
    const [slides, setSlides] = useState([]);
    const [loading, setLoading] = useState(true);

    const router = useRouter();

    const getProduct = async () => {
        const randomProduct = await axios.get('/api/product/random');
        return randomProduct.data[0];
    };

    const initializeSlides = async () => {
        const initialSlides = [];
        for (let i = 0; i < 3; i++) {
            const product = await getProduct();
            console.log(product);
            initialSlides.push({ id: product.productId, src: `/api/uploads/product-${product.productId}.png`, price: product.price });
        }
        setSlides(initialSlides);
        setLoading(false);
    };

    useEffect(() => {
        register();
        initializeSlides();

        if (swiperElRef.current) {
            const swiper = swiperElRef.current.swiper;

            swiper.params.allowTouchMove = false;
            swiper.params.allowSlideNext = true;
            swiper.params.allowSlidePrev = true;
            swiper.params.centeredSlides = true;

            swiper.on('slideChange', async () => {
                const newProduct = await getProduct();
                
                setSlides((prevSlides) => [
                    ...prevSlides,
                    { id: newProduct.productId, src: `/api/uploads/product-${newProduct.productId}.png`, price: newProduct.price }
                ]);

                swiper.update();
            });

            swiper.update();
        }
    }, []);

    const handleClick = (id) => {
        router.push(`/productDetails?productId=${id}`)
    }

    return (
        <>
            <div className="w-3/4 bg-slate-50 m-auto">

                <swiper-container
                    ref={swiperElRef}
                    slides-per-view="1"
                    space-between="50"
                    navigation="true"
                    css-mode="true"
                    style={{ display: 'block' }}
                >
                    {slides.map((slide) => (
                        <swiper-slide key={slide.id}>
                            <div className="flex items-center justify-center relative">
                                <button onClick={() => handleClick(slide.id)}>
                                    <Image src={slide.src} alt="Random product" width={300} height={300} />
                                    <div className="absolute bottom-0 right-0 m-4">
                                        <PriceTag price={slide.price} />
                                    </div>
                                </button>
                            </div>
                        </swiper-slide>
                    ))}
                </swiper-container>
            </div>
            <div className="flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-12">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
            </div>
        </>
    );
}

export default RandomProduct;
