import React from 'react';
import { Star, Clock } from 'lucide-react';
import { Course } from '../types';

const suggestedCourses: Course[] = [
    {
        title: "Phát triển ứng dụng di động",
        credits: "3 tín chỉ",
        lecturer: "GS. Phan",
        rating: "4.8",
        schedule: "Thứ 3, 9:00",
        tags: ["Phù hợp định hướng", "Xuất sắc"],
        registered: false
    },
    {
        title: "Học máy nâng cao",
        credits: "4 tín chỉ",
        lecturer: "TS. Vũ",
        rating: "4.9",
        schedule: "Thứ 5, 10:00",
        tags: ["Môn chuyên ngành", "Xuất sắc"],
        registered: false
    },
    {
        title: "Quản trị dự án PM",
        credits: "3 tín chỉ",
        lecturer: "ThS. Phố",
        rating: "4.7",
        schedule: "Thứ 2, 13:00",
        tags: ["Kỹ năng mềm", "Xuất sắc"],
        registered: true
    }
];

const curriculum = [
    { code: "INT3106", name: "Introduction to the major", credits: "2.00", completed: true },
    { code: "INT3110", name: "Industry and career experience", credits: "1.00", completed: true },
    { code: "ECO2011", name: "Microeconomics", credits: "3.00", completed: false },
    { code: "MKT2010", name: "Principles of Marketing", credits: "3.00", completed: false },
];


const Dashboard: React.FC = () => {
    return (
        <div className="space-y-10 animate-page-transition p-6 lg:p-10 max-w-7xl mx-auto">
            <div>
                <h2 className="text-2xl font-bold text-slate-lightest mb-1">Chào mừng trở lại, BẢO!</h2>
                <p className="text-slate">Đây là những gợi ý đăng ký học phần dành riêng cho bạn.</p>
            </div>
            
            <div className="space-y-4">
                <h3 className="text-xl font-semibold text-accent-yellow">Gợi ý tương thích nhất</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {suggestedCourses.map((course, index) => (
                        <div key={index} className="bg-navy p-6 rounded-lg border border-slate-dark/30 hover:border-accent-yellow/50 transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between shadow-lg">
                            <div>
                                <div className="flex justify-between items-start mb-3">
                                    <h4 className="text-lg font-bold text-slate-lightest w-4/5">{course.title}</h4>
                                    <span className="text-xs font-medium bg-slate-dark/50 text-accent-cyan px-2 py-1 rounded h-fit whitespace-nowrap">{course.credits}</span>
                                </div>
                                <div className="flex items-center space-x-4 text-sm text-slate mb-4">
                                    <span>{course.lecturer}</span>
                                    <span className="flex items-center"><Star className="w-4 h-4 text-accent-yellow mr-1 fill-accent-yellow" /> {course.rating}</span>
                                </div>
                                <div className="flex items-center text-sm text-slate mb-4">
                                    <Clock className="w-4 h-4 mr-2" />
                                    <span>{course.schedule}</span>
                                </div>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {course.tags.map(tag => (
                                        <span key={tag} className="text-xs text-accent-cyan bg-accent-cyan/10 px-2 py-1 rounded-full">{tag}</span>
                                    ))}
                                </div>
                            </div>
                             <button disabled={course.registered} className={`w-full py-2.5 rounded-md text-sm font-semibold transition-all ${course.registered ? 'bg-slate-dark/50 text-slate cursor-not-allowed' : 'bg-accent-yellow text-navy-dark hover:bg-accent-yellow-dark shadow-md'}`}>
                                {course.registered ? 'Đã đăng ký' : 'Đăng ký'}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-xl font-semibold text-accent-yellow">Chương trình đào tạo (Môn học tương đương)</h3>
                <div className="bg-navy rounded-lg border border-slate-dark/30 overflow-hidden">
                    <ul className="divide-y divide-slate-dark/30">
                        {curriculum.map((item, index) => (
                            <li key={item.code} className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center hover:bg-slate-dark/20 transition-colors gap-2 sm:gap-0">
                                <div className="flex items-center">
                                    <span className="text-slate mr-4 font-mono w-6">{index + 1}.</span>
                                    <div>
                                        <p className="font-medium text-slate-lightest">{`[${item.code}] - ${item.name} (${item.credits})`}</p>
                                        <p className="text-xs text-slate">Tương đương: {item.name}</p>
                                    </div>
                                </div>
                                <span className={`text-xs font-bold px-2 py-1 rounded ${item.completed ? 'text-accent-cyan bg-accent-cyan/10' : 'text-slate bg-slate-dark/30'}`}>
                                    {item.completed ? 'Hoàn thành' : 'Chưa hoàn thành'}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;