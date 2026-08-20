import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TrendingUp, Layers, Landmark } from 'lucide-react';
import RealTimePrices from '../components/RealTimePrices';
import OrchardLedger from './OrchardLedger';
import { EditableLabel } from '../components/EditableLabel';

const Forecasts: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeView = (searchParams.get('view') || 'predict') as 'predict' | 'dashboard' | 'ledger';
  
  const [forecastLoaded, setForecastLoaded] = useState(false);
  const [mandiLoaded, setMandiLoaded] = useState(false);

  const setActiveView = (view: 'predict' | 'dashboard' | 'ledger') => {
    setSearchParams({ view });
  };

  useEffect(() => {
    setForecastLoaded(false);
    setMandiLoaded(false);
  }, [activeView]);

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

      {/* VIEW 1: Smart Forecasts Panel (Live Apple Forecasts Iframe Widget) */}
      {activeView === 'predict' && (
        <div className="animate-fade-in">
          <div style={{
            width: '100%',
            maxWidth: 'none',
            margin: '0 auto',
            padding: 0,
            boxSizing: 'border-box'
          }}>
            <div className="mic-widget" style={{
              width: '100%',
              maxWidth: 'none',
              borderRadius: '16px',
              boxShadow: 'var(--shadow-md)',
              border: '1px solid var(--color-border)',
              background: 'var(--color-surface)',
              overflow: 'hidden',
              boxSizing: 'border-box',
              padding: '1.5rem'
            }}>
              {/* Header */}
              <div className="mic-head" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '12px',
                textAlign: 'center'
              }}>
                <h3 style={{
                  margin: 0,
                  fontSize: 'clamp(16px,2vw,20px)',
                  lineHeight: 1.2,
                  fontWeight: 1000,
                  color: 'var(--color-text-main)'
                }}>
                  Smart Forecasts by Market, Variety &amp; Grade (₹/Kg)
                </h3>
              </div>

              {/* Main Forecast Box */}
              <div className="mic-framewrap" style={{
                position: 'relative',
                width: '100%',
                maxWidth: 'none',
                minHeight: '80vh',
                border: '1px solid var(--color-border)',
                borderRadius: '16px',
                background: 'var(--color-surface)',
                overflow: 'hidden',
                boxSizing: 'border-box'
              }}>
                {!forecastLoaded && (
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'var(--color-surface)',
                    borderRadius: '16px',
                    zIndex: 10
                  }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      border: '4px solid var(--color-border)',
                      borderTop: '4px solid var(--color-primary)',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite',
                      marginBottom: '1rem'
                    }} />
                    <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                      Loading Price Intelligence Forecasts...
                    </span>
                  </div>
                )}
                {/* Apple Price Forecasts iframe */}
                <iframe
                  src="https://micmandis.onrender.com/forecast"
                  loading="lazy"
                  title="Apple Price Forecasts (₹/Kg)"
                  style={{
                    width: '100%',
                    height: '80vh',
                    minWidth: '100%',
                    border: 0,
                    display: 'block',
                    background: 'transparent',
                    opacity: forecastLoaded ? 1 : 0,
                    transition: 'opacity 0.3s ease-in-out'
                  }}
                  onLoad={() => setForecastLoaded(true)}
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Disclaimer */}
              <p style={{
                textAlign: 'center',
                fontSize: '0.85rem',
                color: 'var(--color-text-muted)',
                fontStyle: 'italic',
                marginTop: '1.5rem',
                lineHeight: '1.6',
                maxWidth: '850px',
                margin: '1.5rem auto 0'
              }}>
                The forecasts provided here are for informational purposes only. Actual market prices may vary based on local conditions and external factors. No liability is accepted for any financial decisions based on these forecasts.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: Market Intelligence Dashboard (Live mydash Iframe Widget) */}
      {activeView === 'dashboard' && (
        <div className="animate-fade-in">
          <div style={{
            position: 'relative',
            width: '100%',
            maxWidth: 'none',
            minHeight: '80vh',
            borderRadius: '12px',
            boxShadow: '0 6px 22px rgba(0,0,0,.08)',
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            overflow: 'hidden',
            boxSizing: 'border-box'
          }}>
            {!mandiLoaded && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--color-surface)',
                borderRadius: '12px',
                zIndex: 10
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  border: '4px solid var(--color-border)',
                  borderTop: '4px solid var(--color-primary)',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  marginBottom: '1rem'
                }} />
                <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                  Loading Live Mandi Price matrix...
                </span>
              </div>
            )}
            {/* Embedded Live Market Intelligence Dashboard iframe */}
            <iframe
              src="https://micmandis.onrender.com/forecast/mydash"
              title="Agricultural Price Intelligence Dashboard"
              style={{
                width: '100%',
                height: '80vh',
                display: 'block',
                border: 'none',
                borderRadius: '12px',
                margin: 0,
                padding: 0,
                opacity: mandiLoaded ? 1 : 0,
                transition: 'opacity 0.3s ease-in-out'
              }}
              onLoad={() => setMandiLoaded(true)}
            />
          </div>
          {/* Real Time Market Prices */}
          <div style={{ marginTop: '4rem' }}>
            <RealTimePrices />
          </div>
        </div>
      )}

      {/* VIEW 3: Orchard Ledger (Historical Stats Dashboard) */}
      {activeView === 'ledger' && (
        <div className="animate-fade-in" style={{ backgroundColor: 'var(--color-surface)', borderRadius: '16px', border: '1px solid var(--color-border)', overflow: 'hidden', padding: '1.5rem' }}>
          <OrchardLedger />
        </div>
      )}

    </div>
  );
};

export default Forecasts;
