// import React, { useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { useUser } from "./UserContext";
// import axios from "axios";

// const Login = () => {
//   const { id, roomId } = useParams(); // Fetching room ID and roomOption ID from URL
//   const [userId, setUserId] = useState("");
//   const [otp, setOtp] = useState("");
//   const [otpSent, setOtpSent] = useState(false);
//   const [notification, setNotification] = useState(""); // State for notification
//   const { setUser } = useUser();
//   const navigate = useNavigate();
//   const [validEmail, setValidEmail] = useState(true); // Default to true initially

//   // Regular expression for basic email validation
//   const validateEmail = (email) => {
//     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return regex.test(email);
//   };

//   // Function to fetch user role
//   const fetchUserRole = async (email) => {
//     try {
//       const response = await axios.get('https://getcabinspace.nagpur.pro/api/user/getUserRole.php', { params: { email } });
//       return response.data.role;
//     } catch (error) {
//       console.error("Failed to fetch user role:", error);
//       return "guest"; // Default to guest if there's an error
//     }
//   };

//   const handleSendOTP = async () => {
//     try {
//       console.log("HandleSendOTP function triggered"); // Log to check if function is called
//       const lowerCaseUserId = userId.trim().toLowerCase();
//       if (!validEmail || !userId.trim()) {
//         alert("Please enter a valid email address.");
//         return;
//       }
  
//       console.log(`Sending OTP to: ${lowerCaseUserId}`);
  
//       // Call your backend API to send or resend OTP
//       const response = await axios.post('https://getcabinspace.nagpur.pro/api/user/sendOtp.php', { email: lowerCaseUserId });
  
//       console.log("Response from server:", response.data);
//       if (response.data.success) {
//         console.log(`OTP sent to ${lowerCaseUserId}`);
//         setOtpSent(true);
//         setNotification("OTP is sent to your email"); // Set notification message
  
//         // Hide notification after 2 seconds
//         setTimeout(() => setNotification(""), 3000);
//       } else {
//         alert("Failed to send OTP. Please try again later.");
//       }
//     } catch (error) {
//       console.error("Failed to send OTP:", error);
//       alert("Failed to send OTP. Please try again later.");
//     }
//   };

//   const handleLogin = async () => {
//     try {
//       const lowerCaseUserId = userId.trim().toLowerCase();
  
//       if (!lowerCaseUserId || !otp) {
//         alert("Please enter both email and OTP.");
//         return;
//       }
  
//       const otpResponse = await axios.post('https://getcabinspace.nagpur.pro/api/user/verifyOtp.php', { email: lowerCaseUserId, otp });
  
//       if (otpResponse.data.success) {
//         // OTP is correct, proceed with fetching user role
//         const role = await fetchUserRole(lowerCaseUserId);
//         const loggedInUser = { email: lowerCaseUserId, role };

//         if (role === "member") {
//           loggedInUser.userEmail = lowerCaseUserId; // Set userEmail if the role is member
//         }

//         setUser(loggedInUser);
  
//         if (role === "admin" || role === "member") {
//           navigate("/dashboard");
//         } else {
//           navigate(`/roomoption/${id}/roomDetails/${roomId}/login/datetime/${roomId}`);
//         }
//       } else {
//         // OTP is incorrect, alert the user
//         alert(otpResponse.data.message);
//       }
//     } catch (error) {
//       console.error("Login failed:", error);
//       alert("Login failed. Please try again later.");
//     }
//   };

//   return (
//     <div
//       style={{
//         background: 'rgb(201,213,255)',
//         backgroundImage: 'linear-gradient(0deg, rgba(201,213,255,1) 0%, rgba(255,255,255,1) 100%)'
//       }}
//     >
//       <h1 className="text-sm p-1 my-2 text-white bg-black text-center">
//         Enter your email to receive a one-time password (OTP) for secure login.
//       </h1>
//       <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-md w-full bg-white shadow-lg rounded-lg overflow-hidden">
//           <div className="px-6 py-8">
//             <div className="mb-6">
//               <h2 className="text-2xl font-bold text-center">Login with OTP</h2>
//             </div>
//             <form className="space-y-4">
//               <div>
//                 <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                   Email address
//                 </label>
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   required
//                   value={userId}
//                   onChange={(e) => {
//                     setUserId(e.target.value);
//                     setValidEmail(validateEmail(e.target.value));
//                   }}
//                   className={`mt-1 block w-full px-3 py-2 border ${validEmail ? "border-gray-300" : "border-red-500"} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
//                   placeholder="you@example.com"
//                 />
//                 {!validEmail && (
//                   <p className="mt-2 text-sm text-red-600" id="email-error">
//                     Please enter a valid email address.
//                   </p>
//                 )}
//               </div>

//               {!otpSent ? (
//                 <button
//                   type="button"
//                   onClick={handleSendOTP}
//                   className={`w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${validEmail ? "" : "opacity-50 cursor-not-allowed"}`}
//                   disabled={!validEmail}
//                 >
//                   Send OTP
//                 </button>
//               ) : (
//                 <div>
//                   <div className="mb-4">
//                     <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
//                       One-time password (OTP)
//                     </label>
//                     <input
//                       id="otp"
//                       name="otp"
//                       type="number"
//                       required
//                       value={otp}
//                       onChange={(e) => setOtp(e.target.value)}
//                       className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                       placeholder="Enter OTP"
//                     />
//                   </div>
//                   <div className="flex justify-between">
//                     <button
//                       type="button"
//                       onClick={handleLogin}
//                       className="w-full py-2 mx-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                     >
//                       Login
//                     </button>
//                     <button
//                       type="button"
//                       onClick={handleSendOTP}
//                       className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-600 bg-blue-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
//                     >
//                       Resend OTP
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </form>
//           </div>
//         </div>

//         {/* Notification Pop-up */}
//         {notification && (
//           <div className="fixed inset-0 flex items-center justify-center z-50">
//             <div className="bg-green-600 text-white py-2 px-4 rounded-lg shadow-lg">
//               {notification}
//             </div>
//           </div>
//         )}

//         <div className="mt-4 max-w-md w-full bg-white shadow-lg rounded-lg p-4 text-sm text-gray-700">
//           <h1 className="text-base font-semibold text-black text-center p-2 underline">Instructions</h1>
//           <ul className="list-disc ml-6 mb-4">
//             <li className="mb-2">
//               If you don't receive an OTP, please check your spam folder or try again.
//             </li>
//             <li>Your email will only be used for login purposes.</li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "./UserContext";
import axios from "axios";

const Login = () => {
  const { id, roomId } = useParams(); // Fetching room ID and roomOption ID from URL
  const [userId, setUserId] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [notification, setNotification] = useState(""); // State for notification
  const { setUser } = useUser();
  const navigate = useNavigate();
  const [validEmail, setValidEmail] = useState(true); // Default to true initially

  // Regular expression for basic email validation
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Function to fetch user role
  const fetchUserRole = async (email) => {
    try {
      const response = await axios.get('https://getcabinspace.nagpur.pro/api/user/getUserRole.php', { params: { email } });
      return response.data.role;
    } catch (error) {
      console.error("Failed to fetch user role:", error);
      return "guest"; // Default to guest if there's an error
    }
  };

const handleSendOTP = async (event) => {
  event.preventDefault(); // Prevent the default form submission

  try {
    console.log("HandleSendOTP function triggered");
    const lowerCaseUserId = userId.trim().toLowerCase();
    if (!validEmail || !userId.trim()) {
      alert("Please enter a valid email address.");
      return;
    }

    console.log(`Sending OTP to: ${lowerCaseUserId}`);

    // Call your backend API to send or resend OTP
    const response = await axios.post('https://getcabinspace.nagpur.pro/api/user/sendOtp.php', { email: lowerCaseUserId });

    console.log("Response from server:", response.data);
    if (response.data.success) {
      console.log(`OTP sent to ${lowerCaseUserId}`);
      setOtpSent(true);
      setNotification("OTP is sent to your email");

      // Hide notification after 2 seconds
      setTimeout(() => setNotification(""), 3000);
    } else {
      alert("Failed to send OTP. Please try again later.");
    }
  } catch (error) {
    console.error("Failed to send OTP:", error);
    alert("Failed to send OTP. Please try again later.");
  }
};


  const handleLogin = async () => {
    try {
      const lowerCaseUserId = userId.trim().toLowerCase();
  
      if (!lowerCaseUserId || !otp) {
        alert("Please enter both email and OTP.");
        return;
      }
  
      const otpResponse = await axios.post('https://getcabinspace.nagpur.pro/api/user/verifyOtp.php', { email: lowerCaseUserId, otp });
  
      if (otpResponse.data.success) {
        // OTP is correct, proceed with fetching user role
        const role = await fetchUserRole(lowerCaseUserId);
        const loggedInUser = { email: lowerCaseUserId, role };

        if (role === "member") {
          loggedInUser.userEmail = lowerCaseUserId; // Set userEmail if the role is member
        }

        setUser(loggedInUser);
  
        if (role === "admin" || role === "member") {
          navigate("/dashboard");
        } else {
          navigate(`/roomoption/${id}/roomDetails/${roomId}/login/datetime/${roomId}`);
        }
      } else {
        // OTP is incorrect, alert the user
        alert(otpResponse.data.message);
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please try again later.");
    }
  };

  return (
    <div
      style={{
        background: 'rgb(201,213,255)',
        backgroundImage: 'linear-gradient(0deg, rgba(201,213,255,1) 0%, rgba(255,255,255,1) 100%)'
      }}
    >
      <h1 className="text-sm p-1 my-2 text-white bg-black text-center">
        Enter your email to receive a one-time password (OTP) for secure login.
      </h1>
      <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-center">Login with OTP</h2>
            </div>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={userId}
                  onChange={(e) => {
                    setUserId(e.target.value);
                    setValidEmail(validateEmail(e.target.value));
                  }}
                  className={`mt-1 block w-full px-3 py-2 border ${validEmail ? "border-gray-300" : "border-red-500"} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  placeholder="you@example.com"
                />
                {!validEmail && (
                  <p className="mt-2 text-sm text-red-600" id="email-error">
                    Please enter a valid email address.
                  </p>
                )}
              </div>

              {!otpSent ? (
                <button
                  type="button"
                  onClick={handleSendOTP}
                  className={`w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${validEmail ? "" : "opacity-50 cursor-not-allowed"}`}
                  disabled={!validEmail}
                >
                  Send OTP
                </button>
              ) : (
                <div>
                  <div className="mb-4">
                    <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                      One-time password (OTP)
                    </label>
                    <input
                      id="otp"
                      name="otp"
                      type="number"
                      required
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Enter OTP"
                    />
                  </div>
                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={handleLogin}
                      className="w-full py-2 mx-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Login
                    </button>
                    <button
                      type="button"
                      onClick={handleSendOTP}
                      className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-600 bg-blue-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                      Resend OTP
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Notification Pop-up */}
        {notification && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-green-600 text-white py-2 px-4 rounded-lg shadow-lg">
              {notification}
            </div>
          </div>
        )}

        <div className="mt-4 max-w-md w-full bg-white shadow-lg rounded-lg p-4 text-sm text-gray-700">
          <h1 className="text-base font-semibold text-black text-center p-2 underline">Instructions</h1>
          <ul className="list-disc ml-6 mb-4">
            <li className="mb-2">
              If you don't receive an OTP, please check your spam folder or try again.
            </li>
            <li>Your email will only be used for login purposes.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Login;
