import React from 'react';  
import { Cloud, Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin, Clock } from 'lucide-react';
const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl">
                <Cloud size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">CloudShare Pro</h3>
                <p className="text-slate-400 text-sm">Enterprise Solutions</p>
              </div>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Secure, fast, and reliable file sharing platform designed for modern enterprises and teams worldwide.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Dashboard', 'Upload Files', 'Shared Files', 'Team Management', 'Analytics', 'Settings'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-slate-400 hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              {['Help Center', 'Documentation', 'API Reference', 'Community Forum', 'Contact Support', 'Status Page'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-slate-400 hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-slate-400" />
                <span className="text-slate-400">support@cloudshare.pro</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-slate-400" />
                <span className="text-slate-400">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-slate-400" />
                <span className="text-slate-400">San Francisco, CA</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock size={16} className="text-slate-400" />
                <span className="text-slate-400">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-slate-400 text-sm">
            © 2025 CloudShare Pro. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Privacy Policy</a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Terms of Service</a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
