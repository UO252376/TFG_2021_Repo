
const path = require('path');
const { webpack } = require('webpack');
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  resolve: {
    alias: {
      'styles': path.join(__dirname, 'styles'),
    },
    extensions: ['', '.js', '.jsx', '.css']
  },
  module: {
    rules	: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [ '@babel/preset-env', '@babel/preset-react']
        }
      }, {
        test: /\.css?$/,
        exclude: /node_modules/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      io: 'socket.io-client',
      socketio: 'socket.io'
    })
  ]
};