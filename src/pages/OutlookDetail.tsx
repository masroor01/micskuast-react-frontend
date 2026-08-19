import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { wpApi, type CommodityOutlook } from '../services/wpApi';
import Loader from '../components/Loader';
import { ArrowLeft, Download, Calendar } from 'lucide-react';

const OutlookDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [outlook, setOutlook] = useState<CommodityOutlook | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      wpApi.getCommodityOutlooks()
        .then(list => {
          const item = list.find(o => o.slug === slug);
          setOutlook(item || null);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [slug]);

  if (loading) return <div className="container section-padding"><Loader /></div>;

  if (!outlook) {
    return (
      <div className="container section-padding" style={{ textAlign: 'center' }}>
        <h2>Report Not Found</h2>
        <button onClick={() => navigate('/outlooks')} className="btn btn-secondary" style={{ marginTop: '1rem' }}>
          Back to Outlooks
        </button>
      </div>
    );
  }

  return (
    <div className="container section-padding animate-fade-in">
      <button 
        onClick={() => navigate('/outlooks')} 
        className="btn btn-secondary"
        style={{ marginBottom: '2rem', padding: '0.5rem 1rem', fontSize: '0.9rem' }}
      >
        <ArrowLeft size={16} /> Back to Outlooks
      </button>

      <div style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        padding: '3rem',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-accent)', fontWeight: 800, textTransform: 'uppercase' }}>
              Horticultural Report • {outlook.marketingYear}
            </span>
            <h1 style={{ marginTop: '0.5rem', fontSize: '2.5rem' }}>{outlook.title}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
              <Calendar size={14} />
              Published on {outlook.date}
            </div>
          </div>
          
          <a 
            href={outlook.googleDriveUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            <Download size={16} /> Download Full PDF
          </a>
        </div>

        <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', fontWeight: 500, fontStyle: 'italic', marginBottom: '2.5rem', paddingLeft: '1rem', borderLeft: '3px solid var(--color-accent)' }}>
          {outlook.shortDescription}
        </p>

        <div 
          className="wp-content-rendered"
          style={{ fontSize: '1.05rem', lineHeight: '1.8' }}
          dangerouslySetInnerHTML={{ __html: outlook.content }} 
        />
      </div>
    </div>
  );
};

export default OutlookDetail;
