import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AlertTriangle, ShieldAlert, Sparkles, TrendingDown, Info, ShieldCheck } from 'lucide-react';

interface EWSRow {
  market: string;
  grade: string;
  date: string;
  price: number;
  level: 'Normal' | 'Warning' | 'Critical';
  alertRate: string;
  vol: number;
  drawdown: number;
}

const CHERRY_ALERT_DATA: EWSRow[] = [
  { market: 'Aglar (Shopian)', grade: 'Small', date: '2026-06-30', price: 55, level: 'Normal', alertRate: '38.42%', vol: 30.00, drawdown: 0.54 },
  { market: 'Aglar (Shopian)', grade: 'Medium', date: '2026-06-30', price: 80, level: 'Warning', alertRate: '38.14%', vol: 27.94, drawdown: 0.50 },
  { market: 'Aglar (Shopian)', grade: 'Large', date: '2026-06-30', price: 110, level: 'Normal', alertRate: '36.72%', vol: 23.08, drawdown: 0.45 },
  { market: 'Azadpur (Delhi)', grade: 'Super', date: '2026-06-30', price: 170, level: 'Normal', alertRate: '33.19%', vol: 13.02, drawdown: 0.24 },
  { market: 'Parimpore (Srinagar)', grade: 'Small', date: '2026-06-30', price: 100, level: 'Warning', alertRate: '32.69%', vol: 28.06, drawdown: 0.38 },
  { market: 'Parimpore (Srinagar)', grade: 'Large', date: '2026-06-30', price: 140, level: 'Normal', alertRate: '31.87%', vol: 18.68, drawdown: 0.40 },
  { market: 'Azadpur (Delhi)', grade: 'Special', date: '2026-06-30', price: 120, level: 'Normal', alertRate: '31.66%', vol: 20.21, drawdown: 0.30 },
  { market: 'Narwal Jammu', grade: 'Medium', date: '2026-07-15', price: 140, level: 'Critical', alertRate: '31.65%', vol: 23.50, drawdown: 0.38 },
  { market: 'Narwal Jammu', grade: 'Large', date: '2026-07-15', price: 165, level: 'Normal', alertRate: '31.13%', vol: 16.67, drawdown: 0.31 }
];

const APPLE_ALERT_DATA: EWSRow[] = [
  { market: 'Aglar (Shopian)', grade: 'A', date: '2026-11-15', price: 65, level: 'Normal', alertRate: '24.12%', vol: 14.50, drawdown: 0.20 },
  { market: 'Aglar (Shopian)', grade: 'B', date: '2026-11-15', price: 48, level: 'Normal', alertRate: '26.84%', vol: 16.94, drawdown: 0.22 },
  { market: 'Nowpora (Sopore)', grade: 'A', date: '2026-11-20', price: 58, level: 'Warning', alertRate: '28.10%', vol: 19.30, drawdown: 0.25 },
  { market: 'Nowpora (Sopore)', grade: 'B', date: '2026-11-20', price: 42, level: 'Normal', alertRate: '29.40%', vol: 21.05, drawdown: 0.28 },
  { market: 'Azadpur (Delhi)', grade: 'Fancy', date: '2026-12-05', price: 95, level: 'Critical', alertRate: '35.45%', vol: 24.10, drawdown: 0.32 },
  { market: 'Azadpur (Delhi)', grade: 'Special', date: '2026-12-05', price: 80, level: 'Warning', alertRate: '32.12%', vol: 21.80, drawdown: 0.28 },
  { market: 'Narwal Jammu', grade: 'Unknown', date: '2026-12-10', price: 72, level: 'Normal', alertRate: '22.18%', vol: 13.90, drawdown: 0.18 }
];

const EWS: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'cherry';
  
  const [selectedSegment, setSelectedSegment] = useState<EWSRow | null>(null);

  const getAlertBadge = (level: string) => {
    switch (level) {
      case 'Critical':
        return <span className="badge badge-danger">Critical Alert</span>;
      case 'Warning':
        return <span className="badge badge-warning">Warning</span>;
      default:
        return <span className="badge badge-success">Normal</span>;
    }
  };

  const handleTabChange = (tab: string) => {
    setSearchParams({ tab });
    setSelectedSegment(null);
  };

  return (
    <div className="container section-padding animate-fade-in">
      {/* Intro Banner */}
      <div className="ews-intro-banner">
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <ShieldAlert size={36} /> Early Warning System (EWS)
        </h1>
        <p style={{ color: 'hsla(0, 0%, 100%, 0.8)', maxWidth: '800px', fontSize: '1.1rem' }}>
          An instability monitoring engine detecting price anomalies, volatility spikes, and drawdown regimes across regional Kashmiri stone and pome fruits.
        </p>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="market-tabs">
        <button
          onClick={() => handleTabChange('cherry')}
          className={`market-tab-btn ${activeTab === 'cherry' ? 'active' : ''}`}
        >
          🍒 Cherry EWS (Demo 2026)
        </button>
        <button
          onClick={() => handleTabChange('apple')}
          className={`market-tab-btn ${activeTab === 'apple' ? 'active' : ''}`}
        >
          🍏 Apple EWS (Demo 2026)
        </button>
        <button
          onClick={() => handleTabChange('stability')}
          className={`market-tab-btn ${activeTab === 'stability' ? 'active' : ''}`}
        >
          🛡️ Horticultural Stability
        </button>
      </div>

      {/* Warnings Legend Cards */}
      {activeTab !== 'stability' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
          <div style={{ background: 'var(--color-bg-alert-red)', border: '1px solid var(--color-border-alert-red)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
            <h4 style={{ color: '#c53030', display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.5rem' }}>
              <AlertTriangle size={18} /> Price Shock (Anomaly)
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', margin: 0 }}>
              Detects extreme week-over-week price movements that deviate beyond standard statistical confidence intervals.
            </p>
          </div>
          <div style={{ background: 'var(--color-bg-alert-yellow)', border: '1px solid var(--color-border-alert-yellow)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
            <h4 style={{ color: '#b7791f', display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.5rem' }}>
              <TrendingDown size={18} /> Volatility Breakout
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', margin: 0 }}>
              Monitors clusters of variance where the standard deviation of prices expands rapidly over a 4-week window.
            </p>
          </div>
          <div style={{ background: 'var(--color-bg-alert-green)', border: '1px solid var(--color-border-alert-green)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
            <h4 style={{ color: '#15803d', display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.5rem' }}>
              <ShieldCheck size={18} /> Price Drawdown
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', margin: 0 }}>
              Tracks sustained value depreciation from peak season levels, indicating prolonged bearish market pressure.
            </p>
          </div>
        </div>
      )}

      {/* Content Rendering */}
      {activeTab === 'stability' ? (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          {/* Stability Heatmap Section */}
          <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '2.5rem', boxShadow: 'var(--shadow-sm)' }}>
            <h3 style={{ marginBottom: '0.5rem', color: 'var(--color-primary)' }}>Agricultural Stability Heatmap</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>
              Aggregated risk assessment scorecards (on a 0-100 hazard scale) evaluating multiple parameters across regional markets.
            </p>
            
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', minWidth: '600px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}>
                <thead>
                  <tr>
                    <th>Market Assembly</th>
                    <th>Climate Risk</th>
                    <th>Price Volatility</th>
                    <th>Supply Bottlenecks</th>
                    <th>Export Barriers</th>
                    <th>Stability Rating</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ fontWeight: 700 }}>Shopian (Aglar)</td>
                    <td style={{ background: 'hsl(0, 90%, 92%)', color: 'hsl(0, 80%, 25%)', textAlign: 'center', fontWeight: 700 }}>85 (High)</td>
                    <td style={{ background: 'hsl(38, 90%, 92%)', color: 'hsl(38, 80%, 25%)', textAlign: 'center', fontWeight: 700 }}>62 (Med)</td>
                    <td style={{ background: 'hsl(142, 60%, 93%)', color: 'hsl(142, 70%, 20%)', textAlign: 'center', fontWeight: 700 }}>24 (Low)</td>
                    <td style={{ background: 'hsl(38, 90%, 92%)', color: 'hsl(38, 80%, 25%)', textAlign: 'center', fontWeight: 700 }}>45 (Med)</td>
                    <td><span className="badge badge-warning">Moderate Risk</span></td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 700 }}>Sopore (Nowpora)</td>
                    <td style={{ background: 'hsl(38, 90%, 92%)', color: 'hsl(38, 80%, 25%)', textAlign: 'center', fontWeight: 700 }}>58 (Med)</td>
                    <td style={{ background: 'hsl(38, 90%, 92%)', color: 'hsl(38, 80%, 25%)', textAlign: 'center', fontWeight: 700 }}>68 (Med)</td>
                    <td style={{ background: 'hsl(142, 60%, 93%)', color: 'hsl(142, 70%, 20%)', textAlign: 'center', fontWeight: 700 }}>30 (Low)</td>
                    <td style={{ background: 'hsl(38, 90%, 92%)', color: 'hsl(38, 80%, 25%)', textAlign: 'center', fontWeight: 700 }}>52 (Med)</td>
                    <td><span className="badge badge-warning">Moderate Risk</span></td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 700 }}>Srinagar (Parimpore)</td>
                    <td style={{ background: 'hsl(142, 60%, 93%)', color: 'hsl(142, 70%, 20%)', textAlign: 'center', fontWeight: 700 }}>32 (Low)</td>
                    <td style={{ background: 'hsl(38, 90%, 92%)', color: 'hsl(38, 80%, 25%)', textAlign: 'center', fontWeight: 700 }}>48 (Med)</td>
                    <td style={{ background: 'hsl(38, 90%, 92%)', color: 'hsl(38, 80%, 25%)', textAlign: 'center', fontWeight: 700 }}>55 (Med)</td>
                    <td style={{ background: 'hsl(142, 60%, 93%)', color: 'hsl(142, 70%, 20%)', textAlign: 'center', fontWeight: 700 }}>20 (Low)</td>
                    <td><span className="badge badge-success">Highly Stable</span></td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 700 }}>Narwal Jammu</td>
                    <td style={{ background: 'hsl(142, 60%, 93%)', color: 'hsl(142, 70%, 20%)', textAlign: 'center', fontWeight: 700 }}>25 (Low)</td>
                    <td style={{ background: 'hsl(0, 90%, 92%)', color: 'hsl(0, 80%, 25%)', textAlign: 'center', fontWeight: 700 }}>76 (High)</td>
                    <td style={{ background: 'hsl(0, 90%, 92%)', color: 'hsl(0, 80%, 25%)', textAlign: 'center', fontWeight: 700 }}>72 (High)</td>
                    <td style={{ background: 'hsl(38, 90%, 92%)', color: 'hsl(38, 80%, 25%)', textAlign: 'center', fontWeight: 700 }}>60 (Med)</td>
                    <td><span className="badge badge-danger">High Risk</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Risk Quadrant Plot Representation */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '3rem', alignItems: 'start' }}>
            <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '2.5rem', boxShadow: 'var(--shadow-sm)' }}>
              <h3 style={{ marginBottom: '1.5rem', color: 'var(--color-primary)' }}>Instability Risk Quadrant</h3>
              
              <div style={{ width: '100%', maxWidth: '500px', margin: '0 auto', border: '1px solid var(--color-border)', padding: '1rem', background: 'var(--color-bg)', position: 'relative' }}>
                <svg viewBox="0 0 200 200" width="100%" height="auto" style={{ overflow: 'visible' }}>
                  {/* Grid quadrants */}
                  <rect x="0" y="0" width="100" height="100" fill="hsla(38, 90%, 92%, 0.3)" /> {/* High Threat */}
                  <rect x="100" y="0" width="100" height="100" fill="hsla(0, 90%, 92%, 0.3)" /> {/* Critical Risk */}
                  <rect x="0" y="100" width="100" height="100" fill="hsla(142, 60%, 93%, 0.3)" /> {/* Low Threat */}
                  <rect x="100" y="100" width="100" height="100" fill="hsla(38, 90%, 92%, 0.3)" /> {/* Vulnerable */}
                  
                  {/* Axis */}
                  <line x1="100" y1="0" x2="100" y2="200" stroke="var(--color-text-muted)" strokeWidth="1.5" strokeDasharray="3" />
                  <line x1="0" y1="100" x2="200" y2="100" stroke="var(--color-text-muted)" strokeWidth="1.5" strokeDasharray="3" />
                  
                  {/* Labels for Quadrants */}
                  <text x="50" y="20" fontSize="7" fontWeight="bold" textAnchor="middle" fill="#b7791f">Quadrant II: High Volatility</text>
                  <text x="150" y="20" fontSize="7" fontWeight="bold" textAnchor="middle" fill="#c53030">Quadrant I: Critical Risk</text>
                  <text x="50" y="180" fontSize="7" fontWeight="bold" textAnchor="middle" fill="#15803d">Quadrant III: Stable Zone</text>
                  <text x="150" y="180" fontSize="7" fontWeight="bold" textAnchor="middle" fill="#b7791f">Quadrant IV: Sourced Volatility</text>
                  
                  {/* Scatter Points */}
                  {/* Aglar Small */}
                  <circle cx="140" cy="40" r="5" fill="#c53030" />
                  <text x="140" y="32" fontSize="6" textAnchor="middle" fontWeight="bold" fill="var(--color-text-main)">Aglar Small (Q1)</text>

                  {/* Parimpore Large */}
                  <circle cx="60" cy="140" r="5" fill="#15803d" />
                  <text x="60" y="132" fontSize="6" textAnchor="middle" fontWeight="bold" fill="var(--color-text-main)">Parimpore (Q3)</text>

                  {/* Narwal Jammu */}
                  <circle cx="160" cy="70" r="5" fill="#c53030" />
                  <text x="160" y="62" fontSize="6" textAnchor="middle" fontWeight="bold" fill="var(--color-text-main)">Jammu (Q1)</text>
                </svg>
              </div>
            </div>

            <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '2rem', boxShadow: 'var(--shadow-sm)' }}>
              <h4 style={{ color: 'var(--color-primary)', marginBottom: '0.75rem' }}>Stability Quadrant Explanation</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: '1.7' }}>
                Markets mapped in **Quadrant I (Critical Risk)** undergo frequent price shocks coupled with high volatility breakouts. Primary local assembly markets in Shopian (Aglar) are highly vulnerable to seasonal weather disruptions. 
                <br /><br />
                **Quadrant III (Stable Zone)** indicates markets characterized by smooth transactions, low drawdowns, and predictable volume. Srinagar's Parimpore terminal represents high-market stability due to institutional interventions.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="ews-grid">
          {/* EWS Table List */}
          <div>
            <h3 style={{ marginBottom: '1rem', color: 'var(--color-primary)' }}>
              {activeTab === 'cherry' ? 'Cherry' : 'Apple'} Alert Summary Table
            </h3>
            
            <div className="data-table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Market</th>
                    <th>Grade</th>
                    <th>Current Level</th>
                    <th>Alert Rate</th>
                    <th>Volatility</th>
                    <th>Detail</th>
                  </tr>
                </thead>
                <tbody>
                  {(activeTab === 'cherry' ? CHERRY_ALERT_DATA : APPLE_ALERT_DATA).map((row, index) => (
                    <tr 
                      key={index}
                      style={{ 
                        cursor: 'pointer',
                        backgroundColor: selectedSegment && selectedSegment.market === row.market && selectedSegment.grade === row.grade ? 'var(--color-primary-pale)' : 'transparent'
                      }}
                      onClick={() => setSelectedSegment(row)}
                    >
                      <td style={{ fontWeight: 700 }}>{row.market}</td>
                      <td>{row.grade}</td>
                      <td>{getAlertBadge(row.level)}</td>
                      <td style={{ fontWeight: 600 }}>{row.alertRate}</td>
                      <td>{(row.vol).toFixed(2)}%</td>
                      <td>
                        <button 
                          className="btn btn-secondary" 
                          style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', borderRadius: 'var(--radius-sm)' }}
                        >
                          Select
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Interactive Plot Viewer */}
          <div style={{ position: 'sticky', top: '100px' }}>
            {selectedSegment ? (
              <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '2rem', boxShadow: 'var(--shadow-sm)' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-accent)' }}>
                  Interactive Volatility Chart
                </span>
                <h3 style={{ marginTop: '0.25rem', marginBottom: '0.5rem', color: 'var(--color-primary)' }}>
                  {selectedSegment.market} — {selectedSegment.grade}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
                  Simulating risk deviations. Alert rate is <b>{selectedSegment.alertRate}</b>. Max recorded price drawdown is <b>{(selectedSegment.drawdown * 100).toFixed(0)}%</b>.
                </p>

                {/* SVG representing the specific commodity forecast anomaly wave */}
                <div style={{ border: '1px solid var(--color-border)', padding: '1rem', background: 'var(--color-bg)', borderRadius: 'var(--radius-sm)' }}>
                  <svg viewBox="0 0 300 150" width="100%" height="auto" style={{ overflow: 'visible' }}>
                    {/* Shock boundary bounds (red dotted) */}
                    <line x1="20" y1="40" x2="280" y2="40" stroke="#fecaca" strokeWidth="1.5" strokeDasharray="3" />
                    <text x="280" y="35" fontSize="6" fill="#ef4444" textAnchor="end">Upper Risk Limit</text>
                    
                    {/* Normal price wave */}
                    <path
                      d="M 20 100 Q 60 110 100 80 T 180 90 T 230 45 Q 260 120 280 110"
                      fill="none"
                      stroke={selectedSegment.level === 'Critical' ? '#ef4444' : selectedSegment.level === 'Warning' ? '#f59e0b' : 'var(--color-primary)'}
                      strokeWidth="2.5"
                    />

                    {/* Alert point */}
                    {selectedSegment.level === 'Critical' && (
                      <g>
                        <circle cx="230" cy="45" r="5" fill="#ef4444" />
                        <circle cx="230" cy="45" r="10" fill="none" stroke="#ef4444" strokeWidth="1" opacity="0.6">
                          <animate attributeName="r" values="5;12;5" dur="1.5s" repeatCount="indefinite" />
                        </circle>
                        <text x="230" y="32" fontSize="7" fontWeight="bold" textAnchor="middle" fill="#ef4444">Price Anomaly</text>
                      </g>
                    )}
                    {selectedSegment.level === 'Warning' && (
                      <g>
                        <circle cx="230" cy="45" r="5" fill="#f59e0b" />
                        <text x="230" y="32" fontSize="7" fontWeight="bold" textAnchor="middle" fill="#f59e0b">Variance Alert</text>
                      </g>
                    )}
                    
                    {/* Graph labels */}
                    <text x="20" y="145" fontSize="7" fill="var(--color-text-muted)">Time (Weeks)</text>
                    <text x="15" y="90" fontSize="7" fill="var(--color-text-muted)" textAnchor="end" transform="rotate(-90 15 90)">Price</text>
                  </svg>
                </div>

                <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', background: 'var(--color-primary-pale)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
                  <Info size={20} style={{ color: 'var(--color-primary)', flexShrink: 0, marginTop: '0.1rem' }} />
                  <div>
                    <h4 style={{ color: 'var(--color-primary)', fontSize: '0.85rem', marginBottom: '0.25rem' }}>EWS Risk Profile</h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', margin: 0 }}>
                      This segment exhibits a historical alert incidence of **{selectedSegment.alertRate}**. Standard transaction volatility is mapped at **{selectedSegment.vol}%**.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="plot-container" style={{ borderStyle: 'dashed', textAlign: 'center', padding: '3rem' }}>
                <div>
                  <Sparkles size={48} style={{ color: 'var(--color-primary-light)', marginBottom: '1rem', opacity: 0.7 }} />
                  <h3>Select a Segment</h3>
                  <p style={{ fontSize: '0.9rem', maxWidth: '300px', margin: '0.5rem auto 0', color: 'var(--color-text-muted)' }}>
                    Click on any row in the EWS Alert Summary table to view its price volatility profile and real-time risk simulation.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EWS;
