module.exports = {
  plugins: [
    [
      'import',
      {
        libraryName: 'element-plus',
        customStyleName: (name) => {
          return `element-plus/theme-chalk/${name}.css`
        },
        customName: (name) => {
          let nameList = name.split('-')
          let sLength = '-item'.length
          let nLength = String(name).length
          if (nameList.length && nameList.includes('item')) {
            return `element-plus/lib/components/${name.slice(
              3,
              nLength - sLength
            )}`
          }
          return `element-plus/lib/components/${name.slice(3)}`
        }
      }
    ]
  ],
  presets: ['@vue/cli-plugin-babel/preset']
}
