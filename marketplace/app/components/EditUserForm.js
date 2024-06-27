import React, { useState } from 'react';

const EditUserForm = ({ user, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email,
        phone: user.phone,
        country: user.country,
        city: user.city,
        street: user.street,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
            <div className="bg-white p-5 rounded shadow-lg">
                <h2 className="text-xl font-bold mb-4">Edit User Information</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label className="block text-sm font-bold mb-1" htmlFor="name">Name</label>
                        <input className="border rounded w-full p-2" type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
                    </div>
                    <div className="mb-2">
                        <label className="block text-sm font-bold mb-1" htmlFor="email">Email</label>
                        <input className="border rounded w-full p-2" type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
                    </div>
                    <div className="mb-2">
                        <label className="block text-sm font-bold mb-1" htmlFor="phone">Phone</label>
                        <input className="border rounded w-full p-2" type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
                    </div>
                    <div className="mb-2">
                        <label className="block text-sm font-bold mb-1" htmlFor="country">Country</label>
                        <input className="border rounded w-full p-2" type="text" id="country" name="country" value={formData.country} onChange={handleChange} />
                    </div>
                    <div className="mb-2">
                        <label className="block text-sm font-bold mb-1" htmlFor="city">City</label>
                        <input className="border rounded w-full p-2" type="text" id="city" name="city" value={formData.city} onChange={handleChange} />
                    </div>
                    <div className="mb-2">
                        <label className="block text-sm font-bold mb-1" htmlFor="street">Street</label>
                        <input className="border rounded w-full p-2" type="text" id="street" name="street" value={formData.street} onChange={handleChange} />
                    </div>
                    <div className="flex justify-end mt-4">
                        <button className="bg-gray-500 text-white font-bold py-2 px-4 rounded mr-2" onClick={onClose}>Cancel</button>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" type="submit">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditUserForm;
