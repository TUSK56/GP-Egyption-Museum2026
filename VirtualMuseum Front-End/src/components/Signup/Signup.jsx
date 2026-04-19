"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Mail, Lock, Eye, EyeOff, User, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setLoading(false);
    }, 1000);
  };

  const stepVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#A88A5B] via-[#C4A572] to-[#8B7355] flex items-center justify-center p-3 sm:p-4 lg:p-6 relative overflow-hidden py-6 sm:py-8">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-25"
        style={{ 
          backgroundImage: `url('/assets/images/Signup.png')`,
        }}
      />
      
      {/* Background Overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#A88A5B]/80 via-[#C4A572]/70 to-[#8B7355]/80"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-5 right-5 w-32 h-32 bg-white/5 rounded-full blur-3xl z-0"></div>
      <div className="absolute bottom-5 left-5 w-40 h-40 bg-white/5 rounded-full blur-3xl z-0"></div>
      
      {/* Main Container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl relative z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-white/30">
          
          {/* Left Side - Decorative Section */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-[#A88A5B] to-[#8B7355] p-6 relative overflow-hidden shadow-inner border-r border-white/20"
          >
            {/* Egyptian Pattern Background */}
            <div className="absolute inset-0 opacity-15">
              <svg className="w-full h-full" viewBox="0 0 200 200">
                <pattern id="pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <circle cx="20" cy="20" r="2" fill="white"/>
                  <path d="M 10 20 L 30 20 M 20 10 L 20 30" stroke="white" strokeWidth="0.5"/>
                </pattern>
                <rect width="200" height="200" fill="url(#pattern)"/>
              </svg>
            </div>
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20"></div>
            
            {/* Content */}
            <div className="relative z-10 text-center space-y-4">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="flex justify-center"
              >
                <Image
                  src="/assets/images/eh.png"
                  alt="Grand Egyptian Museum Logo"
                  width={300}
                  height={120}
                  className="h-20 sm:h-24 w-auto object-contain"
                  priority
                />
              </motion.div>
              
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white">Join Our Community</h3>
                <p className="text-white/90 text-xs leading-relaxed max-w-xs">
                  Explore ancient Egyptian artifacts and connect with fellow enthusiasts
                </p>
              </div>

              {/* Features */}
              <div className="space-y-2 pt-4">
                <motion.div 
                  className="flex items-center gap-2 text-white/95 text-xs"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <CheckCircle2 size={16} className="text-[#D4AF37] flex-shrink-0" />
                  <span className="font-medium">5000+ Artifacts</span>
                </motion.div>
                
                <motion.div 
                  className="flex items-center gap-2 text-white/95 text-xs"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <CheckCircle2 size={16} className="text-[#D4AF37] flex-shrink-0" />
                  <span className="font-medium">3D Tours</span>
                </motion.div>
                
                <motion.div 
                  className="flex items-center gap-2 text-white/95 text-xs"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <CheckCircle2 size={16} className="text-[#D4AF37] flex-shrink-0" />
                  <span className="font-medium">Expert Content</span>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Form Section */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="p-5 sm:p-6 lg:p-7 flex flex-col justify-center bg-white/98 backdrop-blur-sm"
          >
            {/* Header */}
            <div className="mb-4">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-1 mb-4"
              >
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Create Account</h2>
                <p className="text-gray-600 text-xs">Join thousands exploring ancient history</p>
              </motion.div>

              {/* Progress Indicator */}
              <div className="flex gap-1.5">
                {[1, 2, 3].map((step) => (
                  <motion.div
                    key={step}
                    className={`h-1.5 rounded-full transition-all ${
                      step <= currentStep ? 'bg-[#D4AF37]' : 'bg-gray-200'
                    }`}
                    animate={{ width: step <= currentStep ? 35 : 20 }}
                  />
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              
              {/* Step 1: Personal Info */}
              <motion.div
                variants={stepVariants}
                initial="hidden"
                animate={currentStep >= 1 ? "visible" : "hidden"}
                transition={{ delay: 0.1 }}
                className="space-y-3"
              >
                {/* Name Field */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Full Name</label>
                  <div className="relative group">
                    <input 
                      type="text" 
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe" 
                      className="w-full bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-gray-200 rounded-lg py-2 px-3 pl-9 text-xs text-gray-900 placeholder-gray-500 focus:from-white focus:to-white focus:border-[#D4AF37] focus:ring-3 focus:ring-[#D4AF37]/10 outline-none transition-all duration-300"
                    />
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#D4AF37] transition-colors" size={15} />
                  </div>
                </div>

                {/* Email Field */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Email Address</label>
                  <div className="relative group">
                    <input 
                      type="email" 
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com" 
                      className="w-full bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-gray-200 rounded-lg py-2 px-3 pl-9 text-xs text-gray-900 placeholder-gray-500 focus:from-white focus:to-white focus:border-[#D4AF37] focus:ring-3 focus:ring-[#D4AF37]/10 outline-none transition-all duration-300"
                    />
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#D4AF37] transition-colors" size={15} />
                  </div>
                </div>
              </motion.div>

              {/* Step 2: Username */}
              <motion.div
                variants={stepVariants}
                initial="hidden"
                animate={currentStep >= 2 ? "visible" : "hidden"}
                transition={{ delay: 0.1 }}
                className="space-y-3"
              >
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Username</label>
                  <div className="relative group">
                    <input 
                      type="text" 
                      name="username"
                      required
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="egyptophile" 
                      className="w-full bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-gray-200 rounded-lg py-2 px-3 pl-9 text-xs text-gray-900 placeholder-gray-500 focus:from-white focus:to-white focus:border-[#D4AF37] focus:ring-3 focus:ring-[#D4AF37]/10 outline-none transition-all duration-300"
                    />
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#D4AF37] transition-colors" size={15} />
                  </div>
                </div>
              </motion.div>

              {/* Step 3: Password */}
              <motion.div
                variants={stepVariants}
                initial="hidden"
                animate={currentStep >= 3 ? "visible" : "hidden"}
                transition={{ delay: 0.1 }}
                className="space-y-3"
              >
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Password</label>
                  <div className="relative group">
                    <input 
                      type={showPassword ? "text" : "password"}
                      name="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••" 
                      className="w-full bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-gray-200 rounded-lg py-2 px-3 pl-9 text-xs text-gray-900 placeholder-gray-500 focus:from-white focus:to-white focus:border-[#D4AF37] focus:ring-3 focus:ring-[#D4AF37]/10 outline-none transition-all duration-300"
                    />
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#D4AF37] transition-colors" size={15} />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Confirm Password</label>
                  <div className="relative group">
                    <input 
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••" 
                      className="w-full bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-gray-200 rounded-lg py-2 px-3 pl-9 text-xs text-gray-900 placeholder-gray-500 focus:from-white focus:to-white focus:border-[#D4AF37] focus:ring-3 focus:ring-[#D4AF37]/10 outline-none transition-all duration-300"
                    />
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#D4AF37] transition-colors" size={15} />
                    <button 
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                {/* Terms Checkbox */}
                <motion.div 
                  className="flex items-start gap-2 p-2 bg-gradient-to-r from-[#D4AF37]/5 to-transparent rounded-lg border border-[#D4AF37]/20"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <input 
                    type="checkbox" 
                    id="terms"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="rounded border-2 border-gray-300 text-[#D4AF37] focus:ring-[#D4AF37] w-4 h-4 mt-0.5 flex-shrink-0 cursor-pointer transition-colors" 
                  />
                  <label htmlFor="terms" className="text-xs text-gray-600 leading-relaxed cursor-pointer">
                    I agree to the <span className="text-[#A88A5B] font-bold">Terms & Conditions</span> and <span className="text-[#A88A5B] font-bold">Privacy Policy</span>
                  </label>
                </motion.div>
              </motion.div>

              {/* Navigation Buttons */}
              <motion.div 
                className="flex gap-2 pt-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {currentStep > 1 && (
                  <button 
                    type="button"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg font-semibold text-xs transition-all duration-300"
                  >
                    Back
                  </button>
                )}
                
                {currentStep < 3 ? (
                  <button 
                    type="button"
                    onClick={() => setCurrentStep(currentStep + 1)}
                    disabled={
                      (currentStep === 1 && (!formData.name || !formData.email)) ||
                      (currentStep === 2 && !formData.username)
                    }
                    className="flex-1 bg-gradient-to-r from-[#D4AF37] to-[#B8950A] hover:shadow-lg text-gray-900 py-2 rounded-lg font-bold text-xs flex items-center justify-center gap-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                  >
                    Next <ArrowRight size={13} />
                  </button>
                ) : (
                  <button 
                    type="submit"
                    disabled={!agreeTerms || loading}
                    className="flex-1 bg-gradient-to-r from-[#D4AF37] to-[#B8950A] hover:shadow-lg text-gray-900 py-2 rounded-lg font-bold text-xs transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                  >
                    {loading ? 'Creating...' : 'Create Account'}
                  </button>
                )}
              </motion.div>

              {/* Divider */}
              <div className="relative flex items-center gap-2 py-2">
                <div className="flex-1 h-px bg-gray-200"></div>
                <span className="text-xs text-gray-500 font-medium">Or</span>
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>

              {/* Google Signup Button */}
              <motion.button 
                type="button"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="w-full bg-white hover:bg-gray-50 border-2 border-gray-200 text-gray-700 py-2 rounded-lg font-semibold text-xs flex items-center justify-center gap-2 transition-all duration-300 active:scale-95"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="12" r="10" fill="#1f2937"/>
                  <circle cx="12" cy="12" r="9" fill="white"/>
                  <path d="M7 12a5 5 0 1 1 10 0 5 5 0 0 1-10 0z" fill="#EA4335"/>
                  <circle cx="16" cy="12" r="2" fill="#34A853"/>
                  <circle cx="8" cy="8" r="2" fill="#FBBC05"/>
                </svg>
                Sign Up with Google
              </motion.button>

              {/* Sign In Link */}
              <motion.p 
                className="text-center text-xs text-gray-600 mt-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                Already have an account? <Link href="/Signin" className="text-[#D4AF37] font-bold hover:text-[#B8950A] transition-colors">Sign In</Link>
              </motion.p>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
