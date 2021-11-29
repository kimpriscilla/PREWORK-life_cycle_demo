//!setting up some rules

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/, //!if you come across a file that ends with .js
        loader: "babel-loader", //!use the babel loader
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react"], //presets are a way of telling babel to transpile something
        },
      },
    ],
  },
};
