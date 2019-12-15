const path = require('path');

module.exports = {
	 entry: './src/js/app.js',
	module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js']
  },
	 output: {
		filename: 'app.bundle.js',
		 path: path.resolve(__dirname, 'dist'),
	 },
};
