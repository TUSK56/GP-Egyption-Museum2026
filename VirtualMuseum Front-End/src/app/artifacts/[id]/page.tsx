"use client";
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { 
  ArrowLeft, Box, Ruler, MapPin, 
  Calendar, User, Hammer, Info 
} from 'lucide-react';

// السطر ده بيمنع السيرفر من قراءة الموديل وبيشغله في المتصفح بس
const ModelViewer = dynamic(() => import('../../../components/ModelViewer/ModelViewer'), { ssr: false });
import artifactsData from '../../../Data/artifacts.json'; 

export default function ArtifactDetails() {
  // ✅ نقلنا الـ State دي هنا (جوه الـ Component) وده المكان الصح
  const [show3D, setShow3D] = useState(false); 
  
  const { id } = useParams();
  const router = useRouter();
  const [artifact, setArtifact] = useState(null);

  useEffect(() => {
    const found = artifactsData.find(item => item.id === id);
    setArtifact(found);
  }, [id]);

  if (!artifact) return (
    <div className="h-screen bg-[#050505] flex items-center justify-center text-[#D4AF37] font-serif">
      Loading History...
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white pb-20">
      {/* --- Header & Back Button --- */}
      <div className="p-6 relative z-10">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-400 hover:text-[#D4AF37] transition-colors"
        >
          <ArrowLeft size={20} /> Back to Collection
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* --- Left Column: Image Showcase --- */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative h-[500px] lg:h-[700px] rounded-[2rem] overflow-hidden border border-white/10 group shadow-2xl"
        >
          <Image 
            src={artifact.image} 
            alt={artifact.name} 
            fill 
            className="object-cover group-hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
          
          {/* 3D Float Button */}
          <motion.button 
          onClick={() => setShow3D(true)}
            whileHover={{ scale: 1.1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-black px-8 py-4 rounded-full font-black uppercase tracking-widest flex items-center gap-3 shadow-[0_10px_30px_rgba(212,175,55,0.4)]"
          >
            <Box size={20} /> View 3D Hologram
          </motion.button>
        </motion.div>

        {/* --- Right Column: Artifact Dossier --- */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          <div>
            <span className="text-[#D4AF37] text-xs font-black uppercase tracking-[0.3em] mb-2 block">
              Accession: {artifact.accessionNumber}
            </span>
            <h1 className="text-5xl lg:text-6xl font-serif font-bold leading-tight mb-4">
              {artifact.name}
            </h1>
          </div>

          {/* Quick Specs Grid */}
          <div className="grid grid-cols-2 gap-4">
            <SpecCard icon={<Calendar size={18}/>} label="Period" value={artifact.period} />
            <SpecCard icon={<User size={18}/>} label="Associated King" value={artifact.associatedKing} />
            <SpecCard icon={<Hammer size={18}/>} label="Material" value={artifact.material} />
            <SpecCard icon={<MapPin size={18}/>} label="Discovery Site" value={artifact.discoverySite} />
          </div>

          {/* Dimensions Section */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <h3 className="text-[#D4AF37] font-bold flex items-center gap-2 mb-6 uppercase text-sm tracking-widest">
              <Ruler size={18} /> Physical Dimensions
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {Object.entries(artifact.dimensions).map(([key, val]) => (
                <div key={key}>
                  <div className="text-gray-500 text-[10px] uppercase font-bold mb-1">{key}</div>
                  <div className="text-lg font-mono font-bold">{val}</div>
                </div>
              ))}
            </div>
          </div>

          {/* About Section */}
          <div className="space-y-4">
             <h3 className="text-xl font-serif font-bold flex items-center gap-2">
               <Info size={20} className="text-[#D4AF37]"/> Historical Context
             </h3>
             <p className="text-gray-400 leading-relaxed text-lg italic">
               This magnificent piece, belonging to the {artifact.period}, was discovered in {artifact.discoverySite}. 
               It stands as a testament to the unparalleled craftsmanship of ancient Egypt during the reign of {artifact.associatedKing}.
             </p>
          </div>

          {/* Action Footer */}
          <div className="pt-8 flex gap-4">
             <button className="flex-1 border border-[#D4AF37] text-[#D4AF37] py-4 rounded-2xl font-bold uppercase text-xs tracking-widest hover:bg-[#D4AF37] hover:text-black transition-all">
                Add to Favorites
             </button>
             <button className="flex-1 bg-white/5 text-white py-4 rounded-2xl font-bold uppercase text-xs tracking-widest hover:bg-white/10 transition-all">
                Share Dossier
             </button>
          </div>
        </motion.div>

      </div>
      <AnimatePresence>
        {show3D && artifact.image3D && (
          <ModelViewer 
            modelPath={artifact.image3D} 
            onClose={() => setShow3D(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// مكون فرعي للكروت الصغيرة
function SpecCard({ icon, label, value }) {
  return (
    <div className="bg-white/[0.03] border border-white/5 p-5 rounded-2xl hover:border-[#D4AF37]/30 transition-colors group">
      <div className="text-[#D4AF37] mb-3 group-hover:scale-110 transition-transform">{icon}</div>
      <div className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">{label}</div>
      <div className="text-sm font-bold text-gray-200">{value}</div>
    </div>
  );
}