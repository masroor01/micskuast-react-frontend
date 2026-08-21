import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { TrendingUp, Landmark, BookOpen, AlertTriangle, Menu, X, ChevronDown, Sun, Moon, Coffee, Info } from 'lucide-react';
import { EditableLabel } from './EditableLabel';

const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [ewsDropdownOpen, setEwsDropdownOpen] = useState(false);

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
    <header className="header-wrapper">
      <div className="container header-container">
        {/* Logo Section */}
        <NavLink to="/" className="logo-section" onClick={() => setMobileOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
          <img 
            src="/logos/mic.png" 
            alt="MIC Logo" 
            style={{ 
              height: '46px', 
              width: '46px',
              objectFit: 'contain',
              filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.06))'
            }} 
          />
          <div>
            <span className="logo-text" style={{ display: 'block', fontWeight: 800, color: 'var(--color-primary)', fontSize: '1.2rem', lineHeight: 1.1 }}>
              <EditableLabel labelKey="header_brand_name" defaultValue="MIC SKUAST" />
            </span>
            <span className="logo-subtext" style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600, lineHeight: 1.1 }}>
              <EditableLabel labelKey="header_brand_sub" defaultValue="Market Intelligence Cell" />
            </span>
          </div>
        </NavLink>

        {/* Desktop Navigation Group 1: Core Menu Links (Pushed to the right) */}
        <nav className="nav-menu desktop-only" style={{ gap: '0.45rem', marginLeft: 'auto', marginRight: '1.25rem' }}>
          <NavLink 
            to="/" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            end
          >
            <EditableLabel labelKey="nav_home" defaultValue="Home" />
          </NavLink>

          <NavLink 
            to="/about" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', whiteSpace: 'nowrap' }}>
              <Info size={14} /> 
              <EditableLabel labelKey="nav_about" defaultValue="About Us" />
            </span>
          </NavLink>



          {/* EWS Dropdown Menu */}
          <div 
            className="nav-dropdown-trigger"
            onMouseEnter={() => setEwsDropdownOpen(true)}
            onMouseLeave={() => setEwsDropdownOpen(false)}
            style={{ position: 'relative' }}
          >
            <NavLink 
              to="/ews" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', whiteSpace: 'nowrap' }}
            >
              <AlertTriangle size={14} /> 
              <EditableLabel labelKey="nav_ews" defaultValue="EWS Reports" />
              <ChevronDown size={12} />
            </NavLink>
            
            {ewsDropdownOpen && (
              <div className="dropdown-menu">
                <NavLink to="/ews?tab=cherry" className="dropdown-item">Cherry EWS (2026)</NavLink>
                <NavLink to="/ews?tab=apple" className="dropdown-item">Apple EWS (2026)</NavLink>
                <NavLink to="/ews?tab=stability" className="dropdown-item">Horticultural Stability</NavLink>
              </div>
            )}
          </div>

          <NavLink 
            to="/markets" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', whiteSpace: 'nowrap' }}>
              <Landmark size={14} /> 
              <EditableLabel labelKey="nav_apmcs" defaultValue="APMCs" />
            </span>
          </NavLink>
          
          <NavLink 
            to="/publications" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', whiteSpace: 'nowrap' }}>
              <BookOpen size={14} /> 
              <EditableLabel labelKey="nav_publications" defaultValue="Publications" />
            </span>
          </NavLink>
        </nav>

        {/* Desktop Navigation Group 2: Actions & Settings */}
        <div className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <NavLink 
            to="/forecasts" 
            className={({ isActive }) => `nav-link market-intel-btn ${isActive ? 'active' : ''}`}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: 'inherit', whiteSpace: 'nowrap' }}>
              <TrendingUp size={14} /> 
              <EditableLabel labelKey="nav_market_intel" defaultValue="Market Intelligence" />
            </span>
          </NavLink>

          {/* Theme Switcher Toggle */}
          <div style={{ display: 'flex', gap: '0.25rem', background: 'var(--color-bg)', padding: '4px', borderRadius: '50px', border: '1px solid var(--color-border)' }}>
            <button
              onClick={() => toggleTheme('light')}
              style={{
                background: theme === 'light' ? 'var(--color-primary)' : 'transparent',
                color: theme === 'light' ? '#fff' : 'var(--color-text-muted)',
                border: 'none',
                borderRadius: '50%',
                width: '28px',
                height: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              title="Light Theme"
            >
              <Sun size={14} />
            </button>
            <button
              onClick={() => toggleTheme('dark')}
              style={{
                background: theme === 'dark' ? 'var(--color-primary)' : 'transparent',
                color: theme === 'dark' ? '#fff' : 'var(--color-text-muted)',
                border: 'none',
                borderRadius: '50%',
                width: '28px',
                height: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              title="Dark Theme"
            >
              <Moon size={14} />
            </button>
            <button
              onClick={() => toggleTheme('warm')}
              style={{
                background: theme === 'warm' ? 'var(--color-primary)' : 'transparent',
                color: theme === 'warm' ? '#fff' : 'var(--color-text-muted)',
                border: 'none',
                borderRadius: '50%',
                width: '28px',
                height: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              title="Warm Theme"
            >
              <Coffee size={14} />
            </button>
          </div>
        </div>

        {/* Mobile Toggle Button */}
        <button 
          className="mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div className="mobile-nav animate-fade-in">
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <NavLink 
              to="/" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setMobileOpen(false)}
              end
            >
              <EditableLabel labelKey="nav_home" defaultValue="Home" />
            </NavLink>
            <NavLink 
              to="/about" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              <EditableLabel labelKey="nav_about" defaultValue="About Us" />
            </NavLink>

            <NavLink 
              to="/ews" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              <EditableLabel labelKey="nav_ews" defaultValue="EWS Reports" />
            </NavLink>
            <NavLink 
              to="/markets" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              <EditableLabel labelKey="nav_apmcs" defaultValue="APMCs" />
            </NavLink>
            <NavLink 
              to="/publications" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              <EditableLabel labelKey="nav_publications" defaultValue="Publications" />
            </NavLink>
            <NavLink 
              to="/forecasts" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setMobileOpen(false)}
              style={{ background: 'var(--color-primary-pale)', textAlign: 'center' }}
            >
              <EditableLabel labelKey="nav_market_intel" defaultValue="Market Intelligence" />
            </NavLink>

            {/* Mobile Theme Switcher */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem', borderTop: '1px solid var(--color-border)', paddingTop: '1.25rem' }}>
              <button 
                onClick={() => toggleTheme('light')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  border: '1px solid var(--color-border)',
                  background: theme === 'light' ? 'var(--color-primary)' : 'transparent',
                  color: theme === 'light' ? '#fff' : 'var(--color-text-muted)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <Sun size={14} /> Light
              </button>
              <button 
                onClick={() => toggleTheme('dark')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  border: '1px solid var(--color-border)',
                  background: theme === 'dark' ? 'var(--color-primary)' : 'transparent',
                  color: theme === 'dark' ? '#fff' : 'var(--color-text-muted)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <Moon size={14} /> Dark
              </button>
              <button 
                onClick={() => toggleTheme('warm')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  border: '1px solid var(--color-border)',
                  background: theme === 'warm' ? 'var(--color-primary)' : 'transparent',
                  color: theme === 'warm' ? '#fff' : 'var(--color-text-muted)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <Coffee size={14} /> Warm
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
