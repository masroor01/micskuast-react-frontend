import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowRight, Landmark, Mail, GraduationCap, Brain, Bell, Award, MapPin, CalendarRange, RefreshCw, TrendingUp, AlertTriangle } from 'lucide-react';
import { EditableLabel } from '../components/EditableLabel';
 
const defaultTeam = [
  {
    name: "Prof. F. A. Shaheen",
    role: "Principal Investigator",
    affiliation: "Professor cum Chief Scientist, IBPR, SKUAST-K, Shalimar",
    image: "/team/shaheen.png",
    linkedin: "https://www.linkedin.com/",
    category: 'pi'
  },
  {
    name: "Prof. S. H. Baba",
    role: "Co. Principal Investigator",
    affiliation: "Professor and Head, IBPR, SKUAST-K, Shalimar",
    image: "/team/baba.png",
    linkedin: "https://www.linkedin.com/",
    category: 'pi'
  },
  {
    name: "Dr Abid Sultan",
    role: "Co. Principal Investigator",
    affiliation: "Assistant Prof. cum Junior Scientist, IBPR, SKUAST-K, Shalimar",
    image: "/team/abid.png",
    linkedin: "https://www.linkedin.com/",
    category: 'pi'
  },
  {
    name: "Dr Aqib Gul",
    role: "Young Professional - III",
    affiliation: "HADP #04: Strengthening Agricultural Marketing in UT of J&K",
    image: "/team/aqib.png",
    linkedin: "https://www.linkedin.com/",
    category: 'yp'
  },
  {
    name: "Dr Masroor Majid",
    role: "Young Professional - II",
    affiliation: "HADP #04: Strengthening Agricultural Marketing in UT of J&K",
    image: "/team/masroor.png",
    linkedin: "https://www.linkedin.com/",
    category: 'yp'
  },
  {
    name: "Dr Mudasir Rashid",
    role: "Young Professional - II",
    affiliation: "HADP #04: Strengthening Agricultural Marketing in UT of J&K",
    image: "/team/mudasir.png",
    linkedin: "https://www.linkedin.com/",
    category: 'yp'
  }
];

const Home: React.FC = () => {
  const [heroTitle, setHeroTitle] = useState('We deliver unrivaled agricultural market insights and leading data and AI solutions');
  const [heroSubtitle, setHeroSubtitle] = useState('Empowering Farmers, Policy Makers, and Traders across Jammu & Kashmir with Deep Learning Price Forecasts, Mandi Terminals Sync & Real-Time Early Warning Signals.');
  const [announcement, setAnnouncement] = useState({
    tag: 'New Release',
    stability: '92.4%',
    message: 'Technical Report: Cherry Market Stability Assessment (MIC, 2026) is now published.',
    link: 'https://micskuast.in/reports/cherry_stability_20260212_1244/MIC_Cherry_Stability_Report_Text_IFRAME.html'
  });
  const [tickerItems, setTickerItems] = useState<string[]>([
    "🍎 AI-powered Apple Price Forecasts for the 2026–27 marketing season are now LIVE on MIC — providing 7-day and 30-day price forecasts across major wholesale markets of Jammu & Kashmir for informed harvesting, storage and marketing decisions.",
    "📈 NEW REPORT (July 23, 2026): 2026 Cherry Model Performance Review is now live — forecast accuracy across 13 market/grade combinations with an overall prediction accuracy of 81.7%.",
    "🌏 EXPORT MILESTONE (July 2026): J&K's premium Areko Cherries and Scentrose Plums from Shopian & Pulwama have entered the Singapore market for the first time.",
    "📡 DIGITAL MARKET UPDATE: DMI is encouraging all States and Union Territories to establish State-level agricultural market databases integrated with AGMARKNET.",
    "🇮🇳 POLICY UPDATE: NITI Aayog's \"Operation Golden Greens\" roadmap proposes transforming J&K into a global horticulture leader.",
    "⚠️ TRADE ALERT: Recent reductions in import duties on apples have raised competitiveness concerns.",
    "🍏 APPLE INDUSTRY: High-density apple plantations continue expanding across J&K.",
  ]);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [isTeamLoading, setIsTeamLoading] = useState(true);

  useEffect(() => {
    // 1. Try to load from localStorage cache first
    const cachedConfigStr = localStorage.getItem('micskuast_config');
    let hasLoadedFromCache = false;
    if (cachedConfigStr) {
      try {
        const cachedData = JSON.parse(cachedConfigStr);
        if (cachedData && cachedData.hero_title) {
          setHeroTitle(cachedData.hero_title);
          setHeroSubtitle(cachedData.hero_subtitle);
          if (cachedData.announcement) setAnnouncement(cachedData.announcement);
          if (cachedData.ticker_items && cachedData.ticker_items.length > 0) setTickerItems(cachedData.ticker_items);
          if (cachedData.team) {
            setTeamMembers(cachedData.team);
          } else {
            setTeamMembers(defaultTeam);
          }
          setIsTeamLoading(false);
          hasLoadedFromCache = true;
        }
      } catch (e) {
        console.error("Failed to parse cached config:", e);
      }
    }

    // 2. Fetch latest config from server in the background
    fetch('/api/config.php')
      .then(res => res.json())
      .then(data => {
        if (data && data.hero_title) {
          // Update localStorage cache
          localStorage.setItem('micskuast_config', JSON.stringify(data));
          
          // Update state with fresh server data
          setHeroTitle(data.hero_title);
          setHeroSubtitle(data.hero_subtitle);
          if (data.announcement) setAnnouncement(data.announcement);
          if (data.ticker_items && data.ticker_items.length > 0) setTickerItems(data.ticker_items);
          if (data.team) {
            setTeamMembers(data.team);
          } else {
            setTeamMembers(defaultTeam);
          }
        } else {
          if (!hasLoadedFromCache) setTeamMembers(defaultTeam);
        }
        setIsTeamLoading(false);
      })
      .catch(err => {
        console.log("No custom config loaded, using default site copy", err);
        if (!hasLoadedFromCache) {
          setTeamMembers(defaultTeam);
          setIsTeamLoading(false);
        }
      });
  }, []);
 
  return (
    <div className="home-dashboard-wrapper animate-fade-in">
      {/* Premium Redesigned Announcement Banner Card */}
      <div className="announcement-banner-wrapper">
        <div className="announcement-card">
          <div className="announcement-left">
            {/* React style infographic: Custom SVG Sparkline */}
            <div className="announcement-graphic" style={{ display: 'flex', alignItems: 'center' }}>
              <svg width="48" height="24" viewBox="0 0 48 24" fill="none" style={{ opacity: 0.95, marginRight: '0.5rem' }}>
                <path d="M2 18 L10 14 L18 19 L26 9 L34 12 L46 3" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="46" cy="3" r="3" fill="var(--color-primary-light)" />
                <path d="M2 18 L10 14 L18 19 L26 9 L34 12 L46 3 L46 22 L2 22 Z" fill="url(#sparkline-grad-ann)" opacity="0.12" />
                <defs>
                  <linearGradient id="sparkline-grad-ann" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-primary)" />
                    <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="announcement-text" style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span className="announcement-tag">{announcement.tag}</span>
                <span className="announcement-metric-tag">{announcement.stability}</span>
              </div>
              <span className="announcement-msg">
                {announcement.message}
              </span>
            </div>
          </div>
          <a 
            href={announcement.link} 
            target="_blank" 
            rel="noreferrer" 
            className="announcement-action-btn"
          >
            Click Here →
          </a>
        </div>
      </div>
 
      {/* Smooth CSS-driven React Marquee Ticker */}
      <div className="react-marquee-container">
        <div className="react-marquee-label">
          <span className="live-dot"></span>
          <span>MIC UPDATE</span>
        </div>
        
        <div className="react-marquee-track">
          <div className="react-marquee-content">
            {tickerItems.map((item, idx) => (
              <React.Fragment key={idx}>
                <span className="marquee-item">{item}</span>
                {idx < tickerItems.length - 1 && <span className="marquee-separator">●</span>}
              </React.Fragment>
            ))}
          </div>
          
          {/* Doubled track content for seamless continuous looping */}
          <div className="react-marquee-content" aria-hidden="true">
            {tickerItems.map((item, idx) => (
              <React.Fragment key={`double-${idx}`}>
                <span className="marquee-item">{item}</span>
                {idx < tickerItems.length - 1 && <span className="marquee-separator">●</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* S&P Global Style Full-Width Cinematic Hero Section */}
      <section className="sp-hero-wrapper">
        <div className="sp-hero-grid-overlay" />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="sp-hero-eyebrow">
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
            SKUAST-K | HADP-04 AGRICULTURAL MARKET INTELLIGENCE
          </div>

          <h1 className="sp-hero-title">
            <EditableLabel 
              labelKey="home_hero_title" 
              defaultValue={heroTitle} 
              style={{ color: '#ffffff' }}
            />
          </h1>

          <p className="sp-hero-subtitle">
            <EditableLabel 
              labelKey="home_hero_subtitle" 
              defaultValue={heroSubtitle} 
              style={{ color: '#cbd5e1' }}
            />
          </p>

          <div className="sp-hero-actions">
            <NavLink to="/forecasts" className="sp-hero-btn-red">
              <TrendingUp size={18} />
              <span>Explore Live Forecasts</span>
            </NavLink>

            <NavLink to="/ews" className="sp-hero-btn-secondary">
              <AlertTriangle size={18} />
              <span>View EWS Reports</span>
            </NavLink>
          </div>
        </div>
      </section>

      {/* S&P Global Style "Recommended for You" Intelligence Section */}
      <section className="section-padding" style={{ paddingTop: '3.5rem', paddingBottom: '3.5rem', borderBottom: '1px solid var(--color-border)', background: 'var(--color-bg)' }}>
        <div className="container">
          <div className="sp-section-heading">
            <span>Recommended for You</span>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>
              Core Intelligence & Analytical Engines
            </span>
          </div>

          <div className="sp-intel-grid">
            {/* Card 1: AI Forecast Engine */}
            <NavLink to="/forecasts" className="sp-intel-card">
              <div>
                <span className="sp-card-tag">AI & Machine Learning</span>
                <h3 className="sp-card-headline">Apple Price Forecast Engine 2026–27</h3>
                <p className="sp-card-summary">
                  Query deep-learning LSTM models to forecast daily wholesale Mandi prices for commercial apple varieties.
                </p>
              </div>
              <div className="sp-card-footer">
                <span>LSTM Recurrent Models</span>
                <span style={{ color: '#16a34a' }}>94.6% Accuracy →</span>
              </div>
            </NavLink>

            {/* Card 2: EWS / Risk Radar */}
            <NavLink to="/ews" className="sp-intel-card">
              <div>
                <span className="sp-card-tag" style={{ color: '#dc2626' }}>Risk & Early Warning</span>
                <h3 className="sp-card-headline">Cherry Market Volatility Assessment</h3>
                <p className="sp-card-summary">
                  Real-time price anomaly models tracking market volatility parameters, supply chain bottlenecks, and seasonal shocks.
                </p>
              </div>
              <div className="sp-card-footer">
                <span>Volatility Radar</span>
                <span style={{ color: '#dc2626' }}>Active Alerts →</span>
              </div>
            </NavLink>

            {/* Card 3: Mandi Terminals */}
            <NavLink to="/markets" className="sp-intel-card">
              <div>
                <span className="sp-card-tag" style={{ color: '#2563eb' }}>APMC Wholesale Mandis</span>
                <h3 className="sp-card-headline">Live Mandi Terminal Arrivals</h3>
                <p className="sp-card-summary">
                  Track daily arrivals, transaction volume, demand-supply indices across Srinagar, Shopian, Jammu, and Azadpur.
                </p>
              </div>
              <div className="sp-card-footer">
                <span>15+ APMC Terminals</span>
                <span style={{ color: '#2563eb' }}>Real-Time Sync →</span>
              </div>
            </NavLink>

            {/* Card 4: Publications Library */}
            <NavLink to="/publications" className="sp-intel-card">
              <div>
                <span className="sp-card-tag" style={{ color: '#7c3aed' }}>Research & Policy</span>
                <h3 className="sp-card-headline">Horticulture Intelligence Bulletins</h3>
                <p className="sp-card-summary">
                  Browse SKUAST weekly bulletins, policy textbooks, HADP research papers, and commodity price compendiums.
                </p>
              </div>
              <div className="sp-card-footer">
                <span>Peer-Reviewed Data</span>
                <span style={{ color: '#7c3aed' }}>View Repository →</span>
              </div>
            </NavLink>
          </div>

          {/* Quick Stats Banner - Modern Dynamic Glassmorphic Deck */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="hero-stats-deck" style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: '24px',
                padding: '1.6rem 3.5rem',
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '2.5rem',
                width: '100%',
                maxWidth: '920px',
                boxShadow: 'var(--shadow-md)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                position: 'relative',
                transition: 'all 0.3s ease'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, justifyContent: 'center', minWidth: '200px' }}>
                <div className="stat-icon-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', borderRadius: '12px', background: 'var(--color-primary-pale)', color: 'var(--color-primary)' }}>
                  <MapPin size={22} style={{ margin: 'auto' }} />
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '1.85rem', fontWeight: 900, color: 'var(--color-primary)', lineHeight: 1.1 }}>15+</div>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)', marginTop: '0.15rem', letterSpacing: '0.02em' }}>APMC Mandis</div>
                </div>
              </div>
              
              <div style={{ width: '1px', height: '40px', backgroundColor: 'var(--color-border)' }} className="divider-hide" />
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, justifyContent: 'center', minWidth: '200px' }}>
                <div className="stat-icon-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(230, 126, 34, 0.08)', color: '#d97706' }}>
                  <CalendarRange size={22} style={{ margin: 'auto' }} />
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '1.85rem', fontWeight: 900, color: '#d97706', lineHeight: 1.1 }}>19 Years</div>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)', marginTop: '0.15rem', letterSpacing: '0.02em' }}>Price Series</div>
                </div>
              </div>
              
              <div style={{ width: '1px', height: '40px', backgroundColor: 'var(--color-border)' }} className="divider-hide" />
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, justifyContent: 'center', minWidth: '200px' }}>
                <div className="stat-icon-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', borderRadius: '12px', background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}>
                  <RefreshCw size={20} className="spin-slow" style={{ margin: 'auto' }} />
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '1.85rem', fontWeight: 900, color: 'var(--color-accent)', lineHeight: 1.1 }}>Real-Time</div>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)', marginTop: '0.15rem', letterSpacing: '0.02em' }}>Feeds Synced</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Dynamic AI/ML Tech Infographic Section */}
      <section className="section-padding" style={{ borderBottom: '1px solid var(--color-border)', backgroundColor: 'transparent' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 3.5rem' }}>
            <span style={{ 
              color: 'var(--color-primary)', 
              fontSize: '0.85rem', 
              fontWeight: 800, 
              letterSpacing: '0.25em', 
              textTransform: 'uppercase',
              backgroundColor: 'var(--color-primary-pale)',
              padding: '4px 12px',
              borderRadius: '50px',
              display: 'inline-block',
              marginBottom: '1rem'
            }}>
              <EditableLabel labelKey="home_infographic_badge" defaultValue="Core Architecture" />
            </span>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1.15rem', color: 'var(--color-text-main)' }}>
              <EditableLabel labelKey="home_infographic_title" defaultValue="How Agri-Intelligence Empowers Decisions" />
            </h2>
            <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.6', margin: 0 }}>
              <EditableLabel 
                labelKey="home_infographic_desc" 
                defaultValue="Integrating deep learning networks and statistical anomaly alarms to transform raw agricultural transactions into actionable forecasts." 
              />
            </p>
          </div>

          <div className="about-grid" style={{ marginTop: 0 }}>
            {/* Card 1: Data Ingestion */}
            <div className="tech-card data-ingestion">
              <div className="tech-card-header">
                <span className="tech-card-badge">
                  <EditableLabel labelKey="home_info_card1_badge" defaultValue="Data Ingestion" />
                </span>
                <h3 className="tech-card-title">
                  <EditableLabel labelKey="home_info_card1_title" defaultValue="Mandi Log Pipeline" />
                </h3>
                <p className="tech-card-desc">
                  <EditableLabel labelKey="home_info_card1_desc" defaultValue="Extracting wholesale arrivals, transaction volumes, and daily price sheets dynamically from national APMC databases." />
                </p>
              </div>
              <div className="tech-card-footer">
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                  <Landmark size={16} /> <EditableLabel labelKey="home_info_card1_footer_lbl" defaultValue="Streamer" />
                </span>
                <span className="tech-card-metric">
                  <EditableLabel labelKey="home_info_card1_footer_metric" defaultValue="Real-Time Data" />
                </span>
              </div>
            </div>

            {/* Card 2: Deep Learning LSTM Engine */}
            <div className="tech-card neural-networks">
              <div className="tech-card-header">
                <span className="tech-card-badge">
                  <EditableLabel labelKey="home_info_card2_badge" defaultValue="Neural Networks" />
                </span>
                <h3 className="tech-card-title">
                  <EditableLabel labelKey="home_info_card2_title" defaultValue="AI Price Forecasting" />
                </h3>
                <p className="tech-card-desc">
                  <EditableLabel labelKey="home_info_card2_desc" defaultValue="Processing historical time-series with Recurrent Neural Networks (RNN) to forecast daily wholesale cherry and apple prices." />
                </p>
              </div>
              <div className="tech-card-footer">
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                  <Brain size={16} /> <EditableLabel labelKey="home_info_card2_footer_lbl" defaultValue="AI Predictive Core" />
                </span>
                <span className="tech-card-metric">
                  <EditableLabel labelKey="home_info_card2_footer_metric" defaultValue="94.6% Accuracy" />
                </span>
              </div>
            </div>

            {/* Card 3: Anomaly Signals (EWS) */}
            <div className="tech-card alerts-core">
              <div className="tech-card-header">
                <span className="tech-card-badge">
                  <EditableLabel labelKey="home_info_card3_badge" defaultValue="Alerts Core" />
                </span>
                <h3 className="tech-card-title">
                  <EditableLabel labelKey="home_info_card3_title" defaultValue="Early Warning System" />
                </h3>
                <p className="tech-card-desc">
                  <EditableLabel labelKey="home_info_card3_desc" defaultValue="Running automated variance and standard deviation monitors flagging volume anomalies and warning of sudden price shocks." />
                </p>
              </div>
              <div className="tech-card-footer">
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                  <Bell size={16} /> <EditableLabel labelKey="home_info_card3_footer_lbl" defaultValue="Statistical Alarms" />
                </span>
                <span className="tech-card-metric">
                  <EditableLabel labelKey="home_info_card3_footer_metric" defaultValue="Variance Matrix" />
                </span>
              </div>
            </div>

            {/* Card 4: Agri-Policy Decisions */}
            <div className="tech-card decision-support">
              <div className="tech-card-header">
                <span className="tech-card-badge">
                  <EditableLabel labelKey="home_info_card4_badge" defaultValue="Decision Support" />
                </span>
                <h3 className="tech-card-title">
                  <EditableLabel labelKey="home_info_card4_title" defaultValue="HADP Strategic Outreach" />
                </h3>
                <p className="tech-card-desc">
                  <EditableLabel labelKey="home_info_card4_desc" defaultValue="Structuring regional Outlook Reports and strategic indices to support J&K horticulture farmers and policy planners." />
                </p>
              </div>
              <div className="tech-card-footer">
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                  <Award size={16} /> <EditableLabel labelKey="home_info_card4_footer_lbl" defaultValue="HADP Project 04" />
                </span>
                <span className="tech-card-metric">
                  <EditableLabel labelKey="home_info_card4_footer_metric" defaultValue="Actionable Intel" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* APMC Markets Quick Links Grid */}
      <section className="section-padding" style={{ backgroundColor: 'transparent', borderTop: '1px solid var(--color-border)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="card-tag">Market Coverage</span>
              <h2 className="text-gradient" style={{ marginTop: '0.25rem' }}>Wholesale APMC Terminals</h2>
            </div>
            <NavLink to="/markets" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontWeight: 700, color: 'var(--color-primary)' }}>
              See All Markets <ArrowRight size={16} />
            </NavLink>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            {[
              { name: 'Shopian (Aglar)', slug: 'shopian', role: 'Apple Bowl' },
              { name: 'Sopore (Nowpora)', slug: 'sopore', role: 'Transit Hub' },
              { name: 'Srinagar (Parimpore)', slug: 'srinagar', role: 'Central Terminal' },
              { name: 'Ganderbal (Zazna)', slug: 'ganderbal', role: 'Cherry Sourcing' },
              { name: 'Jammu (Narwal)', slug: 'jammu', role: 'Storage Terminal' }
            ].map(m => (
              <NavLink 
                key={m.slug}
                to={`/markets?tab=${m.slug}`}
                className="apmc-card"
              >
                <Landmark size={20} style={{ color: 'var(--color-accent)' }} />
                <h4 style={{ color: 'var(--color-primary)' }}>{m.name}</h4>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>{m.role}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </section>
      {/* Meet Our Team Section */}
      <section className="section-padding" style={{ borderTop: '1px solid var(--color-border)', background: 'radial-gradient(circle at 50% 100%, var(--color-primary-pale) 0%, transparent 70%)' }}>
        <div className="container">
          {/* Header Block */}
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem' }}>
            <span style={{ 
              color: 'var(--color-accent)', 
              fontSize: '0.85rem', 
              fontWeight: 800, 
              letterSpacing: '0.25em', 
              textTransform: 'uppercase',
              backgroundColor: 'var(--color-accent-light)',
              padding: '4px 12px',
              borderRadius: '50px'
            }}>
              HADP Project Members
            </span>
            <h2 className="text-gradient" style={{ 
              fontSize: 'clamp(24px, 3.5vw, 32px)', 
              fontWeight: 900, 
              marginTop: '0.75rem',
              marginBottom: '0.75rem'
            }}>
              Meet Our Team
            </h2>
            <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
              The research, analytical, and technical brains driving agricultural price forecasting and market intelligence models at SKUAST-K Kashmir.
            </p>
          </div>

          {/* Section 1: Principal Investigators */}
          {isTeamLoading ? (
            <div style={{ marginBottom: '4rem' }}>
              <div className="team-grid">
                {[1, 2, 3].map(n => (
                  <div key={n} className="team-member-card skeleton" style={{ minHeight: '260px', background: 'var(--color-surface)', opacity: 0.6, animation: 'pulse 1.5s infinite ease-in-out', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--color-border)', marginBottom: '1.25rem' }} />
                    <div style={{ width: '60%', height: '16px', background: 'var(--color-border)', marginBottom: '0.5rem', borderRadius: '4px' }} />
                    <div style={{ width: '40%', height: '12px', background: 'var(--color-border)', borderRadius: '4px' }} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
              {teamMembers.filter(m => m.category === 'pi').length > 0 && (
                <div style={{ marginBottom: '4rem' }}>
                  <h3 style={{ 
                    fontSize: '1.35rem', 
                    fontWeight: 800, 
                    color: 'var(--color-primary)', 
                    borderBottom: '2px solid var(--color-primary-pale)', 
                    paddingBottom: '0.75rem',
                    marginBottom: '2.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <GraduationCap size={22} style={{ color: 'var(--color-accent)' }} /> Principal Investigators
                  </h3>
                  
                  <div className="team-grid">
                    {teamMembers.filter(m => m.category === 'pi').map((m, idx) => (
                      <div key={idx} className="team-member-card">
                        <div className="member-photo-container">
                          <img src={m.image} alt={m.name} className="member-photo" />
                        </div>
                        <div className="member-info">
                          <h4 className="member-name">{m.name}</h4>
                          <div className="member-role">{m.role}</div>
                          <p className="member-affiliation">{m.affiliation}</p>
                          
                          <div className="member-socials">
                            <a href={m.linkedin} target="_blank" rel="noreferrer" className="social-link linkedin" title="LinkedIn Profile">
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                            </a>
                            <a href="mailto:info@micskuast.in" className="social-link mail" title="Contact Email">
                              <Mail size={18} />
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Section 2: Young Professionals */}
              {teamMembers.filter(m => m.category === 'yp').length > 0 && (
                <div>
                  <h3 style={{ 
                    fontSize: '1.35rem', 
                    fontWeight: 800, 
                    color: 'var(--color-primary)', 
                    borderBottom: '2px solid var(--color-primary-pale)', 
                    paddingBottom: '0.75rem',
                    marginBottom: '2.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <GraduationCap size={22} style={{ color: 'var(--color-accent)' }} /> Research Staff &amp; Young Professionals
                  </h3>

                  <div className="team-grid">
                    {teamMembers.filter(m => m.category === 'yp').map((m, idx) => (
                      <div key={idx} className="team-member-card">
                        <div className="member-photo-container">
                          <img src={m.image} alt={m.name} className="member-photo" />
                        </div>
                        <div className="member-info">
                          <h4 className="member-name">{m.name}</h4>
                          <div className="member-role">{m.role}</div>
                          <p className="member-affiliation">{m.affiliation}</p>
                          
                          <div className="member-socials">
                            <a href={m.linkedin} target="_blank" rel="noreferrer" className="social-link linkedin" title="LinkedIn Profile">
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                            </a>
                            <a href="mailto:info@micskuast.in" className="social-link mail" title="Contact Email">
                              <Mail size={18} />
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Video Insights Section */}
      <section className="section-padding" style={{ borderTop: '1px solid var(--color-border)', background: 'radial-gradient(circle at 50% 0%, var(--color-primary-pale) 0%, transparent 60%)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 3rem' }}>
            <span style={{ 
              color: 'var(--color-accent)', 
              fontSize: '0.75rem', 
              fontWeight: 800, 
              letterSpacing: '0.2em', 
              textTransform: 'uppercase',
              backgroundColor: 'var(--color-accent-light)',
              padding: '4px 12px',
              borderRadius: '50px'
            }}>
              Media &amp; Learning
            </span>
            <h2 className="text-gradient" style={{ fontSize: 'clamp(24px, 3.5vw, 32px)', fontWeight: 900, marginTop: '0.75rem', marginBottom: '0.75rem' }}>
              Video Insights
            </h2>
            <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
              Learn more about the Holistic Agriculture Development Programme (HADP) and its efforts to transform agri-marketing in Jammu &amp; Kashmir.
            </p>
          </div>

          <div className="video-card-wrapper">
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ 
                color: 'var(--color-primary)', 
                fontSize: '0.75rem', 
                fontWeight: 800, 
                textTransform: 'uppercase', 
                letterSpacing: '0.05em',
                marginBottom: '0.5rem' 
              }}>
                HADP Initiative #04
              </div>
              <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--color-primary)', lineHeight: '1.3', marginBottom: '1rem' }}>
                Strengthening of Agri-Marketing in J&amp;K
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                Discover how the Department of Agriculture and SKUAST-K are building digital infrastructure, strengthening APMCs, and empowering growers with data-driven decision tools under the Holistic Agriculture Development Programme.
              </p>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <a 
                  href="https://youtu.be/fiw2_PPNQys?si=A5YZMs2ILJZ4jWZF" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="announcement-action-btn youtube-btn-polish" 
                  style={{ fontSize: '0.8rem', padding: '8px 18px', color: '#ffffff' }}
                >
                  Watch on YouTube
                </a>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text-muted)' }}>
                  🎬 Kisan Kosh J&amp;K
                </span>
              </div>
            </div>

            <div className="video-player-container-outer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div className="video-player-container" style={{ position: 'relative', overflow: 'hidden', paddingBottom: '56.25%', height: 0, width: '100%', borderRadius: '12px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-md)' }}>
                <iframe
                  src="https://www.youtube-nocookie.com/embed/fiw2_PPNQys"
                  title="Strengthening of Agri-marketing in J&amp;K Video Insight"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 0
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .apmc-card {
          transition: var(--transition-smooth);
        }
        .apmc-card:hover {
          transform: translateY(-3px);
          border-color: var(--color-primary-light) !important;
          box-shadow: var(--shadow-md) !important;
        }

        /* Redesigned Hero Elements Styles */
        .hero-logo-pill:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
          border-color: var(--color-primary-light);
        }
        .hero-stats-deck:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
        }
        .spin-slow {
          animation: spin 8s linear infinite;
        }

        /* Redesigned React Cards */
        .react-card {
          text-decoration: none;
          color: inherit;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: 20px;
          padding: 2.5rem 1.75rem 2.25rem;
          display: flex;
          flex-direction: column;
          position: relative;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
          overflow: hidden;
        }
        .react-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at 80% 20%, var(--glow-color, rgba(21, 128, 61, 0.03)) 0%, transparent 55%);
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }
        .react-card:hover {
          transform: translateY(-8px);
          border-color: var(--theme-color);
          box-shadow: 0 12px 30px var(--shadow-color);
        }
        .react-card:hover::before {
          opacity: 1;
        }
        
        /* Define theme variables for each card */
        .react-card.forecast {
          --theme-color: #8b5cf6;
          --shadow-color: rgba(139, 92, 246, 0.12);
          --glow-color: rgba(139, 92, 246, 0.05);
        }
        .react-card.risk {
          --theme-color: #f43f5e;
          --shadow-color: rgba(244, 63, 94, 0.12);
          --glow-color: rgba(244, 63, 94, 0.05);
        }
        .react-card.markets {
          --theme-color: #0284c7;
          --shadow-color: rgba(2, 132, 199, 0.12);
          --glow-color: rgba(2, 132, 199, 0.05);
        }
        .react-card.library {
          --theme-color: #10b981;
          --shadow-color: rgba(16, 185, 129, 0.12);
          --glow-color: rgba(16, 185, 129, 0.05);
        }

        .react-card-icon {
          font-size: 24px;
          margin-bottom: 1.5rem;
          width: 56px;
          height: 56px;
          border-radius: 14px;
          background: var(--color-bg);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          border: 1px solid var(--color-border);
        }
        .react-card:hover .react-card-icon {
          background: var(--theme-color);
          color: white !important;
          border-color: var(--theme-color);
          transform: scale(1.1) rotate(5deg);
          box-shadow: 0 4px 12px var(--shadow-color);
        }
        .react-card-title {
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--color-text-main);
          margin: 0 0 0.6rem;
          transition: color 0.3s ease;
        }
        .react-card:hover .react-card-title {
          color: var(--theme-color);
        }
        .react-card-desc {
          font-size: 0.88rem;
          color: var(--color-text-muted);
          line-height: 1.6;
          margin: 0 0 1.75rem;
          flex-grow: 1;
        }
        
        /* Reveal panel at bottom of card */
        .react-card-reveal {
          border-top: 1px solid var(--color-border);
          padding-top: 1.25rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.75rem;
          font-weight: 700;
        }
        .reveal-tag {
          color: var(--color-text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .reveal-metric {
          color: var(--theme-color);
          background: var(--color-bg);
          border: 1px solid var(--color-border);
          padding: 3px 10px;
          border-radius: 6px;
          transition: all 0.3s ease;
        }
        .react-card:hover .reveal-metric {
          background: var(--theme-color);
          color: white !important;
          border-color: var(--theme-color);
        }

        /* Pulsing badges on cards */
        .card-pulse-badge {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          font-size: 0.7rem;
          font-weight: 800;
          text-transform: uppercase;
          color: var(--theme-color);
          background: var(--color-bg);
          border: 1px solid var(--color-border);
          padding: 4px 10px 4px 22px;
          border-radius: 50px;
          transition: all 0.3s ease;
        }
        .react-card:hover .card-pulse-badge {
          border-color: var(--theme-color);
          box-shadow: 0 2px 8px var(--shadow-color);
        }
        .pulse-dot {
          position: absolute;
          left: 8px;
          top: 7px;
          width: 6px;
          height: 6px;
          background-color: currentColor;
          border-radius: 50%;
          display: inline-block;
          animation: badge-pulse 1.8s infinite ease-in-out;
        }
        @keyframes badge-pulse {
          0% { transform: scale(0.8); opacity: 0.5; }
          50% { transform: scale(1.3); opacity: 1; }
          100% { transform: scale(0.8); opacity: 0.5; }
        }

        /* Watermarks */
        .dynamic-feature-watermark {
          font-size: 56px;
          position: absolute;
          bottom: -10px;
          right: -10px;
          opacity: 0.04;
          transition: all 0.4s ease;
        }
        .react-card:hover .dynamic-feature-watermark {
          opacity: 0.12;
          transform: scale(1.2) translate(-5px, -5px);
        }

        /* Redesigned Announcement Banner Card */
        .announcement-banner-wrapper {
          background: var(--color-surface);
          border-bottom: 1px solid var(--color-border);
          padding: 0.75rem 1rem;
          display: flex;
          justify-content: center;
        }
        .announcement-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: var(--color-primary-pale);
          border: none;
          border-radius: 12px;
          padding: 0.75rem 1.5rem;
          width: 100%;
          max-width: 1140px;
          gap: 1.5rem;
          box-shadow: var(--shadow-sm);
          transition: all 0.3s ease;
        }
        .announcement-card:hover {
          box-shadow: var(--shadow-md);
          transform: translateY(-1px);
        }
        .announcement-left {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .announcement-text {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }
        .announcement-tag {
          font-size: 0.65rem;
          font-weight: 800;
          text-transform: uppercase;
          color: #d32f2f;
          background: #ffebee;
          padding: 2px 8px;
          border-radius: 4px;
          letter-spacing: 0.05em;
        }
        .announcement-metric-tag {
          font-size: 0.65rem;
          font-weight: 800;
          text-transform: uppercase;
          color: var(--color-primary-light);
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          padding: 2px 8px;
          border-radius: 4px;
          letter-spacing: 0.05em;
        }
        .announcement-msg {
          font-size: 0.88rem;
          color: var(--color-text-main);
          line-height: 1.4;
        }
        .announcement-action-btn {
          text-decoration: none;
          color: var(--color-btn-text-primary);
          background: var(--gradient-primary);
          font-size: 0.8rem;
          font-weight: 700;
          padding: 6px 16px;
          border-radius: 6px;
          white-space: nowrap;
          transition: all 0.3s ease;
          box-shadow: var(--shadow-sm);
        }
        .announcement-action-btn:hover {
          background: var(--gradient-primary-hover);
          color: var(--color-btn-text-primary);
          transform: translateY(-1px);
          box-shadow: var(--shadow-md);
        }

        /* React CSS Marquee Ticker */
        .react-marquee-container {
          display: flex;
          align-items: center;
          background: var(--color-surface);
          border-bottom: 1px solid var(--color-border);
          min-height: 38px;
          overflow: hidden;
          position: relative;
        }
        .react-marquee-label {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          background: var(--gradient-primary);
          color: var(--color-btn-text-primary);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 8px 18px 8px 14px;
          white-space: nowrap;
          gap: 8px;
          z-index: 5;
          position: relative;
          box-shadow: 4px 0 15px rgba(0, 0, 0, 0.05);
          clip-path: polygon(0 0, 90% 0, 100% 50%, 90% 100%, 0 100%);
        }
        .react-marquee-label .live-dot {
          width: 8px;
          height: 8px;
          background-color: #ff3b30;
          border-radius: 50%;
          animation: dot-pulse 1.5s infinite ease-in-out;
          display: inline-block;
        }
        @keyframes dot-pulse {
          0% { transform: scale(0.8); opacity: 0.5; }
          50% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(0.8); opacity: 0.5; }
        }
        .react-marquee-track {
          flex: 1;
          display: flex;
          overflow: hidden;
          user-select: none;
          position: relative;
        }
        .react-marquee-content {
          display: flex;
          flex-shrink: 0;
          align-items: center;
          white-space: nowrap;
          gap: 3rem;
          padding-left: 1.5rem;
          animation: marquee-scroll 95s linear infinite;
        }
        .react-marquee-track:hover .react-marquee-content {
          animation-play-state: paused;
        }
        .marquee-item {
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--color-text-main);
          display: flex;
          align-items: center;
        }
        .marquee-link {
          color: var(--color-primary-light);
          font-weight: 700;
          text-decoration: none;
          margin-left: 0.5rem;
          border-bottom: 1.5px solid transparent;
          transition: all 0.2s ease;
        }
        .marquee-link:hover {
          color: var(--color-primary);
          border-bottom-color: var(--color-primary);
        }
        .marquee-separator {
          color: var(--color-primary-light);
          font-size: 8px;
          margin: 0;
          opacity: 0.4;
        }
        @keyframes marquee-scroll {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-100%, 0, 0); }
        }

        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
          gap: 2rem;
          max-width: 1050px;
          margin: 0 auto 3rem;
        }
        .team-member-card {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: 20px;
          padding: 2.25rem 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          box-shadow: 0 4px 15px rgba(0,0,0,0.012);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
        }
        .team-member-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--color-primary) 0%, var(--color-primary-light) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .team-member-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 25px rgba(21, 128, 61, 0.08);
          border-color: var(--color-primary-light);
        }
        .team-member-card:hover::before {
          opacity: 1;
        }
        .member-photo-container {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          overflow: hidden;
          margin-bottom: 1.5rem;
          background: var(--color-primary-pale);
          border: 3px solid var(--color-border);
          box-shadow: 0 4px 12px rgba(0,0,0,0.03);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .team-member-card:hover .member-photo-container {
          transform: scale(1.05);
          border-color: var(--color-primary-light);
          box-shadow: 0 6px 20px rgba(27, 110, 46, 0.12);
        }
        .member-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        .team-member-card:hover .member-photo {
          transform: scale(1.03);
        }
        .member-name {
          font-size: 1.2rem;
          font-weight: 800;
          color: var(--color-primary);
          margin-bottom: 0.35rem;
        }
        .member-role {
          font-size: 0.78rem;
          font-weight: 800;
          color: var(--color-accent);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.75rem;
          display: inline-block;
          background: var(--color-accent-light);
          padding: 2px 8px;
          border-radius: 4px;
        }
        .member-affiliation {
          font-size: 0.85rem;
          color: var(--color-text-muted);
          line-height: 1.5;
          margin-bottom: 1.5rem;
          flex-grow: 1;
          max-width: 260px;
        }
        .member-socials {
          display: flex;
          gap: 0.75rem;
          justify-content: center;
        }
        .social-link {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-text-muted);
          background: var(--color-primary-pale);
          border: 1px solid var(--color-border);
          transition: all 0.3s ease;
        }
        .social-link.linkedin:hover {
          color: #ffffff;
          background: #0077b5;
          border-color: #0077b5;
          transform: translateY(-2px);
        }
        .social-link.mail:hover {
          color: #ffffff;
          background: var(--color-primary);
          border-color: var(--color-primary);
          transform: translateY(-2px);
        }

        @media (max-width: 640px) {
          .divider-hide {
            display: none;
          }
          .announcement-card {
            flex-direction: column;
            align-items: flex-start;
            padding: 1rem;
            gap: 1rem;
          }
          .announcement-action-btn {
            align-self: flex-end;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
