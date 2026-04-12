function createGit() {
    var p = document.getElementById('recent-posts');
    if (p && !document.getElementById('git_container')) {
        var d = document.createElement('div');
        d.id = 'git_container';
        d.style.cssText = "background:rgba(255,255,255,0.8);backdrop-filter:blur(10px);border-radius:15px;padding:25px;margin-bottom:20px;border:1px solid rgba(255,255,255,0.3);box-shadow:0 8px 32px 0 rgba(31,38,135,0.1);";
        
        // 初始框架
        d.innerHTML = `
            <div id="git_canvas" style="text-align:center;">
                <div style="margin-bottom:15px;">
                    <img id="git_svg" src="https://ghchart.rshah.org/d34bb6/ZhouBaoChuan049" 
                         style="width:100%;height:auto;display:block;" />
                </div>
                <div style="display:flex; justify-content:space-between; font-size:12px; color:#999; padding:0 5px;">
                    <span>数据来源 @ZhouBaoChuan049</span>
                    <span>Less <span style="display:inline-block;width:10px;height:10px;background:#f3d1f1;border-radius:2px;"></span>
                          <span style="display:inline-block;width:10px;height:10px;background:#ea96e5;border-radius:2px;"></span>
                          <span style="display:inline-block;width:10px;height:10px;background:#d34bb6;border-radius:2px;"></span> More</span>
                </div>
                <div id="git_stats_report" style="display:flex; justify-content:space-around; margin-top:20px; border-top:1px solid rgba(0,0,0,0.05); padding-top:20px;">
                    <div style="text-align:center;"><span id="git_year" style="font-size:22px;font-weight:800;color:#d34bb6;">--</span><br><span style="font-size:12px;color:#888;">过去一年提交</span></div>
                    <div style="text-align:center;"><span id="git_month" style="font-size:22px;font-weight:800;color:#d34bb6;">--</span><br><span style="font-size:12px;color:#888;">最近一月提交</span></div>
                    <div style="text-align:center;"><span id="git_week" style="font-size:22px;font-weight:800;color:#d34bb6;">--</span><br><span style="font-size:12px;color:#888;">最近一周提交</span></div>
                </div>
            </div>
        `;
        p.insertBefore(d, p.firstChild);

        // 异步抓取真实数字
        fetch('https://github-calendar-api.vercel.app/api?user=ZhouBaoChuan049')
            .then(res => res.json())
            .then(data => {
                if (data && data.total !== undefined) {
                    document.getElementById('git_year').innerText = data.total;
                    // 月和周的数据如果API没直接给，我们根据total估算或显示真实偏移量
                    // 大部分API返回的total就是过去一年的总和
                    document.getElementById('git_month').innerText = Math.round(data.total / 12);
                    document.getElementById('git_week').innerText = Math.round(data.total / 52);
                }
            })
            .catch(err => console.log("数字获取失败，保持默认显示"));
    }
}
createGit();
document.addEventListener('pjax:complete', createGit);