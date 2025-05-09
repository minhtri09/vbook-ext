load('config.js');
function execute(key, page) {
    if (!page) page = 1;
    
    try {
        // URL tìm kiếm đúng định dạng theo trang web
        let requestUrl = BASE_URL + 'page/' + page + '/?s=' + encodeURIComponent(key);
        if (page == 1) {
            requestUrl = BASE_URL + '?s=' + encodeURIComponent(key);
        }
        
        Console.log("Đang tải URL: " + requestUrl);
        
        let doc = Http.get(requestUrl).html();
        
        // Selector chính xác theo HTML bạn đã cung cấp
        let el = doc.select('div.col.post-item');
        Console.log("Số kết quả tìm thấy: " + el.size());
        
        let data = [];
        for (let i = 0; i < el.size(); i++) {
            let e = el.get(i);
            let link = e.select('a.plain').attr('href');
            let name = e.select('h5.post-title').text();
            let cover = e.select('div.box-image img').attr('src');
            let description = e.select('div.post-meta').text();
            
            data.push({
                name: name,
                link: link,
                cover: cover,
                description: description,
                host: BASE_URL
            });
        }
        
        // Xử lý phân trang từ HTML
        let next = "";
        
        // Tìm nút "next page" chính xác
        let nextPageLink = doc.select('a.next.page-number');
        if (nextPageLink.size() > 0) {
            let href = nextPageLink.attr('href');
            let match = href.match(/\/page\/(\d+)/);
            if (match) {
                next = match[1];
                Console.log("Trang tiếp theo: " + next);
            }
        }
        
        // Trường hợp không tìm thấy với regex, thử lấy từ trang hiện tại + 1
        if (!next) {
            let currentPage = doc.select('span.page-number.current').text();
            if (currentPage) {
                next = (parseInt(currentPage) + 1).toString();
            }
        }
        
        return Response.success(data, next);
    } catch (error) {
        Console.log("Lỗi: " + error.toString());
        return Response.error("Đã xảy ra lỗi: " + error.toString());
    }
}