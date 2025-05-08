load('config.js');
function execute() {
    return Response.success([
        {title: "Truyện mới cập nhật", input: BASE_URL + "truyen-moi-cap-nhat", script: "gen.js"},
        {title: "Top truyện", input: BASE_URL + "top-truyen", script: "gen.js"},
    ]);
}