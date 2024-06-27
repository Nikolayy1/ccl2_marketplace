import Image from "next/image";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const CartProduct = ({ product, fetchData }) => {
    const [productData, setProductData] = useState({});
    const { user } = useAuth();

    const fetchProductData = async () => {
        try {
            const response = await axios.get('/api/product', { params: { productId: product.productId } });
            setProductData(response.data[0]);
        } catch (error) {
            console.error("Error fetching product data:", error);
        }
    };

    useEffect(() => {
        fetchProductData();
    }, []);

    const handleRemove = async () => {
        try {
            await axios.delete('/api/cart', { data: { cartId: user.userId, productId: product.productId } });
            fetchData();
            alert("Product removed from cart");
        } catch (error) {
            console.error("Error removing product:", error);
        }
    };

    const handleContact = async () => {
        try {
            const response = await axios.get('/api/product/seller', { params: { productId: product.productId } });
            alert("Contacting seller: " + response.data[0].email + " - " + response.data[0].phone);
        }
        catch (error) {
            console.error("Error contacting seller:", error);
        }
    }

    return (
        <>
            <div className="flex flex-row m-4 p-4 border border-gray-300 bg-white rounded-lg shadow-lg relative lg:w-1/2 lg:m-auto lg:mb-4">
                <div className="flex-shrink-0">
                    <Image src={`/api/uploads/product-${product.productId}.png`} alt="Product" width={100} height={100} className="rounded-lg" />
                </div>
                <div className="flex flex-col w-full ml-4">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-2">{productData.name}</h1>
                    <p className="text-xl text-gray-600 mb-4">{productData.price}€</p>
                    <button
                        className="border border-sky-500 bg-sky-400 text-white py-2 px-4 rounded-lg self-end transition duration-300 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-red-300"
                        onClick={handleContact}
                    >
                        Contact Seller
                    </button>
                </div>
                <button
                    className="absolute top-2 right-2 bg-gray-200 text-gray-600 rounded-full p-2 transition duration-300 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
                    onClick={handleRemove}
                >
                    &times;
                </button>
            </div>
        </>

    )
}

export default CartProduct;