import React, { useState, useEffect } from 'react';

export interface ForumComment {
  id: string;
  author: string;
  authorRole?: string;
  avatarBg?: string;
  district?: string;
  category: 'Kopi & Makan' | 'Walking & Exercise' | 'Accessibility & Transport' | 'General Q&A';
  title: string;
  content: string;
  timestamp: string;
  likes: number;
  hasLiked?: boolean;
  replies: {
    id: string;
    author: string;
    avatarBg?: string;
    district?: string;
    content: string;
    timestamp: string;
    likes: number;
    hasLiked?: boolean;
  }[];
}

const INITIAL_FORUM_POSTS: ForumComment[] = [
  {
    id: 'post-1',
    author: 'Auntie Mary Tan',
    authorRole: 'Active Senior Leader',
    avatarBg: 'bg-[#004349]',
    district: 'Toa Payoh',
    category: 'Walking & Exercise',
    title: 'Morning brisk walk group at Bishan-Ang Mo Kio Park (Every Tue & Thu 7:30 AM)',
    content:
      'Hello fellow kakis! A few of us from Toa Payoh and Bishan meet up every Tuesday and Thursday at 7:30 AM for a gentle 45-minute stroll along the paved, flat river trail. We start near the Lotus Pond sheltered pavilion. Very gentle pace, suitable for walking sticks. Free to join and we always go for kopi at the nearby hawker center after! Feel free to join us.',
    timestamp: '2 hours ago',
    likes: 24,
    hasLiked: false,
    replies: [
      {
        id: 'rep-1-1',
        author: 'Uncle David Lim',
        avatarBg: 'bg-[#124157]',
        district: 'Bishan',
        content: 'I joined last Thursday! The paths are very smooth and sheltered when it drizzles. Highly recommended for beginners.',
        timestamp: '1 hour ago',
        likes: 8,
      },
      {
        id: 'rep-1-2',
        author: 'Mdm Rosalind Neo',
        avatarBg: 'bg-[#a73927]',
        district: 'Ang Mo Kio',
        content: 'Are there benches along the way if we need to rest halfway? Looking to bring my sister along.',
        timestamp: '30 mins ago',
        likes: 4,
      },
      {
        id: 'rep-1-3',
        author: 'Auntie Mary Tan',
        avatarBg: 'bg-[#004349]',
        district: 'Toa Payoh',
        content: 'Yes Mdm Rosalind! Every 150m there are sheltered stone benches with backs and water coolers nearby.',
        timestamp: '15 mins ago',
        likes: 6,
      },
    ],
  },
  {
    id: 'post-2',
    author: 'Uncle Steven Koh',
    authorRole: 'Community Contributor',
    avatarBg: 'bg-[#2e586f]',
    district: 'Bedok',
    category: 'Accessibility & Transport',
    title: 'Wheelchair & Step-Free access guide for Bedok Town Square & Heartbeat@Bedok',
    content:
      'Just wanted to share for anyone using walking frames or wheelchairs: The underground walkway from Bedok MRT Exit B straight to Heartbeat@Bedok has new high-capacity elevators. No stairs required anywhere! Also, the public restrooms on Level 1 and 2 are extra spacious with automatic slide doors and grab rails.',
    timestamp: 'Yesterday at 3:45 PM',
    likes: 38,
    hasLiked: false,
    replies: [
      {
        id: 'rep-2-1',
        author: 'Mdm Jenny Chew',
        avatarBg: 'bg-[#004349]',
        district: 'Tampines',
        content: 'Thank you Uncle Steven! This information is so helpful for my husband who uses a motorized scooter.',
        timestamp: 'Yesterday at 5:12 PM',
        likes: 11,
      },
    ],
  },
  {
    id: 'post-3',
    author: 'Auntie Helen Wong',
    avatarBg: 'bg-[#a73927]',
    district: 'Jurong East',
    category: 'Kopi & Makan',
    title: 'Quiet morning coffee spot with low music and wide seating in Jurong',
    content:
      'If you prefer a quiet morning chat without loud background speakers, Toast Box at Jurong Point (Basement 1 near NTUC) has wide booth seats and plenty of natural light. Staff are very patient and will carry the hot tea tray to your table if you let them know.',
    timestamp: '2 days ago',
    likes: 19,
    hasLiked: false,
    replies: [
      {
        id: 'rep-3-1',
        author: 'Uncle Raymond Tan',
        avatarBg: 'bg-[#004349]',
        district: 'Clementi',
        content: 'Good tip! Also the Yuhua Village Market on 24th street has great traditional kopi-o and is 100% step-free.',
        timestamp: '1 day ago',
        likes: 9,
      },
    ],
  },
];

const LOCAL_STORAGE_KEY = 'silvercircle_community_forum_posts_v1';

declare global {
  interface Window {
    DISQUS?: {
      reset: (options: { reload: boolean; config?: () => void }) => void;
    };
    disqus_config?: () => void;
  }
}

export const DisqusForum: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'interactive' | 'disqus'>('interactive');
  const [posts, setPosts] = useState<ForumComment[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return INITIAL_FORUM_POSTS;
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // New post modal / state
  const [isPostingNew, setIsPostingNew] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newDistrict, setNewDistrict] = useState('Toa Payoh');
  const [newCategory, setNewCategory] = useState<ForumComment['category']>('Kopi & Makan');
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  // Reply form states keyed by post ID
  const [replyOpenPostId, setReplyOpenPostId] = useState<string | null>(null);
  const [replyAuthor, setReplyAuthor] = useState('');
  const [replyDistrict, setReplyDistrict] = useState('Central');
  const [replyContent, setReplyContent] = useState('');

  // Disqus loading state & error detection
  const [disqusStatus, setDisqusStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

  // Save posts to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(posts));
    } catch {
      // Ignore storage error
    }
  }, [posts]);

  // Disqus Script Loader
  useEffect(() => {
    if (activeTab !== 'disqus') return;

    let isMounted = true;
    setDisqusStatus('loading');

    try {
      window.disqus_config = function (this: { page: { url?: string; identifier?: string; title?: string } }) {
        try {
          this.page.url = window.location.origin + window.location.pathname;
          this.page.identifier = 'silvercircle-senior-community-forum';
          this.page.title = 'SilverCircle Senior Community Forum';
        } catch {
          // Ignore
        }
      };

      const existingScript = document.getElementById('disqus-embed-script');

      if (window.DISQUS && existingScript) {
        try {
          window.DISQUS.reset({
            reload: true,
            config: window.disqus_config,
          });
          if (isMounted) setDisqusStatus('loaded');
        } catch {
          if (isMounted) setDisqusStatus('error');
        }
      } else if (!existingScript) {
        const s = document.createElement('script');
        s.id = 'disqus-embed-script';
        s.src = 'https://chloyee.disqus.com/embed.js';
        s.setAttribute('data-timestamp', (+new Date()).toString());
        s.async = true;
        
        s.onload = () => {
          if (isMounted) setDisqusStatus('loaded');
        };

        s.onerror = () => {
          if (isMounted) setDisqusStatus('error');
        };

        (document.head || document.body).appendChild(s);
      } else {
        if (isMounted) setDisqusStatus('loaded');
      }

      // Safety timeout if Disqus takes too long or is blocked
      const timeout = setTimeout(() => {
        const disqusThread = document.getElementById('disqus_thread');
        if (disqusThread && disqusThread.children.length === 0) {
          // It might be blocked by adblockers or browser security
          if (isMounted) setDisqusStatus((prev) => (prev === 'loading' ? 'error' : prev));
        }
      }, 4000);

      return () => {
        isMounted = false;
        clearTimeout(timeout);
      };
    } catch {
      if (isMounted) setDisqusStatus('error');
    }
  }, [activeTab]);

  const handleLikePost = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const hasLiked = !p.hasLiked;
          return {
            ...p,
            hasLiked,
            likes: hasLiked ? p.likes + 1 : Math.max(0, p.likes - 1),
          };
        }
        return p;
      })
    );
  };

  const handleLikeReply = (postId: string, replyId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            replies: p.replies.map((r) => {
              if (r.id === replyId) {
                const hasLiked = !r.hasLiked;
                return {
                  ...r,
                  hasLiked,
                  likes: hasLiked ? r.likes + 1 : Math.max(0, r.likes - 1),
                };
              }
              return r;
            }),
          };
        }
        return p;
      })
    );
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const authorName = newAuthor.trim() || 'Senior Kaki';
    const newPost: ForumComment = {
      id: `post-${Date.now()}`,
      author: authorName,
      authorRole: 'Community Member',
      avatarBg: 'bg-[#004349]',
      district: newDistrict,
      category: newCategory,
      title: newTitle.trim(),
      content: newContent.trim(),
      timestamp: 'Just now',
      likes: 1,
      hasLiked: true,
      replies: [],
    };

    setPosts([newPost, ...posts]);
    setNewTitle('');
    setNewContent('');
    setIsPostingNew(false);
  };

  const handleCreateReply = (postId: string) => {
    if (!replyContent.trim()) return;

    const authorName = replyAuthor.trim() || 'Friendly Senior';
    const newRep = {
      id: `rep-${Date.now()}`,
      author: authorName,
      avatarBg: 'bg-[#124157]',
      district: replyDistrict,
      content: replyContent.trim(),
      timestamp: 'Just now',
      likes: 1,
      hasLiked: true,
    };

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            replies: [...p.replies, newRep],
          };
        }
        return p;
      })
    );

    setReplyContent('');
    setReplyOpenPostId(null);
  };

  const filteredPosts = posts.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.district && p.district.toLowerCase().includes(searchQuery.toLowerCase())) ||
      p.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-16 px-5 bg-white w-full border-t border-[#e3e2e0]" id="community-forum">
      <div className="max-w-[1040px] mx-auto flex flex-col gap-8">
        {/* Forum Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-[#e3e2e0]">
          <div className="flex flex-col gap-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#abeef6]/40 text-[#004349] font-bold text-xs w-fit">
              <span className="material-symbols-outlined text-[18px]">forum</span>
              <span>Community Discussions & Kakis</span>
            </div>
            <h2 className="font-headline font-bold text-3xl sm:text-4xl text-[#1a1c1b]">
              Senior Community Forum & Comments
            </h2>
            <p className="text-lg text-[#3f484a]">
              Connect with fellow seniors in your district, ask questions, and share step-free hangout tips.
            </p>
          </div>

          {/* New Discussion CTA */}
          <button
            type="button"
            onClick={() => setIsPostingNew(true)}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#a73927] hover:bg-[#86291b] text-white rounded-xl font-bold text-base shadow-md cursor-pointer transition-transform active:scale-95 shrink-0"
          >
            <span className="material-symbols-outlined text-[20px]">add_circle</span>
            <span>Start a Discussion</span>
          </button>
        </div>

        {/* Tab Switcher: Live Forum vs Disqus Thread */}
        <div className="flex items-center justify-between flex-wrap gap-4 bg-[#f4f3f1] p-1.5 rounded-2xl border border-[#e3e2e0]">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setActiveTab('interactive')}
              className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === 'interactive'
                  ? 'bg-white text-[#004349] shadow-sm border border-[#e3e2e0]'
                  : 'text-[#3f484a] hover:text-[#004349]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">chat</span>
              <span>Live Senior Board ({posts.length} Topics)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('disqus')}
              className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === 'disqus'
                  ? 'bg-white text-[#004349] shadow-sm border border-[#e3e2e0]'
                  : 'text-[#3f484a] hover:text-[#004349]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">forum</span>
              <span>Disqus Comments Thread</span>
            </button>
          </div>

          <div className="text-xs text-[#73787a] px-3 font-semibold hidden md:block">
            {activeTab === 'interactive' ? 'Instant local posting & replies' : 'Synced with chloyee.disqus.com'}
          </div>
        </div>

        {/* TAB 1: INTERACTIVE LIVE COMMUNITY FORUM */}
        {activeTab === 'interactive' && (
          <div className="flex flex-col gap-6">
            {/* Category Filter Pills & Search */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                {['All', 'Kopi & Makan', 'Walking & Exercise', 'Accessibility & Transport', 'General Q&A'].map(
                  (cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                        selectedCategory === cat
                          ? 'bg-[#004349] text-white shadow-sm'
                          : 'bg-[#faf9f7] hover:bg-[#efeeec] text-[#3f484a] border border-[#e3e2e0]'
                      }`}
                    >
                      {cat}
                    </button>
                  )
                )}
              </div>

              {/* Search Bar */}
              <div className="relative min-w-[240px]">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search topics, estates..."
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#e3e2e0] rounded-xl text-sm font-medium text-[#1a1c1b] focus:outline-none focus:ring-2 focus:ring-[#004349]"
                />
                <span className="material-symbols-outlined absolute left-3 top-3 text-[#73787a] text-[18px]">
                  search
                </span>
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-2.5 text-[#73787a] hover:text-black"
                  >
                    <span className="material-symbols-outlined text-[18px]">close</span>
                  </button>
                )}
              </div>
            </div>

            {/* Create Post Modal / Form Drawer */}
            {isPostingNew && (
              <div className="bg-[#faf9f7] rounded-3xl p-6 sm:p-8 border-2 border-[#004349] shadow-lg animate-fade-in flex flex-col gap-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#e3e2e0]">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#004349] text-[24px]">rate_review</span>
                    <h3 className="font-headline font-bold text-xl text-[#1a1c1b]">
                      Create New Discussion Topic
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsPostingNew(false)}
                    className="p-1 rounded-full text-[#73787a] hover:text-black cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[24px]">close</span>
                  </button>
                </div>

                <form onSubmit={handleCreatePost} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#3f484a] uppercase mb-1">
                        Your Name / Nickname
                      </label>
                      <input
                        type="text"
                        value={newAuthor}
                        onChange={(e) => setNewAuthor(e.target.value)}
                        placeholder="e.g. Uncle Raymond, Mdm Lily"
                        className="w-full px-4 py-2.5 bg-white border border-[#e3e2e0] rounded-xl text-sm font-medium text-[#1a1c1b] focus:outline-none focus:ring-2 focus:ring-[#004349]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#3f484a] uppercase mb-1">
                        Your Estate / Town
                      </label>
                      <select
                        value={newDistrict}
                        onChange={(e) => setNewDistrict(e.target.value)}
                        className="w-full px-4 py-2.5 bg-white border border-[#e3e2e0] rounded-xl text-sm font-medium text-[#1a1c1b] focus:outline-none focus:ring-2 focus:ring-[#004349]"
                      >
                        <option value="Toa Payoh">Toa Payoh (Central)</option>
                        <option value="Bishan">Bishan (Central)</option>
                        <option value="Queenstown">Queenstown (Central)</option>
                        <option value="Bedok">Bedok (East)</option>
                        <option value="Tampines">Tampines (East)</option>
                        <option value="Pasir Ris">Pasir Ris (East)</option>
                        <option value="Ang Mo Kio">Ang Mo Kio (North-East)</option>
                        <option value="Hougang">Hougang (North-East)</option>
                        <option value="Sengkang">Sengkang (North-East)</option>
                        <option value="Jurong East">Jurong East (West)</option>
                        <option value="Clementi">Clementi (West)</option>
                        <option value="Woodlands">Woodlands (North)</option>
                        <option value="Yishun">Yishun (North)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#3f484a] uppercase mb-1">
                        Topic Category
                      </label>
                      <select
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value as ForumComment['category'])}
                        className="w-full px-4 py-2.5 bg-white border border-[#e3e2e0] rounded-xl text-sm font-medium text-[#1a1c1b] focus:outline-none focus:ring-2 focus:ring-[#004349]"
                      >
                        <option value="Kopi & Makan">☕ Kopi & Makan</option>
                        <option value="Walking & Exercise">🚶 Walking & Exercise</option>
                        <option value="Accessibility & Transport">♿ Accessibility & Transport</option>
                        <option value="General Q&A">💬 General Q&A</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#3f484a] uppercase mb-1">
                      Topic Headline *
                    </label>
                    <input
                      type="text"
                      required
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="e.g. Anyone interested in Wednesday morning coffee at Tampines Hub?"
                      className="w-full px-4 py-3 bg-white border border-[#e3e2e0] rounded-xl text-base font-bold text-[#1a1c1b] focus:outline-none focus:ring-2 focus:ring-[#004349]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#3f484a] uppercase mb-1">
                      Message / Question details *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={newContent}
                      onChange={(e) => setNewContent(e.target.value)}
                      placeholder="Share meetup details, questions about ramps/elevators, or recommendations..."
                      className="w-full px-4 py-3 bg-white border border-[#e3e2e0] rounded-xl text-base font-normal text-[#1a1c1b] focus:outline-none focus:ring-2 focus:ring-[#004349] leading-relaxed"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsPostingNew(false)}
                      className="px-5 py-2.5 text-sm font-bold text-[#3f484a] hover:text-black cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-[#004349] hover:bg-[#0d5c63] text-white font-bold text-sm rounded-xl shadow-md cursor-pointer"
                    >
                      Post Discussion
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* List of Discussion Threads */}
            <div className="flex flex-col gap-5">
              {filteredPosts.length === 0 ? (
                <div className="bg-[#faf9f7] rounded-3xl p-12 text-center border border-[#e3e2e0] flex flex-col items-center gap-3">
                  <span className="material-symbols-outlined text-[#73787a] text-[48px]">search_off</span>
                  <h3 className="font-headline font-bold text-xl text-[#1a1c1b]">
                    No discussions found matching your filter
                  </h3>
                  <p className="text-base text-[#3f484a] max-w-md">
                    Be the first to start a conversation for this topic!
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory('All');
                      setSearchQuery('');
                      setIsPostingNew(true);
                    }}
                    className="mt-2 px-6 py-2.5 bg-[#004349] text-white font-bold text-sm rounded-xl shadow-sm cursor-pointer"
                  >
                    Start a New Topic
                  </button>
                </div>
              ) : (
                filteredPosts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-[#faf9f7] hover:bg-white rounded-3xl p-6 sm:p-7 border border-[#e3e2e0] shadow-sm transition-all duration-200 flex flex-col gap-4"
                  >
                    {/* Header of post */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-11 h-11 rounded-full ${post.avatarBg || 'bg-[#004349]'} text-white flex items-center justify-center font-bold text-base shrink-0 shadow-sm`}
                        >
                          {post.author.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center flex-wrap gap-2">
                            <span className="font-headline font-bold text-base text-[#1a1c1b]">
                              {post.author}
                            </span>
                            {post.authorRole && (
                              <span className="px-2 py-0.5 bg-[#abeef6]/60 text-[#002023] font-bold text-[11px] rounded-full">
                                {post.authorRole}
                              </span>
                            )}
                            {post.district && (
                              <span className="text-xs font-semibold text-[#73787a] flex items-center gap-0.5">
                                <span className="material-symbols-outlined text-[14px]">location_on</span>
                                {post.district}
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-[#73787a] mt-0.5">
                            {post.timestamp}
                          </div>
                        </div>
                      </div>

                      {/* Category Badge */}
                      <span className="px-3 py-1 bg-white border border-[#e3e2e0] rounded-full text-xs font-bold text-[#004349] shrink-0">
                        {post.category}
                      </span>
                    </div>

                    {/* Post Content */}
                    <div>
                      <h3 className="font-headline font-bold text-xl text-[#1a1c1b] mb-2 leading-snug">
                        {post.title}
                      </h3>
                      <p className="text-base text-[#3f484a] leading-relaxed whitespace-pre-line">
                        {post.content}
                      </p>
                    </div>

                    {/* Post Actions: Like and Reply */}
                    <div className="flex items-center justify-between pt-2 border-t border-[#e3e2e0]/60 text-sm">
                      <div className="flex items-center gap-4">
                        <button
                          type="button"
                          onClick={() => handleLikePost(post.id)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold text-sm transition-colors cursor-pointer ${
                            post.hasLiked
                              ? 'bg-[#ffdad4] text-[#a73927]'
                              : 'bg-white hover:bg-[#efeeec] text-[#3f484a] border border-[#e3e2e0]'
                          }`}
                        >
                          <span
                            className="material-symbols-outlined text-[18px]"
                            style={{ fontVariationSettings: post.hasLiked ? "'FILL' 1" : "'FILL' 0" }}
                          >
                            favorite
                          </span>
                          <span>{post.likes} {post.likes === 1 ? 'Cheer' : 'Cheers'}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setReplyOpenPostId(replyOpenPostId === post.id ? null : post.id)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-[#efeeec] text-[#004349] border border-[#e3e2e0] rounded-lg font-bold text-sm transition-colors cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[18px]">reply</span>
                          <span>Reply ({post.replies.length})</span>
                        </button>
                      </div>

                      <span className="text-xs text-[#73787a] font-medium hidden sm:inline-block">
                        {post.replies.length} {post.replies.length === 1 ? 'reply' : 'replies'}
                      </span>
                    </div>

                    {/* Replies Container */}
                    {post.replies.length > 0 && (
                      <div className="mt-2 pl-4 sm:pl-8 border-l-2 border-[#004349]/20 flex flex-col gap-3">
                        {post.replies.map((reply) => (
                          <div
                            key={reply.id}
                            className="bg-white p-4 rounded-2xl border border-[#e3e2e0] flex flex-col gap-2"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div
                                  className={`w-7 h-7 rounded-full ${reply.avatarBg || 'bg-[#124157]'} text-white flex items-center justify-center font-bold text-xs shrink-0`}
                                >
                                  {reply.author.charAt(0)}
                                </div>
                                <span className="font-headline font-bold text-sm text-[#1a1c1b]">
                                  {reply.author}
                                </span>
                                {reply.district && (
                                  <span className="text-[11px] font-semibold text-[#73787a]">
                                    ({reply.district})
                                  </span>
                                )}
                              </div>
                              <span className="text-[11px] text-[#73787a]">{reply.timestamp}</span>
                            </div>

                            <p className="text-sm text-[#3f484a] leading-relaxed">
                              {reply.content}
                            </p>

                            <div className="flex items-center justify-end">
                              <button
                                type="button"
                                onClick={() => handleLikeReply(post.id, reply.id)}
                                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-semibold cursor-pointer ${
                                  reply.hasLiked ? 'text-[#a73927]' : 'text-[#73787a] hover:text-[#004349]'
                                }`}
                              >
                                <span
                                  className="material-symbols-outlined text-[14px]"
                                  style={{ fontVariationSettings: reply.hasLiked ? "'FILL' 1" : "'FILL' 0" }}
                                >
                                  thumb_up
                                </span>
                                <span>{reply.likes}</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Inline Reply Form */}
                    {replyOpenPostId === post.id && (
                      <div className="mt-3 pl-4 sm:pl-8 border-l-2 border-[#a73927] flex flex-col gap-3 bg-white p-4 rounded-2xl border border-[#e3e2e0] animate-fade-in">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-[#004349] uppercase">
                            Write a Reply to {post.author}
                          </span>
                          <button
                            type="button"
                            onClick={() => setReplyOpenPostId(null)}
                            className="text-xs font-bold text-[#73787a] hover:text-black cursor-pointer"
                          >
                            Close
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <input
                            type="text"
                            value={replyAuthor}
                            onChange={(e) => setReplyAuthor(e.target.value)}
                            placeholder="Your Name (e.g. Uncle David)"
                            className="px-3 py-2 bg-[#faf9f7] border border-[#e3e2e0] rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#004349]"
                          />
                          <input
                            type="text"
                            value={replyDistrict}
                            onChange={(e) => setReplyDistrict(e.target.value)}
                            placeholder="Your Estate (e.g. Toa Payoh, Bedok)"
                            className="px-3 py-2 bg-[#faf9f7] border border-[#e3e2e0] rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#004349]"
                          />
                        </div>

                        <textarea
                          rows={2}
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                          placeholder="Type your response or advice here..."
                          className="w-full px-3 py-2 bg-[#faf9f7] border border-[#e3e2e0] rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#004349]"
                        />

                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setReplyOpenPostId(null)}
                            className="px-3 py-1.5 text-xs font-bold text-[#73787a] cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={() => handleCreateReply(post.id)}
                            className="px-4 py-1.5 bg-[#004349] text-white text-xs font-bold rounded-lg shadow-sm cursor-pointer hover:bg-[#0d5c63]"
                          >
                            Send Reply
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 2: DISQUS EMBEDDED THREAD */}
        {activeTab === 'disqus' && (
          <div className="flex flex-col gap-4">
            {/* Status notice */}
            {disqusStatus === 'loading' && (
              <div className="bg-[#f4f3f1] p-4 rounded-2xl border border-[#e3e2e0] flex items-center justify-between text-sm text-[#3f484a]">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-[#004349] border-t-transparent rounded-full animate-spin" />
                  <span>Connecting to Disqus live servers (chloyee.disqus.com)...</span>
                </div>
                <span className="text-xs text-[#73787a]">If loading takes long, switch to the Live Senior Board above</span>
              </div>
            )}

            {disqusStatus === 'error' && (
              <div className="bg-[#ffdad4]/40 p-4 rounded-2xl border border-[#ffb4a6] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm text-[#3f0300]">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#a73927] text-[22px]">info</span>
                  <span>
                    Disqus embed was restricted by your browser's third-party tracking/adblocker settings.
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('interactive')}
                    className="px-3.5 py-1.5 bg-[#004349] text-white text-xs font-bold rounded-lg shadow-sm cursor-pointer"
                  >
                    Switch to Live Forum
                  </button>
                  <a
                    href="https://chloyee.disqus.com"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-1.5 bg-white text-[#a73927] border border-[#ffb4a6] text-xs font-bold rounded-lg cursor-pointer"
                  >
                    Open in New Tab
                  </a>
                </div>
              </div>
            )}

            {/* Disqus Thread Container */}
            <div className="bg-[#faf9f7] rounded-3xl p-6 sm:p-8 border border-[#e3e2e0] shadow-sm min-h-[380px]">
              <div id="disqus_thread" className="w-full"></div>
              <noscript>
                Please enable JavaScript to view the{' '}
                <a href="https://disqus.com/?ref_noscript" className="text-[#a73927] underline">
                  comments powered by Disqus.
                </a>
              </noscript>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
