import path from 'path'
const __dirname = path.resolve();
import nodeExternals from 'webpack-node-externals'
import dotenv from 'dotenv-webpack';

export default {
  mode: "production",
  entry: "./index.ts",
  target: "node",
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.cjs"
  },
  plugins: [
    new dotenv()
  ],
  resolve: {
    extensions: [".ts", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.ts?/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  }
}