
// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  routes: [
    {
      path: '/',
      component: '../layouts/index',
      routes: [
        { path: '/', component: '../pages/Home' }
      ]
    }
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: {immer: true},
      dynamicImport: false,
      title: 'AntdM-Umi-Dva',
      dll: false,
      /* hd即高清方案,移动端开启，pc端不建议开启，会自动转换px为rem,以750为单位1rem=100px=baseFontSize,
      其他屏按宽度计算baseFontSize,例如设计稿为1920，那么baseFontSize=256,rem计算公式为px/256*/
      hd: true,

      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
  proxy: {
    '/api': {
      'target': 'http://ppd.shzenon.cn/',
      'changeOrigin': true,
      'pathRewrite': { '^/api' : '' },
    },
  }
}
