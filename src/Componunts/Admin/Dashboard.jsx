import React from 'react';

// import Property_List from './Property_List'
import { useUser } from '../UserContext';
import OrderDetails from './OrderDetails';
import OrderList from './OrderList';
import Sidebar from './Sidebar';
import RoomOption from '../RoomOption';
import CalendarSlot from '../Member/CalendarSlot';
// import OrderDetails from './OrderDetails';

const Dashboard = () => {
  const { user } = useUser();

  const renderContent = () => {
    switch (user?.role) {
      case 'admin':
        return <AdminDashboard />;
      case 'member':
        return <MemberDashboard />;
      default:
        return <div>Unknown role</div>;
    }
  };

  return (
    <div className="flex"
    style={{
           background: 'rgb(201,213,255)',
           backgroundImage: 'linear-gradient(0deg, rgba(201,213,255,1) 0%, rgba(255,255,255,1) 100%)'
         }}
    >
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl text-center font-bold mb-4">
          Welcome {user.role} Dashboard
        </h1>
        {renderContent()}
      </div>
    </div>
  );
};

const AdminDashboard = () => (
  <div>
    {/* <h2>Admin Dashboard</h2> */}
    <OrderList/>
  </div>
);

const MemberDashboard = () => (
  <div>
    {/* <h2>Member Dashboard</h2> */}
    {/* Add member-specific content here */}
    <CalendarSlot/>

  </div>
);


export default Dashboard;
