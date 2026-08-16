import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  FolderOpen,
  Tag,
  Settings,
  LogOut,
  Menu,
  X,
  Palette
} from 'lucide-react';
import { authService } from '../../lib/auth.js';
import { useState } from 'react';

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    authService.logout();
    navigate('/admin/login');
  };

  const navItems = [
    { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/posts', icon: FileText, label: 'Posts' },
    { path: '/admin/categories', icon: FolderOpen, label: 'Categories' },
    { path: '/admin/tags', icon: Tag, label: 'Tags' },
    { path: '/admin/color-settings', icon: Palette, label: 'Color Settings' },
    { path: '/admin/settings', icon: Settings, label: 'Settings' },
  ];

  const isActive = (path) => {
    if (path === '/admin/color-settings') {
      return location.pathname === '/admin/color-settings';
    }
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-dark-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-dark-200 px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-dark-100 transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-dark-700" />
            ) : (
              <Menu className="w-6 h-6 text-dark-700" />
            )}
          </button>
          <span className="font-bold text-dark-900">Admin Panel</span>
        </div>
        <button
          onClick={handleLogout}
          className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-64 bg-white border-r border-dark-200
          transform ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
          transition-transform duration-300 ease-in-out
          flex flex-col
        `}>
          {/* Logo */}
          <div className="p-6 border-b border-dark-200">
            <h1 className="text-xl font-extrabold text-dark-900 flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br-from-primary rounded-lg flex items-center justify-center">
                <LayoutDashboard className="w-5 h-5 text-white" />
              </div>
              Admin Panel
            </h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                  ${isActive(item.path)
                    ? 'bg-primary-50 text-primary-700 font-bold'
                    : 'text-dark-600 hover:bg-dark-50 hover:text-dark-900'
                  }
                `}
              >
                <item.icon className={`w-5 h-5 ${isActive(item.path) ? 'text-primary-600' : ''}`} />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* User Info & Logout */}
          <div className="p-4 border-t border-dark-200">
            <div className="flex items-center gap-3 mb-4 px-4 py-3 bg-dark-50 rounded-xl">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                A
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-dark-900 truncate">Admin</p>
                <p className="text-xs text-dark-500 truncate">Administrator</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 transition-colors font-medium"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </aside>

        {/* Mobile Overlay */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 min-w-0 overflow-x-hidden">
          <div className="p-3 sm:p-4 md:p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}