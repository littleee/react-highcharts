var webpack = require('webpack');
const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var glob = require('glob');

var entries = getEntry('app/js/**.js','app/js/');
module.exports = {
    //页面入口文件配置
    entry: entries,
    //入口文件输出配置
    output: {
        path: path.join(__dirname,'build'),//生成文件的根目录
        publicPath: "/dist/",
        filename: 'js/[name].js'
    },
    plugins: [new HtmlWebpackPlugin({
      inject: 'body'|false,
      template: 'index.htm'
    })],
    module: {
        //加载器配置
        loaders: [
            {
               test: /\.(js|jsx?)$/,
               exclude: /node_modules/,
               loader: 'babel-loader',
               query: {
                 presets: [
                     'es2015',
                     'react',
                     'stage-0'
                 ]
              }
            },
            { test: /\.css$/, loader: 'style-loader!css-loader' }
        ]
    }
};

function getEntry(globPath,pathDir){

	var files = glob.sync(globPath);
	var entries = {},
		entry, dirname, basename, pathname, extname;

	for(var i = 0; i < files.length; i++){
		entry = files[i];
		dirname = path.dirname(entry);
		extname = path.extname(entry);
		basename = path.basename(entry, extname);
		pathname = path.normalize(path.join(dirname, basename));
		pathDir = path.normalize(pathDir);

		if (pathname.startsWith(pathDir)) {
			pathname = pathname.substring(pathDir.length);
		}

		pathname = pathname.replace(/\\/g, '/');

		entries[pathname] = ['./' + entry];
	}

	return entries;

}
