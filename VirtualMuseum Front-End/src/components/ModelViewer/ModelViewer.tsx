"use client";
import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Stage, Html, useProgress } from '@react-three/drei';
import { motion } from 'framer-motion';
import { X, Box, Loader2 } from 'lucide-react';

// --- مكون تحميل الموديل (معالجة الخطأ) ---
function Model({ path, onError }) {
  try {
    const { scene } = useGLTF(path);
    return <primitive object={scene} scale={1} />;
  } catch (error) {
    if (onError) onError();
    return null;
  }
}

// --- شاشة التحميل (تمت إضافة أنيميشن فرعوني جامد) ---
function Loader() {
  const { progress } = useProgress();
  const [smoothProgress, setSmoothProgress] = useState(0);

  useEffect(() => {
    setSmoothProgress(progress);
  }, [progress]);

  // أنيميشن "التنفس الفرعوني" للـ Glow
  const breatheAnimation = {
    scale: [1, 1.05, 1],
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 2,
      ease: "easeInOut",
      repeat: Infinity,
    },
  };

  return (
    <Html center>
      <div className="flex flex-col items-center gap-4 text-[#D4AF37] relative">
        {/* خلفية Glow متحركة */}
        <motion.div
          animate={breatheAnimation}
          className="absolute inset-[-20px] bg-[#D4AF37]/10 rounded-full blur-2xl"
        />
        
        <Loader2 className="w-12 h-12 animate-spin relative z-10" />
        
        <div className="font-mono font-bold tracking-[0.2em] text-xs relative z-10">
          {smoothProgress.toFixed(0)}% CHARGED
        </div>
      </div>
    </Html>
  );
}

// --- مكون رسالة "Coming Soon" (تمت إضافة أنيميشن "عين حورس" الجامد) ---
function ComingSoonMessage() {
  // أنيميشن Pulse لعين حورس
  const pulseAnimation = {
    opacity: [0.3, 0.6, 0.3],
    scale: [0.98, 1.02, 0.98],
    transition: {
      duration: 3,
      ease: "easeInOut",
      repeat: Infinity,
    },
  };

  return (
    <Html center>
      <div className="flex flex-col items-center gap-5 text-center min-w-[320px] relative">
        {/* عين حورس المزدوجة - أنيميشن Pulse و دوران بطيء */}
        <motion.div
          animate={pulseAnimation}
          className="absolute inset-0 flex items-center justify-center opacity-40 pointer-events-none"
        >
          <svg
            width="180"
            height="180"
            viewBox="0 0 100 100"
            fill="none"
            className="animate-[spin_120s_linear_infinity]"
          >
            {/* عين حورس - مسار مبسط ومزخرف */}
            <path
              d="M50 20 C65 20, 78 30, 85 45 C78 60, 65 70, 50 70 C35 70, 22 60, 15 45 C22 30, 35 20, 50 20 Z M50 30 A15 15 0 1 0 50 60 A15 15 0 1 0 50 30 Z"
              stroke="#D4AF37"
              strokeWidth="1"
              strokeLinecap="round"
            />
            <path
              d="M50 60 L45 80 M55 60 L60 80 M50 45 A5 5 0 1 1 50 45"
              stroke="#D4AF37"
              strokeWidth="0.8"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>
        
        <div className="p-5 bg-black/40 border border-[#D4AF37]/30 rounded-full relative z-10">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
             <path d="M12 2L2 12M12 2L22 12M12 2V22M12 22L2 12M12 22L22 12" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        
        <div className="space-y-2 relative z-10">
          <h3 className="text-2xl font-black text-white tracking-[0.25em]">COMING SOON</h3>
          <p className="text-[#D4AF37]/70 text-[10px] font-medium uppercase tracking-[0.3em] max-w-[280px]">
            This Divine Artifact is being Prepared for Revelation
          </p>
        </div>
      </div>
    </Html>
  );
}

// --- المكون الرئيسي للشاشة المنبثقة ---
export default function ModelViewer({ modelPath, onClose }) {
  const [hasError, setHasError] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl"
    >
      {/* زر الإغلاق */}
      <button 
        onClick={onClose}
        className="absolute top-8 right-8 z-[110] p-4 bg-white/5 border border-white/10 rounded-full text-white hover:text-red-500 hover:border-red-500/50 hover:bg-red-500/10 transition-all"
      >
        <X size={24} />
      </button>

      {/* تعليمات للمستخدم - تظهر فقط إذا لم يكن هناك خطأ */}
      {!hasError && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-full text-gray-400 text-xs font-bold uppercase tracking-widest pointer-events-none">
          <Box size={16} className="text-[#D4AF37]" /> 
          Drag to Rotate • Scroll to Zoom
        </div>
      )}

      {/* مساحة الـ 3D */}
      <div className="w-full h-full cursor-grab active:cursor-grabbing">
        <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 4], fov: 45 }}>
          <Suspense fallback={<Loader />}>
            {hasError ? (
              <ComingSoonMessage />
            ) : (
              <Stage environment="city" intensity={0.5} contactShadow opacity={0.5} contactShadowBlur={2}>
                <Model 
                  path={modelPath} 
                  onError={() => setHasError(true)} 
                />
              </Stage>
            )}
          </Suspense>
          
          {!hasError && (
            <OrbitControls 
              autoRotate 
              autoRotateSpeed={0.8} 
              enablePan={false} 
              minPolarAngle={Math.PI / 4} 
              maxPolarAngle={Math.PI / 1.5} 
            />
          )}
        </Canvas>
      </div>
    </motion.div>
  );
}