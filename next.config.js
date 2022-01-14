const withPlugins = require('next-compose-plugins')
const optimizedImages = require('next-optimized-images')
const withLess = require('next-with-less')

const nextConfig = {
	reactStrictMode: false,
	trailingSlash: true,

	exportPathMap: function() {
		return {
			'/': {page: '/' }
		}
	},
	env: {
		INFURA_PROJECT_ID: '9a94ee6d98df438ead99a701a2dda644',
		BURNER_PRIVATE_KEY: 'cbd42cf1daf0f4dfecb3d638b41df03422fee40a6bd446f077836fb776698a10',
		REACT_APP_MORALIS_APPLICATION_ID : 'Ljh4xnTGXWxgJCNkTbwxgqwa9FbZYzUBCrQPHxIc',
		REACT_APP_MORALIS_SERVER_URL : 'https://3e3laluougsu.usemoralis.com:2053/server'
	},
	images: {
		domains: ['ipfs.infura.io'],
	  },
}
module.exports = withPlugins([
	[optimizedImages, {
		/* config for next-optimized-images */
	  }],
	  withLess({
		// reactStrictMode: true,
		lessLoaderOptions: {},
	}),
	 nextConfig
])
