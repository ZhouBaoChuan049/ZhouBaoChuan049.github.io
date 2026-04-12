function createGit() {
    var p = document.getElementById('recent-posts');
    if (p && !document.getElementById('git_container')) {
        var d = document.createElement('div');
        d.id = 'git_container';
        d.style.cssText = "background:rgba(255,255,255,0.7);backdrop-filter:blur(8px);border-radius:12px;padding:20px;margin-bottom:20px;border:1px solid rgba(255,255,255,0.2);text-align:center;";
        
        d.innerHTML = `
            <div style="font-weight:bold;margin-bottom:10px;font-size:14px;">GitHub 贡献统计</div>
            <img src="https://ghchart.rshah.org/409ba5/ZhouBaoChuan049" 
                 style="width:100%;height:auto;display:block;" 
                 onerror="this.style.display='none';this.parentElement.innerHTML+='<p>📅 正在同步中...</p>'"/>
        `;
        p.insertBefore(d, p.firstChild);
    }
}
createGit();
document.addEventListener('pjax:complete', createGit);