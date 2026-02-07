import React from 'react';
import { MealInfo } from '../types';
import { cleanDishName } from '../services/neisService';

interface MealCardProps {
  meal: MealInfo;
}

const MealCard: React.FC<MealCardProps> = ({ meal }) => {
  const dishes = cleanDishName(meal.DDISH_NM);
  
  // Format Date: 20240122 -> 2024년 01월 22일
  const formattedDate = `${meal.MLSV_YMD.substring(0, 4)}년 ${meal.MLSV_YMD.substring(4, 6)}월 ${meal.MLSV_YMD.substring(6, 8)}일`;
  
  // Extract simple calorie number if possible "666.6 Kcal"
  const calories = meal.CAL_INFO;

  // Determine tag color based on meal type (Breakfast/Lunch/Dinner)
  // Typically schools are mostly lunch (2).
  const getBadgeColor = () => {
     if(meal.MMEAL_SC_NM === '조식') return 'bg-orange-100 text-orange-700';
     if(meal.MMEAL_SC_NM === '석식') return 'bg-purple-100 text-purple-700';
     return 'bg-blue-100 text-blue-700';
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow h-full flex flex-col">
      <div className="flex justify-between items-start mb-6">
        <div>
            <h3 className="text-lg font-bold text-gray-900">{formattedDate}</h3>
            <span className={`inline-block mt-2 px-2.5 py-0.5 rounded text-xs font-medium ${getBadgeColor()}`}>
                {meal.MMEAL_SC_NM}
            </span>
        </div>
        <div className="bg-green-50 text-green-700 px-3 py-1 rounded-lg text-sm font-medium">
            {calories}
        </div>
      </div>

      <div className="flex-1">
        <p className="text-xs text-gray-400 font-medium mb-3 uppercase tracking-wider">오늘의 메뉴</p>
        <ul className="space-y-2">
            {dishes.map((dish, idx) => (
                <li key={idx} className="text-gray-700 text-base flex items-start gap-2">
                    {dish}
                </li>
            ))}
            {dishes.length === 0 && (
                <li className="text-gray-400 italic">메뉴 정보가 없습니다.</li>
            )}
        </ul>
      </div>
    </div>
  );
};

export default MealCard;
