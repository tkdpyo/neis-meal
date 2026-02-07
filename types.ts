export interface SchoolInfo {
  ATPT_OFCDC_SC_CODE: string; // Office Code (e.g., B10)
  SD_SCHUL_CODE: string;      // School Code
  SCHUL_NM: string;           // School Name
  LCTN_SC_NM: string;         // Location Name (e.g., Seoul)
  ORG_RDNMA: string;          // Address
}

export interface MealInfo {
  MLSV_YMD: string;           // Date (YYYYMMDD)
  MMEAL_SC_CODE: string;      // Meal Code (1: Breakfast, 2: Lunch, 3: Dinner)
  MMEAL_SC_NM: string;        // Meal Name
  DDISH_NM: string;           // Dish List (HTML formatted)
  CAL_INFO: string;           // Calories
  NTR_INFO: string;           // Nutritional Info
}

interface NeisResult {
  CODE: string;
  MESSAGE: string;
}

export interface NeisResponse<T> {
  // Top level RESULT for errors or status (e.g., INFO-200)
  RESULT?: NeisResult;

  // Specific service response keys
  schoolInfo?: [
    {
      head: [
        { list_total_count: number },
        { RESULT: NeisResult }
      ]
    },
    {
      row: T[]
    }
  ];

  mealServiceDietInfo?: [
    {
      head: [
        { list_total_count: number },
        { RESULT: NeisResult }
      ]
    },
    {
      row: T[]
    }
  ];
}

export interface SearchState {
  officeCode: string;
  schoolName: string;
  startDate: string;
  endDate: string;
}