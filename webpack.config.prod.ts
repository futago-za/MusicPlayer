import path from 'path';
import { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const base: Configuration = {
  mode: 'production',
  node: {
    __dirname: false,
    __filename: false,
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: './',
    filename: '[name].js',
    assetModuleFilename: 'images/[name][ext]',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          { loader: 'ts-loader' },
          { loader: 'ifdef-loader', options: { DEBUG: false } },
        ],
      },
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: false },
          },
        ],
      },
      {
        test: /\.(bmp|ico|gif|jpe?g|png|svg|ttf|eot|woff?2?)$/,
        type: 'asset/resource',
      },
    ],
  },
  stats: 'errors-only',
  performance: { hints: false },
  optimization: { minimize: true },
  devtool: undefined,
};

const main: Configuration = {
  ...base,
  target: 'electron-main',
  entry: {
    main: './electron/main.ts',
  },
};

const preload: Configuration = {
  ...base,
  target: 'electron-preload',
  entry: {
    preload: './electron/preload.ts',
  },
};

const renderer: Configuration = {
  ...base,
  target: 'electron-renderer',
  entry: {
    index: './src/index.tsx',
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: true,
      inject: 'body',
      filename: 'index.html',
      scriptLoading: 'blocking',
    }),
  ],
};

export default [main, preload, renderer];