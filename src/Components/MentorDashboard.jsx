import React from "react";

const MentorDashboard = () => {
  // Mock data (replace with actual data fetching)
  const mentorInfo = {
    name: "Dr. Jane Smith",
    expertise: "AI/ML",
    students: [
      { name: "John Doe", project: "AI-powered Chatbot", progress: 65 },
      {
        name: "Alice Johnson",
        project: "Machine Learning for IoT",
        progress: 80,
      },
    ],
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-3xl font-bold mb-6">Mentor Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Mentor Information</h2>
          <p>
            <strong>Name:</strong> {mentorInfo.name}
          </p>
          <p>
            <strong>Expertise:</strong> {mentorInfo.expertise}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Assigned Students</h2>
          <ul>
            {mentorInfo.students.map((student, index) => (
              <li key={index} className="mb-4">
                <p>
                  <strong>{student.name}</strong>
                </p>
                <p>Project: {student.project}</p>
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div
                      className="bg-green-600 h-2.5 rounded-full"
                      style={{ width: `${student.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-right">{student.progress}%</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Add more sections for project oversight, feedback, etc. */}
    </div>
  );
};

export default MentorDashboard;
