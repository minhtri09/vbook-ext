function execute(url) {
    let response = fetch(url);
    if (!response.ok) return Response.error("Failed to fetch detail page.");

    let doc = response.html();
    let name = doc.select("h1.title").text();
    let cover = doc.select(".cover img").attr("src");
    let author = doc.select(".author a").text();
    let description = doc.select(".description").text();
    let ongoing = doc.select(".status").text().toLowerCase().includes("ongoing");
    let genres = doc.select(".genres a").toArray().map(genre => ({
        title: genre.text(),
        input: genre.attr("href"),
        script: "genre.js"
    }));

    return Response.success({
        name: name,
        cover: cover,
        author: author,
        description: description,
        ongoing: ongoing,
        genres: genres
    });
}
