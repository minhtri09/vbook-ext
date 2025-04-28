function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let content = doc.select("div.chapter-content");
        
        // Remove ads and unnecessary elements
        content.select("div.ads-chapter").remove();
        content.select("script").remove();
        content.select("iframe").remove();
        
        return Response.success(content.html());
    }
    return Response.error("Không thể tải nội dung chương");
}
