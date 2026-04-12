function createGit() {
    var p = document.getElementById('recent-posts');
    if (p && !document.getElementById('git_container')) {
        var d = document.createElement('div');
        d.id = 'git_container';
        d.style.cssText = "background:rgba(255,255,255,0.7);backdrop-filter:blur(8px);border-radius:12px;padding:20px;margin-bottom:20px;border:1px solid rgba(255,255,255,0.2);text-align:center;";
        
        // 直接使用图片链接，不废话，直接拉图
        // 这里的 3202e5 是颜色代码，你可以换成你喜欢的颜色
        d.innerHTML = `
            <div style="font-weight:bold;margin-bottom:10px;font-size:14px;color:#555;">📊 GitHub Contributions</div>
            <img src="https://ghchart.rshah.org/3202e5/ZhouBaoChuan049" 
                 alt="Github Chart" 
                 style="width:100%;height:auto;display:block;min-height:100px;"
                 onerror="this.style.display='none';this.parentElement.innerHTML+='<p>📅 正在同步数据，请稍后刷新</p>'"/>
        `;
        p.insertBefore(d, p.firstChild);
    }
}
createGit();
document.addEventListener('pjax:complete', createGit);