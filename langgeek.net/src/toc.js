function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let chapters = [];
        
        doc.select("div.list-chapter li a").forEach(e => {
            chapters.push({
                name: e.text(),
                url: e.attr("href")
            });
        });

        return Response.success(chapters.reverse());
    }
    return Response.error("Không thể tải danh sách chương");
}
