// vue.config.js
module.exports = {
    //关闭es语法检测
    lintOnSave: false,
    //设置路径别名
    configureWebpack: {
        resolve: {
            alias: {
                'assets': '@/assets',
                'common': '@/common',
                'components': '@/components',
                'network': '@/network',
                'views': '@/views',
            }
        }
    }

}