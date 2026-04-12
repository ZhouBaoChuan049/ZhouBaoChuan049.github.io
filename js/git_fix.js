function createGit() {
    var p = document.getElementById('recent-posts');
    if (p && !document.getElementById('git_container')) {
        var d = document.createElement('div');
        d.id = 'git_container';
        d.style.cssText = "background:rgba(255,255,255,0.7);backdrop-filter:blur(8px);border-radius:12px;padding:20px;margin-bottom:20px;border:1px solid rgba(255,255,255,0.2);min-height:80px;display:flex;align-items:center;justify-content:center;";
        d.innerHTML = '<div id="git_loading">🚀 正在读取 GitHub 贡献...</div>';
        p.insertBefore(d, p.firstChild);

        fetch('https://github-calendar-api.vercel.app/api?user=ZhouBaoChuan049')
            .then(res => res.json())
            .then(data => {
                if (data.total !== undefined) {
                    // 如果总数为 0，说明 GitHub 还没同步数据或确实没贡献
                    const msg = data.total > 0 
                        ? `📊 GitHub 累计贡献: ${data.total} 次` 
                        : "📅 GitHub 暂无公开贡献记录 (新账号或私有仓库)";
                    document.getElementById('git_loading').innerHTML = msg;
                } else if (data.svg) {
                    // 如果以后它返回图片了，也能正常显示
                    document.getElementById('git_loading').style.display = 'none';
                    d.innerHTML = data.svg;
                }
            })
            .catch(err => {
                document.getElementById('git_loading').innerHTML = "🚫 暂时无法连接数据源";
            });
    }
}
createGit();
document.addEventListener('pjax:complete', createGit);