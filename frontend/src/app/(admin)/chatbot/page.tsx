"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { 
  Package, 
  Users, 
  MessageSquare, 
  Activity, 
  Sparkles, 
  Send,
  Bot,
  TrendingUp,   // كانت ناقصة
  ThumbsUp,     // كانت ناقصة
  Clock,        // كانت ناقصة
  Search,       // كانت ناقصة
  User          // كانت ناقصة
} from "lucide-react";
// --- الداتا الوهمية للمحادثات ---
const conversations = [
  { id: 1, user: "User #4521", question: "What was the significance of Tutankhamun's reign?", response: "Tutankhamun became pharaoh at age 9 and ruled until his death at 19. While his reign was brief, it marked a return to the traditional religious worship of Amun...", timestamp: "2 hours ago", rating: "helpful" },
  { id: 2, user: "User #3892", question: "Can you show me artifacts from the Ptolemaic period?", response: "I can help you explore artifacts from the Ptolemaic period. This era spans from the conquest of Alexander the Great in 332 BC to the death of Cleopatra VII...", timestamp: "4 hours ago", rating: "helpful" },
  { id: 3, user: "User #5673", question: "How was papyrus made in ancient Egypt?", response: "Papyrus was made from the pith of the papyrus plant which grew in the Nile Delta. The process involved stripping the plant's outer layer and slicing the pith into thin strips...", timestamp: "6 hours ago", rating: "neutral" },
  { id: 4, user: "User #2341", question: "Tell me about the mummification process", response: "Ancient Egyptian mummification was a complex 70-day process designed to preserve the body for the afterlife. It involved the removal of internal organs and the use of natron...", timestamp: "8 hours ago", rating: "helpful" },
];

const topQuestions = [
  { question: "What is inside the pyramids?", count: 342, growth: "+12%" },
  { question: "How were the pyramids built?", count: 298, growth: "+5%" },
  { question: "Who was Cleopatra?", count: 267, growth: "+22%" },
  { question: "What is the Rosetta Stone?", count: 234, growth: "+2%" },
  { question: "How old are the pyramids?", count: 189, growth: "+1%" },
];

export default function chatbot() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.response.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 space-y-10 min-h-screen">
      
      {/* ================= Header ================= */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-white mb-2 flex items-center gap-3">
            <Sparkles className="text-[#D4AF37]" size={28} /> AI Oracle Analytics
          </h1>
          <p className="text-gray-400 text-sm italic">"Reviewing the digital consciousness of the museum's guide."</p>
        </div>
      </div>

      {/* ================= Stats Grid ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Queries", value: "45,281", icon: MessageSquare, color: "text-[#D4AF37]" },
          { label: "Queries Today", value: "1,847", icon: TrendingUp, color: "text-emerald-500" },
          { label: "Positive Feedback", value: "94%", icon: ThumbsUp, color: "text-blue-500" },
          { label: "Avg Latency", value: "1.2s", icon: Clock, color: "text-[#D4AF37]" },
        ].map((stat, i) => (
          <motion.div 
            key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="bg-[#111] border border-white/5 rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-white/5 rounded-lg"><stat.icon size={18} className={stat.color} /></div>
              <span className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">{stat.label}</span>
            </div>
            <div className="text-3xl font-bold text-white font-mono">{stat.value}</div>
          </motion.div>
        ))}
      </div>

      {/* ================= Search Bar ================= */}
      <div className="bg-[#111] border border-white/5 rounded-2xl p-4 shadow-xl">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#D4AF37] transition-colors" size={18} />
          <input
            type="text"
            placeholder="Uncover specific knowledge transfers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-[#D4AF37]/50 transition-all"
          />
        </div>
      </div>

      {/* ================= Main Content ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Conversations List */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xl font-serif font-bold text-white mb-4">Live Knowledge Stream</h3>
          <AnimatePresence>
            {filteredConversations.map((conv, idx) => (
              <motion.div 
                key={conv.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }}
                className="bg-[#111] border border-white/5 rounded-2xl p-6 hover:border-[#D4AF37]/20 transition-all group shadow-md"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                      <User className="text-[#D4AF37]" size={18} />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">{conv.user}</div>
                      <div className="text-[10px] text-gray-500 uppercase font-mono tracking-tighter">{conv.timestamp}</div>
                    </div>
                  </div>
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                    conv.rating === "helpful" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-white/5 text-gray-500 border-white/10"
                  }`}>
                    {conv.rating === "helpful" ? <ThumbsUp size={10} /> : <Activity size={10} />} {conv.rating}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="relative pl-6 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[2px] before:bg-[#D4AF37]/20">
                    <div className="text-[10px] uppercase font-bold text-gray-600 mb-1">Human Query</div>
                    <div className="text-sm text-gray-300 italic">"{conv.question}"</div>
                  </div>
                  <div className="relative pl-6 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[2px] before:bg-blue-500/20 bg-blue-500/[0.02] p-4 rounded-r-xl">
                    <div className="text-[10px] uppercase font-bold text-blue-500 mb-1 flex items-center gap-2">
                       <Sparkles size={10} /> Oracle Response
                    </div>
                    <div className="text-sm text-white leading-relaxed">{conv.response}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Right Sidebar: FAQ Ranking */}
        <div className="space-y-6">
          <h3 className="text-xl font-serif font-bold text-white mb-4">Curiosity Ranking</h3>
          <div className="bg-[#111] border border-white/5 rounded-3xl p-6 shadow-2xl sticky top-28">
            <div className="space-y-6">
              {topQuestions.map((q, idx) => (
                <div key={idx} className="flex items-start gap-4 group">
                  <div className="w-8 h-8 bg-[#050505] border border-white/5 rounded-lg flex items-center justify-center text-xs font-mono font-bold text-[#D4AF37] group-hover:border-[#D4AF37]/50 transition-colors">
                    0{idx + 1}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-white font-medium mb-1 group-hover:text-[#D4AF37] transition-colors">{q.question}</div>
                    <div className="flex items-center justify-between">
                      <div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">{q.count} times</div>
                      <div className="text-[10px] text-emerald-500 font-mono">{q.growth}</div>
                    </div>
                    <div className="mt-2 w-full h-[1px] bg-white/5"></div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all">
               Deep Analysis Repo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}