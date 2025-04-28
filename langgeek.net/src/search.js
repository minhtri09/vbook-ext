function execute(key, page) {
    if (!page) page = '1';
    
    let response = fetch(`https://langgeek.net/page/${page}?s=${key}`, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
        }
    });

    if (response.ok) {
        let doc = response.html();
        let novels = [];

        doc.select("article.post").forEach(e => {
            let titleLink = e.select("h2.entry-title a").first();
            if (titleLink) {
                let novel = {
                    name: titleLink.text().trim(),
                    link: titleLink.attr("href"),
                    host: "https://langgeek.net"
                };

                // Get cover image
                let img = e.select("img.wp-post-image").first();
                if (img) {
                    novel.cover = img.attr("data-src") || img.attr("src");
                }

                // Get description
                let desc = e.select("div.entry-content").first();
                if (desc) {
                    novel.description = desc.text().trim();
                }

                novels.push(novel);
            }
        });

        // Handle pagination
        let nextPage = null;
        if (doc.select("nav.navigation a.next").first()) {
            nextPage = (parseInt(page) + 1).toString();
        }

        if (novels.length > 0) {
            return Response.success(novels, nextPage);
        }
        return Response.error("Không tìm thấy kết quả");
    }

    return Response.error("Không thể tìm kiếm");
}
