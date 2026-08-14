import React, { useEffect, useState } from 'react';
import { SingStatPlanningRegionApiResponse, SingStatRegionPopulationData } from '../types';

interface SingStatRegionPopulationSectionProps {
  onSelectRegion?: (regionCode: string) => void;
}

export const SingStatRegionPopulationSection: React.FC<SingStatRegionPopulationSectionProps> = ({
  onSelectRegion,
}) => {
  const [data, setData] = useState<SingStatPlanningRegionApiResponse | null>(null);
  const [selectedYear, setSelectedYear] = useState<string>('2025');
  const [selectedRegionCode, setSelectedRegionCode] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'total' | 'gender'>('total');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchPopulation() {
      try {
        setIsLoading(true);
        setError(null);
        const res = await fetch('/api/singstat/population');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const json: SingStatPlanningRegionApiResponse = await res.json();
        if (isMounted) {
          setData(json);
          if (json.latestYear) {
            setSelectedYear(json.latestYear);
          } else if (json.availableYears && json.availableYears.length > 0) {
            setSelectedYear(json.availableYears[0]);
          }
        }
      } catch (err) {
        console.warn('Could not fetch SingStat population dataset:', err);
        if (isMounted) {
          setError('Unable to load live government population data right now. Please check back shortly.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchPopulation();

    return () => {
      isMounted = false;
    };
  }, []);

  const currentYearRecord = data?.dataByYear?.[selectedYear];
  const regions = currentYearRecord?.regions || [];
  const maxSeniors = Math.max(...regions.map((r) => r.totalSeniors60Plus), 1);
  const totalSingaporeSeniors = currentYearRecord?.totalSingaporeSeniors60Plus || 0;

  // Selected region details
  const selectedRegion = regions.find((r) => r.regionCode === selectedRegionCode) || null;

  // Region badge styles
  const getRegionTheme = (code: string) => {
    switch (code) {
      case 'central':
        return {
          bg: 'bg-[#0d5c63]',
          bar: 'bg-[#0d5c63]',
          accent: 'text-[#0d5c63]',
          pill: 'bg-[#0d5c63]/10 text-[#0d5c63]',
          tag: 'Central',
        };
      case 'east':
        return {
          bg: 'bg-[#a73927]',
          bar: 'bg-[#a73927]',
          accent: 'text-[#a73927]',
          pill: 'bg-[#ffdad4]/60 text-[#701104]',
          tag: 'East',
        };
      case 'north-east':
        return {
          bg: 'bg-[#124157]',
          bar: 'bg-[#124157]',
          accent: 'text-[#124157]',
          pill: 'bg-[#c5e7ff]/60 text-[#001e2c]',
          tag: 'North-East',
        };
      case 'west':
        return {
          bg: 'bg-[#2b6475]',
          bar: 'bg-[#2b6475]',
          accent: 'text-[#2b6475]',
          pill: 'bg-[#90d2da]/20 text-[#004349]',
          tag: 'West',
        };
      case 'north':
      default:
        return {
          bg: 'bg-[#5b6468]',
          bar: 'bg-[#5b6468]',
          accent: 'text-[#3f484a]',
          pill: 'bg-[#efeeec] text-[#1a1c1b]',
          tag: 'North',
        };
    }
  };

  return (
    <section className="bg-white rounded-[28px] p-6 sm:p-8 md:p-10 shadow-xl border border-[#e3e2e0] flex flex-col gap-6 relative overflow-hidden" id="singstat-region-population-card">
      {/* Top Header & Year Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#e3e2e0]">
        <div className="flex items-start gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#004349] flex items-center justify-center text-[#abeef6] font-headline font-bold text-2xl shrink-0 shadow-inner">
            <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              analytics
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-headline font-bold text-2xl md:text-[28px] text-[#1a1c1b] leading-tight">
                Senior Population By Planning Region
              </h2>
            </div>
            <p className="text-base text-[#3f484a] mt-1">
              Official SingStat resident counts for seniors aged <strong>60 and over</strong> across Singapore.
            </p>
          </div>
        </div>

        {/* Controls: Year Selector & Breakdown view */}
        <div className="flex items-center flex-wrap gap-3 self-start md:self-auto">
          {/* Year selector */}
          <div className="flex items-center gap-2 bg-[#f4f3f1] px-3.5 py-2 rounded-xl border border-[#e3e2e0]">
            <span className="material-symbols-outlined text-[#004349] text-[20px]">
              calendar_month
            </span>
            <label htmlFor="singstat-year-select" className="text-sm font-bold text-[#1a1c1b]">
              Year:
            </label>
            <select
              id="singstat-year-select"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="bg-white text-[#1a1c1b] font-bold text-base px-2.5 py-1 rounded-lg border border-[#c3c7c9] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#004349]"
            >
              {data?.availableYears?.map((yr) => (
                <option key={yr} value={yr}>
                  {yr}
                </option>
              )) || <option value="2025">2025</option>}
            </select>
          </div>

          {/* View toggle (Total vs Gender Breakdown) */}
          <div className="inline-flex p-1 bg-[#f4f3f1] rounded-xl border border-[#e3e2e0]">
            <button
              type="button"
              onClick={() => setViewMode('total')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'total'
                  ? 'bg-[#004349] text-white shadow-sm'
                  : 'text-[#3f484a] hover:text-[#1a1c1b]'
              }`}
            >
              Total (60+)
            </button>
            <button
              type="button"
              onClick={() => setViewMode('gender')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'gender'
                  ? 'bg-[#004349] text-white shadow-sm'
                  : 'text-[#3f484a] hover:text-[#1a1c1b]'
              }`}
            >
              Male / Female
            </button>
          </div>
        </div>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="py-12 flex flex-col items-center justify-center gap-4 text-center">
          <div className="w-12 h-12 border-4 border-[#004349]/20 border-t-[#004349] rounded-full animate-spin" />
          <p className="text-lg font-medium text-[#3f484a]">
            Loading SingStat Table M810771 census data...
          </p>
        </div>
      )}

      {/* Error state */}
      {!isLoading && error && (
        <div className="p-6 bg-[#ffdad4]/40 rounded-2xl border border-[#ffdad4] text-[#701104] flex items-start gap-4">
          <span className="material-symbols-outlined text-[28px] shrink-0">error</span>
          <div>
            <h4 className="font-bold text-lg mb-1">Census Data Temporarily Unavailable</h4>
            <p className="text-base text-[#701104]/90">{error}</p>
          </div>
        </div>
      )}

      {/* Main Content Visualizer */}
      {!isLoading && !error && currentYearRecord && (
        <div className="flex flex-col gap-6">
          {/* Summary Stat Banner */}
          <div className="bg-[#f4f3f1] p-4 sm:p-5 rounded-2xl border border-[#e3e2e0] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#004349] text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                groups
              </span>
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-[#73787a] block">
                  Total Singapore Senior Residents ({selectedYear})
                </span>
                <span className="font-headline font-extrabold text-2xl sm:text-3xl text-[#004349]">
                  {totalSingaporeSeniors.toLocaleString()}
                </span>
                <span className="text-sm font-semibold text-[#3f484a] ml-2">
                  aged 60 and over
                </span>
              </div>
            </div>

            <div className="text-xs text-[#73787a] sm:text-right">
              {data?.isLive ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#abeef6]/30 text-[#004349] font-bold rounded-full border border-[#90d2da]">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Live SingStat API
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white text-[#3f484a] font-semibold rounded-full border border-[#e3e2e0]">
                  Official SingStat Dataset
                </span>
              )}
            </div>
          </div>

          {/* Region Comparative Bar Chart */}
          <div className="space-y-4">
            {regions.map((region) => {
              const theme = getRegionTheme(region.regionCode);
              const percentageOfMax = Math.round((region.totalSeniors60Plus / maxSeniors) * 100);
              const percentageOfTotal = Math.round((region.totalSeniors60Plus / totalSingaporeSeniors) * 100);
              const isSelected = selectedRegionCode === region.regionCode;

              return (
                <div
                  key={region.regionCode}
                  onClick={() => {
                    const newSelected = isSelected ? null : region.regionCode;
                    setSelectedRegionCode(newSelected);
                    if (onSelectRegion && newSelected) {
                      onSelectRegion(newSelected);
                    }
                  }}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-[#f4f7f8] border-[#004349] shadow-md ring-2 ring-[#004349]/20'
                      : 'bg-white hover:bg-[#faf9f7] border-[#e3e2e0] hover:border-[#c3c7c9]'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
                    <div className="flex items-center gap-2.5">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${theme.pill}`}>
                        {theme.tag}
                      </span>
                      <h3 className="font-headline font-bold text-xl sm:text-2xl text-[#1a1c1b]">
                        {region.regionName}
                      </h3>
                    </div>

                    <div className="flex items-baseline gap-2">
                      <span className="font-headline font-extrabold text-2xl text-[#1a1c1b]">
                        {region.totalSeniors60Plus.toLocaleString()}
                      </span>
                      <span className="text-sm font-semibold text-[#73787a]">
                        seniors ({percentageOfTotal}% of SG)
                      </span>
                    </div>
                  </div>

                  {/* Visual Bar */}
                  {viewMode === 'total' ? (
                    <div className="w-full bg-[#efeeec] rounded-full h-4 overflow-hidden relative">
                      <div
                        className={`h-4 rounded-full transition-all duration-700 ${theme.bar}`}
                        style={{ width: `${percentageOfMax}%` }}
                      />
                    </div>
                  ) : (
                    /* Stacked Bar for Male vs Female */
                    <div className="space-y-1.5">
                      <div className="w-full bg-[#efeeec] rounded-full h-4 overflow-hidden flex">
                        <div
                          className="h-4 bg-[#2e586f] transition-all duration-700"
                          style={{
                            width: `${(region.maleSeniors60Plus / maxSeniors) * 100}%`,
                          }}
                          title={`Male: ${region.maleSeniors60Plus.toLocaleString()}`}
                        />
                        <div
                          className="h-4 bg-[#a73927] transition-all duration-700"
                          style={{
                            width: `${(region.femaleSeniors60Plus / maxSeniors) * 100}%`,
                          }}
                          title={`Female: ${region.femaleSeniors60Plus.toLocaleString()}`}
                        />
                      </div>
                      <div className="flex justify-between text-xs font-semibold text-[#5b6468]">
                        <span className="flex items-center gap-1">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#2e586f]" />
                          Male: <strong>{region.maleSeniors60Plus.toLocaleString()}</strong>
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#a73927]" />
                          Female: <strong>{region.femaleSeniors60Plus.toLocaleString()}</strong>
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Click to expand hint */}
                  <div className="mt-2.5 flex items-center justify-between text-xs text-[#73787a]">
                    <span>
                      Total region population: <strong>{region.totalPopulation.toLocaleString()}</strong> ({Math.round((region.totalSeniors60Plus / (region.totalPopulation || 1)) * 100)}% seniors)
                    </span>
                    <span className="font-semibold text-[#004349] flex items-center gap-0.5">
                      {isSelected ? 'Hide 5-yr age bands' : 'View age bands'}
                      <span className="material-symbols-outlined text-[16px]">
                        {isSelected ? 'expand_less' : 'expand_more'}
                      </span>
                    </span>
                  </div>

                  {/* Expanded 5-Year Age Bands Breakdown */}
                  {isSelected && (
                    <div className="mt-4 pt-4 border-t border-[#e3e2e0] grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 animate-fadeIn">
                      {region.ageBands60Plus.map((band) => (
                        <div
                          key={band.ageBand}
                          className="bg-white p-2.5 rounded-xl border border-[#e3e2e0] text-center flex flex-col justify-between shadow-2xs"
                        >
                          <span className="text-[11px] font-bold text-[#73787a] block leading-tight">
                            {band.ageBand.replace('Years', '').trim()}
                          </span>
                          <span className="font-headline font-bold text-base text-[#1a1c1b] my-1">
                            {band.total.toLocaleString()}
                          </span>
                          <div className="text-[10px] text-[#73787a] flex justify-around border-t border-gray-100 pt-1">
                            <span className="text-[#2e586f]">M: {band.male.toLocaleString()}</span>
                            <span className="text-[#a73927]">F: {band.female.toLocaleString()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Mandatory Official One-line Data Source Credit */}
      <div className="pt-2 text-xs sm:text-sm text-[#73787a] flex items-center justify-between flex-wrap gap-2 border-t border-[#e3e2e0]">
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[16px] text-[#004349]">
            verified
          </span>
          <span className="font-medium">
            Source: Singapore Department of Statistics, Table Builder (M810771)
          </span>
        </div>
        <span className="text-xs text-[#73787a]">
          Annual frequency, rounded to nearest 10
        </span>
      </div>
    </section>
  );
};
