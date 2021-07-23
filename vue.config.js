module.exports = {
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    open: false,
    host: '0.0.0.0',
    port: 8000,
    https: false,
    hotOnly: false,
    //配置代理
    proxy: {
      //以'/v1'开头的接口会转接到下面的target的ip
      '/v1': {
        target: 'https://api.lionnft.net/', // target host
        changeOrigin: true, // needed for virtual hosted sites
        ws: false, // proxy websockets
        pathRewrite: {
          //路径重写
          '^/v1': '/v1/', // rewrite path
        },
        logLevel: 'debug'
      },
      // '/socket.io': {
      //   target: '192.168.0.108:9999', // target host
      //   changeOrigin: true, // needed for virtual hosted sites
      //   logLevel: 'debug'
      // }
    }
  },
  publicPath: '/'
};

