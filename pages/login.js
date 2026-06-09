import { useState } from 'react';
import { useRouter } from 'next/navigation';   // Next.js 13+
import Link from 'next/link';                   // Next.js
import { Heart, Eye, EyeOff, LogIn } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    router.push('/dashboard');
  }

  return (
    <div className="min-h-screen flex">

      {/* Left Panel — Brand */}
      <div className="w-[480px] shrink-0 bg-gradient-to-br from-[#07364a] via-[#0a4a63] to-[#04293a] flex flex-col items-center justify-center p-12 text-white">
        <div className="w-16 h-16 rounded-2xl border-2 border-white/70 flex items-center justify-center mb-6">
          <Heart size={32} strokeWidth={1.8} />
        </div>
        <h1 className="text-[32px] font-black m-0 leading-tight tracking-tight">PETCARE</h1>
        <p className="text-[#bdd9e2] text-sm mt-1 mb-10">Animal Hospital Management</p>

        <div className="w-full space-y-4">
          {[
            { label: 'Patient Records', desc: 'EMR, IPD & Visit history' },
            { label: 'Queue & Scheduling', desc: 'Real-time OPD flow' },
            { label: 'Lab & Imaging', desc: 'Integrated diagnostic results' },
          ].map(({ label, desc }) => (
            <div key={label} className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-primary2 mt-1.5 shrink-0" />
              <div>
                <p className="m-0 font-bold text-sm">{label}</p>
                <p className="m-0 text-[#87b7c5] text-xs">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-auto text-[#4a7a8a] text-xs">&copy; 2026 PETCARE. All rights reserved.</p>
      </div>

      {/* Right Panel — Form */}
      <div className="flex-1 bg-bg flex items-center justify-center p-12">
        <div className="w-full max-w-[420px]">
          <h2 className="text-[28px] font-black text-[#102a43] m-0 mb-1">Welcome back</h2>
          <p className="text-muted text-sm mb-8">Sign in to your account to continue</p>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>

            {/* Username */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] text-[#39576d] font-[800]">Username</label>
              <input
                type="text"
                placeholder="e.g. dr.somchai"
                className="border border-line rounded-xl px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition bg-white"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              {/* <div className="flex items-center justify-between">
                <label className="text-[13px] text-[#39576d] font-[800]">Password</label>
                <Link
                  href="/forgot-password"
                  className="text-[12px] text-primary hover:underline no-underline font-semibold"
                >
                  Forgot password?
                </Link>
              </div> */}
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="w-full border border-line rounded-xl px-4 py-3 pr-11 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-primary transition-colors bg-transparent border-0 cursor-pointer p-0"
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <label className="flex items-center gap-2 cursor-pointer text-sm text-[#39576d] font-bold">
              <input type="checkbox" className="w-4 h-4 accent-primary" />
              Remember me on this device
            </label>

            {/* Submit */}
            <button
              type="submit"
              className="flex items-center justify-center gap-2 mt-2 border-0 rounded-xl py-3 font-[850] cursor-pointer text-sm bg-gradient-to-r from-primary to-primary2 text-white shadow-[0_6px_20px_rgba(42,127,165,.35)] hover:shadow-[0_8px_24px_rgba(42,127,165,.45)] transition-shadow"
            >
              <LogIn size={16} /> Sign in
            </button>

            {/* Sign up link */}
            {/* <div className="text-center mt-2">
              <span className="text-sm text-muted">Don't have an account? </span>
              <Link href="/signup" className="text-sm font-bold text-primary hover:underline no-underline">
                Create an account
              </Link>
            </div> */}

          </form>

          <div className="mt-8 pt-6 border-t border-line text-center text-xs text-muted">
            Need access? Contact your system administrator.
          </div>
        </div>
      </div>

    </div>
  );
} 