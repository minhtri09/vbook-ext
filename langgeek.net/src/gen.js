load('config.js');
function execute(url, page) {
    if (!page) page = 1;
    let doc = Http.get(url + (url.includes('?') ? '&' : '?') + 'page=' + page).html();
    let el = doc.select('div.row.row-issue:not(.row-header)');
    let next = doc.select('.pagination a.active + a').text();
    let data = [];
    for (let i = 0; i < el.size(); i++) {
        let e = el.get(i);
        let name = e.select('div.large-5 a').text();
        let link = e.select('div.large-5 a').attr('href');
        let updated = e.select('div.large-3').text();
        data.push({
            name: name,
            link: link,
            cover: null,
            description: updated,
            host: BASE_URL
        });
    }
    return Response.success(data, next);
}