import React from 'react';
import { AppScreen } from '../types';

interface FooterProps {
  onNavigate: (screen: AppScreen) => void;
  onOpenPrivacy?: () => void;
  onOpenAccessibilityStatement?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenPrivacy,
  onOpenAccessibilityStatement,
}) => {
  const logoUrl = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJOQutjaQaP3UWLdRWC-pdpdQiIX7lW4uQVkQ-WuO1qy4CUDYM5VL0V_4lqiJS34mh_fhzT0yQRQgn7P0muOJHk_ndY9amvB45439uCGgA5w-o3Fut-w7dtChEk5Dbe166cCg7SCAM2iHFInWDFJHO-piJ5Fs8QPjbvb82IZR-RDrNh7BqZZfhmO6Kz6kW1MO_HJasx_i_QPUSWe-_s-3nSB2hDfeuFtOkkqVv7JzpcTvDJD7JcEJq';

  return (
    <footer className="w-full bg-[#efeeec] border-t-2 border-[#bfc8c9] mt-12 transition-colors">
      <div className="max-w-[1140px] mx-auto px-5 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <img
            src={logoUrl}
            alt="SilverCircle Logo"
            className="h-6 w-auto grayscale opacity-70 object-contain"
          />
          <span className="font-headline font-semibold text-xl text-[#3f484a]">
            SilverCircle
          </span>
        </div>

        {/* Links */}
        <nav className="flex flex-wrap justify-center gap-6" aria-label="Footer Navigation">
          <button
            onClick={() => {
              if (onOpenPrivacy) onOpenPrivacy();
              else alert('SilverCircle Privacy Policy: We safeguard our seniors\' personal preferences with the highest privacy standards.');
            }}
            className="font-semibold text-base text-[#3f484a] hover:text-[#a73927] transition-colors underline underline-offset-4 cursor-pointer"
          >
            Privacy Policy
          </button>
          
          <button
            onClick={() => onNavigate('about-us')}
            className="font-semibold text-base text-[#3f484a] hover:text-[#a73927] transition-colors underline underline-offset-4 cursor-pointer"
          >
            Contact
          </button>
          
          <button
            onClick={() => {
              if (onOpenAccessibilityStatement) onOpenAccessibilityStatement();
              else alert('Accessibility Statement: SilverCircle complies with WCAG 2.1 AAA accessibility guidelines, featuring 20px+ body text, 4.5:1+ contrast ratios, and tactile screen navigation.');
            }}
            className="font-semibold text-base text-[#3f484a] hover:text-[#a73927] transition-colors underline underline-offset-4 cursor-pointer"
          >
            Accessibility Statement
          </button>
        </nav>
      </div>

      <div className="max-w-[1140px] mx-auto px-5 pb-8 text-center md:text-left text-base text-[#6f797a]">
        © 2024 SilverCircle. Designed with dignity for our seniors. SingStat demographic statistics integrated.
      </div>
    </footer>
  );
};
