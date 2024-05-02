function execute() {
    return Response.success([
        {title: "Top truyện", input: "https://langgeek.net/top-truyen/", script: "gen.js"},
        {title: "Truyện mới cập nhập", input: "https://langgeek.net/truyen-moi-cap-nhat/", script: "gen.js"},
        {title: "Lịch sử", input: "https://langgeek.net/moi-cap-nhat/lich-su-doc-truyen/", script: "gen.js"},
    ]);   
}