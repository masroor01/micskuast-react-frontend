import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { TrendingUp, Landmark, BookOpen, AlertTriangle, Menu, X, Sun, Moon, Coffee, Info, Lock, ExternalLink } from 'lucide-react';
import { EditableLabel } from './EditableLabel';

const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const [theme, setTheme] = useState<'light' | 'dark' | 'warm'>(() => {
    return (localStorage.getItem('site_theme') as any) || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = (newTheme: 'light' | 'dark' | 'warm') => {
    setTheme(newTheme);
    localStorage.setItem('site_theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <>
      {/* Tier 1: S&P Global Style Top Utility Bar */}
      <div className="sp-utility-strip">
        <div className="container sp-utility-container">
          <div className="sp-utility-left">
            <a 
              href="https://skuastkashmir.ac.in" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="sp-utility-item"
              title="Official SKUAST-K Website"
            >
              <img 
                src="/logos/skuast.png" 
                alt="SKUAST-K Seal" 
                style={{ height: '20px', width: '20px', objectFit: 'contain' }} 
              />
              <span className="university-full-title">
                Sher-e-Kashmir University of Agricultural Sciences & Technology of Kashmir
              </span>
              <ExternalLink size={11} style={{ opacity: 0.6 }} />
            </a>

            <span className="sp-utility-pill">
              HADP-04 J&K
            </span>
          </div>

          <div className="sp-utility-right">
            {/* Theme Switcher Toggle */}
            <div style={{ display: 'flex', gap: '0.2rem', background: 'var(--color-bg)', padding: '2px 4px', borderRadius: '50px', border: '1px solid var(--color-border)' }}>
              <button
                onClick={() => toggleTheme('light')}
                style={{
                  background: theme === 'light' ? 'var(--color-primary)' : 'transparent',
                  color: theme === 'light' ? '#fff' : 'var(--color-text-muted)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '22px',
                  height: '22px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                title="Light Theme"
              >
                <Sun size={12} />
              </button>
              <button
                onClick={() => toggleTheme('dark')}
                style={{
                  background: theme === 'dark' ? 'var(--color-primary)' : 'transparent',
                  color: theme === 'dark' ? '#fff' : 'var(--color-text-muted)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '22px',
                  height: '22px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                title="Dark Theme"
              >
                <Moon size={12} />
              </button>
              <button
                onClick={() => toggleTheme('warm')}
                style={{
                  background: theme === 'warm' ? 'var(--color-primary)' : 'transparent',
                  color: theme === 'warm' ? '#fff' : 'var(--color-text-muted)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '22px',
                  height: '22px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                title="Warm Theme"
              >
                <Coffee size={12} />
              </button>
            </div>

            {/* Admin Login Link */}
            <NavLink to="/admin" className="sp-utility-item" style={{ fontSize: '0.76rem' }}>
              <Lock size={12} />
              <span>Admin Portal</span>
            </NavLink>
          </div>
        </div>
      </div>

      {/* Tier 2: S&P Global Style Main Corporate Navigation Bar */}
      <header className="sp-header-bar">
        <div className="container sp-nav-container">
          {/* Brand Logo Section */}
          <NavLink to="/" className="sp-brand-link" onClick={() => setMobileOpen(false)}>
            <img 
              src="/logos/mic.png" 
              alt="MIC Logo" 
              style={{ 
                height: '42px', 
                width: '42px',
                objectFit: 'contain',
                filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.3))'
              }} 
            />
            <div>
              <span className="sp-brand-title">
                <EditableLabel labelKey="header_brand_name" defaultValue="MIC SKUAST-K" style={{ color: '#ffffff' }} />
              </span>
              <span className="sp-brand-subtitle">
                <EditableLabel labelKey="header_brand_sub" defaultValue="Market Intelligence Cell" style={{ color: '#9ca3af' }} />
              </span>
            </div>
          </NavLink>

          {/* Desktop Navigation Links */}
          <nav className="sp-nav-links desktop-only">
            <NavLink 
              to="/" 
              className={({ isActive }) => `sp-nav-item ${isActive ? 'active' : ''}`}
              end
            >
              <EditableLabel labelKey="nav_home" defaultValue="Home" />
            </NavLink>

            <NavLink 
              to="/about" 
              className={({ isActive }) => `sp-nav-item ${isActive ? 'active' : ''}`}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                <Info size={14} /> 
                <EditableLabel labelKey="nav_about" defaultValue="About Us" />
              </span>
            </NavLink>

            <NavLink 
              to="/ews" 
              className={({ isActive }) => `sp-nav-item ${isActive ? 'active' : ''}`}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                <AlertTriangle size={14} /> 
                <EditableLabel labelKey="nav_ews" defaultValue="EWS Reports" />
              </span>
            </NavLink>

            <NavLink 
              to="/markets" 
              className={({ isActive }) => `sp-nav-item ${isActive ? 'active' : ''}`}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                <Landmark size={14} /> 
                <EditableLabel labelKey="nav_apmcs" defaultValue="APMCs" />
              </span>
            </NavLink>
            
            <NavLink 
              to="/publications" 
              className={({ isActive }) => `sp-nav-item ${isActive ? 'active' : ''}`}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                <BookOpen size={14} /> 
                <EditableLabel labelKey="nav_publications" defaultValue="Publications" />
              </span>
            </NavLink>
          </nav>

          {/* S&P Global Style High-Contrast CTA Button */}
          <div className="desktop-only" style={{ display: 'flex', alignItems: 'center' }}>
            <NavLink to="/forecasts" className="sp-cta-btn">
              <TrendingUp size={15} /> 
              <EditableLabel labelKey="nav_market_intel" defaultValue="Explore Live Forecasts" style={{ color: '#ffffff' }} />
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
            style={{ color: '#ffffff' }}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Drawer Navigation */}
        {mobileOpen && (
          <div className="mobile-nav animate-fade-in" style={{ background: '#111827', color: '#ffffff' }}>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <NavLink 
                to="/" 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                onClick={() => setMobileOpen(false)}
                end
                style={{ color: '#ffffff' }}
              >
                <EditableLabel labelKey="nav_home" defaultValue="Home" />
              </NavLink>
              <NavLink 
                to="/about" 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                onClick={() => setMobileOpen(false)}
                style={{ color: '#ffffff' }}
              >
                <EditableLabel labelKey="nav_about" defaultValue="About Us" />
              </NavLink>
              <NavLink 
                to="/ews" 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                onClick={() => setMobileOpen(false)}
                style={{ color: '#ffffff' }}
              >
                <EditableLabel labelKey="nav_ews" defaultValue="EWS Reports" />
              </NavLink>
              <NavLink 
                to="/markets" 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                onClick={() => setMobileOpen(false)}
                style={{ color: '#ffffff' }}
              >
                <EditableLabel labelKey="nav_apmcs" defaultValue="APMCs" />
              </NavLink>
              <NavLink 
                to="/publications" 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                onClick={() => setMobileOpen(false)}
                style={{ color: '#ffffff' }}
              >
                <EditableLabel labelKey="nav_publications" defaultValue="Publications" />
              </NavLink>
              <NavLink 
                to="/forecasts" 
                className="sp-cta-btn"
                onClick={() => setMobileOpen(false)}
                style={{ textAlign: 'center', justifyContent: 'center' }}
              >
                <EditableLabel labelKey="nav_market_intel" defaultValue="Explore Live Forecasts" />
              </NavLink>
              <NavLink 
                to="/admin" 
                className="nav-link"
                onClick={() => setMobileOpen(false)}
                style={{ color: '#9ca3af', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem', marginTop: '0.5rem' }}
              >
                <Lock size={14} style={{ marginRight: '0.5rem' }} /> Admin Portal
              </NavLink>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
