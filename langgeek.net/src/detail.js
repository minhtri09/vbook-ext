load('config.js');
function execute(url) {
    let doc = Http.get(url).html();

    // Lấy tên truyện
    let name = doc.select('h1.story_title').text();

    // Lấy tác giả
    let author = '';
    let infoItems = doc.select('.story_info ul li');
    for (let i = 0; i < infoItems.size(); i++) {
        let text = infoItems.get(i).text();
        if (text.includes('Tác giả:')) {
            author = infoItems.get(i).select('a').text();
            break;
        }
    }

    // Lấy giới thiệu: lấy div sau .story_info
    let description = '';
    let descDivs = doc.select('.article-inner > div');
    if (descDivs.size() > 0) {
        // Thường phần giới thiệu là div cuối cùng trong .article-inner
        description = descDivs.last().text();
    }

    return Response.success({
        name: name,
        author: author,
        description: description
    });
}