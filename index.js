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

    // hack
    await sleep(1);

    if (location.hash) {
        const hash = location.hash.slice(1);
        location.hash = "";
        location.hash = hash;
    }

    const sections = document.querySelectorAll("div.content section");

    document.body.onscroll = e => {

        const ratios = [];

        sections.forEach(s => {

            const getVisibilityPercentage = (element) => {
                const rect = element.getBoundingClientRect();
                const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
                const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
                const visibleHeight = Math.max(0, Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0));
                const visibleWidth = Math.max(0, Math.min(rect.right, viewportWidth) - Math.max(rect.left, 0));
                const visibleArea = visibleHeight * visibleWidth;
                const elementArea = rect.width * rect.height;            
                return (visibleArea / elementArea) * 100;
            };

            ratios.push({
                id: s.id.replace("-section", ""),
                visibility: getVisibilityPercentage(s)
            });

        });

        console.log(ratios);

        const highest = ratios.reduce((a, b) => (b && b.visibility > a.visibility) ? b : a);

        document.querySelectorAll("div.menu li").forEach(e => e.classList.remove("highlight"));
        const li = document.querySelector(`a[href="#${highest.id}"]`).closest("li");
        li.classList.add("highlight");

    };

});

const sleep = (ms) =>  new Promise(resolve => setTimeout(resolve, ms));