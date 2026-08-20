import React, { useState, useEffect } from 'react';
import { Mail, GraduationCap } from 'lucide-react';

const LinkedinIcon = ({ size = 18 }: { size?: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

interface TeamMember {
  name: string;
  role: string;
  affiliation: string;
  image: string;
  linkedin: string;
  category: 'pi' | 'yp';
}

const fallbackMembers: TeamMember[] = [
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

const Team: React.FC = () => {
  const [members, setMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    fetch('/api/config.php')
      .then(res => res.json())
      .then(data => {
        if (data && data.team) {
          setMembers(data.team);
        } else {
          setMembers(fallbackMembers);
        }
      })
      .catch(err => {
        console.error("Failed to load team data:", err);
        setMembers(fallbackMembers);
      });
  }, []);

  const pis = members.filter(m => m.category === 'pi');
  const yps = members.filter(m => m.category === 'yp');

  return (
    <div className="team-page animate-fade-in" style={{ backgroundColor: 'var(--color-bg)', minHeight: '80vh', padding: '4rem 0' }}>
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
          <h1 style={{ 
            fontSize: 'clamp(28px, 4vw, 42px)', 
            fontWeight: 900, 
            color: 'var(--color-primary)', 
            marginTop: '1rem',
            marginBottom: '1rem'
          }}>
            Meet Our Team
          </h1>
          <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.6', fontSize: '1.05rem' }}>
            The research, analytical, and technical brains driving agricultural price forecasting and market intelligence models at SKUAST-K Kashmir.
          </p>
        </div>

        {/* Section 1: Senior Investigators */}
        {pis.length > 0 && (
          <div style={{ marginBottom: '5rem' }}>
            <h2 style={{ 
              fontSize: '1.5rem', 
              fontWeight: 800, 
              color: 'var(--color-primary)', 
              borderBottom: '2px solid var(--color-primary-pale)', 
              paddingBottom: '0.75rem',
              marginBottom: '2.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <GraduationCap size={24} style={{ color: 'var(--color-accent)' }} /> Principal Investigators
            </h2>
            
            <div className="team-grid">
              {pis.map((m, idx) => (
                <div key={idx} className="team-member-card">
                  <div className="member-photo-container">
                    <img src={m.image} alt={m.name} className="member-photo" />
                  </div>
                  <div className="member-info">
                    <h3 className="member-name">{m.name}</h3>
                    <div className="member-role">{m.role}</div>
                    <p className="member-affiliation">{m.affiliation}</p>
                    
                    <div className="member-socials">
                      <a href={m.linkedin} target="_blank" rel="noreferrer" className="social-link linkedin" title="LinkedIn Profile">
                        <LinkedinIcon size={18} />
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
        {yps.length > 0 && (
          <div>
            <h2 style={{ 
              fontSize: '1.5rem', 
              fontWeight: 800, 
              color: 'var(--color-primary)', 
              borderBottom: '2px solid var(--color-primary-pale)', 
              paddingBottom: '0.75rem',
              marginBottom: '2.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <GraduationCap size={24} style={{ color: 'var(--color-accent)' }} /> Research Staff &amp; Young Professionals
            </h2>

            <div className="team-grid">
              {yps.map((m, idx) => (
                <div key={idx} className="team-member-card">
                  <div className="member-photo-container">
                    <img src={m.image} alt={m.name} className="member-photo" />
                  </div>
                  <div className="member-info">
                    <h3 className="member-name">{m.name}</h3>
                    <div className="member-role">{m.role}</div>
                    <p className="member-affiliation">{m.affiliation}</p>
                    
                    <div className="member-socials">
                      <a href={m.linkedin} target="_blank" rel="noreferrer" className="social-link linkedin" title="LinkedIn Profile">
                        <LinkedinIcon size={18} />
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

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1.25fr));
          gap: 2.5rem;
          justify-content: center;
        }

        .team-member-card {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          padding: 2.5rem 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          box-shadow: var(--shadow-sm);
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
          height: 5px;
          background: linear-gradient(90deg, var(--color-primary) 0%, var(--color-primary-light) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .team-member-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-lg);
          border-color: var(--color-primary-light);
        }

        .team-member-card:hover::before {
          opacity: 1;
        }

        .member-photo-container {
          width: 140px;
          height: 140px;
          border-radius: 50%;
          overflow: hidden;
          margin-bottom: 2rem;
          background: var(--color-primary-pale);
          border: 4px solid var(--color-surface);
          box-shadow: 0 4px 15px rgba(0,0,0,0.06);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .team-member-card:hover .member-photo-container {
          transform: scale(1.05);
          border-color: var(--color-primary-pale);
          box-shadow: 0 8px 25px rgba(27, 110, 46, 0.15);
        }

        .member-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .team-member-card:hover .member-photo {
          transform: scale(1.05);
        }

        .member-name {
          font-size: 1.35rem;
          font-weight: 800;
          color: var(--color-primary);
          margin-bottom: 0.5rem;
        }

        .member-role {
          font-size: 0.82rem;
          font-weight: 800;
          color: var(--color-accent);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 1rem;
          display: inline-block;
          background: var(--color-accent-light);
          padding: 2px 10px;
          border-radius: 4px;
        }

        .member-affiliation {
          font-size: 0.9rem;
          color: var(--color-text-muted);
          line-height: 1.6;
          margin-bottom: 2rem;
          flex-grow: 1;
          max-width: 280px;
        }

        .member-socials {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }

        .social-link {
          width: 36px;
          height: 36px;
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
      ` }} />
    </div>
  );
};

export default Team;
