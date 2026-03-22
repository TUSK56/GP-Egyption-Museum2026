"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Signin() {
  const router = useRouter();
  
  // States لتخزين القيم والتحكم في الواجهة
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // دالة تسجيل الدخول
  const handleLogin = (e) => {
    e.preventDefault();
    
    // بيانات وهمية للتجربة (يمكنك تغييرها كما تحب)
    const dummyEmail = "admin@gem.com";
    const dummyPass = "123456";

    if (email === dummyEmail && password === dummyPass) {
      // حفظ بيانات الجلسة في المتصفح
      localStorage.setItem('userName', 'Admin User');
      localStorage.setItem('isLoggedIn', 'true');
      
      // الانتقال لصفحة الداش بورد
      router.push('/dashboard');
    } else {
      // إظهار رسالة خطأ في حال كانت البيانات غير صحيحة
      setError('خطأ في البريد أو كلمة السر! جرب: admin@gem.com / 123456');
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#A88A5B] p-4 md:p-8 lg:p-12 font-sans text-right" > 
      <div className="relative w-full h-full min-h-[calc(100vh-4rem)] rounded-[2.5rem] overflow-hidden flex items-center justify-center lg:justify-end md:p-12 lg:pr-32 shadow-2xl">
        
        {/* خلفية الصفحة (الصورة) */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-700"
          style={{ 
            backgroundImage: `url('/assets/images/Signin.png')`,
            backgroundColor: '#1a1a1a' 
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* كارت تسجيل الدخول */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 w-full max-w-[480px] bg-white/10 backdrop-blur-[15px] border border-white/20 p-8 md:p-12 rounded-[2rem] shadow-2xl flex flex-col"
        >
          <div className="mb-8 text-left" dir="ltr">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">Welcome Back</h3>
            <p className="text-white/80 text-sm font-medium">Login to Egyptian Museum Portal</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5 text-left" dir="ltr">
            
            {/* عرض رسالة الخطأ إذا وجدت */}
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/20 border border-red-500/50 p-3 rounded-lg text-red-200 text-xs text-center font-bold"
              >
                {error}
              </motion.div>
            )}

            {/* حقل البريد الإلكتروني */}
            <div className="space-y-2">
              <label className="text-xs text-white/90 font-semibold block ml-1">Email Address</label>
              <div className="relative">
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@gem.com" 
                  className="w-full bg-white border-none rounded-lg py-3.5 px-11 text-gray-800 focus:ring-2 focus:ring-[#D4AF37] outline-none text-sm transition-all"
                />
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>

            {/* حقل كلمة السر */}
            <div className="space-y-2">
              <label className="text-xs text-white/90 font-semibold block ml-1">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="w-full bg-white border-none rounded-lg py-3.5 px-11 text-gray-800 focus:ring-2 focus:ring-[#D4AF37] outline-none text-sm transition-all"
                />
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                
                {/* زر إظهار وإخفاء كلمة السر */}
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* خيارات إضافية */}
            <div className="flex items-center justify-between text-[11px] text-white/90">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-none accent-[#D4AF37]" /> Remember me
              </label>
              <a href="#" className="text-blue-300 hover:underline">Forgot password?</a>
            </div>

            {/* أزرار تسجيل الدخول */}
            <div className="pt-4 space-y-4">
                <button 
                  type="submit" 
                  className="w-full bg-[#E60000] text-white py-3.5 rounded-lg font-bold uppercase tracking-wider hover:bg-red-700 transition-all shadow-lg active:scale-[0.98] text-sm"
                >
                  Login
                </button>

                <div className="relative flex items-center justify-center py-2">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/20"></div>
                  </div>
                  <span className="relative bg-transparent px-4 text-[10px] text-white/60 uppercase font-bold">Or</span>
                </div>

                <button 
                  type="button" 
                  className="w-full bg-white text-gray-700 py-3.5 rounded-lg font-semibold flex items-center justify-center gap-3 hover:bg-gray-50 transition-all shadow-md text-sm active:scale-[0.98]"
                >
                  <img src="https://freelogopng.com/images/all_img/1657952440google-logo-png-transparent.png" alt="Google" className="w-5 h-5" />
                  Google Account
                </button>
            </div>

            {/* رابط إنشاء حساب */}
            <p className="text-center text-white/90 text-xs mt-6">
              Don't have an account? <a href="/Signup" className="text-[#D4AF37] font-bold hover:underline">Join Now</a>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}