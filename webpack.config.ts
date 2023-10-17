import path, { resolve as _resolve, join } from 'path'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import type webpack from 'webpack'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const TranslationsPlugin = require('./webpack/translations-plugin')

const externalAssets = {
  js: [
    'https://assets.zendesk.com/apps/sdk/2.0/zaf_sdk.js'
  ]
}

const config: webpack.Configuration = {
  entry: {
    app: [
      './src/typescripts/locations/ticket_sidebar.ts',
      './src/index.css'
    ]
  },
  output: {
    filename: '[name].js',
    path: _resolve(__dirname, 'dist/assets')
  },
  module: {
    rules: [
      {
        test: /\.(?:ts|tsx|js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript']
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { url: false } },
          'postcss-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['', '.ts', '.tsx', '.js', '.jsx']
  },
  plugins: [
    // Empties the dist folder
    new CleanWebpackPlugin({
      verbose: true,
      cleanOnceBeforeBuildPatterns: [join(process.cwd(), 'dist/**/*')]
    }),

    // Copy over static assets
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/manifest.json', to: '../[name][ext]' },
        { from: 'src/images/*', to: './[name][ext]' }
      ]
    }),

    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),

    new TranslationsPlugin({
      entryOnly: true,
      path: path.resolve(__dirname, './src/translations')
    }),

    new HtmlWebpackPlugin({
      warning: 'AUTOMATICALLY GENERATED FROM ./src/templates/iframe.html - DO NOT MODIFY THIS FILE DIRECTLY',
      vendorJs: externalAssets.js,
      template: './src/templates/iframe.html',
      filename: 'iframe.html'
    })
  ]
}

export default config
