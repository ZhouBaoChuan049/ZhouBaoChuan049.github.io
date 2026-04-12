function createGit() {
    var p = document.getElementById('recent-posts');
    if (p && !document.getElementById('git_container')) {
        var d = document.createElement('div');
        d.id = 'git_container';
        d.style.cssText = "background:rgba(255,255,255,0.7);backdrop-filter:blur(8px);border-radius:12px;padding:20px;margin-bottom:20px;border:1px solid rgba(255,255,255,0.2);min-height:150px;";
        d.innerHTML = '<div id="git_loading" style="text-align:center;">🚀 正在通过镜像链路同步 GitHub 能量...</div><div id="git_canvas"></div>';
        p.insertBefore(d, p.firstChild);

        // 改用 Vercel 镜像接口，彻底抛弃 anzhiy.cn
        fetch('https://github-calendar-api.vercel.app/api?user=ZhouBaoChuan049')
            .then(res => res.json())
            .then(data => {
                if (data.svg) {
                    document.getElementById('git_canvas').innerHTML = data.svg;
                    document.getElementById('git_loading').style.display = 'none';
                }
            })
            .catch(err => {
                document.getElementById('git_loading').innerHTML = "🚫 镜像连接失败，请检查 GitHub 用户名";
            });
    }
}
createGit();
document.addEventListener('pjax:complete', createGit);