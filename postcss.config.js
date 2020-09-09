require('dotenv').config();
let config = {};

if (process.env.NODE_ENV === 'production') {
  config = {
    plugins: [
      require('autoprefixer'),
      require('@fullhuman/postcss-purgecss')({
        content: ['./views/**/*.handlebars'],
      }),
    ],
  };
}

module.exports = config;
