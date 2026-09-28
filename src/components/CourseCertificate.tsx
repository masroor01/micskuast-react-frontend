import React, { useState, useRef } from 'react';
import { Award, Printer, CheckCircle, X, Sparkles, ShieldCheck } from 'lucide-react';

interface CourseCertificateProps {
  isOpen: boolean;
  onClose: () => void;
  defaultName?: string;
  completionDate?: string;
  totalLessonsCompleted?: number;
  totalLessons?: number;
}

export const CourseCertificate: React.FC<CourseCertificateProps> = ({
  isOpen,
  onClose,
  defaultName = 'Masroor Ahmad',
  completionDate,
  totalLessonsCompleted = 13,
  totalLessons = 13
}) => {
  const [learnerName, setLearnerName] = useState(defaultName);
  const [copiedId, setCopiedId] = useState(false);
  const certRef = useRef<HTMLDivElement>(null);

  const formattedDate = completionDate || new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const certificateId = `MIC-SKUAST-PYDS-${new Date().getFullYear()}-84920`;

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyId = () => {
    navigator.clipboard.writeText(certificateId);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2500);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(6px)',
      zIndex: 99999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem',
      overflowY: 'auto'
    }}>
      {/* Print Specific CSS injected inline */}
      <style>{`
        @media print {
          body * {
            visibility: hidden !important;
          }
          #printable-certificate, #printable-certificate * {
            visibility: visible !important;
          }
          #printable-certificate {
            position: fixed !important;
            left: 0 !important;
            top: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            margin: 0 !important;
            padding: 2.5rem !important;
            box-shadow: none !important;
            border: 10px double #15803d !important;
            background: #ffffff !important;
            color: #0f172a !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      <div style={{
        backgroundColor: 'var(--color-surface)',
        borderRadius: '18px',
        border: '1px solid var(--color-border)',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.45)',
        width: '100%',
        maxWidth: '960px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '94vh'
      }}>
        
        {/* Modal Toolbar (Controls) */}
        <div className="no-print" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem 1.5rem',
          borderBottom: '1px solid var(--color-border)',
          background: 'var(--color-surface-hover)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Award size={22} style={{ color: '#d97706' }} />
            <div>
              <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: 'var(--color-text-main)' }}>
                Official Certificate of Completion
              </h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                MIC-SKUAST Kashmir • {totalLessonsCompleted}/{totalLessons} Curriculum Units Verified
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <button
              onClick={handlePrint}
              style={{
                backgroundColor: 'var(--color-primary)',
                color: '#ffffff',
                border: 'none',
                padding: '7px 14px',
                borderRadius: '8px',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
              title="Print or Save as PDF"
            >
              <Printer size={15} />
              <span>Print / Download PDF</span>
            </button>

            <button
              onClick={handleCopyId}
              style={{
                backgroundColor: 'transparent',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text-main)',
                padding: '7px 12px',
                borderRadius: '8px',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
              title="Copy Credential ID"
            >
              <CheckCircle size={14} style={{ color: copiedId ? '#16a34a' : 'var(--color-text-muted)' }} />
              <span>{copiedId ? 'Copied ID!' : 'Copy ID'}</span>
            </button>

            <button
              onClick={onClose}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                color: 'var(--color-text-muted)',
                padding: '6px',
                borderRadius: '6px',
                cursor: 'pointer',
                display: 'flex'
              }}
              title="Close Certificate"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Name Customization Strip */}
        <div className="no-print" style={{
          padding: '0.75rem 1.5rem',
          backgroundColor: 'rgba(22, 163, 74, 0.08)',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--color-text-main)' }}>
            <Sparkles size={16} style={{ color: '#16a34a' }} />
            <span>Customize certificate recipient name:</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="text"
              value={learnerName}
              onChange={(e) => setLearnerName(e.target.value)}
              placeholder="Your Full Name"
              style={{
                padding: '5px 12px',
                borderRadius: '6px',
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-surface)',
                color: 'var(--color-text-main)',
                fontSize: '0.85rem',
                fontWeight: 700,
                outline: 'none',
                minWidth: '220px'
              }}
            />
          </div>
        </div>

        {/* Scrollable Certificate Viewport */}
        <div style={{ padding: '1.75rem', overflowY: 'auto' }}>
          
          {/* THE PRINTABLE CERTIFICATE CARD */}
          <div 
            id="printable-certificate"
            ref={certRef}
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #fbfdfa 100%)',
              color: '#0f172a',
              borderRadius: '12px',
              border: '8px double #15803d',
              padding: '2.5rem 2rem',
              position: 'relative',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
              overflow: 'hidden',
              minHeight: '520px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            {/* Watermark Crest Background */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              opacity: 0.035,
              pointerEvents: 'none',
              width: '420px',
              height: '420px',
              backgroundImage: 'radial-gradient(circle, #15803d 20%, transparent 80%)',
              borderRadius: '50%'
            }} />

            {/* Corner Decorative Accents */}
            <div style={{ position: 'absolute', top: '10px', left: '10px', width: '24px', height: '24px', borderTop: '3px solid #d97706', borderLeft: '3px solid #d97706' }} />
            <div style={{ position: 'absolute', top: '10px', right: '10px', width: '24px', height: '24px', borderTop: '3px solid #d97706', borderRight: '3px solid #d97706' }} />
            <div style={{ position: 'absolute', bottom: '10px', left: '10px', width: '24px', height: '24px', borderBottom: '3px solid #d97706', borderLeft: '3px solid #d97706' }} />
            <div style={{ position: 'absolute', bottom: '10px', right: '10px', width: '24px', height: '24px', borderBottom: '3px solid #d97706', borderRight: '3px solid #d97706' }} />

            {/* Certificate Header */}
            <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: '#15803d',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 900,
                  fontSize: '1rem',
                  boxShadow: '0 2px 6px rgba(21, 128, 61, 0.3)'
                }}>
                  MIC
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.92rem', fontWeight: 900, color: '#15803d', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                    Market Intelligence Cell (MIC)
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>
                    Sher-e-Kashmir University of Agricultural Sciences &amp; Technology (SKUAST-Kashmir)
                  </div>
                </div>
              </div>

              <div style={{
                height: '2px',
                width: '180px',
                background: 'linear-gradient(90deg, transparent 0%, #d97706 50%, transparent 100%)',
                margin: '0.6rem auto'
              }} />

              <h2 style={{
                fontSize: '1.65rem',
                fontWeight: 900,
                color: '#0f172a',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                margin: '0.5rem 0 0.2rem 0',
                fontFamily: 'Georgia, serif'
              }}>
                Certificate of Completion
              </h2>

              <p style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.12em', margin: 0, fontWeight: 700 }}>
                This is to officially certify that
              </p>
            </div>

            {/* Recipient Name */}
            <div style={{ textAlign: 'center', margin: '0.75rem 0 1rem 0' }}>
              <div style={{
                fontSize: '2.1rem',
                fontWeight: 900,
                color: '#15803d',
                fontFamily: 'Georgia, serif',
                paddingBottom: '0.35rem',
                display: 'inline-block',
                borderBottom: '2px solid #d97706',
                minWidth: '320px',
                textShadow: '0 1px 2px rgba(0,0,0,0.05)'
              }}>
                {learnerName || 'Course Scholar'}
              </div>
            </div>

            {/* Certificate Body Paragraph */}
            <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 1.5rem auto' }}>
              <p style={{ fontSize: '0.88rem', color: '#334155', lineHeight: 1.65, margin: 0 }}>
                has successfully fulfilled all curriculum requirements, coding laboratories, hands-on section challenges, and the concluding industry capstone project in:
              </p>

              <div style={{
                fontSize: '1.25rem',
                fontWeight: 900,
                color: '#0f172a',
                margin: '0.65rem 0',
                letterSpacing: '0.02em'
              }}>
                Python for Data Science &amp; Agricultural Analytics
              </div>

              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '0.5rem',
                marginTop: '0.75rem'
              }}>
                {['Python Syntax & Control Flow', 'NumPy Vectorized Math', 'Pandas Tabular Analytics', 'Data Cleaning & Imputation', 'Seaborn EDA', 'Scikit-Learn Machine Learning', 'Agricultural Capstone Project'].map((skill, i) => (
                  <span key={i} style={{
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    backgroundColor: '#f1f5f9',
                    color: '#0f172a',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    border: '1px solid #cbd5e1'
                  }}>
                    ✓ {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Signatures & Verification Seal */}
            <div style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              paddingTop: '1.5rem',
              borderTop: '1px solid #e2e8f0',
              marginTop: 'auto'
            }}>
              
              {/* Left Signature */}
              <div style={{ textAlign: 'center', minWidth: '180px' }}>
                <div style={{
                  fontFamily: '"Brush Script MT", cursive, serif',
                  fontSize: '1.4rem',
                  color: '#0f172a',
                  marginBottom: '2px',
                  lineHeight: 1
                }}>
                  Prof. M. A. Wani
                </div>
                <div style={{ width: '150px', height: '1.5px', background: '#94a3b8', margin: '0 auto 4px auto' }} />
                <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#0f172a' }}>
                  Principal Investigator &amp; Lead
                </div>
                <div style={{ fontSize: '0.65rem', color: '#64748b' }}>
                  Market Intelligence Cell (MIC)
                </div>
              </div>

              {/* Center Golden Seal */}
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: '68px',
                  height: '68px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  boxShadow: '0 4px 12px rgba(217, 119, 6, 0.35)',
                  margin: '0 auto 6px auto',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  border: '2px dashed #fef3c7'
                }}>
                  <ShieldCheck size={22} />
                  <span style={{ fontSize: '0.55rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    VERIFIED
                  </span>
                </div>
                <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#15803d' }}>
                  SKUAST-K SEAL
                </div>
              </div>

              {/* Right Signature & Date */}
              <div style={{ textAlign: 'center', minWidth: '180px' }}>
                <div style={{
                  fontFamily: '"Brush Script MT", cursive, serif',
                  fontSize: '1.4rem',
                  color: '#0f172a',
                  marginBottom: '2px',
                  lineHeight: 1
                }}>
                  Dr. S. A. Mir
                </div>
                <div style={{ width: '150px', height: '1.5px', background: '#94a3b8', margin: '0 auto 4px auto' }} />
                <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#0f172a' }}>
                  Director / Co-PI
                </div>
                <div style={{ fontSize: '0.65rem', color: '#64748b' }}>
                  Directorate of Research, SKUAST-K
                </div>
              </div>

            </div>

            {/* Credential Metadata Footer */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.68rem',
              color: '#64748b',
              marginTop: '1rem',
              paddingTop: '0.5rem',
              borderTop: '1px dashed #cbd5e1'
            }}>
              <div>
                <strong>Issue Date:</strong> {formattedDate}
              </div>
              <div>
                <strong>Credential ID:</strong> <span style={{ fontFamily: 'monospace', color: '#0f172a' }}>{certificateId}</span>
              </div>
              <div>
                <strong>Verify at:</strong> <span style={{ color: '#15803d' }}>micskuast.in/#/learn</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
