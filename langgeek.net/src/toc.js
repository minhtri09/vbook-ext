load('config.js');

function execute(url) {
    var doc = Http.get(url).html();
    var data = [];
    
    try {
        // Thử selector gốc trước
        var elements = doc.select("div.row.row-issue");
        
        if (elements.size() > 0) {
            for (var i = 0; i < elements.size(); i++) {
                var element = elements.get(i);
                var linkElement = element.select('a').first();
                if (linkElement) {
                    var name = linkElement.text();
                    var chapterUrl = linkElement.attr("href");
                    
                    if (name && chapterUrl) {
                        // Đảm bảo URL đầy đủ
                        if (chapterUrl.indexOf('//') === 0) {
                            chapterUrl = 'https:' + chapterUrl;
                        } else if (chapterUrl.indexOf('/') === 0) {
                            chapterUrl = BASE_URL + chapterUrl.substring(1);
                        } else if (chapterUrl.indexOf('http') !== 0) {
                            chapterUrl = BASE_URL + chapterUrl;
                        }
                        
                        data.push({
                            name: name,
                            url: chapterUrl,
                            host: BASE_URL
                        });
                    }
                }
            }
        }
        
        // Nếu không tìm thấy, thử các selector khác
        if (data.length === 0) {
            var selectors = [
                ".chapter-list a",
                ".episode-list a", 
                ".post-list a",
                ".entry-content a",
                "a[href*='chapter']",
                "a[href*='chap']"
            ];
            
            for (var s = 0; s < selectors.length; s++) {
                var selector = selectors[s];
                var links = doc.select(selector);
                
                for (var i = 0; i < links.size(); i++) {
                    var link = links.get(i);
                    var href = link.attr('href');
                    var text = link.text();
                    
                    if (href && text) {
                        // Kiểm tra xem có phải chapter link không
                        var textLower = text.toLowerCase();
                        var hrefLower = href.toLowerCase();
                        
                        if ((textLower.indexOf('chapter') > -1 || 
                             textLower.indexOf('chap') > -1 || 
                             textLower.indexOf('tap') > -1 ||
                             hrefLower.indexOf('chapter') > -1 ||
                             hrefLower.indexOf('chap') > -1) &&
                            hrefLower.indexOf('comment') === -1 &&
                            hrefLower.indexOf('share') === -1) {
                            
                            // Đảm bảo URL đầy đủ
                            if (href.indexOf('//') === 0) {
                                href = 'https:' + href;
                            } else if (href.indexOf('/') === 0) {
                                href = BASE_URL + href.substring(1);
                            } else if (href.indexOf('http') !== 0) {
                                href = BASE_URL + href;
                            }
                            
                            data.push({
                                name: text,
                                url: href,
                                host: BASE_URL
                            });
                        }
                    }
                }
                
                if (data.length > 0) {
                    break;
                }
            }
        }
        
    } catch (error) {
        // Nếu có lỗi, thử lấy tất cả link và lọc cơ bản
        var allLinks = doc.select('a[href]');
        for (var i = 0; i < allLinks.size(); i++) {
            var link = allLinks.get(i);
            var href = link.attr('href');
            var text = link.text();
            
            if (href && text && href.indexOf('http') === 0) {
                data.push({
                    name: text,
                    url: href,
                    host: BASE_URL
                });
            }
        }
    }
    
    // Đảo ngược để chapter mới nhất ở cuối
    data.reverse();
    
    return Response.success(data);
}