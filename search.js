function execute(key, page) {
    let searchUrl = `https://langgeek.net/search?q=${encodeURIComponent(key)}&page=${page || 1}`;
    let response = fetch(searchUrl);
    if (!response.ok) return Response.error("Failed to fetch search results.");

    let doc = response.html();
    let results = doc.select(".search-result-item").toArray().map(item => ({
        name: item.select(".title").text(),
        link: item.select("a").attr("href"),
        cover: item.select(".cover img").attr("src"),
        description: item.select(".description").text()
    }));

    let nextPage = doc.select(".pagination .next").attr("href") ? (page || 1) + 1 : null;

    return Response.success(results, nextPage);
}
