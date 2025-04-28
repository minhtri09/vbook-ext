function execute(url, page) {
    // Thêm trang phân trang nếu có
    let fullUrl = url + (page ? "?page=" + page : "");
    
    // Gửi yêu cầu HTTP
    let response = fetch(fullUrl);
    if (!response.ok) {
        return Response.error("Failed to fetch home content.");
    }

    // Phân tích HTML trả về
    let doc = response.html();

    // Lấy danh sách truyện
    let books = doc.select(".book-item").toArray().map(item => {
        let name = item.select(".title").text();
        let link = item.select("a").attr("href");
        let cover = item.select(".cover img").attr("src");
        let description = item.select(".description").text();

        return {
            name: name,
            link: link,
            cover: cover,
            description: description
        };
    });

    Console.log("Fetching URL: " + fullUrl);
    Console.log("Response status: " + response.status);

    // Kiểm tra danh sách truyện
    Console.log("Books: ", books);
    
    // Kiểm tra xem có trang tiếp theo không
    let next = doc.select(".pagination .next").attr("href") ? (page || 1) + 1 : null;

    return Response.success(books, next);
}
