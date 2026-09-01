import React, { useState } from 'react';
import { ChatMessage } from '../types';
import { Sparkles, Send, Bot, User, HelpCircle, Loader2, RefreshCw } from 'lucide-react';

export const AIConsultant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'assistant',
      text: `Hello! I am the **Pujya Agritech AI Greenhouse Assistant**.

I can assist you with general information regarding:
- Greenhouse structure types (Glass, Polycarbonate, Multi-Span Film, Shade Nets)
- Crop suitability and protected cultivation concepts
- Irrigation and fertigation basics
- General project parameters and considerations

*Note: I am an AI assistant and not a licensed engineer or legal advisor. Official quotations, engineering designs, and subsidy approvals depend on current official scheme guidelines and direct consultation with our project team.*

How can I help you today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [crop, setCrop] = useState('Colored Capsicum');
  const [location, setLocation] = useState('Gujarat / India');
  const [structureType, setStructureType] = useState('Naturally Ventilated Polyhouse');
  const [isLoading, setIsLoading] = useState(false);

  const presetQuestions = [
    "What are the general differences between Fan & Pad and Naturally Ventilated polyhouses?",
    "Which crops are commonly grown in multi-span polyhouses in Gujarat?",
    "How does rainwater harvesting with HDPE farm ponds work?",
    "What general factors affect polyhouse structural planning?"
  ];

  const handleSendMessage = async (queryText?: string) => {
    const messageToSend = queryText || inputQuery;
    if (!messageToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: messageToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!queryText) setInputQuery('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai-consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageToSend,
          crop,
          location,
          structureType
        })
      });

      const data = await res.json();
      
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: data.reply || data.fallback || "Thank you for consulting Pujya Agritech. Our team of agronomy engineers is standing by.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.error("AI Consult error", err);
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: "Pujya Agritech AI is experiencing a brief connection delay. You can also call our official helpline directly at **+91 99744 31960** or **+91 90814 12412**.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-12 bg-slate-900 text-white min-h-[80vh] border-b border-slate-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>AI Agronomy & Polyhouse Advisory</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Ask Pujya Agritech AI Consultant
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto">
            Get instant expert guidance on greenhouse structural specs, NHB subsidies, crop suitability, and climate control automation.
          </p>
        </div>

        {/* Context Controls Bar */}
        <div className="bg-slate-800/90 rounded-xl p-3 border border-slate-700/80 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase">Crop Context:</label>
            <input
              type="text"
              value={crop}
              onChange={(e) => setCrop(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-emerald-300 font-semibold"
            />
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase">Location:</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-white font-semibold"
            />
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase">Structure Type:</label>
            <select
              value={structureType}
              onChange={(e) => setStructureType(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-white font-semibold"
            >
              <option value="Naturally Ventilated Polyhouse">Naturally Ventilated Polyhouse</option>
              <option value="Fan & Pad Climate Controlled">Fan & Pad Climate Controlled</option>
              <option value="Shade Net House">Shade Net House</option>
              <option value="Hydroponic Poly Tunnel">Hydroponic Poly Tunnel</option>
            </select>
          </div>
        </div>

        {/* Chat Messages Box */}
        <div className="bg-slate-950 rounded-2xl border border-slate-800 p-4 sm:p-6 shadow-2xl h-[480px] flex flex-col justify-between">
          
          <div className="overflow-y-auto space-y-4 pr-2 scrollbar-thin">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'assistant' && (
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-slate-950 font-black flex items-center justify-center flex-shrink-0 text-xs shadow-md">
                    PA
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-emerald-600 text-white rounded-tr-none'
                      : 'bg-slate-900 text-slate-200 border border-slate-800 rounded-tl-none whitespace-pre-wrap'
                  }`}
                >
                  <p className="font-semibold text-[10px] opacity-70 mb-1">
                    {msg.sender === 'user' ? 'You' : 'Pujya Agritech AI Consultant'} • {msg.timestamp}
                  </p>
                  <div>{msg.text}</div>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-8 h-8 rounded-xl bg-slate-800 text-slate-300 font-bold flex items-center justify-center flex-shrink-0 text-xs border border-slate-700">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-3 text-slate-400 text-xs bg-slate-900/60 p-3 rounded-xl border border-slate-800 w-fit">
                <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
                <span>Pujya AI Agronomist is analyzing structural specs & agronomy guidelines...</span>
              </div>
            )}
          </div>

          {/* Preset Prompts & Input Area */}
          <div className="pt-3 border-t border-slate-800 space-y-3">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] scrollbar-none">
              <span className="text-slate-500 font-bold flex items-center gap-1 flex-shrink-0">
                <HelpCircle className="w-3 h-3 text-emerald-400" />
                Suggested:
              </span>
              {presetQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q)}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-emerald-500/50 whitespace-nowrap transition-colors flex-shrink-0"
                >
                  {q}
                </button>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask about polyhouse cost, subsidy process, crops, GI pipe thickness..."
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                type="submit"
                disabled={isLoading || !inputQuery.trim()}
                className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black text-xs transition-colors flex items-center gap-1.5 disabled:opacity-50"
              >
                <span>Ask</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
