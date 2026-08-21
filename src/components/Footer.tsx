import React from 'react';
import { NavLink } from 'react-router-dom';
import { Mail, MapPin, Shield } from 'lucide-react';
import { EditableLabel } from './EditableLabel';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer-wrapper">
      <div className="container footer-grid">
        <div>
          <h3 className="footer-logo-text">
            <EditableLabel labelKey="footer_logo_text" defaultValue="MARKET INTELLIGENCE CELL" />
          </h3>
          <p style={{ color: 'hsla(0, 0%, 100%, 0.7)', fontSize: '0.9rem', marginBottom: '1.5rem', maxWidth: '320px' }}>
            <EditableLabel labelKey="footer_desc_text" defaultValue="Sher-e-Kashmir University of Agricultural Sciences and Technology of Kashmir (SKUAST-K). Providing real-time price reports and forecasting models." />
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'hsla(0, 0%, 100%, 0.6)', fontSize: '0.85rem' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              <MapPin size={14} /> 
              <EditableLabel labelKey="footer_address" defaultValue="Shalimar, Srinagar, Jammu & Kashmir, 190025" />
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              <Mail size={14} /> 
              <EditableLabel labelKey="footer_email" defaultValue="info@micskuast.in" />
            </span>
          </div>
        </div>
        
        <div>
          <h4 className="footer-title">
            <EditableLabel labelKey="footer_title_nav" defaultValue="Navigation" />
          </h4>
          <ul className="footer-links">
            <li><NavLink to="/" className="footer-link"><EditableLabel labelKey="footer_nav_home" defaultValue="Home" /></NavLink></li>
            <li><NavLink to="/markets" className="footer-link"><EditableLabel labelKey="footer_nav_apmcs" defaultValue="APMC Market Analysis" /></NavLink></li>
            <li><NavLink to="/publications" className="footer-link"><EditableLabel labelKey="footer_nav_outlooks" defaultValue="Commodity Outlooks" /></NavLink></li>
            <li><NavLink to="/forecasts" className="footer-link"><EditableLabel labelKey="footer_nav_intel" defaultValue="Market Intelligence" /></NavLink></li>
          </ul>
        </div>

        <div>
          <h4 className="footer-title">
            <EditableLabel labelKey="footer_title_apmcs" defaultValue="APMC Markets" />
          </h4>
          <ul className="footer-links">
            <li><NavLink to="/markets?tab=pulwama" className="footer-link"><EditableLabel labelKey="footer_apmc_pulwama" defaultValue="Pulwama (Prichoo/Pachaar)" /></NavLink></li>
            <li><NavLink to="/markets?tab=shopian" className="footer-link"><EditableLabel labelKey="footer_apmc_shopian" defaultValue="Shopian Market" /></NavLink></li>
            <li><NavLink to="/markets?tab=ganderbal" className="footer-link"><EditableLabel labelKey="footer_apmc_ganderbal" defaultValue="Ganderbal Market" /></NavLink></li>
            <li><NavLink to="/markets?tab=narwal" className="footer-link"><EditableLabel labelKey="footer_apmc_narwal" defaultValue="Narwal (Jammu)" /></NavLink></li>
          </ul>
        </div>

        <div>
          <h4 className="footer-title">
            <EditableLabel labelKey="footer_title_research" defaultValue="Research & Data" />
          </h4>
          <ul className="footer-links">
            <li><NavLink to="/publications" className="footer-link"><EditableLabel labelKey="footer_research_pub" defaultValue="Publications Directory" /></NavLink></li>
            <li><NavLink to="/publications" className="footer-link"><EditableLabel labelKey="footer_research_bulletin" defaultValue="Weekly Bulletins" /></NavLink></li>
            <li><NavLink to="/publications" className="footer-link"><EditableLabel labelKey="footer_research_hadp" defaultValue="HADP Projects" /></NavLink></li>
            <li><span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', color: 'hsla(0, 0%, 100%, 0.4)', fontSize: '0.85rem' }}>
              <Shield size={12} /> SECURE BACKEND
            </span></li>
          </ul>
        </div>
      </div>
      
      <div className="container footer-bottom">
        <p>
          <EditableLabel labelKey="footer_copyright" defaultValue={`© ${currentYear} Market Intelligence Cell (MIC), SKUAST-K. All rights reserved.`} />
        </p>
        <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: 'hsla(0, 0%, 100%, 0.3)' }}>
          <EditableLabel labelKey="footer_hosting" defaultValue="Backend Content Management hosted securely via WordPress on Hostinger." />
        </p>
      </div>
    </footer>
  );
};

export default Footer;
