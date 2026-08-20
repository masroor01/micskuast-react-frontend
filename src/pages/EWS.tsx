import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';
import { EditableLabel } from '../components/EditableLabel';

const applyThemeToIframe = (iframe: HTMLIFrameElement, theme: string) => {
  try {
    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!doc) return;

    // Define CSS variables to inject
    let cssVars = '';
    if (theme === 'dark') {
      cssVars = `
        :root {
          --mic-blue: #14532d !important;
          --mic-blue-2: #1e293b !important;
          --bg: #0f172a !important;
          --card: #1e293b !important;
          --border: #334155 !important;
          --text: #f8fafc !important;
          --muted: #94a3b8 !important;
        }
        body {
          color: #f8fafc !important;
          background: #0f172a !important;
        }
        .paper {
          background: #1e293b !important;
          color: #f8fafc !important;
          box-shadow: 0 4px 25px rgba(0,0,0,0.3) !important;
        }
        .card {
          background: #1e293b !important;
          border-color: #334155 !important;
          color: #f8fafc !important;
        }
        table th {
          background: #334155 !important;
          color: #f8fafc !important;
        }
        table td {
          border-color: #334155 !important;
          color: #e2e8f0 !important;
        }
        .topbar {
          background: linear-gradient(90deg, #14532d, #1e293b) !important;
        }
        h1, h2, h3, h4, h5, h6, p, li, span, td, th {
          color: #f8fafc !important;
        }
        .note {
          color: #94a3b8 !important;
        }
        .watermark {
          color: #ffffff !important;
          opacity: 0.05 !important;
        }
      `;
    } else if (theme === 'warm') {
      cssVars = `
        :root {
          --mic-blue: #1c3d27 !important;
          --mic-blue-2: #244c33 !important;
          --bg: #f4efe6 !important;
          --card: #fdfbf7 !important;
          --border: #e6dfd3 !important;
          --text: #2d2219 !important;
          --muted: #7c6a59 !important;
        }
        body {
          color: #2d2219 !important;
          background: #f4efe6 !important;
        }
        .paper {
          background: #fdfbf7 !important;
          color: #2d2219 !important;
          box-shadow: 0 4px 25px rgba(0,0,0,0.06) !important;
        }
        .card {
          background: #fdfbf7 !important;
          border-color: #e6dfd3 !important;
          color: #2d2219 !important;
        }
        table th {
          background: #e6dfd3 !important;
          color: #2d2219 !important;
        }
        table td {
          border-color: #e6dfd3 !important;
          color: #2d2219 !important;
        }
        .topbar {
          background: linear-gradient(90deg, #1c3d27, #244c33) !important;
        }
        h1, h2, h3, h4, h5, h6, p, li, span, td, th {
          color: #2d2219 !important;
        }
        .note {
          color: #7c6a59 !important;
        }
        .watermark {
          color: #000000 !important;
          opacity: 0.05 !important;
        }
      `;
    } else {
      cssVars = `
        :root {
          --mic-blue: #0b3a6e !important;
          --mic-blue-2: #114b8a !important;
          --bg: #f8fafc !important;
          --card: #ffffff !important;
          --border: #e2e8f0 !important;
          --text: #0f172a !important;
          --muted: #64748b !important;
        }
        body {
          color: #0f172a !important;
          background: #f8fafc !important;
        }
        .paper {
          background: #ffffff !important;
          color: #0f172a !important;
          box-shadow: 0 4px 25px rgba(0,0,0,0.04) !important;
        }
        .card {
          background: #ffffff !important;
          border-color: #e2e8f0 !important;
          color: #0f172a !important;
        }
        table th {
          background: #f1f5f9 !important;
          color: #0f172a !important;
        }
        table td {
          border-color: #e2e8f0 !important;
          color: #334155 !important;
        }
        .topbar {
          background: linear-gradient(90deg, #0b3a6e, #114b8a) !important;
        }
        h1, h2, h3, h4, h5, h6, p, li, span, td, th {
          color: #0f172a !important;
        }
        .note {
          color: #64748b !important;
        }
        .watermark {
          color: #000000 !important;
          opacity: 0.07 !important;
        }
      `;
    }

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
