load('config.js');
function execute(key, page) {
    if (!page) page = 1;
    let url = BASE_URL + 'tim-kiem?q=' + encodeURIComponent(key) + '&page=' + page;
    let doc = Http.get(url).html();
    let el = doc.select('.truyen-item');
    let next = doc.select('.pagination a.active + a').text();
    let data = [];
    for (let i = 0; i < el.size(); i++) {
        let e = el.get(i);
        data.push({
            name: e.select('.truyen-title').text(),
            link: e.select('a').attr('href'),
            cover: e.select('img').attr('src'),
            description: e.select('.truyen-desc').text(),
            host: BASE_URL
        });
    }
    return Response.success(data, next);
}