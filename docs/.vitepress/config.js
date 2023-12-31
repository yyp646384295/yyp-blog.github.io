import {defineConfig} from 'vitepress'
import {componentPreview, containerPreview} from '@vitepress-demo-preview/plugin'
// 侧边栏
const primarySidebar = {
    // 当用户在 `指南` 目录页面下将会展示这个侧边栏
    '/components/': [
        {
            text: '封装组件',
            collapsible: true,
            collapsed: true,
            items: [
                // This shows `/guide/table.md` page.
                {text: 'Table', link: '/components/Table/'}, // /guide/table.md
            ]
        },
    ],

    // 当用户在 `配置` 目录页面下将会展示这个侧边栏
    '/documents/': [
        {
            text: '学习笔记',
            collapsible: true,
            collapsed: true,
            items: [
                {
                    text: 'Git',
                    link: '/documents/Git/',
                    collapsible: true,
                    collapsed: true,
                    items: [
                        {
                            text: 'Git基本命令',
                            link: '/documents/Git/'
                        },
                        {
                            text: 'Github Actions',
                            link: '/documents/Git/github_actions/'
                        },
                    ]
                },
                {
                    text: 'Vue',
                    link: '/documents/Vue/',
                    collapsible: true,
                    collapsed: true,
                    items: [
                        {
                            text: '整理归纳',
                            link: '/documents/Vue/'
                        },
                        // {
                        //     text: 'Vue.js 设计与实现',
                        //     link: '/documents/Vue/design'
                        // }
                    ]
                }, // /config/table.md
            ]
        }
    ],
}
export default defineConfig({
    base: "/yyp-blog.github.io/",
    lastUpdated: true,
    cleanUrls: true,
    title: 'You',
    titleTemplate: "Blog",
    vite: {
        server: {
            port: 5177,
        },
    },
    markdown: {
        theme: {
            light: 'vitesse-light',
            dark: 'vitesse-dark'
        },
        lineNumbers: true,
        config(md) {
            md.use(componentPreview)
            md.use(containerPreview)
        }
    },
    themeConfig: {
        lastUpdatedText: '最近更新',
        outlineTitle: '页面目录',
        logo: '/icons.png',
        siteTitle: false,
        smoothScroll: true,
        docFooter: {
            prev: '上一篇',
            next: '下一篇'
        },
        nav: [
            {text: "首页", link: "/"},
            {text: "组件", link: "/components/Table/"},
            {text: "笔记", link: "/documents/Vue/"},
        ],
        socialLinks: [
            {icon: "github", link: "https://github.com/yyp646384295"},
        ],
        sidebar: primarySidebar,
        footer: {
            message: 'Personal blog',
            copyright: 'Copyright © 2023-现在 You yan ping'
        },
    },

})
