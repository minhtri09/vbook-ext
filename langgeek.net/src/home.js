load('config.js');
function execute() {
    return Response.success([
        {title: "Truyện mới cập nhật", input: BASE_URL + "truyen-moi-cap-nhat", script: "gen.js"},
        {title: "Top truyện", input: BASE_URL + "top-truyen", script: "top.js"},
        {title: "DC Comic", input: BASE_URL + "hang-truyen/dc-comic", script: "dc.js"},
        {title: "Marvel Comic", input: BASE_URL + "hang-truyen/marvel-comic", script: "mv.js"},
        {title: "Image Comic", input: BASE_URL + "hang-truyen/image-comic", script: "ic.js"},
        {title: "Other Comic", input: BASE_URL + "hang-truyen/cac-hang-khac", script: "oc.js"},
    ]);
}