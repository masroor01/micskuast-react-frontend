import React, { useState } from 'react';
import { 
  TrendingUp, 
  Activity, 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  Scale, 
  Zap, 
  BarChart3, 
  MapPin, 
  Truck,
  Database
} from 'lucide-react';

interface CropTransmissionData {
  crop: string;
  category: 'Vegetable' | 'Fruit';
  pairsTested: number;
  cointegrated: number;
  rate: number;
  avgSpeed: number | null;
  avgElasticity: number | null;
  highlight: string;
}

const nationalCropsData: CropTransmissionData[] = [
  { crop: 'Cauliflower', category: 'Vegetable', pairsTested: 253, cointegrated: 248, rate: 98.0, avgSpeed: -0.060, avgElasticity: 0.544, highlight: 'Highest spatial cointegration rate; tight perishability arbitrage.' },
  { crop: 'Cabbage', category: 'Vegetable', pairsTested: 276, cointegrated: 268, rate: 97.1, avgSpeed: -0.068, avgElasticity: 0.658, highlight: 'Fastest average speed of adjustment among high-volume vegetables.' },
  { crop: 'Tomato', category: 'Vegetable', pairsTested: 273, cointegrated: 263, rate: 96.3, avgSpeed: -0.056, avgElasticity: 0.619, highlight: 'Highly reactive interstate transmission; rapid price shock absorption.' },
  { crop: 'Onion', category: 'Vegetable', pairsTested: 323, cointegrated: 294, rate: 91.0, avgSpeed: -0.056, avgElasticity: 0.683, highlight: 'Highest elasticity (0.683) among vegetables, strongly tethered across states.' },
  { crop: 'Mango', category: 'Fruit', pairsTested: 42, cointegrated: 38, rate: 90.5, avgSpeed: -0.102, avgElasticity: 0.543, highlight: 'Highest integration in fruit cohort; fast local seasonal clearing.' },
  { crop: 'Potato', category: 'Vegetable', pairsTested: 298, cointegrated: 267, rate: 89.6, avgSpeed: -0.059, avgElasticity: 0.677, highlight: 'Cold-storage buffered yet strong long-run spatial equilibrium.' },
  { crop: 'Papaya', category: 'Fruit', pairsTested: 55, cointegrated: 47, rate: 85.5, avgSpeed: -0.089, avgElasticity: 0.360, highlight: 'Short post-harvest window demands rapid geographic distribution.' },
  { crop: 'Apple', category: 'Fruit', pairsTested: 372, cointegrated: 277, rate: 74.5, avgSpeed: -0.059, avgElasticity: 0.510, highlight: 'Flagship J&K commodity; tested across 28 national wholesale markets.' },
  { crop: 'Grapes', category: 'Fruit', pairsTested: 42, cointegrated: 28, rate: 66.7, avgSpeed: -0.125, avgElasticity: 0.705, highlight: 'Concentrated growing belts; highest elasticity (0.705) among fruits.' },
  { crop: 'Water Melon', category: 'Fruit', pairsTested: 37, cointegrated: 24, rate: 64.9, avgSpeed: -0.051, avgElasticity: 0.343, highlight: 'Bulky long-haul transport creates dispersed regional pricing tiers.' },
  { crop: 'Banana', category: 'Fruit', pairsTested: 54, cointegrated: 32, rate: 59.3, avgSpeed: -0.155, avgElasticity: 0.599, highlight: 'Rapid speed of adjustment (-0.155) across cointegrated southern corridors.' },
  { crop: 'Pomegranate', category: 'Fruit', pairsTested: 66, cointegrated: 39, rate: 59.1, avgSpeed: -0.110, avgElasticity: 0.252, highlight: 'High value-to-weight ratio; selective interstate terminal links.' },
  { crop: 'Orange', category: 'Fruit', pairsTested: 51, cointegrated: 29, rate: 56.9, avgSpeed: -0.088, avgElasticity: 0.655, highlight: 'Nagpur & Punjab production clusters connect directly to select metros.' },
  { crop: 'Pineapple', category: 'Fruit', pairsTested: 63, cointegrated: 32, rate: 50.8, avgSpeed: -0.104, avgElasticity: 0.532, highlight: 'Distant northeastern/southern origins limit daily price equalization.' },
  { crop: 'Peach', category: 'Fruit', pairsTested: 2, cointegrated: 1, rate: 50.0, avgSpeed: -0.201, avgElasticity: -0.005, highlight: 'Small cohort backtest; fast speed in the single linked pair.' },
  { crop: 'Pear (Marasebu)', category: 'Fruit', pairsTested: 15, cointegrated: 6, rate: 40.0, avgSpeed: -0.078, avgElasticity: 0.414, highlight: 'Regional J&K summer fruit; partial spatial integration.' },
  { crop: 'Plum', category: 'Fruit', pairsTested: 3, cointegrated: 0, rate: 0.0, avgSpeed: null, avgElasticity: null, highlight: 'Extremely localized short trading windows; no national cointegration.' }
];

const jkFastestPairs = [
  { crop: 'Apple', marketA: 'Parimpore (Srinagar)', marketB: 'Ganderbal', overlap: 432, speed: -0.166, note: 'Fastest regional valley transmission' },
  { crop: 'Pear (Marasebu)', marketA: 'Parimpore', marketB: 'Kathua', overlap: 527, speed: -0.153, note: 'Direct Kashmir-to-Jammu gateway link' },
  { crop: 'Apple', marketA: 'Narwal (Jammu)', marketB: 'Ganderbal', overlap: 432, speed: -0.143, note: 'Inter-division transit corridor' },
  { crop: 'Cabbage', marketA: 'Batote', marketB: 'Akhnoor', overlap: 364, speed: -0.140, note: 'NH44 highland corridor arbitrage' },
  { crop: 'Cabbage', marketA: 'Narwal Jammu', marketB: 'Akhnoor', overlap: 1096, speed: -0.114, note: 'Jammu regional retail-wholesale balance' },
  { crop: 'Pear (Marasebu)', marketA: 'Narwal', marketB: 'Kathua', overlap: 525, speed: -0.112, note: 'Interstate border corridor' },
  { crop: 'Tomato', marketA: 'Narwal Jammu', marketB: 'Udhampur', overlap: 713, speed: -0.111, note: 'Daily perishable price equilibrium' },
  { crop: 'Potato', marketA: 'Kathua', marketB: 'Udhampur', overlap: 2577, speed: -0.101, note: 'Deep 7-year continuous trading record' }
];

const jkSlowestPairs = [
  { crop: 'Apple', marketA: 'Parimpore (Srinagar)', marketB: 'Narwal (Jammu)', overlap: 2541, speed: -0.0088, note: '<1% gap closes daily. Differentiated supply-chain roles (Assembly vs. Gateway)' },
  { crop: 'Potato', marketA: 'Batote', marketB: 'Kathua', overlap: 5635, speed: -0.009, note: 'Hill-to-plains buffer; slow seasonal price adjustment' },
  { crop: 'Onion', marketA: 'Parimpore', marketB: 'Rajouri', overlap: 8073, speed: -0.009, note: 'Pir Panjal trans-mountain distribution lag' },
  { crop: 'Grapes', marketA: 'Parimpore', marketB: 'Narwal', overlap: 1441, speed: -0.009, note: 'Secondary consumption markets with slow pass-through' },
  { crop: 'Orange', marketA: 'Parimpore', marketB: 'Narwal', overlap: 4027, speed: -0.011, note: 'Imported citrus pass-through with regional markups' },
  { crop: 'Apple', marketA: 'Parimpore', marketB: 'Batote', overlap: 3503, speed: -0.012, note: 'Transit stop along highway with independent local pricing' }
];

const appleFastestNational = [
  { marketA: 'Nagpur', marketB: 'Chandigarh', overlap: 828, speed: -0.318, elasticity: 0.127 },
  { marketA: 'Lucknow', marketB: 'Katpadi', overlap: 459, speed: -0.303, elasticity: 0.509 },
  { marketA: 'Nagpur', marketB: 'Karnal', overlap: 1702, speed: -0.296, elasticity: 0.194 },
  { marketA: 'Ahmedabad (Manekchowk)', marketB: 'Ahmedabad (Naroda)', overlap: 2560, speed: -0.286, elasticity: 0.916 },
  { marketA: 'Nagpur', marketB: 'Pune', overlap: 2146, speed: -0.239, elasticity: -0.042 },
  { marketA: 'Parimpore (Srinagar)', marketB: 'Ganderbal', overlap: 432, speed: -0.166, elasticity: 1.101 }
];

const appleIsolatedPairs = [
  { marketA: 'Jodhpur', marketB: 'Ahmedabad (Manekchowk)', overlap: 2565, pValue: 0.9733, status: 'Non-Cointegrated' },
  { marketA: 'Jodhpur', marketB: 'Ahmedabad (Naroda)', overlap: 2562, pValue: 0.9715, status: 'Non-Cointegrated' },
  { marketA: 'Kharar', marketB: 'Katpadi', overlap: 273, pValue: 0.9133, status: 'Non-Cointegrated' },
  { marketA: 'Indore', marketB: 'Karnal', overlap: 897, pValue: 0.8992, status: 'Non-Cointegrated' },
  { marketA: 'Indore', marketB: 'Chandigarh', overlap: 478, pValue: 0.8892, status: 'Non-Cointegrated' },
  { marketA: 'Indore', marketB: 'Pune', overlap: 770, pValue: 0.8656, status: 'Non-Cointegrated' },
  { marketA: 'Jalandhar', marketB: 'Indore', overlap: 741, pValue: 0.8511, status: 'Non-Cointegrated' }
];

export const PriceTransmission: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'jk' | 'apple' | 'methodology' | 'takeaways'>('overview');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'Vegetable' | 'Fruit'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCrops = nationalCropsData.filter(item => {
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesSearch = item.crop.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="price-transmission-section animate-fade-in" style={{ width: '100%' }}>
      {/* Executive Hero Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(21, 128, 61, 0.08) 0%, rgba(15, 118, 110, 0.05) 100%)',
        border: '1px solid var(--color-border)',
        borderRadius: '16px',
        padding: '2rem 1.75rem',
        marginBottom: '2rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              backgroundColor: 'var(--color-primary)',
              color: '#ffffff',
              padding: '4px 10px',
              borderRadius: '999px',
              fontSize: '0.72rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.06em'
            }}>
              <Activity size={12} />
              HADP Project #04 • Econometric Research
            </span>
            <span style={{
              backgroundColor: 'var(--color-primary-pale)',
              color: 'var(--color-primary)',
              padding: '4px 10px',
              borderRadius: '999px',
              fontSize: '0.72rem',
              fontWeight: 700
            }}>
              September 2026 Release
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
              Lead: Market Intelligence Cell, SKUAST-Kashmir
            </span>
          </div>
        </div>

        <h2 style={{
          fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)',
          fontWeight: 900,
          color: 'var(--color-text-main)',
          lineHeight: 1.25,
          marginBottom: '0.75rem'
        }}>
          Price Transmission &amp; Market Cointegration Study
        </h2>
        <p style={{
          fontSize: '0.95rem',
          color: 'var(--color-text-muted)',
          maxWidth: '900px',
          lineHeight: 1.6,
          margin: 0
        }}>
          Empirical spatial integration assessment across <strong>2,225 wholesale mandi pairs</strong> nationwide. 
          Evaluating whether agricultural wholesale markets across India and Jammu &amp; Kashmir are economically tethered in the long run, 
          how rapidly price shocks transmit between mandis, and where supply chains fragment into isolated circuits.
        </p>
      </div>

      {/* KPI Highlight Stat Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
        gap: '1.25rem',
        marginBottom: '2.5rem'
      }}>
        <div className="stat-card" style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: '14px',
          padding: '1.25rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
              Market Pairs Tested
            </span>
            <Database size={16} style={{ color: 'var(--color-primary)' }} />
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 900, color: 'var(--color-text-main)', lineHeight: 1 }}>
            2,225
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.4rem', margin: 0 }}>
            Historical overlapping daily mandi trading series
          </p>
        </div>

        <div className="stat-card" style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: '14px',
          padding: '1.25rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
              Overall Cointegration
            </span>
            <CheckCircle2 size={16} style={{ color: '#16a34a' }} />
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 900, color: '#16a34a', lineHeight: 1 }}>
            85.1%
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.4rem', margin: 0 }}>
            1,894 pairs tethered to shared long-run equilibrium (p &lt; 0.05)
          </p>
        </div>

        <div className="stat-card" style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: '14px',
          padding: '1.25rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
              Vegetable Benchmark
            </span>
            <TrendingUp size={16} style={{ color: '#2563eb' }} />
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 900, color: '#2563eb', lineHeight: 1 }}>
            98.0%
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.4rem', margin: 0 }}>
            Cauliflower &amp; Cabbage lead; perishability accelerates arbitrage
          </p>
        </div>

        <div className="stat-card" style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: '14px',
          padding: '1.25rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
              J&amp;K Apple Pipeline
            </span>
            <Truck size={16} style={{ color: '#d97706' }} />
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 900, color: '#d97706', lineHeight: 1 }}>
            74.5%
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.4rem', margin: 0 }}>
            372 pairs tested across 28 major terminal markets
          </p>
        </div>

        <div className="stat-card" style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: '14px',
          padding: '1.25rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
              Parimpore vs. Narwal
            </span>
            <Scale size={16} style={{ color: '#dc2626' }} />
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 900, color: '#dc2626', lineHeight: 1 }}>
            -0.0088
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.4rem', margin: 0 }}>
            &lt;1% daily gap closed; non-interchangeable spot roles
          </p>
        </div>
      </div>

      {/* Internal Sub-Navigation Tabs */}
      <div className="market-tabs" style={{ marginBottom: '2rem' }}>
        <button
          onClick={() => setActiveSubTab('overview')}
          className={`market-tab-btn ${activeSubTab === 'overview' ? 'active' : ''}`}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
        >
          <BarChart3 size={16} />
          <span>National Overview (17 Crops)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('jk')}
          className={`market-tab-btn ${activeSubTab === 'jk' ? 'active' : ''}`}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
        >
          <MapPin size={16} />
          <span>J&amp;K Internal Pipeline (141 Pairs)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('apple')}
          className={`market-tab-btn ${activeSubTab === 'apple' ? 'active' : ''}`}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
        >
          <Truck size={16} />
          <span>Apple Spatial Deep-Dive (372 Pairs)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('methodology')}
          className={`market-tab-btn ${activeSubTab === 'methodology' ? 'active' : ''}`}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
        >
          <Scale size={16} />
          <span>Econometric Methodology</span>
        </button>

        <button
          onClick={() => setActiveSubTab('takeaways')}
          className={`market-tab-btn ${activeSubTab === 'takeaways' ? 'active' : ''}`}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
        >
          <Zap size={16} />
          <span>Key Insights &amp; Advisory</span>
        </button>
      </div>

      {/* SUB-TAB 1: National Overview (17 Crops) */}
      {activeSubTab === 'overview' && (
        <div className="animate-fade-in">
          {/* Controls Bar */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: '12px',
            padding: '0.75rem 1rem',
            marginBottom: '1.25rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text-muted)' }}>
                Filter Category:
              </span>
              <button
                onClick={() => setCategoryFilter('all')}
                className="btn"
                style={{
                  fontSize: '0.75rem',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  backgroundColor: categoryFilter === 'all' ? 'var(--color-primary)' : 'transparent',
                  color: categoryFilter === 'all' ? '#ffffff' : 'var(--color-text-main)',
                  border: '1px solid var(--color-border)'
                }}
              >
                All (17)
              </button>
              <button
                onClick={() => setCategoryFilter('Vegetable')}
                className="btn"
                style={{
                  fontSize: '0.75rem',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  backgroundColor: categoryFilter === 'Vegetable' ? 'var(--color-primary)' : 'transparent',
                  color: categoryFilter === 'Vegetable' ? '#ffffff' : 'var(--color-text-main)',
                  border: '1px solid var(--color-border)'
                }}
              >
                Vegetables (5)
              </button>
              <button
                onClick={() => setCategoryFilter('Fruit')}
                className="btn"
                style={{
                  fontSize: '0.75rem',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  backgroundColor: categoryFilter === 'Fruit' ? 'var(--color-primary)' : 'transparent',
                  color: categoryFilter === 'Fruit' ? '#ffffff' : 'var(--color-text-main)',
                  border: '1px solid var(--color-border)'
                }}
              >
                Fruits (12)
              </button>
            </div>

            <div style={{ position: 'relative', minWidth: '220px' }}>
              <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
              <input
                type="text"
                placeholder="Search crop name..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '6px 12px 6px 30px',
                  borderRadius: '6px',
                  border: '1px solid var(--color-border)',
                  background: 'var(--color-bg)',
                  fontSize: '0.8rem',
                  color: 'var(--color-text-main)'
                }}
              />
            </div>
          </div>

          {/* National Table */}
          <div className="data-table-container" style={{ margin: 0 }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Crop / Commodity</th>
                  <th>Category</th>
                  <th style={{ textAlign: 'right' }}>Pairs Tested</th>
                  <th style={{ textAlign: 'right' }}>Cointegrated</th>
                  <th>Integration Rate (%)</th>
                  <th style={{ textAlign: 'right' }}>Avg. Speed (&lambda;)</th>
                  <th style={{ textAlign: 'right' }}>Avg. Elasticity (&beta;)</th>
                  <th>Econometric Insight</th>
                </tr>
              </thead>
              <tbody>
                {filteredCrops.map((item, idx) => (
                  <tr key={idx}>
                    <td style={{ fontWeight: 800, color: 'var(--color-text-main)' }}>
                      {item.crop}
                    </td>
                    <td>
                      <span style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        padding: '2px 8px',
                        borderRadius: '4px',
                        backgroundColor: item.category === 'Vegetable' ? 'rgba(37, 99, 235, 0.1)' : 'rgba(217, 119, 6, 0.1)',
                        color: item.category === 'Vegetable' ? '#2563eb' : '#d97706'
                      }}>
                        {item.category}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right', fontWeight: 600 }}>{item.pairsTested}</td>
                    <td style={{ textAlign: 'right', fontWeight: 700, color: '#16a34a' }}>{item.cointegrated}</td>
                    <td style={{ minWidth: '160px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ flex: 1, height: '6px', background: 'var(--color-border)', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{
                            width: `${item.rate}%`,
                            height: '100%',
                            background: item.rate >= 90 ? '#16a34a' : item.rate >= 65 ? '#d97706' : '#ef4444',
                            borderRadius: '3px'
                          }} />
                        </div>
                        <span style={{ fontSize: '0.8rem', fontWeight: 800, minWidth: '42px', textAlign: 'right' }}>
                          {item.rate.toFixed(1)}%
                        </span>
                      </div>
                    </td>
                    <td style={{ textAlign: 'right', fontFamily: 'monospace', fontWeight: 700 }}>
                      {item.avgSpeed !== null ? item.avgSpeed.toFixed(3) : '—'}
                    </td>
                    <td style={{ textAlign: 'right', fontFamily: 'monospace', fontWeight: 700 }}>
                      {item.avgElasticity !== null ? item.avgElasticity.toFixed(3) : '—'}
                    </td>
                    <td style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                      {item.highlight}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{
            marginTop: '1.25rem',
            padding: '1rem',
            borderRadius: '10px',
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.75rem'
          }}>
            <Info size={18} style={{ color: 'var(--color-primary)', flexShrink: 0, marginTop: '2px' }} />
            <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
              <strong>Speed of Adjustment Interpretation:</strong> Speed (&lambda;) represents the proportion of yesterday's price disequilibrium that disappears on the next trading day. 
              For instance, <code>-0.068</code> (Cabbage) means ~6.8% of any sudden price divergence across cointegrated markets is resolved each business day through interstate truck transport and arbitrage.
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: J&K Regional Pipeline (141 Pairs) */}
      {activeSubTab === 'jk' && (
        <div className="animate-fade-in">
          {/* J&K Executive Banner */}
          <div style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: '14px',
            padding: '1.5rem',
            marginBottom: '2rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <MapPin size={18} style={{ color: 'var(--color-primary)' }} />
              <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-text-main)' }}>
                Internal Market Integration Across Jammu &amp; Kashmir (141 Pairs)
              </h3>
            </div>
            <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
              Analysis of all pairs where both mandis reside within the UT of J&amp;K: <strong>Narwal (Jammu), Parimpore (Srinagar), Kathua, Batote, Akhnoor, Rajouri, Udhampur, Ganderbal, Pulwama, Shopian, Nowpora, and Aglar</strong>.
              Of 141 valid overlapping pairs, <strong>120 cointegrate (85.1%)</strong>.
            </p>
          </div>

          {/* Deep Focus: Parimpore vs. Narwal Callout */}
          <div style={{
            background: 'rgba(220, 38, 38, 0.05)',
            border: '1.5px solid rgba(220, 38, 38, 0.3)',
            borderRadius: '14px',
            padding: '1.5rem',
            marginBottom: '2rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
              <AlertTriangle size={20} style={{ color: '#dc2626' }} />
              <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 900, color: '#dc2626' }}>
                Critical Finding: The Parimpore – Narwal Apple Transmission Paradox
              </h4>
            </div>
            <p style={{ margin: '0 0 0.75rem', fontSize: '0.88rem', color: 'var(--color-text-main)', lineHeight: 1.6 }}>
              Parimpore (Srinagar) and Narwal (Jammu) are the two longest-running, deepest-volume terminal markets in J&amp;K with over 2,541 overlapping trading days. 
              While they <strong>are cointegrated in the long run</strong>, their estimated speed of adjustment is <strong>&lambda; = -0.0088</strong>.
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1rem',
              marginTop: '1rem'
            }}>
              <div style={{ background: 'var(--color-surface)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                <strong style={{ display: 'block', fontSize: '0.85rem', color: '#16a34a', marginBottom: '0.25rem' }}>
                  Functional Market Delineation
                </strong>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', lineHeight: 1.4, display: 'block' }}>
                  Parimpore acts as a <em>valley-wide farmgate aggregation terminal</em>, whereas Narwal serves as a <em>wholesale transshipment gateway</em> connecting to northern India. They play complementary roles rather than direct substitutes.
                </span>
              </div>

              <div style={{ background: 'var(--color-surface)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                <strong style={{ display: 'block', fontSize: '0.85rem', color: '#dc2626', marginBottom: '0.25rem' }}>
                  Forecasting Rule for Growers
                </strong>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', lineHeight: 1.4, display: 'block' }}>
                  Under 1% of a price gap between Parimpore and Narwal closes per trading day. <strong>A price forecast for Parimpore cannot simply stand in for Narwal on a daily basis.</strong> Growers must monitor both independently.
                </span>
              </div>
            </div>
          </div>

          {/* J&K Crop Integration Rates */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--color-text-main)' }}>
              Cointegration Rate by Commodity Within J&amp;K
            </h4>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '0.75rem'
            }}>
              {[
                { crop: 'Cabbage', pairs: '21/21', rate: '100.0%', status: 'Perfect Arbitrage' },
                { crop: 'Cauliflower', pairs: '15/15', rate: '100.0%', status: 'Perfect Arbitrage' },
                { crop: 'Onion', pairs: '21/21', rate: '100.0%', status: 'Perfect Arbitrage' },
                { crop: 'Potato', pairs: '20/21', rate: '95.2%', status: 'High Cointegration' },
                { crop: 'Tomato', pairs: '13/15', rate: '86.7%', status: 'High Cointegration' },
                { crop: 'Apple', pairs: '6/9', rate: '66.7%', status: 'Moderate (Specialized)' },
                { crop: 'Pomegranate', pairs: '4/6', rate: '66.7%', status: 'Moderate' },
                { crop: 'Pear (Marasebu)', pairs: '5/10', rate: '50.0%', status: 'Partial Corridor' },
                { crop: 'Banana', pairs: '3/6', rate: '50.0%', status: 'Partial Corridor' },
                { crop: 'Grapes', pairs: '1/3', rate: '33.3%', status: 'Low Transmission' }
              ].map((c, i) => (
                <div key={i} style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '10px',
                  padding: '0.85rem 1rem'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 800, fontSize: '0.85rem' }}>{c.crop}</span>
                    <span style={{ fontWeight: 900, color: c.rate === '100.0%' ? '#16a34a' : 'var(--color-primary)', fontSize: '0.85rem' }}>
                      {c.rate}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--color-text-muted)', marginTop: '0.35rem' }}>
                    <span>{c.pairs} pairs</span>
                    <span>{c.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tables: Fastest vs. Slowest J&K Pairs */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#16a34a', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Zap size={16} /> Fastest Internal J&amp;K Correcting Pairs
              </h4>
              <div className="data-table-container" style={{ margin: 0 }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Crop</th>
                      <th>Market Pair</th>
                      <th>Days</th>
                      <th style={{ textAlign: 'right' }}>Speed (&lambda;)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jkFastestPairs.map((p, idx) => (
                      <tr key={idx}>
                        <td style={{ fontWeight: 700 }}>{p.crop}</td>
                        <td style={{ fontSize: '0.82rem' }}>{p.marketA} &harr; {p.marketB}</td>
                        <td style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{p.overlap}</td>
                        <td style={{ textAlign: 'right', fontFamily: 'monospace', fontWeight: 700, color: '#16a34a' }}>
                          {p.speed.toFixed(3)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#d97706', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Activity size={16} /> Slowest Cointegrated Pairs in J&amp;K
              </h4>
              <div className="data-table-container" style={{ margin: 0 }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Crop</th>
                      <th>Market Pair</th>
                      <th>Days</th>
                      <th style={{ textAlign: 'right' }}>Speed (&lambda;)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jkSlowestPairs.map((p, idx) => (
                      <tr key={idx}>
                        <td style={{ fontWeight: 700 }}>{p.crop}</td>
                        <td style={{ fontSize: '0.82rem' }}>{p.marketA} &harr; {p.marketB}</td>
                        <td style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{p.overlap}</td>
                        <td style={{ textAlign: 'right', fontFamily: 'monospace', fontWeight: 700, color: '#d97706' }}>
                          {p.speed.toFixed(4)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Data Coverage Note */}
          <div style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: '10px',
            padding: '1rem',
            fontSize: '0.82rem',
            color: 'var(--color-text-muted)'
          }}>
            <strong>Data Coverage Gap Flagged:</strong> Aglar (Shopian, 3/3 pairs) and Nowpora (Pulwama, 7/7 pairs) returned zero calendar overlap dates with neighbors. 
            This represents a reporting/timing capture artifact rather than economic disconnection. Ganderbal was partially affected (4/7). 
            All other core hubs (Batote, Narwal, Rajouri, Akhnoor, Udhampur, Kathua, Pulwama, Shopian) demonstrated full continuous testability.
          </div>
        </div>
      )}

      {/* SUB-TAB 3: Apple Spatial Deep-Dive (372 Pairs) */}
      {activeSubTab === 'apple' && (
        <div className="animate-fade-in">
          <div style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: '14px',
            padding: '1.5rem',
            marginBottom: '1.5rem'
          }}>
            <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-text-main)' }}>
              National Apple Pipeline Transmission (372 Pairs Across 28 Markets)
            </h3>
            <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
              As the backbone of Jammu &amp; Kashmir&apos;s agricultural economy, apple price transmission was evaluated across 28 terminal markets. 
              <strong> 277 out of 372 pairs cointegrate (74.5%)</strong> with an average adjustment speed of -0.059 and price elasticity of 0.510.
            </p>
          </div>

          {/* Fastest National Pairs */}
          <div style={{ marginBottom: '2rem' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#16a34a', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Zap size={16} /> Fastest National Apple Price Equalization Pairs
            </h4>
            <div className="data-table-container" style={{ margin: 0 }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Market A</th>
                    <th>Market B</th>
                    <th style={{ textAlign: 'right' }}>Trading Overlap (Days)</th>
                    <th style={{ textAlign: 'right' }}>Speed of Adjustment (&lambda;)</th>
                    <th style={{ textAlign: 'right' }}>Long-Run Elasticity (&beta;)</th>
                  </tr>
                </thead>
                <tbody>
                  {appleFastestNational.map((p, idx) => (
                    <tr key={idx}>
                      <td style={{ fontWeight: 800, color: 'var(--color-text-main)' }}>{p.marketA}</td>
                      <td style={{ fontWeight: 800, color: 'var(--color-text-main)' }}>{p.marketB}</td>
                      <td style={{ textAlign: 'right', fontWeight: 600 }}>{p.overlap}</td>
                      <td style={{ textAlign: 'right', fontFamily: 'monospace', fontWeight: 700, color: '#16a34a' }}>
                        {p.speed.toFixed(3)}
                      </td>
                      <td style={{ textAlign: 'right', fontFamily: 'monospace', fontWeight: 700 }}>
                        {p.elasticity.toFixed(3)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Segregated / Non-Cointegrated Circuits */}
          <div style={{
            background: 'rgba(217, 119, 6, 0.05)',
            border: '1.5px solid rgba(217, 119, 6, 0.25)',
            borderRadius: '14px',
            padding: '1.5rem',
            marginBottom: '2rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
              <AlertTriangle size={18} style={{ color: '#d97706' }} />
              <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: '#d97706' }}>
                Isolated Market Circuits: Jodhpur &amp; Indore Apple Decoupling
              </h4>
            </div>
            <p style={{ margin: '0 0 1rem', fontSize: '0.88rem', color: 'var(--color-text-main)', lineHeight: 1.6 }}>
              Among the 95 non-cointegrated apple pairs, a striking structural pattern emerges: <strong>Jodhpur and Indore fail to cointegrate against almost every distant wholesale terminal</strong> (Ahmedabad, Chandigarh, Karnal, Pune).
              Econometrically, these markets operate on separate regional distribution circuits that do not equilibrate with national price movements.
            </p>

            <div className="data-table-container" style={{ margin: 0, backgroundColor: 'var(--color-surface)' }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Market A</th>
                    <th>Market B</th>
                    <th style={{ textAlign: 'right' }}>Overlap (Days)</th>
                    <th style={{ textAlign: 'right' }}>Cointegration p-value</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {appleIsolatedPairs.map((p, idx) => (
                    <tr key={idx}>
                      <td style={{ fontWeight: 700 }}>{p.marketA}</td>
                      <td style={{ fontWeight: 700 }}>{p.marketB}</td>
                      <td style={{ textAlign: 'right' }}>{p.overlap}</td>
                      <td style={{ textAlign: 'right', fontFamily: 'monospace', fontWeight: 700, color: '#dc2626' }}>
                        {p.pValue.toFixed(4)}
                      </td>
                      <td>
                        <span style={{ fontSize: '0.72rem', padding: '2px 8px', borderRadius: '4px', backgroundColor: 'rgba(220, 38, 38, 0.1)', color: '#dc2626', fontWeight: 700 }}>
                          No Long-Run Link (p &gt; 0.05)
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: Econometric Methodology */}
      {activeSubTab === 'methodology' && (
        <div className="animate-fade-in">
          <div style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: '14px',
            padding: '1.5rem',
            marginBottom: '2rem'
          }}>
            <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-text-main)' }}>
              Standard Three-Step Spatial Econometric Framework
            </h3>
            <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
              To ensure mathematical rigor and prevent spurious correlations, the study implements the classical Engle-Granger two-step procedure combined with Vector Error-Correction Modeling (VECM).
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            <div style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: '12px',
              padding: '1.5rem'
            }}>
              <div style={{ display: 'inline-flex', padding: '6px 12px', borderRadius: '6px', background: 'var(--color-primary-pale)', color: 'var(--color-primary)', fontWeight: 800, fontSize: '0.75rem', marginBottom: '0.75rem' }}>
                STEP 1
              </div>
              <h4 style={{ margin: '0 0 0.5rem', fontSize: '1rem', fontWeight: 800 }}>
                Stationarity (ADF Test)
              </h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                Each market's log price series is tested for a unit root using the Augmented Dickey-Fuller (ADF) test. 
                Cointegration only makes sense between non-stationary series that wander with supply and demand cycles rather than reverting to a fixed static mean.
              </p>
            </div>

            <div style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: '12px',
              padding: '1.5rem'
            }}>
              <div style={{ display: 'inline-flex', padding: '6px 12px', borderRadius: '6px', background: 'var(--color-primary-pale)', color: 'var(--color-primary)', fontWeight: 800, fontSize: '0.75rem', marginBottom: '0.75rem' }}>
                STEP 2
              </div>
              <h4 style={{ margin: '0 0 0.5rem', fontSize: '1rem', fontWeight: 800 }}>
                Engle-Granger Cointegration
              </h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                Log price A is regressed on Log price B to determine long-run elasticity:
                <br />
                <code style={{ display: 'inline-block', marginTop: '4px', background: 'var(--color-bg)', padding: '2px 6px', borderRadius: '4px' }}>
                  ln(P_A) = &alpha; + &beta; ln(P_B) + &epsilon;
                </code>
                <br />
                The residual &epsilon; is tested for stationarity. If stationary at p &lt; 0.05, the two prices are permanently tethered.
              </p>
            </div>

            <div style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: '12px',
              padding: '1.5rem'
            }}>
              <div style={{ display: 'inline-flex', padding: '6px 12px', borderRadius: '6px', background: 'var(--color-primary-pale)', color: 'var(--color-primary)', fontWeight: 800, fontSize: '0.75rem', marginBottom: '0.75rem' }}>
                STEP 3
              </div>
              <h4 style={{ margin: '0 0 0.5rem', fontSize: '1rem', fontWeight: 800 }}>
                Error-Correction Speed (&lambda;)
              </h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                For cointegrated pairs, a dynamic short-run regression is estimated:
                <br />
                <code style={{ display: 'inline-block', marginTop: '4px', background: 'var(--color-bg)', padding: '2px 6px', borderRadius: '4px' }}>
                  &Delta;ln(P_A,t) = &alpha; + &beta;&Delta;ln(P_B,t) + &lambda;&epsilon;_t-1
                </code>
                <br />
                The coefficient <strong>&lambda;</strong> denotes the speed of adjustment: the exact percentage of yesterday's price gap closing on the next trading day.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 5: Strategic Takeaways */}
      {activeSubTab === 'takeaways' && (
        <div className="animate-fade-in">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            <div style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: '14px',
              padding: '1.5rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <CheckCircle2 size={20} style={{ color: '#16a34a' }} />
                <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800 }}>
                  Perishability Dictates Market Connectivity
                </h4>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>
                Crops with short shelf-lives (Cauliflower 98%, Cabbage 97%, Tomato 96%) exhibit near-perfect spatial cointegration. 
                Because produce cannot wait, geographic price spikes trigger immediate truck dispatches, restoring market equilibrium within days.
              </p>
            </div>

            <div style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: '14px',
              padding: '1.5rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <Truck size={20} style={{ color: '#2563eb' }} />
                <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800 }}>
                  NH44 Highway is J&amp;K&apos;s Price Transmission Backbone
                </h4>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>
                Within J&amp;K, vegetables achieved 100% cointegration across mandis situated along or near the National Highway 44 (Srinagar &ndash; Jammu). 
                Highway transit reliability directly governs the efficiency of agricultural market arbitrage for local growers.
              </p>
            </div>

            <div style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: '14px',
              padding: '1.5rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <AlertTriangle size={20} style={{ color: '#d97706' }} />
                <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800 }}>
                  Avoid Spatial Proxy Over-Generalization
                </h4>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>
                Because Parimpore and Narwal have a very slow adjustment speed (-0.0088), agricultural advisory models must not substitute one mandi&apos;s spot prices for the other. 
                Each mandi requires localized, grade-specific neural network models.
              </p>
            </div>

            <div style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: '14px',
              padding: '1.5rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <Zap size={20} style={{ color: '#9333ea' }} />
                <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800 }}>
                  Data Telemetry Upgrades Under HADP
                </h4>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>
                To address data coverage gaps in Aglar and Nowpora, the Market Intelligence Cell is expanding automated electronic logging and daily arrival telemetry 
                under HADP Project #04, ensuring universal spatial monitoring across all J&amp;K horticulture clusters.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceTransmission;
