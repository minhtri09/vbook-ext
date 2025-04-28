function execute() {
    let response = fetch("https://langgeek.net/", {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
        }
    });
    
    if (response.ok) {
        let doc = response.html();
        let genres = [];
        
        // Select categories from the menu
        doc.select("ul#menu-menu li a").forEach(e => {
            let title = e.text().trim();
            let url = e.attr("href");
            
            // Skip non-category links
            if (url && url.includes("langgeek.net") && !url.includes("page")) {
                genres.push({
                    title: title,
                    input: url,
                    script: "gen.js"
                });
            }
        });
        
        return Response.success(genres);
    }
    
    return Response.error("Không thể tải thể loại");
}
