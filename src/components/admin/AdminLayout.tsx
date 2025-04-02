import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Users, FileText, Bell, Settings, Home } from 'lucide-react';

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-alternative-600">Admin Dashboard</h1>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link
                to="/admin"
                className="flex items-center p-2 text-gray-700 rounded-md hover:bg-gray-100"
              >
                <Home size={18} className="mr-3" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/admin/blog"
                className="flex items-center p-2 text-gray-700 rounded-md hover:bg-gray-100"
              >
                <FileText size={18} className="mr-3" />
                Blog Posts
              </Link>
            </li>
            <li>
              <Link
                to="/admin/newsletter"
                className="flex items-center p-2 text-alternative-600 bg-gray-100 rounded-md font-medium"
              >
                <Bell size={18} className="mr-3" />
                Newsletter
              </Link>
            </li>
            <li>
              <Link
                to="/admin/users"
                className="flex items-center p-2 text-gray-700 rounded-md hover:bg-gray-100"
              >
                <Users size={18} className="mr-3" />
                Users
              </Link>
            </li>
            <li>
              <Link
                to="/admin/settings"
                className="flex items-center p-2 text-gray-700 rounded-md hover:bg-gray-100"
              >
                <Settings size={18} className="mr-3" />
                Settings
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
          </div>
        </header>
        <main>
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
