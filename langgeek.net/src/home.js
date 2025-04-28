function execute() {
    return Response.success([
        { 
            title: "Tất cả truyện", 
            input: "https://langgeek.net",
            script: "gen.js" 
        }
    ]);
}
