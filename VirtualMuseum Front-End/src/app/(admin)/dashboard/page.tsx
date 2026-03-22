"use client";
import React from "react";
import { motion } from "framer-motion";
// السطر المتصلح (شيلنا المسافة وخليناها ShieldCheck)
import { Package, Users, MessageSquare, Eye, TrendingUp, Clock, ShieldCheck, Activity } from "lucide-react";
import {
  BarChart, Bar, PieChart, Pie, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from "recharts";

// --- بيانات الإحصائيات المحدثة ---
const stats = [
  { label: "Total Artifacts", value: "2,847", icon: Package, change: "+12.5%", color: "text-[#D4AF37]" },
  { label: "Registered Users", value: "15,432", icon: Users, change: "+8.2%", color: "text-blue-500" },
  { label: "AI Conversations", value: "45,281", icon: MessageSquare, change: "+23.1%", color: "text-[#D4AF37]" },
  { label: "Live Visitors", value: "1,234", icon: Eye, change: "+5.7%", color: "text-emerald-500" },
];

const visitorData = [
  { month: "Jan", visitors: 4200 }, { month: "Feb", visitors: 5100 },
  { month: "Mar", visitors: 6800 }, { month: "Apr", visitors: 5900 },
  { month: "May", visitors: 7200 }, { month: "Jun", visitors: 8500 },
];

const eraDistribution = [
  { name: "Pharaonic", value: 1847, color: "#d4af37" },
  { name: "Greek", value: 562, color: "#c19a6b" },
  { name: "Roman", value: 438, color: "#8b6f47" },
];

const mostViewedArtifacts = [
  { name: "Tut Mask", views: 12450 }, { name: "Rosetta Stone", views: 10230 },
  { name: "Nefertiti", views: 9870 }, { name: "Sphinx", views: 8920 },
  { name: "Cleopatra", views: 7650 },
];

const activityTimeline = [
  { action: "New artifact added: Scarab Amulet", time: "2 hours ago", user: "Admin", type: "add" },
  { action: "3D Model 'Tut Mask' optimized", time: "4 hours ago", user: "System", type: "system" },
  { action: "Security scan completed: 0 threats", time: "6 hours ago", user: "Shield", type: "security" },
  { action: "Chatbot knowledge base updated", time: "8 hours ago", user: "Admin", type: "update" },
];

export default function dashboard() {
  return (
    <div className="p-8 space-y-10 min-h-screen pb-20">
      
      {/* ================= Header ================= */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-serif font-bold text-white mb-2 tracking-tight">Museum Oversight</h1>
        <p className="text-gray-500 text-sm font-medium tracking-wide">Command center for the world's most prestigious digital collection.</p>
      </motion.div>

      {/* ================= Stats Grid ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            key={stat.label} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}
            className="bg-[#111] border border-white/5 rounded-3xl p-6 shadow-xl group hover:border-[#D4AF37]/30 transition-all"
          >
            <div className="flex items-start justify-between mb-6">
              <div className={`p-3 bg-white/5 rounded-2xl group-hover:bg-[#D4AF37]/10 transition-colors`}>
                <stat.icon className={`w-7 h-7 ${stat.color}`} />
              </div>
              <span className="text-[10px] font-black text-emerald-500 flex items-center gap-1 bg-emerald-500/10 px-2 py-1 rounded-full border border-emerald-500/20">
                <TrendingUp className="w-3 h-3" /> {stat.change}
              </span>
            </div>
            <div className="text-3xl font-bold text-white mb-1 font-mono">{stat.value}</div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* ================= Charts Row ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Visitor Analytics */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-[#111] border border-white/5 rounded-3xl p-8 shadow-2xl">
          <h3 className="text-lg font-serif font-bold text-white mb-8">Visitor Traffic Analytics</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={visitorData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
              <XAxis dataKey="month" stroke="#4b5563" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#4b5563" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: "#111", border: "1px solid rgba(212,175,55,0.3)", borderRadius: "12px" }}
                itemStyle={{ color: "#D4AF37", fontWeight: "bold" }}
              />
              <Line type="monotone" dataKey="visitors" stroke="#d4af37" strokeWidth={3} dot={{ r: 4, fill: "#d4af37" }} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Era Distribution */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-[#111] border border-white/5 rounded-3xl p-8 shadow-2xl">
          <h3 className="text-lg font-serif font-bold text-white mb-8">Artifact Era Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={eraDistribution}
                cx="50%" cy="50%"
                innerRadius={60} outerRadius={100}
                paddingAngle={8}
                dataKey="value"
              >
                {eraDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: "#111", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-4">
            {eraDistribution.map(era => (
              <div key={era.name} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{backgroundColor: era.color}}></div>
                <span className="text-[10px] uppercase font-bold text-gray-400">{era.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ================= Bottom Row ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Most Viewed Bar Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#111] border border-white/5 rounded-3xl p-8 shadow-2xl">
          <h3 className="text-lg font-serif font-bold text-white mb-8">Top Viewed 3D Treasures</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={mostViewedArtifacts}>
              <XAxis dataKey="name" stroke="#4b5563" fontSize={10} axisLine={false} tickLine={false} />
              <Tooltip cursor={{fill: 'rgba(255,255,255,0.02)'}} contentStyle={{ backgroundColor: "#111", border: "1px solid #D4AF37", borderRadius: "8px" }} />
              <Bar dataKey="views" fill="#D4AF37" radius={[6, 6, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Activity Timeline */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#111] border border-white/5 rounded-3xl p-8 shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between mb-8">
             <h3 className="text-lg font-serif font-bold text-white">System Logs</h3>
             <Activity className="text-[#D4AF37]/50" size={18} />
          </div>
          <div className="space-y-6 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[1px] before:bg-white/10">
            {activityTimeline.map((activity, idx) => (
              <div key={idx} className="flex gap-4 relative z-10">
                <div className={`w-[24px] h-[24px] rounded-full flex items-center justify-center border-4 border-[#111] ${
                  activity.type === 'add' ? 'bg-emerald-500' : 
                  activity.type === 'security' ? 'bg-blue-500' : 'bg-[#D4AF37]'
                }`}></div>
                <div className="flex-1">
                  <div className="text-sm font-bold text-gray-200">{activity.action}</div>
                  <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">
                    {activity.time} • <span className="text-[#D4AF37]">{activity.user}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}