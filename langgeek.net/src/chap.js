load('config.js');

function execute(url) {
    var doc = Http.get(url).html();
    var imgs = [];
    
    try {
        // Lấy tất cả img có src
        var imageElements = doc.select('img[src]');
        
        for (var i = 0; i < imageElements.size(); i++) {
            var img = imageElements.get(i);
            var src = img.attr('src');
            
            if (src && src !== '') {
                // Kiểm tra extension hợp lệ
                if (src.indexOf('.jpg') > -1 || 
                    src.indexOf('.jpeg') > -1 || 
                    src.indexOf('.png') > -1 || 
                    src.indexOf('.gif') > -1 || 
                    src.indexOf('.webp') > -1) {
                    
                    // Loại bỏ logo, icon
                    var srcLower = src.toLowerCase();
                    if (srcLower.indexOf('logo') === -1 && 
                        srcLower.indexOf('icon') === -1 && 
                        srcLower.indexOf('avatar') === -1) {
                        
                        // Đảm bảo URL đầy đủ
                        if (src.indexOf('//') === 0) {
                            src = 'https:' + src;
                        } else if (src.indexOf('/') === 0) {
                            src = BASE_URL + src.substring(1);
                        } else if (src.indexOf('http') !== 0) {
                            src = BASE_URL + src;
                        }
                        
                        imgs.push(src);
                    }
                }
            }
        }
        
        // Nếu không có, thử data-src
        if (imgs.length === 0) {
            var lazyImages = doc.select('img[data-src]');
            for (var i = 0; i < lazyImages.size(); i++) {
                var img = lazyImages.get(i);
                var src = img.attr('data-src');
                
                if (src && src !== '' && src.indexOf('http') === 0) {
                    imgs.push(src);
                }
            }
        }
        
    } catch (error) {
        // Fallback đơn giản
        var allImages = doc.select('img');
        for (var i = 0; i < allImages.size(); i++) {
            var src = allImages.get(i).attr('src');
            if (src && src.indexOf('http') === 0) {
                imgs.push(src);
            }
        }
    }
    
    return Response.success(imgs);
}