import React, { useEffect, useState } from 'react';
import { wpApi, type CommodityOutlook } from '../services/wpApi';
import CommodityCard from '../components/CommodityCard';
import Loader from '../components/Loader';
import { BookOpen } from 'lucide-react';

const OutlookList: React.FC = () => {
  const [outlooks, setOutlooks] = useState<CommodityOutlook[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    wpApi.getCommodityOutlooks()
      .then(data => {
        setOutlooks(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="container section-padding animate-fade-in">
      <div style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '2.5rem', marginBottom: '3rem' }}>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <BookOpen size={36} style={{ color: 'var(--color-accent)' }} />
          Commodity Outlooks
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', maxWidth: '750px' }}>
          Explore detailed reports on arrivals, wholesale prices, and future market predictions for major Kashmir horticultural products. All reports are published and managed dynamically in WordPress.
        </p>
      </div>

      {loading ? (
        <Loader />
      ) : outlooks.length > 0 ? (
        <div className="card-grid">
          {outlooks.map(out => (
            <CommodityCard
              key={out.id}
              title={out.title}
              marketingYear={out.marketingYear}
              description={out.shortDescription}
              googleDriveUrl={out.googleDriveUrl}
              date={out.date}
            />
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '3rem', border: '1px dashed var(--color-border)', borderRadius: 'var(--radius-md)' }}>
          <p style={{ color: 'var(--color-text-muted)' }}>No commodity outlooks found.</p>
        </div>
      )}
    </div>
  );
};

export default OutlookList;
