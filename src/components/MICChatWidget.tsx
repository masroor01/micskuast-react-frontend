import React, { useState, useEffect, useRef } from 'react';
import { Bot, X, Send, Minus, RefreshCw, Sparkles, ExternalLink, AlertCircle } from 'lucide-react';

interface Source {
  idx?: number | string;
  title?: string;
  path?: string;
}

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  sources?: Source[];
  timestamp: string;
}

const INITIAL_SUGGESTIONS = [
  "🍎 What are the latest apple prices in Sopore?",
  "📈 How does the NH-44 corridor disruption model work?",
  "🔮 What are the LSTM forecast projections?",
  "🌾 What is HADP Project #04?",
  "🍒 Show cherry mandi seasonal trends"
];

const CHAT_ENDPOINT = 'https://micmandis.onrender.com/chatbot/chat';
const CHAT_PAGE_URL = 'https://micmandis.onrender.com/chat';

export const MICChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [useIframeMode, setUseIframeMode] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      content: "Hello! I am your **MIC Assistant** 👋\n\nI can help you analyze daily wholesale mandi prices, LSTM price forecasts, NH-44 corridor disruption indices, and SKUAST-K horticulture bulletins. What would you like to explore today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Auto scroll to bottom
  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom('auto');
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, isMinimized]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isStreaming]);

  // Dismiss tooltip after 10s or when opened
  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 12000);
    return () => clearTimeout(timer);
  }, []);

  const handleOpen = () => {
    setIsOpen(true);
    setIsMinimized(false);
    setShowTooltip(false);
    setHasUnread(false);
  };

  const handleClear = () => {
    setMessages([
      {
        id: 'welcome-reset',
        role: 'assistant',
        content: "Chat cleared. Ask me anything about J&K mandis, crop price predictions, or HADP research.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setErrorStatus(null);
  };

  // SSE Stream fetcher
  const sendMessage = async (userPrompt?: string) => {
    const query = (userPrompt || inputMessage).trim();
    if (!query || isStreaming) return;

    setInputMessage('');
    setErrorStatus(null);

    const userMsgId = 'user-' + Date.now();
    const botMsgId = 'bot-' + (Date.now() + 1);
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // 1. Append user message
    setMessages(prev => [
      ...prev,
      {
        id: userMsgId,
        role: 'user',
        content: query,
        timestamp: nowTime
      },
      {
        id: botMsgId,
        role: 'assistant',
        content: '',
        timestamp: nowTime
      }
    ]);

    setIsStreaming(true);

    try {
      const response = await fetch(CHAT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query })
      });

      if (!response.ok || !response.body) {
        throw new Error(`HTTP ${response.status}: Failed to connect to MIC backend.`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let accumulatedText = '';
      let collectedSources: Source[] = [];

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        let sep;
        while ((sep = buffer.indexOf('\n\n')) >= 0) {
          const rawEvent = buffer.slice(0, sep);
          buffer = buffer.slice(sep + 2);

          let eventType = 'message';
          let dataStr = '';

          for (const line of rawEvent.split('\n')) {
            if (line.startsWith('event:')) eventType = line.slice(6).trim();
            else if (line.startsWith('data:')) dataStr += line.slice(5).trim();
          }

          if (!dataStr) continue;

          let data;
          try {
            data = JSON.parse(dataStr);
          } catch {
            continue;
          }

          if (eventType === 'sources' && Array.isArray(data)) {
            collectedSources = data;
          } else if (eventType === 'chunk' && typeof data === 'string') {
            accumulatedText += data;
            setMessages(prev =>
              prev.map(msg =>
                msg.id === botMsgId
                  ? { ...msg, content: accumulatedText, sources: collectedSources }
                  : msg
              )
            );
          } else if (eventType === 'done') {
            setMessages(prev =>
              prev.map(msg =>
                msg.id === botMsgId
                  ? {
                      ...msg,
                      content: accumulatedText || '(No response generated)',
                      sources: collectedSources
                    }
                  : msg
              )
            );
          }
        }
      }
    } catch (err: any) {
      console.error('MIC Chat error:', err);
      const errMsg = err?.message || 'Error reaching the assistant endpoint.';
      setErrorStatus(errMsg);
      setMessages(prev =>
        prev.map(msg =>
          msg.id === botMsgId
            ? {
                ...msg,
                content: `⚠️ **Connection Note**: Could not reach the assistant endpoint directly.\n\n*If the free cloud instance is waking up, please wait ~30 seconds and retry, or click the 🔗 icon in the header to switch to Direct Embed mode.*`
              }
            : msg
        )
      );
    } finally {
      setIsStreaming(false);
    }
  };

  // Helper formatting for rich text (bold, links, code, lists)
  const renderFormattedContent = (content: string) => {
    const formatted = content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code style="background: rgba(0,0,0,0.06); padding: 2px 5px; border-radius: 4px; font-size: 0.85em;">$1</code>')
      .replace(/\n/g, '<br />');

    return <div dangerouslySetInnerHTML={{ __html: formatted }} />;
  };

  return (
    <>
      {/* Floating Action Button & Tooltip Greeting */}
      <div
        style={{
          position: 'fixed',
          right: '24px',
          bottom: '24px',
          zIndex: 99999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '10px'
        }}
      >
        {/* Proactive Greeting Pill */}
        {showTooltip && !isOpen && (
          <div
            onClick={handleOpen}
            style={{
              background: 'var(--color-surface, #ffffff)',
              color: 'var(--color-text-main, #1e293b)',
              padding: '8px 14px',
              borderRadius: '24px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.14)',
              border: '1px solid var(--color-border, #e2e8f0)',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              animation: 'bounce 2s infinite ease-in-out',
              whiteSpace: 'nowrap'
            }}
          >
            <span style={{ fontSize: '1rem' }}>💬</span>
            <span>Ask MIC Assistant</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowTooltip(false);
              }}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--color-text-muted, #94a3b8)',
                padding: '0 2px',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <X size={13} />
            </button>
          </div>
        )}

        {/* FAB Trigger Button */}
        <button
          onClick={() => {
            if (isOpen) {
              setIsOpen(false);
            } else {
              handleOpen();
            }
          }}
          aria-label="Toggle MIC Assistant Chatbot"
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: isOpen
              ? '#1e293b'
              : 'linear-gradient(135deg, #15803d 0%, #0d9488 100%)',
            color: '#ffffff',
            border: 'none',
            boxShadow: '0 10px 25px rgba(21, 128, 61, 0.4), 0 4px 10px rgba(0,0,0,0.1)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
            transform: isOpen ? 'rotate(90deg)' : 'scale(1)',
            position: 'relative'
          }}
        >
          {isOpen ? <X size={26} /> : <Bot size={28} />}

          {/* Unread indicator */}
          {hasUnread && !isOpen && (
            <span
              style={{
                position: 'absolute',
                top: '2px',
                right: '2px',
                width: '14px',
                height: '14px',
                background: '#ef4444',
                borderRadius: '50%',
                border: '2px solid #ffffff'
              }}
            />
          )}
        </button>
      </div>

      {/* Floating Chat Panel */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            right: '20px',
            bottom: '96px',
            width: 'min(420px, calc(100vw - 32px))',
            height: isMinimized ? '60px' : 'min(620px, calc(100vh - 120px))',
            background: 'var(--color-surface, #ffffff)',
            borderRadius: '20px',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.22), 0 0 0 1px rgba(0,0,0,0.06)',
            border: '1px solid var(--color-border, #e2e8f0)',
            zIndex: 99999,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            transition: 'height 0.25s ease, opacity 0.2s ease',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '12px 16px',
              background: 'linear-gradient(135deg, #14532d 0%, #15803d 60%, #0d9488 100%)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative'
                }}
              >
                <Bot size={22} color="#ffffff" />
                <span
                  style={{
                    position: 'absolute',
                    bottom: '-2px',
                    right: '-2px',
                    width: '10px',
                    height: '10px',
                    background: '#22c55e',
                    borderRadius: '50%',
                    border: '2px solid #14532d'
                  }}
                  title="Claude Bot Online"
                />
              </div>

              <div>
                <div style={{ fontWeight: 800, fontSize: '1rem', letterSpacing: '0.01em', lineHeight: 1.2 }}>
                  MIC Assistant
                </div>
              </div>
            </div>

            {/* Header Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              {/* Toggle Iframe / Native Mode */}
              <button
                onClick={() => setUseIframeMode(!useIframeMode)}
                style={{
                  background: useIframeMode ? 'rgba(255,255,255,0.3)' : 'none',
                  border: 'none',
                  color: '#ffffff',
                  padding: '6px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center'
                }}
                title={useIframeMode ? "Switch to Native Chat" : "Switch to Direct Embed View"}
              >
                <ExternalLink size={15} />
              </button>

              {/* Clear messages */}
              {!useIframeMode && (
                <button
                  onClick={handleClear}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#ffffff',
                    padding: '6px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center'
                  }}
                  title="Clear conversation"
                >
                  <RefreshCw size={15} />
                </button>
              )}

              {/* Minimize */}
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ffffff',
                  padding: '6px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center'
                }}
                title={isMinimized ? "Expand" : "Minimize"}
              >
                <Minus size={16} />
              </button>

              {/* Close */}
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ffffff',
                  padding: '6px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center'
                }}
                title="Close chat"
              >
                <X size={17} />
              </button>
            </div>
          </div>

          {/* Body Content */}
          {!isMinimized && (
            <>
              {useIframeMode ? (
                /* Fallback / Alternative Direct Iframe View */
                <iframe
                  src={CHAT_PAGE_URL}
                  title="MIC Assistant Embed"
                  style={{
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    flex: 1
                  }}
                />
              ) : (
                /* Native Custom Chat Interface */
                <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
                  {/* Messages Feed */}
                  <div
                    style={{
                      flex: 1,
                      padding: '14px',
                      overflowY: 'auto',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                      background: 'var(--color-bg, #f8fafc)'
                    }}
                  >
                    {messages.map((msg) => {
                      const isUser = msg.role === 'user';
                      return (
                        <div
                          key={msg.id}
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: isUser ? 'flex-end' : 'flex-start',
                            maxWidth: '100%'
                          }}
                        >
                          <div
                            style={{
                              maxWidth: '85%',
                              padding: '10px 14px',
                              borderRadius: isUser ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
                              background: isUser
                                ? 'linear-gradient(135deg, #15803d 0%, #16a34a 100%)'
                                : 'var(--color-surface, #ffffff)',
                              color: isUser ? '#ffffff' : 'var(--color-text-main, #1e293b)',
                              border: isUser ? 'none' : '1px solid var(--color-border, #e2e8f0)',
                              boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
                              fontSize: '0.88rem',
                              lineHeight: 1.5,
                              wordBreak: 'break-word'
                            }}
                          >
                            {renderFormattedContent(msg.content)}

                            {/* Source Citations */}
                            {msg.sources && msg.sources.length > 0 && (
                              <div
                                style={{
                                  marginTop: '8px',
                                  paddingTop: '8px',
                                  borderTop: '1px solid rgba(0,0,0,0.08)',
                                  fontSize: '0.74rem',
                                  color: 'var(--color-text-muted, #64748b)'
                                }}
                              >
                                <span style={{ fontWeight: 700, display: 'block', marginBottom: '3px' }}>
                                  📚 Referenced Sources:
                                </span>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                                  {msg.sources.map((s, idx) => (
                                    <span
                                      key={idx}
                                      style={{
                                        background: 'rgba(21, 128, 61, 0.08)',
                                        color: '#15803d',
                                        padding: '2px 6px',
                                        borderRadius: '4px',
                                        fontSize: '0.7rem',
                                        fontWeight: 600
                                      }}
                                    >
                                      [{s.idx || idx + 1}] {s.title || s.path || 'Data Feed'}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>

                          <span
                            style={{
                              fontSize: '0.68rem',
                              color: 'var(--color-text-muted, #94a3b8)',
                              marginTop: '3px',
                              padding: '0 4px'
                            }}
                          >
                            {msg.timestamp}
                          </span>
                        </div>
                      );
                    })}

                    {/* Thinking Indicator */}
                    {isStreaming && (
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '8px 12px',
                          background: 'var(--color-surface, #ffffff)',
                          border: '1px solid var(--color-border, #e2e8f0)',
                          borderRadius: '16px 16px 16px 2px',
                          width: 'fit-content',
                          color: 'var(--color-text-muted, #64748b)',
                          fontSize: '0.82rem'
                        }}
                      >
                        <Sparkles size={14} className="animate-pulse" style={{ color: '#16a34a' }} />
                        <span>MIC Assistant is thinking...</span>
                      </div>
                    )}

                    <div ref={messagesEndRef} />
                  </div>

                  {/* Suggestion Chips (shown when few messages) */}
                  {messages.length <= 2 && !isStreaming && (
                    <div
                      style={{
                        padding: '8px 12px',
                        background: 'var(--color-surface, #ffffff)',
                        borderTop: '1px solid var(--color-border, #f1f5f9)',
                        display: 'flex',
                        gap: '6px',
                        overflowX: 'auto',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {INITIAL_SUGGESTIONS.map((sug, i) => (
                        <button
                          key={i}
                          onClick={() => sendMessage(sug)}
                          style={{
                            background: 'var(--color-bg, #f8fafc)',
                            border: '1px solid var(--color-border, #e2e8f0)',
                            borderRadius: '12px',
                            padding: '4px 10px',
                            fontSize: '0.74rem',
                            color: 'var(--color-text-main, #334155)',
                            cursor: 'pointer',
                            fontWeight: 600,
                            transition: 'background 0.2s',
                            flexShrink: 0
                          }}
                        >
                          {sug}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Error banner if connection fails */}
                  {errorStatus && (
                    <div
                      style={{
                        padding: '6px 12px',
                        background: '#fef2f2',
                        color: '#991b1b',
                        fontSize: '0.74rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        borderTop: '1px solid #fee2e2'
                      }}
                    >
                      <AlertCircle size={13} style={{ flexShrink: 0 }} />
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {errorStatus}
                      </span>
                    </div>
                  )}

                  {/* Input Footer */}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      sendMessage();
                    }}
                    style={{
                      padding: '10px 14px',
                      background: 'var(--color-surface, #ffffff)',
                      borderTop: '1px solid var(--color-border, #e2e8f0)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder="Ask about forecasts, prices, policies..."
                      disabled={isStreaming}
                      style={{
                        flex: 1,
                        padding: '10px 14px',
                        borderRadius: '20px',
                        border: '1px solid var(--color-border, #cbd5e1)',
                        background: 'var(--color-bg, #f8fafc)',
                        color: 'var(--color-text-main, #1e293b)',
                        fontSize: '0.86rem',
                        outline: 'none',
                        transition: 'border 0.2s'
                      }}
                    />

                    <button
                      type="submit"
                      disabled={!inputMessage.trim() || isStreaming}
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '50%',
                        background: !inputMessage.trim() || isStreaming
                          ? 'var(--color-border, #cbd5e1)'
                          : 'linear-gradient(135deg, #15803d 0%, #16a34a 100%)',
                        color: '#ffffff',
                        border: 'none',
                        cursor: !inputMessage.trim() || isStreaming ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s',
                        boxShadow: inputMessage.trim() ? '0 2px 8px rgba(21, 128, 61, 0.3)' : 'none'
                      }}
                      title="Send message"
                    >
                      <Send size={16} />
                    </button>
                  </form>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};
