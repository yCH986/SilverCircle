import React, { useEffect } from 'react';

declare global {
  interface Window {
    DISQUS?: {
      reset: (options: { reload: boolean; config?: () => void }) => void;
    };
    disqus_config?: () => void;
  }
}

export const DisqusForum: React.FC = () => {
  useEffect(() => {
    // Configure Disqus parameters
    try {
      window.disqus_config = function (this: { page: { url?: string; identifier?: string } }) {
        try {
          this.page.url = window.location.href.split('#')[0];
          this.page.identifier = 'silvercircle-landing-forum';
        } catch {
          // Ignore location access restriction
        }
      };

      const timer = setTimeout(() => {
        try {
          const existingEmbed = document.querySelector('script[src="https://chloyee.disqus.com/embed.js"]');

          if (window.DISQUS && existingEmbed) {
            try {
              window.DISQUS.reset({
                reload: true,
                config: window.disqus_config,
              });
            } catch {
              // Ignore disqus reset error
            }
          } else if (!existingEmbed) {
            const s = document.createElement('script');
            s.src = 'https://chloyee.disqus.com/embed.js';
            s.setAttribute('data-timestamp', (+new Date()).toString());
            s.async = true;
            s.crossOrigin = 'anonymous';
            s.onerror = () => {};
            (document.head || document.body).appendChild(s);
          }
        } catch {
          // Ignore embed injection error
        }
      }, 50);

      return () => clearTimeout(timer);
    } catch {
      // Ignore top-level setup errors
    }
  }, []);

  return (
    <section className="py-16 px-5 bg-white w-full border-t border-[#e3e2e0]">
      <div className="max-w-[1000px] mx-auto flex flex-col gap-6">
        {/* Forum Section Header */}
        <div className="flex flex-col gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#abeef6]/30 text-[#004349] font-bold text-xs w-fit">
            <span className="material-symbols-outlined text-[16px]">forum</span>
            <span>Community Discussions</span>
          </div>
          <h2 className="font-headline font-bold text-3xl sm:text-4xl text-[#1a1c1b]">
            Senior Community Discussion Forum
          </h2>
          <p className="text-lg text-[#3f484a]">
            Connect, share meetup ideas, and ask questions with fellow community members and organizers.
          </p>
        </div>

        {/* Disqus Thread Container */}
        <div className="bg-[#faf9f7] rounded-3xl p-6 sm:p-8 border border-[#e3e2e0] shadow-sm min-h-[360px]">
          <div id="disqus_thread" className="w-full"></div>
          <noscript>
            Please enable JavaScript to view the{' '}
            <a href="https://disqus.com/?ref_noscript" className="text-[#a73927] underline">
              comments powered by Disqus.
            </a>
          </noscript>
        </div>
      </div>
    </section>
  );
};

