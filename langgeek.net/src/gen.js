function execute(url, page) {
    if (!page) page = "1";
    let fullUrl = url;
    if (page !== "1") {
        if (fullUrl.endsWith("/")) fullUrl = fullUrl.slice(0, -1);
        fullUrl += "/page/" + page + "/";
    }
    let response = fetch(fullUrl, {
        headers: {
            "User-Agent": "Mozilla/5.0 (Linux; Android 13; SM-G991B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Mobile Safari/537.36"
        },
        timeout: 8000
    });
    if (!response.ok) {
        Console.log("HTTP Status: " + response.status);
        try {
            let body = response.text();
            Console.log("Body: " + body);
        } catch (e) {
            Console.log("Không đọc được body: " + e);
        }
        return Response.error("Không thể tải trang chủ -- Status: " + response.status);
    }
    let doc = response.html();
    // Ghi lại đoạn đầu mã HTML để debug
    Console.log(doc.html().substring(0, 1000));
    // ... (phần cũ giữ nguyên)
}
