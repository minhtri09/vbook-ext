function execute(url) {
    let response = fetch(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
        }
    });

    if (response.ok) {
        let doc = response.html();
        
        // Get the chapter content
        let content = doc.select("div.entry-content");
        
        // Remove unwanted elements
        content.select("div[id*='ads'], script, iframe, div.code-block, div.sharedaddy, div.wp-post-navigation, div.rating, div.chapter-nav").remove();
        
        // Process images if any
        content.select("img").forEach(img => {
            let src = img.attr("data-src") || img.attr("src");
            if (src) {
                // Ensure image URL is absolute
                if (!src.startsWith("http")) {
                    src = "https://langgeek.net" + (src.startsWith("/") ? "" : "/") + src;
                }
                img.attr("src", src);
            }
        });

        // Get the clean HTML
        let html = content.html();
        
        // Remove empty paragraphs and unnecessary spaces
        html = html.replace(/<p>\s*<\/p>/g, '')
                   .replace(/\n\s*\n/g, '\n')
                   .trim();

        return Response.success(html);
    }
    return Response.error("Không thể tải nội dung chương");
}
