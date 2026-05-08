"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Trash2, Heart } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getScopedFavorites, setScopedFavorites } from '../../lib/favoritesStorage';

type VaultArtifact = {
  id: string;
  image: string;
  name: string;
  period: string;
};

// --- مكون الكارت الملكي (بلمسة حمراء للـ Love) ---
const LovedCard = ({ artifact, onRemove }: { artifact: VaultArtifact; onRemove: (id: string) => void }) => {
  const router = useRouter();
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }} // خروج سينمائي
      transition={{ duration: 0.4 }}
      className="group relative bg-linear-to-b from-[#111] to-[#050505] border border-white/10 rounded-4xl p-5 cursor-pointer hover:border-red-600 hover:shadow-[0_0_30px_rgba(220,38,38,0.15)] transition-all duration-500 overflow-hidden flex flex-col justify-between"
      onClick={() => router.push(`/artifacts/${artifact.id}`)}
    >
      {/* خلفية بتنور أحمر خفيف لما تعمل Hover */}
      <div className="absolute inset-0 bg-linear-to-t from-red-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

      {/* قسم الصورة */}
      <div className="relative h-56 w-full mb-6 flex justify-center items-center overflow-hidden rounded-xl bg-black/20">
        <img 
          src={artifact.image} 
          alt={artifact.name} 
          className="h-full w-full object-contain drop-shadow-2xl group-hover:scale-110 transition-transform duration-700" 
        />
        {/* زرار الحذف */}
        <button 
          onClick={(e) => { e.stopPropagation(); onRemove(artifact.id); }}
          className="absolute top-3 right-3 p-2.5 bg-black/60 backdrop-blur-md rounded-full text-gray-400 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 hover:text-white hover:bg-red-600 transition-all duration-300"
          title="Remove from Loved Pieces"
        >
          <Trash2 size={18} />
        </button>
      </div>

      {/* قسم التفاصيل */}
      <div>
        <div className="flex justify-between items-start mb-2">
          <span className="text-red-500 text-[10px] font-black uppercase tracking-[0.2em]">{artifact.period}</span>
        </div>
        <h3 className="text-white font-serif font-bold text-xl leading-snug line-clamp-2 group-hover:text-red-500 transition-colors">
          {artifact.name}
        </h3>
      </div>
    </motion.div>
  );
};

// --- الصفحة الرئيسية ---
export default function LovePage() {
  const [lovedArtifacts, setLovedArtifacts] = useState<VaultArtifact[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const data: VaultArtifact[] = getScopedFavorites('liked_artifacts');
    setLovedArtifacts(data);
    setIsLoaded(true);
  }, []);

  const removeItem = (id: string) => {
    const updated = lovedArtifacts.filter((item: VaultArtifact) => item.id !== id);
    setLovedArtifacts(updated);
    setScopedFavorites('liked_artifacts', updated);
    window.dispatchEvent(new Event('update_liked'));
  };

  if (!isLoaded) return null;

  return (
    <div className="min-h-screen bg-[#050505] pt-32 pb-20 px-6 md:px-12 relative overflow-hidden">
      {/* إضاءة خلفية حمراء خفيفة */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-75 bg-red-600/5 blur-[120px] pointer-events-none rounded-full"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <Link href="/Categories" className="inline-flex items-center gap-2 text-gray-400 mb-8 hover:text-red-500 transition-colors uppercase text-xs font-bold tracking-widest">
          <ArrowLeft size={16} /> Back to Archive
        </Link>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-white/10 pb-8">
          <div>
            <h1 className="text-5xl md:text-7xl font-serif font-black text-white leading-none">
              Your <span className="text-red-600">Loved</span> Pieces
            </h1>
            <p className="text-gray-500 mt-4 max-w-md">
              A curated collection of your most cherished historical treasures from the Grand Egyptian Museum.
            </p>
          </div>
          
          {/* عداد القطع الفخم (باللون الأحمر) */}
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-3 rounded-full">
            <Heart className="text-red-600 fill-red-600/20" size={20} />
            <span className="text-white font-mono text-xl font-bold">{lovedArtifacts.length}</span>
            <span className="text-gray-500 uppercase text-xs font-black tracking-widest">Pieces</span>
          </div>
        </div>

        {/* Content Section */}
        {lovedArtifacts.length > 0 ? (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <AnimatePresence>
              {lovedArtifacts.map((artifact: VaultArtifact) => (
                <LovedCard 
                  key={artifact.id} 
                  artifact={artifact} 
                  onRemove={removeItem} 
                />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          // Empty State
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-32 text-center bg-white/2 border border-white/5 rounded-[3rem]"
          >
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-red-600 blur-2xl opacity-20 rounded-full"></div>
              <Heart size={80} className="text-red-600 relative z-10 opacity-80" strokeWidth={1} />
            </div>
            <h2 className="text-3xl text-white font-serif font-bold mb-3">No loved items yet</h2>
            <p className="text-gray-500 mb-8 max-w-sm leading-relaxed">
              Unlock the secrets of the pharaohs and love your favorite artifacts here for quick access.
            </p>
            <Link 
              href="/Categories" 
              className="px-8 py-4 bg-red-600 text-white font-black uppercase tracking-widest text-xs rounded-full hover:bg-white hover:text-black hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(220,38,38,0.3)]"
            >
              Explore Collection
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}