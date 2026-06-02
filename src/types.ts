/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Comment {
  id: string;
  user: string;
  content: string;
  createdAt: string;
  rating: number;
}

export interface Movie {
  id: string;
  titleKo: string;
  titleEn: string;
  year: number;
  genres: string[];
  rating: number; // User personal rating (1-5, or 0 if unrated)
  tmdbRating: number; // IMDb/TMDB rating out of 10
  image: string;
  description: string;
  isWatchlist: boolean;
  isNowPlaying: boolean;
  isTrending: boolean;
  isTopRated: boolean;
  comments: Comment[];
  reviewText?: string;
}

export interface UserSettings {
  username: string;
  membershipType: string;
  avatarUrl: string;
  preferredGenres: string[];
  preferredEra: string;
  preferredRegions: string[];
  contentInterests: string[];
  homeStyle: "Netflix" | "Letterboxd" | "IMDb";
  colorTheme: "Cine Red" | "Midnight Blue" | "Gold" | "Neon Purple";
  density: "Compact" | "Comfortable" | "Expanded";
  isSpoilerFilter: boolean;
  notifications: {
    newMovies: boolean;
    myRatingComments: boolean;
    marketing: boolean;
  };
  appearanceTheme: "dark" | "light" | "system";
  fontSize: number; // 1 (smallest) to 5 (largest)
}
