// src/pages/signup.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Heart, Eye, EyeOff, UserPlus, AlertCircle } from 'lucide-react';

export default function SignUpPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match. Please check again.');
      return;
    }
    setError('');
    router.push('/login');
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

        <div className="w-full space-y-5">
          {[
            { icon: '📱', label: 'Pet Health Records', desc: 'Access medical history & vaccine records anytime' },
            { icon: '📅', label: 'Easy Appointments', desc: 'Book and manage your visits seamlessly' },
            { icon: '🔔', label: 'Smart Reminders', desc: 'Get notified for upcoming appointments & vaccines' },
          ].map(({ icon, label, desc }) => (
            <div key={label} className="flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-sm">
                {icon}
              </div>
              <div>
                <p className="m-0 font-bold text-[14px]">{label}</p>
                <p className="m-0 text-[#87b7c5] text-[12.5px] mt-0.5 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-auto text-[#4a7a8a] text-xs">&copy; 2026 PETCARE. All rights reserved.</p>
      </div>

      {/* Right Panel — Sign Up Form */}
      <div className="flex-1 bg-[#f6f9fb] flex items-center justify-center p-8 overflow-y-auto">
        <div className="w-full max-w-[420px] py-4">
          <h2 className="text-[28px] font-black text-[#102a43] m-0 mb-1">Create an account</h2>
          <p className="text-[#64788a] text-sm mb-6">Register to manage your pet's information</p>

          {error && (
            <div className="bg-[#fff0f0] text-[#e95050] text-[12px] p-3 rounded-xl mb-4 flex items-center gap-2 font-bold border border-[#fcd5d5]">
              <AlertCircle size={16} /> {error}
            </div>
          )}

          <form className="flex flex-col gap-3.5" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] text-[#39576d] font-[800]">Full Name <span className="text-[#e95050]">*</span></label>
              <input type="text" placeholder="e.g. John Doe" required className="border border-[#e3edf3] rounded-xl px-4 py-2.5 text-sm outline-none bg-white" />
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] text-[#39576d] font-[800]">Phone Number <span className="text-[#e95050]">*</span></label>
              <input type="tel" placeholder="08X-XXX-XXXX" required className="border border-[#e3edf3] rounded-xl px-4 py-2.5 text-sm outline-none bg-white" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] text-[#39576d] font-[800]">Email</label>
              <input type="email" placeholder="your@email.com" className="border border-[#e3edf3] rounded-xl px-4 py-2.5 text-sm outline-none bg-white" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] text-[#39576d] font-[800]">Password <span className="text-[#e95050]">*</span></label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="border border-[#e3edf3] rounded-xl px-4 py-2.5 text-sm outline-none bg-white" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] text-[#39576d] font-[800]">Confirm Password <span className="text-[#e95050]">*</span></label>
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="border border-[#e3edf3] rounded-xl px-4 py-2.5 text-sm outline-none bg-white" />
            </div>

            <button type="submit" className="flex items-center justify-center gap-2 mt-2 border-0 rounded-xl py-3 font-[850] text-[14px] bg-gradient-to-r from-[#0f8f83] to-[#0b6d87] text-white cursor-pointer hover:opacity-90 transition-opacity">
              <UserPlus size={16} /> Sign Up
            </button>
          </form>

          {/* Social Login */}
          <div className="relative flex items-center py-5">
            <div className="flex-grow border-t border-[#e3edf3]"></div>
            <span className="mx-4 text-[#a0b2c3] text-[11px] font-bold uppercase">Or sign up with</span>
            <div className="flex-grow border-t border-[#e3edf3]"></div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button className="flex items-center justify-center text-[12px] font-bold border border-[#e3edf3] rounded-xl py-2.5 bg-white text-[#102a43] hover:bg-gray-50">ThaiID</button>
            <button className="flex items-center justify-center text-[12px] font-bold border border-[#e3edf3] rounded-xl py-2.5 bg-[#00B900] text-white">LINE</button>
            <button className="flex items-center justify-center text-[12px] font-bold border border-[#e3edf3] rounded-xl py-2.5 bg-white text-[#102a43] hover:bg-gray-50">Google</button>
          </div>

          <div className="mt-8 pt-5 border-t border-[#e3edf3] text-center text-[13px] text-[#64788a]">
            Already have an account?{' '}
            <Link href="/login" className="font-[850] text-[#0f8f83] hover:underline no-underline">
              Sign in here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}