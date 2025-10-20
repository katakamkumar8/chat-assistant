const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv');
const portfinder = require('portfinder');

// Load environment variables
dotenv.config({ path: './env.local' });

// Set portfinder base port
portfinder.basePort = parseInt(process.env.PORT) || 3000;

module.exports = async () => {
  const port = await portfinder.getPortPromise();
  
  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
        title: 'Mchat Interface',
      }),
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(process.env)
      }),
    ],
    devServer: {
      static: {
        directory: path.join(__dirname, 'public'),
      },
      compress: true,
      port: port,
      host: 'localhost',
      hot: true,
      open: true,
      historyApiFallback: true,
      client: {
        overlay: {
          errors: true,
          warnings: false,
        },
      },
      onListening: function (devServer) {
        if (!devServer) {
          throw new Error('webpack-dev-server is not defined');
        }

        const actualPort = devServer.server.address().port;
        console.log('🚀 Application is running at:');
        console.log(`   Local:   http://localhost:${actualPort}/`);
        console.log(`   Network: http://192.168.1.176:${actualPort}/`);
      },
      setupExitSignals: true,
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
  };
};
