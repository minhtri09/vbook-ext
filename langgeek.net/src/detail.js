function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        
        return Response.success({
            name: doc.select("h1.entry-title").text(),
            cover: doc.select("div.book-thumbnail img").attr("src"),
            author: doc.select("div.book-information div:contains(Tác giả:) span").text(),
            description: doc.select("div.desc-text").text(),
            detail: doc.select("div.book-information").text(),
            ongoing: doc.select("div.book-information").text().includes("Đang ra")
        });
    }
    return Response.error("Không thể tải thông tin truyện");
}
