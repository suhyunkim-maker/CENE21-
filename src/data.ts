/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Movie, UserSettings } from "./types";

export const INITIAL_MOVIES: Movie[] = [
  {
    id: "1",
    titleKo: "어둠의 심연",
    titleEn: "Into the Void",
    year: 2024,
    genres: ["Sci-Fi", "Thriller"],
    rating: 4,
    tmdbRating: 8.4,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBiO308xlMVbFywylWds_B0bmvPAirbdn1J8mCBPkadD94CensJFZl55zTFgY76LcFQ03xLRXCY3Pqsu9jyCbMttrcyeB8HO9kW2451WYroeO0BuFGUNh7HxRRb9OmYrxTCpLmQ6KRjxS2I_KJ59wpyKQUD2aI_TP6IhKfy0eT093Q_eRN7ofLBuE1ld3sqNfqsS5nfPJRt3kQGHLBtA8tg8REyVuTaQgPvlIGVds2O-WagBX2eGtlCPEVOT0cTWFZyTpy9e90ZZL56",
    description: "In a world where light is a premium commodity, a disgraced detective uncovers a deep corporate conspiracy hidden within the pitch-black mechanical undercity.",
    isWatchlist: false,
    isNowPlaying: true,
    isTrending: true,
    isTopRated: false,
    comments: [
      {
        id: "c1",
        user: "Cinephile_Seoul",
        content: "시각적 연출과 긴장감 제어가 탁월합니다. 꼭 어두운 밤에 감상할 것.",
        createdAt: "2026-05-12T14:22:00Z",
        rating: 4
      }
    ]
  },
  {
    id: "2",
    titleKo: "네온 드라이브",
    titleEn: "Neon Drive",
    year: 2024,
    genres: ["Action", "Sci-Fi"],
    rating: 0,
    tmdbRating: 8.9,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCpUuSQ1dZsIgZDC7acRPi3hdK01g2WTfD361dodbazO0mDBAGwsRYbJsocXwYY5M1va-ln-zH8chRvCQRt2T9z3uHQAgPfOu7isb2w6T5LSOUboIdLs2cm06au83jaA-MDTxDTUwoB-NAgRmquaZbfNIf2BFyjzSEUITZyjp4urjps8vqP6xcQqc7bnS7scKCNHKrNVCxi4LU2IaZyc18t03r5h3thMQJK8XCB5-sAhVcrfE-qy0yxuPcgO6558aJoTcdVB3247Ay1",
    description: "A high-octane cyberpunk thrill ride tracking a courier program carrying synthetic memories across the neon glowing, rain-slicked towers of Neo-Seoul.",
    isWatchlist: true,
    isNowPlaying: true,
    isTrending: true,
    isTopRated: true,
    comments: []
  },
  {
    id: "3",
    titleKo: "공허의 끝",
    titleEn: "Edge of Silence",
    year: 2023,
    genres: ["Sci-Fi", "Drama"],
    rating: 5,
    tmdbRating: 8.5,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCgKEzm_TIq1p__gJavJ8RdiHPvciBYx9crN_n_4dwFdwFFw0yyvAvKKtbD5QJqvQnUP1BrccJGBYt_4x67CDkaKjLn9yYujoAAcgdfn9F7MNxM4eH2jhKx69GhkMr4wj683f5ok5yEy87_BGfiQRFYwMdtEuaNTxfFsNn0ULhmil6JGKw2LdnXIimkKtCL3b8uakk0iHBetFEi-nUQ80qTAeHw_PZSsj0mkm8UmHBNAOdEbxJvgFz4V75LE2LlK6Y6V0nEHza0Kcsv",
    description: "An isolated astronaut stranded on a cold white crystalline desert must make absolute peace with isolation while staring at a majestic gas giant rise.",
    isWatchlist: false,
    isNowPlaying: true,
    isTrending: false,
    isTopRated: true,
    comments: [
      {
        id: "c2",
        user: "SpaceOddity",
        content: "고요함과 영상미의 끝판왕. 미니멀리즘 우주 걸작.",
        createdAt: "2026-04-10T11:05:00Z",
        rating: 5
      }
    ]
  },
  {
    id: "4",
    titleKo: "붉은 궁전",
    titleEn: "The Crimson Court",
    year: 2022,
    genres: ["Drama", "Romance"],
    rating: 0,
    tmdbRating: 8.2,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuANgdFaEvtWZFTcNutKHQnuSwDi3kEb5VP37vrKOi4fmdg1F_nXto54Qd4aXzrq-f2nK7eN_2susuk9TjKwexDuhUd5tKO36WNbxJMbQEYvLAzCTuozF2ukViDNRlg3DhCTI5OKEOKe9qfs0_t1Otxnt6Th7KRbFjxVPcZNOF__XJWFEpPDtmbFCRUmjEufBU87Rv54F3H_489u8LNb7Yqz0SP9mgrKLBR1dAlMNwkacuC6sdVi7qaBZ_aKS_IbI9V5ckzCeAXMESeY",
    description: "Intrigue, royalty, and forbidden crimson themes play out under the candle-lit corridors of an atmospheric, classical 17th century European palace.",
    isWatchlist: false,
    isNowPlaying: false,
    isTrending: true,
    isTopRated: false,
    comments: []
  },
  {
    id: "5",
    titleKo: "도시의 그림자",
    titleEn: "Urban Shadows",
    year: 2024,
    genres: ["Thriller", "Horror"],
    rating: 3,
    tmdbRating: 7.8,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAUV43n5t1WiBCpZZwGbezyXe8sXlwqO339cOHWp6kvccS18mJz1CAmm2Ah4JzRQtcN9byJASaVarn-7aUzRU0SeT26SCi5vYoX00vBcnFJhdBqTjxnQTlZxKbPV_YJZpG_It2bAeM2cPVMkm5gvIkS-ifr0Glk_uihWihp2t6Aon1BnIGRtjEcRElqblcY4oTITImN3R35FcgCW67f0m391w3Y2i5YpPXKg46Pz2iExQ3J9DfIc6YFfxrP8RQne7hcbE81GtTztZ4O",
    description: "A gritty classic detective noir where rain-swept alleyways hold secrets to an unknown supernatural phantom lurking behind yellow street lamps.",
    isWatchlist: false,
    isNowPlaying: true,
    isTrending: false,
    isTopRated: false,
    comments: []
  },
  {
    id: "6",
    titleKo: "기억의 파편",
    titleEn: "Fragments",
    year: 2023,
    genres: ["Drama", "Animation"],
    rating: 0,
    tmdbRating: 8.0,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA064ATAwRl8tggwVPbN739QY8oTMrhW8qwt6_tla2JLgoe9Lp725P-sN2W4H1YeTkr-yy0iE1giDUsOn1szoHnS6w3P2p55I5SRGF1R2AX5oAr0j-pO6GW98CjuvSNa13aKQISfwTpMKasp-Enw-pv_rbpRwZ85nv9M5mhxgZnZ0MLPtnOfNnSVrqJQnpin5rL6GIj90HvtEkq1KfYn_tvsSmenhMPkwrClj2SsgpCKB31l7bIve8r227Ayhqd-vBZzkXzaynbc8Pj",
    description: "An abstract story exploring the post-war memories of a young illustrator through fluid, ink-in-water surrealist visual patterns and classical violins.",
    isWatchlist: false,
    isNowPlaying: true,
    isTrending: true,
    isTopRated: false,
    comments: []
  },
  {
    id: "7",
    titleKo: "스카이라인",
    titleEn: "Skyline",
    year: 2024,
    genres: ["Action", "Animation"],
    rating: 4,
    tmdbRating: 8.1,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuApRCAnB-JklGDCx1wCL-9uCWj7P5lLHdZwrB__a-STNjQZDgNGWJ6lMqDG_VLePXJtmHljB5Wd_DeETFrZpfPVxh_CvPSPhbH9pi7IF2MJdqZBiGY2irmF4Ejt0kHX7qAxPUDIW62A9t_OfoZY_l4WP00-c4-m0sd9UrGwivENIReehCb3Cw-9eJF5lWkfYhhyH8Fn6DxqotczzxU2YVePDU6hsUjLHhUa4hYse6PPUcdfZ2vFElioiNAV13QIdygVYfsoa2o8O9uE",
    description: "An incredibly stylized animated action film featuring bold vector illustrations that capture high speed architectural platforming chases through concrete voids.",
    isWatchlist: true,
    isNowPlaying: true,
    isTrending: false,
    isTopRated: false,
    comments: []
  },
  {
    id: "8",
    titleKo: "위대한 여정",
    titleEn: "The Great Ascent",
    year: 2022,
    genres: ["Documentary", "Drama"],
    rating: 0,
    tmdbRating: 9.3,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB0V13Am8UAERfp9NlBzZ-GGnFzQERtg0PnsKfYYBaCPqPZvydJq4r5z-iu6medgNTlTXMMh_-tVRmRYnRIVIPBYRNeOgwtuo_uvD9BenOp56s7m1HfPFZRrx_MVN8L2cBnn6IrQdvx7q9WQjJYf1NdhAJyvP7kLBp_xBkQ2vGNWZeSsyhdGyTXRSCuC9PwBB2JZQldMImjb0F5HhNilQyA6eY2NguW_QeHMi01BUdDZIzt4P_DrdGTkp_wCqGE0wjTeIuW9pQGW3mM",
    description: "A breathtaking documentary following two mountain guides attempting to summit a previously unclimbed peaks during one of the most unpredictable storm seasons.",
    isWatchlist: false,
    isNowPlaying: false,
    isTrending: false,
    isTopRated: true,
    comments: []
  },
  {
    id: "9",
    titleKo: "네온 벨로시티",
    titleEn: "Neon Velocity",
    year: 2024,
    genres: ["Sci-Fi", "Thriller"],
    rating: 4,
    tmdbRating: 8.4,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCYJueXRloehkgQ-5X6goPy7XD8NfkqLIAvXB3ZlRgqKzJi6G_mrEvWx5zkC5N7TTcazS7ykCTkUvaXUDmM86ybkB-yyP_lz5EXIxJKIPfr4xwy_mAELzj97JH4v2J4W7o6n3AQxtM6TdKX5pDsFrV0dWSuQOdf-HHZsKGwusO2rGwrWl-BKZ1YaN93eW9-rYsFRginDLyxpA0UZ-TLRdetmAtDzEZdvGdsNl9VSTSKT18UT28hv3e-R-otjtwkr-WfJmFY-pwihHHY",
    description: "A high-contrast cinematic journey tracking adrenaline-fueled racing pilots competing in the cyber-grid of a neon-drenched rainy skyscraper metropolis.",
    isWatchlist: false,
    isNowPlaying: true,
    isTrending: false,
    isTopRated: false,
    comments: []
  },
  {
    id: "10",
    titleKo: "사일런트 릴",
    titleEn: "Silent Reel",
    year: 2023,
    genres: ["Drama", "Thriller"],
    rating: 0,
    tmdbRating: 7.9,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCeWLsSjV5l6qCWxOJxYw6iuy8AeueXYWHsSx_RqgWMOa6OQL97hUyBRO9gjhMtcHkE8UGA1mcI9kINArahb9fRHFdlMbawYOQXMfMWll0lmdLnLCbg4DNDfS2QUAS4zCHMdso_pBLBMWYZlQoOYRHi7PLRwmlXL7I9WObY5Kag6UCpnBS1RYpTLRauBN7rRqHfqkSJWZBYPq9vLnY7fClDC4Vwx82Md0EoYDZBPI-GYLjauD_bckxviv8kiYuEWaZ9fof3Z-PXCofd",
    description: "A gorgeous, deep looking lens flare and light reflection into a vintage projector film spool, unlocking historical and personal memories lost in a studio fire.",
    isWatchlist: false,
    isNowPlaying: true,
    isTrending: true,
    isTopRated: false,
    comments: []
  },
  {
    id: "11",
    titleKo: "론리 오빗",
    titleEn: "The Lonely Orbit",
    year: 2024,
    genres: ["Sci-Fi", "Drama"],
    rating: 0,
    tmdbRating: 9.1,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuClbueZqrwnx892sI09BrIKTPLvHkFxBgfcTwmblJ74lZEmL9K0e_x6rqCrwSE8p8HO4llkQoKuUtDPzvgT7E6ibAlJBWx_bB1ZlSnYbRsrOjYnMTq4zIzivTRCwesjii7yrn8UPwB8t61ickdNhx0q7qdD9IEmBskvhxTzP85F8trxv6fmsrDppDGkwBEPbftPsjE_zC1-orKz7tuQZTT-OBxqtbXgl_cjIF3rpbuUiGRhmVYtAm-IY-LE5pyhGiegA4wi-IXLAPAV",
    description: "A stunning minimalist film depicting a single space outpost mechanic whose communication dishes face a beautiful dark solar system as his only friend.",
    isWatchlist: false,
    isNowPlaying: true,
    isTrending: false,
    isTopRated: true,
    comments: []
  },
  {
    id: "12",
    titleKo: "레드라인 체이스",
    titleEn: "Redline Chase",
    year: 2023,
    genres: ["Action", "Thriller"],
    rating: 0,
    tmdbRating: 6.5,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDLXomjwKXBPvZz1Wy8LxudVynPtuiton_M68ffdW7k6Kb4zio49CY5DjNorXnZ6VwaImIjw8y4SRVyCjMMzEuNSpcVmSjdDPpDHIHwVbIsgI58qcdTQ4b-lG-7bYgN_jCCJzLLg86awdJIcpB0_6Air2yL8TqA5g7DDwiS32WIe4Q7sM2jvmrEAB6dqNnJeIPOia5RxbiaNFx7yg2bTwinp7DyN7QdQ8BzaVG8EhLM1z__eWNw4rEhgFSbDp_gMLMPYiD9fpnl0tQN",
    description: "A fast paced pursuit sequence taking place in a multi-story dense architectural marketplace with stunning colors and deep shadows.",
    isWatchlist: false,
    isNowPlaying: true,
    isTrending: false,
    isTopRated: false,
    comments: []
  },
  {
    id: "13",
    titleKo: "시네마 천국",
    titleEn: "Cinema Paradiso",
    year: 1988,
    genres: ["Drama", "Romance"],
    rating: 5,
    tmdbRating: 9.5,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBpL0zA8XOPnHmHK-GdgtxJuLPWMzkCjOP0ntM6iifhM4RsJ1c6A3sITKPLqxGhCKSof-FjOS1X0P4IRfu735El5slh4ehfaYstiRsCyJsogkNbPibgLiE_qPrRkfWOdxYeG5lm78EQDhqAO43kfprFtDLARH6b5Dm5gTTrcbdwqPOVJG4C7lUXLBRRmvkm7PhV7Oel7xv3cwZ6bmeWE6C9ci_LexZZWQTHtFNITodtwLJqZW0USXqHTKgZ-POO0mA-rQ7JNNdSlSYT",
    description: "A master filmmaker returns home to remember his childhood mentorship under the local movie theater projectionist who introduced him to the profound magic of cinema.",
    isWatchlist: false,
    isNowPlaying: false,
    isTrending: true,
    isTopRated: true,
    comments: [
      {
        id: "c3",
        user: "Classic_Lover",
        content: "영화 역사상 가장 지워지지 않을 최고의 마지막 시퀀스.",
        createdAt: "2026-03-15T09:00:00Z",
        rating: 5
      }
    ]
  }
];

export const DEFAULT_SETTINGS: UserSettings = {
  username: "CINE_ENTHUSIAST_92",
  membershipType: "Premium Membership Member",
  avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDlJp8iMk1-60-SAlGL_mKGoEvyEHNpojcZ4UBke_Ft0gWsXNMKX_pKCDvJyDNgtKHpwjwiNGOUT8d5GNUl9luQxyzsz6aFzVIpy2PcZACOD1b8nZanyoifHhsn6LYlPbIc6cFYLWV9P1HN-LIA-z5-I833oXjJUSXHGyFdkfZlDWAP38sWU5eeHk2P900-KUaVtur_VVniNayAFBG-nOJ85FXZk4nQdPcqXjKkZ_PXel4yn5O7EfBnw3qAkLw3Cgtut6YH_e8WMy9r",
  preferredGenres: ["Action", "Sci-Fi"],
  preferredEra: "Latest (2020+)",
  preferredRegions: ["Korea"],
  contentInterests: ["High Rated (인기작)", "Blockbusters (블록버스터)"],
  homeStyle: "Netflix",
  colorTheme: "Cine Red",
  density: "Comfortable",
  isSpoilerFilter: true,
  notifications: {
    newMovies: true,
    myRatingComments: true,
    marketing: false
  },
  appearanceTheme: "dark",
  fontSize: 3
};

export const CINE21_LOGO_URL = "https://lh3.googleusercontent.com/aida/AP1WRLtWHLDUV-uJkoi0neXlRS8AAc5PKeQSJ9gpAwmJIFh-YY47XIyGOzhy71_7W6eRvIGyckNvp1T3W9SpDUQrumEXlmK4mwZc9Z263CV-D2E18BoF-hLZjzzlr0dZKpSH_9033aIAd5xuYpyXIQxr5FddELllpyHaYJK4Usl1olZ9m85shY6WSTp-dE_O8bSNhNBD3yp7Dpa4sMhPxyCHqHEEAr9WXvqSyVwQa-6b81tB2i3TKO6h6o_C82Sv";

export const USER_CARD_PORTRAIT = "https://lh3.googleusercontent.com/aida-public/AB6AXuDaW9csmwQGI2Rd29oyZ5kIZXQhof9HDFold1xYLkh8iIkLitZaGciGUxpfEbXG5-Zl_KIE4yqcdG3I4nat8VtvJKqU2NSbKYMmGEhvBVU765hKGC5wrAeU1rwwmxI0kLGr72tsSP6faQaaOId9gWbKcgY1b11Qip7-gAgma9zTK5fRp8CN-Ifvcc-Pq7hJM06qBUMpkpZkKTUDXPO863NXQ-Gp_8tIEVwV53d2bCbxylvF7RByRzrxDpc_mOCnENRZPad33ud7Kiu6";
