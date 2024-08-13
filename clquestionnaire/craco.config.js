module.exports = {
  webpack: {
    //缓存 固定版本的包
    configure(webpackConfig) {
      //只在生产环境才抽离公共代码
      if (webpackConfig.mode === 'production') {
        if (webpackConfig.optimization === null) {
          webpackConfig.optimization = {}
        }
        webpackConfig.optimization.splitChunks = {
          chunks: 'all',
          cacheGroups: {
            antd: {
              name: 'antd-chunk',
              test: /antd/,
              priority: 100,
            },
            reactDom: {
              name: 'reactDom-chunk',
              test: /react-dom/,
              priority: 99,
            },
            // vendors:供应商 (一般表示第三方库)
            vendors: {
              name: 'vendors-chunk',
              test: /node_modules/,
              priority: 98,
            }
          }
        }
      }
      return webpackConfig
    }
  },
  devServer: {
    port: 8000, //B端 前端
    proxy: {
      "/api": "http://localhost:3001"
    },
    client: {
      overlay: false
    }
  }
}