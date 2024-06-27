"use client";

import axios from "axios";
import { useRouter } from 'next/navigation'


const RegisterForm = () => {
    const router = useRouter()

    async function handleSubmit(event) {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        const email = formData.get('email')
        const password = formData.get('password')
        const name = formData.get('name')
        const address = formData.get('address')
        const postalCode = formData.get('postalCode')
        const city = formData.get('city')
        const phone = formData.get('phone')
        const country = formData.get('country')

        const response = await axios.post('/api/register', {
            name,
            email,
            password,
            address,
            postalCode,
            city,
            phone,
            country
        });

        if (response.status === 200) {
            router.push('/')
        } else {
            // Handle errors
        }
    }

    return (
        <section>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:mt-12 lg:py-0">
                <div className="w-full bg-slate-50 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-4 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-center">
                            Register
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit} method="POST">
                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium">Name</label>
                                <input type="text" name="name" id="name" placeholder="Name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required="" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium">Email</label>
                                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="name@company.com" required="" />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium">Password</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required="" />
                            </div>
                            <div className="flex flex-row gap-1">
                                <div className="w-1/2">
                                    <label htmlFor="country" className="block mb-2 text-sm font-medium">Country</label>
                                    <input type="text" name="country" id="country" placeholder="Country" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required="" />
                                </div>
                                <div>
                                    <label htmlFor="address" className="block mb-2 text-sm font-medium">Address</label>
                                    <input type="text" name="address" id="address" placeholder="Address" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required="" />
                                </div>
                            </div>
                            <div className="flex flex-row gap-1">
                                <div className="w-1/2">
                                    <label htmlFor="postalCode" className="block mb-2 text-sm font-medium">Postal Code</label>
                                    <input type="number" name="postalCode" id="postalCode" placeholder="ZIP" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required="" />
                                </div>
                                <div className="flex-grow">
                                    <label htmlFor="city" className="block mb-2 text-sm font-medium">City</label>
                                    <input type="text" name="city" id="city" placeholder="City" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required="" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="phone" className="block mb-2 text-sm font-medium">Phone</label>
                                <input type="tel" name="phone" id="phone" placeholder="Phone" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required="" />
                            </div>
                            <button type="submit" className="w-full text-slate-50 bg-blue-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign up</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default RegisterForm;