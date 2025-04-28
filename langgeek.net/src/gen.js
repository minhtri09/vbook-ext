function execute(url, page) {
    Console.log("Fetching URL: " + url + (page ? '/page/' + page : ''));
    
    let response = fetch(url + (page ? '/page/' + page : ''), {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
        }
    });

    if (response.ok) {
        let doc = response.html();
        let novels = [];

        // Find all novel entries
        let entries = doc.select("article.post");
        Console.log("Found " + entries.size() + " entries");

        entries.forEach(e => {
            try {
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
            } catch (error) {
                Console.log("Error processing entry: " + error);
            }
        });

        // Handle pagination
        let nextPage = null;
        let lastPage = doc.select("a.page-numbers").last();
        if (lastPage && lastPage.hasClass("next")) {
            let currentPage = parseInt(page || "1");
            nextPage = (currentPage + 1).toString();
        }

        Console.log("Found " + novels.length + " novels");
        return Response.success(novels, nextPage);
    }

    return Response.error("Không thể tải trang - HTTP Status: " + response.status);
}
