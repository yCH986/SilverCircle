import React, { useState } from 'react';
import { HangoutSpot } from '../types';

interface SpotDetailModalProps {
  spot: HangoutSpot | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (spotId: string) => void;
}

export const SpotDetailModal: React.FC<SpotDetailModalProps> = ({
  spot,
  onClose,
  isFavorite,
  onToggleFavorite,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copiedInvite, setCopiedInvite] = useState(false);

  if (!spot) return null;

  const handleSpeakDetails = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported on this browser.');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    const textToRead = `${spot.name} in ${spot.district}. ${spot.description}. Located at ${spot.address}. ${spot.transitSummary}. Special amenities include: ${spot.specialAmenities.join('. ')}. Opening hours: ${spot.openingHours}.`;
    
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = 0.9; // Slightly slower, clear voice for seniors
    utterance.pitch = 1.0;
    
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setIsPlayingAudio(true);
  };

  const handleShareInvite = () => {
    const inviteText = `Hi kakis! Let's meet at ${spot.name} in ${spot.district}! Address: ${spot.address}. It has level step-free access and comfortable seating. See you there!`;
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(inviteText);
      setCopiedInvite(true);
      setTimeout(() => setCopiedInvite(false), 3000);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-spot-title"
    >
      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#e3e2e0] my-8 flex flex-col max-h-[90vh]">
        {/* Header Photo & Close Button */}
        <div className="relative h-64 sm:h-72 w-full bg-[#efeeec] shrink-0">
          <img
            src={spot.image}
            alt={spot.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Close button */}
          <button
            type="button"
            onClick={() => {
              if (isPlayingAudio) window.speechSynthesis.cancel();
              onClose();
            }}
            className="absolute top-4 right-4 w-12 h-12 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer shadow-lg z-10"
            aria-label="Close details modal"
          >
            <span className="material-symbols-outlined text-[28px]">close</span>
          </button>

          {/* Favorite button */}
          <button
            type="button"
            onClick={() => onToggleFavorite(spot.id)}
            className={`absolute top-4 left-4 px-4 py-2 rounded-full font-bold text-sm flex items-center gap-1.5 transition-transform active:scale-95 shadow-md cursor-pointer ${
              isFavorite
                ? 'bg-[#a73927] text-white'
                : 'bg-white/90 backdrop-blur-md text-[#1a1c1b] hover:bg-white'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: isFavorite ? "'FILL' 1" : "'FILL' 0" }}>
              favorite
            </span>
            <span>{isFavorite ? 'Saved to Favorites' : 'Save Spot'}</span>
          </button>

          {/* Title and Rating on bottom of image */}
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <span className="bg-[#abeef6] text-[#002023] font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider mb-2 inline-block">
              {spot.category} • {spot.district}
            </span>
            <h2 id="modal-spot-title" className="font-headline font-bold text-2xl sm:text-3xl leading-tight text-white drop-shadow-md">
              {spot.name}
            </h2>
            <div className="flex items-center gap-2 mt-1 text-sm font-semibold text-white/90">
              <span className="material-symbols-outlined text-[#ffdad4] text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                star
              </span>
              <span>{spot.rating} ({spot.reviewCount} verified senior reviews)</span>
            </div>
          </div>
        </div>

        {/* Modal Body: Scrollable */}
        <div className="p-6 sm:p-8 overflow-y-auto flex flex-col gap-6">
          {/* Quick Voice Reader Bar */}
          <div className="bg-[#f4f3f1] p-4 rounded-2xl border border-[#e3e2e0] flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#004349] text-[28px]">
                hearing
              </span>
              <div>
                <p className="font-bold text-base text-[#1a1c1b]">
                  Audio Venue Guide
                </p>
                <p className="text-xs text-[#6f797a]">
                  Listen to voice directions and accessibility features
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSpeakDetails}
              className={`px-5 py-2.5 rounded-xl font-bold text-base transition-all flex items-center gap-2 cursor-pointer shadow-sm ${
                isPlayingAudio
                  ? 'bg-[#a73927] text-white animate-pulse'
                  : 'bg-[#004349] hover:bg-[#0d5c63] text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">
                {isPlayingAudio ? 'stop_circle' : 'volume_up'}
              </span>
              <span>{isPlayingAudio ? 'Stop Reading' : 'Listen Aloud'}</span>
            </button>
          </div>

          {/* Location and Opening Hours */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-[#e3e2e0] flex flex-col gap-1">
              <div className="flex items-center gap-2 text-[#004349] font-bold text-sm">
                <span className="material-symbols-outlined text-[20px]">location_on</span>
                <span>Address</span>
              </div>
              <p className="text-base text-[#1a1c1b] font-medium">
                {spot.address}
              </p>
              <p className="text-xs text-[#6f797a] mt-1">
                {spot.transitSummary}
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-[#e3e2e0] flex flex-col gap-1">
              <div className="flex items-center gap-2 text-[#004349] font-bold text-sm">
                <span className="material-symbols-outlined text-[20px]">schedule</span>
                <span>Opening Hours</span>
              </div>
              <p className="text-base text-[#1a1c1b] font-medium">
                {spot.openingHours}
              </p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-headline font-bold text-xl text-[#1a1c1b] mb-2">
              About this Space
            </h3>
            <p className="text-lg text-[#3f484a] leading-relaxed">
              {spot.description}
            </p>
          </div>

          {/* 4 Core Criteria Progress Bars */}
          <div className="bg-[#f4f3f1] p-6 rounded-2xl border border-[#e3e2e0] flex flex-col gap-4">
            <h3 className="font-headline font-bold text-lg text-[#1a1c1b]">
              Senior Accessibility Breakdown
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-semibold">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="flex items-center gap-1 text-[#1a1c1b]">
                    <span className="material-symbols-outlined text-[18px] text-[#004349]">accessible</span>
                    <span>Step-Free Access</span>
                  </span>
                  <span className="text-[#004349]">{spot.criteriaScores.accessibility}%</span>
                </div>
                <div className="w-full bg-[#e3e2e0] h-2.5 rounded-full overflow-hidden">
                  <div className="bg-[#004349] h-2.5 rounded-full" style={{ width: `${spot.criteriaScores.accessibility}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="flex items-center gap-1 text-[#1a1c1b]">
                    <span className="material-symbols-outlined text-[18px] text-[#a73927]">do_not_step</span>
                    <span>Low Trip Hazard</span>
                  </span>
                  <span className="text-[#a73927]">{spot.criteriaScores.lowTripHazard}%</span>
                </div>
                <div className="w-full bg-[#e3e2e0] h-2.5 rounded-full overflow-hidden">
                  <div className="bg-[#a73927] h-2.5 rounded-full" style={{ width: `${spot.criteriaScores.lowTripHazard}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="flex items-center gap-1 text-[#1a1c1b]">
                    <span className="material-symbols-outlined text-[18px] text-[#124157]">ac_unit</span>
                    <span>Temperature & Shading</span>
                  </span>
                  <span className="text-[#124157]">{spot.criteriaScores.temperatureControlled}%</span>
                </div>
                <div className="w-full bg-[#e3e2e0] h-2.5 rounded-full overflow-hidden">
                  <div className="bg-[#124157] h-2.5 rounded-full" style={{ width: `${spot.criteriaScores.temperatureControlled}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="flex items-center gap-1 text-[#1a1c1b]">
                    <span className="material-symbols-outlined text-[18px] text-[#0d5c63]">groups</span>
                    <span>Senior Friendly Atmosphere</span>
                  </span>
                  <span className="text-[#0d5c63]">{spot.criteriaScores.seniorFriendlyActivities}%</span>
                </div>
                <div className="w-full bg-[#e3e2e0] h-2.5 rounded-full overflow-hidden">
                  <div className="bg-[#0d5c63] h-2.5 rounded-full" style={{ width: `${spot.criteriaScores.seniorFriendlyActivities}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* Special Amenities Checklist */}
          <div>
            <h3 className="font-headline font-bold text-xl text-[#1a1c1b] mb-3">
              Special Senior Amenities
            </h3>
            <ul className="flex flex-col gap-2.5">
              {spot.specialAmenities.map((amenity, idx) => (
                <li key={idx} className="flex items-start gap-3 bg-white p-3 rounded-xl border border-[#e3e2e0]">
                  <span className="material-symbols-outlined text-[#004349] text-[22px] shrink-0 mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
                    check_circle
                  </span>
                  <span className="text-base text-[#3f484a] font-medium leading-relaxed">
                    {amenity}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 bg-[#efeeec] border-t border-[#e3e2e0] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={handleShareInvite}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-[#faf9f7] text-[#004349] border-2 border-[#004349] font-bold text-base flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">send</span>
            <span>{copiedInvite ? 'Invite Copied!' : 'Invite Kakis / Friends'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (isPlayingAudio) window.speechSynthesis.cancel();
              onClose();
            }}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#004349] hover:bg-[#0d5c63] text-white font-bold text-base transition-colors flex items-center justify-center cursor-pointer shadow-md"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
