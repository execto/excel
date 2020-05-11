const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const path = require("path");

module.exports = {
	context: path.resolve(__dirname, "src"),
	mode: "development",
	entry: "./index.js",
	output: {
		filename: "bundle.[hash].js",
		path: path.resolve(__dirname, "dist"),
	},
	resolve: {
		extensions: [".js"],
		alias: {
			"@": path.resolve(__dirname, "src"),
			"@core": path.resolve(__dirname, "src/core"),
		},
	},
	plugins: [
		new HtmlWebpackPlugin(),
		new CopyPlugin([
			{
				from: path.resolve(__dirname, "./src/favicon.ico"),
				to: path.resolve(__dirname, "dist"),
			},
		]),
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: "build.[hash].css",
		}),
	],
};
