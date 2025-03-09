window["load-netflags-calculator"] = async () => {

    const params = new URLSearchParams(document.location.search);
    const page = params.get("p");

    const maxnetflags = Array(28).fill(0).reduce((max,_,i)=>max+=1<<i,0);
    const maxweapflags = Array(11).fill(0).reduce((max,_,i)=>max+=1<<i,0);
    const maxinvflags = Array(11).fill(0).reduce((max,_,i)=>max+=1<<i,0);

    function getCheckboxes () {
        let netflags = 0;
        let weapflags = 0;
        let invflags = 0;
        document.querySelectorAll(`input[type="checkbox"]`).forEach(e => {        
            if (e.checked) {
                switch (true) {
                    case e.id.startsWith("netflag"): {
                        netflags += parseInt(e.id.split("-")[1]);
                        break;
                    }
                    case e.id.startsWith("weapflag"): {
                        weapflags += parseInt(e.id.split("-")[1]);
                        break;
                    }
                    case e.id.startsWith("invflag"): {
                        invflags += parseInt(e.id.split("-")[1]);
                        break;
                    }
                }
            }
        });
        return {netflags, weapflags, invflags};
    }

    function setCheckboxes (netflags, weapflags, invflags) {

        document.querySelectorAll(`input[type="checkbox"]`).forEach(e => {
            e.checked = false;
        });

        for (let i = 0; i <= 27; i++) {
            const flag = (1 << i);
            if ((flag & netflags) === flag) {
                document.getElementById(`netflag-${flag}`).checked = true;
            }
        }

        for (let i = 0; i <= 10; i++) {
            const flag = (1 << i);
            if ((flag & weapflags) === flag) {
                document.getElementById(`weapflag-${flag}`).checked = true;
            }
        }

        for (let i = 0; i <= 10; i++) {
            const flag = (1 << i);
            if ((flag & invflags) === flag) {
                document.getElementById(`invflag-${flag}`).checked = true;
            }
        }

    }

    function getTextboxes () {
        const netflagstext = document.getElementById("netflags").value;
        const weapflagstext = document.getElementById("weapflags").value;
        const invflagstext = document.getElementById("invflags").value;
        const netflagsRegex = /(?<=\/netflags)\d*/g;
        const weapflagsRegex = /(?<=\/weapflags)\d*/g;
        const invflagsRegex = /(?<=\/invflags)\d*/g;
        let netflags = parseInt(netflagstext.match(netflagsRegex)[0]);
        let weapflags = parseInt(weapflagstext.match(weapflagsRegex)[0]);
        let invflags = parseInt(invflagstext.match(invflagsRegex)[0]);
        netflags = !netflags || netflags > maxnetflags ? 0 : netflags;
        weapflags = !weapflags || weapflags > maxweapflags ? 0 : weapflags;
        invflags = !invflags || invflags > maxinvflags ? 0 : invflags;
        return {netflags,weapflags,invflags};
    }

    function setTextboxes (netflags, weapflags, invflags) {    
        document.getElementById("netflags").value = `/netflags${netflags}`;
        document.getElementById("weapflags").value = `/weapflags${weapflags}`;
        document.getElementById("invflags").value = `/invflags${invflags}`;
    }

    let netflags = parseInt(params.get("netflags") || "0");
    let weapflags = parseInt(params.get("weapflags") || "0");
    let invflags = parseInt(params.get("invflags") || "0");

    netflags = netflags > maxnetflags ? 0 : netflags;
    weapflags = weapflags > maxweapflags ? 0 : weapflags;
    invflags = invflags > maxinvflags ? 0 : invflags;

    window.history.pushState({}, null, `?p=${page}&netflags=${netflags}&weapflags=${weapflags}&invflags=${invflags}`);

    setCheckboxes(netflags, weapflags, invflags);
    setTextboxes(netflags, weapflags, invflags);

    document.querySelectorAll(`input[type="checkbox"]`).forEach(e => {
        e.onchange = () => {
            const {netflags, weapflags, invflags} = getCheckboxes();
            setTextboxes(netflags, weapflags, invflags);
            window.history.pushState({}, null, `?p=${page}&netflags=${netflags}&weapflags=${weapflags}&invflags=${invflags}`);    
        }
    });

    document.querySelectorAll(`input[type="text"]`).forEach(e => {
        e.oninput = () => {
            const {netflags, weapflags, invflags} = getTextboxes();
            setCheckboxes(netflags, weapflags, invflags);
            window.history.pushState({}, null, `?p=${page}&netflags=${netflags}&weapflags=${weapflags}&invflags=${invflags}`);    
        }
    });

};