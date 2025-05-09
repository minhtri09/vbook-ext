load('config.js');
function execute() {
    let doc = Http.get(BASE_URL).html();
    let genres = [];
    let el = doc.select('.menu-item .menu-item-type-taxonomy .menu-item-object-brand_story'); // Cần xác định đúng selector
    for (let i = 0; i < el.size(); i++) {
        let e = el.get(i);
        genres.push({
            title: e.text(),
            input: e.attr('href'),
            script: "gen.js"
        });
    }
    return Response.success(genres);
}