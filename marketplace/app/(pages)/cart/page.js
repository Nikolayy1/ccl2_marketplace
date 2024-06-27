"use client"

import CartProduct from "@/app/components/CartProduct";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { useAuth } from "../../contexts/AuthContext";

export default function Cart() {
  const { user } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    } else {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    try {
      const result = await axios.get('/api/cart', { params: { cartId: user.cartId } });
      setProducts(result.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <h1 className='text-3xl m-3'>My Cart</h1>
      <div>
        {products.length === 0 && <p className='m-3'>No products in cart</p>}
        {products.map((product) => (
          <CartProduct key={product.id} product={product} fetchData={fetchData}/>
        ))}
      </div>
    </>
  );
}
