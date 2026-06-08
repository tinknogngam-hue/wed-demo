import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { appRoutes } from './routes/route'; // เช็ค Path ตรงนี้ให้ตรงกับไฟล์ของคุณ

// 1. ส่วนตรวจสอบสิทธิ์ (ถ้ายังไม่มี Token ให้ดีดกลับไปหน้า Login)
const ProtectedRoute = ({ element }) => {
  const isAuthenticated = !!localStorage.getItem('token'); // เช็คจาก Token
  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

// 2. การทำ Lazy Loading ให้โหลดหน้าไวขึ้น
const BaseLayout = React.lazy(() => import('./layouts/Base'));

const Page404 = () => {
  return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <h1>Oops! You seem to be lost.</h1>
          <p>Here are some helpful links:</p>
          <Link to='/dashboard'>Back to Home</Link>
      </div>
  );
}

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse">Loading...</div>
  </div>
);

function App() {
  useEffect(() => {
    // โค้ดที่ต้องการให้ทำงานตอนเริ่มต้น
  }, []);

  return (
    <div className="App">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Suspense fallback={loading}>
          <Routes>
            
            {/* --- 1. หน้าแรกสุด (Root) ให้ Redirect ไป Dashboard หรือ Login ทันที --- */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            {/* --- 2. Public Routes แบบสแตติก --- */}
            <Route path="/404" element={<Page404 />} />

            {/* --- 3. Map Routes จากไฟล์ appRoutes ของเรา --- */}
            {appRoutes.map((route, index) => {
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    route.isPrivate ? (
                      // 🔒 หน้าภายในระบบ (isPrivate: true): ต้องผ่านตัวตรวจสิทธิ์ และมีเมนูแถบบนแสดงผล
                      <ProtectedRoute 
                        element={
                          <BaseLayout>
                            {route.element}
                          </BaseLayout>
                        } 
                      />
                    ) : (
                      // 🔓 หน้าทั่วไป (ไม่มีกำหนดหรือเป็น false): ให้เรนเดอร์คอมโพเนนต์ดิบๆ โดยไม่มีเมนูด้านบนมาครอบ
                      route.element
                    )
                  }
                />
              );
            })}

            {/* --- 4. Catch All (กรณีพิมพ์ URL มั่วๆ จะเด้งมาที่นี่) --- */}
            <Route path="*" element={<Navigate to="/404" replace />} />

          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;