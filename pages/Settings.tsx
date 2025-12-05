import React from 'react';
import { Settings as SettingsIcon, Shield, Bell, Languages } from 'lucide-react';

const Settings: React.FC = () => {
  return (
    <div className="animate-page-transition flex flex-col items-center justify-center h-full text-center p-6">
      <div className="bg-navy p-10 rounded-lg border border-slate-dark/30 shadow-2xl max-w-lg w-full">
        <div className="relative inline-block">
            <SettingsIcon className="w-20 h-20 text-accent-yellow mx-auto mb-6 animate-spin-slow" />
            <div className="absolute inset-0 bg-accent-yellow blur-xl opacity-20 animate-pulse"></div>
        </div>
        <h2 className="text-3xl font-bold text-slate-lightest mb-4">Cài đặt</h2>
        <p className="text-slate mb-8 leading-relaxed">
          Trang cài đặt đang được xây dựng. Các tính năng như thay đổi ngôn ngữ, chế độ sáng/tối, thông báo và bảo mật sẽ sớm có mặt.
        </p>
        <div className="grid grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-slate hover:text-accent-cyan transition-colors cursor-pointer group">
                <div className="p-3 bg-navy-light rounded-full mb-2 group-hover:bg-slate-dark/50 transition-colors">
                    <Languages className="w-8 h-8"/>
                </div>
                <span className="text-xs font-semibold">Ngôn ngữ</span>
            </div>
             <div className="flex flex-col items-center text-slate hover:text-accent-yellow transition-colors cursor-pointer group">
                <div className="p-3 bg-navy-light rounded-full mb-2 group-hover:bg-slate-dark/50 transition-colors">
                    <Bell className="w-8 h-8"/>
                </div>
                <span className="text-xs font-semibold">Thông báo</span>
            </div>
             <div className="flex flex-col items-center text-slate hover:text-green-400 transition-colors cursor-pointer group">
                <div className="p-3 bg-navy-light rounded-full mb-2 group-hover:bg-slate-dark/50 transition-colors">
                    <Shield className="w-8 h-8"/>
                </div>
                <span className="text-xs font-semibold">Bảo mật</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;