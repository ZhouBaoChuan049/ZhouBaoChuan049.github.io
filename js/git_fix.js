function createGit() {
    var p = document.getElementById('recent-posts');
    if (p && !document.getElementById('git_container')) {
        var d = document.createElement('div');
        d.id = 'git_container';
        // 初始样式
        d.style.cssText = "background:rgba(255,255,255,0.7);backdrop-filter:blur(8px);border-radius:12px;padding:20px;margin-bottom:20px;border:1px solid rgba(255,255,255,0.2);";
        d.innerHTML = '<div id="git_loading" style="text-align:center;">🚀 正在同步 GitHub 能量块...</div><div id="git_canvas"></div>';
        p.insertBefore(d, p.firstChild);

        // 强行抓取数据
        fetch('https://api.rymcu.com/githubapi?user=ZhouBaoChuan049')
            .then(res => res.json())
            .then(data => {
                if (data.svg) {
                    document.getElementById('git_canvas').innerHTML = data.svg;
                    document.getElementById('git_loading').style.display = 'none';
                    console.log("看板渲染成功！");
                }
            })
            .catch(err => {
                document.getElementById('git_loading').innerHTML = "🚫 暂时连接不上 GitHub，请稍后再试";
            });
    }
}
// 立即执行 + Pjax 兼容
createGit();
document.addEventListener('pjax:complete', createGit);