import path from 'path';
/** @type {import('next').NextConfig} */
const __dirname = path.dirname(new URL(import.meta.url).pathname);
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: __dirname,
};
export default nextConfig;