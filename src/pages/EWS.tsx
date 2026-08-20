import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';
import { EditableLabel } from '../components/EditableLabel';

const applyThemeToIframe = (iframe: HTMLIFrameElement, theme: string, crop: 'cherry' | 'apple') => {
  try {
    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!doc) return;

    // Read computed style variables from the parent document
    const rootStyles = getComputedStyle(document.documentElement);
    const bg = rootStyles.getPropertyValue('--color-bg').trim() || '#f8fafc';
    const surface = rootStyles.getPropertyValue('--color-surface').trim() || '#ffffff';
    const border = rootStyles.getPropertyValue('--color-border').trim() || '#e2e8f0';
    const text = rootStyles.getPropertyValue('--color-text-main').trim() || '#0f172a';
    const muted = rootStyles.getPropertyValue('--color-text-muted').trim() || '#64748b';

    // Crop colors
    let primary = '';
    let primaryHover = '';
    
    if (crop === 'cherry') {
      if (theme === 'dark') {
        primary = '#f43f5e'; // Light Rose
        primaryHover = '#e11d48';
      } else if (theme === 'warm') {
        primary = '#9f1239'; // Deep Warm Rose
        primaryHover = '#be123c';
      } else {
        primary = '#be123c'; // Rose 700 (Cherry Red)
        primaryHover = '#e11d48';
      }
    } else { // apple
      if (theme === 'dark') {
        primary = '#4ade80'; // Light Green
        primaryHover = '#22c55e';
      } else if (theme === 'warm') {
        primary = '#14532d'; // Deep Warm Green
        primaryHover = '#15803d';
      } else {
        primary = '#15803d'; // Green 700 (Apple Green)
        primaryHover = '#16a34a';
      }
    }

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
            applyThemeToIframe(subIframe, theme, crop);
          });
        }
        applyThemeToIframe(subIframe, theme, crop);
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

  const [iframeLoaded, setIframeLoaded] = useState(false);

  const handleTabChange = (tab: string) => {
    setSearchParams({ tab });
  };

  useEffect(() => {
    setIframeLoaded(false);
  }, [activeTab, stabilitySubTab]);

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
      const activeCrop = (activeTab === 'cherry' || (activeTab === 'stability' && stabilitySubTab === 'cherry')) ? 'cherry' : 'apple';
      applyThemeToIframe(iframeRef.current, currentTheme, activeCrop);
    }
  }, [currentTheme, activeTab, stabilitySubTab]);

  // Dynamic banner gradient based on selected crop
  const isCherryActive = activeTab === 'cherry' || (activeTab === 'stability' && stabilitySubTab === 'cherry');
  const bannerGradient = isCherryActive
    ? 'linear-gradient(135deg, #4c0519 0%, #881337 50%, #be123c 100%)'
    : 'linear-gradient(135deg, #064e3b 0%, #14532d 50%, #15803d 100%)';

  // Helper to determine the style of the tab button
  const getTabButtonStyle = (tabName: 'cherry' | 'apple' | 'stability') => {
    const isActive = activeTab === tabName;
    if (!isActive) return {};
    
    if (tabName === 'cherry') {
      return {
        borderBottom: '3px solid #be123c',
        color: '#be123c',
        fontWeight: 700
      };
    } else if (tabName === 'apple') {
      return {
        borderBottom: '3px solid #15803d',
        color: '#15803d',
        fontWeight: 700
      };
    } else { // stability
      const activeColor = stabilitySubTab === 'cherry' ? '#be123c' : '#15803d';
      return {
        borderBottom: `3px solid ${activeColor}`,
        color: activeColor,
        fontWeight: 700
      };
    }
  };

  return (
    <div className="container section-padding animate-fade-in">
      {/* Intro Banner */}
      <div className="ews-intro-banner" style={{ marginBottom: '2.5rem', background: bannerGradient }}>
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
          style={getTabButtonStyle('cherry')}
        >
          🍒 Cherry EWS (Demo 2026)
        </button>
        <button
          onClick={() => handleTabChange('apple')}
          className={`market-tab-btn ${activeTab === 'apple' ? 'active' : ''}`}
          style={getTabButtonStyle('apple')}
        >
          🍏 Apple EWS (Demo 2026)
        </button>
        <button
          onClick={() => handleTabChange('stability')}
          className={`market-tab-btn ${activeTab === 'stability' ? 'active' : ''}`}
          style={getTabButtonStyle('stability')}
        >
          🛡️ Horticultural Stability
        </button>
      </div>

      {/* Content Rendering */}
      {activeTab === 'cherry' && (
        <div className="animate-fade-in">
          <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '1.25rem', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ position: 'relative', width: '100%', height: '850px' }}>
              {!iframeLoaded && (
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
                  borderRadius: '8px',
                  zIndex: 10
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    border: '4px solid var(--color-border)',
                    borderTop: '4px solid #be123c',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                    marginBottom: '1rem'
                  }} />
                  <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                    Formatting Cherry Early Warning dashboard...
                  </span>
                </div>
              )}
              <iframe 
                ref={iframeRef}
                src="https://micskuast.in/reports/ews_demo_cherry_20260213_1411/index_public.html" 
                style={{ width: '100%', height: '850px', border: 'none', borderRadius: '8px', background: 'var(--color-bg)', opacity: iframeLoaded ? 1 : 0, transition: 'opacity 0.3s ease-in-out' }}
                title="Cherry EWS Report"
                onLoad={() => {
                  if (iframeRef.current) {
                    applyThemeToIframe(iframeRef.current, currentTheme, 'cherry');
                  }
                  setIframeLoaded(true);
                }}
              />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'apple' && (
        <div className="animate-fade-in">
          <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '1.25rem', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ position: 'relative', width: '100%', height: '850px' }}>
              {!iframeLoaded && (
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
                  borderRadius: '8px',
                  zIndex: 10
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    border: '4px solid var(--color-border)',
                    borderTop: '4px solid #15803d',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                    marginBottom: '1rem'
                  }} />
                  <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                    Formatting Apple Early Warning dashboard...
                  </span>
                </div>
              )}
              <iframe 
                ref={iframeRef}
                src="https://micskuast.in/reports/ews_demo_apple_20260222_2121/index_public.html" 
                style={{ width: '100%', height: '850px', border: 'none', borderRadius: '8px', background: 'var(--color-bg)', opacity: iframeLoaded ? 1 : 0, transition: 'opacity 0.3s ease-in-out' }}
                title="Apple EWS Report"
                onLoad={() => {
                  if (iframeRef.current) {
                    applyThemeToIframe(iframeRef.current, currentTheme, 'apple');
                  }
                  setIframeLoaded(true);
                }}
              />
            </div>
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
                border: stabilitySubTab === 'cherry' ? '2px solid #be123c' : '1px solid var(--color-border)',
                background: stabilitySubTab === 'cherry' ? '#fff1f2' : 'var(--color-surface)',
                color: stabilitySubTab === 'cherry' ? '#be123c' : 'var(--color-text-muted)',
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
                border: stabilitySubTab === 'apple' ? '2px solid #15803d' : '1px solid var(--color-border)',
                background: stabilitySubTab === 'apple' ? '#f0fdf4' : 'var(--color-surface)',
                color: stabilitySubTab === 'apple' ? '#15803d' : 'var(--color-text-muted)',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              🍏 Apple Stability Technical Report
            </button>
          </div>

          <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '1.25rem', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ position: 'relative', width: '100%', height: '850px' }}>
              {!iframeLoaded && (
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
                  borderRadius: '8px',
                  zIndex: 10
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    border: '4px solid var(--color-border)',
                    borderTop: `4px solid ${stabilitySubTab === 'cherry' ? '#be123c' : '#15803d'}`,
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                    marginBottom: '1rem'
                  }} />
                  <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                    Formatting Stability Analysis Report...
                  </span>
                </div>
              )}
              {stabilitySubTab === 'cherry' ? (
                <iframe 
                  ref={iframeRef}
                  src="https://micskuast.in/reports/cherry_stability_20260212_1244/MIC_Cherry_Stability_Report_Text_IFRAME.html" 
                  style={{ width: '100%', height: '850px', border: 'none', borderRadius: '8px', background: 'var(--color-bg)', opacity: iframeLoaded ? 1 : 0, transition: 'opacity 0.3s ease-in-out' }}
                  title="Cherry Stability Report"
                  onLoad={() => {
                    if (iframeRef.current) {
                      applyThemeToIframe(iframeRef.current, currentTheme, 'cherry');
                    }
                    setIframeLoaded(true);
                  }}
                />
              ) : (
                <iframe 
                  ref={iframeRef}
                  src="https://micskuast.in/reports/apple_stability_20260222_2051/MIC_Apple_Stability_Report.html" 
                  style={{ width: '100%', height: '850px', border: 'none', borderRadius: '8px', background: 'var(--color-bg)', opacity: iframeLoaded ? 1 : 0, transition: 'opacity 0.3s ease-in-out' }}
                  title="Apple Stability Report"
                  onLoad={() => {
                    if (iframeRef.current) {
                      applyThemeToIframe(iframeRef.current, currentTheme, 'apple');
                    }
                    setIframeLoaded(true);
                  }}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EWS;
