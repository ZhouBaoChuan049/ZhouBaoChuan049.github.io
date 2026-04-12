function createGit() {
    var p = document.getElementById('recent-posts');
    if (p && !document.getElementById('git_container')) {
        var d = document.createElement('div');
        d.id = 'git_container';
        d.style.cssText = "background:rgba(255,255,255,0.8);backdrop-filter:blur(10px);border-radius:15px;padding:25px;margin-bottom:20px;border:1px solid rgba(255,255,255,0.3);box-shadow:0 8px 32px 0 rgba(31,38,135,0.1);min-height:150px;";
        
        d.innerHTML = `<div id="git_canvas" style="text-align:center;"><div style="line-height:150px;">🚀 正在同步 GitHub 数据...</div></div>`;
        p.insertBefore(d, p.firstChild);

        // 换一个更稳的 API 地址
        fetch('https://github-calendar-api.vercel.app/api?user=ZhouBaoChuan049')
            .then(res => res.json())
            .then(data => {
                const canvas = document.getElementById('git_canvas');
                // 核心：即使 total 是 0，只要有 svg 也要显示出来
                if (data && data.svg) {
                    canvas.innerHTML = data.svg;
                    
                    const style = document.createElement('style');
                    style.innerHTML = `
                        #git_canvas svg { width: 100% !important; height: auto !important; }
                        /* 强制粉色系覆盖 */
                        rect.ContributionCalendar-day[fill="#ebedf0"], .ContributionCalendar-day[data-level="0"] { fill: #f0f0f0 !important; }
                        rect.ContributionCalendar-day[fill="#9be9a8"], .ContributionCalendar-day[data-level="1"] { fill: #f3d1f1 !important; }
                        rect.ContributionCalendar-day[fill="#40c463"], .ContributionCalendar-day[data-level="2"] { fill: #ea96e5 !important; }
                        rect.ContributionCalendar-day[fill="#30a14e"], .ContributionCalendar-day[data-level="3"] { fill: #d34bb6 !important; }
                        rect.ContributionCalendar-day[fill="#216e39"], .ContributionCalendar-day[data-level="4"] { fill: #8b1d74 !important; }
                        .git_stats { display: flex; justify-content: space-around; margin-top: 20px; border-top: 1px solid #eee; padding-top: 20px; }
                        .stat_num { font-size: 20px; font-weight: bold; color: #d34bb6; display: block; }
                        .stat_text { font-size: 12px; color: #999; }
                        .git_info { display: flex; justify-content: space-between; font-size: 11px; color: #aaa; margin-top: 10px; }
                    `;
                    document.head.appendChild(style);

                    const total = data.total || 0;
                    const stats = document.createElement('div');
                    stats.className = 'git_stats';
                    stats.innerHTML = `
                        <div style="text-align:center"><span class="stat_num">${total}</span><span class="stat_text">过去一年</span></div>
                        <div style="text-align:center"><span class="stat_num">${Math.round(total/12)}</span><span class="stat_text">最近一月</span></div>
                        <div style="text-align:center"><span class="stat_num">${Math.round(total/52)}</span><span class="stat_text">最近一周</span></div>
                    `;
                    canvas.appendChild(stats);

                    const info = document.createElement('div');
                    info.className = 'git_info';
                    info.innerHTML = `<span>数据来源 @ZhouBaoChuan049</span><span>Less <span style="display:inline-block;width:9px;height:9px;background:#f3d1f1"></span><span style="display:inline-block;width:9px;height:9px;background:#ea96e5"></span><span style="display:inline-block;width:9px;height:9px;background:#d34bb6"></span> More</span>`;
                    canvas.appendChild(info);
                } else {
                    throw new Error("No SVG Data");
                }
            })
            .catch(err => {
                // 如果 API 实在不行，显示一个优雅的提示
                document.getElementById('git_canvas').innerHTML = `
                    <div style="padding:40px 0; color:#999;">
                        <p>📅 正在努力抓取数据，请确保 GitHub 贡献已公开</p>
                        <a href="https://github.com/ZhouBaoChuan049" target="_blank" style="color:#d34bb6;font-size:12px;">点击前往 GitHub 查看</a>
                    </div>`;
            });
    }
}
createGit();
document.addEventListener('pjax:complete', createGit);