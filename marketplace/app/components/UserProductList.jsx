import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

const UserProductList = ({ user }) => {

    const [products, setProducts] = useState([]);
    const [userData, setUserData] = useState(user);
    const router = useRouter();

    const getProducts = async () => {
        try {
            const response = await axios.get(`/api/product/userProducts?userId=${userData.userId}`);
            setProducts(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getProducts();
    }, [user]);

    return (
        <div>
            <div className="flex items-center justify-between m-5">
                <h1 className="text-3xl font-semibold text-gray-800">Products</h1>
                <Link href="/addProduct">
                    <button className="bg-sky-500 text-white py-2 px-4 rounded-lg transition duration-300 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-300">
                        Add Product
                    </button>
                </Link>
            </div>
            <div className="row">
                {products.map((product) => (
                    <Link href={`/productDetails?productId=${product.productId}`} key={product.productId}>
                        <div className="flex flex-row m-4 p-4 border border-gray-300 bg-white rounded-lg shadow-md">
                            <div className="flex-shrink-0">
                                <Image src={`/api/uploads/product-${product.productId}.png`} alt="Product" width={100} height={100} className="rounded-lg" />
                            </div>
                            <div className="flex flex-col justify-center ml-4">
                                <h1 className="text-2xl font-semibold text-gray-800 mb-1">{product.name}</h1>
                                <p className="text-xl text-gray-600">{product.price}€</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default UserProductList;