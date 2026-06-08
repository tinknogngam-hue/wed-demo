/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/', // ถ้าเข้ามาที่ URL หน้าแรกสุด
        destination: '/login', // ให้เด้งไปที่ /login
        permanent: false,
      },
    ]
  },
};

export default nextConfig;