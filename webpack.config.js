const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv');
const portfinder = require('portfinder');

// Load environment variables (fallback to .env.local if exists, but use process.env if set)
// This allows GitHub Actions to inject env vars directly
// process.env takes precedence over file-based config
const envFile = dotenv.config({ path: './env.local' });
const fileEnv = envFile.parsed || {};
// Get API key from process.env first (for CI/CD), then fallback to file
const apiKey = process.env.REACT_APP_GROQ_API_KEY || fileEnv.REACT_APP_GROQ_API_KEY || '';

// Set portfinder base port
portfinder.basePort = parseInt(process.env.PORT || fileEnv.PORT) || 3000;

module.exports = async (env, argv) => {
  const port = await portfinder.getPortPromise();
  const isProduction = argv.mode === 'production';
  
  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      clean: true,
      publicPath: isProduction ? '/chat-assistant/' : '/',
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
        'process.env.REACT_APP_GROQ_API_KEY': JSON.stringify(apiKey),
        'process.env.NODE_ENV': JSON.stringify(argv.mode === 'production' ? 'production' : 'development'),
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
