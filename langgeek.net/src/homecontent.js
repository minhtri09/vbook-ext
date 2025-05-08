function execute(url, page) {
    var response = fetch(url);
    if (!response.ok) return Response.error("Lỗi tải trang");
    var doc = response.html();
    var list = [];
    doc.select(".col.post-item").forEach(e => {
        var a = e.selectFirst("a");
        var img = e.selectFirst(".box-image img");
        list.push({
            name: "", // Tên truyện sẽ lấy ở detail
            link: a ? a.attr("href") : "",
            cover: img ? img.attr("src") : "",
            description: "" // Có thể lấy thêm nếu có
        });
    });
    return Response.success(list);
}
}
