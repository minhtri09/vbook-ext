function execute(url) {
    let response = fetch(url, {
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
        },
        timeout: 5000
    });
    if (response.ok) {
        let doc = response.html();
        let name = doc.select("h1.entry-title").text().trim();
        let cover = doc.select("img.wp-post-image").first().attr("src");
        let description = doc.select("div.entry-content p").first().text().trim();
        return Response.success({
            name: name,
            cover: cover,
            author: "",
            description: description,
            detail: "",
            ongoing: true
        });
    }
    return Response.error("Không thể tải thông tin truyện");
}
