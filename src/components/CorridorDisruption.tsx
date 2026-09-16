import React, { useState, useMemo } from 'react';
import { 
  Sliders, 
  Users, 
  RotateCcw, 
  Terminal, 
  ShieldAlert, 
  Compass 
} from 'lucide-react';

// --- DATASET & RESEARCH SPECIFICATION ---
export interface ChainData {
  id: string;
  market: string;
  variety: string;
  grade: string;
  n_obs: number;
  ect: number;
  ect_pvalue: number | null;
  lr_nascdi_pos: number;
  lr_nascdi_neg: number;
  bounds_f_pvalue: number;
  vulnerability_index: number;
  rank: number;
  rank1_frequency: number;
  tiers: { amber_at_wow: number; red_at_wow: number };
  latest: {
    week_end: string;
    nascdi_pos: number;
    nascdi_neg: number;
    nascdi_pos_wow: number;
    tier: 'green' | 'amber' | 'red';
  };
  weekly: Array<{
    week_end: string;
    nascdi_pos: number;
    nascdi_neg: number;
    nascdi_pos_wow: number | null;
    price_producer: number;
    price_terminal: number;
  }>;
}

export interface LexiconConfig {
  source_file: string;
  categories: {
    disruption_terms: Record<string, number>;
    mitigation_terms: Record<string, number>;
    commodity_terms: Record<string, number>;
  };
  params: {
    min_score_threshold: number;
    clip_raw: number;
  };
  normalization: {
    method: string;
    mu_raw_nascdi: number;
    sigma_raw_nascdi: number;
    formula: string;
  };
  historical_raw_percentiles: {
    p50: number;
    p70: number;
    p90: number;
    p95: number;
    p99: number;
    max: number;
  };
}

export interface StabilityConfig {
  monte_carlo: {
    n_draws: number;
    mean_spearman_rho: number;
    frac_rho_ge_0_90: number;
    frac_shopian_lower_mean_rank_than_sopore: number;
    baseline_shopian_mean_rank: number;
    baseline_sopore_mean_rank: number;
  };
  leave_one_out: Array<{
    dropped_component: string;
    spearman_rho_vs_baseline: number;
  }>;
}

const CHAINS_DATA: ChainData[] = [
  {
    id: "Shopian_American_B",
    market: "Shopian",
    variety: "American",
    grade: "B",
    n_obs: 72,
    ect: -0.19757,
    ect_pvalue: 0.00581,
    lr_nascdi_pos: 0.02011,
    lr_nascdi_neg: -0.01982,
    bounds_f_pvalue: 0.0176,
    vulnerability_index: 0.00775,
    rank: 1,
    rank1_frequency: 0.5214,
    tiers: { amber_at_wow: 0.0, red_at_wow: 2.2557 },
    latest: {
      week_end: "2024-12-01",
      nascdi_pos: 581.36,
      nascdi_neg: 599.99,
      nascdi_pos_wow: 0.0,
      tier: "green"
    },
    weekly: [
      { week_end: "2017-10-01", nascdi_pos: 219.01, nascdi_neg: 224.05, nascdi_pos_wow: null, price_producer: 13.75, price_terminal: 31.25 },
      { week_end: "2017-11-05", nascdi_pos: 224.52, nascdi_neg: 225.83, nascdi_pos_wow: 2.98, price_producer: 20.09, price_terminal: 34.38 },
      { week_end: "2018-10-07", nascdi_pos: 273.64, nascdi_neg: 292.27, nascdi_pos_wow: 47.27, price_producer: 12.68, price_terminal: 33.93 },
      { week_end: "2019-10-06", nascdi_pos: 314.87, nascdi_neg: 323.13, nascdi_pos_wow: 41.23, price_producer: 31.88, price_terminal: 28.13 },
      { week_end: "2020-10-04", nascdi_pos: 368.04, nascdi_neg: 386.67, nascdi_pos_wow: 53.17, price_producer: 21.88, price_terminal: 33.75 },
      { week_end: "2021-10-03", nascdi_pos: 414.76, nascdi_neg: 433.39, nascdi_pos_wow: 46.72, price_producer: 18.75, price_terminal: 28.13 },
      { week_end: "2022-10-02", nascdi_pos: 450.38, nascdi_neg: 469.01, nascdi_pos_wow: 35.61, price_producer: 18.75, price_terminal: 37.50 },
      { week_end: "2023-10-01", nascdi_pos: 532.12, nascdi_neg: 550.75, nascdi_pos_wow: 81.74, price_producer: 34.38, price_terminal: 43.75 },
      { week_end: "2024-10-06", nascdi_pos: 581.36, nascdi_neg: 599.99, nascdi_pos_wow: 49.24, price_producer: 34.38, price_terminal: 50.36 },
      { week_end: "2024-12-01", nascdi_pos: 581.36, nascdi_neg: 599.99, nascdi_pos_wow: 0.0, price_producer: 31.25, price_terminal: 46.88 }
    ]
  },
  {
    id: "Sopore_American_A",
    market: "Sopore",
    variety: "American",
    grade: "A",
    n_obs: 200,
    ect: -0.10674,
    ect_pvalue: 0.01794,
    lr_nascdi_pos: -0.02352,
    lr_nascdi_neg: 0.02378,
    bounds_f_pvalue: 0.09339,
    vulnerability_index: 0.00458,
    rank: 2,
    rank1_frequency: 0.0923,
    tiers: { amber_at_wow: 0.0, red_at_wow: 7.6748 },
    latest: {
      week_end: "2025-02-02",
      nascdi_pos: 614.30,
      nascdi_neg: 632.93,
      nascdi_pos_wow: 0.0,
      tier: "green"
    },
    weekly: [
      { week_end: "2015-09-06", nascdi_pos: 82.69, nascdi_neg: 82.25, nascdi_pos_wow: null, price_producer: 40.36, price_terminal: 40.63 },
      { week_end: "2017-09-03", nascdi_pos: 218.37, nascdi_neg: 220.49, nascdi_pos_wow: 103.91, price_producer: 40.40, price_terminal: 50.00 },
      { week_end: "2019-09-01", nascdi_pos: 312.56, nascdi_neg: 315.48, nascdi_pos_wow: 38.92, price_producer: 48.00, price_terminal: 46.88 },
      { week_end: "2021-01-03", nascdi_pos: 378.02, nascdi_neg: 386.67, nascdi_pos_wow: 9.98, price_producer: 61.16, price_terminal: 71.43 },
      { week_end: "2023-01-15", nascdi_pos: 484.15, nascdi_neg: 469.01, nascdi_pos_wow: 25.49, price_producer: 47.54, price_terminal: 43.75 },
      { week_end: "2024-09-01", nascdi_pos: 581.36, nascdi_neg: 599.99, nascdi_pos_wow: 28.22, price_producer: 68.75, price_terminal: 90.00 },
      { week_end: "2025-02-02", nascdi_pos: 614.30, nascdi_neg: 632.93, nascdi_pos_wow: 0.0, price_producer: 60.71, price_terminal: 64.38 }
    ]
  },
  {
    id: "Shopian_American_A",
    market: "Shopian",
    variety: "American",
    grade: "A",
    n_obs: 72,
    ect: -0.26691,
    ect_pvalue: 0.00144,
    lr_nascdi_pos: 0.00711,
    lr_nascdi_neg: -0.00631,
    bounds_f_pvalue: 0.00948,
    vulnerability_index: 0.00355,
    rank: 3,
    rank1_frequency: 0.2721,
    tiers: { amber_at_wow: 0.0, red_at_wow: 2.2557 },
    latest: {
      week_end: "2024-12-01",
      nascdi_pos: 581.36,
      nascdi_neg: 599.99,
      nascdi_pos_wow: 0.0,
      tier: "green"
    },
    weekly: [
      { week_end: "2017-10-01", nascdi_pos: 219.01, nascdi_neg: 224.05, nascdi_pos_wow: null, price_producer: 25.00, price_terminal: 50.00 },
      { week_end: "2018-10-07", nascdi_pos: 273.64, nascdi_neg: 292.27, nascdi_pos_wow: 47.27, price_producer: 22.32, price_terminal: 53.57 },
      { week_end: "2019-10-06", nascdi_pos: 314.87, nascdi_neg: 323.13, nascdi_pos_wow: 41.23, price_producer: 48.13, price_terminal: 46.88 },
      { week_end: "2021-10-03", nascdi_pos: 414.76, nascdi_neg: 433.39, nascdi_pos_wow: 46.72, price_producer: 28.13, price_terminal: 43.75 },
      { week_end: "2023-10-01", nascdi_pos: 532.12, nascdi_neg: 550.75, nascdi_pos_wow: 81.74, price_producer: 43.75, price_terminal: 68.75 },
      { week_end: "2024-12-01", nascdi_pos: 581.36, nascdi_neg: 599.99, nascdi_pos_wow: 0.0, price_producer: 50.00, price_terminal: 64.46 }
    ]
  },
  {
    id: "Sopore_American_B",
    market: "Sopore",
    variety: "American",
    grade: "B",
    n_obs: 200,
    ect: -0.13154,
    ect_pvalue: 0.00907,
    lr_nascdi_pos: -0.01005,
    lr_nascdi_neg: 0.01124,
    bounds_f_pvalue: 0.06241,
    vulnerability_index: 0.00262,
    rank: 4,
    rank1_frequency: 0.0432,
    tiers: { amber_at_wow: 0.0, red_at_wow: 7.6748 },
    latest: {
      week_end: "2025-02-02",
      nascdi_pos: 614.30,
      nascdi_neg: 632.93,
      nascdi_pos_wow: 0.0,
      tier: "green"
    },
    weekly: [
      { week_end: "2015-09-06", nascdi_pos: 82.69, nascdi_neg: 82.25, nascdi_pos_wow: null, price_producer: 18.66, price_terminal: 33.13 },
      { week_end: "2017-09-03", nascdi_pos: 218.37, nascdi_neg: 220.49, nascdi_pos_wow: 103.91, price_producer: 19.38, price_terminal: 31.25 },
      { week_end: "2019-09-01", nascdi_pos: 312.56, nascdi_neg: 315.48, nascdi_pos_wow: 38.92, price_producer: 32.00, price_terminal: 28.13 },
      { week_end: "2021-01-03", nascdi_pos: 378.02, nascdi_neg: 386.67, nascdi_pos_wow: 9.98, price_producer: 26.79, price_terminal: 53.57 },
      { week_end: "2023-01-15", nascdi_pos: 484.15, nascdi_neg: 469.01, nascdi_pos_wow: 25.49, price_producer: 32.59, price_terminal: 28.13 },
      { week_end: "2025-02-02", nascdi_pos: 614.30, nascdi_neg: 632.93, nascdi_pos_wow: 0.0, price_producer: 45.98, price_terminal: 44.38 }
    ]
  },
  {
    id: "Shopian_Delicious_A",
    market: "Shopian",
    variety: "Delicious",
    grade: "A",
    n_obs: 110,
    ect: -0.15527,
    ect_pvalue: 0.00017,
    lr_nascdi_pos: -0.00788,
    lr_nascdi_neg: 0.00797,
    bounds_f_pvalue: 0.00053,
    vulnerability_index: 0.00246,
    rank: 5,
    rank1_frequency: 0.0260,
    tiers: { amber_at_wow: 0.0, red_at_wow: 1.9281 },
    latest: {
      week_end: "2025-01-05",
      nascdi_pos: 610.74,
      nascdi_neg: 600.68,
      nascdi_pos_wow: 0.0,
      tier: "green"
    },
    weekly: [
      { week_end: "2017-09-17", nascdi_pos: 219.01, nascdi_neg: 221.16, nascdi_pos_wow: null, price_producer: 37.50, price_terminal: 46.88 },
      { week_end: "2019-09-15", nascdi_pos: 312.65, nascdi_neg: 317.24, nascdi_pos_wow: 39.01, price_producer: 60.00, price_terminal: 46.88 },
      { week_end: "2021-01-03", nascdi_pos: 378.02, nascdi_neg: 386.67, nascdi_pos_wow: 9.98, price_producer: 56.25, price_terminal: 72.32 },
      { week_end: "2023-09-17", nascdi_pos: 532.12, nascdi_neg: 550.75, nascdi_pos_wow: 81.74, price_producer: 37.50, price_terminal: 64.29 },
      { week_end: "2025-01-05", nascdi_pos: 610.74, nascdi_neg: 600.68, nascdi_pos_wow: 0.0, price_producer: 56.25, price_terminal: 68.71 }
    ]
  },
  {
    id: "Shopian_Delicious_B",
    market: "Shopian",
    variety: "Delicious",
    grade: "B",
    n_obs: 110,
    ect: -0.11519,
    ect_pvalue: 0.01364,
    lr_nascdi_pos: -0.00574,
    lr_nascdi_neg: 0.00475,
    bounds_f_pvalue: 0.05207,
    vulnerability_index: 0.00114,
    rank: 6,
    rank1_frequency: 0.0342,
    tiers: { amber_at_wow: 0.0, red_at_wow: 1.9281 },
    latest: {
      week_end: "2025-01-05",
      nascdi_pos: 610.74,
      nascdi_neg: 600.68,
      nascdi_pos_wow: 0.0,
      tier: "green"
    },
    weekly: [
      { week_end: "2017-09-17", nascdi_pos: 219.01, nascdi_neg: 221.16, nascdi_pos_wow: null, price_producer: 31.25, price_terminal: 31.25 },
      { week_end: "2019-09-15", nascdi_pos: 312.65, nascdi_neg: 317.24, nascdi_pos_wow: 39.01, price_producer: 43.75, price_terminal: 31.25 },
      { week_end: "2021-01-03", nascdi_pos: 378.02, nascdi_neg: 386.67, nascdi_pos_wow: 9.98, price_producer: 35.94, price_terminal: 41.96 },
      { week_end: "2023-09-17", nascdi_pos: 532.12, nascdi_neg: 550.75, nascdi_pos_wow: 81.74, price_producer: 28.13, price_terminal: 45.54 },
      { week_end: "2025-01-05", nascdi_pos: 610.74, nascdi_neg: 600.68, nascdi_pos_wow: 0.0, price_producer: 25.00, price_terminal: 47.57 }
    ]
  },
  {
    id: "Sopore_Delicious_A",
    market: "Sopore",
    variety: "Delicious",
    grade: "A",
    n_obs: 236,
    ect: -0.07260,
    ect_pvalue: 0.01739,
    lr_nascdi_pos: -0.00440,
    lr_nascdi_neg: 0.00514,
    bounds_f_pvalue: 0.08318,
    vulnerability_index: 0.00063,
    rank: 7,
    rank1_frequency: 0.0035,
    tiers: { amber_at_wow: 0.0, red_at_wow: 8.1070 },
    latest: {
      week_end: "2025-03-02",
      nascdi_pos: 632.02,
      nascdi_neg: 650.65,
      nascdi_pos_wow: 0.0,
      tier: "green"
    },
    weekly: [
      { week_end: "2015-09-06", nascdi_pos: 82.69, nascdi_neg: 82.25, nascdi_pos_wow: null, price_producer: 52.68, price_terminal: 37.50 },
      { week_end: "2017-09-03", nascdi_pos: 218.37, nascdi_neg: 220.49, nascdi_pos_wow: 29.65, price_producer: 47.10, price_terminal: 46.88 },
      { week_end: "2019-09-01", nascdi_pos: 312.56, nascdi_neg: 315.48, nascdi_pos_wow: 20.31, price_producer: 60.00, price_terminal: 46.88 },
      { week_end: "2021-01-03", nascdi_pos: 378.02, nascdi_neg: 386.67, nascdi_pos_wow: 9.98, price_producer: 57.37, price_terminal: 72.32 },
      { week_end: "2023-01-08", nascdi_pos: 458.66, nascdi_neg: 469.01, nascdi_pos_wow: 8.28, price_producer: 37.95, price_terminal: 37.50 },
      { week_end: "2025-03-02", nascdi_pos: 632.02, nascdi_neg: 650.65, nascdi_pos_wow: 0.0, price_producer: 60.94, price_terminal: 67.23 }
    ]
  },
  {
    id: "Sopore_Delicious_B",
    market: "Sopore",
    variety: "Delicious",
    grade: "B",
    n_obs: 236,
    ect: -0.05226,
    ect_pvalue: 0.04811,
    lr_nascdi_pos: 0.00734,
    lr_nascdi_neg: -0.00570,
    bounds_f_pvalue: 0.21567,
    vulnerability_index: 0.00053,
    rank: 8,
    rank1_frequency: 0.0073,
    tiers: { amber_at_wow: 0.0, red_at_wow: 8.1070 },
    latest: {
      week_end: "2025-03-02",
      nascdi_pos: 632.02,
      nascdi_neg: 650.65,
      nascdi_pos_wow: 0.0,
      tier: "green"
    },
    weekly: [
      { week_end: "2015-09-06", nascdi_pos: 82.69, nascdi_neg: 82.25, nascdi_pos_wow: null, price_producer: 31.25, price_terminal: 25.00 },
      { week_end: "2017-09-03", nascdi_pos: 218.37, nascdi_neg: 220.49, nascdi_pos_wow: 29.65, price_producer: 22.99, price_terminal: 31.25 },
      { week_end: "2019-09-01", nascdi_pos: 312.56, nascdi_neg: 315.48, nascdi_pos_wow: 20.31, price_producer: 44.00, price_terminal: 31.25 },
      { week_end: "2021-01-03", nascdi_pos: 378.02, nascdi_neg: 386.67, nascdi_pos_wow: 9.98, price_producer: 28.79, price_terminal: 41.96 },
      { week_end: "2023-01-08", nascdi_pos: 458.66, nascdi_neg: 469.01, nascdi_pos_wow: 8.28, price_producer: 24.78, price_terminal: 18.75 },
      { week_end: "2025-03-02", nascdi_pos: 632.02, nascdi_neg: 650.65, nascdi_pos_wow: 0.0, price_producer: 50.00, price_terminal: 46.93 }
    ]
  }
];

const LEXICON_DATA: LexiconConfig = {
  source_file: "config/lexicon_news.yaml",
  categories: {
    disruption_terms: {
      "highway closed": 3.0, "road closed": 3.0, "traffic suspended": 3.0, "traffic halted": 2.5,
      "vehicular movement suspended": 2.5, "vehicle movement stopped": 2.5, "highway blocked": 2.5,
      "road blocked": 2.5, "route blocked": 2.5, "traffic jam": 1.5, "traffic disrupted": 2.0,
      "stranded trucks": 2.5, "stranded vehicles": 2.0, "trucks stranded": 2.5, "fruit trucks stranded": 3.0,
      "apple trucks stranded": 3.0, "freight disruption": 2.0, "logistics bottleneck": 2.5,
      "supply chain disruption": 2.5, "landslide": 2.5, "landslides": 2.5, "shooting stones": 2.5,
      "avalanche": 3.0, "heavy snowfall": 2.5, "flash flood": 2.5, "road washed away": 2.5,
      "decline in arrivals": 2.5, "acute shortage": 2.5, "price spike": 2.5, "distress sale": 2.0,
      "fruit rotting": 2.5, "post-harvest loss": 2.0, "curfew": 2.5, "shutdown": 2.0, "hartal": 2.0,
      "blockade": 2.5, "internet shutdown": 1.5, "communication blackout": 2.0, "section 144": 2.0,
      "article 370 lockdown": 3.0, "covid-19 lockdown": 3.0
    },
    mitigation_terms: {
      "highway reopened": -2.5, "highway reopens": -2.5, "highway partially reopened": -1.5,
      "road reopened": -2.0, "tunnel reopened": -2.0, "traffic restored": -2.0, "traffic resumed": -2.0,
      "vehicles being cleared": -1.5, "stranded vehicles being cleared": -2.0, "vehicular movement resumed": -2.0,
      "road cleared": -2.0, "highway cleared": -2.0, "snow cleared": -2.0, "restoration work completed": -2.0,
      "arrivals improve": -2.0, "supply restored": -2.0, "supply normalised": -2.0, "logistics normalised": -2.0,
      "market reopened": -1.5, "market stabilises": -1.5, "prices stabilise": -1.5, "curfew lifted": -2.0,
      "normalcy restored": -2.0, "internet restored": -1.5, "restrictions eased": -1.5, "restrictions lifted": -2.0
    },
    commodity_terms: {
      "apple": 1.0, "apples": 1.0, "kashmir apple": 1.0, "kashmiri apple": 1.0, "apple grower": 1.0,
      "apple crop": 1.0, "apple harvest": 1.0, "apple market": 1.0, "apple trade": 1.0, "apple price": 1.0,
      "fruit": 0.8, "fruit grower": 0.8, "fruit market": 0.8, "fruit mandi": 0.8, "horticulture": 0.8,
      "kashmir": 1.0, "j k": 1.0, "jammu kashmir": 1.0, "srinagar": 1.0, "jammu": 1.0, "jammu-srinagar": 1.0,
      "nh-44": 1.0, "national highway 44": 1.0, "jawahar tunnel": 1.0, "banihal tunnel": 1.0,
      "parimpora": 1.0, "sopore": 1.0, "shopian": 1.0, "pulwama": 1.0, "azadpur": 1.0, "delhi mandi": 1.0
    }
  },
  params: {
    min_score_threshold: 1.0,
    clip_raw: 30.0
  },
  normalization: {
    method: "z_to_100_10",
    mu_raw_nascdi: 2.3951,
    sigma_raw_nascdi: 3.4279,
    formula: "NASCDI = (raw_nascdi - mu) / sigma * 10 + 100"
  },
  historical_raw_percentiles: {
    p50: 0.0,
    p70: 4.82,
    p90: 7.15,
    p95: 8.54,
    p99: 12.14,
    max: 26.20
  }
};

const STABILITY_DATA: StabilityConfig = {
  monte_carlo: {
    n_draws: 10000,
    mean_spearman_rho: 0.5335,
    frac_rho_ge_0_90: 0.0501,
    frac_shopian_lower_mean_rank_than_sopore: 0.7362,
    baseline_shopian_mean_rank: 3.75,
    baseline_sopore_mean_rank: 5.25
  },
  leave_one_out: [
    { dropped_component: "NASCDI_pos", spearman_rho_vs_baseline: 1.0 },
    { dropped_component: "NASCDI_neg", spearman_rho_vs_baseline: 0.9762 }
  ]
};

// --- SCORING & DYNAMIC MULTIPLIER MATH HELPERS ---
function cleanText(text: string): string {
  return String(text || "")
    .toLowerCase()
    .replace(/nh 44/g, "nh-44")
    .replace(/nh44/g, "nh-44")
    .replace(/[^a-z0-9-\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function countTermOccurrences(text: string, term: string): number {
  const t = term.trim().toLowerCase();
  if (!t) return 0;
  const escaped = t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp("(?<![a-z0-9-])" + escaped + "(?![a-z0-9-])", "g");
  const m = text.match(re);
  return m ? m.length : 0;
}

function scoreCategory(text: string, terms: Record<string, number>): number {
  let sum = 0;
  for (const term in terms) {
    if (Object.prototype.hasOwnProperty.call(terms, term)) {
      sum += countTermOccurrences(text, term) * terms[term];
    }
  }
  return sum;
}

interface ArticleScore {
  disruption_score: number;
  mitigation_score: number;
  commodity_score: number;
  score_raw: number;
  has_commodity_context: boolean;
  is_index_article: boolean;
  qualifies_for_index: boolean;
  implied_daily_nascdi: number | null;
  percentile_band: string;
  note: string;
}

function scoreArticle(rawText: string): ArticleScore {
  const text = cleanText(rawText);
  const disruption = scoreCategory(text, LEXICON_DATA.categories.disruption_terms);
  const mitigation = scoreCategory(text, LEXICON_DATA.categories.mitigation_terms);
  const commodity = scoreCategory(text, LEXICON_DATA.categories.commodity_terms);
  const scoreRawUnclipped = disruption + mitigation;
  const clip = LEXICON_DATA.params.clip_raw;
  const scoreRaw = Math.max(-clip, Math.min(clip, scoreRawUnclipped));
  const hasCommodityContext = commodity > 0;
  const isIndexArticle = Math.abs(scoreRaw) >= LEXICON_DATA.params.min_score_threshold;
  const qualifies = hasCommodityContext && isIndexArticle;

  const mu = LEXICON_DATA.normalization.mu_raw_nascdi;
  const sigma = LEXICON_DATA.normalization.sigma_raw_nascdi;
  const implied = qualifies ? (scoreRaw - mu) / sigma * 10 + 100 : null;

  const p = LEXICON_DATA.historical_raw_percentiles;
  let band = "below p50 (typical/no disruption)";
  if (qualifies) {
    if (scoreRaw >= p.p99) band = "at/above p99 (most extreme 1% of days on record)";
    else if (scoreRaw >= p.p95) band = "p95-p99";
    else if (scoreRaw >= p.p90) band = "p90-p95";
    else if (scoreRaw >= p.p70) band = "p70-p90";
    else if (scoreRaw >= p.p50) band = "p50-p70";
  }

  let note = "";
  if (qualifies) {
    note = "Treats this composed article as if it were the representative qualifying article for a day.";
  } else if (hasCommodityContext) {
    note = `Below min-score threshold (|score| >= ${LEXICON_DATA.params.min_score_threshold}) — does not trigger an index entry.`;
  } else {
    note = "No Apple / Kashmir / NH-44 commodity context detected — pipeline suppresses false positives.";
  }

  return {
    disruption_score: disruption,
    mitigation_score: mitigation,
    commodity_score: commodity,
    score_raw: scoreRaw,
    has_commodity_context: hasCommodityContext,
    is_index_article: isIndexArticle,
    qualifies_for_index: qualifies,
    implied_daily_nascdi: implied,
    percentile_band: band,
    note: note
  };
}

function tierFromBand(band: string, qualifies: boolean): 'green' | 'amber' | 'red' {
  if (!qualifies) return "green";
  if (band.indexOf("p90") === 0 || band.indexOf("at/above p99") === 0 || band.indexOf("p95") === 0) return "red";
  if (band.indexOf("p70") === 0 || band.indexOf("p50") === 0) return "amber";
  return "green";
}

function dynamicMultiplierPath(phi: number, beta: number, maxHorizon: number = 20) {
  const path: Array<{ horizon: number; effect: number }> = [];
  for (let h = 0; h <= maxHorizon; h++) {
    path.push({ horizon: h, effect: beta * (1 - Math.pow(1 + phi, h)) });
  }
  return path;
}

interface Recommendation {
  section: string;
  title: string;
  body: string;
  trigger: string;
}

function buildRecommendations(chain: ChainData, tier: 'green' | 'amber' | 'red', opts?: { simulated?: boolean }): Recommendation[] {
  const simulated = opts?.simulated || false;
  const recs: Recommendation[] = [];

  recs.push({
    section: "7.1",
    title: "NH-44 Corridor Infrastructure Resilience & Permanent Bypass Priority",
    body: `Price adjustment remains incomplete even after corridor conditions normalise (ECT = ${chain.ect.toFixed(3)}, p = ${chain.ect_pvalue != null ? chain.ect_pvalue.toFixed(3) : "n/a"}). Treat NH-44 reliability (e.g. T-5 tunnel, shooting-stone sheds) as a standing structural priority rather than seasonal emergency maintenance.`,
    trigger: "Always applicable — long-run cointegrating error-correction confirmed in this chain."
  });

  if (tier !== "green") {
    recs.push({
      section: "7.2",
      title: "Real-Time NASCDI Disruption Monitoring & Early Warning Broadcast",
      body: simulated
        ? `This composed scenario falls in the ${tier.toUpperCase()} band of this chain's historical distribution. If confirmed in operational reporting, escalate surveillance and activate farmer early-warning advisories.`
        : `This week's intensification (${chain.latest.nascdi_pos_wow.toFixed(2)}) is in the ${tier.toUpperCase()} band of this chain's own history. Escalate surveillance and broadcast freight advisory.`,
      trigger: "Fires when week-over-week NASCDI⁺ exceeds the chain's own 70th (Amber) / 90th (Red) percentile threshold."
    });
  }

  if (chain.market === "Shopian" && chain.rank <= 4) {
    recs.push({
      section: "7.3",
      title: "Targeted Buffer Investment in Shopian Cold-Storage & Pre-Cooling",
      body: `Ranks in the top 4 of 8 by vulnerability index. Prioritise under HADP / MIDH / PMKSY schemes for packhouse and CA store expansion, targeting buffer capacity for at least 15% of peak weekly harvest during a 10-day highway closure.`,
      trigger: "Fires for Shopian-origin chains ranked in top 4 of 8 by vulnerability index."
    });
  }

  if (chain.market === "Shopian" && chain.variety === "American") {
    recs.push({
      section: "7.4",
      title: "e-NAM Minimum Reference Price & KCC Liquidity Window Activation",
      body: tier !== "green"
        ? (simulated
          ? "Under this shock severity, activate e-NAM Minimum Reference Price (MRP) floors and Kisan Credit Card (KCC) emergency liquidity windows for Shopian American growers."
          : "Elevated volatility — put e-NAM MRP stabilization and temporary freight subsidies on active standby for Shopian American grades.")
        : "Corridor conditions normal; keep e-NAM MRP protocols and KCC liquidity facilities on contingency standby.",
      trigger: "Fires specifically for Shopian American Grade A & B — the chains named in Section 7.4."
    });
  }

  if (chain.rank === 1) {
    recs.push({
      section: "7.5",
      title: "Parametric Corridor Disruption Index Insurance (CDII) Pilot",
      body: "Highest-ranked chain by vulnerability index (Rank 1 of 8) — designated pilot candidate for parametric index insurance triggering automatic compensation during prolonged highway blockades.",
      trigger: "Fires for the single top-ranked chain by vulnerability index."
    });
  }

  return recs;
}

// --- SUBCOMPONENT: Sparkline SVG ---
const Sparkline: React.FC<{ values: number[]; color: string; width?: number; height?: number }> = ({ 
  values, 
  color, 
  width = 180, 
  height = 36 
}) => {
  if (!values.length) return null;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const stepX = width / Math.max(1, values.length - 1);
  const pts = values.map((v, i) => {
    const x = i * stepX;
    const y = height - 4 - ((v - min) / range) * (height - 8);
    return [x, y];
  });
  const line = "M " + pts.map(p => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" L ");
  const area = `${line} L ${width} ${height} L 0 ${height} Z`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height} preserveAspectRatio="none">
      <defs>
        <linearGradient id={`grad-${color}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0.0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#grad-${color})`} stroke="none" />
      <path d={line} fill="none" stroke={color} strokeWidth="1.7" />
    </svg>
  );
};

// --- SUBCOMPONENT: Radial Gauge ---
const RadialGauge: React.FC<{ frac: number; label: string; sublabel: string; color: string; size?: number }> = ({
  frac,
  label,
  sublabel,
  color,
  size = 96
}) => {
  const boundedFrac = Math.max(0, Math.min(1, frac));
  const r = size / 2 - 8;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;
  const arcFraction = 0.75;
  const dash = circumference * arcFraction;
  const offset = dash * (1 - boundedFrac);

  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} style={{ display: 'block', flexShrink: 0 }}>
      <g transform={`rotate(135 ${cx} ${cy})`}>
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="var(--color-border)"
          strokeWidth="7"
          strokeDasharray={`${dash} ${circumference}`}
          strokeLinecap="round"
        />
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="7"
          strokeDasharray={`${dash} ${circumference}`}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.5s ease' }}
        />
      </g>
      <text
        x="50%"
        y="48%"
        textAnchor="middle"
        fontSize={size * 0.18}
        fill="var(--color-text-main)"
        fontWeight="800"
      >
        {label}
      </text>
      {sublabel && (
        <text
          x="50%"
          y="66%"
          textAnchor="middle"
          fontSize={size * 0.11}
          fill="var(--color-text-muted)"
          fontWeight="600"
        >
          {sublabel}
        </text>
      )}
    </svg>
  );
};

// --- SUBCOMPONENT: Response Curve SVG Chart ---
const ResponseChart: React.FC<{ path: Array<{ horizon: number; effect: number }>; color: string; label: string }> = ({
  path,
  color,
  label
}) => {
  const W = 620;
  const H = 260;
  const padL = 52;
  const padR = 24;
  const padT = 24;
  const padB = 34;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;

  const pctPath = path.map(p => ({ h: p.horizon, pct: (Math.exp(p.effect) - 1) * 100 }));
  const vals = pctPath.map(p => p.pct);
  let minV = Math.min(0, Math.min(...vals));
  let maxV = Math.max(0, Math.max(...vals));
  if (minV === maxV) { minV -= 1; maxV += 1; }
  const pad = (maxV - minV) * 0.15;
  minV -= pad;
  maxV += pad;

  const xAt = (h: number) => padL + (h / (pctPath.length - 1)) * plotW;
  const yAt = (v: number) => padT + plotH - ((v - minV) / (maxV - minV)) * plotH;

  const d = "M " + pctPath.map(p => `${xAt(p.h).toFixed(1)} ${yAt(p.pct).toFixed(1)}`).join(" L ");
  const zeroY = yAt(0);

  const last = pctPath[pctPath.length - 1];
  const lx = xAt(last.h);
  const ly = yAt(last.pct);

  return (
    <div style={{ width: '100%', overflowX: 'auto' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} style={{ minWidth: '460px', display: 'block' }}>
        {/* Horizontal grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((f, i) => {
          const v = minV + f * (maxV - minV);
          const y = yAt(v);
          return (
            <g key={i}>
              <line x1={padL} x2={W - padR} y1={y} y2={y} stroke="var(--color-border)" strokeWidth="1" strokeDasharray="3 3" />
              <text x={padL - 8} y={y + 3} textAnchor="end" fontSize="10" fill="var(--color-text-muted)" fontFamily="monospace">
                {v.toFixed(1)}%
              </text>
            </g>
          );
        })}

        {/* Zero baseline */}
        <line x1={padL} x2={W - padR} y1={zeroY} y2={zeroY} stroke="var(--color-border-bright, #94a3b8)" strokeWidth="1.5" />

        {/* Vertical weeks grid */}
        {pctPath.filter(p => p.h % 5 === 0).map(p => (
          <text key={p.h} x={xAt(p.h)} y={H - 10} textAnchor="middle" fontSize="10" fill="var(--color-text-muted)" fontFamily="monospace">
            w{p.h}
          </text>
        ))}

        {/* Dynamic multiplier curve */}
        <path d={d} fill="none" stroke={color} strokeWidth="2.6" strokeLinecap="round" />

        {/* Terminal point */}
        <circle cx={lx} cy={ly} r={4.5} fill={color} />
        <text 
          x={Math.min(lx, W - padR - 60)} 
          y={ly - 10} 
          fontSize="11" 
          fontWeight="800" 
          fill={color}
          fontFamily="monospace"
        >
          {last.pct >= 0 ? "+" : ""}{last.pct.toFixed(2)}%
        </text>

        {/* Legend */}
        <text x={padL} y={16} fontSize="11" fontWeight="700" fill="var(--color-text-main)">
          {label}
        </text>
      </svg>
    </div>
  );
};

// --- MAIN COMPONENT ---
export const CorridorDisruption: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'recs' | 'simulator' | 'about'>('overview');
  const [selectedChainId, setSelectedChainId] = useState<string>("Shopian_American_B");
  
  // Simulator State
  const [simChainId, setSimChainId] = useState<string>("Shopian_American_B");
  const [selectedTerms, setSelectedTerms] = useState<Record<string, 'disruption' | 'mitigation' | 'commodity'>>({
    "highway closed": "disruption",
    "landslide": "disruption",
    "apple trucks stranded": "disruption",
    "nh-44": "commodity",
    "kashmir apple": "commodity"
  });
  const [manualOverride, setManualOverride] = useState<{ type: 'pos' | 'neg'; size: number } | null>(null);

  const selectedChain = useMemo(() => {
    return CHAINS_DATA.find(c => c.id === selectedChainId) || CHAINS_DATA[0];
  }, [selectedChainId]);

  const simChain = useMemo(() => {
    return CHAINS_DATA.find(c => c.id === simChainId) || CHAINS_DATA[0];
  }, [simChainId]);

  // Compute live score from selected terms
  const composedText = useMemo(() => {
    return Object.keys(selectedTerms).join(" . ");
  }, [selectedTerms]);

  const scoreResult = useMemo(() => {
    if (!Object.keys(selectedTerms).length) return null;
    return scoreArticle(composedText);
  }, [composedText, selectedTerms]);

  // Derived shock
  const derivedShock = useMemo(() => {
    if (manualOverride) return manualOverride;
    if (scoreResult && scoreResult.qualifies_for_index) {
      return {
        type: scoreResult.score_raw >= 0 ? ('pos' as const) : ('neg' as const),
        size: Math.abs(scoreResult.score_raw)
      };
    }
    return { type: 'pos' as const, size: 0 };
  }, [manualOverride, scoreResult]);

  // Dynamic multiplier projection
  const dynamicPath = useMemo(() => {
    const beta = derivedShock.type === 'pos' ? simChain.lr_nascdi_pos : simChain.lr_nascdi_neg;
    return dynamicMultiplierPath(simChain.ect, beta, 20);
  }, [simChain, derivedShock]);

  const finalPriceEffect = useMemo(() => {
    if (!dynamicPath.length) return 0;
    return (Math.exp(dynamicPath[dynamicPath.length - 1].effect) - 1) * 100;
  }, [dynamicPath]);

  const simTier = useMemo(() => {
    if (!scoreResult) return 'green';
    return tierFromBand(scoreResult.percentile_band, scoreResult.qualifies_for_index);
  }, [scoreResult]);

  const handleAddTerm = (term: string, cat: 'disruption' | 'mitigation' | 'commodity') => {
    if (!term) return;
    setSelectedTerms(prev => ({ ...prev, [term]: cat }));
    setManualOverride(null);
  };

  const handleRemoveTerm = (term: string) => {
    setSelectedTerms(prev => {
      const next = { ...prev };
      delete next[term];
      return next;
    });
    setManualOverride(null);
  };

  const handleClearTerms = () => {
    setSelectedTerms({});
    setManualOverride(null);
  };

  const tierColors = {
    green: '#16a34a',
    amber: '#d97706',
    red: '#dc2626'
  };

  return (
    <div className="corridor-engine-wrap animate-fade-in" style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #062012 0%, #0d3820 100%)',
        color: '#ffffff',
        borderRadius: '16px',
        padding: '2rem 2rem',
        marginBottom: '2rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
        border: '1px solid rgba(255,255,255,0.1)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '-40px',
          right: '-40px',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(34,197,94,0.18) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)', padding: '4px 12px', borderRadius: '30px', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#86efac', marginBottom: '0.85rem' }}>
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
          NASCDI-NARDL Research Programme &middot; SKUAST-Kashmir
        </div>

        <h2 style={{ fontSize: 'clamp(22px, 3.2vw, 32px)', fontWeight: 900, margin: '0 0 0.65rem', letterSpacing: '-0.02em', color: '#ffffff' }}>
          NH-44 Corridor Disruption Engine &amp; Policy Radar
        </h2>
        <p style={{ margin: 0, fontSize: '0.92rem', color: '#cbd5e1', maxWidth: '780px', lineHeight: 1.6 }}>
          Econometric scenario-simulation and policy-recommendation suite tracking Nonlinear Asymmetric Supply-Chain Disruption Index (NASCDI) via GDELT media intelligence and NARDL error-correction models across 8 Kashmir apple supply chains.
        </p>

        {/* Engine Navigation Sub-tabs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1.75rem', borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: '1.25rem' }}>
          <button
            onClick={() => setActiveTab('overview')}
            style={{
              padding: '7px 14px',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === 'overview' ? '#16a34a' : 'rgba(255,255,255,0.08)',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '0.82rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease'
            }}
          >
            <Compass size={15} /> Overview &amp; Key Signals
          </button>
          <button
            onClick={() => setActiveTab('recs')}
            style={{
              padding: '7px 14px',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === 'recs' ? '#16a34a' : 'rgba(255,255,255,0.08)',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '0.82rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease'
            }}
          >
            <ShieldAlert size={15} /> Vulnerability &amp; Recommendations (§7.1–7.5)
          </button>
          <button
            onClick={() => setActiveTab('simulator')}
            style={{
              padding: '7px 14px',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === 'simulator' ? '#16a34a' : 'rgba(255,255,255,0.08)',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '0.82rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease'
            }}
          >
            <Sliders size={15} /> Interactive GDELT Scenario Simulator
          </button>
          <button
            onClick={() => setActiveTab('about')}
            style={{
              padding: '7px 14px',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === 'about' ? '#16a34a' : 'rgba(255,255,255,0.08)',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '0.82rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease'
            }}
          >
            <Users size={15} /> Methodology &amp; Team
          </button>
        </div>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Key Stat Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
            <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '12px', padding: '1.25rem', borderTop: '4px solid #16a34a' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>📊</div>
              <div style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Monitored Supply Chains</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--color-text-main)', margin: '0.25rem 0' }}>8 Chains</div>
              <div style={{ fontSize: '0.76rem', color: 'var(--color-text-muted)' }}>Shopian &amp; Sopore (American &amp; Delicious)</div>
            </div>

            <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '12px', padding: '1.25rem', borderTop: '4px solid #d97706' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>📰</div>
              <div style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Lexicon Terms</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--color-text-main)', margin: '0.25rem 0' }}>150+ Terms</div>
              <div style={{ fontSize: '0.76rem', color: 'var(--color-text-muted)' }}>Disruption (+), Mitigation (−) &amp; Context</div>
            </div>

            <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '12px', padding: '1.25rem', borderTop: '4px solid #dc2626' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>🏔️</div>
              <div style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Most Vulnerable Chain</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#dc2626', margin: '0.25rem 0' }}>Shopian Amer. B</div>
              <div style={{ fontSize: '0.76rem', color: 'var(--color-text-muted)' }}>Rank 1/8 (Vulnerability Index: 0.00775)</div>
            </div>

            <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '12px', padding: '1.25rem', borderTop: '4px solid #2563eb' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>🎲</div>
              <div style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Monte Carlo Robustness</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--color-text-main)', margin: '0.25rem 0' }}>10,000 Draws</div>
              <div style={{ fontSize: '0.76rem', color: 'var(--color-text-muted)' }}>Shopian higher exposure in 73.6% of runs</div>
            </div>
          </div>

          {/* Core Pipeline Explainer */}
          <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '14px', padding: '1.75rem' }}>
            <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-text-main)' }}>
              How the Corridor Disruption Engine Functions
            </h3>
            <p style={{ margin: '0 0 1.25rem', fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
              Kashmir produces over 70% of India's apples, funneled almost exclusively through a single high-altitude arterial corridor: National Highway 44 (NH-44). Severe weather landslides, shooting stones at Ramban-Banihal, and security blockades create severe asymmetric price shocks between farmgate and terminal mandis.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
              <div style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: '10px', padding: '1.1rem' }}>
                <div style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>📝</div>
                <h4 style={{ margin: '0 0 0.35rem', fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-text-main)' }}>1. GDELT Lexicon Scoring</h4>
                <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                  Parses real-time news articles through a curated domain dictionary assigning positive weights to disruptions (landslides, closures), negative weights to mitigations (reopened), gated by apple/Kashmir commodity context.
                </p>
              </div>

              <div style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: '10px', padding: '1.1rem' }}>
                <div style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>📈</div>
                <h4 style={{ margin: '0 0 0.35rem', fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-text-main)' }}>2. NARDL Error-Correction</h4>
                <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                  Fitted Nonlinear Autoregressive Distributed Lag models capture asymmetric transmission: price declines during road closures are faster and steeper than price recovery during reopenings.
                </p>
              </div>

              <div style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: '10px', padding: '1.1rem' }}>
                <div style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>🏆</div>
                <h4 style={{ margin: '0 0 0.35rem', fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-text-main)' }}>3. Vulnerability Index</h4>
                <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                  Integrates error-correction adjustment speed ($\phi$), long-run sensitivity ($\beta^+$), and empirical model fit into a composite ranking stress-tested with 10,000 bootstrap simulations.
                </p>
              </div>

              <div style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: '10px', padding: '1.1rem' }}>
                <div style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>🎯</div>
                <h4 style={{ margin: '0 0 0.35rem', fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-text-main)' }}>4. Actionable Policy Rules</h4>
                <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                  Automatically maps current and simulated disruption severity to explicit policy instruments: CA store buffer mandates, e-NAM floor prices, KCC credit windows, and parametric insurance.
                </p>
              </div>
            </div>
          </div>

          {/* Quick CTA to Simulator */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', margin: '0.5rem 0' }}>
            <button
              onClick={() => setActiveTab('simulator')}
              style={{
                background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
                color: '#ffffff',
                border: 'none',
                padding: '11px 24px',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.92rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 14px rgba(22,163,74,0.35)'
              }}
            >
              <Sliders size={18} /> Open Interactive Headline Simulator &rarr;
            </button>
            <button
              onClick={() => setActiveTab('recs')}
              style={{
                background: 'var(--color-surface)',
                color: 'var(--color-text-main)',
                border: '1px solid var(--color-border)',
                padding: '11px 24px',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.92rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <ShieldAlert size={18} /> View 8-Chain Vulnerability Rankings
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: VULNERABILITY & RECOMMENDATIONS */}
      {activeTab === 'recs' && (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '14px', padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
              <div>
                <h3 style={{ margin: '0 0 0.25rem', fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-text-main)' }}>
                  Monitored Apple Supply Chains &amp; Vulnerability Rankings
                </h3>
                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                  Table 7 empirical results &middot; Click any chain card to inspect its econometric parameters and recommended policy actions
                </p>
              </div>

              <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', background: 'var(--color-bg)', padding: '4px 10px', borderRadius: '6px', border: '1px solid var(--color-border)' }}>
                Monte Carlo ρ: <strong>{STABILITY_DATA.monte_carlo.mean_spearman_rho.toFixed(3)}</strong> &middot; {STABILITY_DATA.monte_carlo.n_draws.toLocaleString()} draws
              </div>
            </div>

            {/* Chains Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
              {CHAINS_DATA.map(chain => {
                const isSelected = chain.id === selectedChainId;
                const tierColor = tierColors[chain.latest.tier];
                const recentPos = chain.weekly.map(w => w.nascdi_pos);

                return (
                  <div
                    key={chain.id}
                    onClick={() => setSelectedChainId(chain.id)}
                    style={{
                      background: isSelected ? 'var(--color-primary-pale, rgba(22,163,74,0.06))' : 'var(--color-bg)',
                      border: isSelected ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                      borderRadius: '12px',
                      padding: '1rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: isSelected ? '0 4px 14px rgba(22,163,74,0.15)' : 'none'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--color-text-muted)', border: '1px solid var(--color-border)', padding: '1px 6px', borderRadius: '4px', fontFamily: 'monospace' }}>
                        RANK #{chain.rank} / 8
                      </span>
                      <span style={{ fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', color: tierColor, background: `${tierColor}15`, padding: '2px 7px', borderRadius: '20px' }}>
                        ● {chain.latest.tier}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '2px' }}>
                      {chain.market} {chain.variety}
                    </div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)', marginBottom: '0.75rem', fontFamily: 'monospace' }}>
                      Grade {chain.grade} &middot; n = {chain.n_obs} weeks
                    </div>

                    {/* Sparkline */}
                    <div style={{ marginBottom: '0.65rem' }}>
                      <Sparkline values={recentPos} color={tierColor} />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--color-border)', paddingTop: '0.5rem', fontSize: '0.74rem' }}>
                      <div>
                        <div style={{ color: 'var(--color-text-muted)', fontSize: '0.65rem', textTransform: 'uppercase' }}>Vuln. Index</div>
                        <div style={{ fontWeight: 800, fontFamily: 'monospace', color: 'var(--color-text-main)' }}>{chain.vulnerability_index.toFixed(5)}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ color: 'var(--color-text-muted)', fontSize: '0.65rem', textTransform: 'uppercase' }}>Rank 1 Freq</div>
                        <div style={{ fontWeight: 800, fontFamily: 'monospace', color: 'var(--color-text-main)' }}>{(chain.rank1_frequency * 100).toFixed(1)}%</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Selected Chain Policy Detail Panel */}
          <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '14px', padding: '1.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1.25rem' }}>
              <RadialGauge
                frac={1 - (selectedChain.rank - 1) / 7}
                label={`#${selectedChain.rank}`}
                sublabel="of 8"
                color={tierColors[selectedChain.latest.tier]}
                size={84}
              />
              <div>
                <div style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-primary)', marginBottom: '2px' }}>
                  Policy Implications &middot; Sections 7.1 to 7.5
                </div>
                <h3 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 900, color: 'var(--color-text-main)' }}>
                  {selectedChain.market} {selectedChain.variety} (Grade {selectedChain.grade})
                </h3>
                <p style={{ margin: '4px 0 0', fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                  Error Correction Speed: <code style={{ color: 'var(--color-text-main)', fontWeight: 700 }}>{selectedChain.ect.toFixed(4)}</code> &middot; 
                  Long-Run Disruption Beta: <code style={{ color: 'var(--color-text-main)', fontWeight: 700 }}>{selectedChain.lr_nascdi_pos.toFixed(4)}</code>
                </p>
              </div>
            </div>

            {/* Render Policy Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {buildRecommendations(selectedChain, selectedChain.latest.tier, { simulated: false }).map((rec, i) => (
                <div 
                  key={i}
                  style={{
                    background: 'var(--color-bg)',
                    border: '1px solid var(--color-border)',
                    borderLeft: '4px solid var(--color-primary)',
                    borderRadius: '8px',
                    padding: '1rem 1.25rem'
                  }}
                >
                  <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--color-primary)', letterSpacing: '0.05em', marginBottom: '4px' }}>
                    § {rec.section} &middot; STATUTORY DIRECTIVE
                  </div>
                  <h4 style={{ margin: '0 0 0.35rem', fontSize: '0.98rem', fontWeight: 800, color: 'var(--color-text-main)' }}>
                    {rec.title}
                  </h4>
                  <p style={{ margin: '0 0 0.5rem', fontSize: '0.85rem', color: 'var(--color-text-main)', lineHeight: 1.55 }}>
                    {rec.body}
                  </p>
                  <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', fontFamily: 'monospace' }}>
                    <strong>Trigger Condition:</strong> {rec.trigger}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SIMULATOR */}
      {activeTab === 'simulator' && (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Controls Bar */}
          <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '14px', padding: '1.5rem' }}>
            <h3 style={{ margin: '0 0 0.4rem', fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-text-main)' }}>
              1. Select Supply Chain &amp; Compose Hypothetical Headline
            </h3>
            <p style={{ margin: '0 0 1.25rem', fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
              Add terms from the actual GDELT media scoring lexicon. The engine calculates the raw score, applies the normalization $z$-score, and routes the disruption into the NARDL response curve.
            </p>

            {/* Chain Selector */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '5px' }}>
                Target Market &amp; Variety Chain
              </label>
              <select
                value={simChainId}
                onChange={e => { setSimChainId(e.target.value); setManualOverride(null); }}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  border: '1px solid var(--color-border)',
                  background: 'var(--color-bg)',
                  color: 'var(--color-text-main)',
                  fontWeight: 600,
                  fontSize: '0.88rem'
                }}
              >
                {CHAINS_DATA.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.market} {c.variety} Grade {c.grade} (Vulnerability Rank #{c.rank})
                  </option>
                ))}
              </select>
            </div>

            {/* Lexicon Term Selectors */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
              {/* Disruption Terms */}
              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, textTransform: 'uppercase', color: '#dc2626', marginBottom: '5px' }}>
                  Add Disruption Term (+)
                </label>
                <select
                  onChange={e => { handleAddTerm(e.target.value, 'disruption'); e.target.value = ''; }}
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    border: '1px solid var(--color-border)',
                    background: 'var(--color-bg)',
                    color: 'var(--color-text-main)',
                    fontSize: '0.82rem'
                  }}
                >
                  <option value="">— Select Disruption Term —</option>
                  {Object.entries(LEXICON_DATA.categories.disruption_terms).map(([term, w]) => (
                    <option key={term} value={term}>{term} (+{w})</option>
                  ))}
                </select>
              </div>

              {/* Mitigation Terms */}
              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, textTransform: 'uppercase', color: '#16a34a', marginBottom: '5px' }}>
                  Add Mitigation Term (−)
                </label>
                <select
                  onChange={e => { handleAddTerm(e.target.value, 'mitigation'); e.target.value = ''; }}
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    border: '1px solid var(--color-border)',
                    background: 'var(--color-bg)',
                    color: 'var(--color-text-main)',
                    fontSize: '0.82rem'
                  }}
                >
                  <option value="">— Select Mitigation Term —</option>
                  {Object.entries(LEXICON_DATA.categories.mitigation_terms).map(([term, w]) => (
                    <option key={term} value={term}>{term} ({w})</option>
                  ))}
                </select>
              </div>

              {/* Commodity Terms */}
              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, textTransform: 'uppercase', color: '#2563eb', marginBottom: '5px' }}>
                  Add Commodity Context Term
                </label>
                <select
                  onChange={e => { handleAddTerm(e.target.value, 'commodity'); e.target.value = ''; }}
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    border: '1px solid var(--color-border)',
                    background: 'var(--color-bg)',
                    color: 'var(--color-text-main)',
                    fontSize: '0.82rem'
                  }}
                >
                  <option value="">— Select Corridor Context —</option>
                  {Object.entries(LEXICON_DATA.categories.commodity_terms).map(([term, w]) => (
                    <option key={term} value={term}>{term} ({w})</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Active Chips */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.74rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>
                  Active Composed Lexicon Tokens ({Object.keys(selectedTerms).length}):
                </span>
                {Object.keys(selectedTerms).length > 0 && (
                  <button 
                    onClick={handleClearTerms} 
                    style={{ background: 'none', border: 'none', color: '#dc2626', fontSize: '0.74rem', fontWeight: 700, cursor: 'pointer' }}
                  >
                    Clear All
                  </button>
                )}
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', minHeight: '34px', background: 'var(--color-bg)', padding: '8px', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                {Object.keys(selectedTerms).length === 0 ? (
                  <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
                    No terms selected yet. Choose terms from the dropdowns above to build a hypothetical media dispatch.
                  </span>
                ) : (
                  Object.entries(selectedTerms).map(([term, cat]) => {
                    const bg = cat === 'disruption' ? '#fee2e2' : cat === 'mitigation' ? '#dcfce7' : '#dbeafe';
                    const color = cat === 'disruption' ? '#dc2626' : cat === 'mitigation' ? '#16a34a' : '#2563eb';
                    return (
                      <span
                        key={term}
                        style={{
                          background: bg,
                          color: color,
                          border: `1px solid ${color}40`,
                          borderRadius: '6px',
                          padding: '3px 8px',
                          fontSize: '0.74rem',
                          fontWeight: 700,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px'
                        }}
                      >
                        {term}
                        <button
                          onClick={() => handleRemoveTerm(term)}
                          style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0, fontSize: '0.85rem', lineHeight: 1 }}
                        >
                          &times;
                        </button>
                      </span>
                    );
                  })
                )}
              </div>
            </div>

            {/* Composed Headline Banner */}
            {Object.keys(selectedTerms).length > 0 && (
              <div style={{ padding: '0.75rem 1rem', background: 'var(--color-bg)', borderLeft: '3px solid var(--color-primary)', borderRadius: '6px', fontSize: '0.84rem', fontStyle: 'italic', color: 'var(--color-text-main)', marginBottom: '1.25rem' }}>
                &ldquo;{Object.keys(selectedTerms).join(' &bull; ')}&rdquo;
              </div>
            )}

            {/* GDELT Console / Live Score Log */}
            <div style={{
              background: '#090d16',
              color: '#4ade80',
              fontFamily: 'monospace',
              fontSize: '0.78rem',
              padding: '1rem',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.1)',
              lineHeight: 1.6
            }}>
              <div style={{ color: '#94a3b8', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '4px', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Terminal size={13} /> GDELT PIPELINE PARSER OUTPUT
              </div>
              {scoreResult ? (
                <>
                  <div>&gt; disruption_score: {scoreResult.disruption_score.toFixed(2)}</div>
                  <div>&gt; mitigation_score: {scoreResult.mitigation_score.toFixed(2)}</div>
                  <div>&gt; commodity_score:  {scoreResult.commodity_score.toFixed(2)} ({scoreResult.has_commodity_context ? "VALID CONTEXT" : "MISSING CONTEXT"})</div>
                  <div>&gt; score_raw (clip &plusmn;30): {scoreResult.score_raw.toFixed(2)}</div>
                  <div>&gt; passes_min_threshold: {scoreResult.is_index_article ? "TRUE (|score| >= 1.0)" : "FALSE"}</div>
                  <div style={{ color: scoreResult.qualifies_for_index ? '#4ade80' : '#f87171', fontWeight: 800 }}>
                    &gt; implied_nascdi: {scoreResult.implied_daily_nascdi ? scoreResult.implied_daily_nascdi.toFixed(2) : "N/A"} [{scoreResult.percentile_band}]
                  </div>
                  <div style={{ color: '#94a3b8', fontStyle: 'italic' }}>&gt; note: {scoreResult.note}</div>
                </>
              ) : (
                <div style={{ color: '#94a3b8' }}>Select terms above to inspect live pipeline evaluation.</div>
              )}
            </div>
          </div>

          {/* NARDL Response Curve Panel */}
          <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '14px', padding: '1.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
              <div>
                <h3 style={{ margin: '0 0 0.25rem', fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-text-main)' }}>
                  2. Econometric NARDL Dynamic Multiplier Projection
                </h3>
                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                  $\Delta y(h) = \beta \cdot (1 - (1 + \phi)^h)$ &middot; Projected wholesale producer log-price adjustment path over 20 weeks
                </p>
              </div>

              {manualOverride && (
                <button
                  onClick={() => setManualOverride(null)}
                  style={{
                    background: 'var(--color-bg)',
                    border: '1px solid var(--color-border)',
                    padding: '5px 10px',
                    borderRadius: '6px',
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <RotateCcw size={12} /> Resync to Lexicon
                </button>
              )}
            </div>

            {/* Shock Parameters Summary Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '0.75rem 1rem' }}>
                <div style={{ fontSize: '0.68rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Shock Direction</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: derivedShock.type === 'pos' ? '#dc2626' : '#16a34a' }}>
                  {derivedShock.type === 'pos' ? 'Intensification (NASCDI⁺)' : 'Mitigation (NASCDI⁻)'}
                </div>
              </div>

              <div style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '0.75rem 1rem' }}>
                <div style={{ fontSize: '0.68rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Shock Amplitude</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, fontFamily: 'monospace' }}>
                  {derivedShock.size.toFixed(2)} pts
                </div>
              </div>

              <div style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '0.75rem 1rem' }}>
                <div style={{ fontSize: '0.68rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Error-Correction Speed ($\phi$)</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, fontFamily: 'monospace' }}>
                  {simChain.ect.toFixed(4)}
                </div>
              </div>

              <div style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '0.75rem 1rem' }}>
                <div style={{ fontSize: '0.68rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Projected Effect @ 20wk</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, fontFamily: 'monospace', color: finalPriceEffect < 0 ? '#dc2626' : '#16a34a' }}>
                  {finalPriceEffect >= 0 ? "+" : ""}{finalPriceEffect.toFixed(2)}%
                </div>
              </div>
            </div>

            {/* SVG Chart */}
            <ResponseChart
              path={dynamicPath}
              color={derivedShock.type === 'pos' ? '#dc2626' : '#16a34a'}
              label={`${simChain.market} ${simChain.variety} Grade ${simChain.grade} — ${derivedShock.type === 'pos' ? 'Intensification' : 'Mitigation'} Shock`}
            />
          </div>

          {/* Triggered Policy Directives Panel */}
          <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '14px', padding: '1.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
              <ShieldAlert size={22} color={tierColors[simTier]} />
              <div>
                <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-text-main)' }}>
                  3. Simulated Policy Directives Under This Shock
                </h3>
                <div style={{ fontSize: '0.76rem', color: 'var(--color-text-muted)' }}>
                  Triggered Tier: <strong style={{ color: tierColors[simTier], textTransform: 'uppercase' }}>{simTier}</strong> &middot; {scoreResult?.percentile_band || "Baseline"}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {buildRecommendations(simChain, simTier, { simulated: true }).map((rec, i) => (
                <div 
                  key={i}
                  style={{
                    background: 'var(--color-bg)',
                    border: '1px solid var(--color-border)',
                    borderLeft: `4px solid ${tierColors[simTier]}`,
                    borderRadius: '8px',
                    padding: '1rem 1.25rem'
                  }}
                >
                  <div style={{ fontSize: '0.7rem', fontWeight: 800, color: tierColors[simTier], letterSpacing: '0.05em', marginBottom: '4px' }}>
                    § {rec.section} &middot; SCENARIO SIMULATION
                  </div>
                  <h4 style={{ margin: '0 0 0.35rem', fontSize: '0.98rem', fontWeight: 800, color: 'var(--color-text-main)' }}>
                    {rec.title}
                  </h4>
                  <p style={{ margin: '0 0 0.5rem', fontSize: '0.85rem', color: 'var(--color-text-main)', lineHeight: 1.55 }}>
                    {rec.body}
                  </p>
                  <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', fontFamily: 'monospace' }}>
                    <strong>Trigger:</strong> {rec.trigger}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: METHODOLOGY & TEAM */}
      {activeTab === 'about' && (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '14px', padding: '1.75rem' }}>
            <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-text-main)' }}>
              About the Project &amp; Research Mandate
            </h3>
            <p style={{ margin: '0 0 1rem', fontSize: '0.88rem', color: 'var(--color-text-main)', lineHeight: 1.65 }}>
              Kashmir’s apple sector moves nearly all of its output through a single overland corridor, National Highway 44 (NH-44), to reach national markets across India. This research programme builds the <strong>Nonlinear Asymmetric Supply-Chain Disruption Index (NASCDI)</strong> from GDELT news metadata, and models its transmission into wholesale producer prices using <strong>Nonlinear ARDL (NARDL) error-correction models</strong> across eight producer–market–variety–grade chains.
            </p>
            <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.65 }}>
              This interactive dashboard translates complex spatial econometric and media-intelligence research into an accessible, policy-facing tool designed to support growers, transport federations, and agricultural decision-makers.
            </p>
          </div>

          {/* Research Authors */}
          <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '14px', padding: '1.75rem' }}>
            <h3 style={{ margin: '0 0 1rem', fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-text-main)' }}>
              Research Team &amp; Authors
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
              {[
                { name: "Masroor Majid", role: "Corresponding Author", aff: "IBPR, SKUAST-Kashmir, Shalimar" },
                { name: "Prof. Farhet A. Shaheen", role: "Corresponding Author & PI", aff: "Professor cum Chief Scientist, IBPR, SKUAST-K" },
                { name: "Aqib Gul", role: "Co-Author", aff: "Research Scholar, IBPR, SKUAST-K" },
                { name: "Prof. S. H. Baba", role: "Co-Author & Co-PI", aff: "Professor & Head, IBPR, SKUAST-K" },
                { name: "Abid Sultan", role: "Co-Author", aff: "Assistant Professor, IBPR, SKUAST-K" },
                { name: "Aiman Fayaz", role: "Co-Author", aff: "Research Scholar, IBPR, SKUAST-K" },
                { name: "Mudasir Rashid", role: "Co-Author", aff: "Research Scholar, IBPR, SKUAST-K" }
              ].map((m, i) => (
                <div key={i} style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: '10px', padding: '1rem' }}>
                  <div style={{ fontSize: '0.96rem', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '2px' }}>{m.name}</div>
                  <div style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '4px' }}>{m.role}</div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--color-text-muted)' }}>{m.aff}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Methodology & Transparency */}
          <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '14px', padding: '1.75rem' }}>
            <h3 style={{ margin: '0 0 1rem', fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-text-main)' }}>
              Econometric Formulation &amp; Data Transparency
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '1rem' }}>
                <strong style={{ fontSize: '0.86rem', color: 'var(--color-text-main)' }}>Nonlinear ARDL Model Specification:</strong>
                <p style={{ margin: '6px 0 0', fontSize: '0.82rem', color: 'var(--color-text-muted)', lineHeight: 1.55 }}>
                  <code style={{ display: 'block', background: 'var(--color-surface)', border: '1px solid var(--color-border)', padding: '10px 14px', borderRadius: '6px', margin: '8px 0', overflowX: 'auto', fontFamily: 'monospace', color: 'var(--color-primary)', fontSize: '0.78rem' }}>
                    Δln(P_t) = α + φ [ ln(P_t-1) − θ⁺ NASCDI⁺_t-1 − θ⁻ NASCDI⁻_t-1 ] + Σ γ_i Δln(P_t-i) + Σ (π⁺_j ΔNASCDI⁺_t-j + π⁻_j ΔNASCDI⁻_t-j) + ε_t
                  </code>
                  Captures partial sum decompositions for positive (NASCDI⁺) and negative (NASCDI⁻) disruption shocks to test asymmetric response speeds.
                </p>
              </div>

              <div style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '1rem' }}>
                <strong style={{ fontSize: '0.86rem', color: 'var(--color-text-main)' }}>GDELT Metadata Lexicon Verification:</strong>
                <p style={{ margin: '4px 0 0', fontSize: '0.8rem', color: 'var(--color-text-muted)', lineHeight: 1.55 }}>
                  Scores articles from the GDELT Global Knowledge Graph using hand-curated vocabulary spanning 3 categories. Normalized via standard historical sample mean ($\mu = 2.3951$) and standard deviation ($\sigma = 3.4279$).
                </p>
              </div>

              <div style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '1rem' }}>
                <strong style={{ fontSize: '0.86rem', color: 'var(--color-text-main)' }}>Research Scope &amp; Advisory Boundary:</strong>
                <p style={{ margin: '4px 0 0', fontSize: '0.8rem', color: 'var(--color-text-muted)', lineHeight: 1.55 }}>
                  Source tables: <code>table_7_vulnerability_index_recomputed.csv</code>, <code>config/lexicon_news.yaml</code>, and <code>nascdi_daily.csv</code>. The engine illustrates relative vulnerability and dynamic responses; it does not produce speculative monetary welfare claims or an actuarially finalized insurance product.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default CorridorDisruption;
