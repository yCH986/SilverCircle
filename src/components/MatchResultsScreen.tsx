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
  const region = result.planningRegion;
  const filtersSummary = result.selectedFiltersSummary;

  // Region badge theme
  const getRegionTheme = (code: string) => {
    switch (code) {
      case 'central':
        return {
          pill: 'bg-[#0d5c63]/15 text-[#004349] border-[#0d5c63]/30',
          bar: 'bg-[#0d5c63]',
          accentText: 'text-[#0d5c63]',
          bannerBg: 'bg-[#004349]',
        };
      case 'east':
        return {
          pill: 'bg-[#ffdad4]/70 text-[#701104] border-[#a73927]/30',
          bar: 'bg-[#a73927]',
          accentText: 'text-[#a73927]',
          bannerBg: 'bg-[#a73927]',
        };
      case 'north-east':
        return {
          pill: 'bg-[#c5e7ff]/70 text-[#001e2c] border-[#124157]/30',
          bar: 'bg-[#124157]',
          accentText: 'text-[#124157]',
          bannerBg: 'bg-[#124157]',
        };
      case 'west':
        return {
          pill: 'bg-[#90d2da]/30 text-[#004349] border-[#2b6475]/30',
          bar: 'bg-[#2b6475]',
          accentText: 'text-[#2b6475]',
          bannerBg: 'bg-[#2b6475]',
        };
      case 'north':
      default:
        return {
          pill: 'bg-[#efeeec] text-[#1a1c1b] border-[#c3c7c9]',
          bar: 'bg-[#5b6468]',
          accentText: 'text-[#3f484a]',
          bannerBg: 'bg-[#5b6468]',
        };
    }
  };

  const topTheme = getRegionTheme(region.regionCode);

  const genderLabel =
    filtersSummary?.gender === 'female'
      ? 'Female Seniors'
      : filtersSummary?.gender === 'male'
      ? 'Male Seniors'
      : 'All Senior Residents';

  const ageRangesLabel =
    filtersSummary?.ageRanges && filtersSummary.ageRanges.length > 0
      ? `Ages ${filtersSummary.ageRanges.join(', ')}`
      : 'All Seniors (60+)';

  return (
    <div className="flex flex-col w-full bg-[#faf9f7] pb-16">
      {/* Top Banner: Best Matched Planning Region */}
      <div className="relative w-full overflow-hidden bg-[#f4f3f1] min-h-[440px] flex items-center py-12 px-5 md:px-10 rounded-b-[36px] border-b border-[#e3e2e0]">
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle at 70% 30%, #abeef6 0%, transparent 50%), radial-gradient(circle at 25% 75%, #c5e7ff 0%, transparent 50%)',
          }}
        />

        <div className="max-w-[1140px] mx-auto w-full relative z-10 flex flex-col lg:flex-row items-center gap-10">
          {/* Left Hero Text */}
          <div className="w-full lg:w-3/5 flex flex-col gap-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#004349] text-white text-xs uppercase font-bold tracking-wider rounded-full shadow-sm">
                <span className="material-symbols-outlined text-[16px]">verified</span>
                #1 Best Matched Planning Region
              </span>
              <span className="text-xs font-semibold text-[#5b6468]">
                SingStat Table M810771
              </span>
            </div>

            <h1 className="font-headline font-extrabold text-4xl sm:text-5xl text-[#1a1c1b] leading-tight">
              {region.regionName} is your best demographic match!
            </h1>

            {/* Filter Applied Pill */}
            <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl border border-[#e3e2e0] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#004349] text-[28px]">
                  filter_alt
                </span>
                <div>
                  <span className="text-xs font-bold text-[#73787a] uppercase tracking-wider block">
                    Applied Filter Criteria
                  </span>
                  <span className="text-base font-bold text-[#1a1c1b]">
                    {genderLabel} • {ageRangesLabel}
                  </span>
                </div>
              </div>

              <div className="sm:text-right border-t sm:border-t-0 sm:border-l border-[#e3e2e0] pt-2 sm:pt-0 sm:pl-4">
                <span className="text-xs text-[#73787a] block">SingStat Census</span>
                <span className="text-sm font-extrabold text-[#004349]">
                  {filtersSummary?.selectedYear || '2025'} Dataset
                </span>
              </div>
            </div>

            <p className="text-lg text-[#3f484a] leading-relaxed">
              Based on official SingStat data, <strong className="text-[#1a1c1b]">{region.matchedSeniorsCount.toLocaleString()} {genderLabel.toLowerCase()}</strong> matching your exact age criteria reside in the <strong className="text-[#1a1c1b]">{region.regionName}</strong>, representing <strong className="text-[#004349]">{region.percentageOfNationalCohort}%</strong> of Singapore's matching senior population.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mt-2">
              <button
                type="button"
                onClick={onViewHangoutSpots}
                className="bg-[#a73927] hover:bg-[#701104] text-white font-bold text-lg sm:text-xl px-7 py-4 rounded-2xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-3 cursor-pointer group"
              >
                <span>Explore Spots in {region.regionName}</span>
                <span className="material-symbols-outlined transition-transform group-hover:translate-x-1 text-[24px]">
                  arrow_forward
                </span>
              </button>

              <button
                type="button"
                onClick={onAdjustFilters}
                className="bg-white hover:bg-[#efeeec] text-[#004349] border-2 border-[#004349] font-bold text-base sm:text-lg px-6 py-4 rounded-2xl transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <span className="material-symbols-outlined text-[20px]">tune</span>
                <span>Adjust Filters</span>
              </button>
            </div>
          </div>

          {/* Right Region Highlights Card */}
          <div className="w-full lg:w-2/5 flex flex-col gap-4">
            <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-xl border border-[#e3e2e0] flex flex-col gap-5 relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-[#e3e2e0] pb-4">
                <div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${topTheme.pill}`}>
                    Top Rank (#1)
                  </span>
                  <h2 className="font-headline font-extrabold text-2xl sm:text-3xl text-[#1a1c1b] mt-1.5">
                    {region.regionName}
                  </h2>
                </div>
                <div className="text-right">
                  <span className="font-headline text-3xl sm:text-4xl font-extrabold text-[#004349] block">
                    {region.matchScore}%
                  </span>
                  <span className="text-xs font-semibold text-[#73787a]">Match Rate</span>
                </div>
              </div>

              {/* Matched Count Metric */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#f4f3f1] p-3.5 rounded-xl border border-[#e3e2e0]">
                  <span className="text-xs font-semibold text-[#73787a] block">
                    Matched Demographic
                  </span>
                  <span className="font-headline font-bold text-xl sm:text-2xl text-[#1a1c1b]">
                    {region.matchedSeniorsCount.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-[#004349] font-bold block mt-0.5">
                    {region.percentageOfNationalCohort}% of Singapore
                  </span>
                </div>

                <div className="bg-[#f4f3f1] p-3.5 rounded-xl border border-[#e3e2e0]">
                  <span className="text-xs font-semibold text-[#73787a] block">
                    Active Weekly Peers
                  </span>
                  <span className="font-headline font-bold text-xl sm:text-2xl text-[#a73927]">
                    ~{region.activeWeeklyEstimate}
                  </span>
                  <span className="text-[11px] text-[#73787a] block mt-0.5">
                    Community participants
                  </span>
                </div>
              </div>

              {/* Prominent Towns in this Region */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#73787a] block mb-2">
                  Key Towns & Estates in {region.regionName}
                </span>
                <div className="flex flex-wrap gap-2">
                  {region.keyEstates.map((estate) => (
                    <span
                      key={estate}
                      className="px-3 py-1 bg-[#efeeec] text-[#1a1c1b] text-sm font-semibold rounded-lg border border-[#e3e2e0]"
                    >
                      {estate}
                    </span>
                  ))}
                </div>
              </div>

              {/* Regional Transit & Social Note */}
              <div className="text-xs text-[#3f484a] bg-[#faf9f7] p-3.5 rounded-xl border border-[#e3e2e0] flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[#004349] text-[20px] shrink-0">
                  directions_subway
                </span>
                <p className="leading-relaxed">{region.transitSummary}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Action Section */}
      <div className="max-w-[1140px] mx-auto w-full px-5 mt-10 mb-8 flex flex-col gap-10">
        {/* Explore Hangout Spots Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-[#124157] text-white p-8 md:p-10 shadow-xl border border-[#a3cde8]/30">
          <div className="absolute right-0 top-0 w-64 h-64 bg-[#c5e7ff] opacity-10 rounded-full -translate-y-1/2 translate-x-1/4 blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#90d2da] block mb-1">
                Next Step
              </span>
              <h3 className="font-headline font-bold text-2xl md:text-3xl mb-2 text-white">
                Explore Hangouts in {region.regionName}
              </h3>
              <p className="text-lg text-white/90 max-w-xl leading-relaxed">
                Discover step-free parks, quiet cafes, and active senior wellness hubs across {region.keyEstates.slice(0, 3).join(', ')}.
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

        {/* Official Source Attribution */}
        <div className="text-xs text-[#73787a] flex items-center justify-between flex-wrap gap-2 border-t border-[#e3e2e0] pt-4">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px] text-[#004349]">
              verified
            </span>
            <span>
              Official SingStat Source: Singapore Department of Statistics (DOS), Table TS/M810771
            </span>
          </div>
          <span>
            Singapore Residents By Planning Region, Age Group And Sex
          </span>
        </div>
      </div>
    </div>
  );
};

