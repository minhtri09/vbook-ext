function execute() {
    return Response.success([
        {
            title: "Mới cập nhật",
            input: "https://langgeek.net/latest",
            script: "homecontent.js"
        },
        {
            title: "Được yêu thích",
            input: "https://langgeek.net/popular",
            script: "homecontent.js"
        }
    ]);
}
