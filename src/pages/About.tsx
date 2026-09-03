import React from 'react';
import { NavLink } from 'react-router-dom';
import { EditableLabel } from '../components/EditableLabel';
import { 
  Brain, 
  Bell, 
  Landmark, 
  BookOpen, 
  ShieldCheck, 
  Database, 
  Cpu, 
  CheckCircle2, 
  Users, 
  Workflow, 
  Scale, 
  BarChart3,
  Sparkles
} from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="about-page-wrapper">
      <div className="container animate-fade-in">

        {/* 1. HERO HEADER */}
        <div style={{ textAlign: 'center', maxWidth: '960px', margin: '0 auto 3.5rem' }}>
          <div className="about-hero-badge">
            <Sparkles size={14} />
            <EditableLabel 
              labelKey="about_hero_badge_text" 
              defaultValue="HADP #04: Strengthening Agricultural Marketing in UT of Jammu and Kashmir" 
            />
          </div>

          <h1 className="about-hero-title">
            <EditableLabel 
              labelKey="about_hero_title_v2" 
              defaultValue="Empowering J&K's Horticulture Economy Through Market Intelligence" 
            />
          </h1>

          <p className="about-hero-subtitle">
            <EditableLabel 
              labelKey="about_hero_subtitle_v2" 
              defaultValue="The Market Intelligence Cell (MIC) at SKUAST-Kashmir is the digital nerve center dedicated to transforming agricultural marketing in Jammu and Kashmir. Powered by deep-learning LSTM neural networks, real-time APMC mandi telemetry, and price anomaly early warning radars, we deliver transparent, actionable foresight to fruit growers, FPOs, traders, and agricultural policy makers." 
            />
          </p>
        </div>

        {/* 2. KEY PERFORMANCE INDICATORS (KPI DECK) */}
        <div className="about-kpi-grid">
          <div className="about-kpi-card">
            <div className="about-kpi-val">
              <EditableLabel labelKey="about_kpi1_val" defaultValue="19+" />
            </div>
            <div className="about-kpi-lbl">
              <EditableLabel labelKey="about_kpi1_lbl" defaultValue="Years Price Series Data" />
            </div>
          </div>
          <div className="about-kpi-card">
            <div className="about-kpi-val">
              <EditableLabel labelKey="about_kpi2_val" defaultValue="15+" />
            </div>
            <div className="about-kpi-lbl">
              <EditableLabel labelKey="about_kpi2_lbl" defaultValue="APMC Mandis Synchronized" />
            </div>
          </div>
          <div className="about-kpi-card">
            <div className="about-kpi-val">
              <EditableLabel labelKey="about_kpi3_val" defaultValue="94.6%" />
            </div>
            <div className="about-kpi-lbl">
              <EditableLabel labelKey="about_kpi3_lbl" defaultValue="LSTM Predictive Accuracy" />
            </div>
          </div>
          <div className="about-kpi-card">
            <div className="about-kpi-val">
              <EditableLabel labelKey="about_kpi4_val" defaultValue="6+" />
            </div>
            <div className="about-kpi-lbl">
              <EditableLabel labelKey="about_kpi4_lbl" defaultValue="Commercial Crop Varieties" />
            </div>
          </div>
          <div className="about-kpi-card">
            <div className="about-kpi-val">
              <EditableLabel labelKey="about_kpi5_val" defaultValue="100%" />
            </div>
            <div className="about-kpi-lbl">
              <EditableLabel labelKey="about_kpi5_lbl" defaultValue="Open Access for Growers" />
            </div>
          </div>
        </div>

        {/* 3. THE MISSION & GENESIS UNDER HADP-04 */}
        <div className="about-narrative-grid">
          <div className="about-narrative-card">
            <span style={{ 
              color: 'var(--color-primary)', 
              fontSize: '0.78rem', 
              fontWeight: 800, 
              letterSpacing: '0.15em', 
              textTransform: 'uppercase',
              marginBottom: '0.75rem',
              display: 'block' 
            }}>
              <EditableLabel 
                labelKey="about_mission_badge" 
                defaultValue="The Genesis & Mission" 
              />
            </span>
            <h3>
              <EditableLabel 
                labelKey="about_mission_heading" 
                defaultValue="Why Was the Market Intelligence Cell Established?" 
              />
            </h3>
            <p>
              <EditableLabel 
                labelKey="about_mission_p1" 
                defaultValue="Jammu & Kashmir produces over 70% of India's total apple output and the vast majority of its commercial cherry harvest. Despite this agricultural abundance, smallholder orchardists and fruit growers have historically faced severe structural challenges: extreme seasonal price volatility, information asymmetry between rural orchards and urban terminal markets, geographic bottlenecks along the Jammu–Srinagar highway, and distress sales during peak harvest gluts." 
              />
            </p>
            <p>
              <EditableLabel 
                labelKey="about_mission_p2" 
                defaultValue="To eliminate these systemic vulnerabilities, the Government of Jammu & Kashmir instituted Project HADP-04: 'Strengthening Agricultural Marketing in UT of Jammu and Kashmir' under the landmark Holistic Agriculture Development Programme." 
              />
            </p>
            <p style={{ margin: 0 }}>
              <EditableLabel 
                labelKey="about_mission_p3" 
                defaultValue="Under this mandate, SKUAST-Kashmir established the Market Intelligence Cell (MIC) — a specialized research and computational unit tasked with replacing speculation with empirical science, giving every farmer the foresight needed to sell at optimal times and the right markets." 
              />
            </p>
          </div>

          <div className="about-mandate-card">
            <div className="about-mandate-header">
              <div className="about-mandate-logos">
                <img src="/logos/skuast.png" alt="SKUAST-K Logo" className="about-mandate-logo-img" />
                <div style={{ width: '1px', height: '32px', backgroundColor: 'var(--color-border)' }} />
                <img src="/logos/hadp.png" alt="HADP Logo" className="about-mandate-logo-img" />
              </div>
              <div>
                <div style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--color-text-main)', lineHeight: '1.3' }}>
                  <EditableLabel 
                    labelKey="about_mandate_title" 
                    defaultValue="HADP #04: Strengthening Agricultural Marketing in UT of Jammu and Kashmir" 
                  />
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600, marginTop: '2px' }}>
                  <EditableLabel 
                    labelKey="about_mandate_sub" 
                    defaultValue="Government of Jammu & Kashmir" 
                  />
                </div>
              </div>
            </div>

            <div className="about-mandate-item">
              <CheckCircle2 size={18} className="about-mandate-icon" />
              <span>
                <EditableLabel 
                  labelKey="about_mandate_item1" 
                  defaultValue="Real-time price & arrival tracking across regional & national Mandis" 
                />
              </span>
            </div>
            <div className="about-mandate-item">
              <CheckCircle2 size={18} className="about-mandate-icon" />
              <span>
                <EditableLabel 
                  labelKey="about_mandate_item2" 
                  defaultValue="Deep-learning price forecasts for Apple & Cherry varieties" 
                />
              </span>
            </div>
            <div className="about-mandate-item">
              <CheckCircle2 size={18} className="about-mandate-icon" />
              <span>
                <EditableLabel 
                  labelKey="about_mandate_item3" 
                  defaultValue="Early Warning System (EWS) to detect market volatility and price crashes" 
                />
              </span>
            </div>
            <div className="about-mandate-item">
              <CheckCircle2 size={18} className="about-mandate-icon" />
              <span>
                <EditableLabel 
                  labelKey="about_mandate_item4" 
                  defaultValue="Post-harvest CA storage & logistics decision support for orchardists" 
                />
              </span>
            </div>
            <div className="about-mandate-item">
              <CheckCircle2 size={18} className="about-mandate-icon" />
              <span>
                <EditableLabel 
                  labelKey="about_mandate_item5" 
                  defaultValue="Weekly policy briefs & scientific market intelligence bulletins" 
                />
              </span>
            </div>
          </div>
        </div>

        {/* 4. WHAT THIS WEBSITE DELIVERS (6 CORE PILLARS) */}
        <div style={{ marginBottom: '5rem' }}>
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3rem' }}>
            <span style={{ 
              color: 'var(--color-primary)', 
              fontSize: '0.8rem', 
              fontWeight: 800, 
              letterSpacing: '0.2em', 
              textTransform: 'uppercase',
              backgroundColor: 'var(--color-primary-pale)',
              padding: '4px 14px',
              borderRadius: '50px',
              display: 'inline-block',
              marginBottom: '0.75rem' 
            }}>
              <EditableLabel 
                labelKey="about_pillars_section_badge" 
                defaultValue="Platform Capabilities" 
              />
            </span>
            <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 34px)', fontWeight: 800, color: 'var(--color-text-main)', margin: '0 0 0.85rem' }}>
              <EditableLabel 
                labelKey="about_pillars_section_title" 
                defaultValue="What This Website Is All About" 
              />
            </h2>
            <p style={{ color: 'var(--color-text-muted)', margin: 0, fontSize: '0.95rem', lineHeight: '1.6' }}>
              <EditableLabel 
                labelKey="about_pillars_section_desc" 
                defaultValue="Comprehensive digital tools purpose-built to transform raw agricultural data into commercial value for the farming community." 
              />
            </p>
          </div>

          <div className="about-pillars-grid">
            {/* Pillar 1: AI Price Forecasting */}
            <div className="about-pillar-card" style={{ '--pillar-accent': '#16a34a', '--pillar-pale': 'rgba(22, 163, 74, 0.1)' } as any}>
              <div>
                <div className="about-pillar-icon-box">
                  <Brain size={24} />
                </div>
                <h3 className="about-pillar-title">
                  <EditableLabel 
                    labelKey="about_pillar1_title" 
                    defaultValue="AI Price Forecasting Engine" 
                  />
                </h3>
                <p className="about-pillar-desc">
                  <EditableLabel 
                    labelKey="about_pillar1_desc" 
                    defaultValue="Utilizes state-of-the-art Long Short-Term Memory (LSTM) recurrent neural network architectures trained on 19 years of daily wholesale transactions. Generates 7-day, 15-day, and 30-day ahead modal, minimum, and maximum price projections across apple and cherry varieties." 
                  />
                </p>
              </div>
              <div className="about-pillar-footer">
                <span>
                  <EditableLabel 
                    labelKey="about_pillar1_metric" 
                    defaultValue="94.6% Historical Precision" 
                  />
                </span>
                <NavLink to="/forecasts" style={{ color: 'inherit', textDecoration: 'none' }}>
                  <EditableLabel 
                    labelKey="about_pillar1_btn" 
                    defaultValue="Explore Forecasts →" 
                  />
                </NavLink>
              </div>
            </div>

            {/* Pillar 2: Early Warning Systems */}
            <div className="about-pillar-card" style={{ '--pillar-accent': '#dc2626', '--pillar-pale': 'rgba(220, 38, 38, 0.1)' } as any}>
              <div>
                <div className="about-pillar-icon-box">
                  <Bell size={24} />
                </div>
                <h3 className="about-pillar-title">
                  <EditableLabel 
                    labelKey="about_pillar2_title" 
                    defaultValue="Early Warning System (EWS)" 
                  />
                </h3>
                <p className="about-pillar-desc">
                  <EditableLabel 
                    labelKey="about_pillar2_desc" 
                    defaultValue="Automated statistical anomaly detection monitors standard deviations and rolling volatility indices. Identifies sudden supply gluts, highway transportation shocks, and demand anomalies to sound timely alerts before catastrophic price drops occur." 
                  />
                </p>
              </div>
              <div className="about-pillar-footer">
                <span>
                  <EditableLabel 
                    labelKey="about_pillar2_metric" 
                    defaultValue="Real-Time Volatility Radar" 
                  />
                </span>
                <NavLink to="/ews" style={{ color: 'inherit', textDecoration: 'none' }}>
                  <EditableLabel 
                    labelKey="about_pillar2_btn" 
                    defaultValue="View Active Alerts →" 
                  />
                </NavLink>
              </div>
            </div>

            {/* Pillar 3: Wholesale Mandi Terminals */}
            <div className="about-pillar-card" style={{ '--pillar-accent': '#2563eb', '--pillar-pale': 'rgba(37, 99, 235, 0.1)' } as any}>
              <div>
                <div className="about-pillar-icon-box">
                  <Landmark size={24} />
                </div>
                <h3 className="about-pillar-title">
                  <EditableLabel 
                    labelKey="about_pillar3_title" 
                    defaultValue="Live APMC Mandi Telemetry" 
                  />
                </h3>
                <p className="about-pillar-desc">
                  <EditableLabel 
                    labelKey="about_pillar3_desc" 
                    defaultValue="Continuous data ingestion and daily transaction logs from key production mandis — Parimpora (Srinagar), Aglar (Shopian), Nowpora (Sopore), Zazna (Ganderbal), and Narwal (Jammu) — alongside major consuming hubs like Azadpur Delhi, Bangalore, and Mumbai." 
                  />
                </p>
              </div>
              <div className="about-pillar-footer">
                <span>
                  <EditableLabel 
                    labelKey="about_pillar3_metric" 
                    defaultValue="15+ Wholesale Terminals" 
                  />
                </span>
                <NavLink to="/markets" style={{ color: 'inherit', textDecoration: 'none' }}>
                  <EditableLabel 
                    labelKey="about_pillar3_btn" 
                    defaultValue="Browse Mandis →" 
                  />
                </NavLink>
              </div>
            </div>

            {/* Pillar 4: Cold Storage Decision Support */}
            <div className="about-pillar-card" style={{ '--pillar-accent': '#d97706', '--pillar-pale': 'rgba(217, 119, 6, 0.1)' } as any}>
              <div>
                <div className="about-pillar-icon-box">
                  <Scale size={24} />
                </div>
                <h3 className="about-pillar-title">
                  <EditableLabel 
                    labelKey="about_pillar4_title" 
                    defaultValue="Storage & Harvest Timing" 
                  />
                </h3>
                <p className="about-pillar-desc">
                  <EditableLabel 
                    labelKey="about_pillar4_desc" 
                    defaultValue="Empirical cost-benefit models comparing immediate harvest-season selling against Controlled Atmosphere (CA) cold storage holding costs, helping orchardists make evidence-based storage and dispatch timing decisions to capture premium off-season rates." 
                  />
                </p>
              </div>
              <div className="about-pillar-footer">
                <span>
                  <EditableLabel 
                    labelKey="about_pillar4_metric" 
                    defaultValue="Value Realization Models" 
                  />
                </span>
                <NavLink to="/forecasts" style={{ color: 'inherit', textDecoration: 'none' }}>
                  <EditableLabel 
                    labelKey="about_pillar4_btn" 
                    defaultValue="Storage Analysis →" 
                  />
                </NavLink>
              </div>
            </div>

            {/* Pillar 5: Publications & Intelligence Reports */}
            <div className="about-pillar-card" style={{ '--pillar-accent': '#7c3aed', '--pillar-pale': 'rgba(124, 58, 237, 0.1)' } as any}>
              <div>
                <div className="about-pillar-icon-box">
                  <BookOpen size={24} />
                </div>
                <h3 className="about-pillar-title">
                  <EditableLabel 
                    labelKey="about_pillar5_title" 
                    defaultValue="Publications & Policy Bulletins" 
                  />
                </h3>
                <p className="about-pillar-desc">
                  <EditableLabel 
                    labelKey="about_pillar5_desc" 
                    defaultValue="Weekly market outlook bulletins, comprehensive annual crop price compendiums, and peer-reviewed research papers produced by SKUAST-Kashmir agricultural economists, offering strategic insights for planners and researchers." 
                  />
                </p>
              </div>
              <div className="about-pillar-footer">
                <span>
                  <EditableLabel 
                    labelKey="about_pillar5_metric" 
                    defaultValue="Peer-Reviewed Repository" 
                  />
                </span>
                <NavLink to="/publications" style={{ color: 'inherit', textDecoration: 'none' }}>
                  <EditableLabel 
                    labelKey="about_pillar5_btn" 
                    defaultValue="Read Bulletins →" 
                  />
                </NavLink>
              </div>
            </div>

            {/* Pillar 6: Democratizing Market Transparency */}
            <div className="about-pillar-card" style={{ '--pillar-accent': '#0d9488', '--pillar-pale': 'rgba(13, 148, 136, 0.1)' } as any}>
              <div>
                <div className="about-pillar-icon-box">
                  <ShieldCheck size={24} />
                </div>
                <h3 className="about-pillar-title">
                  <EditableLabel 
                    labelKey="about_pillar6_title" 
                    defaultValue="Transparent Price Discovery" 
                  />
                </h3>
                <p className="about-pillar-desc">
                  <EditableLabel 
                    labelKey="about_pillar6_desc" 
                    defaultValue="Leveling the playing field by dismantling information monopolies. Real-time access to actual market realizations ensures small and marginal farmers have equal bargaining leverage when negotiating with commission agents and buyers." 
                  />
                </p>
              </div>
              <div className="about-pillar-footer">
                <span>
                  <EditableLabel 
                    labelKey="about_pillar6_metric" 
                    defaultValue="Direct Farmer Empowerment" 
                  />
                </span>
                <span style={{ color: 'var(--pillar-accent)' }}>
                  <EditableLabel 
                    labelKey="about_pillar6_btn" 
                    defaultValue="100% Free Access" 
                  />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 5. THE DATA-TO-DECISION PIPELINE */}
        <div style={{ marginBottom: '5.5rem' }}>
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3rem' }}>
            <span style={{ 
              color: 'var(--color-primary)', 
              fontSize: '0.8rem', 
              fontWeight: 800, 
              letterSpacing: '0.2em', 
              textTransform: 'uppercase',
              backgroundColor: 'var(--color-primary-pale)',
              padding: '4px 14px',
              borderRadius: '50px',
              display: 'inline-block',
              marginBottom: '0.75rem' 
            }}>
              <EditableLabel 
                labelKey="about_pipeline_section_badge" 
                defaultValue="Scientific Architecture" 
              />
            </span>
            <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 34px)', fontWeight: 800, color: 'var(--color-text-main)', margin: '0 0 0.85rem' }}>
              <EditableLabel 
                labelKey="about_pipeline_section_title" 
                defaultValue="How Raw Mandi Data Becomes Actionable Intelligence" 
              />
            </h2>
            <p style={{ color: 'var(--color-text-muted)', margin: 0, fontSize: '0.95rem', lineHeight: '1.6' }}>
              <EditableLabel 
                labelKey="about_pipeline_section_desc" 
                defaultValue="An automated, rigorous 4-stage pipeline translating wholesale market volatility into clear, trustworthy decision support." 
              />
            </p>
          </div>

          <div className="about-workflow-container">
            {/* Step 1 */}
            <div className="about-step-card">
              <span className="about-step-num">01</span>
              <div className="about-step-icon">
                <Database size={22} />
              </div>
              <h4 className="about-step-title">
                <EditableLabel 
                  labelKey="about_step1_title" 
                  defaultValue="Mandi Ingestion" 
                />
              </h4>
              <p className="about-step-desc">
                <EditableLabel 
                  labelKey="about_step1_desc" 
                  defaultValue="Daily automated extraction of modal prices, arrivals (quintals/boxes), and quality grades from APMC records, AGMARKNET, and direct market logs." 
                />
              </p>
            </div>

            {/* Step 2 */}
            <div className="about-step-card">
              <span className="about-step-num">02</span>
              <div className="about-step-icon">
                <Cpu size={22} />
              </div>
              <h4 className="about-step-title">
                <EditableLabel 
                  labelKey="about_step2_title" 
                  defaultValue="Neural Modeling" 
                />
              </h4>
              <p className="about-step-desc">
                <EditableLabel 
                  labelKey="about_step2_desc" 
                  defaultValue="Normalizing data series and applying Deep Learning Recurrent Neural Networks (LSTM) trained on 19 years of seasonal supply dynamics." 
                />
              </p>
            </div>

            {/* Step 3 */}
            <div className="about-step-card">
              <span className="about-step-num">03</span>
              <div className="about-step-icon">
                <BarChart3 size={22} />
              </div>
              <h4 className="about-step-title">
                <EditableLabel 
                  labelKey="about_step3_title" 
                  defaultValue="Econometric Review" 
                />
              </h4>
              <p className="about-step-desc">
                <EditableLabel 
                  labelKey="about_step3_desc" 
                  defaultValue="Validation by agricultural economists at SKUAST-Kashmir, cross-verifying anomaly signals with highway conditions and harvest schedules." 
                />
              </p>
            </div>

            {/* Step 4 */}
            <div className="about-step-card">
              <span className="about-step-num">04</span>
              <div className="about-step-icon">
                <Workflow size={22} />
              </div>
              <h4 className="about-step-title">
                <EditableLabel 
                  labelKey="about_step4_title" 
                  defaultValue="Open Dissemination" 
                />
              </h4>
              <p className="about-step-desc">
                <EditableLabel 
                  labelKey="about_step4_desc" 
                  defaultValue="Instant delivery via interactive web dashboards, SMS advisories, weekly PDF bulletins, and FPO briefing notes to guide real-world selling." 
                />
              </p>
            </div>
          </div>
        </div>

        {/* 6. WHO BENEFITS? (STAKEHOLDER VALUE MATRIX) */}
        <div style={{ marginBottom: '5.5rem' }}>
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3rem' }}>
            <span style={{ 
              color: 'var(--color-primary)', 
              fontSize: '0.8rem', 
              fontWeight: 800, 
              letterSpacing: '0.2em', 
              textTransform: 'uppercase',
              backgroundColor: 'var(--color-primary-pale)',
              padding: '4px 14px',
              borderRadius: '50px',
              display: 'inline-block',
              marginBottom: '0.75rem' 
            }}>
              <EditableLabel 
                labelKey="about_stakeholders_section_badge" 
                defaultValue="Impact & Stakeholders" 
              />
            </span>
            <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 34px)', fontWeight: 800, color: 'var(--color-text-main)', margin: '0 0 0.85rem' }}>
              <EditableLabel 
                labelKey="about_stakeholders_section_title" 
                defaultValue="Who Benefits from This Platform?" 
              />
            </h2>
            <p style={{ color: 'var(--color-text-muted)', margin: 0, fontSize: '0.95rem', lineHeight: '1.6' }}>
              <EditableLabel 
                labelKey="about_stakeholders_section_desc" 
                defaultValue="Tailored value creation across the entire agricultural value chain in Jammu and Kashmir." 
              />
            </p>
          </div>

          <div className="stakeholder-grid">
            <div className="stakeholder-card">
              <span className="stakeholder-badge">
                <EditableLabel labelKey="about_stakeholder1_badge" defaultValue="Growers" />
              </span>
              <h4 className="stakeholder-title">
                <EditableLabel labelKey="about_stakeholder1_title" defaultValue="Fruit Growers & Orchardists" />
              </h4>
              <p className="stakeholder-desc">
                <EditableLabel 
                  labelKey="about_stakeholder1_desc" 
                  defaultValue="Access accurate 7 to 30-day price predictions to schedule harvest dates, compare terminal market rates before shipping, and eliminate distress sales during peak season." 
                />
              </p>
            </div>

            <div className="stakeholder-card">
              <span className="stakeholder-badge" style={{ background: 'rgba(37, 99, 235, 0.1)', color: '#2563eb' }}>
                <EditableLabel labelKey="about_stakeholder2_badge" defaultValue="Cooperatives" />
              </span>
              <h4 className="stakeholder-title">
                <EditableLabel labelKey="about_stakeholder2_title" defaultValue="FPOs & Producer Groups" />
              </h4>
              <p className="stakeholder-desc">
                <EditableLabel 
                  labelKey="about_stakeholder2_desc" 
                  defaultValue="Aggregate member produce effectively, negotiate equitable terms with institutional buyers, and plan collective utilization of CA cold-chain storage facilities." 
                />
              </p>
            </div>

            <div className="stakeholder-card">
              <span className="stakeholder-badge" style={{ background: 'rgba(217, 119, 6, 0.1)', color: '#d97706' }}>
                <EditableLabel labelKey="about_stakeholder3_badge" defaultValue="Trade" />
              </span>
              <h4 className="stakeholder-title">
                <EditableLabel labelKey="about_stakeholder3_title" defaultValue="Traders & Commission Agents" />
              </h4>
              <p className="stakeholder-desc">
                <EditableLabel 
                  labelKey="about_stakeholder3_desc" 
                  defaultValue="Monitor transparent arrival volumes and inter-state price spreads to optimize procurement logistics, manage inventory, and minimize price shock exposures." 
                />
              </p>
            </div>

            <div className="stakeholder-card">
              <span className="stakeholder-badge" style={{ background: 'rgba(124, 58, 237, 0.1)', color: '#7c3aed' }}>
                <EditableLabel labelKey="about_stakeholder4_badge" defaultValue="Policy" />
              </span>
              <h4 className="stakeholder-title">
                <EditableLabel labelKey="about_stakeholder4_title" defaultValue="Government & Planners" />
              </h4>
              <p className="stakeholder-desc">
                <EditableLabel 
                  labelKey="about_stakeholder4_desc" 
                  defaultValue="Empirical baseline data for timely Market Intervention Scheme (MIS) triggers, post-harvest infrastructure investment, and regional agricultural policy design." 
                />
              </p>
            </div>
          </div>
        </div>

        {/* 7. MESSAGE FROM LEADERSHIP (VICE CHANCELLOR'S CARD) */}
        <div className="about-vc-container">
          <img src="/logos/skuast.png" alt="SKUAST Watermark" className="about-vc-watermark" />
          
          <span className="about-vc-badge">
            <EditableLabel labelKey="about_vc_badge_text" defaultValue="Leadership Vision" />
          </span>
          
          <h2 className="about-vc-heading">
            <EditableLabel 
              labelKey="about_vc_title_v2" 
              defaultValue="A Scientific Foundation for Agri-Decision Science" 
            />
          </h2>

          <blockquote className="about-vc-quote">
            "<EditableLabel 
              labelKey="about_vc_quote_v2" 
              defaultValue="In our pursuit of transforming agricultural landscapes through scientific excellence, the SKUAST-K Market Intelligence Cell stands as a pioneering beacon. By translating complex data paradigms into actionable market forecasts, we are equipping Jammu & Kashmir's farming community with the resources needed to navigate volatile marketing dynamics, safeguard their hard-earned yields, and capture the true economic value of their produce." 
            />"
          </blockquote>

          <div className="vc-profile-section" style={{ marginTop: 0 }}>
            <div className="vc-avatar-circle">
              <img 
                src="/team/nazir_ganai.jpg" 
                alt="Prof. Nazir Ahmad Ganai" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </div>
            <div className="vc-signature-block">
              <h4 className="vc-name">
                <EditableLabel labelKey="about_vc_name_text" defaultValue="Prof. Nazir Ahmad Ganai" />
              </h4>
              <span className="vc-title">
                <EditableLabel labelKey="about_vc_title_text" defaultValue="Hon'ble Vice Chancellor, SKUAST-Kashmir" />
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-primary)', fontWeight: 750, marginTop: '2px' }}>
                <EditableLabel labelKey="about_vc_role_text" defaultValue="Patron & Visionary Leader, HADP Project-04" />
              </span>
            </div>
          </div>
        </div>

        {/* 8. EXPLORE PORTAL CTAS */}
        <div className="about-cta-deck">
          <h3 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--color-text-main)', margin: '0 0 0.65rem' }}>
            <EditableLabel labelKey="about_cta_deck_title" defaultValue="Explore the Market Intelligence Platform" />
          </h3>
          <p style={{ color: 'var(--color-text-muted)', margin: 0, fontSize: '0.95rem' }}>
            <EditableLabel labelKey="about_cta_deck_desc" defaultValue="Access our real-time forecasting tools, wholesale terminal arrivals, and research compendiums." />
          </p>

          <div className="about-cta-grid">
            <NavLink to="/forecasts" className="about-cta-link">
              <Brain size={24} />
              <span>
                <EditableLabel labelKey="about_cta1_btn" defaultValue="AI Price Forecasts" />
              </span>
            </NavLink>

            <NavLink to="/ews" className="about-cta-link">
              <Bell size={24} />
              <span>
                <EditableLabel labelKey="about_cta2_btn" defaultValue="Early Warning Alerts" />
              </span>
            </NavLink>

            <NavLink to="/markets" className="about-cta-link">
              <Landmark size={24} />
              <span>
                <EditableLabel labelKey="about_cta3_btn" defaultValue="Live APMC Mandis" />
              </span>
            </NavLink>

            <NavLink to="/publications" className="about-cta-link">
              <BookOpen size={24} />
              <span>
                <EditableLabel labelKey="about_cta4_btn" defaultValue="Research Bulletins" />
              </span>
            </NavLink>

            <NavLink to="/team" className="about-cta-link">
              <Users size={24} />
              <span>
                <EditableLabel labelKey="about_cta5_btn" defaultValue="Meet Research Team" />
              </span>
            </NavLink>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;


