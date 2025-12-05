import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutGrid, User, Calendar, BarChart3, Bot, Settings as SettingsIcon, HelpCircle, ClipboardCheck } from 'lucide-react';
import { NavItem } from '../types';

const navigation: NavItem[] = [
  { name: 'Thông tin cá nhân', href: '/profile', icon: User },
  { name: 'Lịch học', href: '/schedule', icon: Calendar },
  { name: 'Gợi ý đăng ký học phần', href: '/dashboard', icon: LayoutGrid },
  { name: 'Kết quả học tập', href: '/grades', icon: BarChart3 },
  { name: 'Trợ lý AI', href: '/ai-assistant', icon: Bot },
  { name: 'Đánh giá điểm rèn luyện', href: '/behavior-score', icon: ClipboardCheck },
  { name: 'Cài đặt', href: '/settings', icon: SettingsIcon },
];

const Sidebar: React.FC = () => {
  const userAvatar = "https://img.icons8.com/fluency/96/user-male-circle.png";

  return (
    <aside className="w-64 bg-navy-light flex-shrink-0 flex flex-col justify-between p-4 border-r border-slate-dark/20 h-screen sticky top-0 overflow-y-auto">
      <div>
        <div className="flex items-center space-x-3 p-2 mb-6">
            <div className="w-10 h-10 bg-accent-yellow rounded-md flex items-center justify-center font-bold text-navy-dark text-2xl">
                V
            </div>
            <h1 className="text-xl font-bold text-slate-lightest">VHU Portal</h1>
        </div>
        <nav className="flex flex-col space-y-2">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-accent-yellow text-navy-dark shadow-md'
                    : 'text-slate hover:bg-slate-dark/40 hover:text-slate-lightest'
                }`
              }
            >
              <item.icon className="w-5 h-5 mr-3" />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="flex flex-col space-y-4 mt-8">
          <NavLink to="/ai-assistant" className="bg-navy rounded-lg p-4 text-center group hover:border hover:border-accent-yellow/50 border border-transparent transition-all">
            <HelpCircle className="mx-auto w-8 h-8 text-accent-yellow mb-2 group-hover:scale-110 transition-transform"/>
            <p className="text-sm text-slate mb-2">Cần hỗ trợ?</p>
            <div className="w-full bg-slate-dark/50 group-hover:bg-accent-yellow group-hover:text-navy-dark text-slate-lightest py-2 rounded-md text-sm font-semibold transition-colors">
              Hỏi trợ lý AI
            </div>
          </NavLink>

          <NavLink to="/profile" className="flex items-center p-2 rounded-md hover:bg-slate-dark/40 transition-colors cursor-pointer">
              <img src={userAvatar} alt="VÕ VĂN QUỐC BẢO" className="w-10 h-10 rounded-full mr-3 border-2 border-slate-dark"/>
              <div className="overflow-hidden">
                  <p className="font-semibold text-sm text-slate-lightest truncate">VÕ VĂN QUỐC BẢO</p>
                  <p className="text-xs text-slate">231A290036</p>
              </div>
          </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;