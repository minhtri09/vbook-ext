function execute(url) {
    // Một số truyện chỉ có 1 chương, hoặc mỗi post là 1 chương
    // Nếu có nhiều chương, thường nằm trong entry-content với các link
    let response = fetch(url, {
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
        },
        timeout: 5000
    });
    if (response.ok) {
        let doc = response.html();
        let chaps = [];
        doc.select("div.entry-content a").forEach(a => {
            let href = a.attr("href");
            if (href && /langgeek\.net\/[^\/]+\/[^\/]+/.test(href)) {
                chaps.push({
                    name: a.text().trim(),
                    url: href
                });
            }
        });
        // Nếu không có chương, coi cả post là 1 chương
        if (chaps.length === 0) {
            chaps.push({
                name: "Đọc truyện",
                url: url
            });
        }
        return Response.success(chaps);
    }
    return Response.error("Không thể tải mục lục");
}
