import React from "react";
import { BellIcon } from "lucide-react";

const Notifications = () => (
  <div className="fixed inset-0 flex items-center justify-center z-50">
    <div className="bg-white w-96 rounded-lg shadow-xl p-6">
      <h2 className="text-xl font-bold mb-4">Notifications</h2>
      <ul className="divide-y divide-gray-200">
        <NotificationItem
          title="Project Deadline Approaching"
          description="AI Chatbot project due in 3 days"
          time="2 hours ago"
        />
        <NotificationItem
          title="New Message from Mentor"
          description="Dr. Jane Smith sent you a message"
          time="1 day ago"
        />
        <NotificationItem
          title="Skill Assessment Available"
          description="New Python skill assessment is ready"
          time="2 days ago"
        />
      </ul>
      <button className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-200">
        Mark All as Read
      </button>
    </div>
  </div>
);

const NotificationItem = ({ title, description, time }) => (
  <li className="py-4">
    <div className="flex space-x-3">
      <BellIcon className="h-6 w-6 text-indigo-600" />
      <div className="flex-1 space-y-1">
        <h3 className="text-sm font-medium text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
        <p className="text-xs text-gray-400">{time}</p>
      </div>
    </div>
  </li>
);

export default Notifications;
