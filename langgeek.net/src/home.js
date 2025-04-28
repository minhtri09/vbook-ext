function execute() {
    return Response.success([
        { 
            title: "Mới cập nhật", 
            input: "https://langgeek.net/truyen-moi-cap-nhat",  // Using the correct path
            script: "gen.js" 
        },
        { 
            title: "Top truyện", 
            input: "https://langgeek.net/truyen", // Using the main truyen directory
            script: "gen.js" 
        }
    ]);
}
