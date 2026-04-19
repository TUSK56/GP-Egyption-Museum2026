"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, User, Star, PlayCircle } from 'lucide-react';

type Tour = {
  image: string;
  title: string;
  rating: number | string;
  guide: string;
  duration: string;
  date: string;
  price: string;
};

export default function TourCard({ tour, index }: { tour: Tour; index: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group bg-white/[0.02] border border-white/10 rounded-[2rem] overflow-hidden hover:border-[#D4AF37]/50 transition-colors flex flex-col justify-between"
    >
      <div className="relative h-60 w-full overflow-hidden">
        <img 
          src={tour.image} 
          alt={tour.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
        />
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 text-[#D4AF37] text-xs font-bold border border-white/10">
          <Star size={12} className="fill-[#D4AF37]" /> {tour.rating}
        </div>
        {/* تأثير زرار الـ Play */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30">
          <PlayCircle size={60} className="text-[#D4AF37] opacity-80" />
        </div>
      </div>
      
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-serif font-bold mb-4 line-clamp-2 min-h-[56px] text-white">
            {tour.title}
          </h3>
          
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <User size={16} className="text-[#D4AF37]" /> Guided by {tour.guide}
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <Clock size={16} className="text-[#D4AF37]" /> {tour.duration}
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <Calendar size={16} className="text-[#D4AF37]" /> {tour.date}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-white/10">
          <div className="text-2xl font-mono font-bold text-white">{tour.price}</div>
          <button className="bg-[#D4AF37] text-black px-6 py-2.5 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-white transition-colors">
            Book Now
          </button>
        </div>
      </div>
    </motion.div>
  );
}