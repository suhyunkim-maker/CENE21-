/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Search, User, Sliders } from "lucide-react";
import { CINE21_LOGO_URL } from "../data";

interface HeaderProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  onSearch: (query: string) => void;
  onOpenMyTasteChart: () => void;
}

export default function Header({
  currentTab,
  onNavigate,
  onSearch,
  onOpenMyTasteChart,
}: HeaderProps) {
  const [searchVal, setSearchVal] = useState("");
  const [showSearchBox, setShowSearchBox] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchVal(val);
    onSearch(val);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 h-20 bg-[#0A0A0A]/85 backdrop-blur-md border-b border-white/10 flex justify-between items-center px-4 md:px-16">
      <div className="flex items-center gap-4">
        <div 
          className="flex items-center gap-2 cursor-pointer active:scale-95 transition-transform"
          onClick={() => onNavigate("home")}
          id="logo-container"
        >
          <img 
            alt="씨네21 로고" 
            src={CINE21_LOGO_URL} 
            className="h-7 md:h-9 object-contain filter grayscale brightness-125"
          />
          <div className="flex flex-col ml-1">
            <span className="text-lg md:text-xl font-serif italic tracking-widest text-[#C5A059]">SEOUL CINE21</span>
            <span className="text-[7px] tracking-[0.35em] uppercase opacity-40 -mt-1 text-white">서울 씨네21</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        {/* Search Input Box */}
        <div className="relative flex items-center">
          {showSearchBox || searchVal ? (
            <input
              type="text"
              placeholder="영화 제목, 장르 검색..."
              value={searchVal}
              onChange={handleSearchChange}
              id="search-input-field"
              className="bg-[#111111] text-xs text-white px-3.5 py-1.5 rounded-full border border-white/10 focus:outline-none focus:border-[#C5A059] w-36 md:w-64 transition-all duration-300 tracking-wide font-sans"
            />
          ) : null}
          <button
            onClick={() => setShowSearchBox(!showSearchBox)}
            className="p-2 text-gray-400 hover:text-[#C5A059] transition-colors active:scale-95 ml-1"
            title="검색"
            id="search-toggle-btn"
          >
            <Search className="w-5 h-5 text-[#C5A059]" />
          </button>
        </div>

        {/* View Taste Chart and Preference Controls */}
        <button
          onClick={onOpenMyTasteChart}
          id="view-taste-chart-header"
          className="hidden md:flex items-center gap-2 px-6 py-2 bg-[#C5A059] text-black font-sans text-[10px] font-bold uppercase tracking-widest rounded-full hover:brightness-115 active:scale-95 transition-all shadow-lg shadow-[#C5A059]/10"
        >
          VIEW MY TASTE
        </button>

        <button
          onClick={() => onNavigate("settings")}
          id="navigate-preferences-btn"
          className={`flex items-center gap-1 p-2 rounded-full transition-colors ${
            currentTab === "settings" ? "bg-white/5 text-[#C5A059]" : "text-gray-400 hover:text-white"
          }`}
          title="맞춤 설정"
        >
          <Sliders className="w-5 h-5" />
        </button>

        <button
          onClick={() => onNavigate("profile")}
          id="navigate-profile-btn"
          className={`flex items-center gap-1 p-2 rounded-full transition-colors ${
            currentTab === "profile" ? "bg-white/5 text-[#C5A059]" : "text-gray-400 hover:text-white"
          }`}
          title="내 프로필"
        >
          <User className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
