import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';
import { EditableLabel } from '../components/EditableLabel';

const EWS: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'cherry';
  const [stabilitySubTab, setStabilitySubTab] = useState<'cherry' | 'apple'>('cherry');
  
  const handleTabChange = (tab: string) => {
    setSearchParams({ tab });
  };

  return (
    <div className="container section-padding animate-fade-in">
      {/* Intro Banner */}
      <div className="ews-intro-banner" style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <ShieldAlert size={36} /> 
          <EditableLabel labelKey="ews_title" defaultValue="Early Warning System (EWS)" />
        </h1>
        <p style={{ color: 'hsla(0, 0%, 100%, 0.8)', maxWidth: '800px', fontSize: '1.1rem', margin: 0 }}>
          <EditableLabel 
            labelKey="ews_subtitle" 
            defaultValue="An instability monitoring engine detecting price anomalies, volatility spikes, and drawdown regimes across regional Kashmiri stone and pome fruits." 
          />
        </p>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="market-tabs" style={{ marginBottom: '2rem' }}>
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

      {/* Content Rendering */}
      {activeTab === 'cherry' && (
        <div className="animate-fade-in">
          <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '1.25rem', boxShadow: 'var(--shadow-sm)' }}>
            <iframe 
              src="https://micskuast.in/reports/ews_demo_cherry_20260213_1411/index_public.html" 
              style={{ width: '100%', height: '850px', border: 'none', borderRadius: '8px', background: 'var(--color-bg)' }}
              title="Cherry EWS Report"
            />
          </div>
        </div>
      )}

      {activeTab === 'apple' && (
        <div className="animate-fade-in">
          <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '1.25rem', boxShadow: 'var(--shadow-sm)' }}>
            <iframe 
              src="https://micskuast.in/reports/ews_demo_apple_20260222_2121/index_public.html" 
              style={{ width: '100%', height: '850px', border: 'none', borderRadius: '8px', background: 'var(--color-bg)' }}
              title="Apple EWS Report"
            />
          </div>
        </div>
      )}

      {activeTab === 'stability' && (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Sub-Tab Selector for Cherry / Apple Stability Reports */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => setStabilitySubTab('cherry')}
              className={`market-tab-btn ${stabilitySubTab === 'cherry' ? 'active' : ''}`}
              style={{ 
                padding: '0.5rem 1.25rem', 
                fontSize: '0.85rem', 
                borderRadius: '50px',
                border: stabilitySubTab === 'cherry' ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                background: stabilitySubTab === 'cherry' ? 'var(--color-primary-pale)' : 'var(--color-surface)',
                color: stabilitySubTab === 'cherry' ? 'var(--color-primary)' : 'var(--color-text-muted)',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              🍒 Cherry Stability Technical Report
            </button>
            <button
              onClick={() => setStabilitySubTab('apple')}
              className={`market-tab-btn ${stabilitySubTab === 'apple' ? 'active' : ''}`}
              style={{ 
                padding: '0.5rem 1.25rem', 
                fontSize: '0.85rem', 
                borderRadius: '50px',
                border: stabilitySubTab === 'apple' ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                background: stabilitySubTab === 'apple' ? 'var(--color-primary-pale)' : 'var(--color-surface)',
                color: stabilitySubTab === 'apple' ? 'var(--color-primary)' : 'var(--color-text-muted)',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              🍏 Apple Stability Technical Report
            </button>
          </div>

          <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '1.25rem', boxShadow: 'var(--shadow-sm)' }}>
            {stabilitySubTab === 'cherry' ? (
              <iframe 
                src="https://micskuast.in/reports/cherry_stability_20260212_1244/MIC_Cherry_Stability_Report_Text_IFRAME.html" 
                style={{ width: '100%', height: '850px', border: 'none', borderRadius: '8px', background: 'var(--color-bg)' }}
                title="Cherry Stability Report"
              />
            ) : (
              <iframe 
                src="https://micskuast.in/reports/apple_stability_20260222_2051/MIC_Apple_Stability_Report.html" 
                style={{ width: '100%', height: '850px', border: 'none', borderRadius: '8px', background: 'var(--color-bg)' }}
                title="Apple Stability Report"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EWS;
