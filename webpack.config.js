const webpack = require('webpack');
const path = require( 'path' );
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env, argv)=>{
 	let obj = {
		entry: {
			main: "./src/app.js"
		},
		output: {
			path: path.resolve('./public'),
			publicPath: '',
			filename: "main.js"
		},
		target: ['web', 'es6'],
		optimization: {
			usedExports: true
		},
		devServer: {
			client: { logging: 'warn'}
    	},
		module: {
			rules: [
			    {
				    test: /\.m?js$/,
				    exclude: /(node_modules)/,
				    use: {
				        loader: "babel-loader",
				        options: {
				        	presets: [
				        	["@babel/preset-env",
				        	{targets: {node: 16}}], 
				        	"@babel/preset-react"
				        	]
				        }
					}
			    },
				{
				    test: /\.s?css$/,
				    use: ['style-loader', 'css-loader', 'sass-loader']
				}
			]
		} 		
 	};
 	if(argv.mode === 'production'){
 		obj.optimization.minimize = true;
 		obj.optimization.minimizer = [new TerserPlugin({
      	extractComments: false,
      	terserOptions: {format: {comments: false}},
    })];
 	}else{
 		obj.devtool = "eval-cheap-source-map";
 	}
 	return obj;
}