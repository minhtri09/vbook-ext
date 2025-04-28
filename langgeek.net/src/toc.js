function execute(url) {
    // Ensure we're using the /truyen/ format
    if (!url.includes("/truyen/")) {
        url = url.replace("langgeek.net/", "langgeek.net/truyen/");
    }

    let response = fetch(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
        }
    });

    if (response.ok) {
        let doc = response.html();
        let chapters = [];

        doc.select("div.list-chap a").forEach(e => {
            chapters.push({
                name: e.text(),
                url: e.attr("href")
            });
        });

        return Response.success(chapters.reverse());
    }
    return Response.error("Không thể tải danh sách chương");
}
