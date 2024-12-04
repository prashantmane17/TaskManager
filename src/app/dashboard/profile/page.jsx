"use client"
import React from 'react';
import { Mail, Phone, Users, UserCircle, CheckCircle2, Clock, BarChart2, Target, Camera } from 'lucide-react';
import { useUser } from '@/context/UserContext';

function App() {

    const {userData} = useUser();
  const profileData = {
    name: "John Doe",
    photoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    dateOfBirth: "1990-05-15",
    mobileNumber: "+1 (555) 123-4567",
    teamId: "TEAM-001",
    manager: "Jane Smith",
    taskStats: {
      totalCompleted: 145,
      completedToday: 5,
      weeklyGoal: 25,
      weeklyProgress: 18
    },
    recentTasks: [
      { id: "1", title: "Complete Q1 Report Review", completedAt: new Date(2024, 2, 19, 14, 30) },
      { id: "2", title: "Team Sync Meeting", completedAt: new Date(2024, 2, 19, 11, 0) },
      { id: "3", title: "Update Documentation", completedAt: new Date(2024, 2, 19, 10, 15) },
      { id: "4", title: "Code Review: Feature X", completedAt: new Date(2024, 2, 19, 9, 45) },
      { id: "5", title: "Client Presentation Prep", completedAt: new Date(2024, 2, 19, 9, 0) }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Profile Photo */}
            <div className="relative">
              <img
                src={profileData.photoUrl}
                alt={profileData.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <div className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-md">
                <Camera className="w-4 h-4 text-gray-600" />
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center md:text-left">
                {userData.name}
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Emial</p>
                    <p className="font-medium">{userData.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Mobile</p>
                    <p className="font-medium">{profileData.mobileNumber}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Team ID</p>
                    <p className="font-medium">{profileData.teamId}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <UserCircle className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Manager</p>
                    <p className="font-medium">{profileData.manager}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Task Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Completed</p>
                <p className="text-2xl font-bold text-gray-900">{profileData.taskStats.totalCompleted}</p>
              </div>
              <CheckCircle2 className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Completed Today</p>
                <p className="text-2xl font-bold text-gray-900">{profileData.taskStats.completedToday}</p>
              </div>
              <Clock className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Weekly Goal</p>
                <p className="text-2xl font-bold text-gray-900">{profileData.taskStats.weeklyGoal}</p>
              </div>
              <Target className="w-8 h-8 text-purple-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Weekly Progress</p>
                <p className="text-2xl font-bold text-gray-900">{profileData.taskStats.weeklyProgress}</p>
              </div>
              <BarChart2 className="w-8 h-8 text-orange-500" />
            </div>
          </div>
        </div>

        {/* Recent Tasks */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recently Completed Tasks</h2>
          <div className="space-y-4">
            {profileData.recentTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span className="font-medium text-gray-900">{task.title}</span>
                </div>
                <span className="text-sm text-gray-500">
                  {task.completedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;