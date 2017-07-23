exports.modifyWebpackConfig = ({config, stage}) => {
	if ([
		'develop',
		'develop-html',
		'build-html',
		'build-javascript'
	].includes(stage)) {
		// Remove svg from url-loader config
		config.loader(`url-loader`, {
			test: /\.(jpg|jpeg|png|gif|mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
			loader: `url`,
			query: {
				limit: 10000,
				name: `static/[name].[hash:8].[ext]`,
			},
		})
		config.loader('svg-react-loader', {
			test: /\.svg$/,
			loader: 'svg-react-loader'
		});
	}

	return config;
}
