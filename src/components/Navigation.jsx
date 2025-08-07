import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Cloud, Menu, Home, Star, Award, BarChart3, Info, Mail } from 'lucide-react';
import NotificationBell from './NotificationBell';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Dashboard', path: '/dashboard', icon: BarChart3 },
    { name: 'About', path: '/about', icon: Info },
    { name: 'Features', path: '/features', icon: Star },
    { name: 'Server', path: '/server', icon: Award },
    { name: 'Contact', path: '/contact', icon: Mail },
  ];

  return (
    <header className="bg-white shadow-lg border-b border-slate-200 sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl">
              <Cloud size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CloudShare Pro
              </h1>
              <p className="text-xs text-slate-500">Enterprise File Sharing</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 font-medium ${
                  location.pathname === item.path
                    ? 'bg-blue-50 text-blue-600 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <item.icon size={18} />
                {item.name}
              </Link>
            ))}
          </nav>

          {/* User Actions */}
          <div className="flex items-center gap-4">
            <NotificationBell />
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-slate-500 hover:text-slate-700 transition-colors"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-200 py-4">
            <nav className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all duration-200 font-medium ${
                    location.pathname === item.path
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <item.icon size={18} />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navigation;
