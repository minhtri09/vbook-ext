load('config.js');
function execute(url, page) {
    if (!page) page = 1;
    let doc = Http.get(url + (url.includes('?') ? '&' : '?') + 'page=' + page).html();
    let el = doc.select('div.col-inner > a');
    let data = [];
    for (let i = 0; i < el.size(); i++) {
        let e = el.get(i);
        let name = e.attr('title');
        let link = e.attr('href');
        let cover = e.select('img').attr('src');
        data.push({
            name: name,
            link: link,
            cover: cover,
            description: "",
            host: BASE_URL
        });
    }
    return Response.success(data);
}