import React from 'react';
import { AppScreen } from '../types';

interface AboutScreenProps {
  onNavigate: (screen: AppScreen) => void;
  onOpenSingStat: () => void;
}

export const AboutScreen: React.FC<AboutScreenProps> = ({
  onNavigate,
  onOpenSingStat,
}) => {
  const seniorCommunityPhoto = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAe6T9_XtfBAaeuz-t9ufJmXX-sVHye-6XaLJ7waF8P1UTEuyGOguEDQ-PNeAqY-GSUGJexnoIW6MS3GqOqE9t-baR0UAfbo3Kkv8qjXwjwA56bF2NplhDulUtheJ-pg2LXmIQ2NNoVlG3VDCvwjlL13g0ecdkQh1vLn_e_CGCXMg2_UdUmm0xO0Fkb72Dgz6OHA40-E4iRe3TeOl7zJ1jXVi6t748yX0Z_vKnDmZNOdhk01z0rBhyh';
  const logoUrl = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJOQutjaQaP3UWLdRWC-pdpdQiIX7lW4uQVkQ-WuO1qy4CUDYM5VL0V_4lqiJS34mh_fhzT0yQRQgn7P0muOJHk_ndY9amvB45439uCGgA5w-o3Fut-w7dtChEk5Dbe166cCg7SCAM2iHFInWDFJHO-piJ5Fs8QPjbvb82IZR-RDrNh7BqZZfhmO6Kz6kW1MO_HJasx_i_QPUSWe-_s-3nSB2hDfeuFtOkkqVv7JzpcTvDJD7JcEJq';

  return (
    <div className="flex flex-col w-full bg-[#faf9f7] pb-20">
      {/* Hero section */}
      <section className="bg-[#f4f3f1] border-b border-[#e3e2e0] py-14 px-5">
        <div className="max-w-[1140px] mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="w-full md:w-3/5 flex flex-col gap-5">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#004349] text-[#abeef6] text-sm font-bold w-fit shadow-sm">
              <span className="material-symbols-outlined text-[18px]">favorite</span>
              <span>Our Purpose & Philosophy</span>
            </div>
            
            <h1 className="font-headline font-bold text-4xl sm:text-5xl text-[#1a1c1b] leading-tight">
              Designed with dignity for Singapore's golden generation.
            </h1>

            <p className="text-xl text-[#3f484a] leading-relaxed">
              SilverCircle was created to eliminate isolation and make social connection seamless, dignified, and joyful for every senior in Singapore.
            </p>
          </div>

          <div className="w-full md:w-2/5 rounded-3xl overflow-hidden shadow-xl border-2 border-white">
            <img
              src={seniorCommunityPhoto}
              alt="Seniors enjoying community conversation"
              className="w-full h-[280px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Core Pillars */}
      <section className="max-w-[1140px] mx-auto w-full px-5 pt-16">
        <h2 className="font-headline font-bold text-3xl sm:text-4xl text-[#1a1c1b] text-center mb-12">
          The 4 Pillars of Every SilverCircle Venue
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Pillar 1 */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#e3e2e0] flex flex-col gap-3">
            <div className="w-14 h-14 rounded-2xl bg-[#abeef6] flex items-center justify-center text-[#002023] mb-2">
              <span className="material-symbols-outlined text-[32px]">accessible_forward</span>
            </div>
            <h3 className="font-headline font-bold text-xl text-[#1a1c1b]">
              1. Step-Free Access
            </h3>
            <p className="text-base text-[#3f484a] leading-relaxed">
              Elevator access, level entrance thresholds, and wide corridors accommodating walking aids and wheelchairs.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#e3e2e0] flex flex-col gap-3">
            <div className="w-14 h-14 rounded-2xl bg-[#ffdad4] flex items-center justify-center text-[#701104] mb-2">
              <span className="material-symbols-outlined text-[32px]">do_not_step</span>
            </div>
            <h3 className="font-headline font-bold text-xl text-[#1a1c1b]">
              2. Low Trip Hazards
            </h3>
            <p className="text-base text-[#3f484a] leading-relaxed">
              Non-slip flooring, flat transitions, high-contrast edging on kerbs, and well-lit pathways for peace of mind.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#e3e2e0] flex flex-col gap-3">
            <div className="w-14 h-14 rounded-2xl bg-[#c5e7ff] flex items-center justify-center text-[#001e2d] mb-2">
              <span className="material-symbols-outlined text-[32px]">ac_unit</span>
            </div>
            <h3 className="font-headline font-bold text-xl text-[#1a1c1b]">
              3. Climate & Comfort
            </h3>
            <p className="text-base text-[#3f484a] leading-relaxed">
              Air-conditioned or breezily shaded rest spots, firm armchairs with lower-back support, and clean accessible washrooms.
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#e3e2e0] flex flex-col gap-3">
            <div className="w-14 h-14 rounded-2xl bg-[#efeeec] flex items-center justify-center text-[#004349] mb-2">
              <span className="material-symbols-outlined text-[32px]">diversity_3</span>
            </div>
            <h3 className="font-headline font-bold text-xl text-[#1a1c1b]">
              4. Active Communities
            </h3>
            <p className="text-base text-[#3f484a] leading-relaxed">
              Warm greeting circles, morning walking kakis, interest-based workshops, and acoustic spaces that allow gentle conversations.
            </p>
          </div>
        </div>
      </section>

      {/* SingStat Data Transparency Section */}
      <section className="max-w-[1140px] mx-auto w-full px-5 pt-16">
        <div className="bg-[#004349] text-white rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-2/3 flex flex-col gap-4">
            <span className="text-[#abeef6] font-bold text-sm tracking-wider uppercase flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px]">verified</span>
              <span>Data-Driven Senior Matching</span>
            </span>
            <h2 className="font-headline font-bold text-3xl sm:text-4xl text-white">
              Powered by Official SingStat Demographics
            </h2>
            <p className="text-lg text-white/90 leading-relaxed">
              Our district recommendation algorithm analyzes Singapore Department of Statistics (SingStat) resident demographic distributions to connect seniors in high-density age cohorts across mature estates like Toa Payoh, Bishan, Ang Mo Kio, and Bedok.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                type="button"
                onClick={onOpenSingStat}
                className="bg-[#a73927] hover:bg-[#701104] text-white font-bold text-lg px-8 py-3.5 rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[22px]">bar_chart</span>
                <span>Open SingStat Demographic Explorer</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigate('discover')}
                className="bg-white/10 hover:bg-white/20 text-white font-bold text-lg px-6 py-3.5 rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>Find Your Matches</span>
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </button>
            </div>
          </div>

          <div className="w-full md:w-1/3 bg-black/25 p-6 rounded-2xl border border-white/15 flex flex-col gap-3 text-center">
            <span className="text-4xl font-headline font-extrabold text-[#abeef6]">
              650,000+
            </span>
            <span className="text-white/80 text-sm font-medium">
              Singapore residents aged 60 and above represented in the demographic planning model.
            </span>
            <div className="h-px bg-white/20 my-1" />
            <span className="text-xs text-[#90d2da]">
              Source: Singapore Department of Statistics (SingStat)
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
