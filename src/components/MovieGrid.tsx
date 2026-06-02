/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Star, MessageSquare, Bookmark, Layers } from "lucide-react";
import { Movie } from "../types";

interface MovieGridProps {
  movies: Movie[];
  homeStyle?: string; // Kept as optional for compatibility but unused
  onSelectMovie: (movie: Movie) => void;
  onUpdateRating: (movieId: string, rating: number) => void;
  onToggleWatchlist: (movieId: string) => void;
}

export default function MovieGrid({
  movies,
  onSelectMovie,
  onUpdateRating,
  onToggleWatchlist,
}: MovieGridProps) {
  if (movies.length === 0) {
    return (
      <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/5 my-8">
        <Layers className="w-10 h-10 text-gray-600 mx-auto mb-3" />
        <p className="text-gray-400 text-xs font-sans">해당 검색 결과를 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div 
      id="unified-movie-grid"
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-20 font-sans"
    >
      {movies.map((movie) => (
        <div 
          key={movie.id} 
          className="flex flex-col group relative bg-[#111111]/30 border border-white/5 rounded-2xl p-3 hover:border-[#C5A059]/30 transition-all duration-300 hover:shadow-xl hover:shadow-black/40"
        >
          {/* Poster Section */}
          <div className="relative aspect-[2/3] rounded-xl overflow-hidden cursor-pointer bg-black/40">
            <img
              src={movie.image}
              alt={movie.titleKo}
              onClick={() => onSelectMovie(movie)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            />
            
            {/* TMDB Rating Badge */}
            <div className="absolute top-2.5 right-2.5 bg-black/75 backdrop-blur-md text-[#C5A059] text-[10px] font-bold px-2 py-0.5 rounded-md shadow-md z-10 flex items-center gap-0.5 select-none border border-[#C5A059]/20">
              ★ {movie.tmdbRating}
            </div>

            {/* Watchlist Bookmark toggle */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleWatchlist(movie.id);
              }}
              className="absolute top-2.5 left-2.5 p-1.5 rounded-md backdrop-blur-md bg-black/60 border border-white/10 hover:bg-[#C5A059] hover:text-black transition-all z-10 text-white"
              title={movie.isWatchlist ? "보관함 해제" : "보관함 추가"}
            >
              <Bookmark className={`w-3.5 h-3.5 ${movie.isWatchlist ? "fill-current text-black" : "text-gray-300"}`} />
            </button>

            {/* Hover overlay description */}
            <div 
              onClick={() => onSelectMovie(movie)}
              className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4"
            >
              <span className="text-[9px] font-bold text-[#C5A059] tracking-widest uppercase">
                {movie.genres.join(" • ")}
              </span>
              <p className="text-gray-300 text-[10px] line-clamp-2 mt-1 leading-relaxed">
                {movie.description}
              </p>
            </div>
          </div>

          {/* Details below poster */}
          <div className="mt-3 flex flex-col flex-1 justify-between gap-2.5">
            <div>
              <div className="flex justify-between items-start gap-1">
                <h3 
                  onClick={() => onSelectMovie(movie)}
                  className="font-serif text-sm italic text-gray-100 hover:text-[#C5A059] transition-colors cursor-pointer line-clamp-1"
                >
                  {movie.titleKo}
                </h3>
                <span className="text-[10px] text-gray-500 font-mono mt-0.5">
                  {movie.year}
                </span>
              </div>
              <p className="text-[10px] text-gray-400 font-mono line-clamp-1 mt-0.5">
                {movie.titleEn}
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-white/5 pt-2.5">
              {/* Star Rating Interactive Widgets */}
              <div className="flex items-center gap-0.5 text-gray-500">
                {[1, 2, 3, 4, 5].map((star) => {
                  const ratingVal = movie.rating || 0;
                  return (
                    <button
                      key={star}
                      onClick={() => onUpdateRating(movie.id, star)}
                      className="p-0.5 hover:scale-125 transition-transform"
                      title={`${star}점 주기`}
                    >
                      <Star
                        className={`w-3.5 h-3.5 ${
                          star <= ratingVal
                            ? "fill-[#C5A059] text-[#C5A059]"
                            : "text-gray-600 hover:text-[#C5A059]"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Comments/Review counts indicators */}
              <button 
                onClick={() => onSelectMovie(movie)}
                className="flex items-center gap-1 text-[10px] text-gray-400 hover:text-[#C5A059] transition-colors"
              >
                <MessageSquare className="w-3 h-3 text-[#C5A059]/80" />
                <span>{movie.comments.length}</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
