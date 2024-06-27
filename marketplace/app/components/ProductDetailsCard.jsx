"use client";

import Image from 'next/image';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const ProductDetailsCard = ({ product }) => {
    const { user } = useAuth();
    const router = useRouter();

    const handleAddToCart = async () => {
        if (!user) return alert("Please log in to add products to cart");
        try {
            const date = new Date();
            const today = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
            const response = await axios.post('/api/cart', { cartId: user.userId, productId: product.productId, date: today });
            alert(response.data.message);
        } catch (error) {
            console.error("Error adding product to cart:", error);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await axios.delete('/api/product', { data: { productId: product.productId } });
            router.push('/');
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    return (

        <div className="max-w-xl mx-auto border rounded-lg overflow-hidden shadow-lg m-4">
            <div className="relative h-48 w-full">
                {product.productId && <Image
                    src={`/api/uploads/product-${product.productId}.png`}
                    alt="Product"
                    layout="fill"
                    objectFit="cover"
                />}
            </div>
            <div className="p-4">
                <h1 className="text-xl font-bold mb-2">{product.name}</h1>
                <p className="text-gray-700 mb-2">{product.description}</p>
                <p className="text-gray-800 font-semibold">{product.price}€</p>
            </div>
            <div className="p-4 flex justify-end">
                {user && user.userId === product.userId ? (
                    <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md mr-2" onClick={handleDelete}>Delete Product</button>
                ) : (
                    <button className={`bg-sky-500 hover:bg-sky-600 text-white py-2 px-4 rounded-md mr-2 ${!user ? 'cursor-not-allowed' : ''}`} onClick={handleAddToCart} disabled={!user}>Add to Cart</button>
                )}
                {!user && (
                    <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md" disabled>Log in first!</button>
                )}
            </div>
        </div>

    );
};

export default ProductDetailsCard;
