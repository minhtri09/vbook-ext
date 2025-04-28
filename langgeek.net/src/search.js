function execute(key, page) {
    let response = fetch(`https://langgeek.net/page/${page || 1}?s=${key}`, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
        }
    });

    if (response.ok) {
        let doc = response.html();
        let novels = [];

        doc.select("article.post").forEach(e => {
            let link = e.select("h2.entry-title a").first();
            if (link) {
                let href = link.attr("href");
                // Ensure the link uses the /truyen/ format
                if (!href.includes("/truyen/")) {
                    href = href.replace("langgeek.net/", "langgeek.net/truyen/");
                }
                
                novels.push({
                    name: link.text(),
                    link: href,
                    cover: e.select("img.wp-post-image").attr("src"),
                    description: e.select("div.entry-content").text()
                });
            }
        });

        let nextPage = null;
        let lastPage = doc.select("a.page-numbers").last();
        if (lastPage && lastPage.hasClass("next")) {
            nextPage = (parseInt(page || "1") + 1).toString();
        }

        return Response.success(novels, nextPage);
    }
    return Response.error("Không thể tìm kiếm - HTTP Status: " + response.status);
}
