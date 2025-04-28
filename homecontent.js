function execute(url, page) {
    // Chuyển sang URL phù hợp với phân trang
    let fullUrl = url + (page ? "?page=" + page : "");
    let response = fetch(fullUrl);
    if (!response.ok) return Response.error("Failed to fetch home content.");

    let doc = response.html();

    // Lấy danh sách truyện từ trang
    let books = doc.select(".book-item").toArray().map(item => ({
        name: item.select(".title").text(),
        link: item.select("a").attr("href"),
        cover: item.select(".cover img").attr("src"),
        description: item.select(".description").text()
    }));

    // Kiểm tra nút phân trang để xác định trang tiếp theo
    let next = doc.select(".pagination .next").attr("href") ? (page || 1) + 1 : null;

    return Response.success(books, next);
}
