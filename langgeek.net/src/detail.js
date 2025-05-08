function execute(url) {
    var response = fetch(url);
    if (!response.ok) return Response.error("Lỗi tải trang");
    var doc = response.html();
    var name = doc.selectFirst(".story_title") ? doc.selectFirst(".story_title").text() : "";
    var cover = doc.selectFirst(".image-cover-story img") ? doc.selectFirst(".image-cover-story img").attr("src") : "";
    var author = ""; // Không thấy selector rõ ràng, có thể bổ sung sau
    var description = doc.selectFirst(".story_info") ? doc.selectFirst(".story_info").text() : "";
    var ongoing = false; // Không thấy trạng thái, có thể bổ sung sau
    return Response.success({
        name: name,
        cover: cover,
        host: "langgeek.net",
        author: author,
        description: description,
        ongoing: ongoing
    });
}
