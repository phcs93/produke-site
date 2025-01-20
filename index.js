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

        const target = e.target.scrollingElement || document.documentElement;

        if (target.scrollTop <= 0) return;

        // by chatgpt
        const getTopMostVisibleElement = (elements) => {
            
            let topmostElement = null;
            let smallestTopOffset = Infinity;
        
            elements.forEach(element => {

                const rect = element.getBoundingClientRect();
        
                // check if the element is in the viewport
                if (rect.bottom > 51 /*my fixed header*/ && rect.top < window.innerHeight) {
                    if (rect.top < smallestTopOffset) {
                        smallestTopOffset = rect.top;
                        topmostElement = element;
                    }
                }

            });
        
            return topmostElement;

        };

        const topMostId = getTopMostVisibleElement(sections).id.replace("-section", "");

        document.querySelectorAll("div.menu li").forEach(e => e.classList.remove("highlight"));
        const li = document.querySelector(`a[href="#${topMostId}"]`).closest("li");
        li.classList.add("highlight");
        li.scrollIntoView({
            block: "nearest"
        });

    };

});

const sleep = (ms) =>  new Promise(resolve => setTimeout(resolve, ms));