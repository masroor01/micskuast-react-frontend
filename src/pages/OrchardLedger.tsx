import React, { useState, useEffect, useRef } from 'react';

// Data constants
const YEARS = [2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023];

const SERIES: Record<string, number[]> = {
  Apple: [1093.28, 1151.34, 1222.18, 1311.85, 1332.81, 1367.81, 1852.41, 1749.23, 1348.16, 1647.69, 1964.98, 1721.34, 1828.52, 1878.95, 2026.47, 1719.42, 1901.85, 2146.35, 2064.32],
  Pear: [40.25, 42.36, 43.09, 45.86, 47.39, 45.82, 52.5, 58.12, 54.85, 73.52, 105.7, 84.11, 97.95, 104.29, 112.96, 77.21, 83.9, 90.02, 90.02],
  Apricot: [11.98, 12.38, 13.15, 12.77, 13.49, 13.98, 15.57, 13.88, 14.5, 17.14, 13.48, 12.82, 16.77, 12.27, 12.31, 11.73, 14.14, 12.56, 12.56],
  Peach: [2.13, 2.24, 2.44, 4.26, 4.4, 4.2, 4.78, 5.88, 4.86, 7.51, 5.6, 5.91, 5.38, 5.22, 4.61, 4.46, 5.02, 8.1, 8.1],
  Plum: [3.71, 4.12, 4.71, 7.81, 8.14, 7.55, 8.6, 10.96, 8.68, 10.81, 10.74, 9.35, 11.48, 13.55, 13.54, 10.31, 11.79, 18.69, 18.69],
  Cherry: [7.37, 8.45, 8.73, 10.63, 10.57, 10.9, 11.45, 11.47, 11.13, 13.46, 10.24, 8.28, 8.96, 9.62, 10.62, 11.01, 11.77, 21.8, 21.8],
  Citrus: [15.16, 1.77, 18.45, 22.48, 26.69, 24.77, 24.7, 21.47, 20.79, 22.57, 33.99, 33.7, 35.12, 35.52, 34.74, 34.17, 36.83, 34.62, 29.49],
  Mango: [13.29, 17.39, 17.58, 12.23, 15.48, 16.41, 21.75, 15.35, 23.1, 6.99, 23.78, 21.21, 30.35, 33.68, 30.85, 29.51, 29.43, 30.67, 30.81],
  Ber: [12.8, 16.84, 18.29, 12.23, 15.48, 16.41, 12.76, 13.07, 13.2, 13.43, 10.87, 9.63, 10.3, 10.6, 10.43, 9.95, 9.8, 10.23, 10.43],
  Walnut: [100.6, 108.27, 114.93, 146.78, 149.14, 154.28, 163.74, 224.6, 209.05, 220.59, 269.54, 265.96, 264.58, 281.68, 272.28, 268.71, 269.27, 303.81, 307.11],
  Almond: [13.47, 14.33, 15.18, 11.26, 12.04, 12.52, 12.51, 3.74, 8.21, 11.82, 9.84, 10.16, 9.58, 9.4, 8.57, 10.57, 9.81, 11.31, 11.21]
};

const EXTRA_YEAR = { year: 2024, crop: 'Apple', value: 2056.00, note: 'provisional' };

const AREA_BY_CROP: Record<string, number> = {
  Apple: 1.7214196, Pear: 0.1432686, Apricot: 0.0403776, Peach: 0.0263557, Plum: 0.0466105, Cherry: 0.0296271, Citrus: 0.1494322, Mango: 0.1423695, Ber: 0.1739935, Walnut: 0.8643898, Almond: 0.0538664
};

const TOP_DISTRICT_BY_CROP: Record<string, string> = {
  Apple: 'Baramulla', Pear: 'Budgam', Apricot: 'Anantnag', Peach: 'Ganderbal', Plum: 'Budgam', Cherry: 'Ganderbal', Citrus: 'Baramulla', Mango: 'Srinagar', Ber: 'Ganderbal', Walnut: 'Anantnag', Almond: 'Pulwama'
};

interface CategoryInfo {
  label: string;
  color: string;
  crops: string[];
}

const CATS: Record<string, CategoryInfo> = {
  Pome: { label: 'Temperate Pome', color: '#b23a2e', crops: ['Apple', 'Pear'] },
  Stone: { label: 'Stone Fruit', color: '#c98a2b', crops: ['Apricot', 'Peach', 'Plum', 'Cherry'] },
  Nut: { label: 'Dry Fruit / Nut', color: '#6b4226', crops: ['Walnut', 'Almond'] },
  Subtrop: { label: 'Sub-tropical', color: '#3f6b4a', crops: ['Citrus', 'Mango', 'Ber'] }
};

const cropColor: Record<string, string> = {
  Apple: '#b23a2e', Pear: '#8a9a52', Apricot: '#e08e31', Peach: '#e2a06a',
  Plum: '#6a4a78', Cherry: '#9e1b32', Citrus: '#d9a62e', Mango: '#efb80b',
  Ber: '#8a7a45', Walnut: '#6b4226', Almond: '#c9a66b'
};

const cropNames = Object.keys(SERIES);
const lastYear = YEARS[YEARS.length - 1];

// Forecast helper
function forecastLinear(values: number[], steps = 3) {
  const k = Math.min(6, values.length);
  const y = values.slice(-k);
  const t = Array.from({ length: k }, (_, i) => i);
  const mt = t.reduce((a, b) => a + b, 0) / k;
  const my = y.reduce((a, b) => a + b, 0) / k;
  let num = 0;
  let den = 0;
  for (let i = 0; i < k; i++) {
    num += (t[i] - mt) * (y[i] - my);
    den += (t[i] - mt) * (t[i] - mt);
  }
  const b = den ? num / den : 0;
  const a = my - b * mt;
  const preds: number[] = [];
  for (let j = 0; j < steps; j++) preds.push(Number((a + b * (k + j)).toFixed(2)));
  const rmse = Math.sqrt(y.reduce((ss, yi, i) => ss + Math.pow(yi - (a + b * i), 2), 0) / k) || 0;
  return { preds, sigma: rmse };
}

const OrchardLedger: React.FC = () => {
  const [plotlyLoaded, setPlotlyLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'data'>('overview');
  const [activeView, setActiveView] = useState<'trend' | 'race' | 'bubble' | 'share' | 'growth' | 'info'>('trend');
  const [activeCrops, setActiveCrops] = useState<Set<string>>(() => new Set(cropNames));

  // Race animation states
  const [raceFrameIdx, setRaceFrameIdx] = useState(0);
  const [racePlaying, setRacePlaying] = useState(false);
  const animationTimerRef = useRef<number | null>(null);

  const chartRef = useRef<HTMLDivElement>(null);

  // Dynamic script loader for Plotly
  useEffect(() => {
    if ((window as any).Plotly) {
      setPlotlyLoaded(true);
      return;
    }

    const sources = [
      'https://cdn.jsdelivr.net/npm/plotly.js-dist-min@2.35.2/plotly.min.js',
      'https://cdn.plot.ly/plotly-2.35.2.min.js',
      'https://unpkg.com/plotly.js-dist-min@2.35.2/plotly.min.js'
    ];

    let i = 0;
    const loadScript = () => {
      if (i >= sources.length) {
        console.error('Plotly failed to load.');
        return;
      }
      const script = document.createElement('script');
      script.src = sources[i];
      script.onload = () => setPlotlyLoaded(true);
      script.onerror = () => {
        i++;
        loadScript();
      };
      document.head.appendChild(script);
    };

    loadScript();

    return () => {
      if (animationTimerRef.current) {
        clearInterval(animationTimerRef.current);
      }
    };
  }, []);

  const toggleCrop = (name: string) => {
    const next = new Set(activeCrops);
    if (next.has(name)) {
      next.delete(name);
    } else {
      next.add(name);
    }
    setActiveCrops(next);
  };

  const resetCrops = () => {
    setActiveCrops(new Set(cropNames));
  };

  // Helper colors
  const hexA = (hex: string, a: number) => {
    try {
      const h = hex.replace('#', '');
      const r = parseInt(h.slice(0, 2), 16);
      const g = parseInt(h.slice(2, 4), 16);
      const b = parseInt(h.slice(4, 6), 16);
      return `rgba(${r},${g},${b},${a})`;
    } catch {
      return `rgba(178,58,46,${a})`;
    }
  };

  const getActive = () => cropNames.filter(c => activeCrops.has(c));

  // Plotly chart renderer
  const renderChart = () => {
    if (!plotlyLoaded || !chartRef.current || activeTab !== 'overview' || activeView === 'info') return;

    const Plotly = (window as any).Plotly;
    const active = getActive();

    // Chart configurations based on active theme
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const isWarm = document.documentElement.getAttribute('data-theme') === 'warm';
    
    let paperBg = '#ffffff';
    let plotBg = '#ffffff';
    let fontColor = '#24211a';
    
    if (isDark) {
      paperBg = '#1c1f26';
      plotBg = '#1c1f26';
      fontColor = '#e2e8f0';
    } else if (isWarm) {
      paperBg = '#f7f1e3';
      plotBg = '#f7f1e3';
      fontColor = '#2d241c';
    }

    const baseLayout = (extra: any) => ({
      margin: { l: 60, r: 24, t: 10, b: 44 },
      legend: { orientation: 'h', y: -0.18, font: { family: 'IBM Plex Sans', size: 11, color: fontColor } },
      hovermode: 'closest',
      plot_bgcolor: plotBg,
      paper_bgcolor: paperBg,
      font: { family: 'IBM Plex Sans', color: fontColor, size: 12 },
      colorway: cropNames.map(c => cropColor[c]),
      ...extra
    });

    const plotlyConfig = { responsive: true, displaylogo: false, modeBarButtonsToRemove: ['lasso2d', 'select2d'] };

    if (activeView === 'trend') {
      const traces: any[] = [];
      active.forEach(name => {
        const color = cropColor[name];
        const hist = SERIES[name];
        traces.push({
          x: YEARS, y: hist, mode: 'lines+markers', name, legendgroup: name,
          line: { color, width: 2 }, marker: { size: 4 },
          hovertemplate: '%{x}: %{y:.2f} MT<extra>' + name + '</extra>'
        });
        const res = forecastLinear(hist, 3);
        const fcYears = [lastYear, lastYear + 1, lastYear + 2, lastYear + 3];
        const lastActual = hist[hist.length - 1];
        const predExt = [lastActual].concat(res.preds);
        const lower = [lastActual].concat(res.preds.map(v => Number((v - 1.96 * res.sigma).toFixed(2))));
        const upper = [lastActual].concat(res.preds.map(v => Number((v + 1.96 * res.sigma).toFixed(2))));
        
        traces.push({ x: fcYears, y: lower, mode: 'lines', line: { color, width: 0 }, showlegend: false, hoverinfo: 'skip', legendgroup: name });
        traces.push({ x: fcYears, y: upper, mode: 'lines', line: { color, width: 0 }, fill: 'tonexty', fillcolor: hexA(color, 0.15), showlegend: false, hoverinfo: 'skip', legendgroup: name });
        traces.push({
          x: fcYears, y: predExt, mode: 'lines+markers', name: name + ' (fcst)', legendgroup: name, showlegend: false,
          line: { color, width: 2, dash: 'dash' }, hovertemplate: '%{x}: %{y:.2f} MT (forecast)<extra>' + name + '</extra>'
        });
      });

      if (active.includes('Apple')) {
        traces.push({
          x: [2024], y: [EXTRA_YEAR.value], mode: 'markers', name: 'Apple 2024-25 (prov.)',
          marker: { color: '#b23a2e', size: 10, symbol: 'diamond', line: { color: '#fff', width: 1.5 } },
          hovertemplate: '2024-25 (provisional): %{y:.2f} MT<extra>Apple</extra>', showlegend: true
        });
      }

      Plotly.newPlot(chartRef.current, traces, baseLayout({ xaxis: { title: 'Year', range: [YEARS[0] - 0.5, lastYear + 3.5] }, yaxis: { title: "'000 MT" } }), plotlyConfig);
    } else if (activeView === 'race') {
      const getRaceFrame = (yearIdx: number) => {
        const rows = active.map(c => ({ name: c, v: SERIES[c][yearIdx] || 0 })).sort((a, b) => a.v - b.v);
        return {
          y: rows.map(r => r.name),
          x: rows.map(r => r.v),
          color: rows.map(r => cropColor[r.name])
        };
      };
      
      const d = getRaceFrame(raceFrameIdx);
      const maxAll = Math.max(...cropNames.map(c => Math.max(...SERIES[c])));
      const trace = {
        x: d.x, y: d.y, type: 'bar', orientation: 'h', marker: { color: d.color },
        text: d.x.map(v => v.toFixed(1)), textposition: 'outside', hovertemplate: '%{y}: %{x:.2f} MT<extra></extra>'
      };

      Plotly.newPlot(chartRef.current, [trace], baseLayout({
        xaxis: { title: "'000 MT", range: [0, maxAll * 1.15] },
        yaxis: { automargin: true },
        margin: { l: 90, r: 30, t: 6, b: 40 }
      }), plotlyConfig);
    } else if (activeView === 'bubble') {
      const idxLatest = YEARS.length - 1;
      const ranked = active.map(c => ({ c, v: SERIES[c][idxLatest] || 0, area: AREA_BY_CROP[c] ?? 1, district: TOP_DISTRICT_BY_CROP[c] ?? c }));
      const maxV = Math.max(...ranked.map(r => r.v)) || 1;
      const sizeref = 2.0 * maxV / (90 * 90);
      const traces = ranked.map(r => ({
        x: [r.area], y: [r.v], name: r.c, mode: 'markers+text', text: [r.district], textposition: 'top center',
        marker: { sizemode: 'area', sizeref, size: [r.v], color: cropColor[r.c], opacity: .9, line: { width: 1, color: '#fff' } },
        hovertemplate: `${r.c}<br>Leading district: ${r.district}<br>Area: %{x} lakh ha<br>Production: %{y:.2f} MT<extra></extra>`
      }));
      const areaTicks = [0.02, 0.05, 0.1, 0.2, 0.5, 1, 2];
      Plotly.newPlot(chartRef.current, traces, baseLayout({
        xaxis: { title: 'Area (lakh ha, log)', type: 'log', tickvals: areaTicks },
        yaxis: { title: "Production ('000 MT, log)", type: 'log' }
      }), plotlyConfig);
    } else if (activeView === 'share') {
      const catKeys = Object.keys(CATS);
      const catTotals: Record<string, number[]> = {};
      catKeys.forEach(k => {
        catTotals[k] = YEARS.map((_, i) => CATS[k].crops.reduce((s, c) => s + (activeCrops.has(c) ? SERIES[c][i] : 0), 0));
      });
      const yearTotals = YEARS.map((_, i) => catKeys.reduce((s, k) => s + catTotals[k][i], 0) || 1);
      const traces = catKeys.map(k => ({
        x: YEARS, y: catTotals[k].map((v, i) => Number((100 * v / yearTotals[i]).toFixed(2))),
        name: CATS[k].label, mode: 'lines', stackgroup: 'one', line: { width: .5, color: CATS[k].color },
        fillcolor: hexA(CATS[k].color, .75),
        hovertemplate: '%{x}: %{y:.1f}%<extra>' + CATS[k].label + '</extra>'
      }));
      Plotly.newPlot(chartRef.current, traces, baseLayout({ xaxis: { title: 'Year' }, yaxis: { title: '% of total output', range: [0, 100], ticksuffix: '%' } }), plotlyConfig);
    } else if (activeView === 'growth') {
      const rows = active.map(name => {
        const s = SERIES[name];
        const yoy = ((s[s.length - 1] - s[s.length - 2]) / s[s.length - 2]) * 100;
        const n = YEARS.length - 1;
        const cagr = (Math.pow(s[s.length - 1] / s[0], 1 / n) - 1) * 100;
        return { name, yoy, cagr };
      }).sort((a, b) => a.cagr - b.cagr);
      const traces = [
        { y: rows.map(r => r.name), x: rows.map(r => Number(r.cagr.toFixed(2))), type: 'bar', orientation: 'h', name: 'CAGR 2004–2023', marker: { color: '#6b4226' }, hovertemplate: '%{y} CAGR: %{x:.2f}%<extra></extra>' },
        { y: rows.map(r => r.name), x: rows.map(r => Number(r.yoy.toFixed(2))), type: 'bar', orientation: 'h', name: 'YoY 2022→2023', marker: { color: rows.map(r => r.yoy >= 0 ? '#3f6b4a' : '#a63b2e') }, hovertemplate: '%{y} YoY: %{x:.2f}%<extra></extra>' }
      ];
      Plotly.newPlot(chartRef.current, traces, baseLayout({
        barmode: 'group', xaxis: { title: '%', zeroline: true, zerolinecolor: '#bbb0' },
        yaxis: { automargin: true }, margin: { l: 90, r: 30, t: 6, b: 40 }
      }), plotlyConfig);
    }
  };

  // Re-draw chart on selection, tab, and theme switches
  useEffect(() => {
    renderChart();
    
    const handleThemeChange = () => {
      renderChart();
    };

    window.addEventListener('theme-changed', handleThemeChange);
    return () => {
      window.removeEventListener('theme-changed', handleThemeChange);
    };
  }, [plotlyLoaded, activeTab, activeView, activeCrops, raceFrameIdx]);

  // Race animation loop control
  const togglePlay = () => {
    if (racePlaying) {
      if (animationTimerRef.current) {
        clearInterval(animationTimerRef.current);
        animationTimerRef.current = null;
      }
      setRacePlaying(false);
    } else {
      setRacePlaying(true);
      animationTimerRef.current = window.setInterval(() => {
        setRaceFrameIdx(prev => {
          const next = prev + 1;
          if (next >= YEARS.length) {
            if (animationTimerRef.current) {
              clearInterval(animationTimerRef.current);
              animationTimerRef.current = null;
            }
            setRacePlaying(false);
            return YEARS.length - 1;
          }
          return next;
        });
      }, 600);
    }
  };

  return (
    <div id="jk-dash" className="container animate-fade-in" style={{ margin: '2rem auto' }}>
      {/* Hero Header */}
      <div className="jkh-hero">
        <p className="jkh-eyebrow">
          <span className="dot"></span>UT of Jammu &amp; Kashmir · Directorate of Horticulture &amp; Digest of Statistics 2023-24
        </p>
        <div className="jkh-hero-grid">
          <div>
            <h3 className="jkh-title">Orchard Ledger — Horticulture Production Trends</h3>
            <p className="jkh-desc">
              Nineteen years of area-production statistics across eleven fruit crops, grouped by temperate pome, stone, dry (nut) and sub-tropical categories, with a 3-year linear projection band.
            </p>
          </div>
          <div className="jkh-hero-stat">
            <div className="k">Apple output · 2024-25 (prov.)</div>
            <div className="v" id="jkhHeroValue">20.56</div>
            <div className="u">lakh MT · UT of J&amp;K</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="jkh-tabs" role="tablist">
        <button 
          onClick={() => setActiveTab('overview')} 
          className={`jkh-tab ${activeTab === 'overview' ? 'is-active' : ''}`}
        >
          Overview
        </button>
        <button 
          onClick={() => setActiveTab('data')} 
          className={`jkh-tab ${activeTab === 'data' ? 'is-active' : ''}`}
        >
          Drilldown Table
        </button>
      </div>

      {/* Shell Body */}
      <div className="jkh-shell">
        <main className="jkh-main">
          {activeTab === 'overview' ? (
            <div id="panel-overview">
              {/* Controls switcher chips */}
              <div className="jkh-viewbar" role="tablist" aria-label="View switcher">
                {[
                  { id: 'trend', label: 'Trend + Forecast' },
                  { id: 'race', label: 'Production Race' },
                  { id: 'bubble', label: 'Area vs Output' },
                  { id: 'share', label: 'Category Share' },
                  { id: 'growth', label: 'Growth & CAGR' },
                  { id: 'info', label: 'Info' }
                ].map(view => (
                  <button
                    key={view.id}
                    onClick={() => {
                      setActiveView(view.id as any);
                      if (racePlaying && animationTimerRef.current) {
                        clearInterval(animationTimerRef.current);
                        animationTimerRef.current = null;
                        setRacePlaying(false);
                      }
                    }}
                    className={`jkh-chip ${activeView === view.id ? 'is-active' : ''}`}
                  >
                    {view.label}
                  </button>
                ))}
              </div>

              {/* Chart canvas wrap */}
              <div className="jkh-canvas-wrap">
                <div className="jkh-panel-title">
                  <h4>
                    {activeView === 'trend' && 'Production trend, with 3-year forecast'}
                    {activeView === 'race' && 'Production race, 2004 → 2023'}
                    {activeView === 'bubble' && 'Area vs. output, 2023 (log–log)'}
                    {activeView === 'share' && 'Category share of total production'}
                    {activeView === 'growth' && 'Latest year-on-year change vs. 2004–2023 CAGR'}
                    {activeView === 'info' && 'About this dashboard'}
                  </h4>
                  <span className="jkh-panel-note">
                    {activeView === 'trend' && "'000 metric tonnes"}
                    {activeView === 'race' && "ranked by '000 MT, animated"}
                    {activeView === 'bubble' && "bubble size = production · labelled with leading district"}
                    {activeView === 'share' && "% of J&K fruit output by category, 2004–2023"}
                    {activeView === 'growth' && "%"}
                  </span>
                </div>

                {activeView === 'info' ? (
                  <div className="jkh-info" id="jkhInfo" style={{ display: 'block', border: 'none', background: 'transparent', padding: 0 }}>
                    <b>How to read this:</b> toggle crops or whole categories in the panel on the right. <b>Trend</b> shows historical output with a dashed 3-year linear projection and a shaded 95% band. <b>Production Race</b> animates a ranked bar chart across all 19 survey years — press play. <b>Area vs Output</b> is a log-log snapshot for the latest year sized by production, labelled with each crop's leading district. <b>Category Share</b> shows how the pome / stone / nut / sub-tropical mix has shifted since 2004. <b>Growth &amp; CAGR</b> compares the latest year-on-year change against the long-run 2004–2023 compound annual growth rate.
                  </div>
                ) : (
                  <>
                    <div ref={chartRef} id="jkhChart" style={{ height: '380px' }} />
                    {activeView === 'race' && (
                      <div className="jkh-race-ctrl" id="jkhRaceCtrl" style={{ display: 'flex' }}>
                        <button onClick={togglePlay} className="jkh-play" aria-label="Play">
                          {racePlaying ? '❚❚' : '▶'}
                        </button>
                        <div className="jkh-race-year">{YEARS[raceFrameIdx]}</div>
                        <input 
                          type="range" 
                          min="0" 
                          max={YEARS.length - 1} 
                          step="1" 
                          value={raceFrameIdx} 
                          onChange={e => setRaceFrameIdx(parseInt(e.target.value, 10))}
                        />
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          ) : (
            <div id="panel-data">
              <div className="jkh-panel-title">
                <h4>Full series, 2004–2024</h4>
                <span className="jkh-panel-note">'000 MT · dash = not surveyed that year</span>
              </div>
              <div className="jkh-tablewrap">
                <table className="jkh-table">
                  <thead>
                    <tr>
                      <th>Year</th>
                      {cropNames.map(c => <th key={c}>{c}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {YEARS.concat([2024]).map(yr => (
                      <tr key={yr}>
                        <td style={{ fontWeight: 700 }}>{yr}</td>
                        {cropNames.map(c => {
                          if (yr === 2024) {
                            return c === 'Apple' ? (
                              <td key={c}>
                                {EXTRA_YEAR.value.toFixed(2)}
                                <span className="jkh-badge">prov.</span>
                              </td>
                            ) : (
                              <td key={c}>—</td>
                            );
                          }
                          const idx = YEARS.indexOf(yr);
                          return <td key={c}>{SERIES[c][idx]?.toFixed(2)}</td>;
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>

        {/* Sidebar Controls (Active Crop Checklist) */}
        <aside className="jkh-side">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <h5 style={{ margin: 0 }}>Crops</h5>
            <button 
              onClick={resetCrops} 
              style={{
                fontFamily: 'var(--jkh-font-mono)',
                fontSize: '10.5px',
                border: '1px solid var(--jkh-line)',
                background: 'var(--color-surface)',
                borderRadius: '6px',
                padding: '3px 7px',
                cursor: 'pointer'
              }}
            >
              Reset
            </button>
          </div>

          {Object.entries(CATS).map(([catKey, cat]) => (
            <div key={catKey} className="jkh-cat-group">
              <div className="jkh-cat-head">
                <span>
                  <span className="jkh-cat-swatch" style={{ backgroundColor: cat.color }} />
                  {cat.label}
                </span>
                <span style={{ fontSize: '10px', color: 'var(--jkh-muted)' }}>{cat.crops.length}</span>
              </div>
              <div className="jkh-cat-body">
                {cat.crops.map(name => (
                  <label key={name} className="jkh-crop-row">
                    <input 
                      type="checkbox" 
                      checked={activeCrops.has(name)} 
                      onChange={() => toggleCrop(name)}
                    />
                    <span className="jkh-crop-dot" style={{ backgroundColor: cropColor[name] }} />
                    <span className="nm">{name}</span>
                    <span className="val">{SERIES[name][SERIES[name].length - 1].toFixed(1)}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}

          <p className="jkh-legend-note">
            Untick a crop to drop it from every view. Category swatches match the Category Share chart.
          </p>
        </aside>
      </div>

      {/* Footer credits */}
      <div className="jkh-foot">
        <span>Source: Digest of Statistics, UT of J&amp;K 2023-24 · Directorate of Horticulture, Kashmir &amp; Jammu. 2024-25 apple figure is a provisional Dept. of Agriculture Production estimate (20.56 LMT), reported to the J&amp;K Legislative Assembly, 2025.</span>
        <span>2014 omitted — not published in the source digest.</span>
      </div>

      {/* Scoped CSS styling with high specificity overrides */}
      <style dangerouslySetInnerHTML={{ __html: `
        #jk-dash, #jk-dash *{box-sizing:border-box}
        #jk-dash{
          --jkh-font-body: 'Plus Jakarta Sans', -apple-system, sans-serif;
          --jkh-font-mono: monospace;
          --jkh-font-display: 'Playfair Display', Georgia, serif;
          --jkh-ink: var(--color-text-main);
          --jkh-parchment: var(--color-bg);
          --jkh-parchment-2: var(--color-surface);
          --jkh-line: var(--color-border);
          --jkh-apple: #b23a2e;
          --jkh-saffron: #e08e31;
          --jkh-walnut: #6b4226;
          --jkh-pine-2: var(--color-primary-pale);
          
          font-family: var(--jkh-font-body);
          color: var(--jkh-ink);
          background: var(--jkh-parchment);
          border: 1px solid var(--jkh-line);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 1px 2px rgba(34,50,41,.06), 0 12px 32px rgba(34,50,41,.08);
          max-width: 100%;
        }

        #jk-dash .jkh-hero{
          background: radial-gradient(140% 180% at 8% 0%, #2c4131 0%, #223229 46%, #1a261f 100%) !important;
          color: #f3efe0 !important;
          padding: 26px 26px 20px;
          position: relative;
        }
        #jk-dash .jkh-hero::after{
          content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 6px;
          background: repeating-linear-gradient(90deg, var(--jkh-apple) 0 26px, var(--jkh-saffron) 26px 52px, var(--jkh-walnut) 52px 78px);
          opacity: .85;
        }
        #jk-dash .jkh-eyebrow{
          font-family: var(--jkh-font-mono); font-size: 11px; letter-spacing: .14em; text-transform: uppercase;
          color: #c9b98a !important; margin: 0 0 10px; display: flex; gap: 10px; align-items: center; flex-wrap: wrap;
        }
        #jk-dash .jkh-eyebrow .dot{ width: 6px; height: 6px; border-radius: 50%; background: var(--jkh-apple); display: inline-block; }
        #jk-dash .jkh-hero-grid{ display: grid; grid-template-columns: 1.3fr auto; gap: 20px; align-items: end; }
        #jk-dash .jkh-title{ font-family: var(--jkh-font-display); font-weight: 600; font-size: 28px; line-height: 1.15; margin: 0 0 8px; letter-spacing: -.01em; color: #ffffff !important; }
        #jk-dash .jkh-desc{ color: #d9d2b8 !important; max-width: 56ch; font-size: 13.5px; line-height: 1.55; margin: 0; }
        #jk-dash .jkh-hero-stat{ text-align: right; }
        #jk-dash .jkh-hero-stat .k{ font-family: var(--jkh-font-mono); font-size: 10.5px; letter-spacing: .1em; text-transform: uppercase; color: #c9b98a !important; }
        #jk-dash .jkh-hero-stat .v{ font-family: var(--jkh-font-display); font-size: 34px; color: #ffffff !important; line-height: 1.05; }
        #jk-dash .jkh-hero-stat .u{ font-family: var(--jkh-font-mono); font-size: 11px; color: #a8b89a !important; }

        #jk-dash .jkh-tabs{ display: flex; gap: 0; padding: 0 14px; background: var(--jkh-pine-2); overflow-x: auto; scrollbar-width: none; }
        #jk-dash .jkh-tabs::-webkit-scrollbar{ display: none; }
        #jk-dash .jkh-tab{
          appearance: none; border: none; background: transparent !important; color: #c9d6c3 !important;
          padding: 12px 16px; font-family: var(--jkh-font-mono); font-size: 12px; letter-spacing: .06em; text-transform: uppercase;
          cursor: pointer; border-bottom: 2px solid transparent; white-space: nowrap; transition: .15s;
        }
        #jk-dash .jkh-tab:hover{ color: #fff !important; }
        #jk-dash .jkh-tab.is-active{ color: #fff !important; border-bottom: 2px solid var(--jkh-apple) !important; }

        .jkh-shell{ display: grid; grid-template-columns: 1fr 280px; gap: 0; }
        .jkh-main{ padding: 18px 20px 22px; border-right: 1px solid var(--jkh-line); }

        .jkh-viewbar{ display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 12px; position: relative; z-index: 5; }
        #jk-dash .jkh-chip{
          border: 1px solid var(--jkh-line) !important; background: var(--jkh-parchment-2) !important; color: var(--jkh-ink) !important;
          font-family: var(--jkh-font-mono); font-size: 11.5px; letter-spacing: .04em; text-transform: uppercase;
          padding: 7px 12px; border-radius: 999px; cursor: pointer; transition: .15s;
        }
        #jk-dash .jkh-chip:hover{ border-color: var(--jkh-apple) !important; color: var(--jkh-apple) !important; }
        #jk-dash .jkh-chip.is-active{ background: var(--jkh-apple) !important; border-color: var(--jkh-apple) !important; color: #fff !important; }

        .jkh-canvas-wrap{ background: var(--jkh-parchment-2); border: 1px solid var(--jkh-line); border-radius: 12px; padding: 12px; position: relative; }
        .jkh-panel-title{ display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6px; gap: 10px; flex-wrap: wrap; }
        .jkh-panel-title h4{ font-family: var(--jkh-font-display); font-size: 16px; margin: 0; font-weight: 600; }
        .jkh-panel-note{ font-size: 11.5px; color: var(--jkh-muted); font-family: var(--jkh-font-mono); }

        .jkh-info{ margin-top: 10px; padding: 10px 12px; background: var(--jkh-parchment-2); border: 1px dashed var(--jkh-line); border-radius: 10px; font-size: 12.5px; color: var(--jkh-ink); line-height: 1.5; }
        .jkh-info b{ color: var(--jkh-apple); }

        .jkh-race-ctrl{ align-items: center; gap: 10px; margin-top: 12px; padding: 10px 12px; background: var(--jkh-parchment-2); border-radius: 10px; border: 1px solid var(--jkh-line); }
        .jkh-play{
          width: 34px; height: 34px; border-radius: 50%; border: none; background: var(--jkh-apple); color: #fff;
          cursor: pointer; font-size: 13px; display: flex; align-items: center; justify-content: center; flex: 0 0 auto;
        }
        .jkh-play:hover{ background: #963025; }
        .jkh-race-year{ font-family: var(--jkh-font-mono); font-weight: 600; font-size: 13px; min-width: 42px; }
        .jkh-race-ctrl input[type=range]{ flex: 1; }

        .jkh-side{ padding: 18px 18px 22px; background: var(--jkh-parchment-2); height: 100%; }
        .jkh-cat-group{ margin-bottom: 10px; border: 1px solid var(--jkh-line); border-radius: 10px; background: var(--jkh-parchment-2); overflow: hidden; }
        .jkh-cat-head{ display: flex; align-items: center; justify-content: space-between; padding: 8px 10px; font-weight: 600; font-size: 12.5px; border-bottom: 1px solid var(--jkh-line); background: var(--jkh-parchment); }
        .jkh-cat-swatch{ width: 9px; height: 9px; border-radius: 2px; display: inline-block; margin-right: 7px; }
        .jkh-cat-body{ padding: 2px 10px 8px; }
        .jkh-crop-row{ display: flex; align-items: center; gap: 7px; padding: 4px 0; font-size: 12.5px; cursor: pointer; }
        .jkh-crop-row input{ accent-color: var(--jkh-apple); }
        .jkh-crop-dot{ width: 8px; height: 8px; border-radius: 50%; flex: 0 0 auto; }
        .jkh-crop-row .nm{ flex: 1; }
        .jkh-crop-row .val{ font-family: var(--jkh-font-mono); font-size: 11px; color: var(--jkh-muted); }

        .jkh-legend-note{ font-size: 11px; color: var(--jkh-muted); line-height: 1.5; margin-top: 8px; }

        .jkh-tablewrap{ overflow-x: auto; margin-top: 2px; }
        table.jkh-table{ width: 100%; border-collapse: collapse; font-size: 12px; font-family: var(--jkh-font-mono); }
        table.jkh-table th, table.jkh-table td{ border: 1px solid var(--jkh-line); padding: 5px 7px; text-align: right; white-space: nowrap; }
        table.jkh-table th:first-child, table.jkh-table td:first-child{ text-align: left; position: sticky; left: 0; background: var(--jkh-parchment); }
        table.jkh-table thead th{ background: var(--jkh-parchment-2); font-weight: 600; }
        table.jkh-table tbody tr:nth-child(even) td{ background: var(--jkh-parchment-2); }
        table.jkh-table tbody tr:nth-child(even) td:first-child{ background: var(--jkh-parchment); }

        .jkh-foot{ padding: 10px 20px; background: var(--jkh-parchment-2); border-top: 1px solid var(--jkh-line); display: flex; justify-content: space-between; gap: 10px; flex-wrap: wrap; font-size: 11px; color: var(--jkh-muted); font-family: var(--jkh-font-mono); }
        .jkh-badge{ display: inline-block; font-family: var(--jkh-font-mono); font-size: 9.5px; letter-spacing: .05em; padding: 2px 6px; border-radius: 5px; background: var(--jkh-saffron); color: #3b2a06; vertical-align: middle; margin-left: 6px; }

        @media (max-width: 920px) {
          .jkh-shell{ grid-template-columns: 1fr; }
          .jkh-main{ border-right: none; }
          .jkh-side{ display: none; }
        }
      ` }} />
    </div>
  );
};

export default OrchardLedger;
