import Link from "next/link";

export default function MaintenancePage() {
    return (
        <main className="min-h-screen bg-[#050505] text-white flex items-center justify-center px-6">
            <div className="max-w-xl w-full rounded-3xl border border-[#D4AF37]/30 bg-[#0b0b10]/95 p-8 text-center shadow-2xl">
                <div className="text-[10px] uppercase tracking-[0.35em] text-[#D4AF37] font-black mb-4">
                    Application Status
                </div>
                <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                    The museum is temporarily closed
                </h1>
                <p className="text-gray-300 text-sm leading-relaxed">
                    Access is currently disabled by the administrator. Please
                    try again shortly.
                </p>
                <div className="mt-8">
                    <Link
                        href="/Signin"
                        className="inline-flex items-center justify-center rounded-xl bg-[#D4AF37] px-6 py-3 text-xs font-black uppercase tracking-widest text-black hover:bg-white transition-colors"
                    >
                        Admin Sign In
                    </Link>
                </div>
            </div>
        </main>
    );
}

