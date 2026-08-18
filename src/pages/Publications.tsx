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

const Publications: React.FC = () => {
  const [publications, setPublications] = useState<PublicationItem[]>(PUBLICATIONS_DATA);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');



  useEffect(() => {
    fetch('/api/config.php')
      .then(res => res.json())
      .then(data => {
        if (data && data.publications) {
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
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1.5rem',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'white',
        border: '1px solid var(--color-border)',
        padding: '1.25rem 2rem',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-sm)',
        marginBottom: '3rem'
      }}>
        {/* Category Buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          <button
            onClick={() => setActiveCategory('All')}
            className="btn"
            style={{
              padding: '0.5rem 1rem',
              fontSize: '0.85rem',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: activeCategory === 'All' ? 'var(--color-primary)' : 'transparent',
              color: activeCategory === 'All' ? 'white' : 'var(--color-text-muted)',
              border: activeCategory === 'All' ? 'none' : '1px solid var(--color-border)',
              fontWeight: 600
            }}
          >
            <EditableLabel labelKey="pub_tab_all" defaultValue="All Publications" />
          </button>
          
          <button
            onClick={() => setActiveCategory('Commodity Outlooks')}
            className="btn"
            style={{
              padding: '0.5rem 1rem',
              fontSize: '0.85rem',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: activeCategory === 'Commodity Outlooks' ? 'var(--color-primary)' : 'transparent',
              color: activeCategory === 'Commodity Outlooks' ? 'white' : 'var(--color-text-muted)',
              border: activeCategory === 'Commodity Outlooks' ? 'none' : '1px solid var(--color-border)',
              fontWeight: 600
            }}
          >
            <EditableLabel labelKey="pub_tab_outlooks" defaultValue="Commodity Outlooks" />
          </button>

          <button
            onClick={() => setActiveCategory('Market Intelligence Reports')}
            className="btn"
            style={{
              padding: '0.5rem 1rem',
              fontSize: '0.85rem',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: activeCategory === 'Market Intelligence Reports' ? 'var(--color-primary)' : 'transparent',
              color: activeCategory === 'Market Intelligence Reports' ? 'white' : 'var(--color-text-muted)',
              border: activeCategory === 'Market Intelligence Reports' ? 'none' : '1px solid var(--color-border)',
              fontWeight: 600
            }}
          >
            <EditableLabel labelKey="pub_tab_reports" defaultValue="Market Intelligence Reports" />
          </button>

          <button
            onClick={() => setActiveCategory('Research Papers')}
            className="btn"
            style={{
              padding: '0.5rem 1rem',
              fontSize: '0.85rem',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: activeCategory === 'Research Papers' ? 'var(--color-primary)' : 'transparent',
              color: activeCategory === 'Research Papers' ? 'white' : 'var(--color-text-muted)',
              border: activeCategory === 'Research Papers' ? 'none' : '1px solid var(--color-border)',
              fontWeight: 600
            }}
          >
            <EditableLabel labelKey="pub_tab_papers" defaultValue="Research Papers" />
          </button>

          <button
            onClick={() => setActiveCategory('Books')}
            className="btn"
            style={{
              padding: '0.5rem 1rem',
              fontSize: '0.85rem',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: activeCategory === 'Books' ? 'var(--color-primary)' : 'transparent',
              color: activeCategory === 'Books' ? 'white' : 'var(--color-text-muted)',
              border: activeCategory === 'Books' ? 'none' : '1px solid var(--color-border)',
              fontWeight: 600
            }}
          >
            <EditableLabel labelKey="pub_tab_books" defaultValue="Books" />
          </button>
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
                <span className="card-tag">{item.category}</span>
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
        <div style={{ textAlign: 'center', padding: '4rem 2rem', border: '1px dashed var(--color-border)', borderRadius: 'var(--radius-md)', background: 'white' }}>
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
