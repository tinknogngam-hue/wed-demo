import Login          from '../pages/login';
import ForgotPassword from '../pages/forgot-password';
import Dashboard      from '../pages/dashboard';
import Register       from '../pages/register';
import EMR            from '../pages/emr';
import Appointment    from '../pages/appointment';
import IPD            from '../pages/ipd';
import Lab            from '../pages/lab';
import Imaging        from '../pages/imaging';
import Pharmacy       from '../pages/pharmacy';
import Inventory      from '../pages/inventory';
import Billing        from '../pages/billing';

export const appRoutes = [
  // หน้าทั่วไป (ไม่ต้องเข้าสู่ระบบ และไม่ต้องแสดงเมนูด้านบน)
  { path: '/login',           element: <Login />,           title: 'Login' },
  { path: '/forgot-password', element: <ForgotPassword />,  title: 'Forgot Password' },
  
  // หน้าภายในระบบ (ต้องล็อกอิน และต้องการให้แสดงเมนูด้านบน)
  { path: '/dashboard',       element: <Dashboard />,       title: 'Dashboard',           isPrivate: true },
  { path: '/register',        element: <Register />,        title: 'Register / Walk-in',  isPrivate: true },
  { path: '/emr',             element: <EMR />,             title: 'OPD / EMR',           isPrivate: true },
  { path: '/appointment',     element: <Appointment />,     title: 'Appointment',         isPrivate: true },
  { path: '/ipd',             element: <IPD />,             title: 'IPD',                 isPrivate: true },
  { path: '/lab',             element: <Lab />,             title: 'Laboratory',          isPrivate: true },
  { path: '/imaging',         element: <Imaging />,         title: 'Imaging',             isPrivate: true },
  { path: '/pharmacy',        element: <Pharmacy />,        title: 'Pharmacy',            isPrivate: true },
  { path: '/inventory',       element: <Inventory />,       title: 'Inventory',           isPrivate: true },
  { path: '/billing',         element: <Billing />,         title: 'Billing',             isPrivate: true },
];