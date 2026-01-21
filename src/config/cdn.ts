export const CDN_BASE = (() => {
  const url =
    process.env.NEXT_PUBLIC_CDN_BASE ||
    'https://cdn.jsdelivr.net/gh/nordic96/portfolio_assets';
  if (url && !url.startsWith('https://')) {
    throw new Error('CDN_BASE must use HTTPS');
  }
  return url;
})();
