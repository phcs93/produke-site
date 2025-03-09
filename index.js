document.addEventListener("DOMContentLoaded", async () => {

    const params = new URLSearchParams(document.location.search);
    const page = params.get("p") || "home";    
    document.getElementById("navbar").dataset.page = page;
    if (page === "home") window.history.pushState(null, document.title, window.location.pathname);
    const html = await (await fetch(`src/pages/${page}.html`)).text();
    document.getElementById("container").innerHTML = html;

    // extremely lazy i18n
    const lang = navigator.language.toLowerCase().indexOf("pt") > -1 ? "pt" : "en";
    document.documentElement.setAttribute("lang", lang);
    document.getElementById("lang").value = lang;
    document.getElementById("lang").onchange = event => {
        document.documentElement.setAttribute("lang", event.target.value);
    };

    // call current page loading function (this is a nasty hack but makes everything so much simpler)
    window[`load-${page}`]();

});

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));