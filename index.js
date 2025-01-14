document.addEventListener("DOMContentLoaded", async () => {

    const params = new URLSearchParams(document.location.search);
    const page = params.get("p") || "home";    
    if (page === "home") window.history.pushState(null, document.title, window.location.pathname);
    const html = await (await fetch(`src/pages/${page}.html`)).text();
    document.getElementById("content").innerHTML = html;

});