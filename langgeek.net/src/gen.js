function execute(url, page) {
    Console.log("Executing gen.js with URL: " + url);
    if (!page) page = '1';

    let response = fetch(url + (page === '1' ? '' : '/page/' + page), {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
        }
    });

    Console.log("Response status: " + response.status);

    if (response.ok) {
        let doc = response.html();
        let novels = [];

        // Try multiple selectors for posts
        let entries = doc.select("article.post, div.post, div.article");
        Console.log("Found entries: " + entries.size());

        if (entries.size() === 0) {
            // Try alternate selectors
            entries = doc.select("div.entry-content a[href*='langgeek.net']");
            Console.log("Found alternate entries: " + entries.size());
        }

        entries.forEach(e => {
            try {
                let novel = {};
                if (e.tagName() === "article" || e.tagName() === "div") {
                    // For standard post format
                    let titleLink = e.select("h1 a, h2 a, h3 a").first();
                    let img = e.select("img.wp-post-image, img.thumbnail").first();
                    let desc = e.select("div.entry-content, div.excerpt").first();

                    if (titleLink) {
                        novel = {
                            name: titleLink.text().trim(),
                            link: titleLink.attr("href"),
                            cover: img ? (img.attr("data-src") || img.attr("src")) : "",
                            description: desc ? desc.text().trim() : "",
                            host: "https://langgeek.net"
                        };
                    }
                } else if (e.tagName() === "a") {
                    // For link format
                    let href = e.attr("href");
                    if (href && href.includes("langgeek.net") && !href.includes("page/")) {
                        novel = {
                            name: e.text().trim() || href.split("/").filter(p => p).pop().replace(/-/g, " "),
                            link: href,
                            host: "https://langgeek.net"
                        };
                    }
                }

                if (novel.name && novel.link) {
                    Console.log("Found novel: " + novel.name + " at " + novel.link);
                    novels.push(novel);
                }
            } catch (error) {
                Console.log("Error processing entry: " + error);
            }
        });

        Console.log("Total novels found: " + novels.length);

        if (novels.length === 0) {
            // If no novels found, try to get raw HTML for debugging
            Console.log("No novels found. HTML structure:");
            Console.log(doc.html());
            return Response.error("Không tìm thấy truyện nào");
        }

        // Handle pagination
        let nextPage = null;
        let pagination = doc.select("a.next, a.nextpostslink, nav.navigation a:contains(»)").first();
        if (pagination) {
            nextPage = (parseInt(page) + 1).toString();
            Console.log("Next page found: " + nextPage);
        }

        return Response.success(novels, nextPage);
    }

    return Response.error("Không thể tải trang - HTTP Status: " + response.status);
}
