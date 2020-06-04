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
            '/api': {     
                target: 'http://127.0.0.1:3000',  
                ws: true,        
                secure: false,  
                changeOrigin: true,  
                pathRewrite:{
                    '^/api':''
                }
            }
        }
      }
}

 