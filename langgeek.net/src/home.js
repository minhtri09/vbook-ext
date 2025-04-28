function execute() {
    Console.log("Executing home.js");
    return Response.success([
        { 
            title: "Tất cả truyện", 
            input: "https://langgeek.net",
            script: "gen.js" 
        },
        {
            title: "All Star Superman",
            input: "https://langgeek.net/all-star-superman",
            script: "gen.js"
        },
        {
            title: "DC All In Special",
            input: "https://langgeek.net/dc-all-in-special-2024",
            script: "gen.js"
        }
    ]);
}
