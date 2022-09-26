const { defaultTheme } = require('@vuepress/theme-default')
const { searchPlugin } = require('@vuepress/plugin-search')

// 我的笔记目录
const myNotes = [
  "/myNotes/linux.md",
  "/myNotes/git.md",
  "/myNotes/function.md"
]

// 环境搭建目录
const myBuild = [
  "/myBuild/nexus.md",
  "/myBuild/npm.md"
]

// 生活感悟目录
const myLife = [
  "/myLife/index.md"
]

// 关于目录
const about = [
  "/about/index.md"
]

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
    // 编辑文档设置
    docsRepo: 'https://github.com/houchao233/my-vuepress',
    docsBranch: 'main',
    docsDir: 'docs',
    editLinkPattern: ':repo/tree/:branch/:path',
    // 导航
    navbar: [
      { text: "首页", link: "/" },
      { text: "环境搭建", children: myBuild },
      { text: "我的笔记", children: myNotes },
      { text: "生活感悟", children: myLife },
      { text: "关于", link: "/about/index.md" },
    ],
    // 侧边栏对象
    // 不同子路径下的页面会使用不同的侧边栏
    sidebar: {
      "/myBuild/": [{ text: '环境搭建', children: myBuild }],
      "/myNotes/": [{ text: '我的笔记', children: myNotes }],
      "/myLife/": [{ text: '生活感悟', children: myLife }],
      "/about/": [{ text: '关于', children: about }],
    },
  }),
  plugins: [
    // 搜索插件
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
