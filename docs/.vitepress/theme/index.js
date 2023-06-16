import DefaultTheme from "vitepress/theme";
import "element-plus/dist/index.css";
import './custom.css'
import elementplus from "element-plus"
import CodeBoxs from '../src/components/CodeBoxs.vue';
import {AntDesignContainer} from '@vitepress-demo-preview/component'
import '@vitepress-demo-preview/component/dist/style.css'

export default {
    ...DefaultTheme,
    enhanceApp: async ({app, router, siteData}) => {
        // app is the Vue 3 app instance from `createApp()`. router is VitePress'
        // custom router. `siteData`` is a `ref`` of current site-level metadata.
        app.use(elementplus);
        app.component('demo-preview', AntDesignContainer)
    },
};
