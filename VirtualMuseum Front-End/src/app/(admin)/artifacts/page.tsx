"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, Edit, Trash2, Upload, Filter, X, Eye, Box } from "lucide-react";

// --- الداتا الوهمية ---
const artifacts = [
  { id: 1, name: "Tutankhamun's Golden Mask", era: "Pharaonic", category: "Royal Artifacts", location: "Hall A - Room 3", views: 12450, has3D: true, image: "🎭" },
  { id: 2, name: "Rosetta Stone Replica", era: "Ptolemaic", category: "Inscriptions", location: "Hall B - Room 1", views: 10230, has3D: true, image: "📜" },
  { id: 3, name: "Nefertiti Bust", era: "Pharaonic", category: "Sculptures", location: "Hall A - Room 5", views: 9870, has3D: true, image: "🗿" },
  { id: 4, name: "Scarab Amulet", era: "Pharaonic", category: "Jewelry", location: "Hall C - Room 2", views: 5420, has3D: false, image: "💎" },
  { id: 5, name: "Bronze Mirror", era: "Roman", category: "Daily Life", location: "Hall D - Room 1", views: 3210, has3D: true, image: "🪞" },
];

export default function Artifacts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEra, setSelectedEra] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredArtifacts = artifacts.filter(
    (artifact) =>
      artifact.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedEra === "all" || artifact.era === selectedEra)
  );

  return (
    <div className="p-8 space-y-8 min-h-screen">
      
      {/* ================= Header ================= */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-white mb-2">Artifacts Management</h1>
          <p className="text-gray-400 text-sm">Create, edit, and organize museum treasures.</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-[#D4AF37] text-black font-bold rounded-xl hover:bg-[#b5952f] transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)] active:scale-95"
        >
          <Plus className="w-5 h-5" />
          Add New Artifact
        </button>
      </div>

      {/* ================= Filters ================= */}
      <div className="bg-[#111] border border-white/5 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-[#D4AF37] transition-colors" />
            <input
              type="text"
              placeholder="Search by name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/50 transition-all"
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
              <Filter className="w-5 h-5 text-gray-500" />
            </div>
            <select
              value={selectedEra}
              onChange={(e) => setSelectedEra(e.target.value)}
              className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#D4AF37]/50 transition-all cursor-pointer"
            >
              <option value="all" className="bg-[#111]">All Eras</option>
              <option value="Pharaonic" className="bg-[#111]">Pharaonic</option>
              <option value="Greek" className="bg-[#111]">Greek</option>
              <option value="Roman" className="bg-[#111]">Roman</option>
              <option value="Ptolemaic" className="bg-[#111]">Ptolemaic</option>
            </select>
          </div>
        </div>
      </div>

      {/* ================= Artifacts Table ================= */}
      <div className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5 border-b border-white/5">
              <tr>
                <th className="px-6 py-5 text-left text-xs text-gray-500 uppercase tracking-widest font-bold">Artifact</th>
                <th className="px-6 py-5 text-left text-xs text-gray-500 uppercase tracking-widest font-bold">Era</th>
                <th className="px-6 py-5 text-left text-xs text-gray-500 uppercase tracking-widest font-bold">Category</th>
                <th className="px-6 py-5 text-left text-xs text-gray-500 uppercase tracking-widest font-bold">Location</th>
                <th className="px-6 py-5 text-left text-xs text-gray-500 uppercase tracking-widest font-bold">Analytics</th>
                <th className="px-6 py-5 text-left text-xs text-gray-500 uppercase tracking-widest font-bold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <AnimatePresence>
                {filteredArtifacts.map((artifact, index) => (
                  <motion.tr 
                    key={artifact.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-white/[0.02] transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#050505] border border-white/10 rounded-xl flex items-center justify-center text-2xl group-hover:border-[#D4AF37]/50 transition-colors shadow-inner">
                          {artifact.image}
                        </div>
                        <div>
                          <div className="text-white font-medium group-hover:text-[#D4AF37] transition-colors">{artifact.name}</div>
                          <div className="text-[10px] text-gray-600 font-mono tracking-tighter">ID: GEM-ART-00{artifact.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 rounded-full text-[10px] font-bold uppercase tracking-wider">
                        {artifact.era}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-400 text-sm font-medium">{artifact.category}</td>
                    <td className="px-6 py-4 text-gray-500 text-xs">{artifact.location}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Eye size={14} className="text-emerald-500" />
                        <span className="text-white font-mono text-sm">{artifact.views.toLocaleString()}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button className="p-2 text-gray-400 hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 rounded-xl transition-all" title="Edit">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-emerald-500 hover:bg-emerald-500/10 rounded-xl transition-all" title="Upload 3D">
                          <Box className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
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
              className="bg-[#111] border border-white/10 rounded-3xl p-8 w-full max-w-2xl relative z-10 shadow-2xl max-h-[90vh] overflow-y-auto scrollbar-hide"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-serif font-bold text-white">Add Royal Artifact</h2>
                <button onClick={() => setShowAddModal(false)} className="p-2 text-gray-500 hover:text-white transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-6">
                <div className="group">
                  <label className="block text-xs font-bold text-[#D4AF37] uppercase tracking-widest mb-2 group-focus-within:text-white transition-colors">Artifact Name</label>
                  <input
                    type="text"
                    className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-[#D4AF37]/50 transition-all"
                    placeholder="e.g., Statue of Anubis"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-[#D4AF37] uppercase tracking-widest mb-2">Historical Era</label>
                    <select className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-[#D4AF37]/50 transition-all appearance-none cursor-pointer">
                      <option className="bg-[#111]">Pharaonic</option>
                      <option className="bg-[#111]">Greek</option>
                      <option className="bg-[#111]">Roman</option>
                      <option className="bg-[#111]">Ptolemaic</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#D4AF37] uppercase tracking-widest mb-2">Category</label>
                    <select className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-[#D4AF37]/50 transition-all appearance-none cursor-pointer">
                      <option className="bg-[#111]">Royal Artifacts</option>
                      <option className="bg-[#111]">Jewelry</option>
                      <option className="bg-[#111]">Sculptures</option>
                      <option className="bg-[#111]">Daily Life</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#D4AF37] uppercase tracking-widest mb-2">Museum Location</label>
                  <input
                    type="text"
                    className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-[#D4AF37]/50 transition-all"
                    placeholder="Hall G - Gallery 2"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#D4AF37] uppercase tracking-widest mb-2">Historical Description</label>
                  <textarea
                    rows={4}
                    className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-[#D4AF37]/50 transition-all resize-none"
                    placeholder="Tell the story of this artifact..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#D4AF37] uppercase tracking-widest mb-2">Visual Content</label>
                  <div className="border-2 border-dashed border-white/10 rounded-2xl p-10 text-center hover:border-[#D4AF37]/50 transition-all cursor-pointer group bg-white/[0.01]">
                    <Upload className="w-10 h-10 text-gray-600 mx-auto mb-4 group-hover:text-[#D4AF37] group-hover:scale-110 transition-all" />
                    <p className="text-sm text-gray-500 font-medium group-hover:text-gray-300">Drop artifact photos or click to browse</p>
                    <p className="text-[10px] text-gray-700 mt-2">Supports JPG, PNG, WEBP up to 10MB</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button className="flex-1 px-6 py-4 bg-[#D4AF37] text-black font-black uppercase tracking-widest rounded-2xl hover:bg-[#b5952f] transition-all active:scale-95 shadow-xl">
                    Register Artifact
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