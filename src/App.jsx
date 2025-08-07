import { useState, useRef, useEffect } from 'react';
import { Upload, Download, Trash2, File, Image, Video, FileText, Archive, Music, Code, AlertCircle, CheckCircle, X, RefreshCw, Cloud, Shield, Zap, Users, Search, Filter, Grid, List, Eye, Share2, Copy, MoreVertical, Menu, Home, Info, Mail, Phone, MapPin, Clock, Star, Award, Globe, Lock, ArrowRight, ChevronDown, Facebook, Twitter, Linkedin, Instagram, Play, CheckCircle2, TrendingUp, BarChart3, Settings, HelpCircle, LogOut, User, Bell, Heart } from 'lucide-react';
import { Server, Cpu, Activity, TimerReset, RefreshCcw } from 'lucide-react';
import { ShieldCheck, UploadCloud, Users2 } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import HomePage from "./pages/Homepage";
import DashboardPage from './pages/Dashboardpage';
import AboutPage from "./pages/Aboutpage"
import Toast from './components/Toast';


import FeaturesPage from './pages/Featurespage';
import ServerPage from './pages/Serverpage';
import ContactPage from "./pages/Contactpage" ;
import { useApp } from './context/AppContext';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const AppContent = () => {
  const { toast, setToast } = useApp();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex flex-col">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <Navigation />

      <main className="flex-1 container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/server" element={<ServerPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <Router>
        <AppContent />
      </Router>
    </AppProvider>
  );
}

export default App;
