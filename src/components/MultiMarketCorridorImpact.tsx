import React, { useState } from 'react';
import { 
  Truck, 
  Clock, 
  DollarSign, 
  Info
} from 'lucide-react';
import { EditableLabel } from './EditableLabel';

export interface CorridorDestination {
  id: string;
  name: string;
  state: string;
  category: 'gateway' | 'north' | 'west' | 'south';
  distanceKm: number;
  normalTransitHours: number;
  disruptedTransitHours: {
    amber: number;
    red: number;
  };
  baseFreightRs: number; // per kg
  disruptedFreightRs: {
    amber: number;
    red: number;
  };
  cointegrationRate: string;
  speedLambda: number;
  elasticity: number;
  priceShockPct: {
    amber: number;
    red: number;
  };
  spoilageRisk: {
    normal: number;
    amber: number;
    red: number;
  };
  chokeVulnerability: 'High' | 'Critical' | 'Moderate' | 'Isolated';
  logisticsRole: string;
}

export const CORRIDOR_DESTINATIONS: CorridorDestination[] = [
  {
    id: 'narwal',
    name: 'Narwal (Jammu)',
    state: 'Jammu & Kashmir',
    category: 'gateway',
    distanceKm: 295,
    normalTransitHours: 14,
    disruptedTransitHours: { amber: 36, red: 96 },
    baseFreightRs: 2.20,
    disruptedFreightRs: { amber: 3.60, red: 5.40 },
    cointegrationRate: '85.1%',
    speedLambda: -0.0088,
    elasticity: 0.612,
    priceShockPct: { amber: 14.5, red: 32.0 },
    spoilageRisk: { normal: 1.2, amber: 6.5, red: 18.0 },
    chokeVulnerability: 'Critical',
    logisticsRole: 'Primary intra-state wholesale gateway; acute arrival starvation within 48h of highway closure.'
  },
  {
    id: 'kathua',
    name: 'Kathua Mandi',
    state: 'Jammu & Kashmir',
    category: 'gateway',
    distanceKm: 380,
    normalTransitHours: 18,
    disruptedTransitHours: { amber: 42, red: 108 },
    baseFreightRs: 2.80,
    disruptedFreightRs: { amber: 4.20, red: 6.10 },
    cointegrationRate: '78.5%',
    speedLambda: -0.0120,
    elasticity: 0.540,
    priceShockPct: { amber: 12.0, red: 26.5 },
    spoilageRisk: { normal: 1.5, amber: 7.0, red: 19.5 },
    chokeVulnerability: 'High',
    logisticsRole: 'Border exit gateway into Punjab/Himachal; buffer parking holding point for interstate fleets.'
  },
  {
    id: 'chandigarh',
    name: 'Chandigarh (Sec 26)',
    state: 'UT / Punjab / Haryana',
    category: 'north',
    distanceKm: 620,
    normalTransitHours: 26,
    disruptedTransitHours: { amber: 54, red: 120 },
    baseFreightRs: 3.80,
    disruptedFreightRs: { amber: 5.60, red: 7.90 },
    cointegrationRate: '92.4%',
    speedLambda: -0.0750,
    elasticity: 0.690,
    priceShockPct: { amber: 9.5, red: 21.0 },
    spoilageRisk: { normal: 1.8, amber: 8.2, red: 21.0 },
    chokeVulnerability: 'High',
    logisticsRole: 'Northern consuming and processing aggregator; fast error-correction absorption.'
  },
  {
    id: 'jalandhar',
    name: 'Jalandhar (Mks)',
    state: 'Punjab',
    category: 'north',
    distanceKm: 510,
    normalTransitHours: 22,
    disruptedTransitHours: { amber: 48, red: 112 },
    baseFreightRs: 3.40,
    disruptedFreightRs: { amber: 5.10, red: 7.20 },
    cointegrationRate: '94.0%',
    speedLambda: -0.0820,
    elasticity: 0.725,
    priceShockPct: { amber: 8.5, red: 19.5 },
    spoilageRisk: { normal: 1.6, amber: 7.5, red: 19.0 },
    chokeVulnerability: 'Moderate',
    logisticsRole: 'High-density Punjab transit circuit; close proximity to GT Road bypass corridors.'
  },
  {
    id: 'delhi',
    name: 'Azadpur (Delhi)',
    state: 'Delhi NCR',
    category: 'north',
    distanceKm: 830,
    normalTransitHours: 36,
    disruptedTransitHours: { amber: 72, red: 144 },
    baseFreightRs: 4.50,
    disruptedFreightRs: { amber: 6.80, red: 9.50 },
    cointegrationRate: '74.5%',
    speedLambda: -0.0590,
    elasticity: 0.510,
    priceShockPct: { amber: 11.2, red: 24.8 },
    spoilageRisk: { normal: 2.0, amber: 9.5, red: 24.5 },
    chokeVulnerability: 'Critical',
    logisticsRole: 'National benchmark APMC terminal; determines wholesale floor for all grade tiers.'
  },
  {
    id: 'jaipur',
    name: 'Jaipur (Muhana)',
    state: 'Rajasthan',
    category: 'west',
    distanceKm: 1080,
    normalTransitHours: 48,
    disruptedTransitHours: { amber: 88, red: 168 },
    baseFreightRs: 5.80,
    disruptedFreightRs: { amber: 8.40, red: 11.60 },
    cointegrationRate: '68.5%',
    speedLambda: -0.0380,
    elasticity: 0.460,
    priceShockPct: { amber: 10.5, red: 22.5 },
    spoilageRisk: { normal: 2.5, amber: 11.0, red: 27.0 },
    chokeVulnerability: 'Moderate',
    logisticsRole: 'Western gateway consumption hub; highly sensitive to Delicious Grade A arrivals.'
  },
  {
    id: 'ahmedabad',
    name: 'Ahmedabad (Naroda)',
    state: 'Gujarat',
    category: 'west',
    distanceKm: 1750,
    normalTransitHours: 72,
    disruptedTransitHours: { amber: 120, red: 216 },
    baseFreightRs: 7.80,
    disruptedFreightRs: { amber: 11.20, red: 15.40 },
    cointegrationRate: '64.2%',
    speedLambda: -0.0280,
    elasticity: 0.410,
    priceShockPct: { amber: 12.0, red: 26.0 },
    spoilageRisk: { normal: 3.2, amber: 13.5, red: 31.0 },
    chokeVulnerability: 'High',
    logisticsRole: 'Key western trade center; dual-market structure with Manekchowk retail.'
  },
  {
    id: 'mumbai',
    name: 'Mumbai (Vashi APMC)',
    state: 'Maharashtra',
    category: 'west',
    distanceKm: 2250,
    normalTransitHours: 96,
    disruptedTransitHours: { amber: 156, red: 264 },
    baseFreightRs: 8.80,
    disruptedFreightRs: { amber: 12.80, red: 17.50 },
    cointegrationRate: '71.0%',
    speedLambda: -0.0420,
    elasticity: 0.520,
    priceShockPct: { amber: 14.0, red: 29.5 },
    spoilageRisk: { normal: 3.8, amber: 15.0, red: 34.0 },
    chokeVulnerability: 'High',
    logisticsRole: 'Premium metropolitan terminal; highest per-box margins, acute transit spoilage exposure.'
  },
  {
    id: 'pune',
    name: 'Pune (Gultekdi)',
    state: 'Maharashtra',
    category: 'west',
    distanceKm: 2380,
    normalTransitHours: 102,
    disruptedTransitHours: { amber: 168, red: 280 },
    baseFreightRs: 9.20,
    disruptedFreightRs: { amber: 13.40, red: 18.20 },
    cointegrationRate: '66.7%',
    speedLambda: -0.0350,
    elasticity: 0.480,
    priceShockPct: { amber: 12.5, red: 27.0 },
    spoilageRisk: { normal: 4.0, amber: 15.5, red: 35.0 },
    chokeVulnerability: 'Moderate',
    logisticsRole: 'Sub-regional distribution hub for Western Maharashtra and coastal konkan.'
  },
  {
    id: 'bengaluru',
    name: 'Bengaluru (Binny Mill)',
    state: 'Karnataka',
    category: 'south',
    distanceKm: 2950,
    normalTransitHours: 120,
    disruptedTransitHours: { amber: 196, red: 320 },
    baseFreightRs: 11.50,
    disruptedFreightRs: { amber: 16.50, red: 22.80 },
    cointegrationRate: '54.5%',
    speedLambda: -0.0180,
    elasticity: 0.320,
    priceShockPct: { amber: 15.0, red: 33.0 },
    spoilageRisk: { normal: 4.5, amber: 18.0, red: 40.0 },
    chokeVulnerability: 'Moderate',
    logisticsRole: 'Extreme long-haul destination; refrigerated reefer containers mandatory to survive corridor delays.'
  }
];

export const MultiMarketCorridorImpact: React.FC = () => {
  const [selectedOrigin, setSelectedOrigin] = useState<'Shopian' | 'Sopore' | 'Parimpore'>('Shopian');
  const [alertSeverity, setAlertSeverity] = useState<'green' | 'amber' | 'red'>('red');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'gateway' | 'north' | 'west' | 'south'>('all');
  const [selectedDestId, setSelectedDestId] = useState<string>('delhi');
  const [simTruckTons, setSimTruckTons] = useState<number>(15);

  const filteredDestinations = CORRIDOR_DESTINATIONS.filter(d => {
    return categoryFilter === 'all' || d.category === categoryFilter;
  });

  const selectedMandi = CORRIDOR_DESTINATIONS.find(d => d.id === selectedDestId) || CORRIDOR_DESTINATIONS[4];

  // Calculated simulation metrics for selected mandi
  const currentTransitHours = alertSeverity === 'green' 
    ? selectedMandi.normalTransitHours 
    : selectedMandi.disruptedTransitHours[alertSeverity];

  const currentFreightPerKg = alertSeverity === 'green'
    ? selectedMandi.baseFreightRs
    : selectedMandi.disruptedFreightRs[alertSeverity];

  const freightSurgePct = alertSeverity === 'green' 
    ? 0 
    : ((currentFreightPerKg - selectedMandi.baseFreightRs) / selectedMandi.baseFreightRs) * 100;

  const currentSpoilageRate = alertSeverity === 'green'
    ? selectedMandi.spoilageRisk.normal
    : selectedMandi.spoilageRisk[alertSeverity];

  const currentPriceSpike = alertSeverity === 'green'
    ? 0
    : selectedMandi.priceShockPct[alertSeverity];

  // Truckload calculations (15 tons = 15,000 kg approx 800 standard 18.5kg boxes)
  const truckKg = simTruckTons * 1000;
  const normalFreightTotal = truckKg * selectedMandi.baseFreightRs;
  const currentFreightTotal = truckKg * currentFreightPerKg;
  const freightPenalty = currentFreightTotal - normalFreightTotal;
  const estCargoValue = truckKg * 60; // Assuming ₹60/kg average value = ₹9,00,000
  const spoilageLossRs = estCargoValue * (currentSpoilageRate / 100);

  return (
    <div className="multi-market-corridor-wrap animate-fade-in" style={{ width: '100%' }}>
      
      {/* Scope Header Card */}
      <div style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: '14px',
        padding: '1.5rem',
        marginBottom: '1.75rem',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <span style={{
              background: '#15803d',
              color: 'white',
              borderRadius: '8px',
              padding: '6px 10px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.75rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.04em'
            }}>
              <Truck size={14} /> Multi-Market Scope
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
              10 National Terminal &amp; Gateway Mandis • NH-44 Highway Network
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)' }}>
              Simulated Corridor Alert:
            </span>
            <div style={{ display: 'inline-flex', borderRadius: '8px', border: '1px solid var(--color-border)', overflow: 'hidden' }}>
              <button
                onClick={() => setAlertSeverity('green')}
                style={{
                  padding: '5px 12px',
                  border: 'none',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  backgroundColor: alertSeverity === 'green' ? '#16a34a' : 'transparent',
                  color: alertSeverity === 'green' ? '#ffffff' : 'var(--color-text-muted)'
                }}
              >
                🟢 Normal
              </button>
              <button
                onClick={() => setAlertSeverity('amber')}
                style={{
                  padding: '5px 12px',
                  border: 'none',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  backgroundColor: alertSeverity === 'amber' ? '#d97706' : 'transparent',
                  color: alertSeverity === 'amber' ? '#ffffff' : 'var(--color-text-muted)'
                }}
              >
                🟡 Amber
              </button>
              <button
                onClick={() => setAlertSeverity('red')}
                style={{
                  padding: '5px 12px',
                  border: 'none',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  backgroundColor: alertSeverity === 'red' ? '#dc2626' : 'transparent',
                  color: alertSeverity === 'red' ? '#ffffff' : 'var(--color-text-muted)'
                }}
              >
                🔴 Red Blockade
              </button>
            </div>
          </div>
        </div>

        <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--color-text-main)', margin: '0 0 0.5rem 0' }}>
          <EditableLabel labelKey="mmc_title" defaultValue="NH-44 Multi-Market Corridor Impact & Spatial Transmission Engine" />
        </h3>
        <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.6 }}>
          <EditableLabel 
            labelKey="mmc_desc" 
            defaultValue="Assessing how highway closures at Ramban, Panthyal, and Banihal cascade beyond Delhi to Jammu (Narwal), Punjab (Jalandhar/Chandigarh), Rajasthan, Gujarat, and Maharashtra. Correlating 2,225 pair econometric cointegration findings with real-time transit delays, freight escalations, and distress glut crashes."
          />
        </p>
      </div>

      {/* Corridor Chokepoint Spatial Visualizer */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(6, 32, 18, 0.95) 0%, rgba(13, 56, 32, 0.95) 100%)',
        borderRadius: '14px',
        padding: '1.5rem',
        color: '#ffffff',
        marginBottom: '2rem',
        boxShadow: 'var(--shadow-md)',
        border: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#86efac', fontWeight: 800 }}>
              Physical Highway Bottleneck Architecture
            </div>
            <h4 style={{ margin: '0.2rem 0 0 0', fontSize: '1.1rem', fontWeight: 900 }}>
              Kashmir Valley to National Consumption Pipeline
            </h4>
          </div>
          <div style={{
            background: alertSeverity === 'red' ? 'rgba(220, 38, 38, 0.25)' : (alertSeverity === 'amber' ? 'rgba(217, 119, 6, 0.25)' : 'rgba(22, 163, 74, 0.25)'),
            border: `1px solid ${alertSeverity === 'red' ? '#dc2626' : (alertSeverity === 'amber' ? '#d97706' : '#16a34a')}`,
            color: alertSeverity === 'red' ? '#fca5a5' : (alertSeverity === 'amber' ? '#fde68a' : '#86efac'),
            padding: '4px 12px',
            borderRadius: '999px',
            fontSize: '0.75rem',
            fontWeight: 800
          }}>
            Corridor Status: {alertSeverity.toUpperCase()} • {alertSeverity === 'red' ? 'Highways Blocked (>48h backlog)' : (alertSeverity === 'amber' ? 'Convoy Mode / Slide Alerts' : 'Clear All-Weather')}
          </div>
        </div>

        {/* 4-Stage Corridor Pipeline Blocks */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
          gap: '1rem',
          position: 'relative'
        }}>
          {/* Stage 1 */}
          <div style={{
            background: 'rgba(255,255,255,0.06)',
            borderRadius: '10px',
            padding: '1rem',
            border: '1px solid rgba(255,255,255,0.12)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <span style={{ fontSize: '1rem' }}>🍎</span>
              <strong style={{ fontSize: '0.88rem', color: '#86efac' }}>Stage 1: Valley Assembly</strong>
            </div>
            <div style={{ fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.45 }}>
              <strong>Shopian, Sopore, Parimpore</strong>
              <div style={{ marginTop: '0.35rem', color: alertSeverity === 'red' ? '#f87171' : '#94a3b8' }}>
                {alertSeverity === 'red' ? '⚠️ Local Glut Crash (-25% to -35% spot price)' : 'Normal daily arrivals & packing'}
              </div>
            </div>
          </div>

          {/* Stage 2 */}
          <div style={{
            background: alertSeverity === 'red' ? 'rgba(220, 38, 38, 0.15)' : 'rgba(255,255,255,0.06)',
            borderRadius: '10px',
            padding: '1rem',
            border: `1px solid ${alertSeverity === 'red' ? 'rgba(220, 38, 38, 0.4)' : 'rgba(255,255,255,0.12)'}`
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <span style={{ fontSize: '1rem' }}>⛰️</span>
              <strong style={{ fontSize: '0.88rem', color: alertSeverity === 'red' ? '#fca5a5' : '#fde68a' }}>
                Stage 2: NH-44 Bottleneck
              </strong>
            </div>
            <div style={{ fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.45 }}>
              <strong>Banihal, Ramban, Mehar, Panthyal</strong>
              <div style={{ marginTop: '0.35rem', color: alertSeverity === 'red' ? '#f87171' : '#94a3b8' }}>
                {alertSeverity === 'red' ? '⛔ Shooting stones, stranded truck queues (3,000–5,000 vehicles)' : 'Smooth 2-way freight flow'}
              </div>
            </div>
          </div>

          {/* Stage 3 */}
          <div style={{
            background: 'rgba(255,255,255,0.06)',
            borderRadius: '10px',
            padding: '1rem',
            border: '1px solid rgba(255,255,255,0.12)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <span style={{ fontSize: '1rem' }}>🏛️</span>
              <strong style={{ fontSize: '0.88rem', color: '#93c5fd' }}>Stage 3: J&amp;K Gateway Hub</strong>
            </div>
            <div style={{ fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.45 }}>
              <strong>Narwal (Jammu), Kathua</strong>
              <div style={{ marginTop: '0.35rem', color: alertSeverity === 'red' ? '#fde68a' : '#94a3b8' }}>
                {alertSeverity === 'red' ? '🚨 Arrival Starvation: Narwal wholesale jumps +32%' : 'Buffer holding & interstate dispatch'}
              </div>
            </div>
          </div>

          {/* Stage 4 */}
          <div style={{
            background: 'rgba(255,255,255,0.06)',
            borderRadius: '10px',
            padding: '1rem',
            border: '1px solid rgba(255,255,255,0.12)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <span style={{ fontSize: '1rem' }}>🚚</span>
              <strong style={{ fontSize: '0.88rem', color: '#fbcfe8' }}>Stage 4: National Mandis</strong>
            </div>
            <div style={{ fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.45 }}>
              <strong>Delhi, Chandigarh, Mumbai, Ahmedabad</strong>
              <div style={{ marginTop: '0.35rem', color: alertSeverity === 'red' ? '#fca5a5' : '#94a3b8' }}>
                {alertSeverity === 'red' ? '📈 Freight up +70% to +90%; terminal retail spikes' : 'Regular 36h–96h delivery windows'}
              </div>
            </div>
          </div>
        </div>

        <div style={{
          marginTop: '1.25rem',
          padding: '0.75rem 1rem',
          background: 'rgba(0,0,0,0.3)',
          borderRadius: '8px',
          fontSize: '0.8rem',
          color: '#cbd5e1',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          <Info size={18} style={{ color: '#38bdf8', flexShrink: 0 }} />
          <span>
            <strong>Econometric Validation:</strong> Parimpore and Narwal have an adjustment speed of only <strong>&lambda; = -0.0088</strong> (&lt;1% daily gap closed). This confirms they operate on opposite sides of the Pir Panjal barrier as non-interchangeable spot roles rather than frictionless substitutes.
          </span>
        </div>
      </div>

      {/* Interactive Mandi Selector & Deep Dive Dashboard */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        
        {/* Left Column: 10 Destination Mandi Selection Grid */}
        <div style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: '14px',
          padding: '1.25rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: 'var(--color-text-main)' }}>
              Select Destination Mandi
            </h4>
            
            {/* Filter buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
              {(['all', 'gateway', 'north', 'west', 'south'] as const).map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  style={{
                    fontSize: '0.7rem',
                    padding: '3px 8px',
                    borderRadius: '5px',
                    border: '1px solid var(--color-border)',
                    backgroundColor: categoryFilter === cat ? 'var(--color-primary)' : 'transparent',
                    color: categoryFilter === cat ? '#ffffff' : 'var(--color-text-muted)',
                    cursor: 'pointer',
                    fontWeight: 700,
                    textTransform: 'capitalize'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Mandi List Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', maxHeight: '520px', overflowY: 'auto', paddingRight: '4px' }}>
            {filteredDestinations.map(mandi => {
              const isSelected = mandi.id === selectedDestId;
              const mandiFreight = alertSeverity === 'green' ? mandi.baseFreightRs : mandi.disruptedFreightRs[alertSeverity];
              const mandiHours = alertSeverity === 'green' ? mandi.normalTransitHours : mandi.disruptedTransitHours[alertSeverity];

              return (
                <div
                  key={mandi.id}
                  onClick={() => setSelectedDestId(mandi.id)}
                  style={{
                    padding: '0.85rem 1rem',
                    borderRadius: '10px',
                    border: `1.5px solid ${isSelected ? 'var(--color-primary)' : 'var(--color-border)'}`,
                    backgroundColor: isSelected ? 'var(--color-primary-pale, rgba(21, 128, 61, 0.08))' : 'var(--color-surface)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <strong style={{ fontSize: '0.9rem', color: 'var(--color-text-main)' }}>
                        {mandi.name}
                      </strong>
                      <span style={{
                        fontSize: '0.65rem',
                        padding: '1px 6px',
                        borderRadius: '4px',
                        backgroundColor: 'var(--color-surface-hover)',
                        color: 'var(--color-text-muted)',
                        fontWeight: 600
                      }}>
                        {mandi.distanceKm} km
                      </span>
                    </div>

                    <span style={{
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      padding: '2px 7px',
                      borderRadius: '999px',
                      backgroundColor: mandi.chokeVulnerability === 'Critical' 
                        ? 'rgba(220, 38, 38, 0.1)' 
                        : (mandi.chokeVulnerability === 'High' ? 'rgba(217, 119, 6, 0.1)' : 'rgba(22, 163, 74, 0.1)'),
                      color: mandi.chokeVulnerability === 'Critical' 
                        ? '#dc2626' 
                        : (mandi.chokeVulnerability === 'High' ? '#d97706' : '#16a34a')
                    }}>
                      {mandi.chokeVulnerability} Risk
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.76rem', color: 'var(--color-text-muted)', marginTop: '0.4rem' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                      <Clock size={12} /> {mandiHours}h ({mandiHours > mandi.normalTransitHours ? `+${mandiHours - mandi.normalTransitHours}h delay` : 'Normal'})
                    </span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', fontWeight: 700, color: alertSeverity !== 'green' ? '#dc2626' : 'var(--color-text-main)' }}>
                      <DollarSign size={12} /> ₹{mandiFreight.toFixed(2)}/kg
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detailed Disruption Impact on Selected Mandi */}
        <div style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: '14px',
          padding: '1.5rem',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--color-primary)', fontWeight: 800 }}>
                  Active Analysis Target
                </span>
                <h3 style={{ margin: '0.1rem 0 0 0', fontSize: '1.35rem', fontWeight: 900, color: 'var(--color-text-main)' }}>
                  {selectedMandi.name}
                </h3>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>Origin Mandi</span>
                <div style={{ display: 'flex', gap: '0.3rem', marginTop: '0.2rem' }}>
                  {(['Shopian', 'Sopore', 'Parimpore'] as const).map(orig => (
                    <button
                      key={orig}
                      onClick={() => setSelectedOrigin(orig)}
                      style={{
                        fontSize: '0.72rem',
                        padding: '2px 8px',
                        borderRadius: '5px',
                        border: '1px solid var(--color-border)',
                        backgroundColor: selectedOrigin === orig ? 'var(--color-primary)' : 'transparent',
                        color: selectedOrigin === orig ? '#ffffff' : 'var(--color-text-muted)',
                        cursor: 'pointer',
                        fontWeight: 700
                      }}
                    >
                      {orig}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <p style={{ fontSize: '0.84rem', color: 'var(--color-text-muted)', marginBottom: '1.25rem', lineHeight: 1.5 }}>
              {selectedMandi.logisticsRole}
            </p>

            {/* Metric Scorecards for Target */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '0.75rem',
              marginBottom: '1.25rem'
            }}>
              {/* Transit Time Card */}
              <div style={{ background: 'var(--color-surface-hover)', borderRadius: '10px', padding: '0.85rem', border: '1px solid var(--color-border)' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                  Total Transit Time
                </div>
                <div style={{ fontSize: '1.4rem', fontWeight: 900, color: alertSeverity === 'red' ? '#dc2626' : (alertSeverity === 'amber' ? '#d97706' : '#16a34a') }}>
                  {currentTransitHours} hrs
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', marginTop: '0.2rem' }}>
                  Normal: {selectedMandi.normalTransitHours}h {alertSeverity !== 'green' && `(+${currentTransitHours - selectedMandi.normalTransitHours}h delay)`}
                </div>
              </div>

              {/* Freight Rate Card */}
              <div style={{ background: 'var(--color-surface-hover)', borderRadius: '10px', padding: '0.85rem', border: '1px solid var(--color-border)' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                  Freight Rate
                </div>
                <div style={{ fontSize: '1.4rem', fontWeight: 900, color: alertSeverity !== 'green' ? '#dc2626' : 'var(--color-text-main)' }}>
                  ₹{currentFreightPerKg.toFixed(2)}<span style={{ fontSize: '0.8rem', fontWeight: 600 }}>/kg</span>
                </div>
                <div style={{ fontSize: '0.72rem', color: alertSeverity !== 'green' ? '#dc2626' : 'var(--color-text-muted)', marginTop: '0.2rem', fontWeight: 600 }}>
                  {alertSeverity !== 'green' ? `+${freightSurgePct.toFixed(1)}% escalation` : 'Standard tariff'}
                </div>
              </div>

              {/* Price Shock Reaction Card */}
              <div style={{ background: 'var(--color-surface-hover)', borderRadius: '10px', padding: '0.85rem', border: '1px solid var(--color-border)' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                  Mandi Price Shock
                </div>
                <div style={{ fontSize: '1.4rem', fontWeight: 900, color: currentPriceSpike > 0 ? '#dc2626' : 'var(--color-text-main)' }}>
                  {currentPriceSpike > 0 ? `+${currentPriceSpike.toFixed(1)}%` : 'Equilibrium'}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', marginTop: '0.2rem' }}>
                  {currentPriceSpike > 0 ? 'Terminal Scarcity Inflation' : 'Long-run balance'}
                </div>
              </div>

              {/* Cargo Spoilage Risk Card */}
              <div style={{ background: 'var(--color-surface-hover)', borderRadius: '10px', padding: '0.85rem', border: '1px solid var(--color-border)' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                  Perishability Spoilage
                </div>
                <div style={{ fontSize: '1.4rem', fontWeight: 900, color: currentSpoilageRate > 10 ? '#dc2626' : (currentSpoilageRate > 5 ? '#d97706' : '#16a34a') }}>
                  {currentSpoilageRate.toFixed(1)}%
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', marginTop: '0.2rem' }}>
                  Grade downgrade &amp; rotting
                </div>
              </div>
            </div>

            {/* Econometric Cointegration Insight */}
            <div style={{
              background: 'var(--color-primary-pale, rgba(21, 128, 61, 0.08))',
              border: '1px solid var(--color-border)',
              borderRadius: '10px',
              padding: '0.85rem 1rem',
              marginBottom: '1.25rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <strong style={{ fontSize: '0.82rem', color: 'var(--color-primary)' }}>
                  Econometric Cointegration Parameter
                </strong>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#16a34a' }}>
                  Cointegrated: {selectedMandi.cointegrationRate}
                </span>
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                Error-Correction Speed: <strong>&lambda; = {selectedMandi.speedLambda.toFixed(4)}</strong> • Elasticity: <strong>&beta; = {selectedMandi.elasticity.toFixed(3)}</strong>
                <br />
                {Math.abs(selectedMandi.speedLambda) < 0.02 
                  ? '⚠️ Very slow price transmission — markets operate as distinct supply segments; local buffer stockpiles are vital.'
                  : 'Fast spatial arbitrage — wholesale prices re-equilibrate quickly once road connectivity is restored.'}
              </div>
            </div>
          </div>

          {/* Consignment Cost Breakdown Calculator */}
          <div style={{
            background: 'var(--color-surface-hover)',
            borderRadius: '10px',
            padding: '1rem',
            border: '1px solid var(--color-border)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.4rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-text-main)' }}>
                {simTruckTons}-Tonne Truckload Financial Exposure ({selectedOrigin} &rarr; {selectedMandi.name})
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>Payload:</span>
                {[10, 15, 22].map(tons => (
                  <button
                    key={tons}
                    onClick={() => setSimTruckTons(tons)}
                    style={{
                      fontSize: '0.68rem',
                      padding: '2px 7px',
                      borderRadius: '4px',
                      border: '1px solid var(--color-border)',
                      backgroundColor: simTruckTons === tons ? 'var(--color-primary)' : 'var(--color-surface)',
                      color: simTruckTons === tons ? '#ffffff' : 'var(--color-text-muted)',
                      cursor: 'pointer',
                      fontWeight: 700
                    }}
                  >
                    {tons}T
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.5rem', textAlign: 'center' }}>
              <div style={{ padding: '0.4rem', background: 'var(--color-surface)', borderRadius: '6px' }}>
                <div style={{ fontSize: '0.68rem', color: 'var(--color-text-muted)' }}>Base Freight</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--color-text-main)' }}>₹{normalFreightTotal.toLocaleString()}</div>
              </div>
              <div style={{ padding: '0.4rem', background: 'var(--color-surface)', borderRadius: '6px' }}>
                <div style={{ fontSize: '0.68rem', color: 'var(--color-text-muted)' }}>Disruption Freight</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: alertSeverity !== 'green' ? '#dc2626' : 'var(--color-text-main)' }}>
                  ₹{currentFreightTotal.toLocaleString()}
                </div>
              </div>
              <div style={{ padding: '0.4rem', background: 'var(--color-surface)', borderRadius: '6px' }}>
                <div style={{ fontSize: '0.68rem', color: 'var(--color-text-muted)' }}>Freight Penalty</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: freightPenalty > 0 ? '#dc2626' : '#16a34a' }}>
                  +₹{freightPenalty.toLocaleString()}
                </div>
              </div>
              <div style={{ padding: '0.4rem', background: 'var(--color-surface)', borderRadius: '6px' }}>
                <div style={{ fontSize: '0.68rem', color: 'var(--color-text-muted)' }}>Est. Rot / Spoilage Loss</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: spoilageLossRs > 50000 ? '#dc2626' : '#d97706' }}>
                  ₹{Math.round(spoilageLossRs).toLocaleString()}
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Bypass & Alternate Routing Decision Matrix */}
      <div style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: '14px',
        padding: '1.5rem',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h4 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 900, color: 'var(--color-text-main)' }}>
              Corridor Bypass &amp; Alternate Routing Evaluation
            </h4>
            <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
              Comparative multi-modal mitigation options during Red Alert highway blockades.
            </p>
          </div>
          <span style={{ fontSize: '0.72rem', background: 'var(--color-primary-pale)', color: 'var(--color-primary)', padding: '3px 8px', borderRadius: '999px', fontWeight: 700 }}>
            Policy Directives §7.1 – §7.5 Grounded
          </span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'var(--color-surface-hover)', borderBottom: '2px solid var(--color-border)' }}>
                <th style={{ padding: '0.75rem 1rem', fontWeight: 800, color: 'var(--color-text-main)' }}>Route Option</th>
                <th style={{ padding: '0.75rem 1rem', fontWeight: 800, color: 'var(--color-text-main)' }}>Corridor Path</th>
                <th style={{ padding: '0.75rem 1rem', fontWeight: 800, color: 'var(--color-text-main)' }}>Feasibility (Red Alert)</th>
                <th style={{ padding: '0.75rem 1rem', fontWeight: 800, color: 'var(--color-text-main)' }}>Transit Hours</th>
                <th style={{ padding: '0.75rem 1rem', fontWeight: 800, color: 'var(--color-text-main)' }}>Cost / kg</th>
                <th style={{ padding: '0.75rem 1rem', fontWeight: 800, color: 'var(--color-text-main)' }}>Spoilage Risk</th>
                <th style={{ padding: '0.75rem 1rem', fontWeight: 800, color: 'var(--color-text-main)' }}>Operational Trade-Off</th>
              </tr>
            </thead>
            <tbody>
              {/* Route 1 */}
              <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>
                  <span style={{ color: '#dc2626' }}>Route A: NH-44 Highway</span>
                </td>
                <td style={{ padding: '0.75rem 1rem', color: 'var(--color-text-muted)' }}>
                  Srinagar &rarr; Banihal &rarr; Ramban &rarr; Jammu &rarr; Delhi
                </td>
                <td style={{ padding: '0.75rem 1rem' }}>
                  <span style={{ background: 'rgba(220, 38, 38, 0.1)', color: '#dc2626', padding: '2px 7px', borderRadius: '4px', fontWeight: 800, fontSize: '0.72rem' }}>
                    ⛔ Vulnerable
                  </span>
                </td>
                <td style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>96h – 144h</td>
                <td style={{ padding: '0.75rem 1rem', fontWeight: 700, color: '#dc2626' }}>₹8.50 – ₹11.00</td>
                <td style={{ padding: '0.75rem 1rem', color: '#dc2626', fontWeight: 700 }}>18% – 25%</td>
                <td style={{ padding: '0.75rem 1rem', color: 'var(--color-text-muted)' }}>
                  Default bulk route. Stranded trucks suffer acute rot; shooting stones at Ramban/Mehar pose safety hazards.
                </td>
              </tr>

              {/* Route 2 */}
              <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>
                  <span style={{ color: '#d97706' }}>Route B: Mughal Road</span>
                </td>
                <td style={{ padding: '0.75rem 1rem', color: 'var(--color-text-muted)' }}>
                  Shopian &rarr; Peer Ki Gali &rarr; Bafliaz &rarr; Rajouri &rarr; Akhnoor
                </td>
                <td style={{ padding: '0.75rem 1rem' }}>
                  <span style={{ background: 'rgba(217, 119, 6, 0.1)', color: '#d97706', padding: '2px 7px', borderRadius: '4px', fontWeight: 800, fontSize: '0.72rem' }}>
                    ⚠️ Conditional
                  </span>
                </td>
                <td style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>48h – 65h</td>
                <td style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>₹5.80 – ₹7.20</td>
                <td style={{ padding: '0.75rem 1rem', color: '#d97706', fontWeight: 700 }}>5% – 8%</td>
                <td style={{ padding: '0.75rem 1rem', color: 'var(--color-text-muted)' }}>
                  Bypasses Ramban chokepoint completely. Weight restricted (LCVs &amp; 2-axle trucks only); closed during mid-winter heavy snow.
                </td>
              </tr>

              {/* Route 3 */}
              <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>
                  <span style={{ color: '#16a34a' }}>Route C: Rail Reefer Express</span>
                </td>
                <td style={{ padding: '0.75rem 1rem', color: 'var(--color-text-muted)' }}>
                  Road shuttle to Udhampur/Jammu &rarr; Reefer Train &rarr; Metros
                </td>
                <td style={{ padding: '0.75rem 1rem' }}>
                  <span style={{ background: 'rgba(22, 163, 74, 0.1)', color: '#16a34a', padding: '2px 7px', borderRadius: '4px', fontWeight: 800, fontSize: '0.72rem' }}>
                    ✅ High Immunity
                  </span>
                </td>
                <td style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>48h Scheduled</td>
                <td style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>₹6.20 – ₹7.50</td>
                <td style={{ padding: '0.75rem 1rem', color: '#16a34a', fontWeight: 700 }}>&lt; 1.5%</td>
                <td style={{ padding: '0.75rem 1rem', color: 'var(--color-text-muted)' }}>
                  Refrigerated temperature control immune to road traffic jams once at Jammu railhead. Requires multi-modal transshipment.
                </td>
              </tr>

              {/* Route 4 */}
              <tr>
                <td style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>
                  <span style={{ color: '#2563eb' }}>Route D: Valley CA Storage</span>
                </td>
                <td style={{ padding: '0.75rem 1rem', color: 'var(--color-text-muted)' }}>
                  Lassipora / Shopian Industrial CA Stores (14–21 day hold)
                </td>
                <td style={{ padding: '0.75rem 1rem' }}>
                  <span style={{ background: 'rgba(37, 99, 235, 0.1)', color: '#2563eb', padding: '2px 7px', borderRadius: '4px', fontWeight: 800, fontSize: '0.72rem' }}>
                    🛡️ Buffer Shield
                  </span>
                </td>
                <td style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>0h (In-situ)</td>
                <td style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>₹1.40 / month</td>
                <td style={{ padding: '0.75rem 1rem', color: '#16a34a', fontWeight: 700 }}>&lt; 0.5%</td>
                <td style={{ padding: '0.75rem 1rem', color: 'var(--color-text-muted)' }}>
                  Prevents distress farmgate dumping during highway closures. Growers wait out road restoration and sell into rebounding markets.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
