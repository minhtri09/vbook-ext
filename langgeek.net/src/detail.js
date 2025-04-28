function execute(url) {
    // Ensure we're using the /truyen/ format
    if (!url.includes("/truyen/")) {
        url = url.replace("langgeek.net/", "langgeek.net/truyen/");
    }

    let response = fetch(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
        }
    });

    if (response.ok) {
        let doc = response.html();
        
        let name = doc.select("h1.entry-title").text();
        let cover = doc.select("div.truyen-info img").attr("src");
        let detail = doc.select("div.truyen-info").text();
        let description = doc.select("div.summary").text();

        return Response.success({
            name: name,
            cover: cover,
            author: detail.match(/Tác giả:\s*([^\n]+)/)?.[1] || "",
            description: description,
            detail: detail,
            ongoing: detail.includes("Đang ra") || detail.includes("Updating")
        });
    }
    return Response.error("Không thể tải thông tin truyện");
}
