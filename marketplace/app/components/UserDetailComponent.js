import Image from 'next/image';
import { useState } from 'react';
import EditUserForm from './EditUserForm';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const UserDetailComponent = ({ user }) => {

    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState(user);
    const { logout } = useAuth();

    const editUser = () => {
        setIsEditing(true);
    };

    const handleSave = async (updatedUser) => {
        const response = await axios.post('/api/profile', [user.userId, updatedUser]);
        setUserData(updatedUser);
        setIsEditing(false);
    };

    const handleClose = () => {
        setIsEditing(false);
    };

    const handleLogout = () => {
        logout();
    };

    return (
        <>
            <div className='flex flex-col m-5'>
                {isEditing && <EditUserForm user={userData} onClose={handleClose} onSave={handleSave} />}
                <Image className='m-auto mt-2' src="/profile_picture.jpg" alt="Profile" width={200} height={200} />
                <div className='flex flex-row items-center m-auto'>
                    <h1 className='text-3xl font-bold m-3'>{userData?.name}</h1>
                </div>

                <hr className="m-2 border-sky-500"></hr>

                <div className='flex flex-row items-center'>
                    <div className='flex flex-row w-full'>
                        <p className='text-lg text-right w-1/2 pr-8'>Email</p>
                        <p className='text-lg text-left w-1/2'>{userData?.email}</p>
                    </div>
                </div>
                <div className='flex flex-row items-center'>
                    <div className='flex flex-row w-full'>
                        <p className='text-lg text-right w-1/2 pr-8'>Phone</p>
                        <p className='text-lg text-left w-1/2'>{userData?.phone}</p>
                    </div>
                </div>
                <div className='flex flex-row items-center'>
                    <div className='flex flex-row w-full'>
                        <p className='text-lg text-right w-1/2 pr-8'>Country</p>
                        <p className='text-lg text-left w-1/2'>{userData?.country}</p>
                    </div>
                </div>
                <div className='flex flex-row items-center'>
                    <div className='flex flex-row w-full'>
                        <p className='text-lg text-right w-1/2 pr-8'>City</p>
                        <p className='text-lg text-left w-1/2'>{userData?.city}</p>
                    </div>
                </div>
                <div className='flex flex-row items-center'>
                    <div className='flex flex-row w-full'>
                        <p className='text-lg text-right w-1/2 pr-8'>Street</p>
                        <p className='text-lg text-left w-1/2'>{userData?.street}</p>
                    </div>
                </div>
                <button className='bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded m-2 mt-4' onClick={editUser}>Edit</button>
                <button className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-2 ml-2' onClick={handleLogout}>Logout</button>
            </div>
        </>
    )
}

export default UserDetailComponent;