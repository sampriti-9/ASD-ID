// config-overrides.js
module.exports = function override(config) {
  // Avoid resolving 'fs' module in browser (face-api tries to but we ignore it)
  config.resolve.fallback = {
    ...config.resolve.fallback,
    fs: false
  };

  return config;
};
