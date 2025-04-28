function execute(url) {
    // Clean and standardize the URL
    url = url.replace(/\/$/, ''); // Remove trailing slash
    
    let response = fetch(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
        }
    });

    if (response.ok) {
        let doc = response.html();
        let chapters = [];
        
        // Try multiple possible selectors for chapter lists
        let chapterElements = doc.select("div.list-chap li a, div.lchap li a, ul.chapter-list li a");
        
        chapterElements.forEach(e => {
            chapters.push({
                name: e.text().trim(),
                url: e.attr("href"),
                host: "https://langgeek.net"
            });
        });

        // If no chapters found with primary selectors, try alternate approach
        if (chapters.length === 0) {
            // Look for any links that contain the comic name in their URL
            let comicPath = url.split('/').pop();
            doc.select("a[href*='" + comicPath + "']").forEach(e => {
                let href = e.attr("href");
                if (href && href.includes(comicPath) && href !== url) {
                    chapters.push({
                        name: e.text().trim(),
                        url: href,
                        host: "https://langgeek.net"
                    });
                }
            });
        }

        // Sort chapters in reverse order (newest first)
        return Response.success(chapters.reverse());
    }
    return Response.error("Không thể tải danh sách chương");
}
