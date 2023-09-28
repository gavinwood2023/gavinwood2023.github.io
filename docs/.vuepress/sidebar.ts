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
            text: "博客",
            icon: "blog",
            prefix: "blog/",
            link:"blog/",
            children: "structure",
        },
        "intro",
        "slides",
    ],
});
