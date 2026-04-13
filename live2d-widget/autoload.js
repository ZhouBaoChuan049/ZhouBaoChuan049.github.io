$(document).ready(function() {
    // 1. 定义你的本地模型位置（这是你 tree 指令确认过的绝对没错的路径）
    const myModel = "/live2D_modes/katou/model/katou_01/katou_01.model.json";
    const myCSS = "/live2d-widget/waifu.css";

    // 2. 强行插入 CSS
    $("<link>").attr({href: myCSS, rel: "stylesheet"}).appendTo("head");

    // 3. 暴力引入外援 JS，跳过你本地那个带 export 报错的垃圾文件
    $.getScript("https://cdn.jsdelivr.net/gh/stevenjoezhang/live2d-widget@latest/live2d.min.js", function() {
        $.getScript("https://cdn.jsdelivr.net/gh/stevenjoezhang/live2d-widget@latest/waifu-tips.js", function() {
            // 初始化
            initWidget({
                waifuPath: "/live2d-widget/waifu-tips.json",
                apiPath: "https://live2d.fghrsh.net/api/",
                modelAPI: myModel
            });
        });
    });
});