import React from 'react';
import { Upload, Download, Timer, Lock, Globe, CheckCircle2, Zap, AlertCircle } from 'lucide-react';

const FeaturesPage = () => {
  return (
    <div className="space-y-16">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-slate-900 mb-6">Key Features</h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          Core functionalities designed to deliver fast, secure, and user-friendly file sharing
        </p>
      </div>

      {[
        {
          icon: Upload,
          title: "Seamless File Upload",
          description: "Easily upload files through a clean and simple interface",
          features: [
            "Drag-and-drop or direct selection",
            "File size validations",
            "Unique file ID generation",
            "Progress indication during upload"
          ]
        },
        {
          icon: Download,
          title: "Quick & Secure Downloads",
          description: "Download shared files through secure, time-limited URLs",
          features: [
            "Auto-generated download links",
            "Clean download interface",
            "Support for all file types",
            "Real-time status and feedback"
          ]
        },
        {
          icon: Timer,
          title: "Link Expiry Mechanism",
          description: "Auto-expiring links to maintain security and avoid misuse",
          features: [
            "Predefined expiry durations",
            "One-time or multi-use links",
            "Backend-controlled link validity",
            "No access after expiry"
          ]
        },
        {
          icon: Lock,
          title: "Secure by Design",
          description: "End-to-end protection for your data from upload to access",
          features: [
            "Files stored in S3 with restricted access",
            "Server-side validations",
            "CORS policies for safe cross-origin requests",
            "No persistent storage on frontend"
          ]
        },
        {
          icon: Zap,
          title: "Fast Performance",
          description: "Lightweight, high-speed performance for every user",
          features: [
            "Low-latency file access via S3",
            "Optimized backend APIs",
            "Efficient routing with Load Balancer",
            "Responsive UI design"
          ]
        },
        {
          icon: AlertCircle,
          title: "Robust Error Handling",
          description: "User-friendly messages and fallbacks for every action",
          features: [
            "Clear upload/download error alerts",
            "Fallbacks for missing files or expired links",
            "Frontend validations before API calls",
            "Detailed logs for developers"
          ]
        }
      ].map((section, index) => (
        <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-3 rounded-xl">
              <section.icon size={32} className="text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{section.title}</h2>
              <p className="text-slate-600">{section.description}</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {section.features.map((feature, featureIndex) => (
              <div key={featureIndex} className="flex items-center gap-3">
                <CheckCircle2 size={16} className="text-green-500" />
                <span className="text-slate-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturesPage;
