function execute() {
    return Response.success([
        {
            title: "Mới cập nhật",
            input: "https://langgeek.net/truyen-moi-cap-nhat/",
            script: "homecontent.js"
        },
        {
            title: "Top truyện",
            input: "https://langgeek.net/top-truyen/",
            script: "homecontent.js"
        }
    ]);
}
