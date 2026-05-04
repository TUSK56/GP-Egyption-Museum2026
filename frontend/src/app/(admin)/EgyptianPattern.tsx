export function EgyptianPattern() {
  return (
    // تم تقليل الـ opacity قليلاً لتبدو كعلامة مائية خفيفة جداً
    <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern 
            id="egyptian-pattern" 
            x="0" 
            y="0" 
            width="120" // زيادة المسافة بين الرموز لراحة العين
            height="120" 
            patternUnits="userSpaceOnUse"
          >
            {/* رمز العنخ (Ankh) */}
            <g stroke="#d4af37" fill="none" strokeWidth="1">
              <ellipse cx="60" cy="30" rx="10" ry="15" />
              <path d="M60 45 L60 80 M45 55 L75 55" strokeWidth="1.5" />
            </g>

            {/* أشكال هندسية مكملة (أهرامات صغيرة) */}
            <path d="M20 100 L30 85 L40 100 Z" stroke="#d4af37" fill="none" strokeWidth="0.5" />
            <path d="M90 20 L100 5 L110 20 Z" stroke="#d4af37" fill="none" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#egyptian-pattern)" />
      </svg>
    </div>
  );
}