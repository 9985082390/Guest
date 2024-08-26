// // Sidebar.js
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useUser } from '../UserContext';

// const adminLinks = [
//   { name: 'Admin Dashboard', href: '/dashboard' },
//   // { name: 'Settings', href: '/settings' },
// ];

// const memberLinks = [
//   { name: 'Dashboard', href: '/dashboard' },
//   // { name: 'Book Room', href: '/book-room' },
//   { name: 'Previous Order', href: '/previousorder' },
// ];

// const Sidebar = () => {
//   const { user } = useUser();
//   const links = user?.role === 'admin' ? adminLinks : memberLinks;

//   return (
//     <div className="w-64 bg-gray-800 text-white min-h-screen">
//       <div className="p-4">
//         <h2 className="text-xl font-semibold mb-4 border-b text-center border-gray-600 pb-2">Menu</h2>
//         <ul>
//           {links.map((link, index) => (
//             <li key={link.href} className={'mb-2 '}>
//               <Link
//                 to={link.href}
//                 className="block py-2 px-4 rounded hover:bg-gray-700"
//               >
//                 {link.name}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../UserContext';

const adminLinks = [
  { name: 'Admin Dashboard', href: '/dashboard' },
  // { name: 'Settings', href: '/settings' },
];

const memberLinks = [
  { name: 'Dashboard', href: '/dashboard' },
  // { name: 'Book Room', href: '/book-room' },
  { name: 'Previous Order', href: '/previousorder' },
];

const Sidebar = () => {
  const { user } = useUser();
  const links = user?.role === 'admin' ? adminLinks : memberLinks;

  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen hidden md:block">
      {/* The `md:block` class makes the sidebar visible for medium screens and up */}
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4 border-b text-center border-gray-600 pb-2">Menu</h2>
        <ul>
          {links.map((link, index) => (
            <li key={link.href} className={'mb-2 '}>
              <Link
                to={link.href}
                className="block py-2 px-4 rounded hover:bg-gray-700"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

