var path = require('path')
function resolve (dir){
    return path.join(__dirname,dir)
}
module.exports = {
    chainWebpack: (config)=>{
        config.resolve.alias
        .set("@",resolve('src'))
        .set("assets",resolve('src/assets/'))
        .set("views",resolve('src/views/'))
    },
    devServer: {
        proxy: {
            '/api': {     //这里最好有一个 /
                target: 'http://127.0.0.1:9000/api',  // 后台接口域名
                ws: true,        //如果要代理 websockets，配置这个参数
                secure: false,  // 如果是https接口，需要配置这个参数
                changeOrigin: true,  //是否跨域
                pathRewrite:{
                    '^/api':''
                }
            }
        }
      }
}
  //vue-cli3.0 里面的 vue.config.js做配置
 