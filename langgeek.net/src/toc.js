function execute(url) {
    let response = fetch(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
        },
        timeout: 3000
    });

    if (response.ok) {
        let doc = response.html();
        let chapters = [];
        
        doc.select("div.entry-content a[href*='" + url.split("/").pop() + "']").forEach(e => {
            let href = e.attr("href");
            if (href && href !== url) {
                chapters.push({
                    name: e.text().trim(),
                    url: href,
                    host: "https://langgeek.net"
                });
            }
        });

        return Response.success(chapters);
    }
    return Response.error("Không thể tải danh sách chương");
}
