import React, { useState, useEffect, useRef } from 'react';
import { Shield, Key, Plus, Trash2, Edit, Save, Upload, CheckCircle, AlertTriangle, ArrowUp, ArrowDown } from 'lucide-react';

interface PublicationItem {
  id: number;
  title: string;
  category: string;
  author: string;
  description: string;
  year: string;
  url: string;
}

interface TeamMember {
  name: string;
  role: string;
  affiliation: string;
  image: string;
  linkedin: string;
  category: 'pi' | 'yp';
}

interface HeroSlide {
  id: number;
  eyebrow: string;
  show_hadp_logo?: boolean;
  title: string;
  subtitle: string;
  btn_primary_text: string;
  btn_primary_link: string;
  btn_secondary_text: string;
  btn_secondary_link: string;
  bg_image: string;
}

interface SiteConfig {
  hero_title: string;
  hero_subtitle: string;
  hero_slides?: HeroSlide[];
  ticker_items: string[];
  announcement: {
    tag: string;
    stability: string;
    message: string;
    link: string;
  };
  publications: PublicationItem[];
  labels?: Record<string, string>;
  team?: TeamMember[];
}

const defaultHeroSlides: HeroSlide[] = [
  {
    id: 1,
    eyebrow: "HADP-04: Strengthening Market Intelligence in UT of Jammu and Kashmir",
    show_hadp_logo: true,
    title: "AI-Powered Price Forecasting & Decision Intelligence",
    subtitle: "Forecasting daily wholesale Mandi prices for Apple and Cherry with Deep Learning LSTM models to guide harvesting, storage, and market dispatch.",
    btn_primary_text: "Explore Live Forecasts",
    btn_primary_link: "/forecasts",
    btn_secondary_text: "View EWS Reports",
    btn_secondary_link: "/ews",
    bg_image: "https://images.unsplash.com/photo-1592982537447-6f2a6a0c7c18?auto=format&fit=crop&w=2000&q=80"
  },
  {
    id: 2,
    eyebrow: "HADP-04: Market Stability & Early Warning Systems",
    show_hadp_logo: true,
    title: "Early Warning Systems & Price Volatility Risk Radar",
    subtitle: "Monitoring market volatility parameters, supply chain shocks, and abnormal price movements across regional and national trading corridors.",
    btn_primary_text: "View EWS Reports",
    btn_primary_link: "/ews",
    btn_secondary_text: "Market Stability Report",
    btn_secondary_link: "https://micskuast.in/reports/cherry_stability_20260212_1244/MIC_Cherry_Stability_Report_Text_IFRAME.html",
    bg_image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=2000&q=80"
  },
  {
    id: 3,
    eyebrow: "HADP-04: Digital Agricultural Trade Infrastructure",
    show_hadp_logo: true,
    title: "Live APMC Mandi Arrival Logs & Real-Time Sync",
    subtitle: "Tracking daily arrivals, transaction volume, grade-wise realizations, and interstate commodity trade across 15+ wholesale terminal markets.",
    btn_primary_text: "Explore APMC Markets",
    btn_primary_link: "/markets",
    btn_secondary_text: "Price Realizations",
    btn_secondary_link: "/forecasts",
    bg_image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=2000&q=80"
  },
  {
    id: 4,
    eyebrow: "HADP-04: Research, Policy & Scientific Impact",
    show_hadp_logo: true,
    title: "Horticulture Intelligence Bulletins & Policy Reports",
    subtitle: "Access peer-reviewed SKUAST research publications, HADP project bulletins, and actionable market intelligence outlooks.",
    btn_primary_text: "Browse Publications",
    btn_primary_link: "/publications",
    btn_secondary_text: "Our Research Team",
    btn_secondary_link: "/team",
    bg_image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=2000&q=80"
  }
];

const defaultLabels: Record<string, string> = {
  header_brand_name: 'MIC SKUAST-K',
  header_brand_sub: 'Market Intelligence Cell',
  nav_home: 'Home',
  nav_apmcs: 'APMCs',
  nav_ews: 'EWS Reports',
  nav_publications: 'Publications',
  nav_team: 'Our Team',
  nav_market_intel: 'Market Intelligence',
  forecast_tab_realtime: 'Real-Time Forecasts',
  forecast_tab_tool: 'Smart Forecasting Tool',
  forecast_tab_mandi: 'Live Mandi Data',
  forecast_tab_ledger: 'Orchard Ledger (Stats)',
  pub_tab_all: 'All Publications',
  pub_tab_outlooks: 'Commodity Outlooks',
  pub_tab_reports: 'Market Intelligence Reports',
  pub_tab_papers: 'Research Papers',
  pub_tab_books: 'Books',
  pub_tab_chapters: 'Book Chapters',
  pub_tab_policy: 'Policy Reports',
  footer_logo_text: 'MARKET INTELLIGENCE CELL',
  footer_desc_text: 'Sher-e-Kashmir University of Agricultural Sciences and Technology of Kashmir (SKUAST-K). Providing real-time price reports and forecasting models.',
  footer_address: 'Shalimar, Srinagar, Jammu & Kashmir, 190025',
  footer_email: 'info@micskuast.in',
  footer_title_nav: 'Navigation',
  footer_nav_home: 'Home',
  footer_nav_apmcs: 'APMC Market Analysis',
  footer_nav_outlooks: 'Commodity Outlooks',
  footer_nav_intel: 'Market Intelligence',
  footer_nav_team: 'Our Team',
  footer_title_apmcs: 'APMC Markets',
  footer_apmc_pulwama: 'Pulwama (Prichoo/Pachaar)',
  footer_apmc_shopian: 'Shopian Market',
  footer_apmc_ganderbal: 'Ganderbal Market',
  footer_apmc_narwal: 'Narwal (Jammu)',
  footer_title_research: 'Research & Data',
  footer_research_pub: 'Publications Directory',
  footer_research_bulletin: 'Weekly Bulletins',
  footer_research_hadp: 'HADP Projects',
  footer_copyright: '© 2026 Market Intelligence Cell (MIC), SKUAST-K. All rights reserved.',
  footer_hosting: 'Backend Content Management hosted securely via WordPress on Hostinger.',
  
  // Home Page - Infographic Section Headers
  home_infographic_badge: 'Core Architecture',
  home_infographic_title: 'How Agri-Intelligence Empowers Decisions',
  home_infographic_desc: 'Integrating deep learning networks and statistical anomaly alarms to transform raw agricultural transactions into actionable forecasts.',

  // Home Page - Hero Navigation Cards
  home_hero_card1_pulse: 'Active',
  home_hero_card1_title: 'AI Forecast Engine',
  home_hero_card1_desc: 'Query deep-learning LSTM models to forecast daily wholesale Mandi prices for cherry and apple.',
  home_hero_card1_tag: 'LSTM Recurrent Model',
  home_hero_card1_metric: '94.6% Accuracy',

  home_hero_card2_pulse: 'Live Alerts',
  home_hero_card2_title: 'Early Warning System',
  home_hero_card2_desc: 'Real-time price anomaly models tracking market volatility parameters and seasonal shocks.',
  home_hero_card2_tag: 'Anomalies Detected',
  home_hero_card2_metric: 'Narwal Jammu Cherry',

  home_hero_card3_pulse: '5 Terminals',
  home_hero_card3_title: 'APMC Mandi Logs',
  home_hero_card3_desc: 'Track daily arrivals, transaction volume, demand-supply indices, and weather trends in wholesale markets.',
  home_hero_card3_tag: 'Markets Synced',
  home_hero_card3_metric: 'Real-Time Sync',

  home_hero_card4_pulse: 'PDF Bulletins',
  home_hero_card4_title: 'Horticulture Digest',
  home_hero_card4_desc: 'Browse SKUAST weekly bulletins, policy textbooks, and scientific research publications.',
  home_hero_card4_tag: 'Weekly Reports',
  home_hero_card4_metric: 'Synced from WP',

  // Home Page - Infographic Tech-Cards
  home_info_card1_badge: 'Data Ingestion',
  home_info_card1_title: 'Mandi Log Pipeline',
  home_info_card1_desc: 'Extracting wholesale arrivals, transaction volumes, and daily price sheets dynamically from national APMC databases.',
  home_info_card1_footer_lbl: 'Streamer',
  home_info_card1_footer_metric: 'Real-Time Data',

  home_info_card2_badge: 'Neural Networks',
  home_info_card2_title: 'AI Price Forecasting',
  home_info_card2_desc: 'Processing historical time-series with Recurrent Neural Networks (RNN) to forecast daily wholesale cherry and apple prices.',
  home_info_card2_footer_lbl: 'AI Predictive Core',
  home_info_card2_footer_metric: '94.6% Accuracy',

  home_info_card3_badge: 'Alerts Core',
  home_info_card3_title: 'Early Warning System',
  home_info_card3_desc: 'Running automated variance and standard deviation monitors flagging volume anomalies and warning of sudden price shocks.',
  home_info_card3_footer_lbl: 'Statistical Alarms',
  home_info_card3_footer_metric: 'Variance Matrix',

  home_info_card4_badge: 'Decision Support',
  home_info_card4_title: 'HADP Strategic Outreach',
  home_info_card4_desc: 'Structuring regional Outlook Reports and strategic indices to support J&K horticulture farmers and policy planners.',
  home_info_card4_footer_lbl: 'HADP Project 04',
  home_info_card4_footer_metric: 'Actionable Intel',

  // Home Page - Floating Stats Strip
  home_stat1_val: '15+',
  home_stat1_lbl: 'APMC Mandis',
  home_stat2_val: '19 Years',
  home_stat2_lbl: 'Price Series',
  home_stat3_val: 'Real-Time',
  home_stat3_lbl: 'Feeds Synced',

  // About Page - Hero & KPIs
  about_hero_badge_text: 'HADP #04: Strengthening Agricultural Marketing in UT of Jammu and Kashmir',
  about_hero_title_v2: "Empowering J&K's Horticulture Economy Through Market Intelligence",
  about_hero_subtitle_v2: "The Market Intelligence Cell (MIC) at SKUAST-Kashmir is the digital nerve center dedicated to transforming agricultural marketing in Jammu and Kashmir. Powered by deep-learning LSTM neural networks, real-time APMC mandi telemetry, and price anomaly early warning radars, we deliver transparent, actionable foresight to fruit growers, FPOs, traders, and agricultural policy makers.",
  about_kpi1_val: '19+',
  about_kpi1_lbl: 'Years Price Series Data',
  about_kpi2_val: '15+',
  about_kpi2_lbl: 'APMC Mandis Synchronized',
  about_kpi3_val: '94.6%',
  about_kpi3_lbl: 'LSTM Predictive Accuracy',
  about_kpi4_val: '6+',
  about_kpi4_lbl: 'Commercial Crop Varieties',
  about_kpi5_val: '100%',
  about_kpi5_lbl: 'Open Access for Growers',

  // About Page - Mission & Genesis
  about_mission_badge: 'The Genesis & Mission',
  about_mission_heading: 'Why Was the Market Intelligence Cell Established?',
  about_mission_p1: "Jammu & Kashmir produces over 70% of India's total apple output and the vast majority of its commercial cherry harvest. Despite this agricultural abundance, smallholder orchardists and fruit growers have historically faced severe structural challenges: extreme seasonal price volatility, information asymmetry between rural orchards and urban terminal markets, geographic bottlenecks along the Jammu–Srinagar highway, and distress sales during peak harvest gluts.",
  about_mission_p2: "To eliminate these systemic vulnerabilities, the Government of Jammu & Kashmir instituted Project HADP-04: 'Strengthening Agricultural Marketing in UT of Jammu and Kashmir' under the landmark Holistic Agriculture Development Programme.",
  about_mission_p3: "Under this mandate, SKUAST-Kashmir established the Market Intelligence Cell (MIC) — a specialized research and computational unit tasked with replacing speculation with empirical science, giving every farmer the foresight needed to sell at optimal times and the right markets.",

  // About Page - Official Mandate Card (The Card from User Screenshot)
  about_mandate_title: 'HADP #04: Strengthening Agricultural Marketing in UT of Jammu and Kashmir',
  about_mandate_sub: 'Government of Jammu & Kashmir',
  about_mandate_item1: 'Real-time price & arrival tracking across regional & national Mandis',
  about_mandate_item2: 'Deep-learning price forecasts for Apple & Cherry varieties',
  about_mandate_item3: 'Early Warning System (EWS) to detect market volatility and price crashes',
  about_mandate_item4: 'Post-harvest CA storage & logistics decision support for orchardists',
  about_mandate_item5: 'Weekly policy briefs & scientific market intelligence bulletins',

  // About Page - 6 Capability Pillars
  about_pillars_section_badge: 'Platform Capabilities',
  about_pillars_section_title: 'What This Website Is All About',
  about_pillars_section_desc: 'Comprehensive digital tools purpose-built to transform raw agricultural data into commercial value for the farming community.',
  about_pillar1_title: 'AI Price Forecasting Engine',
  about_pillar1_desc: 'Utilizes state-of-the-art Long Short-Term Memory (LSTM) recurrent neural network architectures trained on 19 years of daily wholesale transactions. Generates 7-day, 15-day, and 30-day ahead modal, minimum, and maximum price projections across apple and cherry varieties.',
  about_pillar1_metric: '94.6% Historical Precision',
  about_pillar1_btn: 'Explore Forecasts →',

  about_pillar2_title: 'Early Warning System (EWS)',
  about_pillar2_desc: 'Automated statistical anomaly detection monitors standard deviations and rolling volatility indices. Identifies sudden supply gluts, highway transportation shocks, and demand anomalies to sound timely alerts before catastrophic price drops occur.',
  about_pillar2_metric: 'Real-Time Volatility Radar',
  about_pillar2_btn: 'View Active Alerts →',

  about_pillar3_title: 'Live APMC Mandi Telemetry',
  about_pillar3_desc: 'Continuous data ingestion and daily transaction logs from key production mandis — Parimpora (Srinagar), Aglar (Shopian), Nowpora (Sopore), Zazna (Ganderbal), and Narwal (Jammu) — alongside major consuming hubs like Azadpur Delhi, Bangalore, and Mumbai.',
  about_pillar3_metric: '15+ Wholesale Terminals',
  about_pillar3_btn: 'Browse Mandis →',

  about_pillar4_title: 'Storage & Harvest Timing',
  about_pillar4_desc: 'Empirical cost-benefit models comparing immediate harvest-season selling against Controlled Atmosphere (CA) cold storage holding costs, helping orchardists make evidence-based storage and dispatch timing decisions to capture premium off-season rates.',
  about_pillar4_metric: 'Value Realization Models',
  about_pillar4_btn: 'Storage Analysis →',

  about_pillar5_title: 'Publications & Policy Bulletins',
  about_pillar5_desc: 'Weekly market outlook bulletins, comprehensive annual crop price compendiums, and peer-reviewed research papers produced by SKUAST-Kashmir agricultural economists, offering strategic insights for planners and researchers.',
  about_pillar5_metric: 'Peer-Reviewed Repository',
  about_pillar5_btn: 'Read Bulletins →',

  about_pillar6_title: 'Transparent Price Discovery',
  about_pillar6_desc: 'Leveling the playing field by dismantling information monopolies. Real-time access to actual market realizations ensures small and marginal farmers have equal bargaining leverage when negotiating with commission agents and buyers.',
  about_pillar6_metric: 'Direct Farmer Empowerment',
  about_pillar6_btn: '100% Free Access',

  // About Page - Scientific Pipeline
  about_pipeline_section_badge: 'Scientific Architecture',
  about_pipeline_section_title: 'How Raw Mandi Data Becomes Actionable Intelligence',
  about_pipeline_section_desc: 'An automated, rigorous 4-stage pipeline translating wholesale market volatility into clear, trustworthy decision support.',
  about_step1_title: 'Mandi Ingestion',
  about_step1_desc: 'Daily automated extraction of modal prices, arrivals (quintals/boxes), and quality grades from APMC records, AGMARKNET, and direct market logs.',
  about_step2_title: 'Neural Modeling',
  about_step2_desc: 'Normalizing data series and applying Deep Learning Recurrent Neural Networks (LSTM) trained on 19 years of seasonal supply dynamics.',
  about_step3_title: 'Econometric Review',
  about_step3_desc: 'Validation by agricultural economists at SKUAST-Kashmir, cross-verifying anomaly signals with highway conditions and harvest schedules.',
  about_step4_title: 'Open Dissemination',
  about_step4_desc: 'Instant delivery via interactive web dashboards, SMS advisories, weekly PDF bulletins, and FPO briefing notes to guide real-world selling.',

  // About Page - Stakeholders
  about_stakeholders_section_badge: 'Impact & Stakeholders',
  about_stakeholders_section_title: 'Who Benefits from This Platform?',
  about_stakeholders_section_desc: 'Tailored value creation across the entire agricultural value chain in Jammu and Kashmir.',
  about_stakeholder1_badge: 'Growers',
  about_stakeholder1_title: 'Fruit Growers & Orchardists',
  about_stakeholder1_desc: 'Access accurate 7 to 30-day price predictions to schedule harvest dates, compare terminal market rates before shipping, and eliminate distress sales during peak season.',
  about_stakeholder2_badge: 'Cooperatives',
  about_stakeholder2_title: 'FPOs & Producer Groups',
  about_stakeholder2_desc: 'Aggregate member produce effectively, negotiate equitable terms with institutional buyers, and plan collective utilization of CA cold-chain storage facilities.',
  about_stakeholder3_badge: 'Trade',
  about_stakeholder3_title: 'Traders & Commission Agents',
  about_stakeholder3_desc: 'Monitor transparent arrival volumes and inter-state price spreads to optimize procurement logistics, manage inventory, and minimize price shock exposures.',
  about_stakeholder4_badge: 'Policy',
  about_stakeholder4_title: 'Government & Planners',
  about_stakeholder4_desc: 'Empirical baseline data for timely Market Intervention Scheme (MIS) triggers, post-harvest infrastructure investment, and regional agricultural policy design.',

  // About Page - Leadership
  about_vc_badge_text: 'Leadership Vision',
  about_vc_title_v2: 'A Scientific Foundation for Agri-Decision Science',
  about_vc_quote_v2: "In our pursuit of transforming agricultural landscapes through scientific excellence, the SKUAST-K Market Intelligence Cell stands as a pioneering beacon. By translating complex data paradigms into actionable market forecasts, we are equipping Jammu & Kashmir's farming community with the resources needed to navigate volatile marketing dynamics, safeguard their hard-earned yields, and capture the true economic value of their produce.",
  about_vc_name_text: 'Prof. Nazir Ahmad Ganai',
  about_vc_title_text: "Hon'ble Vice Chancellor, SKUAST-Kashmir",
  about_vc_role_text: 'Patron & Visionary Leader, HADP Project-04',

  // About Page - CTAs
  about_cta_deck_title: 'Explore the Market Intelligence Platform',
  about_cta_deck_desc: 'Access our real-time forecasting tools, wholesale terminal arrivals, and research compendiums.',
  about_cta1_btn: 'AI Price Forecasts',
  about_cta2_btn: 'Early Warning Alerts',
  about_cta3_btn: 'Live APMC Mandis',
  about_cta4_btn: 'Research Bulletins',
  about_cta5_btn: 'Meet Research Team'
};

const defaultTeam: TeamMember[] = [
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

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const applyFormatting = (tagOpen: string, tagClose: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;

    const selectedText = text.substring(start, end);
    const replacement = tagOpen + selectedText + tagClose;

    const newValue = text.substring(0, start) + replacement + text.substring(end);
    setPubDescription(newValue);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + tagOpen.length, start + tagOpen.length + selectedText.length);
    }, 0);
  };
  
  const [activeTab, setActiveTab] = useState<'home' | 'slides' | 'about' | 'labels' | 'publications' | 'security' | 'team'>('home');
  const [config, setConfig] = useState<SiteConfig | null>(null);
  
  const [editingLabelKey, setEditingLabelKey] = useState<string | null>(null);
  const [editingLabelVal, setEditingLabelVal] = useState('');
  
  // Status messages
  const [saveStatus, setSaveStatus] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [uploadStatus, setUploadStatus] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  
  // Hero slide states
  const [slideEditId, setSlideEditId] = useState<number | null>(null);
  const [slideEyebrow, setSlideEyebrow] = useState('HADP-04: Strengthening Market Intelligence in UT of Jammu and Kashmir');
  const [slideShowHadpLogo, setSlideShowHadpLogo] = useState(true);
  const [slideTitle, setSlideTitle] = useState('');
  const [slideSubtitle, setSlideSubtitle] = useState('');
  const [slideBtnPrimaryText, setSlideBtnPrimaryText] = useState('Explore Live Forecasts');
  const [slideBtnPrimaryLink, setSlideBtnPrimaryLink] = useState('/forecasts');
  const [slideBtnSecondaryText, setSlideBtnSecondaryText] = useState('View EWS Reports');
  const [slideBtnSecondaryLink, setSlideBtnSecondaryLink] = useState('/ews');
  const [slideBgImage, setSlideBgImage] = useState('');
  const [uploadedSlideBgUrl, setUploadedSlideBgUrl] = useState('');
  const [slideUploadStatus, setSlideUploadStatus] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // Add/Edit publication states
  const [pubEditId, setPubEditId] = useState<number | null>(null);
  const [pubTitle, setPubTitle] = useState('');
  const [pubCategory, setPubCategory] = useState<string>('Commodity Outlooks');
  const [pubAuthor, setPubAuthor] = useState('');
  const [pubDescription, setPubDescription] = useState('');
  const [pubYear, setPubYear] = useState('');
  const [pubUrl, setPubUrl] = useState('');
  const [uploadedFileUrl, setUploadedFileUrl] = useState('');
  
  // Add/Edit team member states
  const [teamEditIdx, setTeamEditIdx] = useState<number | null>(null);
  const [memberName, setMemberName] = useState('');
  const [memberRole, setMemberRole] = useState('Principal Investigator');
  const [memberAffiliation, setMemberAffiliation] = useState('');
  const [memberLinkedin, setMemberLinkedin] = useState('https://www.linkedin.com/');
  const [memberCategory, setMemberCategory] = useState<'pi' | 'yp'>('pi');
  const [memberImage, setMemberImage] = useState('');
  const [uploadedPhotoUrl, setUploadedPhotoUrl] = useState('');
  const [photoUploadStatus, setPhotoUploadStatus] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  
  // New Password states
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const sanitizeConfigData = (data: any): SiteConfig => {
    if (!data) return data;
    if (!data.labels) {
      data.labels = { ...defaultLabels };
    } else {
      data.labels = { ...defaultLabels, ...data.labels };
    }
    if (!data.team) {
      data.team = [ ...defaultTeam ];
    }
    if (!data.hero_slides || data.hero_slides.length === 0) {
      data.hero_slides = [ ...defaultHeroSlides ];
    }
    return data as SiteConfig;
  };

  // Fetch settings on load
  useEffect(() => {
    const authenticated = sessionStorage.getItem('admin_authenticated') === 'true';
    if (authenticated) {
      setIsAuthenticated(true);
      const savedPass = sessionStorage.getItem('admin_password') || '';
      setPassword(savedPass);
    }

    fetch('/api/config.php')
      .then(res => res.json())
      .then(data => {
        if (data && data.hero_title) {
          setConfig(sanitizeConfigData(data));
        }
      })
      .catch(err => {
        console.error("Failed to load settings:", err);
      });
  }, []);

  // Handle Login Authentication
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    
    fetch('/api/config.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password, action: 'verify' })
    })
    .then(async res => {
      let data: any = {};
      try {
        data = await res.json();
      } catch {
        throw new Error('Server returned an invalid response. Please ensure public_html/api/config.php is uploaded to Hostinger.');
      }

      if (res.ok) {
        sessionStorage.setItem('admin_authenticated', 'true');
        sessionStorage.setItem('admin_password', password);
        setIsAuthenticated(true);
        window.dispatchEvent(new Event('config-updated'));
        // Load secure data
        fetch('/api/config.php')
          .then(r => r.json())
          .then(d => setConfig(sanitizeConfigData(d)))
          .catch(e => console.error("Failed to fetch fresh config:", e));
      } else {
        setAuthError(data.error || 'Authentication failed. Please verify your password.');
      }
    })
    .catch((err) => {
      setAuthError(err.message || 'Connection error to server API');
    });
  };

  // Save Config to Server
  const saveConfig = (updatedConfig: SiteConfig) => {
    setSaveStatus(null);
    
    // Base64 encode config to bypass WAF ModSecurity rules for HTML tags
    let base64Config = '';
    try {
      const configString = JSON.stringify(updatedConfig);
      base64Config = btoa(unescape(encodeURIComponent(configString)));
    } catch (err) {
      console.error("Base64 encoding failed", err);
      setSaveStatus({ type: 'error', text: 'Local payload compilation error' });
      return;
    }

    fetch('/api/config.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password, config: base64Config })
    })
    .then(async res => {
      let data;
      try {
        data = await res.json();
      } catch (err) {
        throw new Error(`Server error: Received non-JSON response (HTTP ${res.status})`);
      }
      if (res.ok) {
        setConfig(updatedConfig);
        setSaveStatus({ type: 'success', text: 'Settings saved successfully!' });
      } else {
        setSaveStatus({ type: 'error', text: data.error || 'Failed to save settings' });
      }
    })
    .catch((err) => {
      setSaveStatus({ type: 'error', text: err.message || 'Server connection error' });
    });
  };

  // Form submit for Home page settings
  const handleHomeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!config) return;
    saveConfig(config);
  };

  // Add/Update publications
  const handlePubSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!config) return;

    let updatedPubs = [...config.publications];
    const finalUrl = uploadedFileUrl || pubUrl || '#';

    if (pubEditId !== null) {
      // Edit mode
      updatedPubs = updatedPubs.map(p => p.id === pubEditId ? {
        ...p,
        title: pubTitle,
        category: pubCategory,
        author: pubAuthor,
        description: pubDescription,
        year: pubYear,
        url: finalUrl
      } : p);
    } else {
      // Add mode
      const nextId = updatedPubs.length > 0 ? Math.max(...updatedPubs.map(p => p.id)) + 1 : 1;
      const newPub: PublicationItem = {
        id: nextId,
        title: pubTitle,
        category: pubCategory,
        author: pubAuthor,
        description: pubDescription,
        year: pubYear,
        url: finalUrl
      };
      updatedPubs.push(newPub);
    }

    const updatedConfig = { ...config, publications: updatedPubs };
    saveConfig(updatedConfig);
    clearPubForm();
  };

  // Delete Publication
  const handlePubDelete = (id: number) => {
    if (!config) return;
    if (!window.confirm("Are you sure you want to delete this publication?")) return;

    const updatedPubs = config.publications.filter(p => p.id !== id);
    const updatedConfig = { ...config, publications: updatedPubs };
    saveConfig(updatedConfig);
  };

  // Prepare edit publication form
  const handlePubEdit = (item: PublicationItem) => {
    setPubEditId(item.id);
    setPubTitle(item.title);
    setPubCategory(item.category);
    setPubAuthor(item.author);
    setPubDescription(item.description);
    setPubYear(item.year);
    setPubUrl(item.url.startsWith('/api/') ? '' : item.url);
    setUploadedFileUrl(item.url.startsWith('/api/') ? item.url : '');
  };

  const clearPubForm = () => {
    setPubEditId(null);
    setPubTitle('');
    setPubCategory('Report');
    setPubAuthor('');
    setPubDescription('');
    setPubYear('');
    setPubUrl('');
    setUploadedFileUrl('');
    setUploadStatus(null);
  };

  // Handle PDF Upload to Hostinger API
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;

    const file = fileList[0];
    const formData = new FormData();
    formData.append('password', password);
    formData.append('action', 'upload_file');
    formData.append('file', file);

    setUploadStatus(null);
    fetch('/api/config.php', {
      method: 'POST',
      body: formData
    })
    .then(async res => {
      const data = await res.json();
      if (res.ok) {
        setUploadedFileUrl(data.url);
        setPubUrl('');
        setUploadStatus({ type: 'success', text: `Uploaded successfully: ${file.name}` });
      } else {
        setUploadStatus({ type: 'error', text: data.error || 'Upload failed' });
      }
    })
    .catch(() => {
      setUploadStatus({ type: 'error', text: 'Connection error during upload' });
    });
  };

  // Add/Update team members
  const handleTeamSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!config) return;

    let updatedTeam = config.team ? [...config.team] : [...defaultTeam];
    const finalPhoto = uploadedPhotoUrl || memberImage || '/team/default.png';

    const newMember: TeamMember = {
      name: memberName,
      role: memberRole,
      affiliation: memberAffiliation,
      linkedin: memberLinkedin,
      category: memberCategory,
      image: finalPhoto
    };

    if (teamEditIdx !== null) {
      // Edit mode
      updatedTeam = updatedTeam.map((m, idx) => idx === teamEditIdx ? newMember : m);
    } else {
      // Add mode
      updatedTeam.push(newMember);
    }

    const updatedConfig = { ...config, team: updatedTeam };
    saveConfig(updatedConfig);
    clearTeamForm();
  };

  // Delete Team Member
  const handleTeamDelete = (idx: number) => {
    if (!config) return;
    if (!window.confirm("Are you sure you want to delete this team member?")) return;

    const currentTeam = config.team || [...defaultTeam];
    const updatedTeam = currentTeam.filter((_, i) => i !== idx);
    const updatedConfig = { ...config, team: updatedTeam };
    saveConfig(updatedConfig);
  };

  // Prepare edit form
  const handleTeamEdit = (item: TeamMember, idx: number) => {
    setTeamEditIdx(idx);
    setMemberName(item.name);
    setMemberRole(item.role);
    setMemberAffiliation(item.affiliation);
    setMemberLinkedin(item.linkedin);
    setMemberCategory(item.category);
    setMemberImage(item.image.startsWith('/api/') ? '' : item.image);
    setUploadedPhotoUrl(item.image.startsWith('/api/') ? item.image : '');
  };

  const clearTeamForm = () => {
    setTeamEditIdx(null);
    setMemberName('');
    setMemberRole('Principal Investigator');
    setMemberAffiliation('');
    setMemberLinkedin('https://www.linkedin.com/');
    setMemberCategory('pi');
    setMemberImage('');
    setUploadedPhotoUrl('');
    setPhotoUploadStatus(null);
  };

  // Handle Portrait Photo Upload to Hostinger API
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;

    const file = fileList[0];
    const formData = new FormData();
    formData.append('password', password);
    formData.append('action', 'upload_file');
    formData.append('file', file);

    setPhotoUploadStatus(null);
    fetch('/api/config.php', {
      method: 'POST',
      body: formData
    })
    .then(async res => {
      const data = await res.json();
      if (res.ok) {
        setUploadedPhotoUrl(data.url);
        setMemberImage('');
        setPhotoUploadStatus({ type: 'success', text: `Uploaded successfully: ${file.name}` });
      } else {
        setPhotoUploadStatus({ type: 'error', text: data.error || 'Upload failed' });
      }
    })
    .catch(() => {
      setPhotoUploadStatus({ type: 'error', text: 'Connection error during upload' });
    });
  };

  // Move Team Member Up / Down
  const moveTeamMember = (index: number, direction: 'up' | 'down') => {
    if (!config) return;
    const currentTeam = config.team ? [...config.team] : [...defaultTeam];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;

    if (swapIndex < 0 || swapIndex >= currentTeam.length) return;

    // Swap items
    const temp = currentTeam[index];
    currentTeam[index] = currentTeam[swapIndex];
    currentTeam[swapIndex] = temp;

    const updatedConfig = { ...config, team: currentTeam };
    saveConfig(updatedConfig);
  };

  // Handle Slide Background Upload
  const handleSlideBgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;

    const file = fileList[0];
    const formData = new FormData();
    formData.append('password', password);
    formData.append('action', 'upload_file');
    formData.append('file', file);

    setSlideUploadStatus(null);
    fetch('/api/config.php', {
      method: 'POST',
      body: formData
    })
    .then(async res => {
      const data = await res.json();
      if (res.ok) {
        setUploadedSlideBgUrl(data.url);
        setSlideBgImage('');
        setSlideUploadStatus({ type: 'success', text: `Uploaded successfully: ${file.name}` });
      } else {
        setSlideUploadStatus({ type: 'error', text: data.error || 'Upload failed' });
      }
    })
    .catch(() => {
      setSlideUploadStatus({ type: 'error', text: 'Connection error during upload' });
    });
  };

  const handleSaveSlide = (e: React.FormEvent) => {
    e.preventDefault();
    if (!config) return;
    const currentSlides = config.hero_slides ? [...config.hero_slides] : [...defaultHeroSlides];
    const finalBg = uploadedSlideBgUrl || slideBgImage || "https://images.unsplash.com/photo-1592982537447-6f2a6a0c7c18?auto=format&fit=crop&w=2000&q=80";

    if (slideEditId !== null) {
      const updated = currentSlides.map(s => s.id === slideEditId ? {
        ...s,
        eyebrow: slideEyebrow,
        show_hadp_logo: slideShowHadpLogo,
        title: slideTitle,
        subtitle: slideSubtitle,
        btn_primary_text: slideBtnPrimaryText,
        btn_primary_link: slideBtnPrimaryLink,
        btn_secondary_text: slideBtnSecondaryText,
        btn_secondary_link: slideBtnSecondaryLink,
        bg_image: finalBg
      } : s);
      const updatedConfig = { ...config, hero_slides: updated };
      saveConfig(updatedConfig);
    } else {
      const newSlide: HeroSlide = {
        id: Date.now(),
        eyebrow: slideEyebrow,
        show_hadp_logo: slideShowHadpLogo,
        title: slideTitle,
        subtitle: slideSubtitle,
        btn_primary_text: slideBtnPrimaryText,
        btn_primary_link: slideBtnPrimaryLink,
        btn_secondary_text: slideBtnSecondaryText,
        btn_secondary_link: slideBtnSecondaryLink,
        bg_image: finalBg
      };
      const updatedConfig = { ...config, hero_slides: [...currentSlides, newSlide] };
      saveConfig(updatedConfig);
    }

    setSlideEditId(null);
    setSlideEyebrow('HADP-04: Strengthening Market Intelligence in UT of Jammu and Kashmir');
    setSlideShowHadpLogo(true);
    setSlideTitle('');
    setSlideSubtitle('');
    setSlideBtnPrimaryText('Explore Live Forecasts');
    setSlideBtnPrimaryLink('/forecasts');
    setSlideBtnSecondaryText('View EWS Reports');
    setSlideBtnSecondaryLink('/ews');
    setSlideBgImage('');
    setUploadedSlideBgUrl('');
    setSlideUploadStatus(null);
  };

  const handleEditSlide = (slide: HeroSlide) => {
    setSlideEditId(slide.id);
    setSlideEyebrow(slide.eyebrow);
    setSlideShowHadpLogo(slide.show_hadp_logo !== false);
    setSlideTitle(slide.title);
    setSlideSubtitle(slide.subtitle);
    setSlideBtnPrimaryText(slide.btn_primary_text || 'Explore Live Forecasts');
    setSlideBtnPrimaryLink(slide.btn_primary_link || '/forecasts');
    setSlideBtnSecondaryText(slide.btn_secondary_text || 'View EWS Reports');
    setSlideBtnSecondaryLink(slide.btn_secondary_link || '/ews');
    setSlideBgImage(slide.bg_image);
    setUploadedSlideBgUrl('');
    setSlideUploadStatus(null);
    window.scrollTo({ top: 350, behavior: 'smooth' });
  };

  const handleDeleteSlide = (id: number) => {
    if (!config || !window.confirm("Are you sure you want to delete this carousel slide?")) return;
    const currentSlides = config.hero_slides ? [...config.hero_slides] : [...defaultHeroSlides];
    if (currentSlides.length <= 1) {
      alert("At least one slide must remain in the hero carousel.");
      return;
    }
    const updated = currentSlides.filter(s => s.id !== id);
    const updatedConfig = { ...config, hero_slides: updated };
    saveConfig(updatedConfig);
  };

  const moveSlide = (index: number, direction: 'up' | 'down') => {
    if (!config) return;
    const currentSlides = config.hero_slides ? [...config.hero_slides] : [...defaultHeroSlides];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= currentSlides.length) return;

    const temp = currentSlides[index];
    currentSlides[index] = currentSlides[swapIndex];
    currentSlides[swapIndex] = temp;

    const updatedConfig = { ...config, hero_slides: currentSlides };
    saveConfig(updatedConfig);
  };

  // Change Admin Password
  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setSaveStatus({ type: 'error', text: 'New passwords do not match!' });
      return;
    }

    setSaveStatus(null);
    fetch('/api/config.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        password, 
        action: 'change_password', 
        new_password: newPassword 
      })
    })
    .then(async res => {
      let data;
      try {
        data = await res.json();
      } catch (err) {
        throw new Error(`Server error: Received non-JSON response (HTTP ${res.status})`);
      }
      if (res.ok) {
        setPassword(newPassword);
        setNewPassword('');
        setConfirmPassword('');
        setSaveStatus({ type: 'success', text: 'Admin password changed successfully!' });
      } else {
        setSaveStatus({ type: 'error', text: data.error || 'Failed to change password' });
      }
    })
    .catch((err) => {
      setSaveStatus({ type: 'error', text: err.message || 'Server connection error' });
    });
  };

  // Update specific config text values helper
  const updateConfigValue = (key: string, value: string) => {
    if (!config) return;
    setConfig({ ...config, [key]: value });
  };

  // Update specific announcement values helper
  const updateAnnouncementValue = (key: string, value: string) => {
    if (!config) return;
    setConfig({
      ...config,
      announcement: {
        ...config.announcement,
        [key]: value
      }
    });
  };

  // Handle Ticker items list change
  const handleTickerChange = (index: number, val: string) => {
    if (!config) return;
    const newItems = [...config.ticker_items];
    newItems[index] = val;
    setConfig({ ...config, ticker_items: newItems });
  };

  const addTickerItem = () => {
    if (!config) return;
    setConfig({ ...config, ticker_items: [...config.ticker_items, ''] });
  };

  const removeTickerItem = (index: number) => {
    if (!config) return;
    const newItems = config.ticker_items.filter((_, idx) => idx !== index);
    setConfig({ ...config, ticker_items: newItems });
  };

  if (!isAuthenticated) {
    return (
      <div style={{ maxWidth: '420px', margin: '6rem auto', padding: '2.5rem', background: '#fff', borderRadius: '16px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-md)' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{ width: '48px', height: '48px', background: 'var(--color-primary-pale)', color: 'var(--color-primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
            <Shield size={24} />
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--color-primary)' }}>MIC Site Admin</h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
            Access is restricted to authorized cells. Please enter your administrator key.
          </p>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '0.35rem' }}>
              Admin Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter password..."
                className="form-input"
                style={{ width: '100%', paddingLeft: '2.25rem' }}
              />
              <Key size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
            </div>
          </div>

          {authError && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#c62828', background: '#ffebee', padding: '8px 12px', borderRadius: '6px' }}>
              <AlertTriangle size={16} />
              <span>{authError}</span>
            </div>
          )}

          <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', fontWeight: 700 }}>
            Sign In
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="container section-padding animate-fade-in" style={{ maxWidth: '1100px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-border)', paddingBottom: '1.5rem', marginBottom: '2.5rem' }}>
        <div>
          <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.8rem', fontWeight: 900, color: 'var(--color-primary)' }}>
            <Shield style={{ color: 'var(--color-accent)' }} /> Website Administrator Dashboard
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem' }}>
            Modify homepage taglines, update live ticker news, or upload reports directly to the Hostinger server.
          </p>
        </div>
        <button 
          onClick={() => {
            sessionStorage.removeItem('admin_authenticated');
            sessionStorage.removeItem('admin_password');
            setIsAuthenticated(false);
            setPassword('');
            setSaveStatus(null);
            window.dispatchEvent(new Event('config-updated'));
          }} 
          className="btn" 
          style={{ fontSize: '0.8rem', padding: '6px 12px', borderColor: 'var(--color-border)' }}
        >
          Logout
        </button>
      </div>

      {saveStatus && (
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.75rem', 
          padding: '1rem', 
          borderRadius: '8px', 
          marginBottom: '2rem', 
          fontWeight: 600,
          fontSize: '0.9rem',
          background: saveStatus.type === 'success' ? '#f0fdf4' : '#fef2f2',
          border: `1px solid ${saveStatus.type === 'success' ? '#bbf7d0' : '#fecaca'}`,
          color: saveStatus.type === 'success' ? '#15803d' : '#991b1b'
        }}>
          {saveStatus.type === 'success' ? <CheckCircle size={20} /> : <AlertTriangle size={20} />}
          <span>{saveStatus.text}</span>
        </div>
      )}

      {/* Tabs Menu */}
      <div className="market-tabs" style={{ marginBottom: '2rem' }}>
        <button
          onClick={() => setActiveTab('home')}
          className={`market-tab-btn ${activeTab === 'home' ? 'active' : ''}`}
        >
          ⚙️ Homepage Settings
        </button>
        <button
          onClick={() => setActiveTab('slides')}
          className={`market-tab-btn ${activeTab === 'slides' ? 'active' : ''}`}
        >
          🎠 Hero Carousel Slides
        </button>
        <button
          onClick={() => setActiveTab('about')}
          className={`market-tab-btn ${activeTab === 'about' ? 'active' : ''}`}
        >
          🏛️ About Us Page Content
        </button>
        <button
          onClick={() => setActiveTab('publications')}
          className={`market-tab-btn ${activeTab === 'publications' ? 'active' : ''}`}
        >
          📚 Publications & Documents
        </button>
        <button
          onClick={() => setActiveTab('labels')}
          className={`market-tab-btn ${activeTab === 'labels' ? 'active' : ''}`}
        >
          🏷️ Header & Page Labels
        </button>
        <button
          onClick={() => setActiveTab('team')}
          className={`market-tab-btn ${activeTab === 'team' ? 'active' : ''}`}
        >
          👥 Manage Team Members
        </button>
        <button
          onClick={() => setActiveTab('security')}
          className={`market-tab-btn ${activeTab === 'security' ? 'active' : ''}`}
        >
          🔒 Security & Password
        </button>
      </div>

      {/* TAB 1: Homepage Settings */}
      {activeTab === 'home' && config && (
        <form onSubmit={handleHomeSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Hero Section */}
          <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
            <h3 style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem', marginBottom: '1.25rem', color: 'var(--color-primary)' }}>
              Hero Section Copy
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.25rem' }}>Hero Main Title</label>
                <input
                  type="text"
                  value={config.hero_title}
                  onChange={e => updateConfigValue('hero_title', e.target.value)}
                  className="form-input"
                  style={{ width: '100%' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.25rem' }}>Hero Tagline (Subtitle)</label>
                <textarea
                  value={config.hero_subtitle}
                  onChange={e => updateConfigValue('hero_subtitle', e.target.value)}
                  className="form-input"
                  rows={2}
                  style={{ width: '100%', resize: 'vertical' }}
                />
              </div>
            </div>
          </div>

          {/* Announcement Bar */}
          <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
            <h3 style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem', marginBottom: '1.25rem', color: 'var(--color-primary)' }}>
              Highlight Announcement Card
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.25rem' }}>Release Tag (e.g. New Release)</label>
                <input
                  type="text"
                  value={config.announcement.tag}
                  onChange={e => updateAnnouncementValue('tag', e.target.value)}
                  className="form-input"
                  style={{ width: '100%' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.25rem' }}>Data Metric (e.g. Stability Index: 92.4%)</label>
                <input
                  type="text"
                  value={config.announcement.stability}
                  onChange={e => updateAnnouncementValue('stability', e.target.value)}
                  className="form-input"
                  style={{ width: '100%' }}
                />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.25rem' }}>Message Details</label>
                <input
                  type="text"
                  value={config.announcement.message}
                  onChange={e => updateAnnouncementValue('message', e.target.value)}
                  className="form-input"
                  style={{ width: '100%' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.25rem' }}>Report Link (Redirect URL)</label>
                <input
                  type="text"
                  value={config.announcement.link}
                  onChange={e => updateAnnouncementValue('link', e.target.value)}
                  className="form-input"
                  style={{ width: '100%' }}
                />
              </div>
            </div>
          </div>

          {/* Marquee Ticker */}
          <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem', marginBottom: '1.25rem' }}>
              <h3 style={{ margin: 0, color: 'var(--color-primary)' }}>Live Scrolling News Ticker</h3>
              <button type="button" onClick={addTickerItem} className="btn" style={{ fontSize: '0.75rem', padding: '4px 10px' }}>
                <Plus size={14} /> Add Update Feed
              </button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {config.ticker_items.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-text-muted)', minWidth: '24px' }}>#{idx+1}</span>
                  <input
                    type="text"
                    required
                    value={item}
                    onChange={e => handleTickerChange(idx, e.target.value)}
                    className="form-input"
                    style={{ flex: 1 }}
                  />
                  <button 
                    type="button" 
                    onClick={() => removeTickerItem(idx)}
                    style={{ color: '#c62828', background: 'transparent', border: 'none', padding: '4px', cursor: 'pointer' }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Floating Key Statistics Strip */}
          <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
            <h3 style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem', marginBottom: '1.25rem', color: 'var(--color-primary)' }}>
              📊 Homepage Floating Key Statistics Strip
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '-0.5rem', marginBottom: '1.25rem' }}>
              Edit the three highlight metrics displayed on the floating card beneath the core architecture grid.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
              {/* Stat 1 */}
              <div style={{ padding: '1rem', background: 'var(--color-bg)', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-primary)', display: 'block', marginBottom: '0.5rem' }}>
                  Stat #1 (Mandis)
                </span>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.2rem' }}>Value</label>
                <input
                  type="text"
                  value={config.labels?.home_stat1_val ?? defaultLabels.home_stat1_val}
                  onChange={e => {
                    const updated = { ...(config.labels || defaultLabels), home_stat1_val: e.target.value };
                    setConfig({ ...config, labels: updated });
                  }}
                  className="form-input"
                  style={{ width: '100%', marginBottom: '0.5rem', fontWeight: 700 }}
                />
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.2rem' }}>Label</label>
                <input
                  type="text"
                  value={config.labels?.home_stat1_lbl ?? defaultLabels.home_stat1_lbl}
                  onChange={e => {
                    const updated = { ...(config.labels || defaultLabels), home_stat1_lbl: e.target.value };
                    setConfig({ ...config, labels: updated });
                  }}
                  className="form-input"
                  style={{ width: '100%' }}
                />
              </div>

              {/* Stat 2 */}
              <div style={{ padding: '1rem', background: 'var(--color-bg)', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#d97706', display: 'block', marginBottom: '0.5rem' }}>
                  Stat #2 (Price Series)
                </span>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.2rem' }}>Value</label>
                <input
                  type="text"
                  value={config.labels?.home_stat2_val ?? defaultLabels.home_stat2_val}
                  onChange={e => {
                    const updated = { ...(config.labels || defaultLabels), home_stat2_val: e.target.value };
                    setConfig({ ...config, labels: updated });
                  }}
                  className="form-input"
                  style={{ width: '100%', marginBottom: '0.5rem', fontWeight: 700 }}
                />
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.2rem' }}>Label</label>
                <input
                  type="text"
                  value={config.labels?.home_stat2_lbl ?? defaultLabels.home_stat2_lbl}
                  onChange={e => {
                    const updated = { ...(config.labels || defaultLabels), home_stat2_lbl: e.target.value };
                    setConfig({ ...config, labels: updated });
                  }}
                  className="form-input"
                  style={{ width: '100%' }}
                />
              </div>

              {/* Stat 3 */}
              <div style={{ padding: '1rem', background: 'var(--color-bg)', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-accent)', display: 'block', marginBottom: '0.5rem' }}>
                  Stat #3 (Sync Feeds)
                </span>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.2rem' }}>Value</label>
                <input
                  type="text"
                  value={config.labels?.home_stat3_val ?? defaultLabels.home_stat3_val}
                  onChange={e => {
                    const updated = { ...(config.labels || defaultLabels), home_stat3_val: e.target.value };
                    setConfig({ ...config, labels: updated });
                  }}
                  className="form-input"
                  style={{ width: '100%', marginBottom: '0.5rem', fontWeight: 700 }}
                />
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.2rem' }}>Label</label>
                <input
                  type="text"
                  value={config.labels?.home_stat3_lbl ?? defaultLabels.home_stat3_lbl}
                  onChange={e => {
                    const updated = { ...(config.labels || defaultLabels), home_stat3_lbl: e.target.value };
                    setConfig({ ...config, labels: updated });
                  }}
                  className="form-input"
                  style={{ width: '100%' }}
                />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" className="btn btn-primary" style={{ fontWeight: 700, gap: '0.35rem' }}>
              <Save size={16} /> Save Homepage Settings
            </button>
          </div>
        </form>
      )}

      {/* TAB: Hero Carousel Slides Manager */}
      {activeTab === 'slides' && config && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '2rem' }}>
          {/* Left Column: Form Editor */}
          <div style={{ background: '#fff', padding: '2.25rem', borderRadius: '12px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', height: 'fit-content' }}>
            <h3 style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem', marginBottom: '1.25rem', color: 'var(--color-primary)' }}>
              {slideEditId !== null ? '✏️ Edit Carousel Slide' : '➕ Add New Carousel Slide'}
            </h3>

            <form onSubmit={handleSaveSlide} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                  Eyebrow Badge Text
                </label>
                <input
                  type="text"
                  required
                  value={slideEyebrow}
                  onChange={e => setSlideEyebrow(e.target.value)}
                  placeholder="e.g. HADP-04: Strengthening Market Intelligence in UT of Jammu and Kashmir"
                  className="form-input"
                  style={{ width: '100%' }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input
                  type="checkbox"
                  id="slideShowHadpLogo"
                  checked={slideShowHadpLogo}
                  onChange={e => setSlideShowHadpLogo(e.target.checked)}
                  style={{ width: '16px', height: '16px', accentColor: 'var(--color-primary)' }}
                />
                <label htmlFor="slideShowHadpLogo" style={{ fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}>
                  Display Official HADP Logo in Eyebrow
                </label>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                  Slide Headline / Title
                </label>
                <textarea
                  required
                  rows={2}
                  value={slideTitle}
                  onChange={e => setSlideTitle(e.target.value)}
                  placeholder="e.g. AI-Powered Price Forecasting & Decision Intelligence"
                  className="form-input"
                  style={{ width: '100%', resize: 'vertical' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                  Slide Subtitle / Description
                </label>
                <textarea
                  required
                  rows={3}
                  value={slideSubtitle}
                  onChange={e => setSlideSubtitle(e.target.value)}
                  placeholder="Detailed description of what this feature or data system does..."
                  className="form-input"
                  style={{ width: '100%', resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                    Primary Button Text
                  </label>
                  <input
                    type="text"
                    required
                    value={slideBtnPrimaryText}
                    onChange={e => setSlideBtnPrimaryText(e.target.value)}
                    placeholder="Explore Live Forecasts"
                    className="form-input"
                    style={{ width: '100%' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                    Primary Button Link
                  </label>
                  <input
                    type="text"
                    required
                    value={slideBtnPrimaryLink}
                    onChange={e => setSlideBtnPrimaryLink(e.target.value)}
                    placeholder="/forecasts"
                    className="form-input"
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                    Secondary Button Text (Optional)
                  </label>
                  <input
                    type="text"
                    value={slideBtnSecondaryText}
                    onChange={e => setSlideBtnSecondaryText(e.target.value)}
                    placeholder="View EWS Reports"
                    className="form-input"
                    style={{ width: '100%' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                    Secondary Button Link (Optional)
                  </label>
                  <input
                    type="text"
                    value={slideBtnSecondaryLink}
                    onChange={e => setSlideBtnSecondaryLink(e.target.value)}
                    placeholder="/ews"
                    className="form-input"
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

              {/* Background Image Upload / Direct URL */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                  Background Image
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <input
                    type="text"
                    value={uploadedSlideBgUrl || slideBgImage}
                    onChange={e => {
                      setSlideBgImage(e.target.value);
                      setUploadedSlideBgUrl('');
                    }}
                    placeholder="Paste Image URL (e.g. Unsplash or server path)..."
                    className="form-input"
                    style={{ width: '100%' }}
                  />

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <label className="btn" style={{ fontSize: '0.75rem', padding: '6px 12px', cursor: 'pointer', background: 'var(--color-surface)', border: '1px solid var(--color-border)', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Upload size={14} /> Upload Custom Background
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleSlideBgUpload} 
                        style={{ display: 'none' }} 
                      />
                    </label>
                    {uploadedSlideBgUrl && (
                      <span style={{ fontSize: '0.75rem', color: '#15803d', fontWeight: 600 }}>
                        ✓ Custom photo uploaded
                      </span>
                    )}
                  </div>

                  {slideUploadStatus && (
                    <div style={{ fontSize: '0.75rem', color: slideUploadStatus.type === 'success' ? '#15803d' : '#b91c1c' }}>
                      {slideUploadStatus.text}
                    </div>
                  )}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center', fontWeight: 700 }}>
                  <Save size={16} /> {slideEditId !== null ? 'Update Slide' : 'Add Slide to Carousel'}
                </button>
                {slideEditId !== null && (
                  <button
                    type="button"
                    onClick={() => {
                      setSlideEditId(null);
                      setSlideEyebrow('HADP-04: Strengthening Market Intelligence in UT of Jammu and Kashmir');
                      setSlideShowHadpLogo(true);
                      setSlideTitle('');
                      setSlideSubtitle('');
                      setSlideBtnPrimaryText('Explore Live Forecasts');
                      setSlideBtnPrimaryLink('/forecasts');
                      setSlideBtnSecondaryText('View EWS Reports');
                      setSlideBtnSecondaryLink('/ews');
                      setSlideBgImage('');
                      setUploadedSlideBgUrl('');
                      setSlideUploadStatus(null);
                    }}
                    className="btn"
                    style={{ background: '#f3f4f6', color: '#374151' }}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Right Column: Slide List & Live Previews */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, color: 'var(--color-primary)' }}>
                Active Carousel Slides ({config.hero_slides ? config.hero_slides.length : defaultHeroSlides.length})
              </h3>
            </div>

            {(config.hero_slides || defaultHeroSlides).map((slide, idx) => (
              <div 
                key={slide.id || idx}
                style={{
                  background: '#fff',
                  borderRadius: '12px',
                  border: slideEditId === slide.id ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                  boxShadow: 'var(--shadow-sm)',
                  overflow: 'hidden',
                  transition: 'all 0.2s ease'
                }}
              >
                {/* Slide Preview Header */}
                <div style={{
                  position: 'relative',
                  height: '110px',
                  backgroundImage: `linear-gradient(135deg, rgba(6, 28, 16, 0.85), rgba(10, 42, 24, 0.75)), url('${slide.bg_image}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  padding: '1rem',
                  color: '#fff',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.72rem', background: 'rgba(16, 185, 129, 0.25)', border: '1px solid rgba(16, 185, 129, 0.4)', padding: '2px 8px', borderRadius: '20px', color: '#86efac', fontWeight: 700 }}>
                      Slide #{idx + 1}
                    </span>
                    <div style={{ display: 'flex', gap: '0.25rem' }}>
                      <button
                        type="button"
                        title="Move Slide Up"
                        onClick={() => moveSlide(idx, 'up')}
                        disabled={idx === 0}
                        style={{ background: 'rgba(0,0,0,0.5)', color: '#fff', border: 'none', borderRadius: '4px', padding: '4px 6px', cursor: idx === 0 ? 'not-allowed' : 'pointer', opacity: idx === 0 ? 0.4 : 1 }}
                      >
                        <ArrowUp size={14} />
                      </button>
                      <button
                        type="button"
                        title="Move Slide Down"
                        onClick={() => moveSlide(idx, 'down')}
                        disabled={idx === (config.hero_slides || defaultHeroSlides).length - 1}
                        style={{ background: 'rgba(0,0,0,0.5)', color: '#fff', border: 'none', borderRadius: '4px', padding: '4px 6px', cursor: idx === (config.hero_slides || defaultHeroSlides).length - 1 ? 'not-allowed' : 'pointer', opacity: idx === (config.hero_slides || defaultHeroSlides).length - 1 ? 0.4 : 1 }}
                      >
                        <ArrowDown size={14} />
                      </button>
                    </div>
                  </div>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {slide.title}
                  </div>
                </div>

                {/* Slide Details */}
                <div style={{ padding: '1.25rem' }}>
                  <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', margin: '0 0 1rem 0', lineHeight: 1.5 }}>
                    {slide.subtitle}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem', fontSize: '0.75rem' }}>
                    <span style={{ background: '#f0fdf4', color: '#15803d', padding: '3px 8px', borderRadius: '4px', border: '1px solid #bbf7d0', fontWeight: 600 }}>
                      Primary: {slide.btn_primary_text} ({slide.btn_primary_link})
                    </span>
                    {slide.btn_secondary_text && (
                      <span style={{ background: '#f3f4f6', color: '#374151', padding: '3px 8px', borderRadius: '4px', border: '1px solid #e5e7eb', fontWeight: 600 }}>
                        Secondary: {slide.btn_secondary_text} ({slide.btn_secondary_link})
                      </span>
                    )}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', borderTop: '1px solid var(--color-border)', paddingTop: '0.75rem' }}>
                    <button
                      type="button"
                      onClick={() => handleEditSlide(slide)}
                      className="btn"
                      style={{ fontSize: '0.75rem', padding: '4px 10px', gap: '0.25rem' }}
                    >
                      <Edit size={13} /> Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteSlide(slide.id)}
                      className="btn"
                      style={{ fontSize: '0.75rem', padding: '4px 10px', color: '#c62828', borderColor: '#ffcdd2', gap: '0.25rem' }}
                    >
                      <Trash2 size={13} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: About Us Page Editor */}
      {activeTab === 'about' && config && (
        <form onSubmit={(e) => { e.preventDefault(); saveConfig(config); }} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Top Bar with Title and Save Button */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', padding: '1.25rem 1.75rem', borderRadius: '12px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.35rem', color: 'var(--color-primary)', fontWeight: 800 }}>
                🏛️ About Us Page Content & Cards Editor
              </h2>
              <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                Customize every card, mandate deliverable, metric, and narrative section on the About Us page.
              </p>
            </div>
            <button 
              type="submit" 
              className="btn btn-primary"
              style={{ fontWeight: 700, gap: '0.5rem', padding: '8px 20px', fontSize: '0.9rem' }}
            >
              <Save size={16} /> Save About Page Changes
            </button>
          </div>

          {/* 1. Official Mandate Card (The Card from User Screenshot) */}
          <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px', border: '2px solid rgba(22, 163, 74, 0.3)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '1.4rem' }}>📋</span>
              <div>
                <h3 style={{ margin: 0, color: 'var(--color-primary)', fontSize: '1.15rem' }}>
                  Official HADP Project #04 Mandate Card
                </h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                  This is the prominent card featuring the SKUAST-K & HADP logos with the 5 deliverables checklist.
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                  Mandate Card Header Title
                </label>
                <input
                  type="text"
                  value={config.labels?.about_mandate_title ?? defaultLabels.about_mandate_title}
                  onChange={e => {
                    const updated = { ...(config.labels || defaultLabels), about_mandate_title: e.target.value };
                    setConfig({ ...config, labels: updated });
                  }}
                  className="form-input"
                  style={{ width: '100%', fontWeight: 700 }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                  Mandate Subtitle (e.g. Government of Jammu & Kashmir)
                </label>
                <input
                  type="text"
                  value={config.labels?.about_mandate_sub ?? defaultLabels.about_mandate_sub}
                  onChange={e => {
                    const updated = { ...(config.labels || defaultLabels), about_mandate_sub: e.target.value };
                    setConfig({ ...config, labels: updated });
                  }}
                  className="form-input"
                  style={{ width: '100%' }}
                />
              </div>

              <div style={{ marginTop: '0.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, color: 'var(--color-primary)', marginBottom: '0.75rem' }}>
                  Checklist Deliverables (5 Items):
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {[1, 2, 3, 4, 5].map((idx) => {
                    const key = `about_mandate_item${idx}`;
                    return (
                      <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-primary)', width: '24px' }}>
                          #{idx}
                        </span>
                        <input
                          type="text"
                          value={config.labels?.[key] ?? defaultLabels[key]}
                          onChange={e => {
                            const updated = { ...(config.labels || defaultLabels), [key]: e.target.value };
                            setConfig({ ...config, labels: updated });
                          }}
                          className="form-input"
                          style={{ flex: 1 }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* 2. Hero Section & KPI Metrics */}
          <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
            <h3 style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem', marginBottom: '1.25rem', color: 'var(--color-primary)' }}>
              ✨ About Page Hero Header & KPI Metrics Deck
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                  Hero Eyebrow Pill Badge Text
                </label>
                <input
                  type="text"
                  value={config.labels?.about_hero_badge_text ?? defaultLabels.about_hero_badge_text}
                  onChange={e => {
                    const updated = { ...(config.labels || defaultLabels), about_hero_badge_text: e.target.value };
                    setConfig({ ...config, labels: updated });
                  }}
                  className="form-input"
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                  Hero Main Heading
                </label>
                <input
                  type="text"
                  value={config.labels?.about_hero_title_v2 ?? defaultLabels.about_hero_title_v2}
                  onChange={e => {
                    const updated = { ...(config.labels || defaultLabels), about_hero_title_v2: e.target.value };
                    setConfig({ ...config, labels: updated });
                  }}
                  className="form-input"
                  style={{ width: '100%', fontWeight: 700 }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                  Hero Subtitle Paragraph
                </label>
                <textarea
                  value={config.labels?.about_hero_subtitle_v2 ?? defaultLabels.about_hero_subtitle_v2}
                  onChange={e => {
                    const updated = { ...(config.labels || defaultLabels), about_hero_subtitle_v2: e.target.value };
                    setConfig({ ...config, labels: updated });
                  }}
                  className="form-input"
                  rows={3}
                  style={{ width: '100%', resize: 'vertical' }}
                />
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, color: 'var(--color-primary)', marginBottom: '0.75rem' }}>
                Key Performance Indicators (5 KPI Metrics):
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                {[1, 2, 3, 4, 5].map((idx) => {
                  const valKey = `about_kpi${idx}_val`;
                  const lblKey = `about_kpi${idx}_lbl`;
                  return (
                    <div key={idx} style={{ padding: '0.75rem', background: 'var(--color-bg)', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '0.25rem' }}>
                        KPI #{idx} Value
                      </label>
                      <input
                        type="text"
                        value={config.labels?.[valKey] ?? defaultLabels[valKey]}
                        onChange={e => {
                          const updated = { ...(config.labels || defaultLabels), [valKey]: e.target.value };
                          setConfig({ ...config, labels: updated });
                        }}
                        className="form-input"
                        style={{ width: '100%', marginBottom: '0.5rem', fontWeight: 700 }}
                      />
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>
                        KPI #{idx} Label
                      </label>
                      <input
                        type="text"
                        value={config.labels?.[lblKey] ?? defaultLabels[lblKey]}
                        onChange={e => {
                          const updated = { ...(config.labels || defaultLabels), [lblKey]: e.target.value };
                          setConfig({ ...config, labels: updated });
                        }}
                        className="form-input"
                        style={{ width: '100%', fontSize: '0.8rem' }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 3. Genesis & Mission Narrative Card */}
          <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
            <h3 style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem', marginBottom: '1.25rem', color: 'var(--color-primary)' }}>
              📖 The Genesis & Institutional Mission Narrative
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                    Eyebrow Sub-Badge
                  </label>
                  <input
                    type="text"
                    value={config.labels?.about_mission_badge ?? defaultLabels.about_mission_badge}
                    onChange={e => {
                      const updated = { ...(config.labels || defaultLabels), about_mission_badge: e.target.value };
                      setConfig({ ...config, labels: updated });
                    }}
                    className="form-input"
                    style={{ width: '100%' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                    Section Heading
                  </label>
                  <input
                    type="text"
                    value={config.labels?.about_mission_heading ?? defaultLabels.about_mission_heading}
                    onChange={e => {
                      const updated = { ...(config.labels || defaultLabels), about_mission_heading: e.target.value };
                      setConfig({ ...config, labels: updated });
                    }}
                    className="form-input"
                    style={{ width: '100%', fontWeight: 700 }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                  Paragraph 1 (The Context & Challenges)
                </label>
                <textarea
                  value={config.labels?.about_mission_p1 ?? defaultLabels.about_mission_p1}
                  onChange={e => {
                    const updated = { ...(config.labels || defaultLabels), about_mission_p1: e.target.value };
                    setConfig({ ...config, labels: updated });
                  }}
                  className="form-input"
                  rows={3}
                  style={{ width: '100%', resize: 'vertical' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                  Paragraph 2 (HADP Project #04 Mandate)
                </label>
                <textarea
                  value={config.labels?.about_mission_p2 ?? defaultLabels.about_mission_p2}
                  onChange={e => {
                    const updated = { ...(config.labels || defaultLabels), about_mission_p2: e.target.value };
                    setConfig({ ...config, labels: updated });
                  }}
                  className="form-input"
                  rows={2}
                  style={{ width: '100%', resize: 'vertical' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                  Paragraph 3 (MIC Role & Vision)
                </label>
                <textarea
                  value={config.labels?.about_mission_p3 ?? defaultLabels.about_mission_p3}
                  onChange={e => {
                    const updated = { ...(config.labels || defaultLabels), about_mission_p3: e.target.value };
                    setConfig({ ...config, labels: updated });
                  }}
                  className="form-input"
                  rows={2}
                  style={{ width: '100%', resize: 'vertical' }}
                />
              </div>
            </div>
          </div>

          {/* 4. The 6 Capability Pillars */}
          <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
            <h3 style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem', marginBottom: '1.25rem', color: 'var(--color-primary)' }}>
              💡 What This Website Is All About (6 Core Capability Pillars)
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
              {[1, 2, 3, 4, 5, 6].map((num) => {
                const titleKey = `about_pillar${num}_title`;
                const descKey = `about_pillar${num}_desc`;
                const metricKey = `about_pillar${num}_metric`;
                const btnKey = `about_pillar${num}_btn`;
                return (
                  <div key={num} style={{ padding: '1.25rem', background: 'var(--color-bg)', borderRadius: '10px', border: '1px solid var(--color-border)' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-primary)', textTransform: 'uppercase' }}>
                      Card #{num}
                    </span>
                    <div style={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.25rem' }}>Card Title</label>
                        <input
                          type="text"
                          value={config.labels?.[titleKey] ?? defaultLabels[titleKey]}
                          onChange={e => {
                            const updated = { ...(config.labels || defaultLabels), [titleKey]: e.target.value };
                            setConfig({ ...config, labels: updated });
                          }}
                          className="form-input"
                          style={{ width: '100%', fontWeight: 700 }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.25rem' }}>Description</label>
                        <textarea
                          value={config.labels?.[descKey] ?? defaultLabels[descKey]}
                          onChange={e => {
                            const updated = { ...(config.labels || defaultLabels), [descKey]: e.target.value };
                            setConfig({ ...config, labels: updated });
                          }}
                          className="form-input"
                          rows={3}
                          style={{ width: '100%', resize: 'vertical' }}
                        />
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.25rem' }}>Footer Metric</label>
                          <input
                            type="text"
                            value={config.labels?.[metricKey] ?? defaultLabels[metricKey]}
                            onChange={e => {
                              const updated = { ...(config.labels || defaultLabels), [metricKey]: e.target.value };
                              setConfig({ ...config, labels: updated });
                            }}
                            className="form-input"
                            style={{ width: '100%', fontSize: '0.8rem' }}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.25rem' }}>Action Link Text</label>
                          <input
                            type="text"
                            value={config.labels?.[btnKey] ?? defaultLabels[btnKey]}
                            onChange={e => {
                              const updated = { ...(config.labels || defaultLabels), [btnKey]: e.target.value };
                              setConfig({ ...config, labels: updated });
                            }}
                            className="form-input"
                            style={{ width: '100%', fontSize: '0.8rem' }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 5. 4-Stage Scientific Pipeline */}
          <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
            <h3 style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem', marginBottom: '1.25rem', color: 'var(--color-primary)' }}>
              🔬 The 4-Stage Scientific Pipeline (Data to Decisions)
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
              {[1, 2, 3, 4].map((step) => {
                const titleKey = `about_step${step}_title`;
                const descKey = `about_step${step}_desc`;
                return (
                  <div key={step} style={{ padding: '1rem', background: 'var(--color-bg)', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                      Stage 0{step}
                    </span>
                    <div style={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <input
                        type="text"
                        value={config.labels?.[titleKey] ?? defaultLabels[titleKey]}
                        onChange={e => {
                          const updated = { ...(config.labels || defaultLabels), [titleKey]: e.target.value };
                          setConfig({ ...config, labels: updated });
                        }}
                        className="form-input"
                        style={{ width: '100%', fontWeight: 700 }}
                      />
                      <textarea
                        value={config.labels?.[descKey] ?? defaultLabels[descKey]}
                        onChange={e => {
                          const updated = { ...(config.labels || defaultLabels), [descKey]: e.target.value };
                          setConfig({ ...config, labels: updated });
                        }}
                        className="form-input"
                        rows={3}
                        style={{ width: '100%', resize: 'vertical', fontSize: '0.82rem' }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 6. Stakeholder Impact Cards */}
          <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
            <h3 style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem', marginBottom: '1.25rem', color: 'var(--color-primary)' }}>
              🤝 Stakeholder Impact Matrix (Who Benefits?)
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
              {[1, 2, 3, 4].map((st) => {
                const badgeKey = `about_stakeholder${st}_badge`;
                const titleKey = `about_stakeholder${st}_title`;
                const descKey = `about_stakeholder${st}_desc`;
                return (
                  <div key={st} style={{ padding: '1rem', background: 'var(--color-bg)', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <input
                        type="text"
                        value={config.labels?.[badgeKey] ?? defaultLabels[badgeKey]}
                        onChange={e => {
                          const updated = { ...(config.labels || defaultLabels), [badgeKey]: e.target.value };
                          setConfig({ ...config, labels: updated });
                        }}
                        className="form-input"
                        placeholder="Badge"
                        style={{ width: '90px', fontSize: '0.75rem', fontWeight: 800 }}
                      />
                      <input
                        type="text"
                        value={config.labels?.[titleKey] ?? defaultLabels[titleKey]}
                        onChange={e => {
                          const updated = { ...(config.labels || defaultLabels), [titleKey]: e.target.value };
                          setConfig({ ...config, labels: updated });
                        }}
                        className="form-input"
                        placeholder="Title"
                        style={{ flex: 1, fontWeight: 700 }}
                      />
                    </div>
                    <textarea
                      value={config.labels?.[descKey] ?? defaultLabels[descKey]}
                      onChange={e => {
                        const updated = { ...(config.labels || defaultLabels), [descKey]: e.target.value };
                        setConfig({ ...config, labels: updated });
                      }}
                      className="form-input"
                      rows={3}
                      style={{ width: '100%', resize: 'vertical', fontSize: '0.82rem' }}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* 7. Vice Chancellor Leadership Card */}
          <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
            <h3 style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem', marginBottom: '1.25rem', color: 'var(--color-primary)' }}>
              🎓 Vice Chancellor Leadership Vision Card
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.25rem' }}>Sub-Badge</label>
                  <input
                    type="text"
                    value={config.labels?.about_vc_badge_text ?? defaultLabels.about_vc_badge_text}
                    onChange={e => {
                      const updated = { ...(config.labels || defaultLabels), about_vc_badge_text: e.target.value };
                      setConfig({ ...config, labels: updated });
                    }}
                    className="form-input"
                    style={{ width: '100%' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.25rem' }}>Section Title</label>
                  <input
                    type="text"
                    value={config.labels?.about_vc_title_v2 ?? defaultLabels.about_vc_title_v2}
                    onChange={e => {
                      const updated = { ...(config.labels || defaultLabels), about_vc_title_v2: e.target.value };
                      setConfig({ ...config, labels: updated });
                    }}
                    className="form-input"
                    style={{ width: '100%', fontWeight: 700 }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.25rem' }}>Quote Content</label>
                <textarea
                  value={config.labels?.about_vc_quote_v2 ?? defaultLabels.about_vc_quote_v2}
                  onChange={e => {
                    const updated = { ...(config.labels || defaultLabels), about_vc_quote_v2: e.target.value };
                    setConfig({ ...config, labels: updated });
                  }}
                  className="form-input"
                  rows={3}
                  style={{ width: '100%', resize: 'vertical', fontStyle: 'italic' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.25rem' }}>Leader Name</label>
                  <input
                    type="text"
                    value={config.labels?.about_vc_name_text ?? defaultLabels.about_vc_name_text}
                    onChange={e => {
                      const updated = { ...(config.labels || defaultLabels), about_vc_name_text: e.target.value };
                      setConfig({ ...config, labels: updated });
                    }}
                    className="form-input"
                    style={{ width: '100%', fontWeight: 700 }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.25rem' }}>Designation / Title</label>
                  <input
                    type="text"
                    value={config.labels?.about_vc_title_text ?? defaultLabels.about_vc_title_text}
                    onChange={e => {
                      const updated = { ...(config.labels || defaultLabels), about_vc_title_text: e.target.value };
                      setConfig({ ...config, labels: updated });
                    }}
                    className="form-input"
                    style={{ width: '100%' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.25rem' }}>Role Subtitle</label>
                  <input
                    type="text"
                    value={config.labels?.about_vc_role_text ?? defaultLabels.about_vc_role_text}
                    onChange={e => {
                      const updated = { ...(config.labels || defaultLabels), about_vc_role_text: e.target.value };
                      setConfig({ ...config, labels: updated });
                    }}
                    className="form-input"
                    style={{ width: '100%' }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Save Button */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '1rem 0' }}>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ fontWeight: 700, gap: '0.5rem', padding: '10px 28px', fontSize: '0.95rem' }}
            >
              <Save size={18} /> Save All About Page Changes
            </button>
          </div>

        </form>
      )}

      {/* TAB 2: Publications Manager */}
      {activeTab === 'publications' && config && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '2rem' }}>
          {/* Left Column: Form Editor */}
          <div style={{ background: '#fff', padding: '2.25rem', borderRadius: '12px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', height: 'fit-content' }}>
            <h3 style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem', marginBottom: '1.25rem', color: 'var(--color-primary)' }}>
              {pubEditId !== null ? '✏️ Edit Publication' : '➕ Add Publication Document'}
            </h3>
            
            <form onSubmit={handlePubSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.25rem' }}>Title</label>
                <input
                  type="text"
                  required
                  value={pubTitle}
                  onChange={e => setPubTitle(e.target.value)}
                  placeholder="e.g. Weekly Market Bulletin..."
                  className="form-input"
                  style={{ width: '100%' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.25rem' }}>Category</label>
                  <select
                    value={pubCategory}
                    onChange={e => setPubCategory(e.target.value)}
                    className="form-input"
                    style={{ width: '100%', height: '38px' }}
                  >
                    <option value="Commodity Outlooks">Commodity Outlooks</option>
                    <option value="Market Intelligence Reports">Market Intelligence Reports</option>
                    <option value="Research Papers">Research Papers</option>
                    <option value="Books">Books</option>
                    <option value="Book Chapters">Book Chapters</option>
                    <option value="Policy Reports">Policy Reports</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.25rem' }}>Year</label>
                  <input
                    type="text"
                    required
                    value={pubYear}
                    onChange={e => setPubYear(e.target.value)}
                    placeholder="e.g. 2026"
                    className="form-input"
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.25rem' }}>Author / Compiler</label>
                <input
                  type="text"
                  required
                  value={pubAuthor}
                  onChange={e => setPubAuthor(e.target.value)}
                  placeholder="e.g. MIC Research Team"
                  className="form-input"
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, margin: 0 }}>Brief Description</label>
                  <div style={{ display: 'flex', gap: '0.25rem' }}>
                    <button
                      type="button"
                      onClick={() => applyFormatting('<b>', '</b>')}
                      style={{ padding: '2px 8px', fontSize: '0.7rem', fontWeight: 'bold', cursor: 'pointer', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '4px', color: 'var(--color-text-main)' }}
                      title="Bold"
                    >
                      B
                    </button>
                    <button
                      type="button"
                      onClick={() => applyFormatting('<i>', '</i>')}
                      style={{ padding: '2px 8px', fontSize: '0.7rem', fontStyle: 'italic', cursor: 'pointer', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '4px', color: 'var(--color-text-main)' }}
                      title="Italic"
                    >
                      I
                    </button>
                    <button
                      type="button"
                      onClick={() => applyFormatting('<u>', '</u>')}
                      style={{ padding: '2px 8px', fontSize: '0.7rem', textDecoration: 'underline', cursor: 'pointer', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '4px', color: 'var(--color-text-main)' }}
                      title="Underline"
                    >
                      U
                    </button>
                    <button
                      type="button"
                      onClick={() => applyFormatting('<div style="text-align: justify;">', '</div>')}
                      style={{ padding: '2px 6px', fontSize: '0.7rem', cursor: 'pointer', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '4px', color: 'var(--color-text-main)' }}
                      title="Justify text alignment"
                    >
                      Justify
                    </button>
                  </div>
                </div>
                <textarea
                  ref={textareaRef}
                  required
                  value={pubDescription}
                  onChange={e => setPubDescription(e.target.value)}
                  placeholder="Describe the findings or contents of the publication..."
                  className="form-input"
                  rows={3}
                  style={{ width: '100%', resize: 'vertical' }}
                />
              </div>

              {/* Upload Section */}
              <div style={{ background: 'var(--color-bg)', border: '1px dashed var(--color-border)', borderRadius: '8px', padding: '1rem', marginTop: '0.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '0.5rem' }}>
                  Option A: Upload File Directly to Hostinger
                </label>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <label className="btn" style={{ fontSize: '0.75rem', padding: '6px 12px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: '#fff' }}>
                    <Upload size={14} /> Choose Document
                    <input
                      type="file"
                      onChange={handleFileUpload}
                      style={{ display: 'none' }}
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.txt"
                    />
                  </label>
                  {uploadedFileUrl && (
                    <span style={{ fontSize: '0.75rem', color: '#2e7d32', fontWeight: 700, wordBreak: 'break-all' }}>
                      ✓ Document ready
                    </span>
                  )}
                </div>
                {uploadStatus && (
                  <div style={{ fontSize: '0.75rem', marginTop: '0.5rem', color: uploadStatus.type === 'success' ? '#2e7d32' : '#c62828', fontWeight: 600 }}>
                    {uploadStatus.text}
                  </div>
                )}
              </div>

              <div style={{ textAlign: 'center', margin: '0.5rem 0', fontWeight: 700, fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                — OR —
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.25rem' }}>Option B: Paste External File Link</label>
                <input
                  type="text"
                  value={pubUrl}
                  disabled={!!uploadedFileUrl}
                  onChange={e => setPubUrl(e.target.value)}
                  placeholder="e.g. Google Drive Link or external URL..."
                  className="form-input"
                  style={{ width: '100%', opacity: uploadedFileUrl ? 0.5 : 1 }}
                />
                {uploadedFileUrl && (
                  <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', display: 'block', marginTop: '0.2rem' }}>
                    * Direct file upload is active. Clear upload to paste external links.
                  </span>
                )}
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center', fontWeight: 700 }}>
                  {pubEditId !== null ? 'Update Document' : 'Publish Document'}
                </button>
                {(pubEditId !== null || uploadedFileUrl || pubTitle) && (
                  <button type="button" onClick={clearPubForm} className="btn" style={{ padding: '0.5rem 1rem' }}>
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Right Column: Existing List */}
          <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
            <h3 style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem', marginBottom: '1.25rem', color: 'var(--color-primary)' }}>
              📚 Publications List ({config.publications.length})
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '550px', overflowY: 'auto', paddingRight: '0.5rem' }}>
              {config.publications.map(item => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', padding: '1rem', background: 'var(--color-bg)', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                  <div style={{ flex: 1, paddingRight: '1rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.25rem' }}>
                      <span className="card-tag" style={{ fontSize: '0.62rem', padding: '1px 6px' }}>{item.category}</span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', fontWeight: 700 }}>{item.year}</span>
                    </div>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--color-primary)', margin: '0 0 0.25rem' }}>
                      {item.title}
                    </h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', margin: '0 0 0.5rem' }}>By {item.author}</p>
                    <span style={{ fontSize: '0.7rem', color: 'var(--color-primary-light)', wordBreak: 'break-all', fontWeight: 700 }}>
                      🔗 {item.url.length > 50 ? item.url.slice(0, 48) + '...' : item.url}
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '0.35rem' }}>
                    <button 
                      onClick={() => handlePubEdit(item)}
                      style={{ padding: '6px', color: 'var(--color-primary)', background: '#fff', border: '1px solid var(--color-border)', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                      title="Edit"
                    >
                      <Edit size={14} />
                    </button>
                    <button 
                      onClick={() => handlePubDelete(item.id)}
                      style={{ padding: '6px', color: '#c62828', background: '#fff', border: '1px solid var(--color-border)', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB: Header & Page Labels */}
      {activeTab === 'labels' && config && (
        <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
          <h3 style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem', marginBottom: '1.25rem', color: 'var(--color-primary)' }}>
            🏷️ Edit Website Labels & Names
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
            Click the edit button (pencil icon) next to any label to customize the names of headers, tabs, or navigation buttons.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {Object.keys(defaultLabels).map(key => {
              const labelDesc = {
                header_brand_name: "Header Navigation Main Brand Text (e.g. MIC SKUAST-K)",
                header_brand_sub: "Header Navigation Brand Subtitle (e.g. Market Intelligence Cell)",
                nav_home: "Navigation Link to Homepage (e.g. Home)",
                nav_apmcs: "Navigation Link to APMC logs page (e.g. APMCs)",
                nav_ews: "Navigation Link to EWS Reports page (e.g. EWS Reports)",
                nav_publications: "Navigation Link to Publications page (e.g. Publications)",
                nav_team: "Navigation Link to Team page (e.g. Our Team)",
                nav_market_intel: "Navigation Main CTA button (e.g. Market Intelligence)",
                forecast_tab_realtime: "Market Intelligence sub-page Tab 1 (e.g. Real-Time Forecasts)",
                forecast_tab_tool: "Market Intelligence sub-page Tab 2 (e.g. Smart Forecasting Tool)",
                forecast_tab_mandi: "Market Intelligence sub-page Tab 3 (e.g. Live Mandi Data)",
                forecast_tab_ledger: "Market Intelligence sub-page Tab 4 (e.g. Orchard Ledger (Stats))",
                pub_tab_all: "Publications page Filter Tab 1 (e.g. All Publications)",
                pub_tab_outlooks: "Publications page Filter Tab 2 (e.g. Commodity Outlooks)",
                pub_tab_reports: "Publications page Filter Tab 3 (e.g. Market Intelligence Reports)",
                pub_tab_papers: "Publications page Filter Tab 4 (e.g. Research Papers)",
                pub_tab_books: "Publications page Filter Tab 5 (e.g. Books)",
                pub_tab_chapters: "Publications page Filter Tab 6 (e.g. Book Chapters)",
                pub_tab_policy: "Publications page Filter Tab 7 (e.g. Policy Reports)",
                footer_logo_text: "Footer Logo Brand Heading",
                footer_desc_text: "Footer Short Description Text",
                footer_address: "Footer Office Address Info",
                footer_email: "Footer Support Email Link",
                footer_title_nav: "Footer Section 1 Title (Navigation)",
                footer_nav_home: "Footer Link Name: Home",
                footer_nav_apmcs: "Footer Link Name: APMC Analysis",
                footer_nav_outlooks: "Footer Link Name: Commodity Outlooks",
                footer_nav_intel: "Footer Link Name: Market Intelligence",
                footer_nav_team: "Footer Link Name: Our Team",
                footer_title_apmcs: "Footer Section 2 Title (APMC Markets)",
                footer_apmc_pulwama: "Footer APMC Name: Pulwama",
                footer_apmc_shopian: "Footer APMC Name: Shopian",
                footer_apmc_ganderbal: "Footer APMC Name: Ganderbal",
                footer_apmc_narwal: "Footer APMC Name: Narwal",
                footer_title_research: "Footer Section 3 Title (Research & Data)",
                footer_research_pub: "Footer Link Name: Publications Directory",
                footer_research_bulletin: "Footer Link Name: Weekly Bulletins",
                footer_research_hadp: "Footer Link Name: HADP Projects",
                footer_copyright: "Footer Bottom Copyright Line",
                footer_hosting: "Footer Bottom Web Hosting Line",
                
                // Home Page Infographic Section Header descriptions
                home_infographic_badge: "Homepage Infographic Section Badge",
                home_infographic_title: "Homepage Infographic Section Heading Title",
                home_infographic_desc: "Homepage Infographic Section Description Paragraph",

                // Homepage Hero Card descriptions
                home_hero_card1_pulse: "Hero Card 1 Pulse Label (e.g. Active)",
                home_hero_card1_title: "Hero Card 1 Title (AI Forecast Engine)",
                home_hero_card1_desc: "Hero Card 1 Description Paragraph",
                home_hero_card1_tag: "Hero Card 1 Hover Tag (e.g. LSTM Recurrent Model)",
                home_hero_card1_metric: "Hero Card 1 Hover Metric (e.g. 94.6% Accuracy)",

                home_hero_card2_pulse: "Hero Card 2 Pulse Label (e.g. Live Alerts)",
                home_hero_card2_title: "Hero Card 2 Title (Early Warning System)",
                home_hero_card2_desc: "Hero Card 2 Description Paragraph",
                home_hero_card2_tag: "Hero Card 2 Hover Tag (e.g. Anomalies Detected)",
                home_hero_card2_metric: "Hero Card 2 Hover Metric (e.g. Narwal Jammu Cherry)",

                home_hero_card3_pulse: "Hero Card 3 Pulse Label (e.g. 5 Terminals)",
                home_hero_card3_title: "Hero Card 3 Title (APMC Mandi Logs)",
                home_hero_card3_desc: "Hero Card 3 Description Paragraph",
                home_hero_card3_tag: "Hero Card 3 Hover Tag (e.g. Markets Synced)",
                home_hero_card3_metric: "Hero Card 3 Hover Metric (e.g. Real-Time Sync)",

                home_hero_card4_pulse: "Hero Card 4 Pulse Label (e.g. PDF Bulletins)",
                home_hero_card4_title: "Hero Card 4 Title (Horticulture Digest)",
                home_hero_card4_desc: "Hero Card 4 Description Paragraph",
                home_hero_card4_tag: "Hero Card 4 Hover Tag (e.g. Weekly Reports)",
                home_hero_card4_metric: "Hero Card 4 Hover Metric (e.g. Synced from WP)",

                // Homepage Infographic Card descriptions
                home_info_card1_badge: "Infographic Card 1 Sub-badge (e.g. Data Ingestion)",
                home_info_card1_title: "Infographic Card 1 Title (Mandi Log Pipeline)",
                home_info_card1_desc: "Infographic Card 1 Description Paragraph",
                home_info_card1_footer_lbl: "Infographic Card 1 Footer Label (e.g. Streamer)",
                home_info_card1_footer_metric: "Infographic Card 1 Footer Value (e.g. Real-Time Data)",

                home_info_card2_badge: "Infographic Card 2 Sub-badge (e.g. Neural Networks)",
                home_info_card2_title: "Infographic Card 2 Title (AI Price Forecasting)",
                home_info_card2_desc: "Infographic Card 2 Description Paragraph",
                home_info_card2_footer_lbl: "Infographic Card 2 Footer Label (e.g. AI Predictive Core)",
                home_info_card2_footer_metric: "Infographic Card 2 Footer Value (e.g. 94.6% Accuracy)",

                home_info_card3_badge: "Infographic Card 3 Sub-badge (e.g. Alerts Core)",
                home_info_card3_title: "Infographic Card 3 Title (Early Warning System)",
                home_info_card3_desc: "Infographic Card 3 Description Paragraph",
                home_info_card3_footer_lbl: "Infographic Card 3 Footer Label (e.g. Statistical Alarms)",
                home_info_card3_footer_metric: "Infographic Card 3 Footer Value (e.g. Variance Matrix)",

                home_info_card4_badge: "Infographic Card 4 Sub-badge (e.g. Decision Support)",
                home_info_card4_title: "Infographic Card 4 Title (HADP Strategic Outreach)",
                home_info_card4_desc: "Infographic Card 4 Description Paragraph",
                home_info_card4_footer_lbl: "Infographic Card 4 Footer Label (e.g. HADP Project 04)",
                home_info_card4_footer_metric: "Infographic Card 4 Footer Value (e.g. Actionable Intel)",

                // Homepage Stats Strip descriptions
                home_stat1_val: "Homepage Stats Strip - Stat 1 Value (e.g. 15+)",
                home_stat1_lbl: "Homepage Stats Strip - Stat 1 Label (e.g. APMC Mandis)",
                home_stat2_val: "Homepage Stats Strip - Stat 2 Value (e.g. 19 Years)",
                home_stat2_lbl: "Homepage Stats Strip - Stat 2 Label (e.g. Price Series)",
                home_stat3_val: "Homepage Stats Strip - Stat 3 Value (e.g. Real-Time)",
                home_stat3_lbl: "Homepage Stats Strip - Stat 3 Label (e.g. Feeds Synced)"
              }[key] || key;

              const currentVal = (config.labels || defaultLabels)[key] || defaultLabels[key];
              const isEditing = editingLabelKey === key;

              return (
                <div key={key} style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  padding: '1rem', 
                  background: 'var(--color-bg)', 
                  borderRadius: '8px', 
                  border: '1px solid var(--color-border)',
                  gap: '0.5rem'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                      {labelDesc}
                    </span>
                    {!isEditing && (
                      <button 
                        onClick={() => { setEditingLabelKey(key); setEditingLabelVal(currentVal); }}
                        style={{ padding: '6px', color: 'var(--color-primary)', background: '#fff', border: '1px solid var(--color-border)', borderRadius: '4px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', fontWeight: 600 }}
                      >
                        <Edit size={12} /> Edit Label
                      </button>
                    )}
                  </div>

                  {isEditing ? (
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <input
                        type="text"
                        value={editingLabelVal}
                        onChange={e => setEditingLabelVal(e.target.value)}
                        className="form-input"
                        style={{ flex: 1, padding: '6px 10px', height: '36px' }}
                      />
                      <button 
                        onClick={() => {
                          if (!config) return;
                          const updatedLabels = {
                            ...(config.labels || defaultLabels),
                            [key]: editingLabelVal
                          };
                          const updatedConfig = { ...config, labels: updatedLabels };
                          saveConfig(updatedConfig);
                          setEditingLabelKey(null);
                        }}
                        className="btn btn-primary"
                        style={{ padding: '6px 12px', height: '36px', gap: '0.25rem', fontSize: '0.75rem', fontWeight: 700 }}
                      >
                        <Save size={14} /> Save
                      </button>
                      <button 
                        onClick={() => setEditingLabelKey(null)}
                        className="btn"
                        style={{ padding: '6px 12px', height: '36px', fontSize: '0.75rem' }}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--color-text-main)', padding: '4px 0' }}>
                      {currentVal}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB: Team Manager */}
      {activeTab === 'team' && config && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '2rem' }}>
          {/* Left Column: Form Editor */}
          <div style={{ background: '#fff', padding: '2.25rem', borderRadius: '12px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', height: 'fit-content' }}>
            <h3 style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem', marginBottom: '1.25rem', color: 'var(--color-primary)' }}>
              {teamEditIdx !== null ? '✏️ Edit Team Member' : '👥 Add Team Member'}
            </h3>
            
            <form onSubmit={handleTeamSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.25rem' }}>Full Name</label>
                <input
                  type="text"
                  required
                  value={memberName}
                  onChange={e => setMemberName(e.target.value)}
                  placeholder="e.g. Prof. F. A. Shaheen"
                  className="form-input"
                  style={{ width: '100%' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.25rem' }}>Category</label>
                  <select
                    value={memberCategory}
                    onChange={e => setMemberCategory(e.target.value as 'pi' | 'yp')}
                    className="form-input"
                    style={{ width: '100%', height: '38px' }}
                  >
                    <option value="pi">Principal Investigator</option>
                    <option value="yp">Research Staff / YP</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.25rem' }}>Role/Designation</label>
                  <input
                    type="text"
                    required
                    value={memberRole}
                    onChange={e => setMemberRole(e.target.value)}
                    placeholder="e.g. Principal Investigator"
                    className="form-input"
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.25rem' }}>Affiliation / Sub-Text</label>
                <textarea
                  required
                  value={memberAffiliation}
                  onChange={e => setMemberAffiliation(e.target.value)}
                  placeholder="e.g. Professor cum Chief Scientist, IBPR..."
                  className="form-input"
                  rows={2}
                  style={{ width: '100%', resize: 'vertical' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.25rem' }}>LinkedIn Profile URL</label>
                <input
                  type="text"
                  value={memberLinkedin}
                  onChange={e => setMemberLinkedin(e.target.value)}
                  placeholder="https://www.linkedin.com/in/username"
                  className="form-input"
                  style={{ width: '100%' }}
                />
              </div>

              {/* Photo Upload Section */}
              <div style={{ background: 'var(--color-bg)', border: '1px dashed var(--color-border)', borderRadius: '8px', padding: '1rem', marginTop: '0.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '0.5rem' }}>
                  Portrait Photo Upload
                </label>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <label className="btn" style={{ fontSize: '0.75rem', padding: '6px 12px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: '#fff' }}>
                    <Upload size={14} /> Upload Portrait
                    <input
                      type="file"
                      onChange={handlePhotoUpload}
                      style={{ display: 'none' }}
                      accept=".png,.jpg,.jpeg,.gif"
                    />
                  </label>
                  {uploadedPhotoUrl && (
                    <span style={{ fontSize: '0.75rem', color: '#2e7d32', fontWeight: 700, wordBreak: 'break-all' }}>
                      ✓ Photo uploaded
                    </span>
                  )}
                </div>
                {photoUploadStatus && (
                  <div style={{ fontSize: '0.75rem', marginTop: '0.5rem', color: photoUploadStatus.type === 'success' ? '#2e7d32' : '#c62828', fontWeight: 600 }}>
                    {photoUploadStatus.text}
                  </div>
                )}
              </div>

              <div style={{ textAlign: 'center', margin: '0.25rem 0', fontWeight: 700, fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                — OR —
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.25rem' }}>Direct Image Path URL</label>
                <input
                  type="text"
                  value={memberImage}
                  disabled={!!uploadedPhotoUrl}
                  onChange={e => setMemberImage(e.target.value)}
                  placeholder="e.g. /team/name.png or external link..."
                  className="form-input"
                  style={{ width: '100%', opacity: uploadedPhotoUrl ? 0.5 : 1 }}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center', fontWeight: 700 }}>
                  {teamEditIdx !== null ? 'Update Team Member' : 'Add Team Member'}
                </button>
                {(teamEditIdx !== null || uploadedPhotoUrl || memberName) && (
                  <button type="button" onClick={clearTeamForm} className="btn" style={{ padding: '0.5rem 1rem' }}>
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Right Column: Existing Team Members List */}
          <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
            <h3 style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem', marginBottom: '1.25rem', color: 'var(--color-primary)' }}>
              👥 Team Members List ({(config.team || defaultTeam).length})
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '550px', overflowY: 'auto', paddingRight: '0.5rem' }}>
              {(config.team || defaultTeam).map((item, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '1rem', background: 'var(--color-bg)', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--color-primary-pale)' }} 
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.25rem' }}>
                      <span className="card-tag" style={{ fontSize: '0.62rem', padding: '1px 6px', background: item.category === 'pi' ? 'var(--color-accent-light)' : 'var(--color-primary-pale)', color: item.category === 'pi' ? 'var(--color-accent)' : 'var(--color-primary)' }}>
                        {item.category === 'pi' ? 'PI' : 'YP/Staff'}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 700 }}>{item.role}</span>
                    </div>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--color-primary)', margin: 0 }}>
                      {item.name}
                    </h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', margin: '0.2rem 0 0' }}>{item.affiliation}</p>
                  </div>

                  <div style={{ display: 'flex', gap: '0.35rem' }}>
                    <button 
                      type="button"
                      onClick={() => moveTeamMember(idx, 'up')}
                      disabled={idx === 0}
                      style={{ 
                        padding: '6px', 
                        color: idx === 0 ? 'var(--color-border)' : 'var(--color-primary)', 
                        background: '#fff', 
                        border: '1px solid var(--color-border)', 
                        borderRadius: '4px', 
                        cursor: idx === 0 ? 'not-allowed' : 'pointer', 
                        display: 'flex', 
                        alignItems: 'center',
                        opacity: idx === 0 ? 0.35 : 1
                      }}
                      title="Move Up"
                    >
                      <ArrowUp size={14} />
                    </button>
                    <button 
                      type="button"
                      onClick={() => moveTeamMember(idx, 'down')}
                      disabled={idx === (config.team || defaultTeam).length - 1}
                      style={{ 
                        padding: '6px', 
                        color: idx === (config.team || defaultTeam).length - 1 ? 'var(--color-border)' : 'var(--color-primary)', 
                        background: '#fff', 
                        border: '1px solid var(--color-border)', 
                        borderRadius: '4px', 
                        cursor: idx === (config.team || defaultTeam).length - 1 ? 'not-allowed' : 'pointer', 
                        display: 'flex', 
                        alignItems: 'center',
                        opacity: idx === (config.team || defaultTeam).length - 1 ? 0.35 : 1
                      }}
                      title="Move Down"
                    >
                      <ArrowDown size={14} />
                    </button>
                    <button 
                      type="button"
                      onClick={() => handleTeamEdit(item, idx)}
                      style={{ padding: '6px', color: 'var(--color-primary)', background: '#fff', border: '1px solid var(--color-border)', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                      title="Edit"
                    >
                      <Edit size={14} />
                    </button>
                    <button 
                      type="button"
                      onClick={() => handleTeamDelete(idx)}
                      style={{ padding: '6px', color: '#c62828', background: '#fff', border: '1px solid var(--color-border)', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Security & Password */}
      {activeTab === 'security' && (
        <div style={{ maxWidth: '480px', margin: '0 auto', background: '#fff', padding: '2.5rem', borderRadius: '12px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
          <h3 style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem', marginBottom: '1.25rem', color: 'var(--color-primary)' }}>
            🔒 Change Admin Key
          </h3>
          
          <form onSubmit={handlePasswordChange} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                New Password
              </label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                placeholder="Enter new security key..."
                className="form-input"
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                Confirm New Password
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new security key..."
                className="form-input"
                style={{ width: '100%' }}
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', fontWeight: 700 }}>
              Update Security Key
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Admin;
