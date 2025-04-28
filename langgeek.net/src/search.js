function execute(key, page) {
    if (!page) page = '1';
    
    let response = fetch(`https://langgeek.net/page/${page}?s=${key}&post_type=novel`);
    if (response.ok) {
        let doc = response.html();
        let novels = [];
        
        doc.select("div.item").forEach(e => {
            novels.push({
                name: e.select("h3.title a").text(),
                link: e.select("h3.title a").attr("href"),
                cover: e.select("img.book-cover").attr("src"),
                description: e.select("div.excerpt").text()
            });
        });

        let next = doc.select("div.pagination a.next").attr("href");
        let nextPage = null;
        if (next) {
            nextPage = (parseInt(page) + 1).toString();
        }

        return Response.success(novels, nextPage);
    }
    return Response.error("Không thể tìm truyện");
}
