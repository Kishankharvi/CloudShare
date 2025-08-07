import { Link } from 'react-router-dom';
import { Upload, Shield, Zap, Globe, UploadCloud, ShieldCheck, Users2 } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="py-24 text-center bg-white">
        <div className="max-w-5xl mx-auto px-6">
          {/* Main Heading */}
          <h1 className="text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-6 tracking-tight leading-tight">
            Express File Sharing
          </h1>

          {/* Subtext */}
          <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-3xl mx-auto mb-4">
            Secure, blazing-fast, and user-friendly file sharing platform built for individuals and teams.
          </p>

          {/* Supporting Line */}
          <p className="text-md md:text-lg text-slate-500 max-w-2xl mx-auto mb-12">
            No logins. No limits. Just fast uploads and seamless collaboration — all encrypted, all yours.
          </p>

          {/* CTA Button */}
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            <Upload size={20} />
            Get Started Free
          </Link>

          {/* Quick Value Props */}
          <div className="grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto mt-16">
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <UploadCloud size={32} className="text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800">Instant Uploads</h3>
              <p className="text-sm text-slate-600">Drag, drop, done — no waiting around.</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-green-100 p-4 rounded-full mb-4">
                <ShieldCheck size={32} className="text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800">End-to-End Encryption</h3>
              <p className="text-sm text-slate-600">We don't peek. Your data stays yours.</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-purple-100 p-4 rounded-full mb-4">
                <Users2 size={32} className="text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800">Built for Teams</h3>
              <p className="text-sm text-slate-600">Collaborate effortlessly with shared workspaces.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Why Choose CloudShare Pro?</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Built for enterprises with security, speed, and collaboration in mind
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Shield, title: "Enterprise Security", desc: "Bank-level encryption, SOC 2 compliance, and advanced access controls" },
            { icon: Zap, title: "Lightning Fast", desc: "Global CDN with 99.9% uptime and sub-second file delivery worldwide" },
            { icon: Globe, title: "Global Access", desc: "Access your files from anywhere with seamless synchronization" },
          ].map((feature, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-slate-200">
              <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-4 rounded-xl w-fit mb-4">
                <feature.icon size={32} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white py-20 rounded-3xl">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-10">Why People Love Us</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Lightning-Fast Sharing",
                desc: "Send files instantly with our optimized infrastructure — no lags, no waiting.",
              },
              {
                title: "Built for Reliability",
                desc: "We've maintained 99.9% uptime so your work never gets interrupted.",
              },
              {
                title: "Global & Growing",
                desc: "Used by creators, teams, and enterprises in over 150 countries.",
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-white/10 p-6 rounded-xl hover:bg-white/20 transition">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-blue-100 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
