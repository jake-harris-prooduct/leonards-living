const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  reactStrictMode: true,
  assetPrefix: isProd ? '/leonards-living/' : '',
  basePath: isProd ? '/leonards-living' : '',
};
