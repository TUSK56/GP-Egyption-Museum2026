"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Compass, Map } from 'lucide-react';

export default function MuseumLocation() {
  // دالة فتح جوجل ماب على موقع المتحف المصري الكبير
  const openGoogleMaps = () => {
    // اللينك ده بيفتح جوجل ماب على الـ GEM وتقدر تغيره لأي لينك تاني
    const destination = "Grand+Egyptian+Museum,+Giza";
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${destination}`, '_blank');
  };

  return (
    <section className="py-24 bg-[#050505dd] relative overflow-hidden border-t border-white/5">
      
      {/* شبكة إحداثيات في الخلفية (لمسة جمالية) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16 relative z-10">
        
        {/* الجزء الأيسر: الرادار والخريطة */}
        <div className="relative w-full md:w-1/2 flex justify-center items-center h-[400px]">
          {/* دوائر الرادار المتحركة */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div 
              animate={{ scale: [1, 2, 2.5], opacity: [0.8, 0.3, 0] }} 
              transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }} 
              className="absolute w-32 h-32 border border-[#D4AF37]/50 rounded-full"
            />
            <motion.div 
              animate={{ scale: [1, 2.5, 3.5], opacity: [0.6, 0.1, 0] }} 
              transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay: 1 }} 
              className="absolute w-32 h-32 border border-[#D4AF37]/30 rounded-full"
            />
          </div>

          {/* كارت الخريطة */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="relative bg-[#111] p-2 rounded-[2rem] border border-white/10 shadow-[0_0_40px_rgba(212,175,55,0.1)] overflow-hidden group w-full max-w-[350px] cursor-pointer"
            onClick={openGoogleMaps}
          >
            {/* صورة الخريطة (تقدر تحط صورة خريطة حقيقية مكان اللينك ده) */}
            <div className="relative h-64 w-full rounded-[1.5rem] overflow-hidden bg-black">
              <img 
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=600&auto=format&fit=crop" 
                alt="Map Location" 
                className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700 grayscale"
              />
              <div className="absolute inset-0 bg-[#D4AF37]/10 mix-blend-overlay"></div>
              
              {/* الدبوس (Map Pin) */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#D4AF37] drop-shadow-2xl"
              >
                <MapPin size={48} className="fill-black" />
              </motion.div>
            </div>

            {/* شريط تحت الصورة */}
            <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md border border-white/10 p-3 rounded-2xl flex items-center justify-between">
              <div>
                <div className="text-white font-bold text-sm">Grand Egyptian Museum</div>
                <div className="text-gray-400 text-[10px] uppercase tracking-widest">Giza, Egypt</div>
              </div>
              <div className="bg-[#D4AF37] text-black p-2 rounded-full">
                <Navigation size={16} />
              </div>
            </div>
          </motion.div>
        </div>

        {/* الجزء الأيمن: النص وزرار الـ GPS */}
        <div className="w-full md:w-1/2 text-left">
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#D4AF37] mb-6">
              <Compass size={16} />
              <span className="text-xs font-bold uppercase tracking-widest">Plan Your Visit</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight">
              Navigate to the <span className="text-[#D4AF37] italic">Legacy</span>
            </h2>
            
            <p className="text-gray-400 mb-8 text-lg leading-relaxed max-w-lg">
              Located directly overlooking the Giza Pyramids, the Grand Egyptian Museum is easily accessible. Click below to get real-time GPS directions from your current location.
            </p>

            {/* زرار الـ GPS الأساسي */}
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={openGoogleMaps}
              className="bg-[#D4AF37] text-black px-8 py-4 rounded-full font-black uppercase tracking-widest text-xs flex items-center gap-3 shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:bg-white transition-colors"
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