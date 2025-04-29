function execute(url) {
    let response = fetch(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
        },
        timeout: 3000
    });

    if (response.ok) {
        let doc = response.html();
        let content = doc.select("div.entry-content");
        
        // Remove unwanted elements
        content.select("div[id*='ads'], script, iframe, div.code-block, div.sharedaddy").remove();
        
        return Response.success(content.html());
    }
    return Response.error("Không thể tải nội dung chương");
}
