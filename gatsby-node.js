exports.onCreateWebpackConfig = ({
	stage, actions, getConfig, rules
}, { rule: ruleProps = {} }) => {
	const { include, exclude } = ruleProps

	if([
		'develop',
		'develop-html',
		'build-html',
		'build-javascript'
	].includes(stage)) {
		// Add the svg-react-loader rule
		actions.setWebpackConfig({
			module: {
				rules: [
					{
						use: 'svg-react-loader',
						test: /\.svg$/,
						...ruleProps,
					}
				],
			}
		})
		const cfg = getConfig()
		const imgsRule = rules.images()

		const newUrlLoaderRule = (include || exclude) ? {
			...imgsRule,
			include: exclude,
			exclude: include
		} : {
			...imgsRule,
			test: new RegExp(imgsRule.test.toString().replace('svg|', '').slice(1, -1))
		}

		cfg.module.rules = [
			// Remove the base url-loader images rule entirely
			...cfg.module.rules.filter(rule => {
				if(rule.test) {
					return rule.test.toString() !== imgsRule.test.toString()
				}
				return true
			}),
			// Put it back without SVG loading
			newUrlLoaderRule
		]
		actions.replaceWebpackConfig(cfg)
	}
}

