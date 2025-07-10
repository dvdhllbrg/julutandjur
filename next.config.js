/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  swcMinify: true,
  experimental: {
    runtime: "experimental-edge",
  },
   images: {
    loader: 'custom',
    loaderFile: './loader.js',
  },
};
