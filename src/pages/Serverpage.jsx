import { useState, useEffect } from 'react';
import {
  Server,
  Cpu,
  Activity,
  MapPin,
  Network,
  Globe,
  RefreshCcw,
} from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const ServerPage = () => {
  const fallbackInfo = {
    instanceId: '--',
    instanceType: '--',
    region: '--',
    publicIp: '--',
    privateIp: '--',
    status: 'Cannot connect',
    message: 'Unable to reach backend',
  };

  const [serverData, setServerData] = useState(null);

  useEffect(() => {
    const fetchServerInfo = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/server`);
        const data = await response.json();
        setServerData(data);
      } catch (err) {
        console.error('Failed to fetch server info:', err);
        setServerData(fallbackInfo);
      }
    };

    fetchServerInfo();
  }, []);

  const infoMap = serverData && [
    {
      icon: Server,
      label: 'Instance ID',
      value: serverData.instanceId,
    },
    {
      icon: Cpu,
      label: 'Instance Type',
      value: serverData.instanceType,
    },
    {
      icon: MapPin,
      label: 'Region',
      value: serverData.region,
    },
    {
      icon: Globe,
      label: 'Public IP',
      value: serverData.publicIp,
    },
    {
      icon: Network,
      label: 'Private IP',
      value: serverData.privateIp,
    },
    {
      icon: Activity,
      label: 'Status',
      value: serverData.status,
    },
    {
      icon: RefreshCcw,
      label: 'Last Refreshed',
      value: new Date().toLocaleString(),
    },
  ];

  return (
    <div className="space-y-16">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-slate-900 mb-6">Server Details</h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Live snapshot of your EC2 instance
        </p>
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 max-w-4xl mx-auto">
        {!serverData ? (
          <p className="text-center text-slate-500">Loading server info...</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {infoMap.map((item, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="bg-gradient-to-r from-slate-100 to-slate-200 p-3 rounded-xl">
                  <item.icon size={24} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">{item.label}</p>
                  <p className="text-lg font-medium text-slate-800">
                    {item.value || '--'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ServerPage;
