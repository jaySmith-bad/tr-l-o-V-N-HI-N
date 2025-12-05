import React, { useState, useEffect } from 'react';
import { Cake, Building, Mail, CreditCard, Users, Binary, Clipboard, Thermometer, Sun, Cloud, CloudRain, Droplets, Wind } from 'lucide-react';
import { UserProfile } from '../types';

const Profile: React.FC = () => {
  const profileData: UserProfile = {
    name: "VÕ VĂN QUỐC BẢO",
    major: "Công nghệ thông tin",
    avatar: "https://img.icons8.com/fluency/96/user-male-circle.png",
    studentId: "231A290036",
    dob: "01/01/2005 (Tuổi: 19)",
    class: "23ITTMDT1011",
    faculty: "Khoa Công nghệ thông tin",
    gender: "Nam",
    email: "bao.vhu.edu.vn",
    progress: 25,
    studyYears: "2023-2027"
  };

  const infoItems = [
      { icon: CreditCard, label: "Mã sinh viên", value: profileData.studentId, copyable: true },
      { icon: Cake, label: "Ngày sinh", value: profileData.dob },
      { icon: Users, label: "Lớp", value: profileData.class },
      { icon: Building, label: "Khoa", value: profileData.faculty },
      { icon: Binary, label: "Giới tính", value: profileData.gender },
      { icon: Mail, label: "Email", value: profileData.email },
  ];
  
  const [weather, setWeather] = useState({
    temperature: 28,
    condition: 'sunny' as 'sunny' | 'cloudy' | 'rainy',
    description: 'Trời nắng nhẹ',
    suggestion: 'Trời nắng, nhớ mang nón nhé ☀️',
    feelsLike: 30,
    humidity: 65,
    windSpeed: 10,
  });

  useEffect(() => {
    const weatherConditions = [
      { temp: 28, cond: 'sunny', desc: 'Trời nắng đẹp', sugg: 'Trời nắng, nhớ mang nón nhé ☀️', feels: 31, humid: 65, wind: 10 },
      { temp: 24, cond: 'cloudy', desc: 'Trời nhiều mây', sugg: 'Hôm nay trời mát, đi học thoải mái 😌', feels: 24, humid: 75, wind: 15 },
      { temp: 22, cond: 'rainy', desc: 'Có mưa rào', sugg: 'Có mưa nhẹ, mang ô theo bạn nhé ☔', feels: 21, humid: 88, wind: 20 }
    ];
    const randomWeather = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
    setWeather({
      temperature: randomWeather.temp,
      condition: randomWeather.cond as 'sunny' | 'cloudy' | 'rainy',
      description: randomWeather.desc,
      suggestion: randomWeather.sugg,
      feelsLike: randomWeather.feels,
      humidity: randomWeather.humid,
      windSpeed: randomWeather.wind,
    });
  }, []);

  const WeatherIcon = () => {
    switch(weather.condition) {
      case 'sunny': return <Sun className="w-24 h-24 text-accent-yellow animate-spin-slow" />;
      case 'cloudy': return <Cloud className="w-24 h-24 text-slate animate-pulse" />;
      case 'rainy': return <CloudRain className="w-24 h-24 text-accent-cyan animate-bounce" />;
      default: return null;
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // In a real app, toast notification here
  };

  const WeatherDetail = ({ icon: Icon, value, unit, label }: { icon: React.ElementType, value: number, unit: string, label: string }) => (
    <div className="flex items-center space-x-2">
        <Icon className="w-6 h-6 text-slate" />
        <div>
            <p className="font-semibold text-slate-lightest">{value}{unit}</p>
            <p className="text-xs text-slate">{label}</p>
        </div>
    </div>
  );

  return (
    <div className="space-y-8 p-6 lg:p-10 max-w-7xl mx-auto animate-page-transition">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 flex flex-col items-center bg-navy p-8 rounded-lg border border-slate-dark/20 shadow-lg">
                <div className="relative mb-4">
                <img src={profileData.avatar} alt="Student Avatar" className="w-32 h-32 rounded-full border-4 border-accent-yellow/50" />
                <span className="absolute bottom-2 right-2 block h-5 w-5 rounded-full bg-green-400 border-2 border-navy-light ring-2 ring-green-400"></span>
                </div>
                <h2 className="text-xl lg:text-2xl font-bold text-slate-lightest text-center">{profileData.name}</h2>
                <p className="text-accent-cyan font-medium whitespace-nowrap">{profileData.major}</p>
                <div className="w-full mt-8">
                    <div className="flex justify-between mb-1 text-sm">
                        <span className="text-slate">Tiến độ học tập ({profileData.studyYears})</span>
                        <span className="font-semibold text-accent-cyan">{profileData.progress}%</span>
                    </div>
                    <div className="w-full bg-navy-dark rounded-full h-2.5 overflow-hidden">
                        <div className="bg-gradient-to-r from-accent-cyan to-accent-yellow h-2.5 rounded-full transition-all duration-1000" style={{ width: `${profileData.progress}%` }}></div>
                    </div>
                </div>
            </div>
            
            <div className="lg:col-span-2 bg-navy p-8 rounded-lg border border-slate-dark/20 shadow-lg">
                <h3 className="text-xl font-bold text-slate-lightest mb-6 border-b border-slate-dark/30 pb-2">Thông tin chi tiết</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    {infoItems.map(item => (
                        <div key={item.label} className="flex items-start py-2 group">
                            <item.icon className="w-6 h-6 text-accent-yellow mr-4 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                            <div className="min-w-0">
                                <p className="text-sm text-slate">{item.label}</p>
                                <div className="flex items-center">
                                    <p className="text-base font-semibold text-slate-lightest whitespace-nowrap">{item.value}</p>
                                    {item.copyable && (
                                        <button onClick={() => copyToClipboard(item.value)} title="Copy" className="ml-2 text-slate hover:text-accent-yellow transition-colors flex-shrink-0">
                                            <Clipboard size={16}/>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
      </div>
      <div className="bg-navy p-8 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-8 items-center border border-slate-dark/20 shadow-lg">
        <div className="flex items-center gap-6 justify-center md:justify-start">
            <WeatherIcon />
            <div>
                <p className="text-6xl font-bold text-slate-lightest">{weather.temperature}°C</p>
                <p className="text-slate text-lg">{weather.description}</p>
            </div>
        </div>
        <div className="space-y-6">
             <p className="text-lg font-medium text-slate-lightest text-center md:text-right">{weather.suggestion}</p>
             <div className="h-px bg-slate-dark/30"></div>
             <div className="flex justify-around items-center">
                <WeatherDetail icon={Thermometer} value={weather.feelsLike} unit="°" label="Cảm giác như" />
                <WeatherDetail icon={Droplets} value={weather.humidity} unit="%" label="Độ ẩm" />
                <WeatherDetail icon={Wind} value={weather.windSpeed} unit=" km/h" label="Tốc độ gió" />
             </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;