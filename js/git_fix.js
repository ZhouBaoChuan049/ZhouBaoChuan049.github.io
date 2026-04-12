function createGit() {
    var p = document.getElementById('recent-posts');
    if (p && !document.getElementById('git_container')) {
        var d = document.createElement('div');
        d.id = 'git_container';
        d.style.cssText = "background:rgba(255,255,255,0.7);backdrop-filter:blur(8px);border-radius:12px;padding:20px;margin-bottom:20px;border:1px solid rgba(255,255,255,0.2);min-height:150px;";
        d.innerHTML = '<div id="git_loading" style="text-align:center;">🚀 正在切换全球镜像线路...</div><div id="git_canvas"></div>';
        p.insertBefore(d, p.firstChild);

        // 这里换成了 Vercel 的全球 API，避开所有国内屏蔽
        fetch('https://github-calendar-api.vercel.app/api?user=ZhouBaoChuan049')
            .then(res => res.json())
            .then(data => {
                if (data.svg) {
                    document.getElementById('git_canvas').innerHTML = data.svg;
                    document.getElementById('git_loading').style.display = 'none';
                }
            })
            .catch(err => {
                document.getElementById('git_loading').innerHTML = "🚫 镜像线路也打不开，请检查网络代理";
            });
    }
}
createGit();
document.addEventListener('pjax:complete', createGit);