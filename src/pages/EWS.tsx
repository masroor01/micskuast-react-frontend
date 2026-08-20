import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';
import { EditableLabel } from '../components/EditableLabel';

const applyThemeToIframe = (iframe: HTMLIFrameElement, theme: string) => {
  try {
    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!doc) return;

    // Read computed style variables from the parent document
    const rootStyles = getComputedStyle(document.documentElement);
    const primary = rootStyles.getPropertyValue('--color-primary').trim() || '#0b3a6e';
    const primaryHover = rootStyles.getPropertyValue('--color-primary-hover').trim() || '#114b8a';
    const bg = rootStyles.getPropertyValue('--color-bg').trim() || '#f8fafc';
    const surface = rootStyles.getPropertyValue('--color-surface').trim() || '#ffffff';
    const border = rootStyles.getPropertyValue('--color-border').trim() || '#e2e8f0';
    const text = rootStyles.getPropertyValue('--color-text-main').trim() || '#0f172a';
    const muted = rootStyles.getPropertyValue('--color-text-muted').trim() || '#64748b';

    const cssVars = `
      :root {
        --mic-blue: ${primary} !important;
        --mic-blue-2: ${primaryHover} !important;
        --bg: ${bg} !important;
        --card: ${surface} !important;
        --border: ${border} !important;
        --text: ${text} !important;
        --muted: ${muted} !important;
      }
      body {
        color: var(--text) !important;
        background: var(--bg) !important;
      }
      .paper {
        background: var(--card) !important;
        color: var(--text) !important;
        box-shadow: 0 4px 25px rgba(0,0,0,0.06) !important;
      }
      .card {
        background: var(--card) !important;
        border-color: var(--border) !important;
        color: var(--text) !important;
      }
      table th {
        background: var(--border) !important;
        color: var(--text) !important;
      }
      table td {
        border-color: var(--border) !important;
        color: var(--text) !important;
      }
      .topbar {
        background: linear-gradient(90deg, var(--mic-blue), var(--mic-blue-2)) !important;
      }
      h1, h2, h3, h4, h5, h6, p, li, span, td, th {
        color: var(--text) !important;
      }
      .note {
        color: var(--muted) !important;
      }
      .watermark {
        color: var(--text) !important;
        opacity: 0.05 !important;
      }
      .nav a {
        background: rgba(255, 255, 255, 0.15) !important;
        color: #ffffff !important;
      }
      .nav a:hover {
        background: rgba(255, 255, 255, 0.25) !important;
      }
    `;

    // Apply styles to current document
    let styleTag = doc.getElementById('mic-iframe-theme-styles');
    if (!styleTag) {
      styleTag = doc.createElement('style');
      styleTag.id = 'mic-iframe-theme-styles';
      doc.head.appendChild(styleTag);
    }
    styleTag.innerHTML = cssVars;

    // Recurse into nested sub-iframes (e.g. Plotly plots)
    const subIframes = doc.getElementsByTagName('iframe');
    for (let i = 0; i < subIframes.length; i++) {
      const subIframe = subIframes[i];
      try {
        if (!subIframe.getAttribute('data-theme-listener')) {
          subIframe.setAttribute('data-theme-listener', 'true');
          subIframe.addEventListener('load', () => {
            applyThemeToIframe(subIframe, theme);
          });
        }
        applyThemeToIframe(subIframe, theme);
      } catch (err) {
        console.error("Sub-iframe access failed", err);
      }
    }
  } catch (e) {
    console.error("Could not apply theme to iframe", e);
  }
};

const EWS: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'cherry';
  const [stabilitySubTab, setStabilitySubTab] = useState<'cherry' | 'apple'>('cherry');
  const [currentTheme, setCurrentTheme] = useState(document.documentElement.getAttribute('data-theme') || 'light');
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const handleTabChange = (tab: string) => {
    setSearchParams({ tab });
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

  // Update theme when state updates
  useEffect(() => {
    if (iframeRef.current) {
      applyThemeToIframe(iframeRef.current, currentTheme);
    }
  }, [currentTheme, activeTab, stabilitySubTab]);

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
              ref={iframeRef}
              src="https://micskuast.in/reports/ews_demo_cherry_20260213_1411/index_public.html" 
              style={{ width: '100%', height: '850px', border: 'none', borderRadius: '8px', background: 'var(--color-bg)' }}
              title="Cherry EWS Report"
              onLoad={() => {
                if (iframeRef.current) {
                  applyThemeToIframe(iframeRef.current, currentTheme);
                }
              }}
            />
          </div>
        </div>
      )}

      {activeTab === 'apple' && (
        <div className="animate-fade-in">
          <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '1.25rem', boxShadow: 'var(--shadow-sm)' }}>
            <iframe 
              ref={iframeRef}
              src="https://micskuast.in/reports/ews_demo_apple_20260222_2121/index_public.html" 
              style={{ width: '100%', height: '850px', border: 'none', borderRadius: '8px', background: 'var(--color-bg)' }}
              title="Apple EWS Report"
              onLoad={() => {
                if (iframeRef.current) {
                  applyThemeToIframe(iframeRef.current, currentTheme);
                }
              }}
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
                ref={iframeRef}
                src="https://micskuast.in/reports/cherry_stability_20260212_1244/MIC_Cherry_Stability_Report_Text_IFRAME.html" 
                style={{ width: '100%', height: '850px', border: 'none', borderRadius: '8px', background: 'var(--color-bg)' }}
                title="Cherry Stability Report"
                onLoad={() => {
                  if (iframeRef.current) {
                    applyThemeToIframe(iframeRef.current, currentTheme);
                  }
                }}
              />
            ) : (
              <iframe 
                ref={iframeRef}
                src="https://micskuast.in/reports/apple_stability_20260222_2051/MIC_Apple_Stability_Report.html" 
                style={{ width: '100%', height: '850px', border: 'none', borderRadius: '8px', background: 'var(--color-bg)' }}
                title="Apple Stability Report"
                onLoad={() => {
                  if (iframeRef.current) {
                    applyThemeToIframe(iframeRef.current, currentTheme);
                  }
                }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EWS;
