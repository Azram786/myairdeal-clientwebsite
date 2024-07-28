// src/components/UserProfile.js
import React, { useState } from 'react';

const UserProfile = () => {
  const initialData = {
    name: 'John Doe',
    email: 'john.doe@gmail.com',
    password: '********',
    phone: '+1 000-000-0000',
    address: 'St 32 main downtown, Los Angeles, California, USA',
    dob: '01-01-1992'
  };

  const [userData, setUserData] = useState(initialData);
  const [isEditing, setIsEditing] = useState({
    name: false,
    email: false,
    password: false,
    phone: false,
    address: false,
    dob: false
  });

  const handleEdit = (field) => {
    setIsEditing({ ...isEditing, [field]: true });
  };

  const handleChange = (field, value) => {
    setUserData({ ...userData, [field]: value });
  };

  const handleSave = (field) => {
    setIsEditing({ ...isEditing, [field]: false });
    // Here you can add your API call to save the updated data
  };

  return (
    <div className="max-w-2xl mx-auto my-8">
      <div className="bg-blue-500 text-white p-6 rounded-t-lg text-center">
        <img
          src="https://via.placeholder.com/100"
          alt="Profile"
          className="rounded-full mx-auto mb-4"
        />
        <h1 className="text-2xl font-bold">{userData.name}</h1>
        <p>{userData.email}</p>
      </div>
      <div className="bg-white p-6 rounded-b-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Profile</h2>
        {Object.keys(userData).map(field => (
          <div key={field} className="flex justify-between items-center mb-4">
            <div className="flex-grow">
              <label className="block text-gray-700">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              {isEditing[field] ? (
                <input
                  type={field === 'password' ? 'password' : 'text'}
                  value={userData[field]}
                  onChange={(e) => handleChange(field, e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              ) : (
                <p className="mt-1 block w-full">{userData[field]}</p>
              )}
            </div>
            {isEditing[field] ? (
              <button
                onClick={() => handleSave(field)}
                className="ml-4 bg-green-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => handleEdit(field)}
                className="ml-4 bg-blue-500 text-white px-4 py-2 rounded"
              >
                Change
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
