import React, { useState, useEffect } from 'react';
import { BookOpen, Search, FileText, Download, Calendar, ExternalLink } from 'lucide-react';
import { EditableLabel } from '../components/EditableLabel';

interface PublicationItem {
  id: number;
  title: string;
  category: string;
  author: string;
  description: string;
  year: string;
  url: string;
}

const PUBLICATIONS_DATA: PublicationItem[] = [
  {
    id: 1,
    title: 'Apple Outlook Report (2025-26)',
    category: 'Commodity Outlooks',
    author: 'Market Intelligence Cell, SKUAST-K',
    description: 'Outlook report for Apple marketing, arrivals, prices and production trends for Jammu & Kashmir.',
    year: '2026',
    url: 'https://drive.google.com/file/d/1jYC5YzApC7blX9b8TAyHcpYaWvW6eetM/view?usp=drive_link'
  },
  {
    id: 2,
    title: 'Cherry Outlook Report (2025)',
    category: 'Commodity Outlooks',
    author: 'Market Intelligence Cell, SKUAST-K',
    description: 'Detailed analysis of Cherry market segments, wholesale transactions, and volatility alert regimes.',
    year: '2025',
    url: 'https://drive.google.com/file/d/1jYC5YzApC7blX9b8TAyHcpYaWvW6eetM/view?usp=drive_link'
  },
  {
    id: 3,
    title: 'Agricultural Marketing Systems in Jammu & Kashmir',
    category: 'Books',
    author: 'SKUAST-K Academic Press',
    description: 'Comprehensive academic textbook addressing cold-chain infrastructure, APMC structures, and price dynamics in the Kashmir valley.',
    year: '2024',
    url: '#'
  },
  {
    id: 4,
    title: 'Horticultural Price Stability under HADP Policies',
    category: 'Research Papers',
    author: 'Ganai N. A., et al.',
    description: 'Evaluates the policy impact of the Holistic Agriculture Development Program (HADP) on stabilizing wholesale cherry and apple sectors.',
    year: '2025',
    url: '#'
  },
  {
    id: 5,
    title: 'Weekly Market Intelligence Bulletin - Vol. 14',
    category: 'Market Intelligence Reports',
    author: 'MIC Research Team',
    description: 'Weekly wholesale transaction summaries and early warning indices for Srinagar, Shopian, Jammu, and Azadpur markets.',
    year: '2026',
    url: '#'
  }
];

const getCategoryColors = (category: string) => {
  switch (category) {
    case 'Commodity Outlooks':
      return {
        bg: '#fef3c7',
        text: '#b45309',
        border: '#d97706',
        gradient: 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)',
        darkBg: 'rgba(217, 119, 6, 0.15)',
        darkText: '#fbbf24'
      };
    case 'Market Intelligence Reports':
      return {
        bg: '#e0f2fe',
        text: '#0369a1',
        border: '#0284c7',
        gradient: 'linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)',
        darkBg: 'rgba(2, 132, 199, 0.15)',
        darkText: '#7dd3fc'
      };
    case 'Research Papers':
      return {
        bg: '#e0e7ff',
        text: '#4338ca',
        border: '#4f46e5',
        gradient: 'linear-gradient(135deg, #4f46e5 0%, #818cf8 100%)',
        darkBg: 'rgba(79, 70, 229, 0.15)',
        darkText: '#a5b4fc'
      };
    case 'Books':
      return {
        bg: '#d1fae5',
        text: '#047857',
        border: '#059669',
        gradient: 'linear-gradient(135deg, #059669 0%, #34d399 100%)',
        darkBg: 'rgba(5, 150, 105, 0.15)',
        darkText: '#6ee7b7'
      };
    case 'Book Chapters':
      return {
        bg: '#ede9fe',
        text: '#6d28d9',
        border: '#7c3aed',
        gradient: 'linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)',
        darkBg: 'rgba(124, 58, 237, 0.15)',
        darkText: '#c084fc'
      };
    case 'Policy Reports':
      return {
        bg: '#ffe4e6',
        text: '#be123c',
        border: '#fb7185',
        gradient: 'linear-gradient(135deg, #be123c 0%, #fb7185 100%)',
        darkBg: 'rgba(190, 18, 60, 0.15)',
        darkText: '#fda4af'
      };
    default: // 'All'
      return {
        bg: 'var(--color-primary-pale)',
        text: 'var(--color-primary)',
        border: 'var(--color-primary-light)',
        gradient: 'var(--gradient-primary)',
        darkBg: 'rgba(21, 128, 61, 0.15)',
        darkText: '#4ade80'
      };
  }
};

const Publications: React.FC = () => {
  const [publications, setPublications] = useState<PublicationItem[]>(PUBLICATIONS_DATA);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [currentTheme, setCurrentTheme] = useState(document.documentElement.getAttribute('data-theme') || 'light');

  const categoriesList = [
    { id: 'All', labelKey: 'pub_tab_all', defaultVal: 'All Publications' },
    { id: 'Commodity Outlooks', labelKey: 'pub_tab_outlooks', defaultVal: 'Commodity Outlooks' },
    { id: 'Market Intelligence Reports', labelKey: 'pub_tab_reports', defaultVal: 'Market Intelligence Reports' },
    { id: 'Research Papers', labelKey: 'pub_tab_papers', defaultVal: 'Research Papers' },
    { id: 'Books', labelKey: 'pub_tab_books', defaultVal: 'Books' },
    { id: 'Book Chapters', labelKey: 'pub_tab_chapters', defaultVal: 'Book Chapters' },
    { id: 'Policy Reports', labelKey: 'pub_tab_policy', defaultVal: 'Policy Reports' }
  ];

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



  useEffect(() => {
    // 1. Try to load from localStorage cache first
    const cachedConfigStr = localStorage.getItem('micskuast_config');
    if (cachedConfigStr) {
      try {
        const cachedData = JSON.parse(cachedConfigStr);
        if (cachedData && cachedData.publications) {
          setPublications(cachedData.publications);
        }
      } catch (e) {
        console.error("Failed to parse cached config in publications:", e);
      }
    }

    // 2. Fetch latest from server
    fetch('/api/config.php')
      .then(res => res.json())
      .then(data => {
        if (data && data.publications) {
          // Update cache with full config
          localStorage.setItem('micskuast_config', JSON.stringify(data));
          setPublications(data.publications);
        }
      })
      .catch(err => {
        console.log("No custom publications loaded, using defaults", err);
      });
  }, []);

  const filteredItems = publications.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container section-padding animate-fade-in">
      {/* Header Banner */}
      <div style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '2.5rem', marginBottom: '3rem' }}>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <BookOpen size={36} style={{ color: 'var(--color-accent)' }} />
          Publications & Books Directory
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', maxWidth: '750px' }}>
          Browse research bulletins, academic publications, market textbooks, and seasonal outlook reports compiled by the SKUAST Market Intelligence Cell.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="pub-filter-bar">
        {/* Category Buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {categoriesList.map(cat => {
            const colors = getCategoryColors(cat.id);
            const isActive = activeCategory === cat.id;
            
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="btn"
                style={{
                  padding: '0.5rem 1rem',
                  fontSize: '0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  background: isActive ? colors.gradient : 'transparent',
                  color: isActive 
                    ? (cat.id === 'All' ? 'var(--color-btn-text-primary)' : '#ffffff') 
                    : (currentTheme === 'dark' ? colors.darkText : colors.text),
                  border: isActive 
                    ? 'none' 
                    : `1px solid ${currentTheme === 'dark' ? 'rgba(255,255,255,0.08)' : colors.border}`,
                  fontWeight: 700,
                  transition: 'all 0.3s ease',
                  boxShadow: isActive ? 'var(--shadow-sm)' : 'none'
                }}
              >
                <EditableLabel labelKey={cat.labelKey} defaultValue={cat.defaultVal} />
              </button>
            );
          })}
        </div>

        {/* Search Searchbar */}
        <div style={{ position: 'relative', minWidth: '280px' }}>
          <input
            type="text"
            placeholder="Search reports or authors..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="form-input"
            style={{ width: '100%', paddingLeft: '2.5rem', borderRadius: 'var(--radius-sm)' }}
          />
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
        </div>
      </div>

      {/* Grid List */}
      {filteredItems.length > 0 ? (
        <div className="card-grid">
          {filteredItems.map(item => (
            <div key={item.id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span className="card-tag" style={{
                  backgroundColor: currentTheme === 'dark' ? getCategoryColors(item.category).darkBg : getCategoryColors(item.category).bg,
                  color: currentTheme === 'dark' ? getCategoryColors(item.category).darkText : getCategoryColors(item.category).text,
                  padding: '3px 10px',
                  borderRadius: '50px',
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  display: 'inline-block'
                }}>
                  {item.category}
                </span>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', display: 'inline-flex', alignItems: 'center', gap: '0.15rem' }}>
                  <Calendar size={12} /> {item.year}
                </span>
              </div>
              
              <h3 className="card-title" style={{ color: 'var(--color-primary)', display: 'flex', alignItems: 'start', gap: '0.5rem' }}>
                <FileText size={20} style={{ color: 'var(--color-accent)', flexShrink: 0, marginTop: '0.2rem' }} />
                {item.title}
              </h3>
              
              <p style={{ fontSize: '0.8rem', fontStyle: 'italic', color: 'var(--color-text-muted)', marginBottom: '0.75rem' }}>
                By {item.author}
              </p>
              
              <p className="card-desc">{item.description}</p>
              
              <div className="card-footer" style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                {item.url !== '#' ? (
                  <>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn"
                      style={{ flex: 1, justifyContent: 'center', padding: '0.5rem', fontSize: '0.82rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-primary)', color: 'var(--color-primary)', background: 'transparent', fontWeight: 700 }}
                    >
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                        <ExternalLink size={14} /> View
                      </span>
                    </a>
                    <a
                      href={item.url}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                      style={{ flex: 1, justifyContent: 'center', padding: '0.5rem', fontSize: '0.82rem', borderRadius: 'var(--radius-sm)', fontWeight: 700 }}
                    >
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Download size={14} /> Download
                      </span>
                    </a>
                  </>
                ) : (
                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); alert('Please contact info@micskuast.in to request access to this document.'); }}
                    className="btn btn-secondary"
                    style={{ width: '100%', justifyContent: 'center', padding: '0.5rem 1rem', fontSize: '0.85rem', borderRadius: 'var(--radius-sm)' }}
                  >
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                      Request Access <ExternalLink size={14} />
                    </span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '4rem 2rem', border: '1px dashed var(--color-border)', borderRadius: 'var(--radius-md)', background: 'var(--color-surface)' }}>
          <h3 style={{ color: 'var(--color-primary)' }}>No Publications Found</h3>
          <p style={{ color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
            We couldn't find any documents matching "{searchQuery}". Try refining your search query or switching categories.
          </p>
        </div>
      )}
    </div>
  );
};

export default Publications;
