function execute(url, page) {
    if (!page) page = '1';
    
    let response = fetch(url + (page === '1' ? '' : '/page/' + page), {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
        }
    });

    if (response.ok) {
        let doc = response.html();
        let novels = [];

        // Find all comic/novel entries
        let entries = doc.select("article.post");
        
        entries.forEach(e => {
            try {
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
            } catch (error) {
                Console.log("Error processing entry: " + error);
            }
        });

        // Handle pagination
        let nextPage = null;
        let pagination = doc.select("nav.navigation a.next").first();
        if (pagination) {
            nextPage = (parseInt(page) + 1).toString();
        }

        return Response.success(novels, nextPage);
    }

    return Response.error("Không thể tải trang - HTTP Status: " + response.status);
}
