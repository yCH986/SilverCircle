import React from 'react';
import { AppScreen } from '../types';

interface HeaderProps {
  currentScreen: AppScreen;
  onNavigate: (screen: AppScreen) => void;
  onOpenProfile: () => void;
  onOpenSingStat?: () => void;
  textSize: 'normal' | 'large' | 'xlarge';
  onCycleTextSize: () => void;
  isHighContrast: boolean;
  onToggleHighContrast: () => void;
  isAudioGuideActive: boolean;
  onToggleAudioGuide: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  onOpenProfile,
  textSize,
  onCycleTextSize,
  isHighContrast,
  onToggleHighContrast,
  isAudioGuideActive,
  onToggleAudioGuide,
}) => {
  const logoUrl = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJOQutjaQaP3UWLdRWC-pdpdQiIX7lW4uQVkQ-WuO1qy4CUDYM5VL0V_4lqiJS34mh_fhzT0yQRQgn7P0muOJHk_ndY9amvB45439uCGgA5w-o3Fut-w7dtChEk5Dbe166cCg7SCAM2iHFInWDFJHO-piJ5Fs8QPjbvb82IZR-RDrNh7BqZZfhmO6Kz6kW1MO_HJasx_i_QPUSWe-_s-3nSB2hDfeuFtOkkqVv7JzpcTvDJD7JcEJq';

  return (
    <header className={`fixed top-0 w-full z-50 transition-colors duration-200 ${
      isHighContrast ? 'bg-black text-white border-b-2 border-yellow-400' : 'bg-[#faf9f7]/95 backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.05)] border-b border-[#efeeec]'
    }`}>
      <div className="h-20 max-w-[1140px] mx-auto px-5 flex items-center justify-between gap-6">
        {/* Brand Logo */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#004349] rounded-lg p-1 text-left cursor-pointer group"
          aria-label="SilverCircle Home"
        >
          <img
            src={logoUrl}
            alt="SilverCircle Logo"
            className="h-9 w-auto object-contain transition-transform group-hover:scale-105"
          />
          <span className="font-headline font-bold text-2xl md:text-[28px] text-[#004349] tracking-tight group-hover:opacity-90">
            SilverCircle
          </span>
        </button>

        {/* Primary Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10" aria-label="Main Navigation">
          <button
            onClick={() => onNavigate('home')}
            className={`transition-all py-2 text-lg font-semibold cursor-pointer ${
              currentScreen === 'home'
                ? 'text-[#004349] font-bold border-b-2 border-[#004349]'
                : 'text-[#3f484a] hover:text-[#004349]'
            }`}
          >
            Home
          </button>
          
          <button
            onClick={() => onNavigate('discover')}
            className={`transition-all py-2 text-lg font-semibold cursor-pointer ${
              currentScreen === 'discover' || currentScreen === 'results'
                ? 'text-[#004349] font-bold border-b-2 border-[#004349]'
                : 'text-[#3f484a] hover:text-[#004349]'
            }`}
          >
            Discover
          </button>
          
          <button
            onClick={() => onNavigate('hangout-spots')}
            className={`transition-all py-2 text-lg font-semibold cursor-pointer ${
              currentScreen === 'hangout-spots'
                ? 'text-[#004349] font-bold border-b-2 border-[#004349]'
                : 'text-[#3f484a] hover:text-[#004349]'
            }`}
          >
            Hangout Spots
          </button>

          <button
            onClick={() => onNavigate('about-us')}
            className={`transition-all py-2 text-lg font-semibold cursor-pointer ${
              currentScreen === 'about-us'
                ? 'text-[#004349] font-bold border-b-2 border-[#004349]'
                : 'text-[#3f484a] hover:text-[#004349]'
            }`}
          >
            About Us
          </button>
        </nav>

        {/* Accessibility Quick Tools & Profile */}
        <div className="flex items-center gap-3">
          {/* Text Size Booster */}
          <button
            onClick={onCycleTextSize}
            className="w-10 h-10 rounded-full bg-[#efeeec] hover:bg-[#e3e2e0] text-[#004349] font-bold flex items-center justify-center text-base transition-transform active:scale-95 cursor-pointer shadow-sm"
            title={`Current Text Size: ${textSize.toUpperCase()}. Click to enlarge text.`}
            aria-label="Enlarge text size"
          >
            {textSize === 'normal' ? 'A' : textSize === 'large' ? 'A+' : 'A++'}
          </button>

          {/* Voice Audio Guide */}
          <button
            onClick={onToggleAudioGuide}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all active:scale-95 cursor-pointer shadow-sm ${
              isAudioGuideActive
                ? 'bg-[#a73927] text-white animate-pulse'
                : 'bg-[#efeeec] text-[#3f484a] hover:bg-[#e3e2e0]'
            }`}
            title="Read screen aloud (Voice Guide for Seniors)"
            aria-label="Toggle voice reading assistant"
          >
            <span className="material-symbols-outlined text-[20px]">
              {isAudioGuideActive ? 'volume_up' : 'volume_mute'}
            </span>
          </button>

          {/* Senior Profile / Settings */}
          <button
            onClick={onOpenProfile}
            className="w-10 h-10 rounded-full bg-[#004349] text-white flex items-center justify-center cursor-pointer hover:scale-105 transition-transform shadow-md"
            title="Senior Profile & Preferences"
            aria-label="View senior profile"
          >
            <span className="material-symbols-outlined text-white text-[24px]">person</span>
          </button>
        </div>
      </div>

      {/* Mobile Sub Navigation Bar */}
      <div className="md:hidden flex items-center justify-around bg-[#efeeec] border-t border-[#e3e2e0] px-2 py-1.5 text-sm font-semibold">
        <button
          onClick={() => onNavigate('home')}
          className={`px-3 py-1 rounded-full ${
            currentScreen === 'home' ? 'bg-[#004349] text-white' : 'text-[#3f484a]'
          }`}
        >
          Home
        </button>
        <button
          onClick={() => onNavigate('discover')}
          className={`px-3 py-1 rounded-full ${
            currentScreen === 'discover' || currentScreen === 'results' ? 'bg-[#004349] text-white' : 'text-[#3f484a]'
          }`}
        >
          Discover
        </button>
        <button
          onClick={() => onNavigate('hangout-spots')}
          className={`px-3 py-1 rounded-full ${
            currentScreen === 'hangout-spots' ? 'bg-[#004349] text-white' : 'text-[#3f484a]'
          }`}
        >
          Hangouts
        </button>
        <button
          onClick={() => onNavigate('about-us')}
          className={`px-3 py-1 rounded-full ${
            currentScreen === 'about-us' ? 'bg-[#004349] text-white' : 'text-[#3f484a]'
          }`}
        >
          About
        </button>
      </div>
    </header>
  );
};
