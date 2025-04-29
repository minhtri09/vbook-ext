function execute(url) {
    let response = fetch(url, {
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
        },
        timeout: 5000
    });
    if (response.ok) {
        let doc = response.html();
        // Lấy nội dung chương (ảnh hoặc text)
        let content = doc.select("div.entry-content").html();
        return Response.success(content);
    }
    return Response.error("Không thể tải nội dung chương");
}
