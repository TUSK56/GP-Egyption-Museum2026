"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Landmark, Globe, Thermometer, Eye, Activity } from 'lucide-react';

const MuseumPulse = () => {
  // محاكاة بيانات حية تهم الزائر
  const [activeExplorers, setActiveExplorers] = useState(1240);
  const [experienceFlow, setExperienceFlow] = useState(98);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveExplorers(prev => prev + Math.floor(Math.random() * 5) - 2);
      setExperienceFlow(prev => Math.min(Math.max(prev + Math.floor(Math.random() * 2) - 1, 95), 100));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { 
      label: "Active Explorers", 
      value: activeExplorers.toLocaleString(), 
      icon: <Users className="text-blue-400" />, 
      desc: "People currently touring the digital galleries" 
    },
    { 
      label: "Museum Climate", 
      value: "22°C", 
      icon: <Thermometer className="text-orange-400" />, 
      desc: "Optimal preservation temperature for artifacts" 
    },
    { 
      label: "Digital Artifacts", 
      value: "4,500+", 
      icon: <Landmark className="text-[#D4AF37]" />, 
      desc: "High-definition 3D scanned masterpieces" 
    },
    { 
      label: "Stream Quality", 
      value: `${experienceFlow}%`, 
      icon: <Globe className="text-green-400" />, 
      desc: "Real-time synchronization for 4K immersion" 
    },
  ];

  return (
    <section className="py-24 bg-[#080808] relative overflow-hidden">
      {/* خلفية جمالية */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#D4AF37 0.5px, transparent 0.5px)', backgroundSize: '30px 30px' }}></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header - موجه للزائر */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="text-left">
            <h2 className="text-[#D4AF37] font-black uppercase tracking-[0.3em] text-xs mb-3 flex items-center gap-2">
              <Activity size={16} className="animate-pulse" /> Live Museum Pulse
            </h2>
            <h3 className="text-4xl md:text-5xl font-serif font-bold text-white leading-tight">
              Experience the History <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-[#D4AF37]">In Real-Time</span>
            </h3>
          </div>
          <div className="bg-[#D4AF37]/10 backdrop-blur-md border border-[#D4AF37]/20 p-4 rounded-2xl flex items-center gap-4">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
            <span className="text-[#D4AF37] text-sm font-mono tracking-tighter uppercase">Live Gallery Access: Open</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -10, backgroundColor: "rgba(212,175,55,0.05)" }}
              className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <h4 className="text-3xl font-black text-white mb-1 font-mono tracking-tighter">
                {stat.value}
              </h4>
              <p className="text-[#D4AF37] font-bold text-[10px] uppercase tracking-widest mb-4">
                {stat.label}
              </p>
              <div className="h-[1px] w-full bg-gradient-to-r from-[#D4AF37]/30 to-transparent mb-4"></div>
              <p className="text-gray-400 text-xs leading-relaxed">
                {stat.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* User Interaction Note */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-16 p-6 rounded-2xl border border-white/10 bg-white/5 flex flex-col md:flex-row items-center gap-6"
        >
          <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-[#D4AF37]">
            <Eye size={24} />
          </div>
          <div className="text-left">
            <h5 className="text-white font-bold text-sm uppercase">Interactive Experience</h5>
            <p className="text-gray-400 text-xs mt-1 max-w-3xl">
              Our digital twin technology synchronizes the virtual environment with the physical museum's conditions. 
              As you explore, you are viewing live data from our smart sensors, ensuring your virtual tour is as authentic as being there.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MuseumPulse;