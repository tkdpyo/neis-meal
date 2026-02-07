import React from 'react';
import { Utensils } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <div className="bg-[#5C5CFF] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                <Utensils className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">학교 급식 정보 조회</h1>
        </div>
        <p className="text-indigo-100 text-lg">
          전국의 학교 식단을 날짜별로 간편하게 확인해보세요.
        </p>
      </div>
    </div>
  );
};

export default Header;
