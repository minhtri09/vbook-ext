function execute(url, page) {
    if (!page) page = '1';
    
    let response = fetch(url + (page == '1' ? '' : '/page/' + page), {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
        }
    });

    if (response.ok) {
        let doc = response.html();
        let novels = [];
        
        // Debug log
        Console.log("URL being processed: " + url);
        Console.log("Page number: " + page);
        
        // Select all novel items with more specific selector
        let items = doc.select("div.list-novel div.item");
        Console.log("Number of items found: " + items.size());

        items.forEach(e => {
            try {
                let title = e.select("h3.title a").first();
                let cover = e.select("img.book-cover, img.thumbnail").first();
                let excerpt = e.select("div.excerpt, div.desc-novel").first();

                if (title != null) {
                    novels.push({
                        name: title.text(),
                        link: title.attr("href"),
                        cover: cover ? cover.attr("src") : "",
                        description: excerpt ? excerpt.text() : ""
                    });
                }
            } catch (error) {
                Console.log("Error processing item: " + error);
            }
        });

        // Check if we found any novels
        if (novels.length === 0) {
            Console.log("No novels found on page");
            return Response.error("Không tìm thấy truyện nào");
        }

        // Get next page with more reliable detection
        let nextPage = null;
        try {
            let pagination = doc.select("div.pagination, ul.pagination");
            let currentPageElement = pagination.select("span.current, span.page-numbers.current").first();
            if (currentPageElement != null) {
                let currentPageNum = parseInt(currentPageElement.text());
                let maxPageElement = pagination.select("a.page-numbers:not(.next)").last();
                if (maxPageElement != null) {
                    let maxPage = parseInt(maxPageElement.text());
                    if (currentPageNum < maxPage) {
                        nextPage = (currentPageNum + 1).toString();
                    }
                }
            }
        } catch (error) {
            Console.log("Error processing pagination: " + error);
        }

        Console.log("Next page: " + nextPage);
        return Response.success(novels, nextPage);
    }

    // Log the error response
    Console.log("HTTP Status: " + response.status);
    Console.log("Response headers: " + JSON.stringify(response.headers));
    
    return Response.error("Không thể tải trang - HTTP Status: " + response.status);
}
