"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit, Trash2, Clock, X, Calendar, Globe } from "lucide-react";

// --- الداتا الوهمية للعصور التاريخية ---
const erasData = [
  {
    id: 1,
    name: "Pharaonic",
    period: "3100 BCE - 332 BCE",
    artifactCount: 1847,
    description: "The foundation of Egyptian identity, from the Early Dynastic Period to the Late Period.",
    color: "#d4af37",
  },
  {
    id: 2,
    name: "Greek (Ptolemaic)",
    period: "332 BCE - 30 BCE",
    artifactCount: 562,
    description: "The era of fusion between Hellenistic culture and ancient Egyptian traditions.",
    color: "#c19a6b",
  },
  {
    id: 3,
    name: "Roman",
    period: "30 BCE - 641 CE",
    artifactCount: 438,
    description: "Egypt as the breadbasket of Rome, featuring unique Greco-Roman artistic influences.",
    color: "#8b6f47",
  },
];

export default function HistoricalEras() {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="p-8 space-y-10 min-h-screen">
      
      {/* ================= Header ================= */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-white mb-2">Chronological Eras</h1>
          <p className="text-gray-400 text-sm">Define and manage the historical timelines of the GEM collection.</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-[#D4AF37] text-black font-black uppercase tracking-tighter rounded-xl hover:bg-[#b5952f] transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)] active:scale-95"
        >
          <Plus className="w-5 h-5" />
          Create New Era
        </button>
      </div>

      {/* ================= Eras Grid ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {erasData.map((era, index) => (
          <motion.div 
            key={era.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-[#111] border border-white/5 rounded-[2.5rem] p-8 hover:border-[#D4AF37]/30 transition-all duration-500 shadow-2xl overflow-hidden"
          >
            {/* إضاءة خلفية ناعمة */}
            <div 
              className="absolute -right-20 -top-20 w-40 h-40 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700 blur-[50px] rounded-full"
              style={{ backgroundColor: era.color }}
            />

            <div className="flex items-start justify-between mb-8 relative z-10">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center border border-white/5 shadow-inner transition-transform duration-500 group-hover:rotate-[360deg]"
                style={{ backgroundColor: `${era.color}15` }}
              >
                <Clock className="w-7 h-7" style={{ color: era.color }} />
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-gray-500 hover:text-[#D4AF37] hover:bg-white/5 rounded-full transition-all">
                  <Edit size={18} />
                </button>
                <button className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/5 rounded-full transition-all">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <div className="relative z-10 space-y-4">
              <div>
                <h3 className="text-2xl font-serif font-bold text-white mb-1 group-hover:text-[#D4AF37] transition-colors">
                  {era.name}
                </h3>
                <div className="flex items-center gap-2 text-[#D4AF37] text-[10px] font-black uppercase tracking-widest bg-[#D4AF37]/5 px-3 py-1 rounded-full w-fit border border-[#D4AF37]/20">
                  <Calendar size={10} /> {era.period}
                </div>
              </div>

              <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 font-medium">
                {era.description}
              </p>

              <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-gray-600 tracking-[0.2em]">Archived Assets</span>
                <span className="text-xl font-mono font-bold text-white">
                  {era.artifactCount.toLocaleString()}
                </span>
              </div>
            </div>
            
            {/* نقش هيروغليفي للزينة */}
            <div className="absolute -bottom-4 -right-2 text-[5rem] opacity-[0.02] text-white font-serif select-none pointer-events-none group-hover:opacity-[0.05] transition-opacity">
              𓋹
            </div>
          </motion.div>
        ))}
      </div>

      {/* ================= Add Era Modal ================= */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 flex items-center justify-center z-[100] px-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-[#0a0a0f] border border-white/10 rounded-[2.5rem] p-10 w-full max-w-xl relative z-10 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-4">
                   <div className="p-3 bg-[#D4AF37]/10 rounded-2xl border border-[#D4AF37]/20"><Globe className="text-[#D4AF37]" size={24}/></div>
                   <h2 className="text-2xl font-serif font-bold text-white">New Historical Era</h2>
                </div>
                <button onClick={() => setShowAddModal(false)} className="p-2 text-gray-500 hover:text-white transition-colors bg-white/5 rounded-full">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.2em] mb-3">Era Designation</label>
                  <input
                    type="text"
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-[#D4AF37]/50 transition-all font-medium"
                    placeholder="e.g., Middle Kingdom"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.2em] mb-3">Time Range</label>
                  <input
                    type="text"
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-[#D4AF37]/50 transition-all font-medium"
                    placeholder="e.g., 2055 BCE – 1650 BCE"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.2em] mb-3">Historical Narrative</label>
                  <textarea
                    rows={3}
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-[#D4AF37]/50 transition-all resize-none font-medium"
                    placeholder="Describe the significance of this era..."
                  />
                </div>

                <div className="flex gap-4 pt-6">
                  <button className="flex-1 px-6 py-4 bg-[#D4AF37] text-black font-black uppercase tracking-widest rounded-2xl hover:bg-[#b5952f] transition-all shadow-xl active:scale-95">
                    Save Era
                  </button>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 px-6 py-4 bg-white/5 text-gray-400 font-bold rounded-2xl hover:bg-white/10 transition-all border border-white/10"
                  >
                    Discard
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}