"use client"

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";

const AddProductForm = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [error, setError] = useState(null);
    const router = useRouter();
    const { user } = useAuth();

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !price || !description || !selectedFile) {
            setError("All fields are required");
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('name', name);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('userId', user.userId);

        try {
            const productResponse = await axios.post("/api/product/add", formData);
            console.log(productResponse);
            const productId = productResponse.data.id;

            try {
                const imageFormData = new FormData();
                imageFormData.append('file', selectedFile);
                imageFormData.append('productId', productId);

                const imageResponse = await axios.post('/api/image', imageFormData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log('Image uploaded:', imageResponse.data);

                router.push("/profile");
            } catch (error) {
                console.error('Error uploading the file', error);
                setError("Failed to upload image. Please try again.");
            }
        } catch (error) {
            console.error("Error adding product:", error);
            setError("Failed to add product. Please try again.");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-8 border border-gray-300 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold mb-6 text-center">Add Product</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="name">Product Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="price">Price (€)</label>
                    <input
                        type="text"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 mb-2" htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300"
                    ></textarea>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 mb-2" htmlFor="image">Product Image</label>
                    <input
                        type="file"
                        id="image"
                        onChange={handleFileChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-sky-500 text-white font-semibold rounded-lg hover:bg-sky-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-sky-300"
                >
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default AddProductForm;
