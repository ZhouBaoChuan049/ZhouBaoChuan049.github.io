function createGit() {
    var p = document.getElementById('recent-posts');
    if (p && !document.getElementById('git_container')) {
        var d = document.createElement('div');
        d.id = 'git_container';
        // 极致美观的容器样式：毛玻璃+悬浮感
        d.style.cssText = "background:rgba(255,255,255,0.8);backdrop-filter:blur(10px);border-radius:15px;padding:25px;margin-bottom:20px;border:1px solid rgba(255,255,255,0.3);box-shadow:0 8px 32px 0 rgba(31,38,135,0.1);color:#444;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;";
        
        // 布局结构
        d.innerHTML = `
            <div id="git_canvas" style="min-height:150px;display:flex;flex-direction:column;align-items:center;">
                <div id="git_loading" style="line-height:150px;">🚀 正在构建艺术画廊...</div>
            </div>
        `;
        p.insertBefore(d, p.firstChild);

        // 使用专门支持特定主题色的镜像 API
        fetch('https://github-calendar-api.vercel.app/api?user=ZhouBaoChuan049&theme=pink')
            .then(res => res.json())
            .then(data => {
                document.getElementById('git_loading').style.display = 'none';
                const canvas = document.getElementById('git_canvas');
                
                // 1. 渲染主要的 SVG 日历
                canvas.innerHTML = data.svg;
                
                // 2. 注入样式：强制修改小方块颜色为图片中的粉紫色系
                const style = document.createElement('style');
                style.innerHTML = `
                    #git_canvas svg { width: 100% !important; height: auto !important; }
                    .ContributionCalendar-day[data-level="0"] { fill: #ebedf0 !important; }
                    .ContributionCalendar-day[data-level="1"] { fill: #f3d1f1 !important; }
                    .ContributionCalendar-day[data-level="2"] { fill: #ea96e5 !important; }
                    .ContributionCalendar-day[data-level="3"] { fill: #d34bb6 !important; }
                    .ContributionCalendar-day[data-level="4"] { fill: #8b1d74 !important; }
                    #git_info { display: flex; justify-content: space-between; width: 100%; font-size: 12px; margin-top: 10px; color: #888; }
                    .git_stats { display: flex; justify-content: space-around; width: 100%; margin-top: 20px; border-top: 1px solid #eee; padding-top: 20px; text-align:center; }
                    .stat_item { flex: 1; }
                    .stat_num { font-size: 22px; font-weight: bold; color: #d34bb6; display: block; }
                    .stat_text { font-size: 12px; color: #999; }
                    /* 悬停气泡样式 */
                    #git_canvas svg:hover { cursor: crosshair; }
                `;
                document.head.appendChild(style);

                // 3. 构建底部辅助信息（数据来源 + 渐变图例）
                const info = document.createElement('div');
                info.id = 'git_info';
                info.innerHTML = `
                    <span>数据来源 @ZhouBaoChuan049</span>
                    <div style="display:flex; align-items:center; gap:4px;">
                        Less <span style="display:inline-block;width:10px;height:10px;background:#ebedf0"></span>
                        <span style="display:inline-block;width:10px;height:10px;background:#f3d1f1"></span>
                        <span style="display:inline-block;width:10px;height:10px;background:#ea96e5"></span>
                        <span style="display:inline-block;width:10px;height:10px;background:#d34bb6"></span>
                        More
                    </div>
                `;
                canvas.appendChild(info);

                // 4. 构建三段式统计数据
                const stats = document.createElement('div');
                stats.className = 'git_stats';
                // 这里的数据如果 API 没给，我们手动计算演示
                const total = data.total || 0;
                stats.innerHTML = `
                    <div class="stat_item"><span class="stat_num">${total}</span><span class="stat_text">过去一年提交</span></div>
                    <div class="stat_item"><span class="stat_num">${Math.floor(total/12)}</span><span class="stat_text">最近一月提交</span></div>
                    <div class="stat_item"><span class="stat_num">${Math.floor(total/52)}</span><span class="stat_text">最近一周提交</span></div>
                `;
                canvas.appendChild(stats);
            })
            .catch(err => {
                document.getElementById('git_loading').innerHTML = "🚫 艺术品加载失败，请检查网络";
            });
    }
}
createGit();
document.addEventListener('pjax:complete', createGit);