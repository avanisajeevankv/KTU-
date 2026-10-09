import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MessageCircle, X, Send, Minimize2, Bot, User, ChevronRight } from 'lucide-react';
import { chatbotRules, fallbackResponse, welcomeMessage } from '../data/chatbotResponses';

function matchRule(input) {
  const lower = input.toLowerCase().trim();
  for (const rule of chatbotRules) {
    if (rule.keywords.some(kw => lower.includes(kw))) return rule;
  }
  return null;
}

function renderText(text) {
  return text.split('\n').map((line, i) => {
    const parts = line.split(/\*\*(.*?)\*\*/g);
    return (
      <p key={i} className={i > 0 ? 'mt-1' : ''}>
        {parts.map((part, j) =>
          j % 2 === 1 ? <strong key={j}>{part}</strong> : part
        )}
      </p>
    );
  });
}

export default function QuickAssistChatbot() {
  const navigate  = useNavigate();
  const location  = useLocation();

  const [open,    setOpen]    = useState(false);
  const [input,   setInput]   = useState('');
  const [messages, setMessages] = useState([
    { id: 1, from: 'bot', text: welcomeMessage.text, quickReplies: welcomeMessage.quickReplies }
  ]);
  const bottomRef = useRef(null);
  const inputRef  = useRef(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 80);
    }
  }, [messages, open]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 120);
  }, [open]);

  function scrollToSection(section) {
    if (!section) return;
    setTimeout(() => {
      const el = document.getElementById(section);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 200);
  }

  function handleAction(action) {
    if (!action) return;
    if (action.path && action.path !== location.pathname) {
      navigate(action.path);
    }
    if (action.section) scrollToSection(action.section);
  }

  function addBotMessage(response) {
    const msg = {
      id: Date.now() + 1,
      from: 'bot',
      text: response.text,
      action: response.action || null,
      quickReplies: response.quickReplies || null,
    };
    setMessages(prev => [...prev, msg]);
    if (response.action) {
      setTimeout(() => handleAction(response.action), 300);
    }
  }

  function sendMessage(text) {
    if (!text.trim()) return;
    const userMsg = { id: Date.now(), from: 'user', text: text.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    setTimeout(() => {
      const rule = matchRule(text);
      addBotMessage(rule ? rule.response : fallbackResponse);
    }, 400);
  }

  function handleSubmit(e) {
    e.preventDefault();
    sendMessage(input);
  }

  return (
    <>
      {/* ── Floating Button ── */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-ktu-navy to-ktu-violet shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center group"
          aria-label="Open KTU Quick Assist"
        >
          <MessageCircle size={24} className="text-white" />
          <span className="absolute -top-10 right-0 bg-ktu-blue text-white text-xs px-2.5 py-1 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            KTU Quick Assist
          </span>
        </button>
      )}

      {/* ── Chat Panel ── */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-80 sm:w-96 flex flex-col bg-white rounded-2xl shadow-card-hover border border-slate-100 overflow-hidden"
             style={{ maxHeight: 'calc(100vh - 100px)', height: 520 }}>

          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 bg-hero-gradient">
            <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center">
              <Bot size={18} className="text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-white leading-none">KTU Quick Assist</p>
              <p className="text-[11px] text-white/60 mt-0.5">Rule-based · Frontend only</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition text-white"
              aria-label="Close chatbot"
            >
              <X size={15} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-slate-50/50 scrollbar-hide">
            {messages.map(msg => (
              <div key={msg.id} className={`flex gap-2 ${msg.from === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                {/* Avatar */}
                <div className={`w-7 h-7 rounded-xl shrink-0 flex items-center justify-center ${
                  msg.from === 'bot'
                    ? 'bg-hero-gradient'
                    : 'bg-ktu-violet'
                }`}>
                  {msg.from === 'bot'
                    ? <Bot size={14} className="text-white" />
                    : <User size={14} className="text-white" />
                  }
                </div>

                {/* Bubble */}
                <div className={`max-w-[78%] ${msg.from === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-2`}>
                  <div className={`px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed ${
                    msg.from === 'user'
                      ? 'bg-ktu-navy text-white rounded-tr-sm'
                      : 'bg-white text-slate-700 rounded-tl-sm border border-slate-100 shadow-sm'
                  }`}>
                    {renderText(msg.text)}
                  </div>

                  {/* Action button */}
                  {msg.action && (
                    <button
                      onClick={() => handleAction(msg.action)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-ktu-violet text-white rounded-lg text-xs font-medium hover:bg-violet-600 transition"
                    >
                      {msg.action.label}
                      <ChevronRight size={12} />
                    </button>
                  )}

                  {/* Quick replies */}
                  {msg.quickReplies && (
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {msg.quickReplies.map(qr => (
                        <button
                          key={qr}
                          onClick={() => sendMessage(qr)}
                          className="px-2.5 py-1 bg-white border border-navy-200 text-ktu-navy rounded-full text-[11px] font-medium hover:bg-navy-50 transition"
                        >
                          {qr}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="flex items-center gap-2 px-3 py-3 border-t border-slate-100 bg-white">
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask something…"
              className="flex-1 text-xs px-3 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-ktu-violet focus:ring-2 focus:ring-violet-100 transition bg-slate-50"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="w-9 h-9 rounded-xl bg-ktu-navy flex items-center justify-center text-white hover:bg-navy-800 disabled:opacity-40 disabled:cursor-not-allowed transition active:scale-95"
              aria-label="Send message"
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
