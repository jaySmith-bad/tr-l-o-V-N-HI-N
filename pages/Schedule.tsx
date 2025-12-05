import React from 'react';
import { Clock, MapPin, Bot, Users, Code, BrainCircuit } from 'lucide-react';

const weeklySchedule = [
  { day: 'Thứ 2', date: '04/11', classes: [{ name: 'Cấu trúc dữ liệu & giải thuật', time: '13:00 - 15:30', location: 'D501', color: 'bg-pink-500/10 border-pink-400 text-pink-300' }] },
  { day: 'Thứ 3', date: '05/11', classes: [
      { name: 'Kinh tế vĩ mô', time: '9:00 - 11:30', location: 'A201', color: 'bg-teal-500/10 border-teal-400 text-teal-300' },
      { name: 'An toàn thông tin', time: '18:00 - 20:30', location: 'C102', color: 'bg-red-500/10 border-red-400 text-red-300' }
    ]
  },
  { day: 'Thứ 4', date: '06/11', classes: [
      { name: 'Lập trình Web', time: '7:30 - 10:00', location: 'C301', color: 'bg-blue-500/10 border-blue-400 text-blue-300' },
      { name: 'Mạng máy tính', time: '14:00 - 16:30', location: 'B202', color: 'bg-green-500/10 border-green-400 text-green-300' }
    ]
  },
  { day: 'Thứ 5', date: '07/11', classes: [
      { name: 'Hệ điều hành', time: '8:00 - 10:30', location: 'F101', color: 'bg-orange-500/10 border-orange-400 text-orange-300' },
      { name: 'Cơ sở dữ liệu', time: '13:00 - 15:30', location: 'E303', color: 'bg-yellow-500/10 border-yellow-400 text-yellow-300' }
    ]
  },
  { day: 'Thứ 6', date: '08/11', classes: [{ name: 'Lập trình', time: '13:00 - 15:30', location: 'B105', color: 'bg-indigo-500/10 border-indigo-400 text-indigo-300' }] },
  { day: 'Thứ 7', date: '09/11', classes: [{ name: 'Tiếng Anh chuyên ngành', time: '8:00 - 10:30', location: 'F402', color: 'bg-purple-500/10 border-purple-400 text-purple-300' }] },
  { day: 'Chủ nhật', date: '10/11', classes: [] },
];

const upcomingEvents = [
    { title: 'Hội thảo AI', date: '15/11/2025 - 9:00 AM', icon: BrainCircuit, color: 'text-accent-yellow' },
    { title: 'Học thuật cùng AI', date: '18/11/2025 - 10:00 AM', icon: Bot, color: 'text-accent-cyan' },
    { title: 'Ngày hội sinh viên', date: '20/11/2025 - 2:00 PM', icon: Users, color: 'text-pink-400' },
    { title: 'Cuộc thi Hackathon', date: '25/11/2025 - 8:00 AM', icon: Code, color: 'text-green-400' },
];

const Schedule: React.FC = () => {
  return (
    <div className="animate-page-transition flex flex-col h-full space-y-8 p-6 lg:p-10 max-w-7xl mx-auto">
      
      <div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <p className="text-xl font-bold text-slate-lightest">Tuần 04/11 - 10/11/2024</p>
            <p className="text-sm text-slate">Đây là lịch học trong tuần của bạn.</p>
          </div>
          <div className="flex space-x-2">
            <button className="bg-navy text-slate-lightest px-4 py-2 rounded-md text-sm font-semibold hover:bg-slate-dark/50 transition border border-slate-dark/30">Xuất iCal</button>
            <button className="bg-accent-yellow text-navy-dark px-4 py-2 rounded-md text-sm font-semibold hover:bg-accent-yellow-dark transition shadow-md">Nhắc nhở</button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4 flex-grow">
        {weeklySchedule.map((day) => (
          <div key={day.day} className="bg-navy p-3 rounded-lg flex flex-col space-y-3 border border-slate-dark/20 min-h-[150px]">
            <div className="text-center pb-2 border-b border-slate-dark/30">
              <p className="font-bold text-slate-lightest text-sm">{day.day}</p>
              <p className="text-xs text-slate">{day.date}</p>
            </div>
            <div className="space-y-3 flex-grow">
              {day.classes.length > 0 ? (
                day.classes.map((cls, index) => (
                  <div key={index} className={`p-3 rounded-md border-l-4 ${cls.color} bg-opacity-10 backdrop-blur-sm`}>
                    <p className="font-bold text-sm leading-tight text-slate-lightest">{cls.name}</p>
                    <div className="text-xs mt-2 space-y-1 opacity-90">
                      <span className="flex items-center"><Clock size={12} className="mr-1.5 flex-shrink-0" /> {cls.time}</span>
                      <span className="flex items-center"><MapPin size={12} className="mr-1.5 flex-shrink-0" /> {cls.location}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="h-full flex items-center justify-center">
                    <p className="text-slate/40 italic text-xs text-center">Không có lớp</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div>
        <h3 className="text-xl font-bold text-slate-lightest mb-4">Sự kiện sắp tới</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {upcomingEvents.map((event, index) => (
            <div key={index} className="bg-navy p-4 rounded-lg border border-slate-dark/30 hover:border-accent-yellow/50 transition-colors flex items-start space-x-4 cursor-pointer group shadow-lg">
                <div className={`p-2 bg-slate-dark/30 rounded-md group-hover:scale-110 transition-transform`}>
                    <event.icon className={`w-6 h-6 ${event.color}`} />
                </div>
                <div>
                    <h4 className="font-semibold text-slate-lightest leading-tight group-hover:text-accent-yellow transition-colors">{event.title}</h4>
                    <p className="text-sm text-slate mt-1">{event.date}</p>
                </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Schedule;