function createGit() {
    var p = document.getElementById('recent-posts');
    if (p && !document.getElementById('git_container')) {
        var d = document.createElement('div');
        d.id = 'git_container';
        d.style.cssText = "background:rgba(255,255,255,0.7);backdrop-filter:blur(8px);border-radius:12px;padding:20px;margin-bottom:20px;border:1px solid rgba(255,255,255,0.2);";
        d.innerHTML = '<div id="git_loading" style="text-align:center;">🚀 正在切换线路同步能量...</div><div id="git_canvas"></div>';
        p.insertBefore(d, p.firstChild);

        // 这里换成了备选接口，注意 user 后面还是你的名字
        fetch('https://api.rymcu.com/githubapi?user=ZhouBaoChuan049')
            .then(res => res.json())
            .then(data => {
                if (data.svg) {
                    document.getElementById('git_canvas').innerHTML = data.svg;
                    document.getElementById('git_loading').style.display = 'none';
                }
            })
            .catch(err => {
                document.getElementById('git_loading').innerHTML = "🚫 接口全线阻塞，请稍后再试或检查 ID";
            });
    }
}
createGit();
document.addEventListener('pjax:complete', createGit);