function execute() {
    // Try different URL structures to find the correct one
    let testUrls = [
        "https://langgeek.net",
        "https://langgeek.net/novel",
        "https://langgeek.net/novels",
        "https://langgeek.net/doc-truyen",
        "https://langgeek.net/truyen"
    ];
    
    for (let url of testUrls) {
        try {
            let response = fetch(url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
                }
            });
            Console.log("Testing URL: " + url);
            Console.log("Status: " + response.status);
            if (response.ok) {
                let doc = response.html();
                Console.log("Title: " + doc.select("title").text());
                Console.log("Novel links: " + doc.select("a[href*=novel], a[href*=truyen]").size());
                Console.log("First few links: " + doc.select("a[href*=novel], a[href*=truyen]").toString());
            }
        } catch (error) {
            Console.log("Error testing " + url + ": " + error);
        }
    }
}
