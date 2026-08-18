import React, { useState, useEffect } from 'react';
import { Edit2 } from 'lucide-react';

interface EditableLabelProps {
  labelKey: string;
  defaultValue: string;
  style?: React.CSSProperties;
}

export const EditableLabel: React.FC<EditableLabelProps> = ({ labelKey, defaultValue, style }) => {
  const [value, setValue] = useState(defaultValue);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editValue, setEditValue] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const fetchLabel = () => {
    fetch('/api/config.php')
      .then(res => res.json())
      .then(data => {
        if (data && data.labels && data.labels[labelKey]) {
          setValue(data.labels[labelKey]);
        } else {
          setValue(defaultValue);
        }
      })
      .catch(() => {
        setValue(defaultValue);
      });
  };

  useEffect(() => {
    // Check if admin is authenticated
    const authenticated = sessionStorage.getItem('admin_authenticated') === 'true';
    setIsAdmin(authenticated);

    fetchLabel();

    // Listen for global updates
    const handleUpdate = () => {
      fetchLabel();
      setIsAdmin(sessionStorage.getItem('admin_authenticated') === 'true');
    };

    window.addEventListener('config-updated', handleUpdate);
    return () => {
      window.removeEventListener('config-updated', handleUpdate);
    };
  }, [labelKey, defaultValue]);

  const handleSave = () => {
    const password = sessionStorage.getItem('admin_password') || '';
    if (!password) {
      alert("Admin session expired. Please log in again.");
      return;
    }

    setIsSaving(true);
    fetch('/api/config.php')
      .then(res => res.json())
      .then(config => {
        if (!config.labels) {
          config.labels = {};
        }
        config.labels[labelKey] = editValue;

        return fetch('/api/config.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password, config })
        });
      })
      .then(res => {
        if (res.ok) {
          setValue(editValue);
          setShowModal(false);
          window.dispatchEvent(new Event('config-updated'));
        } else {
          alert("Failed to save changes. Verify authorization.");
        }
      })
      .catch(err => {
        console.error(err);
        alert("Server error when saving label.");
      })
      .finally(() => {
        setIsSaving(false);
      });
  };

  return (
    <>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', ...style }}>
        <span>{value}</span>
        {isAdmin && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setEditValue(value);
              setShowModal(true);
            }}
            style={{
              background: 'none',
              border: 'none',
              padding: '2px',
              cursor: 'pointer',
              color: 'var(--color-primary-light)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '4px',
              transition: 'background 0.2s'
            }}
            title="Edit Label"
          >
            <Edit2 size={12} style={{ color: '#3b82f6', verticalAlign: 'middle' }} />
          </button>
        )}
      </span>

      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0,0,0,0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999999,
          fontFamily: 'sans-serif'
        }}>
          <div style={{
            background: '#1e1e24',
            color: '#fff',
            borderRadius: '16px',
            padding: '2rem',
            width: '90%',
            maxWidth: '440px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
            border: '1px solid #333'
          }}>
            <h3 style={{ margin: '0 0 1.25rem', fontSize: '1.25rem', fontWeight: 700, color: '#fff', textAlign: 'left' }}>Customize Label</h3>
            
            <p style={{ fontSize: '0.85rem', color: '#aaa', margin: '0 0 1.5rem', lineHeight: 1.4, textAlign: 'left' }}>
              Customize the display text for this label across the application.
            </p>

            <div style={{ position: 'relative', marginBottom: '1.5rem', width: '100%' }}>
              <label style={{
                position: 'absolute',
                top: '-8px',
                left: '12px',
                background: '#1e1e24',
                padding: '0 4px',
                fontSize: '0.75rem',
                color: '#4ade80',
                fontWeight: 600
              }}>
                Label Text
              </label>
              <textarea
                value={editValue}
                onChange={e => setEditValue(e.target.value)}
                style={{
                  width: '100%',
                  minHeight: '80px',
                  background: 'transparent',
                  border: '1px solid #4ade80',
                  borderRadius: '8px',
                  padding: '12px',
                  color: '#fff',
                  fontSize: '0.95rem',
                  outline: 'none',
                  resize: 'vertical',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button
                onClick={() => setShowModal(false)}
                disabled={isSaving}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#ccc',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  fontWeight: 600
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                style={{
                  background: '#22c55e',
                  border: 'none',
                  color: '#fff',
                  padding: '8px 18px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  boxShadow: '0 4px 12px rgba(34, 197, 94, 0.2)'
                }}
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
