import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadialBarChart, RadialBar, PolarAngleAxis } from 'recharts';
import { TrendingUp, AlertTriangle, Lightbulb, Bot } from 'lucide-react';
import { GradeData } from '../types';

const yearData: GradeData[] = [
  { name: 'HK1 23-24', he10: 8.5, he4: 3.4 },
  { name: 'HK2 23-24', he4: 3.2, he10: 8.0 },
];

const semesterGpa = 8.0;
const radialData = [{ name: 'GPA', value: semesterGpa }];

const Grades: React.FC = () => {
    const [activeTab, setActiveTab] = useState('year');

    const renderByYear = () => (
        <div className="bg-navy p-6 rounded-lg border border-slate-dark/20 shadow-lg">
            <h3 className="text-lg font-bold text-slate-lightest mb-4">Điểm trung bình các học kỳ</h3>
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <BarChart data={yearData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                        <XAxis dataKey="name" stroke="#8892b0" tick={{fill: '#8892b0'}} />
                        <YAxis yAxisId="left" orientation="left" stroke="#facc15" domain={[0, 10]} tick={{fill: '#facc15'}} />
                        <YAxis yAxisId="right" orientation="right" stroke="#22d3ee" domain={[0, 4]} tick={{fill: '#22d3ee'}} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#020c1b', borderColor: '#495670', color: '#ccd6f6' }}
                          itemStyle={{ color: '#ccd6f6' }}
                        />
                        <Legend wrapperStyle={{ color: '#ccd6f6' }}/>
                        <Bar yAxisId="left" dataKey="he10" fill="#facc15" name="Điểm TBC Học kỳ (Hệ 10)" radius={[4, 4, 0, 0]} />
                        <Bar yAxisId="right" dataKey="he4" fill="#22d3ee" name="Điểm TBC Tích lũy (Hệ 4)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );

    const renderBySemester = () => (
        <div className="bg-navy p-6 rounded-lg flex flex-col items-center border border-slate-dark/20 shadow-lg">
            <h3 className="text-lg font-bold text-slate-lightest mb-4">Điểm trung bình Học kỳ 2 (2023-2024)</h3>
            <div className="relative" style={{ width: 300, height: 300 }}>
                <ResponsiveContainer>
                    <RadialBarChart
                        innerRadius="70%"
                        outerRadius="100%"
                        data={radialData}
                        startAngle={90}
                        endAngle={-270}
                    >
                        <PolarAngleAxis
                            type="number"
                            domain={[0, 10]}
                            angleAxisId={0}
                            tick={false}
                        />
                        <RadialBar
                            background={{ fill: '#112240' }}
                            dataKey="value"
                            angleAxisId={0}
                            fill="#facc15"
                            cornerRadius={15}
                            // barSize={30}
                        />
                    </RadialBarChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-5xl font-bold text-accent-yellow">{semesterGpa.toFixed(1)}</span>
                    <span className="text-slate text-lg">/ 10</span>
                </div>
            </div>
        </div>
    );

    return (
        <div className="space-y-8 animate-page-transition p-6 lg:p-10 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div>
                     <div className="flex space-x-1 bg-navy p-1 rounded-lg border border-slate-dark/30">
                        <button onClick={() => setActiveTab('year')} className={`px-4 py-2 text-sm font-semibold rounded-md transition ${activeTab === 'year' ? 'bg-accent-yellow text-navy-dark shadow-sm' : 'text-slate hover:text-slate-lightest'}`}>Theo năm học</button>
                        <button onClick={() => setActiveTab('semester')} className={`px-4 py-2 text-sm font-semibold rounded-md transition ${activeTab === 'semester' ? 'bg-accent-yellow text-navy-dark shadow-sm' : 'text-slate hover:text-slate-lightest'}`}>Theo học kỳ</button>
                    </div>
                </div>
                 <div className="text-center sm:text-right bg-navy px-4 py-2 rounded-lg border border-slate-dark/20">
                    <p className="text-sm font-medium text-slate">Năm học: 2023-2024</p>
                    <p className="font-bold text-lg text-slate-lightest">GPA: 3.2/4.0 | 8.0/10</p>
                </div>
            </div>

            {activeTab === 'year' ? renderByYear() : renderBySemester()}

            <div>
                <h3 className="text-xl font-bold text-accent-yellow mb-4 flex items-center gap-2">
                    <Bot className="w-6 h-6" /> Phân tích từ AI
                </h3>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-navy p-6 rounded-lg border-t-4 border-accent-cyan shadow-lg">
                        <div className="flex items-center mb-2">
                            <TrendingUp className="w-6 h-6 text-accent-cyan mr-3"/>
                            <h4 className="font-bold text-slate-lightest">Tiến độ học tập</h4>
                        </div>
                        <p className="text-sm text-slate">Bạn đang hoàn thành 70% chương trình học kỳ này. Điểm số ổn định so với kỳ trước.</p>
                    </div>
                    <div className="bg-navy p-6 rounded-lg border-t-4 border-red-500 shadow-lg">
                        <div className="flex items-center mb-2">
                            <AlertTriangle className="w-6 h-6 text-red-500 mr-3"/>
                            <h4 className="font-bold text-slate-lightest">Dự báo rủi ro</h4>
                        </div>
                         <p className="text-sm text-slate">Nguy cơ trượt môn Toán cao cấp là 40%, nếu không cải thiện điểm chuyên cần.</p>
                    </div>
                    <div className="bg-navy p-6 rounded-lg border-t-4 border-accent-yellow shadow-lg">
                        <div className="flex items-center mb-2">
                            <Lightbulb className="w-6 h-6 text-accent-yellow mr-3"/>
                            <h4 className="font-bold text-slate-lightest">Gợi ý học tập</h4>
                        </div>
                        <p className="text-sm text-slate">Điểm môn Tiếng Anh đang giảm. Hãy dành thêm 2 giờ mỗi tuần cho việc luyện nghe.</p>
                         <button className="text-sm text-accent-yellow font-semibold mt-2 inline-block hover:underline">Xem tài liệu gợi ý &rarr;</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Grades;