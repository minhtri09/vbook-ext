function execute(url) {
    var response = fetch(url);
    if (!response.ok) return Response.error("Lỗi tải trang");
    var doc = response.html();
    var images = [];
    doc.select(".chapter-content img").forEach(img => {
        images.push(img.attr("src"));
    });
    return Response.success(images);
}
