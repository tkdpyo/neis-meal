import { NEIS_API_KEY, NEIS_BASE_URL } from '../constants';
import { SchoolInfo, MealInfo, NeisResponse } from '../types';

/**
 * Searches for schools based on the education office and school name.
 */
export const searchSchools = async (officeCode: string, schoolName: string): Promise<SchoolInfo[]> => {
  const params = new URLSearchParams({
    KEY: NEIS_API_KEY,
    Type: 'json',
    pIndex: '1',
    pSize: '100',
    ATPT_OFCDC_SC_CODE: officeCode,
    SCHUL_NM: schoolName,
  });

  try {
    const response = await fetch(`${NEIS_BASE_URL}/schoolInfo?${params.toString()}`);
    const data: NeisResponse<SchoolInfo> = await response.json();

    // Check for API error or empty result structure
    if (data.RESULT && data.RESULT.CODE !== 'INFO-000') {
        // Fallback if the top level has an error
        return [];
    }
    
    // The specific key for this API is 'schoolInfo'
    if (data.schoolInfo) {
      return data.schoolInfo[1].row;
    }
    
    return [];
  } catch (error) {
    console.error("Failed to fetch schools:", error);
    return [];
  }
};

/**
 * Fetches meal data for a specific school and date range.
 */
export const getMeals = async (
  officeCode: string, 
  schoolCode: string, 
  startDate: string, 
  endDate: string
): Promise<MealInfo[]> => {
  // Format dates to YYYYMMDD
  const cleanStartDate = startDate.replace(/-/g, '');
  const cleanEndDate = endDate.replace(/-/g, '');

  const params = new URLSearchParams({
    KEY: NEIS_API_KEY,
    Type: 'json',
    pIndex: '1',
    pSize: '100',
    ATPT_OFCDC_SC_CODE: officeCode,
    SD_SCHUL_CODE: schoolCode,
    MLSV_FROM_YMD: cleanStartDate,
    MLSV_TO_YMD: cleanEndDate,
  });

  try {
    const response = await fetch(`${NEIS_BASE_URL}/mealServiceDietInfo?${params.toString()}`);
    const data: NeisResponse<MealInfo> = await response.json();

    if (data.mealServiceDietInfo) {
      return data.mealServiceDietInfo[1].row;
    }

    return [];
  } catch (error) {
    console.error("Failed to fetch meals:", error);
    return [];
  }
};

/**
 * Helper to clean the dish name string (remove allergy codes).
 * Example: "Rice(1.2.)" -> "Rice"
 */
export const cleanDishName = (dishString: string): string[] => {
  // Split by <br/> which is standard in NEIS API
  const dishes = dishString.split(/<br\/>|<br>/gi);
  
  return dishes.map(dish => {
    // Remove allergy numbers like (1.2.5.13) or 1.2.
    // Regex explanation: Match a generic open parenthesis, numbers/dots, close parenthesis
    // Also remove trailing numbers/dots if not in parenthesis
    return dish.replace(/\([0-9\.]+\)/g, '').replace(/[0-9]+\./g, '').trim();
  }).filter(d => d.length > 0);
};
