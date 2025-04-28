function execute() {
    return Response.success([
        { 
            title: "Mới cập nhật", 
            input: "https://langgeek.net",  // Main page has latest updates
            script: "gen.js" 
        }
    ]);
}
