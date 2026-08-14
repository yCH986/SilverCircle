import React from 'react';
import { AgeRangeOption, DiscoveryFilters, GenderOption } from '../types';

interface DiscoverSetupScreenProps {
  filters: DiscoveryFilters;
  onUpdateFilters: (filters: Partial<DiscoveryFilters>) => void;
  onSubmitSearch: () => void;
  isCalculating?: boolean;
}

export const DiscoverSetupScreen: React.FC<DiscoverSetupScreenProps> = ({
  filters,
  onUpdateFilters,
  onSubmitSearch,
  isCalculating = false,
}) => {
  const ageOptions: AgeRangeOption[] = [
    '60-64',
    '65-69',
    '70-74',
    '75-79',
    '80-84',
    '85-89',
    '90+',
  ];

  const handleGenderSelect = (gender: GenderOption) => {
    onUpdateFilters({ gender });
  };

  const handleAgeToggle = (age: AgeRangeOption) => {
    const currentAges = [...filters.ageRanges];
    const index = currentAges.indexOf(age);
    if (index >= 0) {
      // Don't allow empty if only 1 left, or toggle off
      currentAges.splice(index, 1);
    } else {
      currentAges.push(age);
    }
    onUpdateFilters({ ageRanges: currentAges });
  };

  const handleSelectAllAges = () => {
    if (filters.ageRanges.length === ageOptions.length) {
      onUpdateFilters({ ageRanges: [] });
    } else {
      onUpdateFilters({ ageRanges: [...ageOptions] });
    }
  };

  return (
    <div className="flex flex-col w-full relative bg-[#faf9f7] min-h-[calc(100vh-80px)]">
      {/* Decorative ambient background blurs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#c5e7ff]/30 rounded-full blur-[100px] -z-10 pointer-events-none transform translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#8fd1d9]/20 rounded-full blur-[80px] -z-10 pointer-events-none transform -translate-x-1/2 translate-y-1/4" />

      {/* Header section */}
      <section className="max-w-[1140px] mx-auto w-full px-5 pt-10 pb-6 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-5 py-2 bg-[#0d5c63] text-[#90d2da] rounded-full mb-5 shadow-sm">
          <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            explore
          </span>
          <span className="font-bold text-sm tracking-widest uppercase">
            Discovery Setup
          </span>
        </div>

        <h1 className="font-headline font-bold text-3xl sm:text-4xl md:text-5xl text-[#1a1c1b] mb-4 max-w-3xl leading-tight">
          Find Potential Friends Near You
        </h1>
        <p className="text-xl text-[#3f484a] max-w-2xl leading-relaxed">
          Let's tailor your search to help you connect with people you'll naturally get along with in your community.
        </p>
      </section>

      {/* Main Selection Form */}
      <section className="max-w-[800px] mx-auto w-full px-5 pb-16 flex flex-col gap-8 relative z-10">
        {/* Step 1: Gender Selection */}
        <div className="bg-white rounded-[24px] p-8 md:p-10 shadow-xl flex flex-col gap-6 transform transition-transform hover:-translate-y-0.5 duration-300 border border-[#e3e2e0]">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-12 h-12 rounded-full bg-[#2e586f] flex items-center justify-center text-[#a3cde8] font-headline font-bold text-2xl shrink-0 shadow-inner">
              1
            </div>
            <h2 className="font-headline font-bold text-2xl md:text-[28px] text-[#1a1c1b]">
              Who are you looking to meet?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="gender-selection">
            {/* Female Option */}
            <button
              type="button"
              onClick={() => handleGenderSelect('female')}
              className={`relative overflow-hidden group w-full h-[120px] rounded-2xl transition-all duration-300 flex flex-col items-center justify-center gap-1 shadow-sm cursor-pointer border-2 ${
                filters.gender === 'female'
                  ? 'bg-[#004349] text-white border-[#abeef6] shadow-md scale-[1.01]'
                  : 'bg-[#efeeec] hover:bg-[#e9e8e6] text-[#1a1c1b] border-transparent'
              }`}
            >
              <span
                className={`material-symbols-outlined text-[44px] transition-transform group-hover:scale-110 ${
                  filters.gender === 'female' ? 'text-[#abeef6]' : 'text-[#a73927]'
                }`}
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                woman
              </span>
              <span className="font-headline font-bold text-2xl">
                Female
              </span>
            </button>

            {/* Male Option */}
            <button
              type="button"
              onClick={() => handleGenderSelect('male')}
              className={`relative overflow-hidden group w-full h-[120px] rounded-2xl transition-all duration-300 flex flex-col items-center justify-center gap-1 shadow-sm cursor-pointer border-2 ${
                filters.gender === 'male'
                  ? 'bg-[#004349] text-white border-[#abeef6] shadow-md scale-[1.01]'
                  : 'bg-[#efeeec] hover:bg-[#e9e8e6] text-[#1a1c1b] border-transparent'
              }`}
            >
              <span
                className={`material-symbols-outlined text-[44px] transition-transform group-hover:scale-110 ${
                  filters.gender === 'male' ? 'text-[#abeef6]' : 'text-[#124157]'
                }`}
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                man
              </span>
              <span className="font-headline font-bold text-2xl">
                Male
              </span>
            </button>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => handleGenderSelect('all')}
              className={`text-base font-semibold px-4 py-1.5 rounded-full transition-colors cursor-pointer ${
                filters.gender === 'all'
                  ? 'bg-[#004349] text-white'
                  : 'text-[#3f484a] hover:text-[#004349] underline underline-offset-4'
              }`}
            >
              Looking to meet everyone (All Genders)
            </button>
          </div>
        </div>

        {/* Step 2: Age Range Selection */}
        <div className="bg-white rounded-[24px] p-8 md:p-10 shadow-xl flex flex-col gap-6 transform transition-transform hover:-translate-y-0.5 duration-300 border border-[#e3e2e0]">
          <div className="flex items-center justify-between gap-3 mb-1">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#fd7861] flex items-center justify-center text-[#701104] font-headline font-bold text-2xl shrink-0 shadow-inner">
                2
              </div>
              <h2 className="font-headline font-bold text-2xl md:text-[28px] text-[#1a1c1b]">
                What age range do you prefer?
              </h2>
            </div>

            <button
              type="button"
              onClick={handleSelectAllAges}
              className="hidden sm:inline-flex text-sm font-bold text-[#004349] hover:text-[#a73927] transition-colors cursor-pointer underline underline-offset-4"
            >
              {filters.ageRanges.length === ageOptions.length ? 'Clear Selection' : 'Select All'}
            </button>
          </div>

          {/* Age Buttons Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5" id="age-selection">
            {ageOptions.map((age) => {
              const isSelected = filters.ageRanges.includes(age);
              const isLastSpan = age === '90+';
              return (
                <button
                  key={age}
                  type="button"
                  onClick={() => handleAgeToggle(age)}
                  className={`h-[80px] rounded-2xl font-headline font-bold text-2xl transition-all duration-200 shadow-sm cursor-pointer flex items-center justify-center border-2 ${
                    isLastSpan ? 'sm:col-span-3 md:col-span-2' : ''
                  } ${
                    isSelected
                      ? 'bg-[#a73927] text-white border-[#ffdad4] shadow-md scale-[1.02]'
                      : 'bg-[#efeeec] hover:bg-[#e9e8e6] text-[#1a1c1b] border-transparent hover:shadow'
                  }`}
                >
                  {age}
                </button>
              );
            })}
          </div>

          <div className="mt-2 flex items-center gap-3 bg-[#f4f3f1] p-4 rounded-xl border border-[#e3e2e0]">
            <span className="material-symbols-outlined text-[#004349] text-[26px]">
              info
            </span>
            <span className="text-base text-[#3f484a] font-medium">
              You can select multiple age ranges to broaden your matches across Singapore.
            </span>
          </div>
        </div>

        {/* Submit Match Button */}
        <div className="flex justify-center mt-4 mb-4">
          <button
            type="button"
            onClick={onSubmitSearch}
            disabled={isCalculating}
            className="group relative h-[80px] px-12 bg-[#a73927] hover:bg-[#701104] rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-5 overflow-hidden cursor-pointer active:scale-98 disabled:opacity-80"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            <span className="font-headline font-bold text-3xl text-white relative z-10">
              {isCalculating ? 'Computing Matches...' : 'Find Matches'}
            </span>
            <div className="w-[50px] h-[50px] bg-white rounded-full flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform shadow-md">
              <span
                className="material-symbols-outlined text-[#a73927] text-[30px]"
                style={{ fontVariationSettings: "'wght' 700" }}
              >
                {isCalculating ? 'hourglass_top' : 'arrow_forward'}
              </span>
            </div>
          </button>
        </div>
      </section>
    </div>
  );
};
