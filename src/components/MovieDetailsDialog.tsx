/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { X, Star, Calendar, MessageSquare, Watch, Heart, Bookmark, Eye, CornerDownRight } from "lucide-react";
import { Movie, Comment } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface MovieDetailsDialogProps {
  movie: Movie;
  onClose: () => void;
  onUpdateRating: (movieId: string, rating: number) => void;
  onAddComment: (movieId: string, commentContent: string, rating: number) => void;
  onToggleWatchlist: (movieId: string) => void;
}

export default function MovieDetailsDialog({
  movie,
  onClose,
  onUpdateRating,
  onAddComment,
  onToggleWatchlist,
}: MovieDetailsDialogProps) {
  const [commentText, setCommentText] = useState("");
  const [userRating, setUserRating] = useState(movie.rating);
  const [hoverRating, setHoverRating] = useState(0);

  const handleRatingClick = (rate: number) => {
    setUserRating(rate);
    onUpdateRating(movie.id, rate);
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    onAddComment(movie.id, commentText, userRating || 4);
    setCommentText("");
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md px-4 overflow-y-auto pt-6 pb-6"
      id="detailOverlay"
      onClick={(e) => {
        if ((e.target as HTMLElement).id === "detailOverlay") onClose();
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 35, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20 }}
        className="relative w-full max-w-3xl bg-[#0E0E0E] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
      >
        {/* Close Button top-right */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 bg-black/60 p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-black/80 transition-colors"
          title="닫기"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Beautiful Movie Poster Card */}
        <div className="w-full md:w-2/5 relative bg-[#0a0a0a] flex items-center justify-center p-6 border-b md:border-b-0 md:border-r border-white/10">
          <div className="relative aspect-[2/3] w-48 md:w-full max-w-[260px] rounded-xl overflow-hidden shadow-2xl group">
            <img
              src={movie.image}
              alt={movie.titleKo}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 right-3 bg-[#C5A059] text-black font-bold font-mono px-2 py-0.5 rounded text-xs">
              ★ {movie.tmdbRating}
            </div>
          </div>
        </div>

        {/* Right: Meta details & commentary sections */}
        <div className="w-full md:w-3/5 p-6 md:p-8 overflow-y-auto custom-scrollbar flex flex-col justify-between">
          <div>
            {/* Title Block */}
            <div className="flex justify-between items-start mb-2">
              <div>
                <span className="text-[10px] font-sans text-[#C5A059] font-bold uppercase tracking-wider">
                  {movie.genres.join(" / ")}
                </span>
                <h3 className="font-serif text-2xl md:text-3xl italic text-white tracking-wide mt-1">
                  {movie.titleKo}
                </h3>
                <p className="font-sans text-xs text-gray-400">
                  {movie.titleEn} ({movie.year})
                </p>
              </div>

              {/* Watchlist toggle */}
              <button
                onClick={() => onToggleWatchlist(movie.id)}
                className={`p-2 rounded-xl transition-colors border ${
                  movie.isWatchlist
                    ? "bg-[#C5A059]/15 border-[#C5A059] text-[#C5A059]"
                    : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
                }`}
                title={movie.isWatchlist ? "보관 취소" : "보관함에 저장"}
              >
                <Bookmark className="w-5 h-5 fill-current" />
              </button>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-300 leading-relaxed my-5 font-sans">
              {movie.description}
            </p>

            {/* Star Rating Section */}
            <div className="bg-[#141414] p-4 rounded-xl border border-white/5 mb-6">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-2 font-sans">
                나의 별점 반응 (Rate This Movie)
              </span>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((index) => {
                    const isFilled = index <= (hoverRating || userRating);
                    return (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleRatingClick(index)}
                        onMouseEnter={() => setHoverRating(index)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-0.5 active:scale-125 transition-transform"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            isFilled
                              ? "fill-[#C5A059] text-[#C5A059]"
                              : "text-gray-500 hover:text-[#C5A059]"
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
                <span className="text-xs text-gray-300 font-medium ml-2 font-sans">
                  {userRating > 0 ? `${userRating}점 부여됨` : "별점을 선택해 주세요"}
                </span>
              </div>
            </div>

            {/* Comments List */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <MessageSquare className="w-4 h-4 text-[#C5A059]" />
                <span className="text-xs text-white font-bold uppercase tracking-wider font-sans">
                  평론 및 리뷰 ({movie.comments.length})
                </span>
              </div>

              {movie.comments.length === 0 ? (
                <p className="text-xs text-gray-500 italic py-2 pl-2 font-sans">
                  리뷰가 아직 없습니다. 첫 평론을 직접 달아보세요!
                </p>
              ) : (
                <div className="space-y-3 max-h-40 overflow-y-auto pr-1">
                  {movie.comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="bg-white/5 p-3 rounded-lg border border-white/5 text-xs flex flex-col gap-1 font-sans"
                    >
                      <div className="flex justify-between items-center text-[10px] text-gray-400">
                        <span className="font-semibold text-white">
                          @{comment.user}
                        </span>
                        <span className="flex items-center gap-0.5 text-[#C5A059]">
                          {comment.rating}★
                        </span>
                      </div>
                      <p className="text-gray-200 mt-1 leading-snug">
                        {comment.content}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* New comment input block */}
          <form onSubmit={handleSubmitComment} className="border-t border-white/10 pt-4 flex gap-2">
            <input
              type="text"
              placeholder="영화 비평로그 평점 코멘트 작성..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="flex-1 bg-[#141414] text-xs text-white px-3 py-2.5 rounded-lg border border-white/15 focus:outline-none focus:border-[#C5A059] font-sans"
            />
            <button
              type="submit"
              className="bg-[#C5A059] hover:bg-opacity-90 text-black font-sans font-bold text-xs px-4 py-2.5 rounded-lg active:scale-95 transition-all"
            >
              등록
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
