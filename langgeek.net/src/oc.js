load('config.js');
function execute(url, page) {
    if (!page) page = 1;
    
    // Xử lý URL cho đúng với cấu trúc phân trang
    let requestUrl;
    if (page === 1) {
        requestUrl = url;
    } else {
        // Nếu url đã có "/page/" ở cuối thì thay thế, nếu không thì thêm vào
        if (url.includes('/page/')) {
            requestUrl = url.replace(/\/page\/\d+\/?$/, '/page/' + page + '/');
        } else {
            requestUrl = url + (url.endsWith('/') ? '' : '/') + 'page/' + page + '/';
        }
    }
    
    let doc = Http.get(requestUrl).html();
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
    
    // Tìm nút "next page"
    let nextPage = doc.select('a.next.page-number');
    let next = "";
    
    if (nextPage.size() > 0) {
        // Nếu có nút "next page", lấy số trang từ URL của nó
        let nextHref = nextPage.attr('href');
        let match = nextHref.match(/\/page\/(\d+)/);
        if (match) {
            next = match[1];
        }
    } else {
        // Hoặc kiểm tra trang hiện tại và xem có trang tiếp theo không
        let pageLinks = doc.select('a.page-number');
        for (let i = 0; i < pageLinks.size(); i++) {
            let pageNum = parseInt(pageLinks.get(i).text().trim());
            if (!isNaN(pageNum) && pageNum > page) {
                next = (page + 1).toString();
                break;
            }
        }
    }
    
    return Response.success(data, next);
}