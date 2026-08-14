import React from 'react';
import { AppScreen } from '../types';
import { DisqusForum } from './DisqusForum';

interface HomeScreenProps {
  onStartExploring: () => void;
  onNavigate: (screen: AppScreen) => void;
  onSelectSpot?: (spotId: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onStartExploring,
  onNavigate,
}) => {
  const heroBg = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAe6T9_XtfBAaeuz-t9ufJmXX-sVHye-6XaLJ7waF8P1UTEuyGOguEDQ-PNeAqY-GSUGJexnoIW6MS3GqOqE9t-baR0UAfbo3Kkv8qjXwjwA56bF2NplhDulUtheJ-pg2LXmIQ2NNoVlG3VDCvwjlL13g0ecdkQh1vLn_e_CGCXMg2_UdUmm0xO0Fkb72Dgz6OHA40-E4iRe3TeOl7zJ1jXVi6t748yX0Z_vKnDmZNOdhk01z0rBhyh';

  return (
    <div className="flex flex-col w-full bg-[#faf9f7] relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative w-full min-h-[840px] flex items-center justify-center pt-16 pb-20 px-5 z-10">
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center mix-blend-multiply opacity-90 transition-transform duration-1000 scale-100"
            style={{ backgroundImage: `url('${heroBg}')` }}
            role="img"
            aria-label="Active seniors laughing together around an outdoor cafe table in warm afternoon light"
          />
          {/* Gentle pearl gradient overlay for high contrast text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#faf9f7]/85 via-[#faf9f7]/65 to-[#faf9f7]/95" />
          
          {/* Subtle warm decorative glow */}
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#8fd1d9]/30 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute bottom-10 -left-20 w-80 h-80 bg-[#ffb4a6]/20 rounded-full blur-[60px] pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-[1140px] mx-auto w-full flex flex-col items-center text-center gap-10">
          <div className="max-w-[820px] flex flex-col gap-6">
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 bg-[#e9e8e6]/90 backdrop-blur-sm px-6 py-2.5 rounded-full mx-auto shadow-sm border border-[#bfc8c9]/40">
              <span className="material-symbols-outlined text-[#004349] text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                favorite
              </span>
              <span className="font-semibold text-lg text-[#3f484a]">
                The Wise Companion
              </span>
            </div>

            {/* Display Headline */}
            <h1 className="font-headline font-bold text-4xl sm:text-5xl md:text-[56px] md:leading-[64px] text-[#1a1c1b] tracking-tight">
              Find Your Circle. <br />
              <span className="text-[#004349] relative inline-block mt-2">
                Discover Your Next Favorite Spot.
                <svg className="absolute -bottom-2.5 left-0 w-full h-4 text-[#ffb4a6] opacity-80" preserveAspectRatio="none" viewBox="0 0 200 20">
                  <path d="M0,10 C50,20 150,0 200,10" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="4" />
                </svg>
              </span>
            </h1>

            {/* Body Text */}
            <p className="font-body text-xl sm:text-2xl text-[#3f484a] leading-relaxed mt-3 max-w-[680px] mx-auto">
              Join a community designed for connection. We hand-pick accessible, welcoming venues where you can meet friends, share stories, and enjoy life's moments.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mt-2 w-full sm:w-auto px-4 sm:px-0">
            <button
              onClick={onStartExploring}
              className="bg-[#a73927] hover:bg-[#701104] text-white font-bold text-xl px-10 py-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 min-h-[60px] flex items-center justify-center gap-3 w-full sm:w-auto cursor-pointer group"
            >
              <span>Start Exploring</span>
              <span className="material-symbols-outlined transition-transform group-hover:translate-x-1 text-[26px]">
                arrow_forward
              </span>
            </button>

            <button
              onClick={() => onNavigate('about-us')}
              className="bg-white text-[#004349] border-2 border-[#004349] font-bold text-xl px-9 py-4 rounded-xl hover:bg-[#abeef6]/20 transition-all duration-300 min-h-[60px] flex items-center justify-center w-full sm:w-auto cursor-pointer shadow-sm"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-16 px-5 bg-[#f4f3f1] w-full relative z-20 border-t border-[#e3e2e0]">
        <div className="max-w-[1140px] mx-auto flex flex-col gap-12">
          <div className="text-center max-w-[720px] mx-auto">
            <h2 className="font-headline font-bold text-3xl sm:text-4xl text-[#1a1c1b] mb-4">
              Designed for Comfort. Built for Connection.
            </h2>
            <p className="text-xl text-[#3f484a] leading-relaxed">
              We understand that the right environment matters. That's why every location on SilverCircle is vetted for accessibility, comfort, and a welcoming atmosphere.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            {/* Feature 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col gap-3 h-full border border-[#e3e2e0]/60 group">
              <div className="w-16 h-16 rounded-full bg-[#abeef6] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[34px] text-[#002023]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  accessible
                </span>
              </div>
              <h3 className="font-headline font-bold text-2xl text-[#1a1c1b]">Guaranteed Accessible</h3>
              <p className="text-lg text-[#3f484a] leading-relaxed flex-grow">
                No surprises. Every venue is clearly marked with mobility details, seating comfort, level floors, and noise levels.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col gap-3 h-full border border-[#e3e2e0]/60 group">
              <div className="w-16 h-16 rounded-full bg-[#ffdad4] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[34px] text-[#3f0300]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  groups
                </span>
              </div>
              <h3 className="font-headline font-bold text-2xl text-[#1a1c1b]">Meet Like-minded Peers</h3>
              <p className="text-lg text-[#3f484a] leading-relaxed flex-grow">
                Find local groups and events tailored to your interests, from quiet morning coffee groups to lively gardening workshops.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col gap-3 h-full border border-[#e3e2e0]/60 group">
              <div className="w-16 h-16 rounded-full bg-[#c5e7ff] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[34px] text-[#001e2d]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  verified_user
                </span>
              </div>
              <h3 className="font-headline font-bold text-2xl text-[#1a1c1b]">Safe & Secure</h3>
              <p className="text-lg text-[#3f484a] leading-relaxed flex-grow">
                A trusted environment where user profiles are verified and spaces are screened for low trip hazards and emergency safety.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Discussion Forum & Comments (Disqus) */}
      <DisqusForum />
    </div>
  );
};
