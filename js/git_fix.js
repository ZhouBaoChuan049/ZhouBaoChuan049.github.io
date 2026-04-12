function createGit() {
    var p = document.getElementById('recent-posts');
    if (p && !document.getElementById('git_container')) {
        var d = document.createElement('div');
        d.id = 'git_container';
        // 这一行帮你把之前的毛玻璃样式全带回来了，而且更稳定
        d.style.cssText = "background:rgba(255,255,255,0.7);backdrop-filter:blur(8px);border-radius:12px;padding:20px;margin-bottom:20px;border:1px solid rgba(255,255,255,0.2);text-align:center;";
        
        d.innerHTML = `
            <div style="font-weight:bold;margin-bottom:10px;">📊 GitHub Contributions</div>
            <img src="https://ghchart.rshah.org/3202e5/ZhouBaoChuan049" 
                 alt="Github Chart" 
                 style="width:100%;height:auto;display:block;"
                 onerror="this.parentElement.innerHTML='🚫 GitHub 图表加载失败'"/>
        `;
        p.insertBefore(d, p.firstChild);
    }
}
createGit();
document.addEventListener('pjax:complete', createGit);