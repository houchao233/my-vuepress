const { defaultTheme } = require('@vuepress/theme-default')

module.exports = {
  lang: 'zh-CN',
  title: '你好， VuePress ！',
  description: '记录日常的点点滴滴',
  head: [['link', { rel: 'icon', href: '/images/hero.png' }]],
  dest: "./dist",
  theme: defaultTheme({
    logo: '/images/hero.png',
    colorMode: 'dark',
    repo: 'https://github.com/houchao233/my-vuepress',
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
}
