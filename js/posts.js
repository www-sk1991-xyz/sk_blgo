// 文章加载和渲染逻辑

// 加载文章列表
async function loadPosts() {
    const container = document.getElementById('posts-container');

    try {
        // 加载文章配置
        const response = await fetch(CONFIG.posts.dataPath);
        if (!response.ok) {
            throw new Error('无法加载文章配置');
        }

        const data = await response.json();
        const posts = data.posts.filter(post => post.published);

        if (posts.length === 0) {
            container.innerHTML = `
                <div class="no-posts">
                    <p>暂无文章</p>
                </div>
            `;
            return;
        }

        // 按年份分组
        const groupedPosts = groupPostsByYear(posts);

        // 渲染文章列表
        let html = '';
        for (const [year, yearPosts] of Object.entries(groupedPosts)) {
            html += `<h2 class="archive-year">${year}年</h2>`;
            for (const post of yearPosts) {
                html += renderPostCard(post);
            }
        }

        container.innerHTML = html;

    } catch (error) {
        console.error('加载文章失败:', error);
        container.innerHTML = `
            <div class="error">
                <p>加载文章失败，请刷新页面重试</p>
                <p class="error-detail">${error.message}</p>
            </div>
        `;
    }
}

// 按年份分组文章
function groupPostsByYear(posts) {
    const grouped = {};

    posts.forEach(post => {
        const year = new Date(post.date).getFullYear();
        if (!grouped[year]) {
            grouped[year] = [];
        }
        grouped[year].push(post);
    });

    // 按年份降序排序
    const sortedYears = Object.keys(grouped).sort((a, b) => b - a);
    const sortedGrouped = {};
    sortedYears.forEach(year => {
        sortedGrouped[year] = grouped[year].sort((a, b) =>
            new Date(b.date) - new Date(a.date)
        );
    });

    return sortedGrouped;
}

// 渲染文章卡片
function renderPostCard(post) {
    const tags = post.tags.map(tag => `<span class="tag">${tag}</span>`).join('');

    return `
        <article class="post-card" onclick="window.location.href='post.html?id=${post.id}'">
            <div class="post-card-header">
                <h2 class="post-card-title">${post.title}</h2>
                <div class="post-card-meta">
                    <span class="post-card-date">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                            <line x1="16" y1="2" x2="16" y2="6"/>
                            <line x1="8" y1="2" x2="8" y2="6"/>
                            <line x1="3" y1="10" x2="21" y2="10"/>
                        </svg>
                        ${formatDate(post.date)}
                    </span>
                    <span class="separator">•</span>
                    <span class="post-card-reading-time">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"/>
                            <polyline points="12 6 12 12 16 14"/>
                        </svg>
                        ${post.readingTime}
                    </span>
                </div>
            </div>
            <p class="post-card-summary">${post.summary}</p>
            <div class="post-card-tags">${tags}</div>
        </article>
    `;
}

// 格式化日期
function formatDate(dateStr) {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// 加载文章详情
async function loadPostContent() {
    // 获取文章ID
    const params = new URLSearchParams(window.location.search);
    const postId = params.get('id');

    if (!postId) {
        window.location.href = 'index.html';
        return;
    }

    try {
        // 加载文章配置
        const response = await fetch(CONFIG.posts.dataPath);
        if (!response.ok) {
            throw new Error('无法加载文章配置');
        }

        const data = await response.json();
        const post = data.posts.find(p => p.id === postId && p.published);

        if (!post) {
            throw new Error('文章不存在');
        }

        // 加载Markdown内容
        const mdResponse = await fetch(`${CONFIG.posts.postsDir}${postId}.md`);
        if (!mdResponse.ok) {
            throw new Error('无法加载文章内容');
        }

        const mdContent = await mdResponse.text();

        // 渲染文章
        renderPost(post, mdContent, data.posts);

    } catch (error) {
        console.error('加载文章失败:', error);
        document.getElementById('post-content').innerHTML = `
            <div class="error">
                <p>加载文章失败</p>
                <p class="error-detail">${error.message}</p>
                <a href="index.html" class="back-link">返回首页</a>
            </div>
        `;
    }
}

// 渲染文章详情
function renderPost(post, mdContent, allPosts) {
    // 设置页面标题
    document.title = `${post.title} - ${CONFIG.siteName}`;
    document.getElementById('page-title').textContent = `${post.title} - ${CONFIG.siteName}`;

    // 渲染标题和元信息
    document.getElementById('post-title').textContent = post.title;
    document.getElementById('post-date').textContent = formatDate(post.date);
    document.getElementById('post-reading-time').textContent = post.readingTime;

    // 渲染标签
    const tagsHtml = post.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
    document.getElementById('post-tags').innerHTML = tagsHtml;

    // 渲染Markdown内容
    const htmlContent = marked.parse(mdContent);
    document.getElementById('post-content').innerHTML = htmlContent;

    // 高亮代码块
    document.querySelectorAll('pre code').forEach(block => {
        hljs.highlightElement(block);
    });

    // 设置文章导航
    setupPostNavigation(post, allPosts);
}

// 设置文章导航
function setupPostNavigation(currentPost, allPosts) {
    const publishedPosts = allPosts.filter(p => p.published);
    const currentIndex = publishedPosts.findIndex(p => p.id === currentPost.id);

    // 上一篇
    if (currentIndex > 0) {
        const prevPost = publishedPosts[currentIndex - 1];
        const prevLink = document.getElementById('prev-post');
        prevLink.href = `post.html?id=${prevPost.id}`;
        prevLink.style.visibility = 'visible';
        document.getElementById('prev-post-title').textContent = prevPost.title;
    }

    // 下一篇
    if (currentIndex < publishedPosts.length - 1) {
        const nextPost = publishedPosts[currentIndex + 1];
        const nextLink = document.getElementById('next-post');
        nextLink.href = `post.html?id=${nextPost.id}`;
        nextLink.style.visibility = 'visible';
        document.getElementById('next-post-title').textContent = nextPost.title;
    }
}