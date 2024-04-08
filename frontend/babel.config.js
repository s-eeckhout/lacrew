module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            utils: './utils', // Adjust according to your project structure
            // Add other aliases here if needed
          },
        },
      ],
    ],
  };
  };
  