function createGit() {
    var p = document.getElementById('recent-posts');
    if (p && !document.getElementById('git_container')) {
        var d = document.createElement('div');
        d.id = 'git_container';
        // 样式保持你喜欢的毛玻璃效果
        d.style.cssText = "background:rgba(255,255,255,0.7);backdrop-filter:blur(8px);border-radius:12px;padding:20px;margin-bottom:20px;border:1px solid rgba(255,255,255,0.2);text-align:center;overflow:hidden;";
        
        // 逻辑：直接拉取现成的统计图片，不需要 API 解析 JSON
        // 如果图出不来，说明网络屏蔽了该图片源
        d.innerHTML = `
            <div style="font-weight:bold;margin-bottom:10px;font-size:15px;color:#333;">📊 GitHub 贡献统计</div>
            <img src="https://ghchart.rshah.org/409ba5/ZhouBaoChuan049" 
                 alt="Github Chart" 
                 style="width:100%; max-width:800px; height:auto; display:inline-block;"
                 onerror="this.parentElement.innerHTML='<p>🚫 图表加载失败，请检查网络或稍后刷新</p>'"/>
        `;
        p.insertBefore(d, p.firstChild);
    }
}
// 兼容 Hexo 的 Pjax 跳转
createGit();
document.addEventListener('pjax:complete', createGit);