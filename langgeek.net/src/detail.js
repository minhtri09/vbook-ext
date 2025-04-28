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
        
        let name = doc.select("h1.entry-title").first().text();
        let info = doc.select("div.manga-info, div.comic-info, div.truyen-info").first();
        let coverImg = info.select("img").first();
        let cover = coverImg ? (coverImg.attr("data-src") || coverImg.attr("src")) : "";
        
        // Get the description
        let description = doc.select("div.summary, div.manga-description, div.comic-description").text();
        if (!description) {
            description = doc.select("div.entry-content > p").first().text();
        }

        return Response.success({
            name: name,
            cover: cover,
            description: description,
            detail: info.text(),
            host: "https://langgeek.net",
            ongoing: true // Since these are ongoing series
        });
    }
    return Response.error("Không thể tải thông tin truyện");
}
