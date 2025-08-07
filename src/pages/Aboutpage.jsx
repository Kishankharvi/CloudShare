import React from 'react';
import { Server, Cloud, HardDrive, Users, Layers } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="space-y-16">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-slate-900 mb-6">About This Project</h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          This project demonstrates a scalable and secure file sharing system using core AWS services.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-6">How We Built It</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            This file sharing platform was developed by <strong>Kishan</strong> and <strong>Kumataswamy</strong> as a collaborative project focused on applying real-world cloud infrastructure practices.
            The backend is built with Node.js and hosted on an AWS EC2 instance. A Load Balancer is configured to handle incoming traffic and direct it to the EC2 backend through a Target Group.
          </p>
          <p className="text-slate-600 leading-relaxed">
            For storing uploaded files securely, we used <strong>Amazon S3</strong>, taking advantage of its scalability and high availability. The frontend runs locally during development, making API calls to the backend on the cloud.
          </p>
        </div>
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-2xl">
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Server, title: "EC2 Instance", desc: "Hosting the backend" },
              { icon: HardDrive, title: "S3 Storage", desc: "Secure file storage" },
              { icon: Layers, title: "Load Balancer", desc: "Manages traffic" },
              { icon: Cloud, title: "Target Group", desc: "Links LB to EC2" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-white p-3 rounded-xl w-fit mx-auto mb-2">
                  <item.icon size={24} className="text-blue-600" />
                </div>
                <h3 className="font-semibold text-slate-900 text-sm">{item.title}</h3>
                <p className="text-slate-600 text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Team & Values</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Users, title: "Team Effort", desc: "Built by Kishan and Kumataswamy with shared passion" },
            { icon: Cloud, title: "Cloud Powered", desc: "All core infrastructure hosted using AWS services" },
            { icon: Server, title: "Local + Cloud", desc: "Frontend runs locally, backend in the cloud" }
          ].map((value, index) => (
            <div key={index} className="text-center">
              <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-4 rounded-xl w-fit mx-auto mb-4">
                <value.icon size={32} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">{value.title}</h3>
              <p className="text-slate-600">{value.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
