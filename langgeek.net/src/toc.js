function execute(url) {
    let response = fetch(url);
    if (!response.ok) return Response.error("Failed to fetch TOC.");

    let doc = response.html();
    let chapters = doc.select(".chapter-list a").toArray().map(chapter => ({
        name: chapter.text(),
        url: chapter.attr("href"),
        host: "https://langgeek.net"
    }));

    return Response.success(chapters);
}
