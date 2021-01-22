// vue.config.js
//引入postcss-plugin-px2rem
const px2rem = require("postcss-plugin-px2rem");
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
    },
    //设置px2rem
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    px2rem({ // postcss-plugin-px2rem 默认配置
                        rootValue: 37.5,
                        unitPrecision: 5,
                        propWhiteList: [],
                        propBlackList: [],
                        exclude: false,
                        selectorBlackList: [],
                        ignoreIdentifier: false,
                        replace: true,
                        mediaQuery: false,
                        minPixelValue: 0
                    })
                ]
            }
        }
    },
}