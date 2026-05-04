"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Compass, Map } from 'lucide-react';

export default function MuseumLocation() {
  // دالة فتح جوجل ماب (تم تصحيح الرابط هنا)
  const openGoogleMaps = () => {
    const destination = "Grand+Egyptian+Museum,+Giza";
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${destination}`;
    window.open(mapUrl, '_blank');
  };

  // إحداثيات الدبابيس الذهبية حوالين المتحف
  const nearbyPins = [
    { id: 1, top: '30%', left: '40%' },
    { id: 2, top: '45%', left: '30%' },
    { id: 3, top: '60%', left: '45%' },
    { id: 4, top: '35%', left: '65%' },
    { id: 5, top: '75%', left: '40%' },
  ];

  return (
    <section className="py-24 bg-[#050505] relative overflow-hidden border-t border-white/5">
      
      {/* شبكة إحداثيات جمالية */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16 relative z-10">
        
        {/* الجزء الأيسر: الخريطة المكبرة والذهبية */}
        <div className="relative w-full md:w-1/2 flex justify-center items-center">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            // تكبير الفريم: max-w-[650px]
            className="relative bg-[#111] p-3 rounded-[2.5rem] border border-[#D4AF37]/30 shadow-[0_0_60px_rgba(212,175,55,0.15)] overflow-hidden group w-full max-w-[650px] cursor-pointer"
            onClick={openGoogleMaps}
          >
            {/* حاوية الخريطة: الطول كبر لـ 500px */}
            <div className="relative h-[500px] w-full rounded-[2rem] overflow-hidden bg-[#0a0a0a]">
              
              {/* صورة الخريطة (زووم على الجيزة) */}
              <img 
                src="https://deltalighting.me/wp-content/uploads/2023/09/Grand-Egyptian-Museum-30-scaled.jpg" 
                // ملحوظة: لو الصورة مظهرتش، استخدم أي صورة خريطة عندك في فولدر public وحط مسارها هنا
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1503152394-c571994fd383?q=80&w=800"; // صورة بديلة كلاسيكية
                }}
                alt="GEM Giza Map" 
                className="w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-1000 grayscale-[0.5]"
              />

              {/* 1. رادار البحث الذهبي (Radius) */}
              <motion.div 
                animate={{ scale: [1, 1.05, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] border-[2px] border-[#D4AF37] bg-[#D4AF37]/5 rounded-full pointer-events-none"
              />

              {/* 2. الدبابيس المحيطة */}
              {nearbyPins.map((pin, index) => (
                <motion.div
                  key={pin.id}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.2 }}
                  className="absolute -translate-x-1/2 -translate-y-full"
                  style={{ top: pin.top, left: pin.left }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#D4AF37" className="opacity-60">
                    <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z" />
                  </svg>
                </motion.div>
              ))}

              {/* 3. الدبوس الرئيسي (GEM المركز) */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full z-20"
              >
                <div className="relative flex flex-col items-center">
                  <div className="bg-black text-[#D4AF37] text-[10px] font-black px-3 py-1 rounded-full border border-[#D4AF37]/50 mb-1 shadow-2xl">
                    GEM CENTER
                  </div>
                  <MapPin size={44} className="text-[#D4AF37] fill-black drop-shadow-[0_0_20px_rgba(212,175,55,0.6)]" />
                </div>
              </motion.div>

            </div>

            {/* شريط المعلومات السفلي */}
            <div className="absolute bottom-6 left-6 right-6 bg-black/90 backdrop-blur-xl border border-[#D4AF37]/30 p-4 rounded-2xl flex items-center justify-between z-30 shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="bg-[#D4AF37]/10 p-2 rounded-lg">
                  <Navigation size={20} className="text-[#D4AF37]" />
                </div>
                <div>
                  <div className="text-white font-bold text-sm tracking-tight">Grand Egyptian Museum</div>
                  <div className="text-[#D4AF37] text-[10px] font-black uppercase tracking-widest">Giza Plateau, Egypt</div>
                </div>
              </div>
              <div className="text-[#D4AF37] text-[10px] font-bold border border-[#D4AF37]/20 px-3 py-1 rounded-full">
                LIVE GPS
              </div>
            </div>
          </motion.div>
        </div>

        {/* الجزء الأيمن: النصوص */}
        <div className="w-full md:w-1/2 text-left">
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] mb-8">
              <Compass size={16} className="animate-spin-slow" />
              <span className="text-xs font-black uppercase tracking-[0.2em]">GPS Tracking Active</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-white mb-8 leading-[1.1]">
              Find the <span className="text-[#D4AF37]">Heart</span> of Egypt
            </h2>
            
            <p className="text-gray-400 mb-10 text-lg leading-relaxed max-w-lg">
              The museum is located just 2 kilometers from the Giza Pyramids. Our system provides real-time navigation to guide you through the historic plateau.
            </p>

            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: "#fff", color: "#000" }}
              whileTap={{ scale: 0.95 }}
              onClick={openGoogleMaps}
              className="bg-[#D4AF37] text-black px-10 py-5 rounded-full font-black uppercase tracking-[0.2em] text-xs flex items-center gap-3 shadow-[0_0_40px_rgba(212,175,55,0.2)] transition-all"
            >
              <Map size={20} />
              Start GPS Navigation
            </motion.button>
          </motion.div>
        </div>

      </div>
    </section>
  );
}