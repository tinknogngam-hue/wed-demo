import { useState } from 'react';
import Link from 'next/link';                   // Next.js
import { useRouter } from 'next/navigation';    // Next.js 13+
import { Heart, Mail, ArrowLeft, KeyRound, ShieldCheck, RefreshCw, Check } from 'lucide-react';

// ─── Step indicators ───────────────────────────────────────────────────────────
const STEPS = ['Enter Email', 'Verify Code', 'New Password'];

function StepIndicator({ current }) {
  return (
    <div className="flex items-center gap-0 mb-8">
      {STEPS.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div key={label} className="flex items-center gap-0 flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all
                  ${done ? 'bg-primary text-white' : active ? 'bg-primary/10 border-2 border-primary text-primary' : 'bg-gray-100 text-muted border-2 border-line'}`}
              >
                {done ? <Check size={14} /> : i + 1}
              </div>
              <span className={`text-[10px] font-bold whitespace-nowrap ${active ? 'text-primary' : done ? 'text-primary/70' : 'text-muted'}`}>
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`h-0.5 flex-1 mx-2 mb-4 transition-all ${done ? 'bg-primary' : 'bg-line'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Step 1: Email ─────────────────────────────────────────────────────────────
function StepEmail({ onNext }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!email.includes('@')) { setError('Please enter a valid email address.'); return; }
    setError('');
    onNext(email);
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="flex flex-col items-center gap-2 mb-2 text-center">
        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-1">
          <Mail size={22} className="text-primary" />
        </div>
        <h2 className="text-[22px] font-black text-[#102a43] m-0">Forgot your password?</h2>
        <p className="text-muted text-sm m-0 max-w-[300px]">
          Enter the email linked to your account. We'll send a 6-digit code.
        </p>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] text-[#39576d] font-[800]">Email address</label>
        <input
          type="email"
          placeholder="e.g. dr.somchai@clinic.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-line rounded-xl px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition bg-white"
          required
        />
        {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
      </div>

      <button
        type="submit"
        className="flex items-center justify-center gap-2 mt-2 border-0 rounded-xl py-3 font-[850] cursor-pointer text-sm bg-gradient-to-r from-primary to-primary2 text-white shadow-[0_6px_20px_rgba(42,127,165,.35)] hover:shadow-[0_8px_24px_rgba(42,127,165,.45)] transition-shadow"
      >
        <Mail size={15} /> Send Reset Code
      </button>
    </form>
  );
}

// ─── Step 2: OTP ───────────────────────────────────────────────────────────────
function StepOTP({ email, onNext }) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [resent, setResent] = useState(false);

  function handleChange(val, idx) {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[idx] = val;
    setOtp(next);
    if (val && idx < 5) document.getElementById(`otp-${idx + 1}`)?.focus();
  }

  function handleKeyDown(e, idx) {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0)
      document.getElementById(`otp-${idx - 1}`)?.focus();
  }

  function handleResend() {
    setResent(true);
    setTimeout(() => setResent(false), 4000);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (otp.join('').length < 6) { setError('Please enter all 6 digits.'); return; }
    setError('');
    onNext();
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="flex flex-col items-center gap-2 mb-2 text-center">
        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-1">
          <ShieldCheck size={22} className="text-primary" />
        </div>
        <h2 className="text-[22px] font-black text-[#102a43] m-0">Check your email</h2>
        <p className="text-muted text-sm m-0 max-w-[300px]">
          We sent a 6-digit code to <span className="font-bold text-[#102a43]">{email}</span>
        </p>
      </div>

      <div className="flex gap-2 justify-center my-1">
        {otp.map((digit, i) => (
          <input
            key={i}
            id={`otp-${i}`}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e.target.value, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            className="w-11 h-12 border border-line rounded-xl text-center text-lg font-black outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition bg-white caret-primary"
          />
        ))}
      </div>
      {error && <p className="text-xs text-red-500 text-center -mt-1">{error}</p>}

      <div className="text-center">
        {resent ? (
          <p className="text-xs text-green-600 font-bold flex items-center gap-1"><Check size={12} /> Code resent successfully</p>
        ) : (
          <button type="button" onClick={handleResend}
            className="text-xs text-primary cursor-pointer hover:underline bg-transparent border-0 flex items-center gap-1 mx-auto">
            <RefreshCw size={12} /> Resend code
          </button>
        )}
      </div>

      <button type="submit"
        className="flex items-center justify-center gap-2 border-0 rounded-xl py-3 font-[850] cursor-pointer text-sm bg-gradient-to-r from-primary to-primary2 text-white shadow-[0_6px_20px_rgba(42,127,165,.35)] hover:shadow-[0_8px_24px_rgba(42,127,165,.45)] transition-shadow">
        <ShieldCheck size={15} /> Verify Code
      </button>
    </form>
  );
}

// ─── Step 3: New Password ──────────────────────────────────────────────────────
function StepNewPassword({ onDone }) {
  const [pw, setPw] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');

  const strength = pw.length === 0 ? 0 : pw.length < 6 ? 1 : pw.length < 10 ? 2 : 3;
  const strengthLabel = ['', 'Weak', 'Fair', 'Strong'];
  const strengthColor = ['', 'bg-red-400', 'bg-amber-400', 'bg-green-500'];

  function handleSubmit(e) {
    e.preventDefault();
    if (pw.length < 6) { setError('Password must be at least 6 characters.'); return; }
    if (pw !== confirm) { setError('Passwords do not match.'); return; }
    setError('');
    onDone();
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="flex flex-col items-center gap-2 mb-2 text-center">
        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-1">
          <KeyRound size={22} className="text-primary" />
        </div>
        <h2 className="text-[22px] font-black text-[#102a43] m-0">Set new password</h2>
        <p className="text-muted text-sm m-0 max-w-[300px]">
          Choose a strong password you haven't used before.
        </p>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] text-[#39576d] font-[800]">New password</label>
        <div className="relative">
          <input type={showPw ? 'text' : 'password'} placeholder="••••••••" value={pw}
            onChange={(e) => setPw(e.target.value)}
            className="w-full border border-line rounded-xl px-4 py-3 pr-11 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition bg-white" />
          <button type="button" onClick={() => setShowPw(!showPw)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-primary bg-transparent border-0 cursor-pointer p-0 text-xs">
            {showPw ? 'Hide' : 'Show'}
          </button>
        </div>
        {pw.length > 0 && (
          <div className="flex items-center gap-2">
            <div className="flex gap-1 flex-1">
              {[1, 2, 3].map(lvl => (
                <div key={lvl} className={`h-1 flex-1 rounded-full transition-all ${strength >= lvl ? strengthColor[strength] : 'bg-line'}`} />
              ))}
            </div>
            <span className={`text-[11px] font-bold ${strength === 1 ? 'text-red-400' : strength === 2 ? 'text-amber-500' : 'text-green-600'}`}>
              {strengthLabel[strength]}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] text-[#39576d] font-[800]">Confirm password</label>
        <div className="relative">
          <input type={showConfirm ? 'text' : 'password'} placeholder="••••••••" value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full border border-line rounded-xl px-4 py-3 pr-11 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition bg-white" />
          <button type="button" onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-primary bg-transparent border-0 cursor-pointer p-0 text-xs">
            {showConfirm ? 'Hide' : 'Show'}
          </button>
        </div>
        {confirm.length > 0 && pw !== confirm && (
          <p className="text-xs text-red-500">Passwords don't match.</p>
        )}
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}

      <button type="submit"
        className="flex items-center justify-center gap-2 mt-2 border-0 rounded-xl py-3 font-[850] cursor-pointer text-sm bg-gradient-to-r from-primary to-primary2 text-white shadow-[0_6px_20px_rgba(42,127,165,.35)] hover:shadow-[0_8px_24px_rgba(42,127,165,.45)] transition-shadow">
        <KeyRound size={15} /> Reset Password
      </button>
    </form>
  );
}

// ─── Success ───────────────────────────────────────────────────────────────────
function SuccessScreen() {
  return (
    <div className="flex flex-col items-center gap-4 text-center py-4">
      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
        <Check size={40} />
      </div>
      <h2 className="text-[22px] font-black text-[#102a43] m-0">Password reset!</h2>
      <p className="text-muted text-sm max-w-[280px] m-0">
        Your password has been updated. You can now sign in with your new password.
      </p>
      <Link href="/login"
        className="mt-2 flex items-center justify-center gap-2 rounded-xl py-3 px-8 font-[850] text-sm bg-gradient-to-r from-primary to-primary2 text-white no-underline shadow-[0_6px_20px_rgba(42,127,165,.35)] hover:shadow-[0_8px_24px_rgba(42,127,165,.45)] transition-shadow">
        Back to Sign In
      </Link>
    </div>
  );
}

// ─── Main ──────────────────────────────────────────────────────────────────────
export default function ForgotPasswordPage() {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState('');

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

      {/* Right Panel */}
      <div className="flex-1 bg-bg flex items-center justify-center p-12">
        <div className="w-full max-w-[420px]">

          {step < 3 && (
            <Link href="/login"
              className="flex items-center gap-1.5 text-xs text-muted hover:text-primary font-bold mb-6 no-underline transition-colors w-fit">
              <ArrowLeft size={13} /> Back to Sign In
            </Link>
          )}

          {step < 3 && <StepIndicator current={step} />}

          {step === 0 && <StepEmail onNext={(e) => { setEmail(e); setStep(1); }} />}
          {step === 1 && <StepOTP email={email} onNext={() => setStep(2)} />}
          {step === 2 && <StepNewPassword onDone={() => setStep(3)} />}
          {step === 3 && <SuccessScreen />}

          <div className="mt-8 pt-6 border-t border-line text-center text-xs text-muted">
            Need access? Contact your system administrator.
          </div>
        </div>
      </div>
    </div>
  );
}