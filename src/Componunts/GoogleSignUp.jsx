// src/components/GoogleSignUp.jsx
import React from 'react';
import { GoogleLogin } from 'react-google-login';

const GoogleSignUp = () => {
  const handleLoginSuccess = (response) => {
    console.log('Login Success: ', response.profileObj);
  };

  const handleLoginFailure = (response) => {
    console.log('Login Failed: ', response);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
        <GoogleLogin
          clientId="AIzaSyAVmMiiburLsk3_i7Z9-P3iTQP8_qwKLSQ"
          buttonText="Sign Up with Google"
          onSuccess={handleLoginSuccess}
          onFailure={handleLoginFailure}
          cookiePolicy={'single_host_origin'}
          className="w-full flex items-center justify-center"
        />
      </div>
    </div>
  );
};

export default GoogleSignUp;
