function execute() {
    return Response.success([
        { 
            title: "Mới cập nhật", 
            input: "https://langgeek.net", // Changed to main page since latest updates are on homepage
            script: "gen.js" 
        },
        { 
            title: "Top truyện", 
            input: "https://langgeek.net/top", // Updated URL for top novels
            script: "gen.js" 
        }
    ]);
}
