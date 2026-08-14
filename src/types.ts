export type GenderOption = 'female' | 'male' | 'all';

export type AgeRangeOption =
  | '60-64'
  | '65-69'
  | '70-74'
  | '75-79'
  | '80-84'
  | '85-89'
  | '90+';

export interface DiscoveryFilters {
  gender: GenderOption | null;
  ageRanges: AgeRangeOption[];
  interests?: string[];
  maxTransitTimeMinutes?: number;
}

export interface SingStatDistrictData {
  id: string;
  name: string;
  region: 'Central' | 'East' | 'West' | 'North' | 'North-East';
  totalPopulation: number;
  seniorPopulationTotal: number;
  byAgeRange: Record<AgeRangeOption, { male: number; female: number }>;
  seniorCentricAmenitiesCount: number;
  mrtAccessibilityScore: number; // out of 100
  walkingShelteredScore: number; // out of 100
  topActivities: string[];
  description: string;
  transitNote: string;
  socialNote: string;
  mapImage: string;
  coordinates: { lat: number; lng: number };
}

export interface SingStatM810771Data {
  tableId: string;
  tableName: string;
  dataUrl: string;
  lastUpdatedYear: string;
  isLiveFetched: boolean;
  totalNationalSeniors: number;
  matchedNationalDemographicCount: number;
  demographicBreakdown: {
    ageRange: string;
    male: number;
    female: number;
    total: number;
  }[];
}

export interface PlanningRegionMatchInfo {
  regionCode: string;
  regionName: string;
  matchedSeniorsCount: number;
  totalSeniorsInRegion: number;
  totalPopulationInRegion: number;
  percentageOfNationalCohort: number;
  percentageOfRegionSeniors: number;
  matchScore: number;
  activeWeeklyEstimate: number;
  rank: number;
  keyEstates: string[];
  primaryEstate: string;
  transitSummary: string;
  socialNote: string;
  demographicBreakdown: {
    ageBand: string;
    matchedCount: number;
    male: number;
    female: number;
    total: number;
  }[];
}

export interface DistrictMatchResult {
  planningRegion: PlanningRegionMatchInfo;
  allRegionRankings: PlanningRegionMatchInfo[];
  selectedFiltersSummary: {
    gender: GenderOption;
    ageRanges: AgeRangeOption[];
    selectedYear: string;
    totalNationalMatchedSeniors: number;
    totalNationalSeniors60Plus: number;
  };
  district: SingStatDistrictData;
  matchRate: number; // percentage, e.g., 87%
  potentialFriendsCount: number;
  rank: number;
  comparisonScores: {
    districtName: string;
    count: number;
    percentage: number;
  }[];
  whyThisLocation: {
    proximity: string;
    socialActivityLevel: string;
  };
  singstatSource?: SingStatM810771Data;
}

export type AccessibilityTag =
  | 'Level Access'
  | 'Smooth Floors'
  | 'Climate Controlled'
  | 'Elevator Access'
  | 'Social Clubs'
  | 'Quiet Zone'
  | 'Paved Paths'
  | 'No Steps'
  | 'Rest Areas'
  | 'Accessible Restrooms'
  | 'Hearing Friendly'
  | 'Tactile Paving'
  | 'Low Trip Hazard';

export interface HangoutSpot {
  id: string;
  name: string;
  category: 'Cafe' | 'Library' | 'Park & Garden' | 'Community Club' | 'Wellness Hub';
  district: string;
  address: string;
  description: string;
  image: string;
  isCommunityFavorite?: boolean;
  isRecommended?: boolean;
  rating: number;
  reviewCount: number;
  tags: AccessibilityTag[];
  criteriaScores: {
    accessibility: number; // 1-100
    lowTripHazard: number; // 1-100
    temperatureControlled: number; // 1-100
    seniorFriendlyActivities: number; // 1-100
  };
  openingHours: string;
  transitSummary: string;
  specialAmenities: string[];
  mapCoords: { x: number; y: number }; // percentage position on visual map
}

export type AppScreen = 'home' | 'discover' | 'results' | 'hangout-spots' | 'about-us';

export interface SingStatRegionPopulationData {
  regionCode: string;
  regionName: string;
  totalSeniors60Plus: number;
  totalPopulation: number;
  maleSeniors60Plus: number;
  femaleSeniors60Plus: number;
  ageBands60Plus: {
    ageBand: string;
    total: number;
    male: number;
    female: number;
  }[];
}

export interface SingStatPlanningRegionApiResponse {
  success: boolean;
  isLive: boolean;
  source: string;
  tableId: string;
  tableName: string;
  unitOfMeasure: string;
  lastUpdated: string;
  availableYears: string[];
  latestYear: string;
  dataByYear: Record<
    string,
    {
      year: string;
      totalSingaporeSeniors60Plus: number;
      regions: SingStatRegionPopulationData[];
    }
  >;
}
