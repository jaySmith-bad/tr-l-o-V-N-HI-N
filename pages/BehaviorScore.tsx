import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const behaviorData = [
    {
        id: 1,
        content: "Đánh giá về ý thức tham gia học tập",
        maxScore: 30,
    },
    {
        id: 2,
        content: "Đánh giá về ý thức chấp hành nội quy, quy chế, quy định trong nhà trường",
        maxScore: 20,
    },
    {
        id: 3,
        content: "Đánh giá về ý thức và kết quả tham gia các hoạt động chính trị – xã hội, văn hóa, văn nghệ, thể thao, phòng chống các tệ nạn xã hội",
        maxScore: 25,
    },
    {
        id: 4,
        content: "Đánh giá về ý thức công dân trong quan hệ cộng đồng",
        maxScore: 15,
    },
    {
        id: 5,
        content: "Đánh giá về ý thức và kết quả tham gia công tác cán bộ lớp, các đoàn thể, tổ chức trong cơ sở giáo dục đại học",
        maxScore: 10,
    },
    {
        id: 6,
        content: "Điểm cộng – Điểm trừ",
        maxScore: 30,
    },
];

const BehaviorScore: React.FC = () => {
    const [activeTab, setActiveTab] = useState('personal');

    return (
        <div className="animate-page-transition p-6 lg:p-10 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <div className="flex border-b-2 border-slate-dark/20 w-full sm:w-auto">
                    <button 
                        onClick={() => setActiveTab('personal')}
                        className={`px-4 py-2 text-sm font-semibold transition-colors duration-200 ${activeTab === 'personal' ? 'text-accent-yellow border-b-2 border-accent-yellow' : 'text-slate hover:text-slate-lightest'}`}
                    >
                        ĐIỂM CÁ NHÂN
                    </button>
                    <button 
                         onClick={() => setActiveTab('class')}
                         className={`px-4 py-2 text-sm font-semibold transition-colors duration-200 ${activeTab === 'class' ? 'text-accent-yellow border-b-2 border-accent-yellow' : 'text-slate hover:text-slate-lightest'}`}
                    >
                        LỚP
                    </button>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
                <div className="flex-1 w-full sm:w-auto">
                    <label htmlFor="year" className="block text-xs text-slate mb-1">Năm học</label>
                    <select id="year" className="w-full bg-navy border border-slate-dark/50 rounded-md p-2 text-sm text-slate-lightest focus:outline-none focus:ring-2 focus:ring-accent-yellow/80">
                        <option>2024-2025</option>
                        <option>2023-2024</option>
                    </select>
                </div>
                <div className="flex-1 w-full sm:w-auto">
                    <label htmlFor="semester" className="block text-xs text-slate mb-1">Học kỳ</label>
                    <select id="semester" className="w-full bg-navy border border-slate-dark/50 rounded-md p-2 text-sm text-slate-lightest focus:outline-none focus:ring-2 focus:ring-accent-yellow/80">
                        <option>Học kỳ 1</option>
                        <option>Học kỳ 2</option>
                    </select>
                </div>
                <div className="flex-1 sm:self-end">
                    <button className="w-full bg-slate-dark/50 text-slate-light cursor-not-allowed px-4 py-2 rounded-md text-sm font-semibold">
                        Chưa tới thời gian đánh giá
                    </button>
                </div>
            </div>
            
            <div className="bg-navy rounded-lg border border-slate-dark/30 overflow-hidden shadow-lg">
                <div className="grid grid-cols-12 px-4 py-3 bg-navy-dark text-slate-lightest font-bold text-xs sm:text-sm uppercase tracking-wider">
                    <div className="col-span-1">STT</div>
                    <div className="col-span-7">Nội dung ý kiến đánh giá</div>
                    <div className="col-span-2 text-center">Mức điểm</div>
                    <div className="col-span-2 text-center">Điểm SV</div>
                </div>
                <ul className="divide-y divide-slate-dark/50">
                    {behaviorData.map((item) => (
                        <li key={item.id} className="grid grid-cols-12 px-4 py-3 items-center hover:bg-slate-dark/20 transition-colors group">
                            <div className="col-span-1 text-slate text-sm">{item.id}</div>
                            <div className="col-span-7 text-slate-lightest text-sm pr-2">{item.content}</div>
                            <div className="col-span-2 text-center text-slate text-sm">{item.maxScore}</div>
                            <div className="col-span-2 flex justify-center text-slate-lightest">
                                <ChevronDown className="w-5 h-5 text-slate group-hover:text-accent-yellow cursor-pointer"/>
                            </div>
                        </li>
                    ))}
                    <li className="grid grid-cols-12 px-4 py-3 bg-navy-dark/50 font-semibold border-t-2 border-slate-dark/30">
                        <div className="col-span-8 text-slate-lightest">Tổng điểm đánh giá</div>
                        <div className="col-span-2 text-center"></div>
                        <div className="col-span-2 text-center text-accent-yellow text-lg">50</div>
                    </li>
                     <li className="grid grid-cols-12 px-4 py-3 bg-navy-dark/50 font-semibold">
                        <div className="col-span-8 text-slate-lightest">Xếp loại</div>
                        <div className="col-span-2 text-center"></div>
                        <div className="col-span-2 text-center text-accent-cyan uppercase">Trung bình</div>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default BehaviorScore;