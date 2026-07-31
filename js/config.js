// 博客配置文件

const CONFIG = {
    // 站点信息
    siteName: 'Tech Blog',
    siteDescription: '分享编程、AI和开发相关知识',
    author: '你的名字',

    // 社交链接
    social: {
        github: 'https://github.com/yourusername',
        email: 'your.email@example.com',
        twitter: 'https://twitter.com/yourusername'
    },

    // 文章配置
    posts: {
        // 文章数据文件路径
        dataPath: 'data/posts.json',
        // Markdown文件目录
        postsDir: 'posts/',
        // 每页显示文章数
        pageSize: 10
    },

    // 导航菜单
    nav: [
        { title: '首页', path: 'index.html' },
        { title: '关于', path: 'about.html' }
    ]
};

// 导出配置
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}