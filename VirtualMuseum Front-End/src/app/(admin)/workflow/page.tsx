"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  GitBranch, CheckCircle, XCircle, Clock, 
  AlertTriangle, Play, Activity, Server, 
  Zap, RefreshCw, BarChart3 
} from "lucide-react";

// --- بيانات تدفق العمل ---
const workflows = [
  { id: 1, name: "Auto-tag Artifacts", description: "Semantic tagging via AI Vision", lastRun: "2 hours ago", status: "success", executions: 342, avgDuration: "2.3s" },
  { id: 2, name: "Daily Vault Backup", description: "Immutable backup of artifact registry", lastRun: "8 hours ago", status: "success", executions: 156, avgDuration: "45s" },
  { id: 3, name: "Neural Image Optimization", description: "High-fidelity compression logic", lastRun: "1 hour ago", status: "running", executions: 847, avgDuration: "5.2s" },
  { id: 4, name: "Analytics Resonance Sync", description: "Bi-directional reporting sync", lastRun: "3 hours ago", status: "error", executions: 234, avgDuration: "3.1s" },
  { id: 5, name: "3D Mesh Retopology", description: "Automated 3D model optimization", lastRun: "30 minutes ago", status: "success", executions: 567, avgDuration: "12.7s" },
];

const recentExecutions = [
  { id: 1, workflow: "Auto-tag Artifacts", status: "success", time: "2 hours ago", duration: "2.1s" },
  { id: 2, workflow: "3D Mesh Retopology", status: "success", time: "30 minutes ago", duration: "11.8s" },
  { id: 3, workflow: "Neural Image Optimization", status: "running", time: "1 hour ago", duration: "---" },
  { id: 4, workflow: "Analytics Resonance Sync", status: "error", time: "3 hours ago", duration: "0.8s" },
  { id: 5, workflow: "Daily Vault Backup", status: "success", time: "8 hours ago", duration: "43s" },
];

export default function workflow() {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "success": return { icon: CheckCircle, color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20", glow: "shadow-[0_0_15px_rgba(16,185,129,0.2)]" };
      case "error": return { icon: XCircle, color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/20", glow: "shadow-[0_0_15px_rgba(239,68,68,0.2)]" };
      case "running": return { icon: RefreshCw, color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/20", glow: "shadow-[0_0_15px_rgba(96,165,250,0.2)]", animate: "animate-spin" };
      default: return { icon: AlertTriangle, color: "text-yellow-400", bg: "bg-yellow-400/10", border: "border-yellow-400/20", glow: "" };
    }
  };

  return (
    <div className="p-8 space-y-10 min-h-screen pb-24">
      
      {/* ================= Header ================= */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="text-3xl font-serif font-bold text-white mb-2 flex items-center gap-3">
            <Server className="text-[#D4AF37]" /> Core Engine Monitoring
          </h1>
          <p className="text-gray-400 text-sm italic">"Supervising the automated looms of ancient data."</p>
        </motion.div>
        
        <button className="flex items-center gap-2 px-6 py-3 bg-[#D4AF37] text-black font-black uppercase tracking-widest rounded-xl hover:bg-[#b5952f] transition-all shadow-xl active:scale-95">
          <Zap size={16} fill="black" /> Trigger Global Sync
        </button>
      </div>

      {/* ================= Stats Grid ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Active Pipelines", value: "24", icon: GitBranch, color: "text-[#D4AF37]" },
          { label: "Successful Transmissions", value: "1,847", icon: CheckCircle, color: "text-emerald-500" },
          { label: "Critical Anomalies", value: "12", icon: AlertTriangle, color: "text-red-500" },
          { label: "Threads In-Process", value: "3", icon: Activity, color: "text-blue-400" },
        ].map((stat, i) => (
          <motion.div 
            key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="bg-[#111] border border-white/5 rounded-2xl p-6 shadow-lg group hover:border-[#D4AF37]/30 transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 bg-white/5 rounded-xl"><stat.icon size={20} className={stat.color} /></div>
              <div className="w-10 h-1 bg-white/5 rounded-full overflow-hidden">
                 <div className={`h-full ${stat.color.replace('text', 'bg')} w-2/3`} />
              </div>
            </div>
            <div className="text-3xl font-mono font-bold text-white">{stat.value}</div>
            <div className="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em] mt-1">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* ================= Active Workflows ================= */}
      <div className="bg-[#111] border border-white/5 rounded-[2.5rem] p-8 shadow-2xl">
        <h3 className="text-xl font-serif font-bold text-white mb-8 flex items-center gap-3">
          <BarChart3 size={20} className="text-[#D4AF37]" /> Operational Flux
        </h3>
        <div className="space-y-4">
          {workflows.map((wf, idx) => {
            const config = getStatusConfig(wf.status);
            return (
              <motion.div
                key={wf.id}
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 }}
                className="group flex flex-col xl:flex-row items-start xl:items-center justify-between p-6 bg-white/2 border border-white/5 rounded-2xl hover:bg-white/4 transition-all"
              >
                <div className="flex items-center gap-6 mb-4 xl:mb-0">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${config.border} ${config.bg} ${config.glow}`}>
                    <config.icon className={`${config.color} ${config.animate || ''}`} size={22} />
                  </div>
                  <div>
                    <div className="text-white font-bold mb-1 group-hover:text-[#D4AF37] transition-colors">{wf.name}</div>
                    <div className="text-xs text-gray-500 font-medium">{wf.description}</div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-8 xl:gap-12">
                  <div className="text-center">
                    <div className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-1">Heartbeat</div>
                    <div className="text-xs text-gray-300 font-mono">{wf.lastRun}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-1">Cycle Count</div>
                    <div className="text-xs text-gray-300 font-mono">{wf.executions}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-1">Latency</div>
                    <div className="text-xs text-[#D4AF37] font-mono font-bold">{wf.avgDuration}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${config.bg} ${config.color} ${config.border}`}>
                      {wf.status}
                    </span>
                    <button className="p-2.5 bg-white/5 hover:bg-[#D4AF37] hover:text-black text-[#D4AF37] rounded-xl transition-all border border-white/5 active:scale-90">
                      <Play size={14} fill="currentColor" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ================= Recent Executions Table ================= */}
      <div className="bg-[#111] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
        <div className="p-8 border-b border-white/5 bg-white/1">
          <h3 className="text-lg font-serif font-bold text-white">Telemetric Logs</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/2 text-gray-500 text-[10px] font-black uppercase tracking-[0.2em]">
              <tr>
                <th className="px-8 py-5 text-left">Process Identity</th>
                <th className="px-8 py-5 text-left">State</th>
                <th className="px-8 py-5 text-left">Timestamp</th>
                <th className="px-8 py-5 text-right">Execution Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {recentExecutions.map((exec, idx) => {
                const config = getStatusConfig(exec.status);
                return (
                  <motion.tr 
                    key={exec.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 + (idx * 0.05) }}
                    className="hover:bg-white/1 transition-colors"
                  >
                    <td className="px-8 py-5 text-sm font-bold text-gray-200">{exec.workflow}</td>
                    <td className="px-8 py-5">
                      <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${config.color}`}>
                        <config.icon size={12} className={config.animate || ''} /> {exec.status}
                      </div>
                    </td>
                    <td className="px-8 py-5 text-xs text-gray-500 font-medium font-mono">{exec.time}</td>
                    <td className="px-8 py-5 text-right text-xs text-[#D4AF37] font-bold font-mono">{exec.duration}</td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}