function execute(url) {
    let response = fetch(url);
    if (!response.ok) return Response.error("Failed to fetch chapter.");

    let doc = response.html();
    let content = doc.select(".chapter-content").html();

    return Response.success(content);
}
