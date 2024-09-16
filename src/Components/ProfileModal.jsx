import React from "react";

const ProfileModal = ({ user }) => (
  <div className="fixed inset-0 flex items-center justify-center z-50">
    <div className="bg-white w-96 rounded-lg shadow-xl p-6">
      <div className="flex items-center space-x-4 mb-6">
        <img
          className="h-16 w-16 rounded-full"
          src="/api/placeholder/64/64"
          alt={user.name}
        />
        <div>
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-gray-600">{user.role}</p>
        </div>
      </div>
      <div className="space-y-4">
        <ProfileField label="Email" value={user.email} />
        <ProfileField label="Specialization" value={user.specialization} />
        <ProfileField label="Year" value={user.year} />
      </div>
      <button className="mt-6 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-200">
        Edit Profile
      </button>
    </div>
  </div>
);

const ProfileField = ({ label, value }) => (
  <div>
    <dt className="text-sm font-medium text-gray-500">{label}</dt>
    <dd className="mt-1 text-sm text-gray-900">{value}</dd>
  </div>
);

export default ProfileModal;
