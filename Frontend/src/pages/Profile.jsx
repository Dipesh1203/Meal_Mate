import React from 'react';
import { useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import BusinessIcon from '@mui/icons-material/Business';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import MapComponent from './../components/map';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

export default function Profile() {
  const currentUser = useSelector((state) => state.user.currentUser);

  if (!currentUser) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <CircularProgress />
      </div>
    );
  }

  const { entity_name, email, phone, address, latitude, longitude, legal_identity } = currentUser;

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-6">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-xl transform transition duration-500 mb-10">
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-gradient-to-r from-gray-500 to-gray-700 rounded-full mx-auto mb-4 shadow-lg overflow-hidden">
            <img src="/mascot.png" alt="Profile" className="w-full h-full object-cover" />
          </div>
          <h2 className="text-3xl font-semibold text-gray-800 mb-1">{entity_name}</h2>
          <p className="text-md text-gray-500 uppercase tracking-wider">Provider</p>
          <div className='flex justify-center' >
          <Stack spacing={1} >
          <Rating name="half-rating-read" defaultValue={4.0} precision={0.5} readOnly />
          
          </Stack>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-4 bg-gray-100 p-4 rounded-lg shadow-sm">
            <BusinessIcon className="text-gray-600" />
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Entity Name</h3>
              <p className="text-gray-600">{entity_name}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 bg-gray-100 p-4 rounded-lg shadow-sm">
            <MailOutlineIcon className="text-gray-600" />
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Email</h3>
              <p className="text-gray-600">{email}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 bg-gray-100 p-4 rounded-lg shadow-sm">
            <PhoneIcon className="text-gray-600" />
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Phone</h3>
              <p className="text-gray-600">{phone}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 bg-gray-100 p-4 rounded-lg shadow-sm">
            <LocationOnIcon className="text-gray-600" />
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Address</h3>
              <p className="text-gray-600">{address}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 bg-gray-100 p-4 rounded-lg shadow-sm">
            <VerifiedUserIcon className="text-gray-600" />
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Legal Identity</h3>
              <p className="text-gray-600">{legal_identity}</p>
            </div>
          </div>
        </div>
      </div>

    
    </div>
  );
}
