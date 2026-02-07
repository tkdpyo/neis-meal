import React, { useState } from 'react';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import MealCard from './components/MealCard';
import SchoolSelectModal from './components/SchoolSelectModal';
import { SearchState, SchoolInfo, MealInfo } from './types';
import { searchSchools, getMeals } from './services/neisService';
import { MapPin, Info } from 'lucide-react';

// Utility to get today's date formatted for input (YYYY-MM-DD)
const getToday = () => new Date().toISOString().split('T')[0];
// Utility to get date 7 days from now
const getNextWeek = () => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toISOString().split('T')[0];
};

const App: React.FC = () => {
  const [searchState, setSearchState] = useState<SearchState>({
    officeCode: 'B10', // Default Seoul
    schoolName: '',
    startDate: getToday(),
    endDate: getNextWeek(),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [meals, setMeals] = useState<MealInfo[]>([]);
  const [selectedSchool, setSelectedSchool] = useState<SchoolInfo | null>(null);
  const [searchResults, setSearchResults] = useState<SchoolInfo[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Phase 1: Search for school
  const handleInitialSearch = async () => {
    if (!searchState.officeCode || !searchState.schoolName) return;

    setIsLoading(true);
    setErrorMsg(null);
    setMeals([]);
    setSelectedSchool(null);
    setHasSearched(false);

    try {
      const schools = await searchSchools(searchState.officeCode, searchState.schoolName);
      
      if (schools.length === 0) {
        setErrorMsg('검색된 학교가 없습니다. 학교명을 확인해주세요.');
        setIsLoading(false);
      } else if (schools.length === 1) {
        // Only one match, proceed directly to get meals
        handleSchoolSelect(schools[0]);
      } else {
        // Multiple matches, show modal
        setSearchResults(schools);
        setIsModalOpen(true);
        setIsLoading(false);
      }
    } catch (e) {
      setErrorMsg('학교 검색 중 오류가 발생했습니다.');
      setIsLoading(false);
    }
  };

  // Phase 2: School selected, fetch meals
  const handleSchoolSelect = async (school: SchoolInfo) => {
    setIsModalOpen(false);
    setSelectedSchool(school);
    setIsLoading(true); // Ensure loading is on if coming from modal
    
    // Update school name in search box to reflect selection
    setSearchState(prev => ({...prev, schoolName: school.SCHUL_NM}));

    try {
      const mealData = await getMeals(
        school.ATPT_OFCDC_SC_CODE,
        school.SD_SCHUL_CODE,
        searchState.startDate,
        searchState.endDate
      );
      
      // Sort meals by date and meal type
      const sortedMeals = mealData.sort((a, b) => {
          if (a.MLSV_YMD !== b.MLSV_YMD) return a.MLSV_YMD.localeCompare(b.MLSV_YMD);
          return a.MMEAL_SC_CODE.localeCompare(b.MMEAL_SC_CODE);
      });

      setMeals(sortedMeals);
      setHasSearched(true);
    } catch (e) {
      setErrorMsg('급식 정보를 가져오는 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-20">
      <Header />
      
      <SearchForm 
        searchState={searchState}
        setSearchState={setSearchState}
        onSearch={handleInitialSearch}
        isLoading={isLoading}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        
        {/* Error Message */}
        {errorMsg && (
          <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl mb-6 flex items-center gap-2">
            <Info className="w-5 h-5" />
            {errorMsg}
          </div>
        )}

        {/* Selected School Info Banner */}
        {selectedSchool && !isLoading && (
            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 mb-8 flex items-center gap-2 text-indigo-700">
                <MapPin className="w-5 h-5 text-indigo-600" />
                <span className="font-semibold">현재 선택된 학교:</span>
                <span className="underline decoration-indigo-300 underline-offset-4 font-bold">{selectedSchool.SCHUL_NM}</span>
            </div>
        )}

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {meals.map((meal, index) => (
                // Use composite key because one day can have multiple meals (unlikely in basic search but possible)
                <MealCard key={`${meal.MLSV_YMD}-${meal.MMEAL_SC_CODE}-${index}`} meal={meal} />
            ))}
        </div>

        {/* Empty State */}
        {hasSearched && meals.length === 0 && !isLoading && !errorMsg && (
            <div className="text-center py-20">
                <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Info className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">검색 결과가 없습니다</h3>
                <p className="text-gray-500 mt-1">해당 기간의 급식 정보가 없거나 휴일입니다.</p>
            </div>
        )}
      </div>

      <SchoolSelectModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        schools={searchResults}
        onSelect={handleSchoolSelect}
      />
    </div>
  );
};

export default App;
