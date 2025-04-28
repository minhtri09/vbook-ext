function execute(url, page) {
    if (!page) page = '1';
    
    let response = fetch(url + (page == '1' ? '' : '/page/' + page), {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
        }
    });

    // Debug logging
    Console.log("Fetching URL: " + url + (page == '1' ? '' : '/page/' + page));
    Console.log("Response status: " + response.status);

    if (response.ok) {
        let doc = response.html();
        let novels = [];
        
        // Try different possible selectors for novel items
        let items = doc.select("article.post-item, div.post-item, div.novel-item");
        Console.log("Found items: " + items.size());

        items.forEach(e => {
            try {
                let title = e.select("h2 a, h3 a").first();
                let coverImg = e.select("img").first();
                let description = e.select("div.excerpt, div.summary, p.excerpt").first();

                if (title != null) {
                    let novelInfo = {
                        name: title.text().trim(),
                        link: title.attr("href"),
                    };

                    if (coverImg != null) {
                        novelInfo.cover = coverImg.attr("src") || coverImg.attr("data-src");
                    }

                    if (description != null) {
                        novelInfo.description = description.text().trim();
                    }

                    novels.push(novelInfo);
                }
            } catch (error) {
                Console.log("Error processing item: " + error);
            }
        });

        if (novels.length === 0) {
            Console.log("No novels found - HTML structure: " + doc.html());
            return Response.error("Không tìm thấy truyện nào");
        }

        // Check for next page
        let nextPage = null;
        try {
            let nextLink = doc.select("a.next, a.nextpostslink, nav.pagination a:contains(»)").first();
            if (nextLink != null) {
                let nextUrl = nextLink.attr("href");
                if (nextUrl) {
                    // Extract page number from URL
                    let match = nextUrl.match(/page\/(\d+)/);
                    if (match) {
                        nextPage = match[1];
                    }
                }
            }
        } catch (error) {
            Console.log("Error processing pagination: " + error);
        }

        Console.log("Next page: " + nextPage);
        return Response.success(novels, nextPage);
    }

    return Response.error("Không thể tải trang - HTTP Status: " + response.status);
}
