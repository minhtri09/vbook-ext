function execute(url, page) {
    var response = fetch(url);
    if (!response.ok) return Response.error("Lỗi tải trang");
    var doc = response.html();
    var list = [];
    var items = doc.select("div.col.post-item");
    for (var i = 0; i < items.size(); i++) {
        var e = items.get(i);
        var a = e.selectFirst("a");
        var img = e.selectFirst(".box-image img");
        var name = "";
        var boxText = e.selectFirst(".box-text.text-center");
        if (boxText) name = boxText.text();
        list.push({
            name: name,
            link: a ? a.attr("href") : "",
            cover: img ? img.attr("src") : "",
            description: ""
        });
    }
    return Response.success(list);
}
