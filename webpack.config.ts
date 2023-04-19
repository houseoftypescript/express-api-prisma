import path from 'path';
import nodeExternals from 'webpack-node-externals';

const isProduction = process.env.NODE_ENV === 'production';
const mode = isProduction ? 'production' : 'development';

export default {
  mode,
  target: 'node',
  entry: path.resolve(__dirname, 'src/server.ts'),
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'server.js',
  },
  plugins: [
    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: 'ts-loader',
        exclude: ['/node_modules/'],
      },
      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
};
