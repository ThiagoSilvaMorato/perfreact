/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = nextConfig;

const withBundleAnalyzer = requires("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports - withBundleAnalyzer({});
