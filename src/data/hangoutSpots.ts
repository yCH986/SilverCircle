import { HangoutSpot } from '../types';

export const HANGOUT_SPOTS: HangoutSpot[] = [
  // Bedok Spots (Top Matched Planning Area for Female 60-64)
  {
    id: 'heartbeat-bedok-lounge',
    name: 'Heartbeat@Bedok Active Ageing Lounge',
    category: 'Wellness Hub',
    district: 'Bedok',
    address: '11 Bedok North Street 1, #01-08 Heartbeat Complex',
    description: 'An integrated lifestyle hub with barrier-free access, gentle morning stretching classes, acoustic-friendly tea tables, and daily community gatherings.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAe6T9_XtfBAaeuz-t9ufJmXX-sVHye-6XaLJ7waF8P1UTEuyGOguEDQ-PNeAqY-GSUGJexnoIW6MS3GqOqE9t-baR0UAfbo3Kkv8qjXwjwA56bF2NplhDulUtheJ-pg2LXmIQ2NNoVlG3VDCvwjlL13g0ecdkQh1vLn_e_CGCXMg2_UdUmm0xO0Fkb72Dgz6OHA40-E4iRe3TeOl7zJ1jXVi6t748yX0Z_vKnDmZNOdhk01z0rBhyh',
    isCommunityFavorite: true,
    isRecommended: true,
    rating: 4.9,
    reviewCount: 230,
    tags: ['Level Access', 'Elevator Access', 'Climate Controlled', 'Social Clubs'],
    criteriaScores: {
      accessibility: 99,
      lowTripHazard: 98,
      temperatureControlled: 97,
      seniorFriendlyActivities: 99,
    },
    openingHours: '8:00 AM – 8:00 PM Daily (Senior Circle 9:30 AM & 3:00 PM)',
    transitSummary: 'Direct sheltered barrier-free link from Bedok MRT (Exit B) and Bus Interchange',
    specialAmenities: [
      'Automatic sliding entry with zero-threshold doorways',
      'Ergonomic armchairs with firm lumbar cushioning',
      'Free community hot water & tea dispenser corner',
      'Spacious elevators with voice announcements and large tactile buttons',
      'Regular complimentary health checkups & digital clinic'
    ],
    mapCoords: { x: 42, y: 38 }
  },
  {
    id: 'bedok-reservoir-teahouse',
    name: 'Bedok Reservoir Lakeside Teahouse',
    category: 'Cafe',
    district: 'Bedok',
    address: '701 Bedok Reservoir Road, Deck 2 Waterfront',
    description: 'A serene open-air sheltered cafe overlooking the calm waters of Bedok Reservoir with paved walking paths and shaded resting benches.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWPl1a8suDtaHhdRvwljIqKbxOHbGY9d3fkJhh6N46gEwA542Ase8TunuQt18s-BB8ZB6hQ0xoQhOhAB2f9kBa-XUUFaevgl2hKIZtrR4YBQTsX-UmRalkWHX_-zCNJYRvchF9vV_CoZgEnr6mh8aXq77cKhbyzqMyQjXqz0Qi6fxPaldgw5rTf7jv53HPcT4hg19wKXHrd2wFNVTCQtaJNYd5qzOP2_zuvjrDcjhU1KxLWBXtewA5',
    isCommunityFavorite: true,
    isRecommended: true,
    rating: 4.8,
    reviewCount: 165,
    tags: ['Paved Paths', 'No Steps', 'Rest Areas', 'Low Trip Hazard'],
    criteriaScores: {
      accessibility: 96,
      lowTripHazard: 95,
      temperatureControlled: 90,
      seniorFriendlyActivities: 94,
    },
    openingHours: '7:30 AM – 7:00 PM Daily',
    transitSummary: '5-minute flat walk via sheltered ramp from Bedok Reservoir MRT (Exit A)',
    specialAmenities: [
      'Completely flat timber boardwalks with non-slip ridges',
      'Low-sugar herbal teas, fresh steamed buns, and warm multigrain porridge',
      'Wheelchair and mobility scooter charging point',
      'Shaded scenic benches positioned every 40 meters along the water'
    ],
    mapCoords: { x: 68, y: 55 }
  },
  {
    id: 'bedok-town-square-hub',
    name: 'Bedok Town Square Silver Pavilion',
    category: 'Community Club',
    district: 'Bedok',
    address: '208 New Upper Changi Road, Bedok Central',
    description: 'A breezy, high-roof community plaza featuring chess tables, daily morning qigong circles, and convenient adjoining bakeries.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWpdlU921NrJ0-mGzIupzhs65hujEunzyCDoFJZWK-Yr33uPBQeHxgUStI-Ar4MKSdiqQ3p7wXBGHPlvtvWlb8sCBSlquCazzEhmNrHsqD4I_asc90KFTc7p68QfaW_SYZgYZSHJk0jCIfUGrhx7JuoTDA2mQGhtEBN9wUeGGpt96oPNrxy-B3tKurf-pyGJKiZXNYt9PiFCc0bG_v57XtJ4Kan60XxOIjVsKMCf_KiCubZLssTqYS',
    isCommunityFavorite: false,
    isRecommended: true,
    rating: 4.8,
    reviewCount: 198,
    tags: ['Level Access', 'Smooth Floors', 'Rest Areas', 'Social Clubs'],
    criteriaScores: {
      accessibility: 97,
      lowTripHazard: 96,
      temperatureControlled: 89,
      seniorFriendlyActivities: 97,
    },
    openingHours: '6:30 AM – 9:30 PM Daily',
    transitSummary: 'Direct ground level access adjacent to Bedok Mall & Interchange',
    specialAmenities: [
      'Generous barrier-free public seating with sturdy support handles',
      'Large high-volume low-speed overhead fans for constant ventilation',
      'Senior-friendly washrooms with emergency pull cords',
      'Nearby traditional kopi stalls with step-free ordering counters'
    ],
    mapCoords: { x: 35, y: 65 }
  },

  // Toa Payoh Spots
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
  },

  // Ang Mo Kio Spots
  {
    id: 'amk-silver-botanics',
    name: 'Ang Mo Kio Town Garden West Garden Pavilion',
    category: 'Park & Garden',
    district: 'Ang Mo Kio',
    address: 'Opposite Ang Mo Kio Public Library, Ave 6',
    description: 'A quiet landscaped garden pavilion with level footpaths, tranquil lotus ponds, and organized daily senior morning walks.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBA0ptKVqgp74r7ZALzK068smxZb1GsfLc2TQ7PP3IN2BdFMCPQeL_KaB2c94oxe9KGWkTias4pEVY8CStXMECx48YnTR-QhNRqFgKqfCf7LV81I3yqsfAWio85ftJYuuXt-_CLzMBZE9KwuAnjPSUQaI8WFTC1-ZYnW9fSr-OCsl47uHnFTzXZp7jP0E3PT26rdzyhIRDcMfezTEgm8n1YipFuzBGaIkgTnlZOkck_6zLpYXqlcZqW',
    isCommunityFavorite: false,
    isRecommended: true,
    rating: 4.8,
    reviewCount: 145,
    tags: ['Paved Paths', 'Rest Areas', 'No Steps', 'Quiet Zone'],
    criteriaScores: {
      accessibility: 95,
      lowTripHazard: 94,
      temperatureControlled: 88,
      seniorFriendlyActivities: 96,
    },
    openingHours: '6:00 AM – 10:00 PM Daily',
    transitSummary: 'Fully covered walkway from Ang Mo Kio MRT Station (Exit B)',
    specialAmenities: [
      'Wide tarmac walkways accommodating walking frames',
      'Rest alcoves with backrests and arm supports',
      'Braille signage along botanical trail'
    ],
    mapCoords: { x: 55, y: 45 }
  },

  // Queenstown Spots
  {
    id: 'queenstown-wellness-haven',
    name: 'Queenstown Silver Health Pavilion',
    category: 'Wellness Hub',
    district: 'Queenstown',
    address: '100 Strathmore Avenue, Health District Hub',
    description: 'Pioneering health district hub featuring therapeutic sensory gardens, low-impact exercise machines, and daily peer coffee hours.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAe6T9_XtfBAaeuz-t9ufJmXX-sVHye-6XaLJ7waF8P1UTEuyGOguEDQ-PNeAqY-GSUGJexnoIW6MS3GqOqE9t-baR0UAfbo3Kkv8qjXwjwA56bF2NplhDulUtheJ-pg2LXmIQ2NNoVlG3VDCvwjlL13g0ecdkQh1vLn_e_CGCXMg2_UdUmm0xO0Fkb72Dgz6OHA40-E4iRe3TeOl7zJ1jXVi6t748yX0Z_vKnDmZNOdhk01z0rBhyh',
    isCommunityFavorite: true,
    isRecommended: true,
    rating: 4.9,
    reviewCount: 172,
    tags: ['Level Access', 'Social Clubs', 'Climate Controlled', 'Smooth Floors'],
    criteriaScores: {
      accessibility: 98,
      lowTripHazard: 97,
      temperatureControlled: 95,
      seniorFriendlyActivities: 98,
    },
    openingHours: '8:00 AM – 7:00 PM (Monday to Saturday)',
    transitSummary: 'Sheltered linkway with gentle gradient from Queenstown MRT',
    specialAmenities: [
      'Wheelchair friendly raised herb beds',
      'Dedicated health consultation room for seniors',
      'Free warm chamomile and ginger tea'
    ],
    mapCoords: { x: 40, y: 70 }
  }
];

