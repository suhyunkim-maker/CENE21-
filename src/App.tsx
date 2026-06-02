/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from "react";
import { 
  Home as HomeIcon, 
  Search, 
  User as UserIcon, 
  Bookmark, 
  Star, 
  Layers, 
  Settings as SettingsIcon,
  Flame,
  Award,
  BookOpen,
  Eye,
  Sliders
} from "lucide-react";

import { Movie, UserSettings, Comment } from "./types";
import { INITIAL_MOVIES, DEFAULT_SETTINGS } from "./data";
import { AnimatePresence } from "motion/react";
import Header from "./components/Header";
import RatingDistribution from "./components/RatingDistribution";
import TasteChartModal from "./components/TasteChartModal";
import MovieDetailsDialog from "./components/MovieDetailsDialog";
import MovieGrid from "./components/MovieGrid";
import PreferencesPanel from "./components/PreferencesPanel";

export default function App() {
  // State variables for persistence
  const [movies, setMovies] = useState<Movie[]>(() => {
    const saved = localStorage.getItem("cine21_movies");
    return saved ? JSON.parse(saved) : INITIAL_MOVIES;
  });

  const [settings, setSettings] = useState<UserSettings>(() => {
    const saved = localStorage.getItem("cine21_settings");
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });

  const [currentTab, setCurrentTab] = useState<string>("home"); // "home" | "settings" | "profile" | "watchlist" | "rankings"
  const [movieFilter, setMovieFilter] = useState<"nowPlaying" | "trending" | "topRated">("nowPlaying");
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  // Dialog/Modal overlays
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [showTasteChart, setShowTasteChart] = useState<boolean>(false);

  // Sync state with localStorage
  useEffect(() => {
    localStorage.setItem("cine21_movies", JSON.stringify(movies));
  }, [movies]);

  useEffect(() => {
    localStorage.setItem("cine21_settings", JSON.stringify(settings));
  }, [settings]);

  // Update movie rating
  const handleUpdateRating = (movieId: string, rating: number) => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === movieId ? { ...movie, rating } : movie
      )
    );
    // Sync current dialog selection
    if (selectedMovie && selectedMovie.id === movieId) {
      setSelectedMovie((prev) => (prev ? { ...prev, rating } : null));
    }
  };

  // Add Comment review dynamically
  const handleAddComment = (movieId: string, commentContent: string, rating: number) => {
    const newComment: Comment = {
      id: `comment_${Date.now()}`,
      user: settings.username || "CINE_ENTHUSIAST_92",
      content: commentContent,
      createdAt: new Date().toISOString(),
      rating: rating || 4,
    };

    setMovies((prevMovies) =>
      prevMovies.map((movie) => {
        if (movie.id === movieId) {
          return {
            ...movie,
            comments: [newComment, ...movie.comments],
            rating: rating || movie.rating,
          };
        }
        return movie;
      })
    );

    // Sync selected movie dialog state
    if (selectedMovie && selectedMovie.id === movieId) {
      setSelectedMovie((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          comments: [newComment, ...prev.comments],
          rating: rating || prev.rating,
        };
      });
    }
  };

  // Toggle watchlist state
  const handleToggleWatchlist = (movieId: string) => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === movieId ? { ...movie, isWatchlist: !movie.isWatchlist } : movie
      )
    );
    // Sync current dialog selection
    if (selectedMovie && selectedMovie.id === movieId) {
      setSelectedMovie((prev) => (prev ? { ...prev, isWatchlist: !prev.isWatchlist } : null));
    }
  };

  // Filter movies for home grid based on search and filters
  const filteredHomeMovies = useMemo(() => {
    return movies.filter((movie) => {
      // 1. Search Query filter (matches titleKo, titleEn, genres)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitleKo = movie.titleKo.toLowerCase().includes(query);
        const matchesTitleEn = movie.titleEn.toLowerCase().includes(query);
        const matchesGenre = movie.genres.some((g) => g.toLowerCase().includes(query));
        if (!matchesTitleKo && !matchesTitleEn && matchesGenre === false) return false;
      }

      // 2. Tab Category filters
      if (movieFilter === "nowPlaying" && !movie.isNowPlaying) return false;
      if (movieFilter === "trending" && !movie.isTrending) return false;
      if (movieFilter === "topRated" && !movie.isTopRated) return false;

      return true;
    });
  }, [movies, movieFilter, searchQuery]);

  // Latest Movies Top 10 sorted by year desc, then tmdbRating desc
  const latestTop10Movies = useMemo(() => {
    return [...movies]
      .sort((a, b) => {
        if (b.year !== a.year) {
          return b.year - a.year; // Latest year first
        }
        return b.tmdbRating - a.tmdbRating; // Then higher rating
      })
      .slice(0, 10);
  }, [movies]);

  // Handle setting updates
  const handleSaveSettings = (updatedSettings: UserSettings) => {
    setSettings(updatedSettings);
  };

  // List of Watchlisted movies
  const watchlistMovies = useMemo(() => {
    return movies.filter((m) => m.isWatchlist);
  }, [movies]);

  // Rankings selection (Editor Pick is id 13 / Cinema Paradiso)
  const editorPickMovie = useMemo(() => {
    return movies.find((m) => m.id === "13") || movies[movies.length - 1];
  }, [movies]);

  return (
    <div 
      className="min-h-screen pb-24 md:pb-12 text-[#E5E5E5] flex flex-col justify-between font-sans selection:bg-[#C5A059] selection:text-black"
      style={{ backgroundColor: "#0A0A0A" }}
    >
      {/* Top Header navbar */}
      <Header
        currentTab={currentTab}
        onNavigate={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        onSearch={(query) => setSearchQuery(query)}
        onOpenMyTasteChart={() => setShowTasteChart(true)}
      />

      {/* Primary Main Content layout */}
      <main className="max-w-[1440px] w-full mx-auto px-4 md:px-16 pt-24 min-h-screen">
        
        {currentTab === "home" && (
          <div className="space-y-10" id="home-tab-layer">
            
            {/* 최신 영화 TOP 10 Section at the very top */}
            <section className="bg-gradient-to-r from-white/[0.02] via-[#111111]/30 to-transparent p-5 rounded-2xl border border-white/5 shadow-2xl relative overflow-hidden backdrop-blur-sm" id="latest-top-10-section">
              <div className="flex items-center gap-2 mb-4 font-sans justify-between">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-[#C5A059]" />
                  <h2 className="font-serif italic text-sm md:text-base text-white tracking-wider">
                    최신 영화 TOP 10 <span className="text-xs text-gray-500 font-sans font-normal not-italic ml-1">| LATEST RELEASES</span>
                  </h2>
                </div>
                <span className="text-[9px] text-[#C5A059] uppercase tracking-wider font-bold">Cine21 Live Rating</span>
              </div>
              
              <div className="flex gap-4 overflow-x-auto pb-2 scroll-smooth" style={{ scrollbarWidth: "none" }} id="latest-top-10-carousel">
                {latestTop10Movies.map((movie, index) => (
                  <div 
                    key={movie.id}
                    id={`top-movie-item-${movie.id}`}
                    onClick={() => setSelectedMovie(movie)}
                    className="flex-shrink-0 relative flex items-center group cursor-pointer mb-1 bg-black/10 border border-white/[0.02] p-2 rounded-xl hover:bg-white/5 hover:border-[#C5A059]/30 transition-all duration-300 w-[205px] md:w-[225px]"
                  >
                    {/* Big ranking number background */}
                    <span className="font-serif italic font-black text-7xl md:text-8xl text-white/5 absolute left-1 select-none leading-none tracking-tighter group-hover:text-[#C5A059]/15 transition-colors pointer-events-none">
                      {index + 1}
                    </span>

                    {/* Poster container */}
                    <div className="ml-10 z-10 w-[70px] md:w-[80px] aspect-[2/3] rounded-lg overflow-hidden border border-white/10 shadow-md shadow-black/40 group-hover:border-[#C5A059]/30 transition-all transform group-hover:scale-105 duration-300">
                      <img src={movie.image} alt={movie.titleKo} className="w-full h-full object-cover" />
                    </div>

                    {/* Info Text next to poster */}
                    <div className="ml-3.5 z-10 flex-1 flex flex-col justify-center min-w-0 pr-1 select-none font-sans">
                      <span className="text-[9px] text-[#C5A059] font-mono tracking-wider font-bold">
                        RANK 0{index + 1}
                      </span>
                      <h4 className="text-xs font-serif italic font-bold text-white group-hover:text-[#C5A059] transition-colors truncate mt-0.5">
                        {movie.titleKo}
                      </h4>
                      <p className="text-[10px] text-gray-400 truncate mt-0.5 leading-tight">
                        {movie.titleEn}
                      </p>
                      <p className="text-[9px] text-gray-500 font-mono mt-1 flex items-center gap-1.5">
                        <span>{movie.year}</span>
                        <span>•</span>
                        <span className="text-[#C5A059] font-bold">★ {movie.tmdbRating}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Logo / Brand Landing Segment */}
            <div className="mb-4 flex flex-col md:flex-row md:items-end justify-between gap-6" id="brand-landing-segment">
              <div>
                <h1 className="font-serif text-3xl md:text-4xl italic text-white mb-2 leading-tight tracking-[0.03em]">
                  취향의 깊이를 <span className="text-[#C5A059] not-italic font-bold">기록하다</span>
                </h1>
                <p className="text-gray-400 max-w-lg text-xs md:text-sm leading-relaxed font-sans">
                  당신이 사랑한 영화, 당신이 평가한 순간들. 서울 씨네21에서 당신만의 영화적 연대기를 완성하세요.
                </p>
              </div>
              <button
                onClick={() => setShowTasteChart(true)}
                id="landing-my-taste-trigger"
                className="md:hidden w-full py-3 bg-[#C5A059] text-black font-sans text-[10px] font-bold uppercase tracking-widest rounded-lg active:scale-95 transition-all shadow-md shadow-[#C5A059]/10"
              >
                VIEW MY TASTE
              </button>
            </div>

            {/* Rating Stats Distribution Bar */}
            <RatingDistribution
              movies={movies}
              onOpenTasteChart={() => setShowTasteChart(true)}
            />

            {/* Filter Tabs matching screenshots */}
            <nav className="flex items-center gap-2 mb-4 overflow-x-auto pb-2 border-b border-white/5 no-scrollbar scroll-smooth" id="home-category-tabs">
              <button
                id="tab-now-playing"
                onClick={() => setMovieFilter("nowPlaying")}
                className={`px-5 py-3 font-sans text-xs font-semibold whitespace-nowrap border-b-2 transition-all cursor-pointer ${
                  movieFilter === "nowPlaying"
                    ? "border-[#C5A059] text-[#C5A059]"
                    : "border-transparent text-gray-400 hover:text-white"
                }`}
              >
                현재 상영작 (Now Playing)
              </button>
              <button
                id="tab-trending"
                onClick={() => setMovieFilter("trending")}
                className={`px-5 py-3 font-sans text-xs font-semibold whitespace-nowrap border-b-2 transition-all cursor-pointer ${
                  movieFilter === "trending"
                    ? "border-[#C5A059] text-[#C5A059]"
                    : "border-transparent text-gray-400 hover:text-white"
                }`}
              >
                주간 트렌딩 (Weekly Trending)
              </button>
              <button
                id="tab-top-rated"
                onClick={() => setMovieFilter("topRated")}
                className={`px-5 py-3 font-sans text-xs font-semibold whitespace-nowrap border-b-2 transition-all cursor-pointer ${
                  movieFilter === "topRated"
                    ? "border-[#C5A059] text-[#C5A059]"
                    : "border-transparent text-gray-400 hover:text-white"
                }`}
              >
                역대 최고 평점 (All-time Top Rated)
              </button>
            </nav>

            {/* Main Movie Gallery Grid with Unified Layout */}
            <div className="mb-12" id="main-catalog-grid-box">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">
                  전체 영화 목록 (ALL FILMS) • {filteredHomeMovies.length}개 작품
                </span>
              </div>
              <MovieGrid
                movies={filteredHomeMovies}
                onSelectMovie={(movie) => setSelectedMovie(movie)}
                onUpdateRating={handleUpdateRating}
                onToggleWatchlist={handleToggleWatchlist}
              />
            </div>

            {/* Asymmetric / Editorial Top Rankings Section from screenshot 3 */}
            <section className="mt-20 border-t border-white/5 pt-12 pb-16">
              <div className="flex items-center gap-3 mb-10 text-sans">
                <div className="w-1 h-6 bg-[#C5A059]" />
                <h2 className="font-serif text-xl md:text-2xl italic tracking-[0.12em] uppercase text-[#C5A059]">
                  Weekly Top Ranking
                </h2>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-10 relative">
                <div className="absolute left-0 -top-12 z-0 font-serif text-[150px] md:text-[230px] italic text-[#C5A059]/4 leading-none pointer-events-none select-none">
                  01
                </div>

                <div 
                  className="w-full md:w-60 flex-shrink-0 z-10 mx-auto cursor-pointer"
                  onClick={() => setSelectedMovie(editorPickMovie)}
                >
                  <div className="relative aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl scale-100 hover:scale-[1.02] transition-transform duration-300 border border-white/10">
                    <img
                      src={editorPickMovie.image}
                      alt={editorPickMovie.titleKo}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-3 right-3 bg-[#C5A059] text-black text-xs font-bold px-2 py-0.5 rounded select-none">
                      ★ {editorPickMovie.tmdbRating}
                    </div>
                  </div>
                </div>

                <div className="flex-1 space-y-4 text-center md:text-left z-10">
                  <span className="bg-[#C5A059] text-black px-4 py-1 rounded-full font-sans text-[9px] font-bold uppercase tracking-widest inline-block select-none">
                    CINE21 EDITOR'S PICK
                  </span>
                  <h3 className="font-serif text-3xl md:text-4xl italic leading-tight text-white tracking-wide">
                    {editorPickMovie.titleKo}
                  </h3>
                  <p className="text-gray-400 font-sans text-xs">
                    {editorPickMovie.titleEn} ({editorPickMovie.year})
                  </p>
                  <p className="text-gray-300 text-sm leading-relaxed max-w-xl mx-auto md:mx-0 font-sans">
                    {editorPickMovie.description}
                  </p>
                  <div className="flex items-center justify-center md:justify-start gap-3 pt-2">
                    <button
                      onClick={() => setSelectedMovie(editorPickMovie)}
                      className="bg-[#C5A059] text-black px-6 py-2.5 rounded-lg text-xs font-bold hover:brightness-110 transition-all active:scale-95 cursor-pointer font-sans shadow-md shadow-[#C5A059]/10"
                    >
                      상세 보기
                    </button>
                    <button
                      onClick={() => handleToggleWatchlist(editorPickMovie.id)}
                      className="border border-[#C5A059]/40 text-gray-200 hover:bg-white/5 px-6 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer font-sans hover:border-[#C5A059]"
                    >
                      {editorPickMovie.isWatchlist ? "보관 취소" : "보관함 저장"}
                    </button>
                  </div>
                </div>
              </div>
            </section>

          </div>
        )}

        {/* PROFILE TAB (설정) */}
        {currentTab === "profile" && (
          <div className="space-y-6 max-w-xl mx-auto py-4">
            <div className="flex items-center gap-3 mb-6">
              <Sliders className="w-5 h-5 text-[#C5A059]" />
              <h1 className="font-serif text-xl md:text-2xl text-white italic tracking-wider">
                일반 설정 (Settings)
              </h1>
            </div>
            <PreferencesPanel
              settings={settings}
              onSaveSettings={handleSaveSettings}
              subView="profile"
            />
          </div>
        )}

        {/* CUSTOM TASTE PREFERENCES CONFIG TAB (맞춤 설정) */}
        {currentTab === "settings" && (
          <div className="space-y-6 py-4">
            <div className="flex items-center gap-3 mb-6">
              <Award className="w-5 h-5 text-[#C5A059]" />
              <h1 className="font-serif text-xl md:text-2xl text-white italic tracking-wider">
                영화 맞춤 설정 (Taste Preferences)
              </h1>
            </div>
            <PreferencesPanel
              settings={settings}
              onSaveSettings={handleSaveSettings}
              subView="settings"
            />
          </div>
        )}

        {/* WATCHLIST TAB */}
        {currentTab === "watchlist" && (
          <div className="space-y-6 py-4">
            <div className="flex items-center gap-3 mb-4">
              <Bookmark className="w-5 h-5 text-[#C5A059]" />
              <h1 className="font-serif text-xl md:text-2xl text-white italic tracking-wider">
                나만의 보관함 (My Watchlist)
              </h1>
            </div>
            <p className="text-gray-400 text-xs md:text-sm font-sans">
              보관하기로 누른 영화 리스트들을 안전하게 보관 및 기록할 수 있습니다.
            </p>

            {watchlistMovies.length === 0 ? (
              <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/5 my-8">
                <Bookmark className="w-8 h-8 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400 text-sm font-sans">보관된 영화가 없습니다. 홈 화면에서 영화를 추가해보세요.</p>
              </div>
            ) : (
              <MovieGrid
                movies={watchlistMovies}
                homeStyle={settings.homeStyle}
                onSelectMovie={(movie) => setSelectedMovie(movie)}
                onUpdateRating={handleUpdateRating}
                onToggleWatchlist={handleToggleWatchlist}
              />
            )}
          </div>
        )}

      </main>

      {/* Footer Section */}
      <footer className="w-full border-t border-white/5 bg-[#050505] mt-16 font-sans">
        <div className="max-w-[1440px] mx-auto px-4 md:px-16 py-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="font-serif text-lg text-[#C5A059] tracking-wider italic font-semibold">
              SEOUL CINE21
            </span>
            <p className="text-gray-500 text-[10px]">
              © 2026 서울 씨네21. Powered by TMDB API.
            </p>
          </div>

          <div className="flex gap-6 text-[11px] text-gray-400">
            <a href="#" className="hover:text-[#C5A059] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#C5A059] transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-[#C5A059] transition-colors">API Docs</a>
          </div>
        </div>
      </footer>

      {/* Bottom Nav bar for mobile screens */}
      <nav 
        id="mobile-bottom-navbar"
        className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-[#0A0A0A]/95 backdrop-blur-lg border-t border-white/10 flex justify-around items-center h-16 py-2"
      >
        <button
          onClick={() => {
            setCurrentTab("home");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className={`flex flex-col items-center justify-center gap-0.5 text-[10px] uppercase font-semibold transition-all ${
            currentTab === "home" ? "text-[#C5A059] scale-105" : "text-gray-400 hover:text-white"
          }`}
        >
          <HomeIcon className="w-5 h-5 fill-current" />
          <span>Home</span>
        </button>

        <button
          onClick={() => {
            setCurrentTab("watchlist");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className={`flex flex-col items-center justify-center gap-0.5 text-[10px] uppercase font-semibold transition-all ${
            currentTab === "watchlist" ? "text-[#C5A059] scale-105" : "text-gray-400 hover:text-white"
          }`}
        >
          <Bookmark className="w-5 h-5 fill-current" />
          <span>Watchlist</span>
        </button>

        <button
          onClick={() => {
            setCurrentTab("settings");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className={`flex flex-col items-center justify-center gap-0.5 text-[10px] uppercase font-semibold transition-all ${
            currentTab === "settings" ? "text-[#C5A059] scale-105" : "text-gray-400 hover:text-white"
          }`}
        >
          <Award className="w-5 h-5" />
          <span>Taste</span>
        </button>

        <button
          onClick={() => {
            setCurrentTab("profile");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className={`flex flex-col items-center justify-center gap-0.5 text-[10px] uppercase font-semibold transition-all ${
            currentTab === "profile" ? "text-[#C5A059] scale-105" : "text-gray-400 hover:text-white"
          }`}
        >
          <UserIcon className="w-5 h-5" />
          <span>Profile</span>
        </button>
      </nav>

      {/* OVERLAY: Slide & Fade Dynamic Modals/Dialogs */}
      <AnimatePresence>
        {showTasteChart && (
          <TasteChartModal onClose={() => setShowTasteChart(false)} />
        )}

        {selectedMovie && (
          <MovieDetailsDialog
            movie={selectedMovie}
            onClose={() => setSelectedMovie(null)}
            onUpdateRating={handleUpdateRating}
            onAddComment={handleAddComment}
            onToggleWatchlist={handleToggleWatchlist}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
