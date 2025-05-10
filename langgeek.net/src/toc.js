load('config.js');

function execute(url) {
    var doc = Http.get(url).html();
    // Lấy tất cả các div chứa chương truyện
    var el = doc.select("div.row.row-issue");
    const data = [];
    for (var i = 0; i < el.size(); i++) {
        var e = el.get(i);
        var a = e.select('a');
        data.push({
            name: a.text(), // Tên chương
            url: a.attr("href"), // Link chương
            host: BASE_URL
        });
    }
    data.reverse();
    return Response.success(data);
}