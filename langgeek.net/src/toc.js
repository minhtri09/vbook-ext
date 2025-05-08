load('config.js');
function execute(url) {
    let doc = Http.get(url).html();
    // Lấy tất cả các chương, bỏ qua dòng header
    let el = doc.select('div.list_issues div.row.row-issue:not(.row-header)');
    let data = [];
    for (let i = 0; i < el.size(); i++) {
        let e = el.get(i);
        let a = e.select('div.col.large-8.small-4 a');
        data.push({
            name: a.text(),
            url: a.attr('href'),
            host: BASE_URL
        });
    }
    return Response.success(data);
}