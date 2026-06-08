// src/pages/_app.js
import '../app/globals.css';
import AppHeader from '../nav/AppHeader';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {
  const router = useRouter();

  // กำหนดว่าหน้าไหนบ้างที่ไม่ต้องมี Header / เมนูนำทาง
  const isAuthPage = router.pathname === '/login' || router.pathname === '/signup';

  // ถ้าเป็นหน้า Login หรือ Sign Up ให้แสดงผลแค่ตัวหน้าเว็บนั้นเดี่ยวๆ (เต็มจอ)
  if (isAuthPage) {
    return <Component {...pageProps} />;
  }

  // ถ้าเป็นหน้าอื่นๆ ในระบบ ให้แสดง Header ด้านบนตามปกติ
  return (
    <div className="flex flex-col h-screen min-w-[1360px] bg-[#f6f9fb]">
      <AppHeader />
      <main className="flex-1 overflow-hidden flex flex-col relative z-0">
        <Component {...pageProps} />
      </main>
    </div>
  );
}