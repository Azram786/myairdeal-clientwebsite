import React, { useEffect, useState } from 'react';
import world from '../../assets/auth/world.png';
import axios from 'axios';
import { useSelector } from 'react-redux';
import ReactFlagsSelect from 'react-flags-select';
// import 'react-flags-select/css/react-flags-select.css';

const UserProfile = () => {
    const { token } = useSelector((state) => state.auth);

    const [userData, setUserData] = useState({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@gmail.com',
        phone: "",
        country: {
            dialCode: '1',
            countryCode: 'US',
            countryName: 'United States'
        },
    });
    console.log({ userData })
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleChange = (field, value) => {
        setUserData({ ...userData, [field]: value });
    };

    const handleCountryChange = (countryCode) => {
        const selectedCountry = countries.find(country => country.countryCode === countryCode);
        setUserData({
            ...userData,
            country: {
                dialCode: selectedCountry.dialCode,
                countryCode: selectedCountry.countryCode,
                countryName: selectedCountry.countryName
            }
        });
    };

    const handleSave = async () => {
        try {

            setIsEditing(false);
            const response = await axios.put(`${import.meta.env.VITE_SERVER_URL}user/profile`, {
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                country: {
                    dialCode: userData.country.dialCode,
                    countryCode: userData.country.countryCode,
                    countryName: userData.country.countryName
                }
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            console.log(response)
        } catch (error) {
            console.log(error.message)
        }

    };

    const getProfileData = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}user/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log({ response })
            const profileData = {
                firstName: response.data.firstName,
                lastName: response.data.lastName,
                email: response.data.email,
                phone: ` ${response.data.phone}`,
                country: {
                    dialCode: response.data.country.dialCode,
                    countryCode: response.data.country.countryCode,
                    countryName: response.data.country.countryName
                },
            }
            setUserData(profileData);
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        getProfileData();
    }, []);

    return (
        <div className="px-[6vw]">
            <div className='flex flex-col border px-[2vw] shadow-lg'>
                <div className='font-bold h-[10vh] flex items-center text-[1.3rem]'>
                    My Account
                </div>
                <div className="bg-[#284E82] text-white p-6 rounded-lg text-center"
                    style={{
                        backgroundImage: `url(${world})`,
                        backgroundSize: "cover",
                    }}>
                    <div className="rounded-full mx-auto mb-4 w-24 h-24 bg-white flex items-center justify-center text-blue-500 text-3xl font-bold">
                        {userData.firstName.charAt(0)}
                    </div>
                    <h1 className="text-2xl font-bold">{userData.firstName} {userData.lastName}</h1>
                    <p>{userData.phone}</p>
                </div>
                <div className="p-6 rounded-b-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Profile</h2>
                    <div className="flex flex-col gap-4">
                        <div className='flex'>
                            <div className="w-1/2 flex flex-col gap-2 h-full">
                                <label className="text-gray-700 text-sm">First Name</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={userData.firstName}
                                        onChange={(e) => handleChange('firstName', e.target.value)}
                                        className="w-3/4 rounded-md border border-gray-300 shadow-sm p-2 text-xl"
                                    />
                                ) : (
                                    <p className="mt-1 p-2 text-xl font-semibold">{userData.firstName}</p>
                                )}
                            </div>
                            <div className="w-1/2 flex flex-col gap-2 h-full">
                                <label className="text-gray-700 text-sm">Last Name</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={userData.lastName}
                                        onChange={(e) => handleChange('lastName', e.target.value)}
                                        className="w-3/4 rounded-md border border-gray-300 shadow-sm p-2 text-xl"
                                    />
                                ) : (
                                    <p className="mt-1 p-2 text-xl font-semibold">{userData.lastName}</p>
                                )}
                            </div>
                        </div>
                        <div className='flex'>
                            <div className="w-1/2 flex flex-col gap-2 h-full">
                                <label className="text-gray-700 text-sm">Country</label>
                                {isEditing ? (
                                    <ReactFlagsSelect
                                        selected={userData.country.countryCode}
                                        onSelect={handleCountryChange}
                                        className="w-3/4"
                                    />
                                ) : (
                                    <p className="mt-1 p-2 text-xl font-semibold">{userData.country.countryName} ({userData.country.dialCode})</p>
                                )}
                            </div>
                            <div className="w-1/2 flex flex-col gap-2 h-full">
                                <label className="text-gray-700 text-sm">Email</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={userData.email}
                                        onChange={(e) => handleChange('email', e.target.value)}
                                        className="w-3/4 rounded-md border border-gray-300 shadow-sm p-2 text-xl"
                                    />
                                ) : (
                                    <p className="mt-1 p-2 text-xl font-semibold">{userData.email}</p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center items-center">
                        {isEditing ? (
                            <button
                                onClick={handleSave}
                                className="bg-white border border-[#284E82] text-[#284E82] px-4 py-2 rounded mt-4"
                            >
                                Save
                            </button>
                        ) : (
                            <button
                                onClick={handleEdit}
                                className="bg-[white] text-[#284E82] border border-[#284E82] px-4 py-2 rounded mt-4"
                            >
                                Edit Profile
                            </button>
                        )}
                        <button
                            className="bg-white border border-[#284E82] text-[#284E82] px-4 py-2 rounded mt-4 ml-4"
                        >
                            View Booking Details
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
