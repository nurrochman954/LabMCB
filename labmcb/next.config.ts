import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Konfigurasi untuk gambar
  images: {
    domains: ['res.cloudinary.com'],
  },
  
  // Konfigurasi rewrites
  async rewrites() {
    return [
      // API routes
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
      // Admin routes
      {
        source: '/admin/:path*',
        destination: '/admin/:path*',
      },
      // Handle root path dan dynamic routes
      {
        source: '/:path*',
        destination: '/:path*',
      }
    ];
  },

  // Tambahan konfigurasi untuk production
  output: 'standalone',
  
  // Pengaturan untuk development
  reactStrictMode: true,
  
  // Konfigurasi untuk dynamic routes
  trailingSlash: false,
};

export default nextConfig;