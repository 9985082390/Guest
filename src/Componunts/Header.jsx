// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useUser } from './UserContext';
// import { RxHamburgerMenu } from 'react-icons/rx';
// import { FiLogOut } from 'react-icons/fi';

// const Header = () => {
//   const { user, logout } = useUser();
//   const navigate = useNavigate();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const handleLogout = () => {
//     logout();
//     navigate('/');
//   };

//   return (
//     <header className="w-full bg-transparent p-4 px-6 md:px-8 flex justify-between items-center border-b border-gray-200">
//       <a href="/" className="flex items-center">
//         <img alt='icon' src='../getcabinspace_logo.png' className='w-28 md:w-32 h-auto' />
//       </a>
//       <div className="relative">
//         {/* Hamburger Icon */}
//         <button
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//           aria-expanded={isMenuOpen}
//           className="md:hidden text-gray-700 focus:outline-none"
//         >
//           <RxHamburgerMenu className="text-2xl" />
//         </button>

//         {/* Mobile Menu */}
//         <nav
//           className={`md:flex md:space-x-10 absolute top-full right-0 mt-2 ${isMenuOpen ? 'w-32 text-sm' : 'w-full'} bg-white shadow-lg md:shadow-none ${isMenuOpen ? 'block' : 'hidden'} md:static z-10`}
//         >
//           <div className="flex flex-col md:flex-row items-center p-4 space-y-2 md:space-y-0 md:space-x-6">
//             <a href="/" className="text-sm sm:text-sm md:text-lg lg:text-xl">Our Cabins</a>
//             {/* Separator for mobile view */}
//             {isMenuOpen && (
//               <div className="w-full border-t border-gray-300 md:hidden"></div>
//             )}
//             <a href="/aboutus" className="text-sm sm:text-sm md:text-lg lg:text-xl">About Us</a>
//           </div>
//           {user && (
//         <div className="flex sm:text-center justify-center sm:pb-2 sm:mt-0  items-center mt-2 md:mt-0 ml-auto md:ml-2">
//           {/* Adjusted margin for large screens */}
//           <button className="flex items-center space-x-1 text-sm" onClick={handleLogout}>
//             <FiLogOut className="text-xl" /> <span>Logout</span>
//           </button>
//         </div>
//       )}
//         </nav>
//       </div>

//     </header>
//   );
// };

// export default Header;

// import { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { useUser } from './UserContext';
// import { RxHamburgerMenu } from 'react-icons/rx';
// import { FiLogOut } from 'react-icons/fi';

// const adminLinks = [
//   { name: 'Admin Dashboard', href: '/dashboard' },
// ];

// const memberLinks = [
//   { name: 'Dashboard', href: '/dashboard' },
//   { name: 'Previous Order', href: '/previousorder' },
// ];

// const Header = () => {
//   const { user, logout } = useUser();
//   const navigate = useNavigate();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const handleLogout = () => {
//     logout();
//     navigate('/');
//   };

//   // Determine which set of links to show based on user role
//   let links = [];
//   if (user?.role === 'admin') {
//     links = adminLinks;
//   } else if (user?.role === 'member') {
//     links = memberLinks;
//   }

//   return (
//     <header className="w-full bg-transparent p-4 px-6 md:px-8 flex justify-between items-center border-b border-gray-200">
//       <a href="/" className="flex items-center">
//         <img alt="icon" src="../getcabinspace_logo.png" className="w-28 md:w-32 h-auto" />
//       </a>
//       <div className="relative">
//         {/* Hamburger Icon */}
//         <button
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//           aria-expanded={isMenuOpen}
//           className="md:hidden text-gray-700 focus:outline-none"
//         >
//           <RxHamburgerMenu className="text-2xl" />
//         </button>

//         {/* Mobile Menu with Sidebar Links */}
//         <nav
//           className={`md:flex md:space-x-10 absolute top-full right-0 mt-2 w-64 bg-gray-800 text-white shadow-lg md:shadow-none ${isMenuOpen ? 'block' : 'hidden'} md:static z-10`}
//         >
//           <div className="p-4">
//             <h2 className="text-xl font-semibold mb-4 border-b text-center border-gray-600 pb-2">Menu</h2>
//             <ul>
//               <li className="mb-2">
//                 <Link
//                   to="/"
//                   className="block py-2 px-4 rounded hover:bg-gray-700"
//                   onClick={() => setIsMenuOpen(false)} // Close menu after click
//                 >
//                   Our Cabins
//                 </Link>
//               </li>
//               <li className="mb-2">
//                 <Link
//                   to="/aboutus"
//                   className="block py-2 px-4 rounded hover:bg-gray-700"
//                   onClick={() => setIsMenuOpen(false)} // Close menu after click
//                 >
//                   About Us
//                 </Link>
//               </li>
//               {/* Role-specific Links */}
//               {links.map((link) => (
//                 <li key={link.href} className="mb-2">
//                   <Link
//                     to={link.href}
//                     className="block py-2 px-4 rounded hover:bg-gray-700"
//                     onClick={() => setIsMenuOpen(false)} // Close menu after click
//                   >
//                     {link.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>
//           {user && (
//             <div className="flex sm:text-center justify-center sm:pb-2 sm:mt-0 items-center mt-2 md:mt-0 ml-auto md:ml-2 p-4">
//               <button className="flex items-center space-x-1 text-sm" onClick={handleLogout}>
//                 <FiLogOut className="text-xl" /> <span>Logout</span>
//               </button>
//             </div>
//           )}
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Header;

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "./UserContext";
import { RxHamburgerMenu } from "react-icons/rx";
import { FiLogOut } from "react-icons/fi";

const adminLinks = [{ name: "Admin Dashboard", href: "/dashboard" }];

const memberLinks = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Previous Order", href: "/previousorder" },
];

const Header = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  let links = [];
  if (user?.role === "admin") {
    links = adminLinks;
  } else if (user?.role === "member") {
    links = memberLinks;
  }

  return (
    <header className="w-full bg-transparent p-4 px-6 md:px-8 flex justify-between items-center border-b border-gray-200">
      <a href="/" className="flex items-center">
        <img
          alt="icon"
          src="../getcabinspace_logo.png"
          className="w-28 md:w-32 h-auto"
        />
      </a>
      <div className="relative flex items-center space-x-6">
        {/* Menu Links (Always Visible on MD+) */}
        <nav className="hidden md:flex space-x-10">
          <Link to="/" className="hover:text-gray-700">
            Our Cabins
          </Link>
          <Link to="/aboutus" className="hover:text-gray-700">
            About Us
          </Link>
        </nav>

        {/* Hamburger Icon (Visible on Mobile) */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          className="md:hidden text-gray-700 focus:outline-none"
        >
          <RxHamburgerMenu className="text-2xl" />
        </button>

        {/* Dropdown Menu for Mobile */}
        {isMenuOpen && (
          <nav className="absolute text-center top-full right-0  w-48 bg-gray-600 text-white shadow-lg md:hidden">
            <h2 className="text-xl font-semibold border-b-2 text-center border-white py-2">
              Menu
            </h2>
            <Link
              to="/"
              className="block py-2 px-4 hover:bg-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Our Cabins
            </Link>
            <Link
              to="/aboutus"
              className="block py-2 px-4 hover:bg-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            {links.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="block py-2 px-4 hover:bg-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {user && (
              <div className="flex mb-1 justify-center">
                <div className="py-2 px-4 hover:bg-gray-700">
                  <button
                    className="flex items-center space-x-1 text-sm"
                    onClick={handleLogout}
                  >
                    <FiLogOut className="text-xl" /> <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
