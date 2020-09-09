require('dotenv').config();
module.exports = {
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          {loader: 'file-loader', options: {name: 'assets/css/style.css'}},
          'extract-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
};
