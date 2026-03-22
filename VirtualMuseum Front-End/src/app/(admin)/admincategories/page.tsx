"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit, Trash2, Package, X, Layers } from "lucide-react";

// --- الداتا الوهمية ---
const categoriesData = [
  { id: 1, name: "Royal Artifacts", count: 342, icon: "👑", color: "#d4af37" },
  { id: 2, name: "Jewelry", count: 587, icon: "💎", color: "#daa520" },
  { id: 3, name: "Sculptures", count: 423, icon: "🗿", color: "#c19a6b" },
  { id: 4, name: "Inscriptions", count: 298, icon: "📜", color: "#b8860b" },
  { id: 5, name: "Daily Life", count: 456, icon: "🏺", color: "#8b6f47" },
  { id: 6, name: "Religious", count: 389, icon: "🔱", color: "#cd853f" },
  { id: 7, name: "Weapons & Armor", count: 167, icon: "⚔️", color: "#996515" },
  { id: 8, name: "Pottery", count: 521, icon: "🫙", color: "#a0826d" },
];

export default function admincategories() {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="p-8 space-y-8 min-h-screen">
      
      {/* ================= Header ================= */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-white mb-2">Classifications</h1>
          <p className="text-gray-400 text-sm">Organize the museum's treasures into historical eras and types.</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-[#D4AF37] text-black font-bold rounded-xl hover:bg-[#b5952f] transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)] active:scale-95"
        >
          <Plus className="w-5 h-5" />
          Add Category
        </button>
      </div>

      {/* ================= Categories Grid ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categoriesData.map((category, index) => (
          <motion.div 
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group relative bg-[#111] border border-white/5 rounded-2xl p-6 hover:border-[#D4AF37]/40 transition-all duration-500 shadow-xl"
          >
            {/* الخلفية المضيئة عند الهوفر */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 rounded-2xl pointer-events-none"
              style={{ backgroundColor: category.color }}
            />

            <div className="flex items-start justify-between mb-6 relative z-10">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-inner border border-white/5 group-hover:scale-110 transition-transform duration-500"
                style={{ backgroundColor: `${category.color}15` }}
              >
                {category.icon}
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-gray-500 hover:text-[#D4AF37] hover:bg-white/5 rounded-lg transition-all">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/5 rounded-lg transition-all">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="relative z-10">
              <h3 className="text-white text-lg font-serif font-bold mb-2 group-hover:text-[#D4AF37] transition-colors">
                {category.name}
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-500 font-medium tracking-wide">
                <Package className="w-4 h-4 text-[#D4AF37]" />
                <span className="font-mono">{category.count.toLocaleString()}</span> items cataloged
              </div>
            </div>
            
            {/* تزيين هيروغليفي باهت */}
            <div className="absolute bottom-2 right-4 text-white opacity-[0.02] text-4xl select-none group-hover:opacity-[0.05] transition-opacity">
               𓋹
            </div>
          </motion.div>
        ))}
      </div>

      {/* ================= Add Modal ================= */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 flex items-center justify-center z-[100] px-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-[#111] border border-white/10 rounded-3xl p-8 w-full max-w-xl relative z-10 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                   <div className="p-2 bg-[#D4AF37]/10 rounded-lg"><Layers className="text-[#D4AF37]" size={20}/></div>
                   <h2 className="text-2xl font-serif font-bold text-white">Create Category</h2>
                </div>
                <button onClick={() => setShowAddModal(false)} className="p-2 text-gray-500 hover:text-white transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-6">
                <div className="group">
                  <label className="block text-xs font-bold text-[#D4AF37] uppercase tracking-widest mb-2 group-focus-within:text-white transition-colors">
                    Category Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-[#D4AF37]/50 transition-all"
                    placeholder="e.g., Royal Statues"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#D4AF37] uppercase tracking-widest mb-2">Description</label>
                  <textarea
                    rows={4}
                    className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-[#D4AF37]/50 transition-all resize-none"
                    placeholder="Briefly define the types of artifacts in this category..."
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button className="flex-1 px-6 py-4 bg-[#D4AF37] text-black font-black uppercase tracking-widest rounded-2xl hover:bg-[#b5952f] transition-all active:scale-95 shadow-xl">
                    Save Collection
                  </button>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 px-6 py-4 bg-white/5 text-white font-bold rounded-2xl hover:bg-white/10 transition-all border border-white/10"
                  >
                    Cancel
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