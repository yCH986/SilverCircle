import React from 'react';
import { HangoutSpot } from '../types';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: string[];
  spots: HangoutSpot[];
  onSelectSpot: (spot: HangoutSpot) => void;
  onRemoveFavorite: (spotId: string) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  favorites,
  spots,
  onSelectSpot,
  onRemoveFavorite,
}) => {
  const seniorAvatar = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAe6T9_XtfBAaeuz-t9ufJmXX-sVHye-6XaLJ7waF8P1UTEuyGOguEDQ-PNeAqY-GSUGJexnoIW6MS3GqOqE9t-baR0UAfbo3Kkv8qjXwjwA56bF2NplhDulUtheJ-pg2LXmIQ2NNoVlG3VDCvwjlL13g0ecdkQh1vLn_e_CGCXMg2_UdUmm0xO0Fkb72Dgz6OHA40-E4iRe3TeOl7zJ1jXVi6t748yX0Z_vKnDmZNOdhk01z0rBhyh';

  if (!isOpen) return null;

  const favoriteSpots = spots.filter(s => favorites.includes(s.id));

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="profile-modal-title"
    >
      <div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-[#e3e2e0] my-8 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 bg-[#004349] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/20 overflow-hidden border-2 border-white">
              <img
                src={seniorAvatar}
                alt="Senior User Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 id="profile-modal-title" className="font-headline font-bold text-2xl text-white">
                Madam Tan Bee Lan
              </h2>
              <p className="text-xs text-[#90d2da]">
                Silver Member • Toa Payoh Walking Club
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto flex flex-col gap-6">
          {/* Senior Accessibility Preferences */}
          <div className="bg-[#f4f3f1] p-5 rounded-2xl border border-[#e3e2e0] flex flex-col gap-3">
            <h3 className="font-headline font-bold text-lg text-[#1a1c1b] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#004349]">tune</span>
              <span>Saved Accessibility Preferences</span>
            </h3>
            
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="bg-white p-2.5 rounded-xl border border-[#e3e2e0] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#004349] text-[18px]">check_circle</span>
                <span className="font-medium">Level Step-Free Floors</span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-[#e3e2e0] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#004349] text-[18px]">check_circle</span>
                <span className="font-medium">Air Conditioning</span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-[#e3e2e0] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#004349] text-[18px]">check_circle</span>
                <span className="font-medium">Comfort Armchairs</span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-[#e3e2e0] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#004349] text-[18px]">check_circle</span>
                <span className="font-medium">Voice Reading Enabled</span>
              </div>
            </div>
          </div>

          {/* Saved Favorite Hangout Spots */}
          <div>
            <h3 className="font-headline font-bold text-xl text-[#1a1c1b] mb-3 flex items-center justify-between">
              <span>My Saved Hangout Spots ({favoriteSpots.length})</span>
            </h3>

            {favoriteSpots.length === 0 ? (
              <div className="text-center p-8 bg-[#faf9f7] rounded-2xl border-2 border-dashed border-[#bfc8c9] text-[#6f797a]">
                <span className="material-symbols-outlined text-[36px] mb-2 text-[#bfc8c9]">favorite_border</span>
                <p className="text-base font-medium">No saved spots yet.</p>
                <p className="text-xs mt-1">Click the heart icon on any venue to save it here for quick access!</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {favoriteSpots.map((spot) => (
                  <div
                    key={spot.id}
                    className="p-3 bg-white rounded-2xl border border-[#e3e2e0] flex items-center justify-between gap-3 hover:border-[#004349] transition-colors"
                  >
                    <div
                      onClick={() => {
                        onClose();
                        onSelectSpot(spot);
                      }}
                      className="flex items-center gap-3 flex-grow cursor-pointer"
                    >
                      <img
                        src={spot.image}
                        alt={spot.name}
                        className="w-14 h-14 rounded-xl object-cover"
                      />
                      <div>
                        <h4 className="font-headline font-bold text-base text-[#1a1c1b]">
                          {spot.name}
                        </h4>
                        <p className="text-xs text-[#6f797a]">
                          {spot.district} • {spot.category}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => onRemoveFavorite(spot.id)}
                      className="p-2 text-[#a73927] hover:bg-[#ffdad4]/30 rounded-xl transition-colors cursor-pointer"
                      title="Remove from favorites"
                    >
                      <span className="material-symbols-outlined text-[20px]">delete</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#efeeec] border-t border-[#e3e2e0] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-[#004349] text-white font-bold text-sm cursor-pointer hover:bg-[#0d5c63]"
          >
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
};
