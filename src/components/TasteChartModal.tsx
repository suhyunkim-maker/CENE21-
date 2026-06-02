/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { X, Star, BarChart, TrendingUp, Award, Layers } from "lucide-react";
import { motion } from "motion/react";

interface TasteChartModalProps {
  onClose: () => void;
}

export default function TasteChartModal({ onClose }: TasteChartModalProps) {
  // Mock detailed statistics matched with the glorious screenshot
  const ratingDetails = [
    { star: "1★", count: 12, percentage: "15%", isPeak: false },
    { star: "2★", count: 28, percentage: "30%", isPeak: false },
    { star: "3★", count: 84, percentage: "65%", isPeak: false },
    { star: "4★", count: 142, percentage: "95%", isPeak: true },
    { star: "5★", count: 56, percentage: "45%", isPeak: false },
  ];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md px-4"
      id="modalOverlay"
      onClick={(e) => {
        if ((e.target as HTMLElement).id === "modalOverlay") onClose();
      }}
    >
      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="relative w-full max-w-2xl glass-panel rounded-2xl overflow-hidden shadow-2xl border border-white/10"
      >
        {/* Close button icon */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-[110] p-2 hover:bg-white/10 rounded-full transition-colors group"
          title="닫기"
        >
          <X className="w-5 h-5 text-gray-400 group-hover:text-white" />
        </button>

        {/* Content Header */}
        <div className="pt-10 px-6 md:px-12 text-center">
          <h2 className="font-serif text-2xl md:text-3xl italic text-[#C5A059] mb-3 tracking-[0.15em] uppercase">
            My Taste Chart
          </h2>
          <div className="py-3 px-5 bg-[#111111]/80 rounded-xl border border-white/5 inline-block max-w-full">
            <p className="font-sans text-xs md:text-sm text-white font-medium leading-relaxed">
              당신은 <span className="text-[#C5A059] font-bold">4점</span>을 가장 많이 주는 관대한 평론가군요!
            </p>
            <p className="text-gray-400 text-[10px] md:text-xs mt-0.5">
              (You're a generous critic who gives 4 stars the most!)
            </p>
          </div>
        </div>

        {/* Vertical SVG-styled Star Distribution Chart */}
        <div className="px-6 md:px-12 py-8">
          <div className="relative h-60 flex items-end justify-between gap-3 border-l border-b border-white/10 pb-2 pl-2">
            
            {/* Y axis text label rotated */}
            <div className="absolute -left-12 top-1/2 -rotate-90 origin-center text-[9px] font-sans text-gray-400 uppercase tracking-widest whitespace-nowrap">
              NUMBER OF MOVIES
            </div>

            {/* Individual Bars */}
            {ratingDetails.map((item, index) => {
              return (
                <div key={item.star} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                  <div className="relative w-full flex flex-col justify-end h-44">
                    {/* SVG/Div Animated Bar representing rating metric */}
                    <div
                      className={`relative w-full rounded-t-sm transition-all duration-300 ${
                        item.isPeak
                          ? "bg-[#C5A059] hover:bg-[#C5A059]/90 shadow-lg shadow-[#C5A059]/15"
                          : "bg-[#C5A059]/20 hover:bg-[#C5A059]/35"
                      }`}
                      style={{ height: item.percentage }}
                    >
                      {/* Highlight count badge */}
                      <span
                        className={`absolute -top-7 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded text-[9px] font-bold ${
                          item.isPeak
                            ? "bg-[#C5A059] text-black shadow-md shadow-[#C5A059]/10"
                            : "bg-[#181818] text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity"
                        }`}
                      >
                        {item.count}
                      </span>

                      {item.isPeak && (
                        <div className="absolute inset-0 bg-white/10 rounded-t-sm animate-pulse pointer-events-none" />
                      )}
                    </div>
                  </div>
                  <span
                    className={`text-xs font-mono mt-1 ${
                      item.isPeak ? "text-[#C5A059] font-bold" : "text-gray-400"
                    }`}
                  >
                    {item.star}
                  </span>
                </div>
              );
            })}

            {/* X-Axis Label */}
            <p className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[9px] font-sans text-gray-400 uppercase tracking-widest">
              STAR RATINGS
            </p>
          </div>
        </div>

        {/* Footer Stats metrics of the screenshot */}
        <div className="bg-[#181818]/60 py-5 px-4 flex justify-around border-t border-white/5">
          <div className="text-center">
            <p className="text-gray-400 font-sans text-[10px] uppercase tracking-wider mb-1">
              Total Ratings
            </p>
            <p className="font-serif text-[15px] text-[#C5A059] tracking-wider font-semibold">322</p>
          </div>
          <div className="w-px h-8 bg-white/10 my-auto" />
          <div className="text-center">
            <p className="text-gray-400 font-sans text-[10px] uppercase tracking-wider mb-1">
              Avg. Rating
            </p>
            <p className="font-serif text-[15px] text-[#C5A059] tracking-wider font-semibold">3.8</p>
          </div>
          <div className="w-px h-8 bg-white/10 my-auto" />
          <div className="text-center">
            <p className="text-gray-400 font-sans text-[10px] uppercase tracking-wider mb-1">
              Percentile
            </p>
            <p className="font-serif text-[15px] text-[#C5A059] tracking-wider font-semibold">Top 12%</p>
          </div>
        </div>

        {/* Modal Close Button footer action */}
        <div className="py-6 flex justify-center bg-[#0a0a0a]/20">
          <button
            onClick={onClose}
            className="bg-[#C5A059] text-black font-sans text-[10px] font-bold px-12 py-3 rounded-full hover:brightness-110 active:scale-95 transition-all tracking-widest uppercase shadow-lg shadow-[#C5A059]/10"
          >
            CLOSE VIEW
          </button>
        </div>

      </motion.div>
    </div>
  );
}
