# EdgeOne Pages 部署说明

## 压缩包信息

- 文件名: `blog-edgeone-deploy.zip`
- 大小: 22 KB
- 包含文件: 17个文件
- 路径格式: 使用正斜杠（/）作为路径分隔符，符合EdgeOne要求
- 状态: ✅ 已修复文件名非法字符问题，可直接上传

## 压缩包内容

```
blog-edgeone-deploy.zip
├── css/
│   ├── dark-theme.css
│   ├── markdown.css
│   └── style.css
├── js/
│   ├── config.js
│   ├── main.js
│   └── posts.js
├── posts/
│   ├── 2024-01-15-welcome.md
│   ├── 2024-02-20-javascript-tips.md
│   └── 2024-03-15-python-ai-intro.md
├── data/
│   └── posts.json
├── index.html
├── post.html
└── about.html
```

## EdgeOne Pages 部署步骤

### 方法1：通过控制台上传

1. 登录腾讯云控制台
2. 进入 EdgeOne Pages 服务
3. 创建新项目
4. 选择"上传压缩包"方式
5. 上传 `blog-edgeone-deploy.zip` 文件
6. 等待部署完成
7. 获取分配的域名

### 方法2：通过Git仓库部署

1. 将代码推送到Git仓库（GitHub、GitLab等）
2. 在EdgeOne控制台选择"连接Git仓库"
3. 授权并选择仓库
4. 配置构建设置：
   - 构建命令: 无（留空）
   - 输出目录: / 或 ./
5. 开始部署

## 环境变量配置（可选）

如果需要自定义配置，可以在EdgeOne控制台设置环境变量：

- `SITE_NAME`: 博客名称
- `AUTHOR_NAME`: 作者名称

## 域名配置

EdgeOne会自动分配一个临时域名，你也可以：

1. 绑定自定义域名
2. 配置SSL证书（EdgeOne自动提供）
3. 设置CDN加速

## 注意事项

1. **文件路径**: 确保所有资源路径使用相对路径
2. **编码格式**: 所有文件使用UTF-8编码
3. **大小限制**: 单个文件不超过10MB，总大小不超过100MB
4. **文件数量**: 建议不超过500个文件
5. **路径分隔符**: 压缩包内使用正斜杠（/）作为路径分隔符，符合EdgeOne要求

## 更新部署

当需要更新博客内容时：

1. 本地修改文章或配置
2. 重新生成压缩包
3. 在EdgeOne控制台重新上传或推送代码

## 访问统计

EdgeOne提供访问统计功能，可以在控制台查看：

- 访问量
- 流量统计
- 地域分布
- 响应时间

## 技术支持

如遇问题，可参考：
- EdgeOne官方文档: https://cloud.tencent.com/document/product/1555
- 技术支持: 腾讯云客服