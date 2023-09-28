import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import {hopeTheme} from "vuepress-theme-hope";

export default defineUserConfig({
    base: "/",
    host: '0.0.0.0',
    port: 8099,

    lang: "zh-CN",
    title: "博文分享",
    description: "基于vuepress-theme-hope搭建的技术分享平台",

    theme,

    // Enable it with pwa
    // shouldPrefetch: false,
});