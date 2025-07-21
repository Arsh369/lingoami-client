import React from 'react';
import {useNavigate} from "react-router-dom";
import { ChevronLeft, Bell, Info, CheckCircle, XCircle } from 'lucide-react';

const NotificationsPage = () => {
  const navigate = useNavigate();
  // Sample notifications data
  const notifications = [
    {
      id: 1,
      type: 'info',
      message: 'Your account settings have been updated successfully.',
      time: '2 hours ago',
    },
    {
      id: 2,
      type: 'success',
      message: 'Your order #12345 has been shipped!',
      time: 'Yesterday',
    },
    {
      id: 3,
      type: 'error',
      message: 'Payment failed for your recent subscription.',
      time: '3 days ago',
    },
    {
      id: 4,
      type: 'info',
      message: 'New features are available! Check them out.',
      time: '1 week ago',
    },
  ];

  const getIconForNotificationType = (type) => {
    switch (type) {
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-inter">
      {/* Header */}
      <header className="bg-white shadow-sm p-4 flex items-center">
        <button 
        onClick={() => navigate("/setting/settingoptions")}
        className="cursor-pointer p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300">
          <ChevronLeft className="h-6 w-6 text-gray-700" />
        </button>
        <h1 className="text-xl font-semibold text-gray-800 ml-4">Notifications</h1>
      </header>

      <main className="p-4">
        <section>
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <div
                  key={notification.id}
                  className={`flex items-start p-4 ${
                    index < notifications.length - 1 ? 'border-b border-gray-200' : ''
                  } hover:bg-gray-50 cursor-pointer`}
                >
                  <div className="flex-shrink-0 mr-3 mt-1">
                    {getIconForNotificationType(notification.type)}
                  </div>
                  <div className="flex-grow">
                    <p className="text-gray-800 text-base leading-snug">{notification.message}</p>
                    <p className="text-sm text-gray-500 mt-1">{notification.time}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">
                No new notifications.
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default NotificationsPage;
