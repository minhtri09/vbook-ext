function execute(url, page) {
    if (!page) page = '1';
    
    let response = fetch(url + (page == '1' ? '' : '/page/' + page));
    if (response.ok) {
        let doc = response.html();
        let novels = [];
        
        // Select all novel items
        doc.select("div.item").forEach(e => {
            novels.push({
                name: e.select("h3.title a").text(),
                link: e.select("h3.title a").attr("href"),
                cover: e.select("img.book-cover").attr("src"),
                description: e.select("div.excerpt").text()
            });
        });

        // Get next page
        let next = doc.select("div.pagination a.next").attr("href");
        let nextPage = null;
        if (next) {
            nextPage = (parseInt(page) + 1).toString();
        }

        return Response.success(novels, nextPage);
    }
    return Response.error("Không thể tải trang");
}
