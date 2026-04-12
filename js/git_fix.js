function createGit() {
    var p = document.getElementById('recent-posts');
    if (p && !document.getElementById('git_container')) {
        var d = document.createElement('div');
        d.id = 'git_container';
        d.style.cssText = "background:rgba(255,255,255,0.7);backdrop-filter:blur(8px);border-radius:12px;padding:20px;margin-bottom:20px;border:1px solid rgba(255,255,255,0.2);text-align:center;";
        
        // 这行代码不求 API，直接去拉取你的实时贡献图图片
        d.innerHTML = `
            <div style="font-weight:bold;margin:10px 0;font-size:14px;"> GitHub 贡献统计</div>
            <img src="https://ghchart.rshah.org/409ba5/ZhouBaoChuan049" 
                 style="width:100%;height:auto;padding:10px;display:block;" 
                 onerror="this.parentElement.innerHTML=' 统计图加载失败，请检查网络'"/>
        `;
        p.insertBefore(d, p.firstChild);
    }
}
createGit();
document.addEventListener('pjax:complete', createGit);