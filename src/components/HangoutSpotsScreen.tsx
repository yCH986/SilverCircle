import React, { useState } from 'react';
import { AccessibilityTag, HangoutSpot } from '../types';

interface HangoutSpotsScreenProps {
  spots: HangoutSpot[];
  selectedSpotId: string | null;
  onSelectSpot: (spot: HangoutSpot) => void;
  onBackToMatch: () => void;
  districtName: string;
}

type FilterCategory = 'All' | 'Accessibility' | 'Low Trip Hazard' | 'Temperature' | 'Social & Rest';

export const HangoutSpotsScreen: React.FC<HangoutSpotsScreenProps> = ({
  spots,
  selectedSpotId,
  onSelectSpot,
  onBackToMatch,
  districtName,
}) => {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('All');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [hoveredSpotId, setHoveredSpotId] = useState<string | null>(null);

  // Priority sort: Show spots belonging to the matched district first
  const districtMatchedSpots = spots.filter(s => s.district.toLowerCase().includes(districtName.toLowerCase()));
  const otherDistrictSpots = spots.filter(s => !s.district.toLowerCase().includes(districtName.toLowerCase()));
  const displayPool = districtMatchedSpots.length > 0 ? [...districtMatchedSpots, ...otherDistrictSpots] : spots;

  const filterCategories: { label: FilterCategory; icon: string; count: number }[] = [
    { label: 'All', icon: 'apps', count: displayPool.length },
    { label: 'Accessibility', icon: 'accessible', count: displayPool.filter(s => s.tags.includes('Level Access') || s.tags.includes('Elevator Access') || s.tags.includes('Paved Paths')).length },
    { label: 'Low Trip Hazard', icon: 'do_not_step', count: displayPool.filter(s => s.tags.includes('Smooth Floors') || s.tags.includes('No Steps') || s.tags.includes('Low Trip Hazard')).length },
    { label: 'Temperature', icon: 'ac_unit', count: displayPool.filter(s => s.tags.includes('Climate Controlled')).length },
    { label: 'Social & Rest', icon: 'nature_people', count: displayPool.filter(s => s.tags.includes('Social Clubs') || s.tags.includes('Quiet Zone') || s.tags.includes('Rest Areas')).length },
  ];

  const filteredSpots = displayPool.filter((spot) => {
    if (activeCategory === 'Accessibility') {
      return spot.tags.includes('Level Access') || spot.tags.includes('Elevator Access') || spot.tags.includes('Paved Paths');
    }
    if (activeCategory === 'Low Trip Hazard') {
      return spot.tags.includes('Smooth Floors') || spot.tags.includes('No Steps') || spot.tags.includes('Low Trip Hazard');
    }
    if (activeCategory === 'Temperature') {
      return spot.tags.includes('Climate Controlled');
    }
    if (activeCategory === 'Social & Rest') {
      return spot.tags.includes('Social Clubs') || spot.tags.includes('Quiet Zone') || spot.tags.includes('Rest Areas');
    }
    if (activeTag) {
      return spot.tags.includes(activeTag as AccessibilityTag);
    }
    return true;
  });

  const currentSelectedSpot = displayPool.find(s => s.id === selectedSpotId) || displayPool[0];

  const mapBg = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAciYogn1k_4dMAuOwwWRQYqP0Q17y4Wd9Va0QcFHO8mnlAz6cOgURXZBGVrS1eGX9bZxQxFLU3iCHKFGC7EqUga6_0MbCmNECkFZUVOSHIS8lm2BOUP-0dkzqov7xhlWV-M856gSE5iIoq3h9BExwhmyf724CHczW6mo0C83vyRV9LWLdmYJiFFKuHE5QzG1hp7zzyIQLtpuB3fhSkdEHqJ7-L9mN6-ypEg01blDlYVtiHdrDGaMKc';

  return (
    <div className="flex flex-col w-full bg-[#faf9f7] pb-16 min-h-screen">
      {/* Top Breadcrumb & District Title Header */}
      <section className="bg-[#f4f3f1] border-b border-[#e3e2e0] py-8 px-5">
        <div className="max-w-[1140px] mx-auto flex flex-col gap-4">
          <button
            type="button"
            onClick={onBackToMatch}
            className="inline-flex items-center gap-2 text-[#004349] font-bold text-lg hover:text-[#a73927] transition-colors cursor-pointer w-fit"
          >
            <span className="material-symbols-outlined text-[24px]">arrow_back</span>
            <span>Back to Top Match ({districtName})</span>
          </button>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="font-headline font-bold text-3xl sm:text-4xl text-[#1a1c1b]">
                Community Spaces in {districtName}
              </h1>
              <p className="text-xl text-[#3f484a] mt-2 max-w-2xl leading-relaxed">
                Hand-picked, quiet, and highly accessible locations perfect for morning walks, afternoon tea, or quiet reading.
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm text-[#6f797a] bg-white px-4 py-2 rounded-xl border border-[#e3e2e0] shrink-0">
              <span className="material-symbols-outlined text-[#004349] text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                verified
              </span>
              <span>All spots inspected for senior safety</span>
            </div>
          </div>

          {/* Filter Categories Bar */}
          <div className="flex flex-wrap gap-2.5 pt-2">
            {filterCategories.map((cat) => {
              const isActive = activeCategory === cat.label;
              return (
                <button
                  key={cat.label}
                  type="button"
                  onClick={() => {
                    setActiveCategory(cat.label);
                    setActiveTag(null);
                  }}
                  className={`flex items-center gap-2 px-5 py-3 rounded-full font-bold text-base transition-all cursor-pointer shadow-sm ${
                    isActive
                      ? 'bg-[#004349] text-white shadow-md scale-102'
                      : 'bg-white hover:bg-[#efeeec] text-[#3f484a] border border-[#e3e2e0]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">{cat.icon}</span>
                  <span>{cat.label}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${isActive ? 'bg-[#abeef6] text-[#002023]' : 'bg-[#efeeec] text-[#6f797a]'}`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content Layout: Spots List (Left) + Interactive Map (Right) */}
      <section className="max-w-[1140px] mx-auto w-full px-5 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: List of Verified Spots (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <span className="font-bold text-lg text-[#1a1c1b]">
                Showing {filteredSpots.length} verified spaces
              </span>
              <span className="text-sm text-[#6f797a]">
                Click any spot to view full accessibility details
              </span>
            </div>

            {filteredSpots.map((spot) => {
              const isSelected = spot.id === currentSelectedSpot?.id;
              const isHovered = spot.id === hoveredSpotId;

              return (
                <div
                  key={spot.id}
                  onClick={() => onSelectSpot(spot)}
                  onMouseEnter={() => setHoveredSpotId(spot.id)}
                  onMouseLeave={() => setHoveredSpotId(null)}
                  className={`bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row cursor-pointer border-2 ${
                    isSelected
                      ? 'border-[#004349] ring-2 ring-[#004349]/20'
                      : 'border-[#e3e2e0] hover:border-[#bfc8c9]'
                  }`}
                >
                  {/* Image container */}
                  <div className="sm:w-2/5 relative min-h-[200px] sm:min-h-[220px] bg-[#efeeec] shrink-0 overflow-hidden">
                    <img
                      src={spot.image}
                      alt={spot.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    {spot.isCommunityFavorite && (
                      <span className="absolute top-3 left-3 bg-[#a73927] text-white font-bold text-xs px-3 py-1.5 rounded-full shadow-md uppercase tracking-wider">
                        Community Favorite
                      </span>
                    )}
                    <span className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-bold text-[#1a1c1b] flex items-center gap-1 shadow-sm">
                      <span className="material-symbols-outlined text-[16px] text-[#a73927]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        star
                      </span>
                      <span>{spot.rating}</span>
                      <span className="text-[#6f797a]">({spot.reviewCount})</span>
                    </span>
                  </div>

                  {/* Content container */}
                  <div className="sm:w-3/5 p-6 flex flex-col justify-between gap-4">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-headline font-bold text-2xl text-[#1a1c1b] hover:text-[#004349] transition-colors leading-tight">
                          {spot.name}
                        </h3>
                      </div>
                      
                      <p className="text-sm text-[#6f797a] flex items-center gap-1 mt-1">
                        <span className="material-symbols-outlined text-[16px]">location_on</span>
                        <span>{spot.address}</span>
                      </p>

                      <p className="text-base text-[#3f484a] leading-relaxed mt-2.5 line-clamp-2">
                        {spot.description}
                      </p>
                    </div>

                    {/* Criteria Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {spot.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-[#abeef6]/30 text-[#004349] font-semibold text-xs px-2.5 py-1 rounded-full border border-[#abeef6]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Footer Row */}
                    <div className="flex items-center justify-between border-t border-[#efeeec] pt-3 text-sm">
                      <span className="text-[#3f484a] font-medium flex items-center gap-1">
                        <span className="material-symbols-outlined text-[18px] text-[#0d5c63]">directions_bus</span>
                        <span className="truncate max-w-[200px]">{spot.transitSummary}</span>
                      </span>

                      <span className="font-bold text-[#004349] flex items-center gap-1 hover:text-[#a73927] transition-colors">
                        <span>Details</span>
                        <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Sticky Interactive Area Map (5 cols) */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 bg-white rounded-3xl p-6 shadow-xl border border-[#e3e2e0] flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-headline font-bold text-2xl text-[#1a1c1b] flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#004349] text-[26px]">map</span>
                    <span>Area Map</span>
                  </h2>
                  <p className="text-sm text-[#6f797a] mt-0.5">
                    Showing verified spots in {districtName}
                  </p>
                </div>
                <span className="bg-[#efeeec] text-[#004349] text-xs font-bold px-3 py-1.5 rounded-full">
                  GPS Verified
                </span>
              </div>

              {/* Map Canvas Visual Area */}
              <div className="relative w-full h-[360px] rounded-2xl overflow-hidden border border-[#bfc8c9] shadow-inner bg-[#efeeec]">
                <img
                  src={mapBg}
                  alt="Area Map Diagram"
                  className="w-full h-full object-cover"
                />
                
                {/* SVG Overlay / Pins */}
                {spots.map((spot, index) => {
                  const isCurrent = spot.id === currentSelectedSpot?.id;
                  const isHover = spot.id === hoveredSpotId;

                  return (
                    <button
                      key={spot.id}
                      type="button"
                      onClick={() => onSelectSpot(spot)}
                      onMouseEnter={() => setHoveredSpotId(spot.id)}
                      onMouseLeave={() => setHoveredSpotId(null)}
                      style={{ left: `${spot.mapCoords.x}%`, top: `${spot.mapCoords.y}%` }}
                      className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 z-20 ${
                        isCurrent || isHover ? 'scale-125 z-30' : 'scale-100'
                      }`}
                      title={`${spot.name} (${spot.category})`}
                    >
                      <div className={`relative flex items-center justify-center ${
                        isCurrent ? 'animate-bounce' : ''
                      }`}>
                        {/* Ripple ping */}
                        {isCurrent && (
                          <span className="absolute w-12 h-12 rounded-full bg-[#a73927]/40 animate-ping" />
                        )}
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white shadow-xl border-2 ${
                          isCurrent
                            ? 'bg-[#a73927] border-white ring-4 ring-[#ffdad4]'
                            : 'bg-[#004349] border-white'
                        }`}>
                          <span className="font-bold text-sm">{index + 1}</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Selected Spot Quick Info Bar at Bottom of Map */}
              {currentSelectedSpot && (
                <div className="bg-[#f4f3f1] p-4 rounded-2xl border border-[#e3e2e0] flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={currentSelectedSpot.image}
                      alt={currentSelectedSpot.name}
                      className="w-14 h-14 rounded-xl object-cover shadow-sm shrink-0"
                    />
                    <div className="min-w-0 flex-grow">
                      <h4 className="font-headline font-bold text-lg text-[#1a1c1b] truncate">
                        {currentSelectedSpot.name}
                      </h4>
                      <p className="text-xs text-[#6f797a] truncate">
                        {currentSelectedSpot.address}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
                    <div className="bg-white p-2 rounded-lg border border-[#e3e2e0] flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-[#004349]">accessible_forward</span>
                      <span>Level Floors: {currentSelectedSpot.criteriaScores.lowTripHazard}%</span>
                    </div>
                    <div className="bg-white p-2 rounded-lg border border-[#e3e2e0] flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-[#004349]">ac_unit</span>
                      <span>Climate Comfort: {currentSelectedSpot.criteriaScores.temperatureControlled}%</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectSpot(currentSelectedSpot)}
                    className="w-full py-2.5 bg-[#004349] hover:bg-[#0d5c63] text-white font-bold text-base rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <span>View Full Venue Profile & Voice Tour</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
