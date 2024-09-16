import React, { useState } from "react";
import {
  Bell,
  MessageSquare,
  FileText,
  Search,
  User,
  Users,
  Briefcase,
  Award,
  BarChart2,
  Settings,
  LogOut,
  ChevronRight,
  Plus,
} from "lucide-react";

const Dashboard = () => {
  const [userType, setUserType] = useState("student");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderDashboard = () => {
    switch (userType) {
      case "student":
        return <StudentDashboard />;
      case "mentor":
        return <MentorDashboard />;
      case "admin":
        return <AdminDashboard />;
      default:
        return <StudentDashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 text-gray-800">
      {/* Sidebar */}
      <div
        className={`bg-indigo-700 text-white transition-all duration-300 ease-in-out ${
          sidebarOpen ? "w-64" : "w-20"
        }`}
      >
        <div className="flex items-center justify-between p-4">
          <h1
            className={`text-2xl font-bold ${sidebarOpen ? "block" : "hidden"}`}
          >
            Incubator
          </h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 rounded-full hover:bg-indigo-600"
          >
            <ChevronRight
              className={`transform transition-transform ${
                sidebarOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
        <nav className="mt-8">
          <NavItem icon={<User />} text="Dashboard" active />
          <NavItem icon={<MessageSquare />} text="Messages" />
          <NavItem icon={<FileText />} text="Files" />
          <NavItem icon={<Bell />} text="Notifications" />
          <NavItem icon={<Settings />} text="Settings" />
          <NavItem icon={<LogOut />} text="Logout" className="mt-auto" />
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img
                    className="h-8 w-8"
                    src="/api/placeholder/32/32"
                    alt="Logo"
                  />
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    <a
                      href="#"
                      className="text-gray-800 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Home
                    </a>
                    <a
                      href="#"
                      className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Projects
                    </a>
                    <a
                      href="#"
                      className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Mentors
                    </a>
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <button className="p-1 rounded-full text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white">
                    <Bell className="h-6 w-6" />
                  </button>
                  <div className="ml-3 relative">
                    <div>
                      <button className="max-w-xs bg-indigo-600 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white">
                        <img
                          className="h-8 w-8 rounded-full"
                          src="/api/placeholder/32/32"
                          alt="User"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-gray-100 p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-semibold text-gray-900 mb-6">
              Welcome back, John!
            </h1>
            <div className="mb-8">
              <select
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="student">Student View</option>
                <option value="mentor">Mentor View</option>
                <option value="admin">Admin View</option>
              </select>
            </div>
            {renderDashboard()}
          </div>
        </main>
      </div>
    </div>
  );
};

const NavItem = ({ icon, text, active, className }) => (
  <a
    href="#"
    className={`flex items-center py-2 px-4 rounded transition-colors duration-200 ${
      active
        ? "bg-indigo-800 text-white"
        : "text-indigo-100 hover:bg-indigo-600"
    } ${className}`}
  >
    {icon}
    <span className="ml-3">{text}</span>
  </a>
);

const StudentDashboard = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <DashboardCard title="My Project" icon={<Briefcase />}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">AI-powered Chatbot</h3>
        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
          In Progress
        </span>
      </div>
      <p className="text-sm text-gray-600 mb-4">
        Build a conversational AI chatbot using natural language processing
        techniques.
      </p>
      <div className="mb-2">
        <div className="flex justify-between text-sm font-medium">
          <span>Progress</span>
          <span>45%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
          <div
            className="bg-indigo-600 h-2.5 rounded-full"
            style={{ width: "45%" }}
          ></div>
        </div>
      </div>
      <button className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-200">
        View Project Details
      </button>
    </DashboardCard>
    <DashboardCard title="My Mentor" icon={<Users />}>
      <div className="flex items-center mb-4">
        <img
          className="h-12 w-12 rounded-full mr-4"
          src="/api/placeholder/48/48"
          alt="Mentor"
        />
        <div>
          <h3 className="text-lg font-semibold">Dr. Jane Smith</h3>
          <p className="text-sm text-gray-600">AI & Machine Learning Expert</p>
        </div>
      </div>
      <div className="mb-4">
        <h4 className="font-medium mb-2">Next Meeting</h4>
        <p className="text-sm text-gray-600">July 15, 2023 at 2:00 PM</p>
      </div>
      <button className="w-full bg-indigo-100 text-indigo-700 py-2 px-4 rounded-md hover:bg-indigo-200 transition-colors duration-200">
        Schedule Meeting
      </button>
    </DashboardCard>
    <DashboardCard title="My Skills" icon={<Award />}>
      <div className="space-y-2">
        <Skill name="Python" level={80} />
        <Skill name="Machine Learning" level={60} />
        <Skill name="Natural Language Processing" level={40} />
      </div>
      <button className="mt-4 w-full bg-indigo-100 text-indigo-700 py-2 px-4 rounded-md hover:bg-indigo-200 transition-colors duration-200">
        Update Skills
      </button>
    </DashboardCard>
  </div>
);

const MentorDashboard = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <DashboardCard title="My Students" icon={<Users />}>
      <ul className="divide-y divide-gray-200">
        <StudentItem name="John Doe" project="AI Chatbot" progress={45} />
        <StudentItem name="Jane Smith" project="Web App" progress={70} />
        <StudentItem
          name="Mike Johnson"
          project="Data Analysis"
          progress={30}
        />
      </ul>
      <button className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-200">
        View All Students
      </button>
    </DashboardCard>
    <DashboardCard title="Upcoming Meetings" icon={<Briefcase />}>
      <ul className="divide-y divide-gray-200">
        <MeetingItem name="John Doe" date="July 15, 2023" time="2:00 PM" />
        <MeetingItem name="Jane Smith" date="July 17, 2023" time="3:30 PM" />
        <MeetingItem name="Mike Johnson" date="July 20, 2023" time="10:00 AM" />
      </ul>
      <button className="mt-4 w-full bg-indigo-100 text-indigo-700 py-2 px-4 rounded-md hover:bg-indigo-200 transition-colors duration-200">
        Schedule New Meeting
      </button>
    </DashboardCard>
    <DashboardCard title="Project Oversight" icon={<BarChart2 />}>
      <div className="space-y-4">
        <ProjectProgress name="AI Chatbot" progress={45} />
        <ProjectProgress name="Web App" progress={70} />
        <ProjectProgress name="Data Analysis" progress={30} />
      </div>
      <button className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-200">
        View All Projects
      </button>
    </DashboardCard>
  </div>
);

const AdminDashboard = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <DashboardCard title="Program Overview" icon={<BarChart2 />}>
      <div className="grid grid-cols-2 gap-4">
        <Stat label="Total Students" value="50" />
        <Stat label="Total Mentors" value="10" />
        <Stat label="Active Projects" value="30" />
        <Stat label="Completed Projects" value="15" />
      </div>
      <button className="mt-6 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-200">
        View Detailed Report
      </button>
    </DashboardCard>
    <DashboardCard title="Recent Activities" icon={<Bell />}>
      <ul className="divide-y divide-gray-200">
        <ActivityItem
          text="John Doe completed AI Chatbot project"
          time="2 hours ago"
        />
        <ActivityItem text="New mentor Dr. Sarah Lee joined" time="1 day ago" />
        <ActivityItem
          text="5 new students enrolled in the program"
          time="3 days ago"
        />
      </ul>
      <button className="mt-4 w-full bg-indigo-100 text-indigo-700 py-2 px-4 rounded-md hover:bg-indigo-200 transition-colors duration-200">
        View All Activities
      </button>
    </DashboardCard>
    <DashboardCard title="Quick Actions" icon={<Plus />}>
      <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-200 mb-4">
        Add New Student
      </button>
      <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-200 mb-4">
        Add New Mentor
      </button>
      <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-200 mb-4">
        Create New Project
      </button>
      <button className="w-full bg-indigo-100 text-indigo-700 py-2 px-4 rounded-md hover:bg-indigo-200 transition-colors duration-200">
        Generate Program Report
      </button>
    </DashboardCard>
  </div>
);

const DashboardCard = ({ title, children, icon }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex items-center mb-4">
      {icon}
      <h2 className="text-xl font-semibold ml-2">{title}</h2>
    </div>
    <div>{children}</div>
  </div>
);

const Skill = ({ name, level }) => (
  <div>
    <div className="flex justify-between text-sm font-medium">
      <span>{name}</span>
      <span>{level}%</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
      <div
        className="bg-indigo-600 h-2.5 rounded-full"
        style={{ width: `${level}%` }}
      ></div>
    </div>
  </div>
);

const StudentItem = ({ name, project, progress }) => (
  <li className="py-3">
    <div className="flex items-center space-x-4">
      <img
        className="h-8 w-8 rounded-full"
        src="/api/placeholder/32/32"
        alt={name}
      />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">{name}</p>
        <p className="text-sm text-gray-500 truncate">{project}</p>
      </div>
      <div className="inline-flex items-center text-base font-semibold text-gray-900">
        {progress}%
      </div>
    </div>
  </li>
);

const MeetingItem = ({ name, date, time }) => (
  <li className="py-3">
    <div className="flex items-center space-x-4">
      <div className="flex-shrink-0">
        <CalendarIcon className="h-6 w-6 text-gray-400" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">{name}</p>
        <p className="text-sm text-gray-500 truncate">
          {date} at {time}
        </p>
      </div>
    </div>
  </li>
);

const ProjectProgress = ({ name, progress }) => (
  <div>
    <div className="flex justify-between text-sm font-medium mb-1">
      <span>{name}</span>
      <span>{progress}%</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div
        className="bg-indigo-600 h-2.5 rounded-full"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  </div>
);

const Stat = ({ label, value }) => (
  <div className="bg-gray-100 p-4 rounded-lg">
    <dt className="text-sm font-medium text-gray-500 truncate">{label}</dt>
    <dd className="mt-1 text-3xl font-semibold text-gray-900">{value}</dd>
  </div>
);

const ActivityItem = ({ text, time }) => (
  <li className="py-3">
    <div className="flex space-x-3">
      <BellIcon className="h-6 w-6 text-gray-400" />
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">{text}</h3>
          <p className="text-sm text-gray-500">{time}</p>
        </div>
      </div>
    </div>
  </li>
);

export default Dashboard;
