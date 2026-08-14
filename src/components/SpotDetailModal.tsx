import React, { useState, useEffect } from 'react';
import { HangoutSpot } from '../types';

interface SpotDetailModalProps {
  spot: HangoutSpot | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (spotId: string) => void;
}

interface SpotReview {
  id: string;
  author: string;
  rating: number;
  comment: string;
  timestamp: string;
  tags: string[];
  helpfulCount: number;
  hasMarkedHelpful?: boolean;
}

const DEFAULT_SPOT_REVIEWS: Record<string, SpotReview[]> = {
  default: [
    {
      id: 'rev-1',
      author: 'Mdm Alice Tan (Age 68)',
      rating: 5,
      comment: 'Very easy to access with my walking cane. The air conditioning is not too cold and there are wide armchairs near the entrance.',
      timestamp: '3 days ago',
      tags: ['Wheelchair Friendly', 'Comfortable Seating'],
      helpfulCount: 14,
    },
    {
      id: 'rev-2',
      author: 'Uncle David Lee (Age 74)',
      rating: 5,
      comment: 'Very friendly staff. Public toilets are very clean with sturdy handrails and no wet steps. Great for morning coffee with friends.',
      timestamp: '1 week ago',
      tags: ['Clean Toilets', 'Quiet Atmosphere'],
      helpfulCount: 9,
    },
  ],
};

export const SpotDetailModal: React.FC<SpotDetailModalProps> = ({
  spot,
  onClose,
  isFavorite,
  onToggleFavorite,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copiedInvite, setCopiedInvite] = useState(false);

  // Reviews state
  const [reviews, setReviews] = useState<SpotReview[]>([]);
  const [isAddingReview, setIsAddingReview] = useState(false);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewTag, setNewReviewTag] = useState('Step-Free Access');

  useEffect(() => {
    if (!spot) return;
    try {
      const storageKey = `silvercircle_spot_reviews_${spot.id}`;
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        setReviews(JSON.parse(saved));
      } else {
        setReviews(DEFAULT_SPOT_REVIEWS[spot.id] || DEFAULT_SPOT_REVIEWS.default);
      }
    } catch {
      setReviews(DEFAULT_SPOT_REVIEWS.default);
    }
  }, [spot]);

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
    utterance.rate = 0.9;
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

  const handleHelpful = (reviewId: string) => {
    const updated = reviews.map((r) => {
      if (r.id === reviewId) {
        const hasMarkedHelpful = !r.hasMarkedHelpful;
        return {
          ...r,
          hasMarkedHelpful,
          helpfulCount: hasMarkedHelpful ? r.helpfulCount + 1 : Math.max(0, r.helpfulCount - 1),
        };
      }
      return r;
    });
    setReviews(updated);
    try {
      localStorage.setItem(`silvercircle_spot_reviews_${spot.id}`, JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewComment.trim()) return;

    const newRev: SpotReview = {
      id: `rev-${Date.now()}`,
      author: newReviewAuthor.trim() || 'Senior Kaki',
      rating: newReviewRating,
      comment: newReviewComment.trim(),
      timestamp: 'Just now',
      tags: [newReviewTag],
      helpfulCount: 1,
      hasMarkedHelpful: true,
    };

    const updated = [newRev, ...reviews];
    setReviews(updated);
    try {
      localStorage.setItem(`silvercircle_spot_reviews_${spot.id}`, JSON.stringify(updated));
    } catch {
      // Ignore
    }

    setNewReviewComment('');
    setNewReviewAuthor('');
    setIsAddingReview(false);
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
              <span>{spot.rating} ({spot.reviewCount + reviews.length - 2} verified senior reviews)</span>
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

          {/* Senior Community Reviews & Tips Section */}
          <div className="bg-[#faf9f7] p-6 rounded-2xl border border-[#e3e2e0] flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#004349] text-[24px]">reviews</span>
                <h3 className="font-headline font-bold text-xl text-[#1a1c1b]">
                  Senior Community Tips & Reviews
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddingReview(!isAddingReview)}
                className="px-3 py-1.5 bg-[#004349] hover:bg-[#0d5c63] text-white text-xs font-bold rounded-lg cursor-pointer transition-colors"
              >
                {isAddingReview ? 'Cancel' : '+ Add Your Tip'}
              </button>
            </div>

            {/* Add Review Form */}
            {isAddingReview && (
              <form onSubmit={handleAddReview} className="bg-white p-4 rounded-xl border border-[#004349] flex flex-col gap-3 animate-fade-in">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <input
                    type="text"
                    value={newReviewAuthor}
                    onChange={(e) => setNewReviewAuthor(e.target.value)}
                    placeholder="Your Name (e.g. Auntie Janet)"
                    className="px-3 py-2 bg-[#faf9f7] border border-[#e3e2e0] rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#004349]"
                  />
                  <select
                    value={newReviewRating}
                    onChange={(e) => setNewReviewRating(Number(e.target.value))}
                    className="px-3 py-2 bg-[#faf9f7] border border-[#e3e2e0] rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#004349]"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5/5 Excellent)</option>
                    <option value={4}>⭐⭐⭐⭐ (4/5 Very Good)</option>
                    <option value={3}>⭐⭐⭐ (3/5 Average)</option>
                  </select>
                  <select
                    value={newReviewTag}
                    onChange={(e) => setNewReviewTag(e.target.value)}
                    className="px-3 py-2 bg-[#faf9f7] border border-[#e3e2e0] rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#004349]"
                  >
                    <option value="Step-Free Access">Step-Free Access</option>
                    <option value="Comfortable Seating">Comfortable Seating</option>
                    <option value="Clean Toilets">Clean Accessible Toilets</option>
                    <option value="Quiet & Sheltered">Quiet & Sheltered</option>
                  </select>
                </div>

                <textarea
                  required
                  rows={2}
                  value={newReviewComment}
                  onChange={(e) => setNewReviewComment(e.target.value)}
                  placeholder="Share practical tips for seniors (e.g. elevator location, quiet hours, ramp access)..."
                  className="w-full px-3 py-2 bg-[#faf9f7] border border-[#e3e2e0] rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#004349]"
                />

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingReview(false)}
                    className="px-3 py-1.5 text-xs font-bold text-[#73787a] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-[#004349] text-white text-xs font-bold rounded-lg shadow-sm cursor-pointer hover:bg-[#0d5c63]"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            )}

            {/* List of Spot Reviews */}
            <div className="flex flex-col gap-3">
              {reviews.map((rev) => (
                <div key={rev.id} className="bg-white p-4 rounded-xl border border-[#e3e2e0] flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-headline font-bold text-sm text-[#1a1c1b]">
                        {rev.author}
                      </span>
                      <div className="flex text-[#a73927] text-xs">
                        {'★'.repeat(rev.rating)}
                      </div>
                    </div>
                    <span className="text-[11px] text-[#73787a]">{rev.timestamp}</span>
                  </div>

                  <p className="text-sm text-[#3f484a] leading-relaxed">
                    {rev.comment}
                  </p>

                  <div className="flex items-center justify-between pt-1 border-t border-gray-100 text-xs">
                    <div className="flex gap-1.5">
                      {rev.tags.map((t, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-[#abeef6]/30 text-[#004349] rounded-full font-bold text-[10px]">
                          {t}
                        </span>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleHelpful(rev.id)}
                      className={`inline-flex items-center gap-1 cursor-pointer font-semibold ${
                        rev.hasMarkedHelpful ? 'text-[#a73927]' : 'text-[#73787a] hover:text-[#004349]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[14px]">thumb_up</span>
                      <span>Helpful ({rev.helpfulCount})</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
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
