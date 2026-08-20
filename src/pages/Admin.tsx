import React, { useState, useEffect } from 'react';
import { Shield, Key, Plus, Trash2, Edit, Save, Upload, CheckCircle, AlertTriangle } from 'lucide-react';

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

interface SiteConfig {
  hero_title: string;
  hero_subtitle: string;
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

const defaultLabels: Record<string, string> = {
  header_brand_name: 'MIC SKUAST',
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
  home_info_card4_footer_metric: 'Actionable Intel'
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
  
  const [activeTab, setActiveTab] = useState<'home' | 'labels' | 'publications' | 'security' | 'team'>('home');
  const [config, setConfig] = useState<SiteConfig | null>(null);
  
  const [editingLabelKey, setEditingLabelKey] = useState<string | null>(null);
  const [editingLabelVal, setEditingLabelVal] = useState('');
  
  // Status messages
  const [saveStatus, setSaveStatus] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [uploadStatus, setUploadStatus] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  
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
      const data = await res.json();
      if (res.ok) {
        sessionStorage.setItem('admin_authenticated', 'true');
        sessionStorage.setItem('admin_password', password);
        setIsAuthenticated(true);
        window.dispatchEvent(new Event('config-updated'));
        // Load secure data
        fetch('/api/config.php')
          .then(r => r.json())
          .then(d => setConfig(sanitizeConfigData(d)));
      } else {
        setAuthError(data.error || 'Authentication failed');
      }
    })
    .catch(() => {
      setAuthError('Connection error to server API');
    });
  };

  // Save Config to Server
  const saveConfig = (updatedConfig: SiteConfig) => {
    setSaveStatus(null);
    fetch('/api/config.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password, config: updatedConfig })
    })
    .then(async res => {
      const data = await res.json();
      if (res.ok) {
        setConfig(updatedConfig);
        setSaveStatus({ type: 'success', text: 'Settings saved successfully!' });
      } else {
        setSaveStatus({ type: 'error', text: data.error || 'Failed to save settings' });
      }
    })
    .catch(() => {
      setSaveStatus({ type: 'error', text: 'Server connection error' });
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
      const data = await res.json();
      if (res.ok) {
        setPassword(newPassword);
        setNewPassword('');
        setConfirmPassword('');
        setSaveStatus({ type: 'success', text: 'Admin password changed successfully!' });
      } else {
        setSaveStatus({ type: 'error', text: data.error || 'Failed to change password' });
      }
    })
    .catch(() => {
      setSaveStatus({ type: 'error', text: 'Server connection error' });
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

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" className="btn btn-primary" style={{ fontWeight: 700, gap: '0.35rem' }}>
              <Save size={16} /> Save Homepage Settings
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
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.25rem' }}>Brief Description</label>
                <textarea
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
                header_brand_name: "Header Navigation Main Brand Text (e.g. MIC SKUAST)",
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
                home_info_card4_footer_metric: "Infographic Card 4 Footer Value (e.g. Actionable Intel)"
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
                      onClick={() => handleTeamEdit(item, idx)}
                      style={{ padding: '6px', color: 'var(--color-primary)', background: '#fff', border: '1px solid var(--color-border)', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                      title="Edit"
                    >
                      <Edit size={14} />
                    </button>
                    <button 
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
