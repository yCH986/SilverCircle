import { HangoutSpot } from '../types';

export const HANGOUT_SPOTS: HangoutSpot[] = [
  {
    id: 'oakwood-cafe',
    name: 'Oakwood Conservatory Cafe',
    category: 'Cafe',
    district: 'Toa Payoh',
    address: '180 Lorong 2 Toa Payoh, #01-12 Oasis Pavilion',
    description: 'A peaceful indoor garden cafe with wide, flat pathways and excellent acoustic treatments for easy conversation.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWPl1a8suDtaHhdRvwljIqKbxOHbGY9d3fkJhh6N46gEwA542Ase8TunuQt18s-BB8ZB6hQ0xoQhOhAB2f9kBa-XUUFaevgl2hKIZtrR4YBQTsX-UmRalkWHX_-zCNJYRvchF9vV_CoZgEnr6mh8aXq77cKhbyzqMyQjXqz0Qi6fxPaldgw5rTf7jv53HPcT4hg19wKXHrd2wFNVTCQtaJNYd5qzOP2_zuvjrDcjhU1KxLWBXtewA5',
    isCommunityFavorite: true,
    isRecommended: true,
    rating: 4.9,
    reviewCount: 142,
    tags: ['Level Access', 'Smooth Floors', 'Climate Controlled', 'Hearing Friendly'],
    criteriaScores: {
      accessibility: 98,
      lowTripHazard: 96,
      temperatureControlled: 95,
      seniorFriendlyActivities: 92,
    },
    openingHours: '8:00 AM – 6:30 PM Daily (Senior Tea Hour 2:00 PM – 4:30 PM)',
    transitSummary: '3-minute sheltered walk from Toa Payoh MRT Station (Exit B)',
    specialAmenities: [
      'High-backed ergonomic armchairs with firm support',
      'Acoustic damping walls reducing background din',
      'Magnifying menu glasses and large-print menus',
      'Wheelchair accessible washroom with dual support grab bars',
      'Herbal low-sugar tea selections & warm oat milk'
    ],
    mapCoords: { x: 32, y: 36 }
  },
  {
    id: 'civic-library',
    name: 'Riverside Civic Library',
    category: 'Library',
    district: 'Toa Payoh / Bishan',
    address: '6 Toa Payoh Central, Silver Resource Hub',
    description: 'Quiet reading zones, large print collections, and daily organized social hours in a respectful environment.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFioznY1Yh_fPBTqkjv7C8mv9QVqUyav6pxpLWKdXSLly4xyC6Jf4kUKJl1p-p_S7qWqjsOvEARuW9eWl_MCz0L7CdQET-kV0hock3y86_qoRQXXIsw4BcLtRuiLeiEU2ythtm97EiDzLP7_6ybvW2lJFRxbdRGFcAWs2SvxS8l5hPuUVs-AvFFTkFX-3aWRDvL99rBIgPiXwAPlRI3ZFWmqk3amADum6wu-oAL-RkrtsyA_UBwE-u',
    isCommunityFavorite: false,
    isRecommended: true,
    rating: 4.8,
    reviewCount: 98,
    tags: ['Elevator Access', 'Social Clubs', 'Quiet Zone', 'Tactile Paving'],
    criteriaScores: {
      accessibility: 95,
      lowTripHazard: 98,
      temperatureControlled: 94,
      seniorFriendlyActivities: 96,
    },
    openingHours: '10:00 AM – 9:00 PM (Senior Book Club Tuesdays at 10:30 AM)',
    transitSummary: 'Directly linked to Central Bus Interchange with automatic double doors',
    specialAmenities: [
      'Dedicated Silver Zone reading alcoves with anti-glare lamps',
      'Weekly Digital Clinic for seniors (phone & tablet assistance)',
      'Newspaper sharing lounge with comfortable reading tables',
      'Assistive audio induction loop for hearing aid users',
      'Full barrier-free lift access to all 4 levels'
    ],
    mapCoords: { x: 74, y: 48 }
  },
  {
    id: 'heritage-gardens',
    name: 'Heritage Botanical Gardens',
    category: 'Park & Garden',
    district: 'Toa Payoh',
    address: 'Lorong 6 Toa Payoh, Lakeside Walk',
    description: 'Paved, level walking paths with abundant seating areas every 50 meters. Perfect for gentle exercise and fresh air.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBA0ptKVqgp74r7ZALzK068smxZb1GsfLc2TQ7PP3IN2BdFMCPQeL_KaB2c94oxe9KGWkTias4pEVY8CStXMECx48YnTR-QhNRqFgKqfCf7LV81I3yqsfAWio85ftJYuuXt-_CLzMBZE9KwuAnjPSUQaI8WFTC1-ZYnW9fSr-OCsl47uHnFTzXZp7jP0E3PT26rdzyhIRDcMfezTEgm8n1YipFuzBGaIkgTnlZOkck_6zLpYXqlcZqW',
    isCommunityFavorite: false,
    isRecommended: true,
    rating: 4.9,
    reviewCount: 215,
    tags: ['Paved Paths', 'No Steps', 'Rest Areas', 'Low Trip Hazard'],
    criteriaScores: {
      accessibility: 94,
      lowTripHazard: 93,
      temperatureControlled: 88,
      seniorFriendlyActivities: 95,
    },
    openingHours: '6:00 AM – 10:00 PM Daily (Morning Tai Chi at 7:00 AM)',
    transitSummary: '5-minute stroll via flat sheltered linkway from Community Club',
    specialAmenities: [
      'Continuous smooth tarmac walking loop with zero kerbs or steps',
      'Heavy hardwood benches with armrests positioned every 50m',
      'Mature rain tree canopy providing dense sun shade',
      'Reflexology sensory foot path with safety handrails',
      'Public water coolers at wheelchair height'
    ],
    mapCoords: { x: 62, y: 72 }
  },
  {
    id: 'sunrise-bakery',
    name: 'Sunrise Bakery & Cafe',
    category: 'Cafe',
    district: 'Toa Payoh Central',
    address: '53 Lorong 5 Toa Payoh, #01-04',
    description: 'Traditional morning coffee and fresh whole-grain toast served in a calm, step-free bakery with friendly staff.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWpdlU921NrJ0-mGzIupzhs65hujEunzyCDoFJZWK-Yr33uPBQeHxgUStI-Ar4MKSdiqQ3p7wXBGHPlvtvWlb8sCBSlquCazzEhmNrHsqD4I_asc90KFTc7p68QfaW_SYZgYZSHJk0jCIfUGrhx7JuoTDA2mQGhtEBN9wUeGGpt96oPNrxy-B3tKurf-pyGJKiZXNYt9PiFCc0bG_v57XtJ4Kan60XxOIjVsKMCf_KiCubZLssTqYS',
    isCommunityFavorite: true,
    isRecommended: true,
    rating: 4.8,
    reviewCount: 120,
    tags: ['No Steps', 'Level Access', 'Climate Controlled', 'Rest Areas'],
    criteriaScores: {
      accessibility: 97,
      lowTripHazard: 95,
      temperatureControlled: 92,
      seniorFriendlyActivities: 90,
    },
    openingHours: '7:00 AM – 5:00 PM Daily',
    transitSummary: 'Located right next to Central Market with ground floor access',
    specialAmenities: [
      'No stairs entrance with wide automated sliding door',
      'Warm traditional kopi and kaya toast prepared with reduced sugar',
      'Spacious aisles accommodating walking frames and electric scooters',
      'Non-slip textured tile flooring'
    ],
    mapCoords: { x: 45, y: 40 }
  },
  {
    id: 'active-ageing-hub',
    name: 'Toa Payoh Silver Wellness Pavilion',
    category: 'Wellness Hub',
    district: 'Toa Payoh',
    address: '125A Lorong 1 Toa Payoh',
    description: 'A purpose-built senior recreational pavilion offering low-impact gymnastics, community gardening, and tea circles.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAe6T9_XtfBAaeuz-t9ufJmXX-sVHye-6XaLJ7waF8P1UTEuyGOguEDQ-PNeAqY-GSUGJexnoIW6MS3GqOqE9t-baR0UAfbo3Kkv8qjXwjwA56bF2NplhDulUtheJ-pg2LXmIQ2NNoVlG3VDCvwjlL13g0ecdkQh1vLn_e_CGCXMg2_UdUmm0xO0Fkb72Dgz6OHA40-E4iRe3TeOl7zJ1jXVi6t748yX0Z_vKnDmZNOdhk01z0rBhyh',
    isCommunityFavorite: true,
    isRecommended: true,
    rating: 4.9,
    reviewCount: 184,
    tags: ['Social Clubs', 'Level Access', 'Climate Controlled', 'Smooth Floors'],
    criteriaScores: {
      accessibility: 99,
      lowTripHazard: 97,
      temperatureControlled: 96,
      seniorFriendlyActivities: 99,
    },
    openingHours: '8:30 AM – 6:00 PM (Monday to Saturday)',
    transitSummary: 'Direct feeder bus stop right in front with sheltered boarding',
    specialAmenities: [
      'Daily morning stretching & resistance band circles',
      'Raised plant beds designed for gardening without bending down',
      'Nurse on site for complimentary blood pressure and health checkups',
      'Communal pantry with complimentary hot barley and green tea'
    ],
    mapCoords: { x: 50, y: 60 }
  }
];
