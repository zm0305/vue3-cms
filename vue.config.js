const path = require('path')

module.exports = {
  //配置方式一：cli提供的属性
  outputDir: './build',
  //配置本地liveserve打包后的前置路径，生产环境无需配置
  publicPath: './',
  //配置方式二：和webpack的属性完全一致，最后会进行合并
  // configureWebpack: {
  //   resolve: {
  //     alias: {
  //       components: '@/components'
  //     }
  //   }
  // },
  // configureWebpack: (config) => {
  //   //覆盖原来的alias配置
  //   config.resolve.alias = {
  //     '@': path.resolve(__dirname, 'src'),
  //     components: '@/components'
  //   }
  // },
  //配置方式三：链式编程
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', path.resolve(__dirname, 'src'))
      .set('components', '@/components')
  }
}
