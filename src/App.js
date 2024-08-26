import React from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import PropertyList from "./Componunts/PropertyList";
import Test from "./Componunts/Test";
import Login from "./Componunts/Login";
import RoomDetails from "./Componunts/RoomDetails";
import RoomOption from "./Componunts/RoomOption";
import View from "./Componunts/View";
import Header from "./Componunts/Header";
import { UserProvider } from "./Componunts/UserContext";
import DateTime from "./Componunts/DateTime";
import BookingForm from "./Componunts/BookingForm";
import PolicyPage from "./Componunts/PolicyPage";
import Footer from "./Componunts/Footer";
import AboutUs from "./Componunts/AboutUs";
import Dashboard from "./Componunts/Admin/Dashboard";
import OrderDetails from "./Componunts/Admin/OrderDetails";
import ThankYou from "./Componunts/ThankYou";
import OrderList from "./Componunts/Admin/OrderList";
import NotFoundPage from "./Componunts/NotFoundPage";
import PrivateRoute from "./Componunts/PrivateRoute";
import CalendarSlot from './Componunts/Member/CalendarSlot';
import SlotDetail from './Componunts/Member/SlotDetail';
import MemberBookingForm from './Componunts/Member/MemberBookingForm';
import PreviousOrder from "./Componunts/Member/PreviousOrder";
import { OrderProvider } from "./Componunts/Admin/OrderContext";


const App = () => {
  return (
    <UserProvider>
    <OrderProvider>
      <Router>
        <Header />

        <Routes>
          <Route path="/" element={<PropertyList />} />
          <Route path="/roomoption/:id" element={<RoomOption />} />
          <Route path="/roomoption/:id/roomDetails/:roomId" element={<RoomDetails />} />
          <Route path="/policy" element={<PolicyPage />} />
          <Route path="/aboutus" element={<AboutUs />} />

          <Route path="/roomoption/:id/roomDetails/:roomId/login" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/roomoption/:id/roomDetails/:roomId/login/datetime/:roomId" element={<DateTime />} />

          <Route path="/previousorder" element={<PreviousOrder />} />


          {/* Protected Routes */}
          {/* ADMIN */}
          <Route path="/dashboard" element={<PrivateRoute element={Dashboard} />} />
          <Route path="/orderlist" element={<PrivateRoute element={OrderList} />} />
          <Route path="/orderDetails/:id" element={<PrivateRoute element={OrderDetails} />} />
          <Route path="/login/datetime/:id/bookingform" element={<PrivateRoute element={BookingForm} />} />
          <Route path="/datetime" element={<PrivateRoute element={DateTime} />} />
          <Route path="/thankyou" element={<PrivateRoute element={ThankYou} />} />

          {/* MEMBER */}
          <Route path="/calendarSlot" element={<CalendarSlot />} />
          <Route path="/slotDetail/:p_id" element={<SlotDetail />} />
          <Route path="/:p_id/memberbookingform" element={<MemberBookingForm />} />


          {/* TEST PAGES */}
          <Route path="/view" element={<View />} />
          <Route path="/test" element={<Test />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>

        <Footer />
      </Router>
      </OrderProvider>
    </UserProvider>
  );
};

export default App;

// import React from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';

// // import CalendarSlot from './Components/Member/CalendarSlot'; // Make sure the path is correct

// function App() {
//   return (
//     <div className="App">
//       <BrowserRouter>
//         <Routes>
//           <Route path="/calendarSlot" element={<CalendarSlot />} />
//           <Route path="/slotDetail/:p_id" element={<SlotDetail />} />
//           <Route path="/:p_id/memberbookingform" element={<MemberBookingForm />} />

          

//           {/* Add other routes here */}
//           <Route path="*" element={<div>404 Not Found</div>} />
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;
