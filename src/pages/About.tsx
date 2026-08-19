import React from 'react';
import { EditableLabel } from '../components/EditableLabel';
import { Brain, Bell, Award } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="container animate-fade-in" style={{ paddingTop: '4rem', paddingBottom: '6rem' }}>
      {/* Hero Header */}
      <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem' }}>
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
          HADP Project-04
        </span>
        <h1 style={{ fontSize: 'clamp(28px, 4.5vw, 42px)', fontWeight: 800, marginBottom: '1.25rem', color: 'var(--color-text-main)' }}>
          <EditableLabel labelKey="about_hero_title" defaultValue="About Market Intelligence Cell" />
        </h1>
        <p style={{ fontSize: 'clamp(15px, 2.2vw, 18px)', color: 'var(--color-text-muted)', lineHeight: '1.6', margin: 0 }}>
          <EditableLabel 
            labelKey="about_hero_desc" 
            defaultValue="Empowering the horticulture and agriculture ecosystem of Jammu & Kashmir through advanced analytics, deep learning price projections, and anomaly early warning systems." 
          />
        </p>
      </div>

      {/* Vice-Chancellor Note Card */}
      <div className="vc-card">
        <span style={{
          color: 'var(--color-primary)',
          fontSize: '0.75rem',
          fontWeight: 800,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          border: '1px solid var(--color-primary)',
          padding: '2px 8px',
          borderRadius: '4px',
          display: 'inline-block',
          marginBottom: '1.5rem',
          fontFamily: 'monospace'
        }}>
          Message from the Vice Chancellor
        </span>
        
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '1.25rem', marginTop: 0 }}>
          <EditableLabel labelKey="about_vc_title" defaultValue="A Vision for Agri-Decision Science" />
        </h2>

        <blockquote style={{ 
          margin: '0 0 2rem 0', 
          fontSize: '1.1rem', 
          lineHeight: '1.7', 
          color: 'var(--color-text-main)', 
          fontStyle: 'italic',
          fontWeight: 500
        }}>
          "<EditableLabel 
            labelKey="about_vc_quote" 
            defaultValue="In our pursuit of transforming agricultural landscapes through scientific excellence, the SKUAST-K Market Intelligence Cell stands as a pioneering beacon. By translating complex data paradigms into actionable market forecasts, we are equipping J&K's farming community with the resources needed to navigate volatile marketing dynamics and optimize yield value." 
          />"
        </blockquote>

        <div className="vc-profile-section">
          <div className="vc-avatar-circle">
            <img src="/team/nazir_ganai.jpg" alt="Prof. Nazir Ahmad Ganai" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div className="vc-signature-block">
            <h4 className="vc-name">Prof. Nazir Ahmad Ganai</h4>
            <span className="vc-title">Vice Chancellor, SKUAST-Kashmir</span>
          </div>
        </div>
      </div>

      {/* Mission & Operations Grid */}
      <div style={{ marginTop: '5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-text-main)' }}>
            Core Analytical Divisions
          </h2>
          <p style={{ color: 'var(--color-text-muted)' }}>
            The structural divisions driving agricultural intelligence and HADP objectives.
          </p>
        </div>

        <div className="about-grid">
          {/* Card 1 */}
          <div className="tech-card">
            <div className="tech-card-header">
              <span className="tech-card-badge">Deep Learning LSTM</span>
              <h3 className="tech-card-title">AI Forecast Engine</h3>
              <p className="tech-card-desc">
                Querying historical transaction indices and seasonal indicators to deliver 7-day and 30-day price projections for horticulture crops.
              </p>
            </div>
            <div className="tech-card-footer">
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                <Brain size={16} /> Predictors
              </span>
              <span className="tech-card-metric">94.6% Accuracy</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="tech-card">
            <div className="tech-card-header">
              <span className="tech-card-badge">Anomaly Detection</span>
              <h3 className="tech-card-title">Early Warning Alerts</h3>
              <p className="tech-card-desc">
                Real-time monitors scanning volume anomalies, transaction spikes, and volatility indices to flag seasonal supply shocks.
              </p>
            </div>
            <div className="tech-card-footer">
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                <Bell size={16} /> Live Radar
              </span>
              <span className="tech-card-metric">Status: Active</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="tech-card">
            <div className="tech-card-header">
              <span className="tech-card-badge">Strategic Roadmap</span>
              <h3 className="tech-card-title">Agri-Policy Studies</h3>
              <p className="tech-card-desc">
                Translating research bulletins and high-density plantation records into structural reports for regional agricultural policy advisors.
              </p>
            </div>
            <div className="tech-card-footer">
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                <Award size={16} /> HADP Project 4
              </span>
              <span className="tech-card-metric">5 Terminals</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
