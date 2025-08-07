import { useState, useRef, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function NotificationBell() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Welcome to CloudShare Pro!" },
  ]);
  const bellRef = useRef(null);
  const { resultsnoti } = useApp();

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (bellRef.current && !bellRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // React to resultsnoti change and add notification
  useEffect(() => {
    if (resultsnoti && resultsnoti.fileName) {
      setNotifications((prev) => [
        { id: Date.now(), message: `File "${resultsnoti.fileName}" uploaded successfully!` },
        ...prev.slice(0, 4) // Keep only last 5 notifications
      ]);
    }
  }, [resultsnoti]);

  return (
    <div className="relative" ref={bellRef}>
      <button
        onClick={() => setShowNotifications((prev) => !prev)}
        className="relative p-2 text-slate-500 hover:text-slate-700 transition-colors"
      >
        <Bell size={20} />
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {notifications.length}
        </span>
      </button>

      {showNotifications && (
        <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-lg z-50 animate-fade-in">
          <div className="p-4 text-sm font-medium text-slate-700 border-b">
            Notifications
          </div>
          <ul className="max-h-60 overflow-y-auto">
            {notifications.map((note) => (
              <li
                key={note.id}
                className="px-4 py-3 hover:bg-slate-50 text-slate-600 text-sm"
              >
                {note.message}
              </li>
            ))}
          </ul>
          <div className="px-4 py-2 text-center text-xs text-slate-400 border-t">
            <button className="hover:text-blue-600 transition">View All</button>
          </div>
        </div>
      )}
    </div>
  );
}
