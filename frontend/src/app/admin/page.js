"use client";

import { useState } from 'react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('movies');

  return (
    <div className="min-h-screen bg-[#141414] text-white pt-24 px-4 md:px-12">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-gray-900 rounded-lg p-4 h-fit border border-gray-800">
          <ul className="space-y-2">
            <li>
              <button 
                className={`w-full text-left px-4 py-2 rounded ${activeTab === 'movies' ? 'bg-red-600 text-white' : 'text-gray-400 hover:bg-gray-800'}`}
                onClick={() => setActiveTab('movies')}
              >
                Manage Movies
              </button>
            </li>
            <li>
              <button 
                className={`w-full text-left px-4 py-2 rounded ${activeTab === 'categories' ? 'bg-red-600 text-white' : 'text-gray-400 hover:bg-gray-800'}`}
                onClick={() => setActiveTab('categories')}
              >
                Manage Categories
              </button>
            </li>
            <li>
              <button 
                className={`w-full text-left px-4 py-2 rounded ${activeTab === 'ads' ? 'bg-red-600 text-white' : 'text-gray-400 hover:bg-gray-800'}`}
                onClick={() => setActiveTab('ads')}
              >
                Monetization Settings
              </button>
            </li>
          </ul>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 bg-gray-900 rounded-lg p-6 border border-gray-800">
          {activeTab === 'movies' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Movies</h2>
                <button className="bg-red-600 text-white px-4 py-2 rounded text-sm hover:bg-red-700">Add New Movie</button>
              </div>
              <p className="text-gray-400">List of movies fetched from backend will appear here.</p>
              {/* Table placeholder */}
              <div className="mt-4 border border-gray-700 rounded overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-gray-800 text-gray-300">
                    <tr>
                      <th className="p-3">Title</th>
                      <th className="p-3">Rating</th>
                      <th className="p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-gray-700">
                      <td className="p-3">Inception</td>
                      <td className="p-3">8.8</td>
                      <td className="p-3">
                        <button className="text-blue-500 mr-3">Edit</button>
                        <button className="text-red-500">Delete</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'categories' && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Categories</h2>
              <p className="text-gray-400">Category management form and list goes here.</p>
            </div>
          )}

          {activeTab === 'ads' && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Monetization</h2>
              <p className="text-gray-400 mb-4">Configure VAST/VMAP endpoints and Display Ad scripts here.</p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Pre-Roll VAST URL</label>
                  <input type="text" className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white focus:outline-none focus:border-red-500" placeholder="https://adnetwork.com/vast.xml" />
                </div>
                <button className="bg-red-600 text-white px-4 py-2 rounded text-sm hover:bg-red-700">Save Changes</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
