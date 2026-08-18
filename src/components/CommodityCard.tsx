import React from 'react';
import { FileText, Download, Calendar } from 'lucide-react';

interface CommodityCardProps {
  title: string;
  marketingYear: string;
  description: string;
  googleDriveUrl: string;
  date: string;
}

const CommodityCard: React.FC<CommodityCardProps> = ({
  title,
  marketingYear,
  description,
  googleDriveUrl,
  date
}) => {
  return (
    <div className="card">
      <div className="card-tag">Marketing Year: {marketingYear}</div>
      <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary)' }}>
        <FileText size={20} style={{ color: 'var(--color-accent)' }} />
        {title}
      </h3>
      <p className="card-desc">{description}</p>
      
      <div className="card-footer">
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', color: 'var(--color-text-muted)' }}>
          <Calendar size={14} />
          {date}
        </div>
        
        <a 
          href={googleDriveUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn btn-primary"
          style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem', borderRadius: 'var(--radius-sm)' }}
        >
          <Download size={12} /> View Report
        </a>
      </div>
    </div>
  );
};

export default CommodityCard;
