import React, { useState, useEffect } from "react";
import axios from "axios";

const StudentDashboard = () => {
  const [studentInfo, setStudentInfo] = useState({
    name: "",
    year: "",
    specialization: "",
    project: "",
    mentor: "",
    progress: 0,
  });
  const [milestones, setMilestones] = useState([]);
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    fetchStudentData();
  }, []);

  const fetchStudentData = async () => {
    try {
      const studentResponse = await axios.get("/api/student/info");
      setStudentInfo(studentResponse.data);

      const milestonesResponse = await axios.get("/api/student/milestones");
      setMilestones(milestonesResponse.data);

      const feedbackResponse = await axios.get("/api/student/feedback");
      setFeedback(feedbackResponse.data);
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-3xl font-bold mb-6">Student Dashboard</h1>

      {/* Personal Information */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
        <p>
          <strong>Name:</strong> {studentInfo.name}
        </p>
        <p>
          <strong>Year:</strong> {studentInfo.year}
        </p>
        <p>
          <strong>Specialization:</strong> {studentInfo.specialization}
        </p>
      </div>

      {/* Project Details */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Project Details</h2>
        <p>
          <strong>Project:</strong> {studentInfo.project}
        </p>
        <p>
          <strong>Mentor:</strong> {studentInfo.mentor}
        </p>
        <div className="mt-4">
          <p>
            <strong>Progress:</strong>
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${studentInfo.progress}%` }}
            ></div>
          </div>
          <p className="text-right">{studentInfo.progress}%</p>
        </div>
      </div>

      {/* Milestones */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Milestones</h2>
        <ul className="list-disc pl-5">
          {milestones.map((milestone, index) => (
            <li key={index} className="mb-2">
              <span
                className={
                  milestone.completed ? "line-through text-gray-500" : ""
                }
              >
                {milestone.description}
              </span>
              {milestone.completed && (
                <span className="ml-2 text-green-500">✓</span>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Feedback */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Feedback</h2>
        {feedback.map((item, index) => (
          <div key={index} className="mb-4 p-4 bg-gray-100 rounded">
            <p className="font-semibold">{item.from}</p>
            <p className="text-gray-700">{item.message}</p>
            <p className="text-sm text-gray-500 mt-2">{item.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentDashboard;
