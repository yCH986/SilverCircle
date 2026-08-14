import React from 'react';
import { DistrictMatchResult } from '../types';

interface MatchResultsScreenProps {
  result: DistrictMatchResult;
  onViewHangoutSpots: () => void;
  onAdjustFilters: () => void;
  onOpenSingStat: () => void;
}

export const MatchResultsScreen: React.FC<MatchResultsScreenProps> = ({
  result,
  onViewHangoutSpots,
  onAdjustFilters,
  onOpenSingStat,
}) => {
  const district = result.district;
  const singstat = result.singstatSource;

  return (
    <div className="flex flex-col w-full bg-[#faf9f7] pb-16">
      {/* Top Banner Matching Screen */}
      <div className="relative w-full overflow-hidden bg-[#f4f3f1] min-h-[420px] flex items-center py-12 px-5 md:px-10 rounded-b-[32px] border-b border-[#e3e2e0]">
        <div
          className="absolute inset-0 opacity-25 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle at 70% 30%, #abeef6 0%, transparent 50%), radial-gradient(circle at 30% 70%, #c5e7ff 0%, transparent 50%)',
          }}
        />

        <div className="max-w-[1140px] mx-auto w-full relative z-10 flex flex-col md:flex-row items-center gap-10">
          {/* Left Hero Text */}
          <div className="w-full md:w-1/2 flex flex-col gap-5">
            <div className="flex flex-wrap items-center gap-2 text-[#004349]">
              <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                stars
              </span>
              <span className="font-bold text-sm tracking-wider uppercase text-[#004349]">
                Your Top Match
              </span>
              {singstat && (
                <a
                  href={singstat.dataUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="ml-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#004349]/10 hover:bg-[#004349]/20 text-[#004349] text-xs font-semibold transition-colors"
                  title="Source: SingStat Table TS/M810771"
                >
                  <span className="material-symbols-outlined text-[14px]">link</span>
                  <span>SingStat M810771 Synced</span>
                </a>
              )}
            </div>

            <h1 className="font-headline font-bold text-4xl sm:text-5xl text-[#1a1c1b] leading-tight">
              {district.name} is your best match today!
            </h1>

            <p className="text-xl text-[#3f484a] max-w-[500px] leading-relaxed">
              Calculated using official population distributions from Singapore Department of Statistics (Table TS/M810771).
            </p>

            <div className="flex flex-wrap gap-4 mt-2">
              <button
                type="button"
                onClick={onViewHangoutSpots}
                className="bg-[#a73927] hover:bg-[#701104] text-white font-bold text-xl px-8 py-4 rounded-2xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center gap-3 cursor-pointer group"
              >
                <span>View Recommended Spots</span>
                <span className="material-symbols-outlined transition-transform group-hover:translate-x-1 text-[26px]">
                  arrow_forward
                </span>
              </button>

              <button
                type="button"
                onClick={onAdjustFilters}
                className="bg-white hover:bg-[#efeeec] text-[#004349] border-2 border-[#004349] font-bold text-lg px-6 py-4 rounded-2xl transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <span className="material-symbols-outlined text-[20px]">tune</span>
                <span>Adjust Filters</span>
              </button>
            </div>
          </div>

          {/* Right Map Card */}
          <div className="w-full md:w-1/2 relative h-[320px] md:h-[400px] rounded-3xl overflow-hidden shadow-2xl group border-2 border-white">
            <div
              className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url('${district.mapImage}')` }}
              role="img"
              aria-label={`${district.name} Singapore Map`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

            {/* Matches badge */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl inline-flex items-center gap-4 border border-[#e3e2e0]">
                <div className="w-14 h-14 rounded-2xl bg-[#004349] flex items-center justify-center shrink-0 shadow-sm">
                  <span className="material-symbols-outlined text-white text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    group_add
                  </span>
                </div>
                <div>
                  <div className="font-headline font-bold text-xl text-[#1a1c1b]">
                    {result.potentialFriendsCount} Matches
                  </div>
                  <div className="text-base text-[#3f484a] font-medium">
                    Active this week in {district.name}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Breakdown Section */}
      <div className="max-w-[1140px] mx-auto w-full px-5 mt-12 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Card: Potential Friends Statistics */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="bg-[#0d5c63] text-white p-8 md:p-10 rounded-3xl shadow-xl h-full flex flex-col justify-between hover:-translate-y-1 transition-transform border border-[#90d2da]/30">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-headline font-bold text-2xl tracking-wide">
                    Potential Friends
                  </span>
                  <span className="material-symbols-outlined text-[34px] text-[#90d2da]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    monitoring
                  </span>
                </div>

                <div className="flex items-baseline gap-3 mb-3">
                  <span className="font-headline text-[64px] font-extrabold leading-none text-white">
                    {result.matchRate}%
                  </span>
                  <span className="text-xl text-[#90d2da] font-medium">
                    Match Rate
                  </span>
                </div>

                <p className="text-lg text-white/90 leading-relaxed mb-6">
                  {district.name} shows a significantly higher concentration of seniors sharing your age group and preferred community activities compared to other districts.
                </p>

                {singstat && (
                  <div className="mb-6 bg-white/10 p-3.5 rounded-xl border border-white/15 text-xs text-white/90 space-y-1">
                    <div className="font-semibold text-[#90d2da] flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px]">database</span>
                      <span>SingStat Table M810771</span>
                    </div>
                    <div>
                      Singapore Citizens By Age Group & Sex (DOS {singstat.lastUpdatedYear})
                    </div>
                    <div className="text-white/80">
                      Matched National Cohort: <strong className="text-white">{singstat.matchedNationalDemographicCount.toLocaleString()} seniors</strong>
                    </div>
                  </div>
                )}
              </div>

              {/* Bar charts for Singapore districts */}
              <div className="w-full bg-black/20 p-5 rounded-2xl border border-white/10">
                <div className="text-sm font-semibold text-[#90d2da] mb-3 flex items-center justify-between">
                  <span>District Demographic Distribution</span>
                  <button
                    onClick={onOpenSingStat}
                    className="underline hover:text-white transition-colors cursor-pointer text-xs"
                  >
                    View Details
                  </button>
                </div>

                {result.comparisonScores.map((item, idx) => (
                  <div key={item.districtName} className={idx > 0 ? 'mt-4' : ''}>
                    <div className="flex justify-between text-base font-semibold mb-1 text-white">
                      <span>{item.districtName}</span>
                      <span>{item.count}</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-3.5 overflow-hidden">
                      <div
                        className={`h-3.5 rounded-full transition-all duration-1000 ${
                          idx === 0 ? 'bg-[#90d2da] relative shadow-sm' : 'bg-[#90d2da]/50'
                        }`}
                        style={{ width: `${item.percentage}%` }}
                      >
                        {idx === 0 && (
                          <div className="absolute inset-0 bg-white/30 animate-pulse" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Why this location? */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <h2 className="font-headline font-bold text-3xl text-[#1a1c1b] flex items-center gap-3">
              <span className="material-symbols-outlined text-[#a73927] text-[38px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                help_center
              </span>
              <span>Why this location?</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Proximity Card */}
              <div className="bg-white rounded-3xl p-8 shadow-md hover:shadow-lg transition-all flex flex-col gap-4 border border-[#e3e2e0]">
                <div className="w-14 h-14 rounded-2xl bg-[#2e586f] flex items-center justify-center shadow-inner">
                  <span className="material-symbols-outlined text-[#a3cde8] text-[30px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    directions_walk
                  </span>
                </div>
                <h3 className="font-headline font-bold text-2xl text-[#1a1c1b]">
                  Proximity
                </h3>
                <p className="text-lg text-[#3f484a] leading-relaxed flex-grow">
                  {result.whyThisLocation.proximity}
                </p>
                <div className="flex items-center gap-2 text-sm font-semibold text-[#004349] bg-[#abeef6]/20 px-3 py-1.5 rounded-lg w-fit">
                  <span className="material-symbols-outlined text-[18px]">accessible</span>
                  <span>Step-Free Transit Links</span>
                </div>
              </div>

              {/* Social Activity Level Card */}
              <div className="bg-white rounded-3xl p-8 shadow-md hover:shadow-lg transition-all flex flex-col gap-4 border border-[#e3e2e0]">
                <div className="w-14 h-14 rounded-2xl bg-[#fd7861] flex items-center justify-center shadow-inner">
                  <span className="material-symbols-outlined text-[#701104] text-[30px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    local_cafe
                  </span>
                </div>
                <h3 className="font-headline font-bold text-2xl text-[#1a1c1b]">
                  Social Activity Level
                </h3>
                <p className="text-lg text-[#3f484a] leading-relaxed flex-grow">
                  {result.whyThisLocation.socialActivityLevel}
                </p>
                <div className="flex items-center gap-2 text-sm font-semibold text-[#a73927] bg-[#ffdad4]/40 px-3 py-1.5 rounded-lg w-fit">
                  <span className="material-symbols-outlined text-[18px]">groups</span>
                  <span>Daily Morning Kakis</span>
                </div>
              </div>
            </div>

            {/* Blue Banner: Ready to explore */}
            <div className="mt-2 relative rounded-3xl overflow-hidden bg-[#124157] text-white p-8 shadow-xl border border-[#a3cde8]/30">
              <div className="absolute right-0 top-0 w-64 h-64 bg-[#c5e7ff] opacity-10 rounded-full -translate-y-1/2 translate-x-1/4 blur-2xl pointer-events-none" />
              
              <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                  <h4 className="font-headline font-bold text-2xl md:text-3xl mb-2 text-white">
                    Ready to explore?
                  </h4>
                  <p className="text-lg text-white/90 max-w-md leading-relaxed">
                    Discover accessible parks, quiet cafes, and active community centers in {district.name}.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={onViewHangoutSpots}
                  className="bg-white hover:bg-[#faf9f7] text-[#124157] font-bold text-xl px-8 py-4 rounded-2xl transition-all shadow-md hover:scale-[1.02] whitespace-nowrap min-w-[200px] cursor-pointer"
                >
                  Explore Hangouts
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
