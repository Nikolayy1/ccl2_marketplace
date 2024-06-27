"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { useAuth } from '../../contexts/AuthContext';
import Image from 'next/image';
import UserDetailComponent from '@/app/components/UserDetailComponent';
import UserProductList from '@/app/components/UserProductList';

const Profile = () => {
    const router = useRouter();
    const { user } = useAuth();

    useEffect(() => {
        // Redirect to login if user is not authenticated
        if (!user) {
            router.push('/login');
        }
    }, [user, router]);

    // If user is authenticated, render the profile page
    return (
        <>
            {user && (
                <>
                    <UserDetailComponent user={user} />
                    <hr></hr>
                    <UserProductList user={user}></UserProductList>
                </>
            )}
        </>
    );
};

export default Profile;
