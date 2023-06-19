import DefaultTheme from "vitepress/theme";
import "element-plus/dist/index.css";
import './custom.css'
import elementplus from "element-plus"
import {AntDesignContainer} from '@vitepress-demo-preview/component'
import '@vitepress-demo-preview/component/dist/style.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// import Pagination from "../components/Pagination.vue";


export default {
    ...DefaultTheme,
    enhanceApp: async ({app, router, siteData}) => {
        // app is the Vue 3 app instance from `createApp()`. router is VitePress'
        // custom router. `siteData`` is a `ref`` of current site-level metadata.
        app.use(elementplus, {
            locale: zhCn,
        });
        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
            app.component(key, component)
        }
        app.component('demo-preview', AntDesignContainer)
        // app.component('Pagination', Pagination)
    },
};
