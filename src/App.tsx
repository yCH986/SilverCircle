import React, { useEffect, useState } from 'react';
import { AboutScreen } from './components/AboutScreen';
import { DiscoverSetupScreen } from './components/DiscoverSetupScreen';
import { Footer } from './components/Footer';
import { HangoutSpotsScreen } from './components/HangoutSpotsScreen';
import { Header } from './components/Header';
import { HomeScreen } from './components/HomeScreen';
import { MatchResultsScreen } from './components/MatchResultsScreen';
import { ProfileModal } from './components/ProfileModal';
import { SingStatExplorerModal } from './components/SingStatExplorerModal';
import { SpotDetailModal } from './components/SpotDetailModal';
import { HANGOUT_SPOTS } from './data/hangoutSpots';
import { calculateDistrictMatches, pullSingStatTableM810771, queryBackendSeniorMatch } from './data/singstat';
import { AppScreen, DiscoveryFilters, DistrictMatchResult, HangoutSpot } from './types';

export function App() {
  // Navigation
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('home');
  
  // Senior Accessibility Settings
  const [textSize, setTextSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isAudioGuideActive, setIsAudioGuideActive] = useState(false);

  // Discovery Filters State (Initialized to match screenshot: Female, 65-69, 70-74, 75-79)
  const [filters, setFilters] = useState<DiscoveryFilters>({
    gender: 'female',
    ageRanges: ['65-69', '70-74', '75-79'],
  });

  // Dynamic Match Computation
  const [matchResult, setMatchResult] = useState<DistrictMatchResult>(() =>
    calculateDistrictMatches(filters)
  );
  const [isCalculating, setIsCalculating] = useState(false);

  // Modals & Active Spot
  const [selectedSpot, setSelectedSpot] = useState<HangoutSpot | null>(null);
  const [isSingStatOpen, setIsSingStatOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [favorites, setFavorites] = useState<string[]>(['oakwood-cafe', 'sunrise-bakery']);

  // Pre-fetch SingStat table M810771 on mount
  useEffect(() => {
    queryBackendSeniorMatch(filters).then((result) => {
      setMatchResult(result);
    });
  }, []);

  // Handle filter updates
  const handleUpdateFilters = (newFilters: Partial<DiscoveryFilters>) => {
    const updated = { ...filters, ...newFilters };
    setFilters(updated);
    setMatchResult(calculateDistrictMatches(updated));
  };

  // Run Search Match flow pulling directly from SingStat M810771
  const handleSearchSubmit = async () => {
    setIsCalculating(true);
    try {
      const calculated = await queryBackendSeniorMatch(filters);
      setMatchResult(calculated);
      setIsCalculating(false);
      setCurrentScreen('results');
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Voice prompt if audio guide active
      if (isAudioGuideActive && 'speechSynthesis' in window) {
        const text = `Great news! ${calculated.district.name} is your best match based on SingStat Table M810771 with an ${calculated.matchRate}% match rate and ${calculated.potentialFriendsCount} active peers this week.`;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
      }
    } catch {
      const calculated = calculateDistrictMatches(filters);
      setMatchResult(calculated);
      setIsCalculating(false);
      setCurrentScreen('results');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Text size toggle
  const handleCycleTextSize = () => {
    if (textSize === 'normal') setTextSize('large');
    else if (textSize === 'large') setTextSize('xlarge');
    else setTextSize('normal');
  };

  // Audio guide toggle
  const handleToggleAudioGuide = () => {
    const nextState = !isAudioGuideActive;
    setIsAudioGuideActive(nextState);

    if (nextState && 'speechSynthesis' in window) {
      const text = 'Voice Reading Assistant is now turned on. I will read important district recommendations and venue details for you.';
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    } else if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  const handleToggleFavorite = (spotId: string) => {
    setFavorites(prev =>
      prev.includes(spotId) ? prev.filter(id => id !== spotId) : [...prev, spotId]
    );
  };

  // Text size classes
  const textSizeClass =
    textSize === 'xlarge'
      ? 'text-[120%] leading-relaxed'
      : textSize === 'large'
      ? 'text-[110%] leading-relaxed'
      : 'text-[100%]';

  // Scroll to top on screen change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentScreen]);

  return (
    <div
      className={`min-h-screen flex flex-col font-body antialiased transition-all ${textSizeClass} ${
        isHighContrast ? 'bg-black text-white' : 'bg-[#faf9f7] text-[#1a1c1b]'
      }`}
    >
      {/* Top Navigation Header */}
      <Header
        currentScreen={currentScreen}
        onNavigate={(screen) => setCurrentScreen(screen)}
        onOpenProfile={() => setIsProfileOpen(true)}
        textSize={textSize}
        onCycleTextSize={handleCycleTextSize}
        isHighContrast={isHighContrast}
        onToggleHighContrast={() => setIsHighContrast(!isHighContrast)}
        isAudioGuideActive={isAudioGuideActive}
        onToggleAudioGuide={handleToggleAudioGuide}
      />

      {/* Main Content Area */}
      <main className="flex-grow pt-20">
        {currentScreen === 'home' && (
          <HomeScreen
            onStartExploring={() => setCurrentScreen('discover')}
            onNavigate={(screen) => setCurrentScreen(screen)}
          />
        )}

        {currentScreen === 'discover' && (
          <DiscoverSetupScreen
            filters={filters}
            onUpdateFilters={handleUpdateFilters}
            onSubmitSearch={handleSearchSubmit}
            isCalculating={isCalculating}
          />
        )}

        {currentScreen === 'results' && (
          <MatchResultsScreen
            result={matchResult}
            onViewHangoutSpots={() => setCurrentScreen('hangout-spots')}
            onAdjustFilters={() => setCurrentScreen('discover')}
            onOpenSingStat={() => setIsSingStatOpen(true)}
          />
        )}

        {currentScreen === 'hangout-spots' && (
          <HangoutSpotsScreen
            spots={HANGOUT_SPOTS}
            selectedSpotId={selectedSpot ? selectedSpot.id : null}
            onSelectSpot={(spot) => setSelectedSpot(spot)}
            onBackToMatch={() => setCurrentScreen('results')}
            districtName={matchResult.district.name}
          />
        )}

        {currentScreen === 'about-us' && (
          <AboutScreen
            onNavigate={(screen) => setCurrentScreen(screen)}
            onOpenSingStat={() => setIsSingStatOpen(true)}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer
        onNavigate={(screen) => setCurrentScreen(screen)}
        onOpenAccessibilityStatement={() => {
          alert('SilverCircle Accessibility Commitment: Designed with 24px touch targets, AA/AAA contrast ratios, screen-reader audio guides, and step-free venue curation.');
        }}
      />

      {/* Spot Detail Modal */}
      <SpotDetailModal
        spot={selectedSpot}
        onClose={() => setSelectedSpot(null)}
        isFavorite={selectedSpot ? favorites.includes(selectedSpot.id) : false}
        onToggleFavorite={handleToggleFavorite}
      />

      {/* SingStat Explorer Modal */}
      <SingStatExplorerModal
        isOpen={isSingStatOpen}
        onClose={() => setIsSingStatOpen(false)}
      />

      {/* Profile & Saved Spots Modal */}
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        favorites={favorites}
        spots={HANGOUT_SPOTS}
        onSelectSpot={(spot) => setSelectedSpot(spot)}
        onRemoveFavorite={handleToggleFavorite}
      />
    </div>
  );
}
export default App;
