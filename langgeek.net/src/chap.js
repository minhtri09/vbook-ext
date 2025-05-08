function execute(url) {
    let doc = Http.get(url).html();
    let imgs = [];
    doc.select('img').forEach(e => imgs.push(e.attr('src')));
    return Response.success(imgs);
}