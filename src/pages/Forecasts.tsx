import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TrendingUp, Layers, LineChart, Landmark } from 'lucide-react';
import RealTimePrices from '../components/RealTimePrices';
import OrchardLedger from './OrchardLedger';
import { EditableLabel } from '../components/EditableLabel';

const Forecasts: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeView = (searchParams.get('view') || 'predict') as 'predict' | 'tool' | 'dashboard' | 'ledger';
  const [currentTheme, setCurrentTheme] = useState(document.documentElement.getAttribute('data-theme') || 'light');

  const setActiveView = (view: 'predict' | 'tool' | 'dashboard' | 'ledger') => {
    setSearchParams({ view });
  };

  useEffect(() => {
    const handleThemeChange = () => {
      const newTheme = document.documentElement.getAttribute('data-theme') || 'light';
      setCurrentTheme(newTheme);
    };
    window.addEventListener('theme-changed', handleThemeChange);
    return () => {
      window.removeEventListener('theme-changed', handleThemeChange);
    };
  }, []);

  return (
    <div className="container section-padding animate-fade-in">
      {/* MIC Announcements Banner */}
      <div style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-sm)',
        padding: '0.5rem 1rem',
        marginBottom: '2rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{
          backgroundColor: '#15803d',
          color: 'white',
          padding: '0.25rem 0.75rem',
          borderRadius: '2px',
          fontWeight: 800,
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem',
          clipPath: 'polygon(0% 0%, 90% 0%, 100% 50%, 90% 100%, 0% 100%)'
        }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#f87171', display: 'inline-block' }} />
          MIC Update
        </div>
        <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-main)' }}>
          🍎 AI-powered Apple Price Forecasts for the 2026–27 marketing season are now <span style={{ color: '#15803d', fontWeight: 800 }}>LIVE</span> on MIC — providing wholesale price projections.
        </p>
      </div>

      {/* Main Mode Select Tabs */}
      <div className="market-tabs" style={{ marginBottom: '2.5rem' }}>
        <button
          onClick={() => setActiveView('predict')}
          className={`market-tab-btn ${activeView === 'predict' ? 'active' : ''}`}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
        >
          <TrendingUp size={18} /> 
          <EditableLabel labelKey="forecast_tab_realtime" defaultValue="Real-Time Forecasts" />
        </button>
        <button
          onClick={() => setActiveView('tool')}
          className={`market-tab-btn ${activeView === 'tool' ? 'active' : ''}`}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
        >
          <LineChart size={18} /> 
          <EditableLabel labelKey="forecast_tab_tool" defaultValue="Smart Forecasting Tool" />
        </button>
        <button
          onClick={() => setActiveView('dashboard')}
          className={`market-tab-btn ${activeView === 'dashboard' ? 'active' : ''}`}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
        >
          <Layers size={18} /> 
          <EditableLabel labelKey="forecast_tab_mandi" defaultValue="Live Mandi Data" />
        </button>
        <button
          onClick={() => setActiveView('ledger')}
          className={`market-tab-btn ${activeView === 'ledger' ? 'active' : ''}`}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
        >
          <Landmark size={18} /> 
          <EditableLabel labelKey="forecast_tab_ledger" defaultValue="Orchard Ledger (Stats)" />
        </button>
      </div>

      {/* VIEW 1: Smart Forecasts Panel (Full Real-Time Price Forecasts Dashboard) */}
      {activeView === 'predict' && (
        <div className="animate-fade-in">
          <div style={{
            width: '100%',
            maxWidth: 'none',
            margin: '0 auto',
            padding: 0,
            boxSizing: 'border-box'
          }}>
            <iframe
              src={`https://micmandis.onrender.com/forecast/mydash?theme=${currentTheme}`}
              title="Real-Time Price Forecasts Dashboard"
              style={{
                width: '100%',
                height: '82vh',
                display: 'block',
                border: 'none',
                borderRadius: '12px',
                boxShadow: '0 6px 22px rgba(0,0,0,.08)',
                margin: 0,
                padding: 0,
                filter: currentTheme === 'dark' ? 'invert(0.9) hue-rotate(180deg)' : 'none'
              }}
            />
          </div>
        </div>
      )}

      {/* VIEW: Forecasting Tool (Live /forecast Iframe Widget) */}
      {activeView === 'tool' && (
        <div className="animate-fade-in">
          <div style={{
            width: '100%',
            maxWidth: 'none',
            margin: '0 auto',
            padding: 0,
            boxSizing: 'border-box'
          }}>
            <iframe
              src={`https://micmandis.onrender.com/forecast?theme=${currentTheme}`}
              title="Agricultural Forecasting Tool"
              style={{
                width: '100%',
                height: '80vh',
                display: 'block',
                border: 'none',
                borderRadius: '12px',
                boxShadow: '0 6px 22px rgba(0,0,0,.08)',
                margin: 0,
                padding: 0,
                filter: currentTheme === 'dark' ? 'invert(0.9) hue-rotate(180deg)' : 'none'
              }}
            />
          </div>
        </div>
      )}

      {/* VIEW 2: Market Intelligence Dashboard (Live mydash Iframe Widget) */}
      {activeView === 'dashboard' && (
        <div className="animate-fade-in">
          <div style={{
            width: '100%',
            maxWidth: 'none',
            margin: '0 auto',
            padding: 0,
            boxSizing: 'border-box'
          }}>
            {/* Embedded Live Market Intelligence Dashboard iframe */}
            <iframe
              src={`https://micmandis.onrender.com/forecast/mydash?theme=${currentTheme}`}
              title="Agricultural Price Intelligence Dashboard"
              style={{
                width: '100%',
                height: '80vh',
                display: 'block',
                border: 'none',
                borderRadius: '12px',
                boxShadow: '0 6px 22px rgba(0,0,0,.08)',
                margin: 0,
                padding: 0,
                filter: currentTheme === 'dark' ? 'invert(0.9) hue-rotate(180deg)' : 'none'
              }}
            />
          </div>
          {/* Real Time Market Prices */}
          <div style={{ marginTop: '4rem' }}>
            <RealTimePrices />
          </div>
        </div>
      )}

      {/* VIEW: Orchard Ledger (Historical Stats Dashboard) */}
      {activeView === 'ledger' && (
        <div className="animate-fade-in" style={{ backgroundColor: 'var(--color-surface)', borderRadius: '16px', border: '1px solid var(--color-border)', overflow: 'hidden', padding: '1.5rem' }}>
          <OrchardLedger />
        </div>
      )}

    </div>
  );
};

export default Forecasts;
