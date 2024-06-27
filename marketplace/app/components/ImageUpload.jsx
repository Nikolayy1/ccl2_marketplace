"use client";

import { useState } from 'react';
import axios from 'axios';

const ImageUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState('');

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await axios.post('/api/image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setUploadedImageUrl(response.data.url); // Assuming your API returns the URL of the uploaded image
        } catch (error) {
            console.error('Error uploading the file', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Upload Image</button>
            </form>
            {uploadedImageUrl && (
                <div>
                    <p>Uploaded Image:</p>
                    <img src={uploadedImageUrl} alt="Uploaded" />
                </div>
            )}
        </div>
    );
};

export default ImageUpload;
