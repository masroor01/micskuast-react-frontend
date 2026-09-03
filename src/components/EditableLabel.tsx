import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Edit2, Bold, Italic, Underline, AlignJustify } from 'lucide-react';

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
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

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

  const applyFormatting = (tagOpen: string, tagClose: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;

    const selectedText = text.substring(start, end);
    const replacement = tagOpen + selectedText + tagClose;

    const newValue = text.substring(0, start) + replacement + text.substring(end);
    setEditValue(newValue);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + tagOpen.length, start + tagOpen.length + selectedText.length);
    }, 0);
  };

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
        <span dangerouslySetInnerHTML={{ __html: value }} />
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

      {showModal && createPortal(
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0,0,0,0.65)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999999,
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
          <div style={{
            background: '#1e1e24',
            color: '#fff',
            borderRadius: '16px',
            padding: '2rem',
            width: '90%',
            maxWidth: '480px',
            boxShadow: '0 12px 35px rgba(0,0,0,0.6)',
            border: '1px solid #333'
          }}>
            <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.25rem', fontWeight: 700, color: '#fff', textAlign: 'left' }}>
              Customize Label
            </h3>
            
            <p style={{ fontSize: '0.85rem', color: '#aaa', margin: '0 0 1.25rem', lineHeight: 1.4, textAlign: 'left' }}>
              Customize the display text and apply rich formatting for this label across the application.
            </p>

            {/* Formatting Toolbar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              marginBottom: '0.75rem',
              background: '#282832',
              padding: '6px 10px',
              borderRadius: '8px',
              border: '1px solid #3d3d4b',
              flexWrap: 'wrap'
            }}>
              <span style={{ fontSize: '0.72rem', color: '#9ca3af', fontWeight: 700, marginRight: '4px' }}>
                Format:
              </span>
              
              <button
                type="button"
                onClick={() => applyFormatting('<b>', '</b>')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  background: '#353544',
                  border: '1px solid #4a4a5c',
                  color: '#fff',
                  borderRadius: '6px',
                  padding: '4px 9px',
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
                title="Bold (<b>...</b>)"
              >
                <Bold size={13} /> Bold
              </button>

              <button
                type="button"
                onClick={() => applyFormatting('<i>', '</i>')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  background: '#353544',
                  border: '1px solid #4a4a5c',
                  color: '#fff',
                  borderRadius: '6px',
                  padding: '4px 9px',
                  fontSize: '0.78rem',
                  fontStyle: 'italic',
                  cursor: 'pointer'
                }}
                title="Italic (<i>...</i>)"
              >
                <Italic size={13} /> Italic
              </button>

              <button
                type="button"
                onClick={() => applyFormatting('<u>', '</u>')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  background: '#353544',
                  border: '1px solid #4a4a5c',
                  color: '#fff',
                  borderRadius: '6px',
                  padding: '4px 9px',
                  fontSize: '0.78rem',
                  textDecoration: 'underline',
                  cursor: 'pointer'
                }}
                title="Underline (<u>...</u>)"
              >
                <Underline size={13} /> Underline
              </button>

              <button
                type="button"
                onClick={() => applyFormatting('<div style="text-align: justify;">', '</div>')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  background: '#353544',
                  border: '1px solid #4a4a5c',
                  color: '#fff',
                  borderRadius: '6px',
                  padding: '4px 9px',
                  fontSize: '0.78rem',
                  cursor: 'pointer'
                }}
                title="Justify Text Alignment"
              >
                <AlignJustify size={13} /> Justify
              </button>
            </div>

            {/* Textarea */}
            <div style={{ position: 'relative', marginBottom: '1rem', width: '100%' }}>
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
                ref={textareaRef}
                value={editValue}
                onChange={e => setEditValue(e.target.value)}
                style={{
                  width: '100%',
                  minHeight: '90px',
                  background: 'transparent',
                  border: '1px solid #4ade80',
                  borderRadius: '8px',
                  padding: '12px',
                  color: '#fff',
                  fontSize: '0.92rem',
                  outline: 'none',
                  resize: 'vertical',
                  boxSizing: 'border-box',
                  fontFamily: 'monospace',
                  lineHeight: '1.45'
                }}
              />
            </div>

            {/* Live Formatting Preview */}
            <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
              <span style={{ fontSize: '0.72rem', color: '#9ca3af', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                Live Preview:
              </span>
              <div 
                style={{
                  background: '#141418',
                  border: '1px solid #333',
                  borderRadius: '8px',
                  padding: '10px 14px',
                  fontSize: '0.9rem',
                  lineHeight: '1.5',
                  color: '#e2e8f0',
                  maxHeight: '90px',
                  overflowY: 'auto'
                }}
                dangerouslySetInnerHTML={{ __html: editValue || '<span style="color: #666; font-style: italic;">No text entered</span>' }}
              />
            </div>

            {/* Action Buttons */}
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
                  boxShadow: '0 4px 12px rgba(34, 197, 94, 0.25)'
                }}
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};
