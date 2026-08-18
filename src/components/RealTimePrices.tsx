import React, { useEffect, useState, useRef } from 'react';

interface PriceItem {
  market: string;
  fruit: string;
  variety: string;
  grade: string;
  modal_price: number;
  min_price: number;
  max_price: number;
  arrival_qty: number;
  transaction_volume: number;
  stock: number;
  demand: string;
  supply: string;
  weather: string;
  submission_date: string;
}

const RealTimePrices: React.FC = () => {
  const [chartjsLoaded, setChartjsLoaded] = useState(false);
  const [items, setItems] = useState<PriceItem[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<any>(null);

  // Load Chart.js dynamically
  useEffect(() => {
    if ((window as any).Chart) {
      setChartjsLoaded(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js';
    script.onload = () => setChartjsLoaded(true);
    script.onerror = () => {
      setErrorMsg('Chart.js failed to load.');
      setLoading(false);
    };
    document.head.appendChild(script);
  }, []);

  // Fetch prices data
  useEffect(() => {
    const API_URL = 'https://micmandis.onrender.com/latest-prices';
    const PROXY = 'https://api.allorigins.win/raw?url=' + encodeURIComponent(API_URL);

    const fetchJson = async (url: string): Promise<PriceItem[]> => {
      const res = await fetch(url, { mode: 'cors' });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const data = await res.json();
      if (!Array.isArray(data)) throw new Error('Invalid JSON format');
      return data as PriceItem[];
    };

    const loadData = async () => {
      try {
        const data = await fetchJson(API_URL);
        return data;
      } catch {
        const data = await fetchJson(PROXY);
        return data;
      }
    };

    loadData()
      .then(data => {
        // Deduplicate unique latest records by market|fruit|variety|grade
        const map: Record<string, { item: PriceItem; ts: number }> = {};
        data.forEach(item => {
          const key = [item.market, item.fruit, item.variety, item.grade].join('|');
          const ts = new Date(item.submission_date).getTime();
          if (!map[key] || ts > map[key].ts) {
            map[key] = { item, ts };
          }
        });
        const deduped = Object.values(map).map(v => v.item);
        setItems(deduped);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setErrorMsg(err.message);
        setLoading(false);
      });
  }, []);

  // Helper to render emojis on canvas for Chart.js pointStyle
  const emojiCanvas = (fruit: string) => {
    const icons: Record<string, string> = { Apple: '🍎', Cherry: '🍒', Plum: '🍑', Peach: '🍑', Pear: '🍐' };
    const e = icons[fruit] || '●';
    const size = 24;
    const c = document.createElement('canvas');
    c.width = size;
    c.height = size;
    const cx = c.getContext('2d');
    if (cx) {
      cx.font = '20px serif';
      cx.textAlign = 'center';
      cx.textBaseline = 'middle';
      cx.fillText(e, size / 2, size / 2);
    }
    return c;
  };

  // Redraw chart when Chart.js or items load
  useEffect(() => {
    if (!chartjsLoaded || !canvasRef.current || items.length === 0) return;

    const Chart = (window as any).Chart;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const tsArr = items.map(i => new Date(i.submission_date).getTime());
    const dates = Array.from(new Set(tsArr)).sort((a, b) => a - b);
    const labels = dates.map(t => new Date(t).toLocaleDateString());

    const datasets = items.map(item => {
      const ts = new Date(item.submission_date).getTime();
      const data = dates.map(t => (t === ts ? item.modal_price : null));
      return {
        label: item.market + ' › ' + item.fruit + ' ' + item.variety + ' [' + item.grade + ']',
        data,
        pointStyle: emojiCanvas(item.fruit),
        pointRadius: 12,
        showLine: false,
        backgroundColor: 'rgba(27, 110, 46, 0.6)',
        borderColor: '#1b6e2e'
      };
    });

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(ctx, {
      type: 'line',
      data: { labels, datasets },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          x: {
            type: 'category',
            title: { display: true, text: 'Date', color: '#1b6e2e', font: { weight: 'bold', size: 14 } },
            ticks: { color: '#1b6e2e' }
          },
          y: {
            title: { display: true, text: 'Modal Price (₹)', color: '#e67e22', font: { weight: 'bold', size: 14 } },
            ticks: { color: '#e67e22' }
          }
        },
        elements: { line: { tension: 0, borderWidth: 0 } }
      }
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [chartjsLoaded, items]);

  // Group items by local date string
  const groupedItems = items.reduce((acc: Record<string, PriceItem[]>, i) => {
    const d = new Date(i.submission_date).toLocaleDateString();
    (acc[d] = acc[d] || []).push(i);
    return acc;
  }, {});

  const sortedDates = Object.keys(groupedItems).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
  
  // Theme aligned colors for group headers (forest greens, rich ambers, deep slate)
  const colors = ['#1b6e2e', '#e67e22', '#009688', '#8e44ad', '#c0392b'];

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="container">
        <div id="latest-prices" className="lmw-container animate-fade-in">
          <h2 className="lmw-title">Real Time Market Prices (₹/kg)</h2>
          
          {loading ? (
            <div style={{ minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div className="loader-ring" />
            </div>
          ) : (
            <>
              <canvas ref={canvasRef} id="priceChart" className="lmw-chart"></canvas>
              
              {errorMsg && (
                <div id="lmw-error" className="lmw-error">
                  {errorMsg}
                </div>
              )}

              <div id="lmw-items" className="lmw-items">
                {sortedDates.map((date, idx) => {
                  const c = colors[idx % colors.length];
                  return (
                    <div key={date} className="lmw-date-group">
                      <div className="lmw-date-heading" style={{ color: c }}>
                        {date}
                      </div>
                      <div className="lmw-tiles">
                        {groupedItems[date].map((it, itemIdx) => {
                          const fruitIcons: Record<string, string> = { Apple: '🍎', Cherry: '🍒', Plum: '🍑', Peach: '🍑', Pear: '🍐' };
                          const emoji = fruitIcons[it.fruit] || '●';
                          return (
                            <div key={itemIdx} className="lmw-item" style={{ borderLeftColor: c }}>
                              <div className="lmw-field" style={{ color: 'var(--color-primary-light)' }}>
                                <span className="label">Market:</span> {it.market}
                              </div>
                              <div className="lmw-field" style={{ color: 'var(--color-primary-light)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                <span className="label">Fruit & Variety:</span> 
                                <span>{emoji} {it.variety}</span>
                              </div>
                              <div className="lmw-field" style={{ color: 'var(--color-text-main)' }}>
                                <span className="label">Grade:</span> {it.grade}
                              </div>
                              <div className="lmw-field" style={{ color: 'var(--color-accent)' }}>
                                <span className="label">Modal Price:</span> ₹{it.modal_price}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        #latest-prices, #latest-prices * { 
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
          font-weight: 700 !important; 
        }
        .lmw-container { 
          width: 100%; 
          max-width: none; 
          margin: 0 auto; 
          padding: 2em; 
          background: var(--color-surface); 
          border-radius: var(--radius-lg); 
          border: 1px solid var(--color-border);
          box-shadow: var(--shadow-md); 
          color: var(--color-text-main); 
        }
        .lmw-title { 
          text-align: center; 
          font-size: 1.75em; 
          color: var(--color-primary); 
          margin-bottom: 1em; 
        }
        .lmw-chart { 
          width: 100%; 
          height: 300px; 
          margin-bottom: 2.5em; 
          background-color: var(--color-primary-pale); 
          border-radius: var(--radius-lg); 
          border: 1px solid var(--color-border);
        }
        .lmw-date-group { 
          margin-bottom: 2em; 
        }
        .lmw-date-heading { 
          font-size: 1.25em; 
          font-weight: 800; 
          margin: 1em 0 0.5em; 
        }
        .lmw-items { 
          max-height: 400px; 
          overflow-y: auto; 
          padding-right: 0.5rem;
        }
        .lmw-tiles { 
          display: grid; 
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); 
          gap: 1.25em; 
        }
        .lmw-item { 
          background: var(--color-primary-pale); 
          padding: 1.25em; 
          border-radius: var(--radius-md); 
          border: 1px solid var(--color-border);
          border-left: 5px solid; 
          transition: transform 0.2s ease;
        }
        .lmw-item:hover {
          transform: translateY(-2px);
        }
        .lmw-field { 
          margin: 0.35em 0; 
          font-size: 0.92em; 
        }
        .lmw-field .label { 
          font-weight: 800 !important; 
          color: var(--color-text-muted); 
        }
        .lmw-error { 
          color: var(--color-accent); 
          text-align: center; 
          margin-top: 1em; 
          font-size: 1em; 
        }
        
        .loader-ring {
          width: 50px;
          height: 50px;
          border: 4px solid var(--color-primary-pale);
          border-top: 4px solid var(--color-primary);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      ` }} />
    </section>
  );
};

export default RealTimePrices;
