"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, UserCheck, UserX, Eye, Shield, 
  Ban, Mail, Calendar, Activity, Crown 
} from "lucide-react";

// --- الداتا الوهمية للمستخدمين ---
const usersData = [
  { id: 1, name: "Ahmed Hassan", email: "ahmed.hassan@gem.com", joinDate: "2026-01-15", status: "active", lastActive: "2 hours ago", artifactViews: 245, role: "User" },
  { id: 2, name: "Sarah Mohamed", email: "sarah.m@history.org", joinDate: "2026-01-20", status: "active", lastActive: "1 day ago", artifactViews: 189, role: "User" },
  { id: 3, name: "Omar Ali", email: "omar.ali@ancient.eg", joinDate: "2025-12-10", status: "suspended", lastActive: "5 days ago", artifactViews: 423, role: "User" },
  { id: 4, name: "Fatima Ibrahim", email: "fatima.v@premium.com", joinDate: "2026-02-01", status: "active", lastActive: "5 hours ago", artifactViews: 567, role: "Premium" },
  { id: 5, name: "Karim Youssef", email: "karim.y@museum.com", joinDate: "2026-01-08", status: "active", lastActive: "30 minutes ago", artifactViews: 834, role: "User" },
];

export default function Users() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredUsers = usersData.filter(
    (user) =>
      (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === "all" || user.status === statusFilter)
  );

  return (
    <div className="p-8 space-y-10 min-h-screen pb-20">
      
      {/* ================= Header ================= */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="text-3xl font-serif font-bold text-white mb-2 tracking-tight">Citizen Registry</h1>
          <p className="text-gray-400 text-sm font-medium italic">"Governing the digital inhabitants of the Grand Egyptian Museum."</p>
        </motion.div>
      </div>

      {/* ================= Stats Grid ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Population", value: "15,432", icon: UserCheck, color: "text-[#D4AF37]" },
          { label: "Active Souls", value: "1,234", icon: Activity, color: "text-emerald-500" },
          { label: "Premium Nobles", value: "3,421", icon: Crown, color: "text-[#D4AF37]" },
          { label: "Exiled Accounts", value: "87", icon: Ban, color: "text-red-500" },
        ].map((stat, i) => (
          <motion.div 
            key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="bg-[#111] border border-white/5 rounded-[1.8rem] p-6 shadow-xl hover:border-[#D4AF37]/20 transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-white/10 transition-colors">
                <stat.icon size={22} className={stat.color} />
              </div>
            </div>
            <div className="text-3xl font-bold text-white font-mono">{stat.value}</div>
            <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mt-1">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* ================= Search & Filter ================= */}
      <div className="bg-[#111] border border-white/5 rounded-2xl p-4 shadow-xl flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#D4AF37] transition-colors" size={18} />
          <input
            type="text"
            placeholder="Search by name, email, or credentials..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-[#D4AF37]/50 transition-all"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-white/5 border border-white/10 rounded-xl px-6 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37]/50 cursor-pointer"
        >
          <option value="all" className="bg-[#111]">Global Status</option>
          <option value="active" className="bg-[#111]">Active Only</option>
          <option value="suspended" className="bg-[#111]">Suspended Only</option>
        </select>
      </div>

      {/* ================= Users Table ================= */}
      <div className="bg-[#111] border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/[0.02] border-b border-white/5">
              <tr>
                <th className="px-6 py-5 text-left text-xs text-gray-500 uppercase tracking-widest font-black">Citizen Identity</th>
                <th className="px-6 py-5 text-left text-xs text-gray-500 uppercase tracking-widest font-black">Role</th>
                <th className="px-6 py-5 text-left text-xs text-gray-500 uppercase tracking-widest font-black text-center">Interactions</th>
                <th className="px-6 py-5 text-left text-xs text-gray-500 uppercase tracking-widest font-black">History</th>
                <th className="px-6 py-5 text-left text-xs text-gray-500 uppercase tracking-widest font-black">Status</th>
                <th className="px-6 py-5 text-center text-xs text-gray-500 uppercase tracking-widest font-black">Authority</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <AnimatePresence>
                {filteredUsers.map((user, idx) => (
                  <motion.tr 
                    key={user.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 }}
                    className="hover:bg-white/[0.01] transition-colors group"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className={`w-11 h-11 rounded-full flex items-center justify-center text-lg font-black border-2 ${
                          user.role === "Premium" ? "bg-[#D4AF37]/10 border-[#D4AF37]/50 text-[#D4AF37]" : "bg-white/5 border-white/10 text-white"
                        }`}>
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white group-hover:text-[#D4AF37] transition-colors">{user.name}</div>
                          <div className="text-[10px] text-gray-500 font-medium flex items-center gap-1"><Mail size={10}/> {user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                        user.role === "Premium" ? "bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/20" : "bg-white/5 text-gray-400 border-white/10"
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <div className="text-sm font-bold text-white font-mono">{user.artifactViews}</div>
                      <div className="text-[9px] text-gray-600 font-black uppercase tracking-tighter">Views</div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="text-xs text-gray-300 font-medium">{user.lastActive}</div>
                      <div className="text-[9px] text-gray-600 flex items-center gap-1 mt-1"><Calendar size={10}/> Joined {user.joinDate}</div>
                    </td>
                    <td className="px-6 py-5">
                      {user.status === "active" ? (
                        <div className="flex items-center gap-2 text-emerald-500">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="text-[10px] font-black uppercase tracking-widest">Authorized</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-red-500">
                          <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                          <span className="text-[10px] font-black uppercase tracking-widest">Exiled</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-5 text-center">
                      <div className="flex items-center justify-center gap-3">
                        <button className="p-2 text-gray-500 hover:text-white transition-all bg-white/5 rounded-lg border border-white/5 hover:border-white/20" title="Inspect"><Eye size={16} /></button>
                        <button className={`p-2 transition-all bg-white/5 rounded-lg border border-white/5 ${
                          user.status === 'active' ? 'text-gray-500 hover:text-red-500 hover:border-red-500/30' : 'text-red-500 hover:text-emerald-500 hover:border-emerald-500/30'
                        }`} title={user.status === 'active' ? 'Suspend' : 'Unsuspend'}>
                          {user.status === 'active' ? <Ban size={16} /> : <UserCheck size={16} />}
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
    </div>
  );
}