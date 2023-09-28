import { sidebar } from "vuepress-theme-hope";

export default sidebar({
    "/": [
        "",
        {
            text: "如何使用",
            icon: "laptop-code",
            prefix: "demo/",
            link: "demo/",
            children: "structure",
        },
        {
            text: "文章",
            icon: "book",
            prefix: "posts/",
            children: "structure",
        },
        {
            text: "笔记",
            icon: "blog",
            prefix: "blog/",
            link:"blog/",
            collapsible: true, // 添加 collapsible 属性，使菜单项可折叠，false默认折叠，true默认展开
            children: "structure",
        },
        "intro",
        "slides",
    ],
});
