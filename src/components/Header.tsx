import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { TrendingUp, Landmark, BookOpen, AlertTriangle, Menu, X, ChevronDown } from 'lucide-react';
import { EditableLabel } from './EditableLabel';

const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [ewsDropdownOpen, setEwsDropdownOpen] = useState(false);

  return (
    <header className="header-wrapper">
      <div className="container header-container">
        {/* Logo Section */}
        <NavLink to="/" className="logo-section" onClick={() => setMobileOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
          <img 
            src="/logos/mic.png" 
            alt="MIC Logo" 
            style={{ 
              height: '40px', 
              width: '40px',
              objectFit: 'contain',
              background: '#ffffff',
              padding: '2px',
              borderRadius: '8px',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-sm)'
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

        {/* Desktop Navigation */}
        <nav className="nav-menu desktop-only">
          <NavLink 
            to="/" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            end
          >
            <EditableLabel labelKey="nav_home" defaultValue="Home" />
          </NavLink>
          
          <NavLink 
            to="/markets" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <Landmark size={16} /> 
              <EditableLabel labelKey="nav_apmcs" defaultValue="APMCs" />
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
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
            >
              <AlertTriangle size={16} /> 
              <EditableLabel labelKey="nav_ews" defaultValue="EWS Reports" />
              <ChevronDown size={14} />
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
            to="/publications" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <BookOpen size={16} /> 
              <EditableLabel labelKey="nav_publications" defaultValue="Publications" />
            </span>
          </NavLink>

          <NavLink 
            to="/forecasts" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            style={{ background: 'var(--color-primary-pale)', border: '1px solid rgba(var(--primary-hue), 72%, 18%, 0.15)' }}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: 'var(--color-primary)' }}>
              <TrendingUp size={16} /> 
              <EditableLabel labelKey="nav_market_intel" defaultValue="Market Intelligence" />
            </span>
          </NavLink>
        </nav>

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
              to="/markets" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              <EditableLabel labelKey="nav_apmcs" defaultValue="APMCs" />
            </NavLink>
            <NavLink 
              to="/ews" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              <EditableLabel labelKey="nav_ews" defaultValue="EWS Reports" />
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
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
