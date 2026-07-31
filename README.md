# 个人技术博客

一个简洁、现代的技术博客网站，采用深色主题设计，专注于编程、AI和开发相关内容的分享。

## 特性

- 深色主题 - GitHub风格的深色设计，护眼且现代
- Markdown管理 - 使用Markdown文件管理文章，简单直观
- 代码高亮 - 集成highlight.js，支持多种编程语言
- 响应式设计 - 完美适配移动端和桌面端
- 纯前端实现 - 无需服务器，可部署到任何静态托管
- 标签系统 - 支持文章标签分类
- 时间归档 - 按年份自动分组文章

## 项目结构

```
bk1/
├── index.html              # 首页 - 文章列表
├── post.html               # 文章详情页模板
├── about.html              # 关于页面
├── css/
│   ├── style.css           # 主样式文件
│   ├── dark-theme.css      # 深色主题样式
│   └── markdown.css        # Markdown渲染样式
├── js/
│   ├── main.js             # 主逻辑
│   ├── posts.js            # 文章加载和渲染
│   └── config.js           # 配置文件
├── posts/                  # Markdown文章目录
├── assets/                 # 静态资源
│   └── images/
├── data/
│   └── posts.json          # 文章元数据配置
└── README.md               # 项目说明
```

## 快速开始

### 本地运行

1. 使用浏览器直接打开 `index.html`

2. 或使用本地服务器（推荐）：

   ```bash
   # Python 3
   python -m http.server 8000

   # Node.js
   npx http-server
   ```

3. 访问 `http://localhost:8000`

### 添加新文章

1. 在 `posts/` 目录创建新的Markdown文件

2. 在 `data/posts.json` 添加文章元数据：

   ```json
   {
     "id": "2024-04-20-new-post",
     "title": "新文章标题",
     "date": "2024-04-20",
     "summary": "文章摘要...",
     "tags": ["标签1", "标签2"],
     "readingTime": "5分钟",
     "published": true
   }
   ```

## 部署

### GitHub Pages部署

1. 创建GitHub仓库

2. 推送代码：

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/username/repo-name.git
   git push -u origin main
   ```

3. 在仓库Settings > Pages中启用GitHub Pages

4. 选择Branch: main，Folder: / (root)

5. 等待部署完成，访问 `https://username.github.io/repo-name`

### EdgeOne Pages部署

1. 连接Git仓库

2. 配置构建命令：无（纯静态）

3. 输出目录：/root

4. 自动获得边缘节点加速域名

## 自定义配置

修改 `js/config.js` 文件：

```javascript
const CONFIG = {
    siteName: '你的博客名称',
    siteDescription: '博客描述',
    author: '你的名字',

    social: {
        github: 'https://github.com/yourusername',
        email: 'your.email@example.com',
        twitter: 'https://twitter.com/yourusername'
    }
};
```

## 技术栈

- HTML5 - 语义化标签
- CSS3 - Flexbox/Grid布局，CSS变量
- JavaScript ES6+ - 原生JS，Fetch API
- marked.js - Markdown解析
- highlight.js - 代码高亮
- Google Fonts - Inter, JetBrains Mono字体

## 浏览器支持

- Chrome (最新版本)
- Firefox (最新版本)
- Safari (最新版本)
- Edge (最新版本)

## 许可证

MIT License

## 联系方式

如有问题或建议，欢迎联系：

- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com