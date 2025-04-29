function execute(url, page) {
    if (!page) page = "1";
    let fullUrl = url;
    if (page !== "1") {
        if (fullUrl.endsWith("/")) fullUrl = fullUrl.slice(0, -1);
        fullUrl += "/page/" + page + "/";
    }
    let response = fetch(fullUrl, {
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
        },
        timeout: 5000
    });
    if (response.ok) {
        let doc = response.html();
        let novels = [];
        doc.select("article.post").forEach(e => {
            let title = e.select("h2.entry-title a").first();
            let img = e.select("img.wp-post-image").first();
            if (title && img) {
                novels.push({
                    name: title.text().trim(),
                    link: title.attr("href"),
                    cover: img.attr("src"),
                    description: e.select("div.entry-content p").first().text().trim()
                });
            }
        });
        // Phân trang
        let nextPage = null;
        let nextBtn = doc.select("a.next.page-numbers").first();
        if (nextBtn) {
            nextPage = (parseInt(page) + 1).toString();
        }
        return Response.success(novels, nextPage);
    }
    return Response.error("Không thể tải trang chủ hoặc bị chặn IP/User-Agent");
}
