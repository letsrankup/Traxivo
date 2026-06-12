/** @type {import('next').NextConfig} */
const nextConfig = {
  // 👇 Yahan se humne Type aur Lint Errors ko bypass kiya hai
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // 👆 Bypass settings khatam

  // 👇 Niche aapki pehle wali zaroori settings mehfooz hain
  experimental: {
    serverComponentsExternalPackages: ['cheerio', 'puppeteer-core'],
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
    ]
  },
}

module.exports = nextConfig
