const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = function (env) {
	const isEnvProduction = env === "production";
	return {
		mode: "development",
		entry: {
			app: "./src/index.ts",
		},
		devtool: "inline-source-map",
		devServer: {
			static: "./dist",
		},
		output: {
			path: path.resolve(__dirname, "dist"),
			filename: "[name].bundle.js",
			clean: true,
		},
		resolve: {
			extensions: [".ts", ".js", ".css"],
		},
		module: {
			rules: [
				{
					test: /\.(ts)?$/,
					loader: "ts-loader",
					exclude: /node_modules/,
				},
				{
					test: /\.css$/,
					use: ["css-loader"],
				},
				{
					test: /\.(html)$/,
					loader: "html-loader",
				},
			],
		},
		plugins: [
			new HtmlWebpackPlugin(
				Object.assign(
					{},
					{
						inject: true,
						template: path.resolve(__dirname, "dist/index.html"),
					},
					isEnvProduction
						? {
								minify: {
									removeComments: true,
									collapseWhitespace: true,
									removeRedundantAttributes: true,
									useShortDoctype: true,
									removeEmptyAttributes: true,
									removeStyleLinkTypeAttributes: true,
									keepClosingSlash: true,
									minifyJS: true,
									minifyCSS: true,
									minifyURLs: true,
								},
						  }
						: undefined
				)
			),
		],
	};
};
