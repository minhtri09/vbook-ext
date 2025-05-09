function execute(url) {
    var response = fetch(url);
    if (!response.ok) return Response.error("Lỗi tải trang");
    var doc = response.html();
    var list = [];
    doc.select("div.row.row-issue").forEach(e => {
        var a = e.selectFirst("div.col.large-8.small-4 a");
        if (a) {
            list.push({
                name: a.text(),
                url: a.attr("href")
            });
        }
    });
    return Response.success(list);
}
