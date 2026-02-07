import React from 'react';
import { Search, Calendar } from 'lucide-react';
import { OFFICE_CODES } from '../constants';
import { SearchState } from '../types';

interface SearchFormProps {
  searchState: SearchState;
  setSearchState: React.Dispatch<React.SetStateAction<SearchState>>;
  onSearch: () => void;
  isLoading: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ 
  searchState, 
  setSearchState, 
  onSearch,
  isLoading 
}) => {
  
  const handleChange = (field: keyof SearchState, value: string) => {
    setSearchState(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 -mt-8 relative z-10 mx-4 sm:mx-6 lg:mx-auto max-w-7xl border border-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
        
        {/* Education Office Select */}
        <div className="md:col-span-3">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            교육청 선택
          </label>
          <div className="relative">
            <select
              value={searchState.officeCode}
              onChange={(e) => handleChange('officeCode', e.target.value)}
              className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            >
              <option value="" disabled>교육청을 선택하세요</option>
              {OFFICE_CODES.map((office) => (
                <option key={office.code} value={office.code}>
                  {office.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>
        </div>

        {/* School Name Input */}
        <div className="md:col-span-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            학교명 입력
          </label>
          <div className="relative">
             <input
              type="text"
              value={searchState.schoolName}
              onChange={(e) => handleChange('schoolName', e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onSearch()}
              placeholder="예: 서울행당초등학교"
              className="w-full bg-gray-50 border border-gray-200 text-gray-700 py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Date Range */}
        <div className="md:col-span-3">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
                조회 기간
            </label>
            <div className="flex items-center gap-2">
                <div className="relative flex-1">
                    <input 
                        type="date"
                        value={searchState.startDate}
                        onChange={(e) => handleChange('startDate', e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 text-gray-700 py-3 px-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                    />
                </div>
                <span className="text-gray-400">~</span>
                <div className="relative flex-1">
                    <input 
                        type="date"
                        value={searchState.endDate}
                        onChange={(e) => handleChange('endDate', e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 text-gray-700 py-3 px-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                    />
                </div>
            </div>
        </div>

        {/* Search Button */}
        <div className="md:col-span-2">
          <button
            onClick={onSearch}
            disabled={isLoading || !searchState.officeCode || !searchState.schoolName}
            className="w-full bg-[#5C5CFF] hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed h-[50px]"
          >
            {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
            ) : (
                <>
                    <Search className="w-5 h-5" />
                    <span>급식 조회하기</span>
                </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};

export default SearchForm;
