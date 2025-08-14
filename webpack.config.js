const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'arabic.js',
    library: 'ArabicMathJax',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  mode: 'production'
};
