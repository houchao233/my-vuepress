const { defaultTheme } = require('@vuepress/theme-default')
const { searchPlugin } = require('@vuepress/plugin-search')

module.exports = {
  lang: 'zh-CN',
  title: 'VuePress ',
  description: '记录日常的点点滴滴',
  head: [['link', { rel: 'icon', href: '/images/hero.png' }]],
  dest: "./dist", // 打包输出目录
  theme: defaultTheme({
    logo: '/images/hero.png',
    colorMode: 'dark', // 主题模式
    repo: 'https://github.com/houchao233/my-vuepress',
    editLinkText: '编辑此页面', // 编辑此页链接的文字。
    lastUpdatedText: '最近更新时间', // 最近更新时间戳 标签的文字。
    contributorsText: '贡献者列表',// 贡献者列表 标签的文字。
    // 编辑文档
    docsRepo: 'https://github.com/houchao233/my-vuepress',
    docsBranch: 'main',
    docsDir: 'docs',
    editLinkPattern: ':repo/tree/:branch/:path',
    // 导航
    navbar: [
      { text: "首页", link: "/" },
      { text: "我的笔记", link: "/myNotes/" },
      { text: "前端总结", link: "/mySummary/" },
      { text: "生活感悟", link: "/myLife/" },
      { text: "关于", link: "/about/" },
    ],
    // 侧边栏对象
    // 不同子路径下的页面会使用不同的侧边栏
    sidebar: {
      "/myNotes/": [
        {
          text: '我的笔记',
          children: [
            { text: "笔记一", link: "/myNotes/" },
          ]
        }
      ],
      "/myLife/": [
        {
          text: '生活感悟',
          children: [
            { text: "感悟一", link: "/myLife/" },
          ]
        }
      ],
      "/mySummary/": [
        {
          text: '我的总结',
          children: [
            { text: "总结一", link: "/mySummary/" },
          ]
        }
      ],
      "/about/": [
        {
          text: '关于',
          children: [
            { text: "关于一", link: "/about/" },
          ]
        }
      ],
    },
  }),
  plugins: [
    searchPlugin({
      isSearchable: (page) => page.path !== '/',  // 排除首页
      locales: {
        '/': {
          placeholder: '搜索文档',
        },
      },
    }),
  ],
}
