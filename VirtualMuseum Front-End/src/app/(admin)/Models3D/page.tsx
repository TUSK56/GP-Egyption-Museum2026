"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Upload, Eye, Download, Trash2, Box, 
  CheckCircle, Clock, X, Database, HardDrive, BarChart3 
} from "lucide-react";

// --- الداتا الوهمية للنماذج ---
const modelsData = [
  { id: 1, name: "Tutankhamun's Mask", artifact: "Tutankhamun's Golden Mask", fileSize: "45.2 MB", format: "GLB", uploadDate: "2026-02-15", views: 12450, status: "active" },
  { id: 2, name: "Rosetta Stone", artifact: "Rosetta Stone Replica", fileSize: "32.8 MB", format: "GLB", uploadDate: "2026-02-10", views: 10230, status: "active" },
  { id: 3, name: "Nefertiti Bust", artifact: "Nefertiti Bust", fileSize: "38.5 MB", format: "GLB", uploadDate: "2026-02-08", views: 9870, status: "active" },
  { id: 4, name: "Bronze Mirror", artifact: "Bronze Mirror", fileSize: "18.3 MB", format: "GLB", uploadDate: "2026-02-05", views: 3210, status: "processing" },
];

export default function Models3D() {
  const [showUploadModal, setShowUploadModal] = useState(false);

  return (
    <div className="p-8 space-y-10 min-h-screen">
      
      {/* ================= Header ================= */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-white mb-2">Dimension Control</h1>
          <p className="text-gray-400 text-sm">Managing high-fidelity 3D scans and holographic projections.</p>
        </div>
        <button
          onClick={() => setShowUploadModal(true)}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-[#D4AF37] text-black font-black uppercase tracking-tighter rounded-xl hover:bg-[#b5952f] transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)] active:scale-95"
        >
          <Upload className="w-5 h-5" />
          Inject 3D Asset
        </button>
      </div>

      {/* ================= Stats Grid ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Archived Assets", value: "847", icon: Database, color: "text-[#D4AF37]" },
          { label: "Visual Interactions", value: "45.2K", icon: BarChart3, color: "text-emerald-500" },
          { label: "Vault Storage", value: "2.4 GB", icon: HardDrive, color: "text-blue-500" },
        ].map((stat, i) => (
          <motion.div 
            key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="bg-[#111] border border-white/5 rounded-2xl p-6 shadow-xl relative overflow-hidden group"
          >
            <div className="flex items-center gap-4 relative z-10">
              <div className="p-3 bg-white/5 rounded-xl border border-white/5 group-hover:border-[#D4AF37]/30 transition-colors">
                <stat.icon size={24} className={stat.color} />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-gray-500 tracking-widest mb-1">{stat.label}</p>
                <p className="text-3xl font-mono font-bold text-white">{stat.value}</p>
              </div>
            </div>
            <Box size={80} className="absolute -bottom-6 -right-6 text-white opacity-[0.02] group-hover:scale-110 transition-transform duration-700" />
          </motion.div>
        ))}
      </div>

      {/* ================= Models Table ================= */}
      <div className="bg-[#111] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/[0.02] border-b border-white/5">
              <tr>
                <th className="px-6 py-5 text-left text-xs text-gray-500 uppercase tracking-widest font-black">Asset Name</th>
                <th className="px-6 py-5 text-left text-xs text-gray-500 uppercase tracking-widest font-black">Linked Artifact</th>
                <th className="px-6 py-5 text-left text-xs text-gray-500 uppercase tracking-widest font-black text-center">Format/Size</th>
                <th className="px-6 py-5 text-left text-xs text-gray-500 uppercase tracking-widest font-black text-center">Engagement</th>
                <th className="px-6 py-5 text-left text-xs text-gray-500 uppercase tracking-widest font-black">Status</th>
                <th className="px-6 py-5 text-center text-xs text-gray-500 uppercase tracking-widest font-black">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {modelsData.map((model, index) => (
                <motion.tr 
                  key={model.id}
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }}
                  className="hover:bg-white/[0.01] transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37]/10 to-transparent rounded-xl flex items-center justify-center border border-[#D4AF37]/20 group-hover:border-[#D4AF37]/50 transition-colors">
                        <Box className="w-6 h-6 text-[#D4AF37]" />
                      </div>
                      <div className="text-white font-medium group-hover:text-[#D4AF37] transition-colors">{model.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-sm font-medium">{model.artifact}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="text-white font-mono text-xs">{model.fileSize}</div>
                    <div className="text-[10px] text-gray-600 font-bold uppercase mt-1">{model.format}</div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex flex-col items-center gap-1">
                       <span className="text-white font-mono font-bold">{model.views.toLocaleString()}</span>
                       <span className="text-[9px] text-gray-600 uppercase font-black tracking-tighter">Views</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {model.status === "active" ? (
                      <div className="flex items-center gap-2 text-emerald-500">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Online</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-orange-400">
                        <Clock className="w-3.5 h-3.5 animate-spin" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Rendering</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-3">
                      <button className="p-2 text-gray-500 hover:text-white transition-all bg-white/5 rounded-lg border border-white/5 hover:border-white/20"><Eye size={16} /></button>
                      <button className="p-2 text-gray-500 hover:text-[#D4AF37] transition-all bg-white/5 rounded-lg border border-white/5 hover:border-[#D4AF37]/30"><Download size={16} /></button>
                      <button className="p-2 text-gray-500 hover:text-red-500 transition-all bg-white/5 rounded-lg border border-white/5 hover:border-red-500/30"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= Upload Modal ================= */}
      <AnimatePresence>
        {showUploadModal && (
          <div className="fixed inset-0 flex items-center justify-center z-[100] px-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowUploadModal(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-[#0a0a0f] border border-white/10 rounded-[2.5rem] p-10 w-full max-w-2xl relative z-10 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-4">
                   <div className="p-3 bg-[#D4AF37]/10 rounded-2xl border border-[#D4AF37]/20"><Upload className="text-[#D4AF37]" size={24}/></div>
                   <h2 className="text-2xl font-serif font-bold text-white">Upload Neural Scan</h2>
                </div>
                <button onClick={() => setShowUploadModal(false)} className="p-2 text-gray-500 hover:text-white transition-colors bg-white/5 rounded-full"><X size={20} /></button>
              </div>

              <div className="space-y-8">
                <div>
                  <label className="block text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.2em] mb-3">Linked Artifact Registry</label>
                  <select className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-[#D4AF37]/50 transition-all font-medium appearance-none">
                    <option className="bg-[#111]">Tutankhamun's Golden Mask</option>
                    <option className="bg-[#111]">Rosetta Stone Replica</option>
                    <option className="bg-[#111]">Nefertiti Bust</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.2em] mb-3">3D Data Package</label>
                  <div className="border-2 border-dashed border-white/10 rounded-[2rem] p-16 text-center hover:border-[#D4AF37]/50 transition-all cursor-pointer group bg-white/[0.01]">
                    <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 300 }}>
                      <Box className="w-16 h-16 text-[#D4AF37]/20 mx-auto mb-6 group-hover:text-[#D4AF37] transition-colors" />
                    </motion.div>
                    <p className="text-lg text-white font-medium mb-2 uppercase tracking-wide">Initiate Asset Upload</p>
                    <p className="text-sm text-gray-500">Universal Formats: GLB, GLTF, FBX (Limit: 100MB)</p>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button className="flex-1 px-6 py-4 bg-[#D4AF37] text-black font-black uppercase tracking-widest rounded-2xl hover:bg-[#b5952f] transition-all shadow-xl active:scale-95">Deploy Model</button>
                  <button onClick={() => setShowUploadModal(false)} className="flex-1 px-6 py-4 bg-white/5 text-gray-400 font-bold rounded-2xl hover:bg-white/10 transition-all border border-white/10">Abort</button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}