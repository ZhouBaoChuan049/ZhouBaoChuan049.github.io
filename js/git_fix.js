function createGit() {
    var p = document.getElementById('recent-posts');
    if (p && !document.getElementById('git_container')) {
        var d = document.createElement('div');
        d.id = 'git_container';
        d.style.cssText = "background:rgba(255,255,255,0.8);backdrop-filter:blur(10px);border-radius:15px;padding:25px;margin-bottom:20px;border:1px solid rgba(255,255,255,0.3);box-shadow:0 8px 32px 0 rgba(31,38,135,0.1);";
        
        d.innerHTML = `
            <div id="git_canvas" style="text-align:center;">
                <div style="margin-bottom:15px;">
                    <img id="git_svg" src="https://ghchart.rshah.org/d34bb6/ZhouBaoChuan049" 
                         style="width:100%;height:auto;display:block;" 
                         onerror="this.parentElement.innerHTML='🚫 GitHub 链接超时'"/>
                </div>
                <div style="display:flex; justify-content:space-between; font-size:12px; color:#999; padding:0 5px;">
                    <span>数据来源 @ZhouBaoChuan049</span>
                    <span>Less <span style="display:inline-block;width:10px;height:10px;background:#f3d1f1;border-radius:2px;"></span>
                          <span style="display:inline-block;width:10px;height:10px;background:#ea96e5;border-radius:2px;"></span>
                          <span style="display:inline-block;width:10px;height:10px;background:#d34bb6;border-radius:2px;"></span> More</span>
                </div>
                <div style="display:flex; justify-content:space-around; margin-top:20px; border-top:1px solid rgba(0,0,0,0.05); padding-top:20px;">
                    <div style="text-align:center;"><span style="font-size:20px;font-weight:800;color:#d34bb6;">统计中</span><br><span style="font-size:12px;color:#888;">过去一年</span></div>
                    <div style="text-align:center;"><span style="font-size:20px;font-weight:800;color:#d34bb6;">实时</span><br><span style="font-size:12px;color:#888;">最近一月</span></div>
                    <div style="text-align:center;"><span style="font-size:20px;font-weight:800;color:#d34bb6;">更新</span><br><span style="font-size:12px;color:#888;">最近一周</span></div>
                </div>
            </div>
        `;
        p.insertBefore(d, p.firstChild);
    }
}
createGit();
document.addEventListener('pjax:complete', createGit);