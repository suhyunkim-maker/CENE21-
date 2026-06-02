/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  Check, 
  ChevronRight, 
  User, 
  HelpCircle, 
  Bell, 
  Settings, 
  Eye, 
  Palette, 
  RefreshCw, 
  CheckCircle2, 
  Volume2, 
  Layout, 
  Sparkles,
  Award
} from "lucide-react";
import { UserSettings } from "../types";
import { USER_CARD_PORTRAIT } from "../data";

interface PreferencesPanelProps {
  settings: UserSettings;
  onSaveSettings: (settings: UserSettings) => void;
  subView: "profile" | "settings"; // "profile" for standard 설 정, "settings" for 맞춤설정
}

export default function PreferencesPanel({
  settings,
  onSaveSettings,
  subView,
}: PreferencesPanelProps) {
  const [localSettings, setLocalSettings] = useState<UserSettings>({ ...settings });
  const [savedBadge, setSavedBadge] = useState(false);
  
  // Interactive action state: "profile" | "email" | "password" | null
  const [activeAction, setActiveAction] = useState<"profile" | "email" | "password" | null>(null);

  // Profile editing fields
  const [profileUsername, setProfileUsername] = useState(settings.username);
  const [profileMembership, setProfileMembership] = useState(settings.membershipType);
  const [profileAvatar, setProfileAvatar] = useState(settings.avatarUrl);

  // Email and password editing fields
  const [emailValue, setEmailValue] = useState("0901suhyunkim@gmail.com");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  React.useEffect(() => {
    setLocalSettings({ ...settings });
    setProfileUsername(settings.username);
    setProfileMembership(settings.membershipType);
    setProfileAvatar(settings.avatarUrl);
  }, [settings]);

  const updateSetting = (newSettings: UserSettings) => {
    setLocalSettings(newSettings);
    onSaveSettings(newSettings);
  };

  const handleToggleGenre = (genre: string) => {
    let list = [...localSettings.preferredGenres];
    if (list.includes(genre)) {
      list = list.filter((g) => g !== genre);
    } else {
      if (list.length >= 5) return; // restrict to maximum 5 as instructed
      list.push(genre);
    }
    updateSetting({ ...localSettings, preferredGenres: list });
  };

  const handleToggleRegion = (region: string) => {
    let list = [...localSettings.preferredRegions];
    if (list.includes(region)) {
      list = list.filter((r) => r !== region);
    } else {
      list = [region]; // radio style
    }
    updateSetting({ ...localSettings, preferredRegions: list });
  };

  const handleToggleInterest = (interest: string) => {
    let list = [...localSettings.contentInterests];
    if (list.includes(interest)) {
      list = list.filter((i) => i !== interest);
    } else {
      list.push(interest);
    }
    updateSetting({ ...localSettings, contentInterests: list });
  };

  const triggerSave = () => {
    onSaveSettings(localSettings);
    setSavedBadge(true);
    setTimeout(() => {
      setSavedBadge(false);
    }, 2000);
  };

  const triggerReset = () => {
    const updated: UserSettings = {
      ...settings,
      preferredGenres: ["Action", "Sci-Fi"],
      preferredRegions: ["Korea"],
      homeStyle: "Netflix",
      colorTheme: "Cine Red",
      density: "Comfortable",
      isSpoilerFilter: true,
    };
    updateSetting(updated);
    setSavedBadge(true);
    setTimeout(() => {
      setSavedBadge(false);
    }, 2000);
  };

  // 1. STANDARD PROFILE/SETTING COMPONENT ("설정" screen)
  if (subView === "profile") {
    return (
      <div className="max-w-xl mx-auto space-y-8" id="profile-view-tab">
        {/* User Identity Banner (Contextual Hero) */}
        <section className="flex items-center gap-6 p-6 glass-panel rounded-2xl border border-white/10" id="user-badge-header">
          <div className="relative group">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#C5A059] relative">
              <img
                src={localSettings.avatarUrl}
                alt={localSettings.username}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="absolute bottom-0 right-0 bg-[#C5A059] p-1.5 rounded-full border-2 border-[#0A0A0A] cursor-pointer">
              <User className="w-3 h-3 text-black font-bold" />
            </div>
          </div>
          <div>
            <h2 className="font-serif text-2xl italic text-white tracking-wide">
              {localSettings.username}
            </h2>
            <p className="font-sans text-[10px] text-[#C5A059] uppercase font-bold tracking-[0.2em]">
              {localSettings.membershipType}
            </p>
          </div>
        </section>

        {/* Account Section */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 px-1 text-[#C5A059]">
            <User className="w-4 h-4" />
            <h3 className="font-serif text-lg tracking-wider italic text-white">ACCOUNT 계정</h3>
          </div>

          {activeAction === null ? (
            <div className="space-y-2">
              <button
                onClick={() => {
                  setActiveAction("profile");
                  setProfileUsername(localSettings.username);
                  setProfileMembership(localSettings.membershipType);
                  setProfileAvatar(localSettings.avatarUrl);
                }}
                className="w-full flex items-center justify-between p-4 glass-panel rounded-xl hover:bg-white/5 transition-colors group text-left text-sm font-sans"
              >
                <span className="text-gray-200">프로필 편집</span>
                <ChevronRight className="w-4 h-4 text-gray-500 group-hover:translate-x-1 transition-transform animate-pulse" />
              </button>

              <button
                onClick={() => {
                  setActiveAction("email");
                  setPasswordError("");
                }}
                className="w-full flex items-center justify-between p-4 glass-panel rounded-xl hover:bg-white/5 transition-colors group text-left text-sm font-sans"
              >
                <span className="text-gray-200">이메일 변경</span>
                <ChevronRight className="w-4 h-4 text-gray-500 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  setActiveAction("password");
                  setPasswordError("");
                  setCurrentPassword("");
                  setNewPassword("");
                  setConfirmPassword("");
                }}
                className="w-full flex items-center justify-between p-4 glass-panel rounded-xl hover:bg-white/5 transition-colors group text-left text-sm font-sans"
              >
                <span className="text-gray-200">비밀번호 재설정</span>
                <ChevronRight className="w-4 h-4 text-gray-500 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ) : activeAction === "profile" ? (
            <div className="p-5 glass-panel rounded-xl border border-white/10 space-y-4 font-sans text-sm">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="font-serif italic text-white text-sm">프로필 정보 수정</span>
                <button 
                  onClick={() => setActiveAction(null)}
                  className="text-xs text-gray-400 hover:text-white"
                >
                  닫기 ✕
                </button>
              </div>

              {/* Username Input */}
              <div className="space-y-1">
                <label className="text-[10px] text-[#C5A059] font-bold uppercase tracking-wider block">사용자 이름</label>
                <input
                  type="text"
                  value={profileUsername}
                  onChange={(e) => setProfileUsername(e.target.value)}
                  className="w-full bg-[#111111] text-white px-3 py-2 rounded-lg border border-white/10 focus:outline-none focus:border-[#C5A059] text-xs font-sans font-medium"
                  placeholder="새 닉네임을 입력하세요"
                />
              </div>

              {/* Membership Type Selection */}
              <div className="space-y-1">
                <label className="text-[10px] text-[#C5A059] font-bold uppercase tracking-wider block">회원 등급</label>
                <select
                  value={profileMembership}
                  onChange={(e) => setProfileMembership(e.target.value)}
                  className="w-full bg-[#111111] text-white px-3 py-2 rounded-lg border border-white/10 focus:outline-none focus:border-[#C5A059] text-xs font-sans font-medium cursor-pointer"
                >
                  <option value="Cinephile Elite">Cinephile Elite (수석 평론가)</option>
                  <option value="VVIP Member">VVIP Member (VVIP 시네필)</option>
                  <option value="Standard Member">Standard Member (일반 시네필)</option>
                  <option value="Gold Critic">Gold Critic (골드 평론가)</option>
                </select>
              </div>

              {/* Avatar options selection */}
              <div className="space-y-2">
                <label className="text-[10px] text-[#C5A059] font-bold uppercase tracking-wider block">아바타 변경 (클릭 선택)</label>
                <div className="flex gap-4 items-center py-1">
                  {[
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80"
                  ].map((url, idx) => {
                    const isSelected = profileAvatar === url;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setProfileAvatar(url)}
                        className={`w-11 h-11 rounded-full overflow-hidden border-2 transition-all ${
                          isSelected ? "border-[#C5A059] scale-110 shadow-lg shadow-[#C5A059]/20" : "border-transparent opacity-50 hover:opacity-100"
                        }`}
                      >
                        <img src={url} alt={`Avatar ${idx}`} className="w-full h-full object-cover" />
                      </button>
                    );
                  })}
                </div>
                <input
                  type="text"
                  value={profileAvatar}
                  onChange={(e) => setProfileAvatar(e.target.value)}
                  className="w-full bg-[#111111] text-gray-400 px-3 py-1.5 rounded-md border border-white/5 focus:outline-none focus:border-[#C5A059] text-[9px] font-mono mt-1"
                  placeholder="또는 아바타 이미지 URL을 직접 입력하세요..."
                />
              </div>

              {/* Form Buttons */}
              <div className="flex gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    const updated = {
                      ...localSettings,
                      username: profileUsername || "이름 없는 시네필",
                      membershipType: profileMembership || "Standard Member",
                      avatarUrl: profileAvatar
                    };
                    updateSetting(updated);
                    setActiveAction(null);
                    setSavedBadge(true);
                    setTimeout(() => setSavedBadge(false), 2000);
                  }}
                  className="flex-1 py-2 rounded-lg bg-[#C5A059] text-black font-bold text-xs hover:brightness-110 active:scale-95 transition-all text-center cursor-pointer"
                >
                  수정 사항 저장
                </button>
                <button
                  type="button"
                  onClick={() => setActiveAction(null)}
                  className="flex-1 py-2 rounded-lg bg-white/5 text-gray-300 text-xs hover:bg-white/10 transition-all text-center cursor-pointer"
                >
                  취소
                </button>
              </div>
            </div>
          ) : activeAction === "email" ? (
            <div className="p-5 glass-panel rounded-xl border border-white/10 space-y-4 font-sans text-sm">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="font-serif italic text-white text-sm">이메일 주소 변경</span>
                <button 
                  onClick={() => setActiveAction(null)}
                  className="text-xs text-gray-400 hover:text-white"
                >
                  닫기 ✕
                </button>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] text-gray-500 block">현재 연결된 이메일</span>
                <span className="text-gray-300 text-xs font-mono">{emailValue}</span>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] text-[#C5A059] font-bold uppercase tracking-wider block">새 이메일 주소</label>
                <input
                  type="email"
                  value={emailValue}
                  onChange={(e) => setEmailValue(e.target.value)}
                  className="w-full bg-[#111111] text-white px-3 py-2 rounded-lg border border-white/10 focus:outline-none focus:border-[#C5A059] text-xs font-sans"
                  placeholder="새 이메일 주소 입력"
                />
              </div>

              <div className="flex gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setActiveAction(null);
                    setSavedBadge(true);
                    setTimeout(() => setSavedBadge(false), 2000);
                  }}
                  className="flex-1 py-2 rounded-lg bg-[#C5A059] text-black font-bold text-xs hover:brightness-110 active:scale-95 transition-all text-center cursor-pointer"
                >
                  이메일 주소 변경하기
                </button>
                <button
                  type="button"
                  onClick={() => setActiveAction(null)}
                  className="flex-1 py-2 rounded-lg bg-white/5 text-gray-300 text-xs hover:bg-white/10 transition-all text-center cursor-pointer"
                >
                  취소
                </button>
              </div>
            </div>
          ) : (
            <div className="p-5 glass-panel rounded-xl border border-white/10 space-y-4 font-sans text-sm">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="font-serif italic text-white text-sm">비밀번호 변경</span>
                <button 
                  onClick={() => setActiveAction(null)}
                  className="text-xs text-gray-400 hover:text-white"
                >
                  닫기 ✕
                </button>
              </div>

              {passwordError && (
                <div className="p-2.5 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-lg font-medium leading-relaxed">
                  ⚠️ {passwordError}
                </div>
              )}

              <div className="space-y-1">
                <label className="text-[10px] text-[#C5A059] font-bold uppercase tracking-wider block">현재 비밀번호</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full bg-[#111111] text-white px-3 py-2 rounded-lg border border-white/10 focus:outline-none focus:border-[#C5A059] text-xs font-sans animate-none"
                  placeholder="••••••••"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-[#C5A059] font-bold uppercase tracking-wider block">새 비밀번호</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    setPasswordError("");
                  }}
                  className="w-full bg-[#111111] text-white px-3 py-2 rounded-lg border border-white/10 focus:outline-none focus:border-[#C5A059] text-xs font-sans"
                  placeholder="새 비밀번호 입력"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-[#C5A059] font-bold uppercase tracking-wider block">새 비밀번호 확인</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setPasswordError("");
                  }}
                  className="w-full bg-[#111111] text-white px-3 py-2 rounded-lg border border-white/10 focus:outline-none focus:border-[#C5A059] text-xs font-sans"
                  placeholder="새 비밀번호 확인 입력"
                />
              </div>

              <div className="flex gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    if (!newPassword || !confirmPassword) {
                      setPasswordError("새 비밀번호와 확인 입력란을 채워주세요.");
                      return;
                    }
                    if (newPassword !== confirmPassword) {
                      setPasswordError("새 비밀번호와 비밀번호 확인이 일치하지 않습니다.");
                      return;
                    }
                    setActiveAction(null);
                    setCurrentPassword("");
                    setNewPassword("");
                    setConfirmPassword("");
                    setPasswordError("");
                    setSavedBadge(true);
                    setTimeout(() => setSavedBadge(false), 2000);
                  }}
                  className="flex-1 py-2 rounded-lg bg-[#C5A059] text-black font-bold text-xs hover:brightness-110 active:scale-95 transition-all text-center cursor-pointer"
                >
                  비밀번호 변경하기
                </button>
                <button
                  type="button"
                  onClick={() => setActiveAction(null)}
                  className="flex-1 py-2 rounded-lg bg-white/5 text-gray-300 text-xs hover:bg-white/10 transition-all text-center cursor-pointer"
                >
                  취소
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Notifications toggles Section */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 px-1 text-[#C5A059]">
            <Bell className="w-4 h-4" />
            <h3 className="font-serif text-lg tracking-wider italic text-white">NOTIFICATIONS 알림</h3>
          </div>
          <div className="glass-panel rounded-xl divide-y divide-white/5">
            {/* Alarm 1 */}
            <div className="flex items-center justify-between p-4 text-sm font-sans">
              <div className="flex flex-col">
                <span className="text-gray-200 font-medium">신작 영화 알림</span>
                <span className="text-[11px] text-gray-400 mt-0.5 font-sans">관심 장르의 최신 개봉작 소식을 알려드립니다.</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={localSettings.notifications.newMovies}
                  onChange={(e) =>
                    updateSetting({
                      ...localSettings,
                      notifications: {
                        ...localSettings.notifications,
                        newMovies: e.target.checked,
                      },
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-500 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#C5A059]" />
              </label>
            </div>

            {/* Alarm 2 */}
            <div className="flex items-center justify-between p-4 text-sm font-sans">
              <div className="flex flex-col">
                <span className="text-gray-200 font-medium">내 별점 반응 알림</span>
                <span className="text-[11px] text-gray-400 mt-0.5 font-sans">내 리뷰에 달린 댓글과 공감을 확인하세요.</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={localSettings.notifications.myRatingComments}
                  onChange={(e) =>
                    updateSetting({
                      ...localSettings,
                      notifications: {
                        ...localSettings.notifications,
                        myRatingComments: e.target.checked,
                      },
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-500 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#C5A059]" />
              </label>
            </div>
          </div>
        </section>

        {/* Support Section */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 px-1 text-[#C5A059]">
            <HelpCircle className="w-4 h-4" />
            <h3 className="font-serif text-lg tracking-wider italic text-white">SUPPORT 지원</h3>
          </div>
          <div className="glass-panel rounded-xl divide-y divide-white/5 text-sm font-sans">
            <button className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors text-left text-gray-200">
              <span>공지사항</span>
              <ChevronRight className="w-4 h-4 text-gray-500" />
            </button>
            <button className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors text-left text-gray-200">
              <span>고객센터</span>
              <ChevronRight className="w-4 h-4 text-gray-500" />
            </button>
            <div className="w-full flex items-center justify-between p-4 text-gray-400">
              <span>버전 정보</span>
              <span className="font-mono text-xs text-[#C5A059] font-bold">v2.0.0</span>
            </div>
          </div>
        </section>

        {/* Secondary save block banner */}
        <div className="pt-6">
          <button
            onClick={triggerSave}
            id="profile-trigger-save-btn"
            className="w-full py-4 text-center border border-[#C5A059]/40 bg-[#C5A059]/5 rounded-xl font-sans text-xs font-bold tracking-[0.2em] text-[#C5A059] hover:bg-[#C5A059]/15 hover:text-white transition-all active:scale-95 uppercase"
          >
            {savedBadge ? "설정이 저장되었습니다!" : "로그아웃 / 저장하기"}
          </button>
        </div>
      </div>
    );
  }

  // 2. DETAILED PREFERENCES CONFIG SCREEN ("맞춤 설정" screen)
  const genresOpt = ["Action", "Sci-Fi", "Drama", "Thriller", "Comedy", "Horror", "Romance", "Animation", "Documentary"];
  const eraOpt = ["Latest (2020+)", "2010s", "2000s", "Classics"];
  const regionsOpt = ["Korea", "USA", "Japan", "UK", "France", "India"];
  const itemsInterest = ["High Rated (인기작)", "Hidden Gems (숨은 명작)", "Blockbusters (블록버스터)", "Critic's Choice (평론가 추천)"];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="preference-taste-view-tab">
      
      {/* Save Notification Toast indicator */}
      {savedBadge && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-[#C5A059] text-black px-6 py-2.5 rounded-full font-sans text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#C5A059]/25">
          맞춤 설정 데이터가 성공적으로 저장되었습니다!
        </div>
      )}

      {/* Left Column: Primary Selections */}
      <div className="lg:col-span-8 space-y-10">
        
        {/* 2.1 Genre Selection */}
        <section>
          <div className="flex justify-between items-end mb-4 font-sans">
            <h2 className="font-serif text-xl italic text-[#C5A059] tracking-wider uppercase">
              선호 장르
            </h2>
            <span className="text-[10px] uppercase font-semibold text-gray-500 tracking-wider">
              최대 5개 선택 가능
            </span>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {genresOpt.map((genre) => {
              const active = localSettings.preferredGenres.includes(genre);
              return (
                <button
                  key={genre}
                  onClick={() => handleToggleGenre(genre)}
                  className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all font-sans cursor-pointer ${
                    active 
                      ? "bg-[#C5A059] text-black font-bold shadow-md shadow-[#C5A059]/10" 
                      : "bg-[#111111] text-gray-300 border border-white/5 hover:border-[#C5A059] hover:text-white"
                  }`}
                >
                  {genre}
                </button>
              );
            })}
          </div>
        </section>

        {/* 2.2 Country preferred Regions */}
        <section>
          <h2 className="font-serif text-xl italic text-[#C5A059] tracking-wider mb-4 uppercase">
            선호 국가
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {regionsOpt.map((region) => {
              const active = localSettings.preferredRegions.includes(region);
              return (
                <div
                  key={region}
                  onClick={() => handleToggleRegion(region)}
                  className={`p-4 rounded-xl flex items-center justify-between cursor-pointer border transition-all ${
                    active
                      ? "border-[#C5A059] bg-[#C5A059]/5 text-white"
                      : "border-white/5 bg-[#111111]/50 text-gray-300 hover:bg-white/5"
                  }`}
                >
                  <span className="text-xs font-semibold tracking-wide font-sans">{region}</span>
                  <Check className={`w-4 h-4 ${active ? "text-[#C5A059]" : "text-gray-600"}`} />
                </div>
              );
            })}
          </div>
        </section>

      </div>

      {/* Right Column: Micro-adjustments */}
      <aside className="lg:col-span-4 space-y-6">
        
        {/* 선호 시대 Era Preference */}
        <section className="glass-panel p-5 rounded-2xl">
          <h3 className="text-xs font-serif italic font-bold text-[#C5A059] tracking-widest uppercase mb-4">
            선호 시대
          </h3>
          <div className="flex flex-col gap-1.5 text-xs font-sans">
            {eraOpt.map((era) => {
              const active = localSettings.preferredEra === era;
              return (
                <label
                  key={era}
                  className="flex items-center justify-between p-2.5 rounded-lg hover:bg-white/5 cursor-pointer block"
                >
                  <span className="text-gray-200 font-medium">{era}</span>
                  <input
                    type="radio"
                    name="preferredEra"
                    checked={active}
                    onChange={() => updateSetting({ ...localSettings, preferredEra: era })}
                    className="w-4 h-4 accent-[#C5A059] bg-transparent border-white/20"
                  />
                </label>
              );
            })}
          </div>
        </section>

        {/* Content Interests */}
        <section className="glass-panel p-5 rounded-2xl">
          <h3 className="text-xs font-serif italic font-bold text-[#C5A059] tracking-widest uppercase mb-4">
            콘텐츠 관심사
          </h3>
          <div className="space-y-2 text-xs font-sans">
            {itemsInterest.map((interest) => {
              const active = localSettings.contentInterests.includes(interest);
              return (
                <div
                  key={interest}
                  onClick={() => handleToggleInterest(interest)}
                  className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all group ${
                    active
                      ? "border-[#C5A059] bg-[#C5A059]/5 text-white"
                      : "border-white/5 bg-[#111111]/50 text-gray-300 hover:bg-white/5 hover:border-white/10"
                  }`}
                >
                  <span className="text-xs font-semibold tracking-wide font-sans group-hover:text-white transition-colors">
                    {interest}
                  </span>
                  <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                    active
                      ? "border-[#C5A059] bg-[#C5A059] text-black"
                      : "border-white/20 bg-transparent text-transparent group-hover:border-[#C5A059]/50"
                  }`}>
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                </div>
              );
            })}
          </div>
        </section>



        {/* Spoiler Filter */}
        <section className="glass-panel p-5 rounded-2xl flex items-center justify-between font-sans">
          <div>
            <h4 className="text-xs font-serif italic font-bold text-white uppercase tracking-wider">
              스포일러 필터
            </h4>
            <p className="text-[10px] text-gray-500 mt-0.5">리뷰의 스포일러를 가립니다</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={localSettings.isSpoilerFilter}
              onChange={(e) => updateSetting({ ...localSettings, isSpoilerFilter: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-500 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#C5A059]" />
          </label>
        </section>

      </aside>

      {/* Buttons: Reset and Save in bottom sticky bar styles */}
      <div className="col-span-1 border-t border-white/5 pt-6 mt-4 md:col-span-12 flex justify-between gap-4 font-sans">
        <button
          onClick={triggerReset}
          className="flex-1 max-w-xs py-3.5 rounded-xl border border-[#C5A059]/40 text-[#C5A059] font-bold text-xs text-center hover:bg-[#C5A059]/5 transition-all cursor-pointer"
        >
          초기화
        </button>
        <button
          onClick={triggerSave}
          className="flex-[2] py-3.5 rounded-xl bg-[#C5A059] text-black font-bold text-xs tracking-wider uppercase shadow-lg shadow-[#C5A059]/10 hover:brightness-110 transition-all active:scale-95 cursor-pointer"
        >
          저장하기
        </button>
      </div>

    </div>
  );
}
