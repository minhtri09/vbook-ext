function execute(url) {
    let response = fetch(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
        },
        timeout: 3000 // 3 seconds timeout
    });

    if (response.ok) {
        let doc = response.html();
        
        return Response.success({
            name: doc.select("h1.entry-title").text(),
            cover: doc.select("div.entry-content img").first().attr("src"),
            description: doc.select("div.entry-content p").first().text(),
            detail: "",
            host: "https://langgeek.net"
        });
    }
    return Response.error("Không thể tải thông tin truyện");
}
