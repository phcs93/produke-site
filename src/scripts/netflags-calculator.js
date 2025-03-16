window["load-netflags-calculator"] = async () => {

    const params = new URLSearchParams(document.location.search);
    const page = params.get("p");

    const netflagsAcount = 25;
    const netflagsBcount = 4;
    const netflagsCcount = 6;
    const weapflagscount = 11;
    const invflagscount = 11;

    const maxnetflagsA = Array(netflagsAcount).fill(0).reduce((max,_,i)=>max+=1<<i,0);
    const maxnetflagsB = Array(netflagsBcount).fill(0).reduce((max,_,i)=>max+=1<<i,0);
    const maxnetflagsC = Array(netflagsCcount).fill(0).reduce((max,_,i)=>max+=1<<i,0);
    const maxweapflags = Array(weapflagscount).fill(0).reduce((max,_,i)=>max+=1<<i,0);
    const maxinvflags = Array(invflagscount).fill(0).reduce((max,_,i)=>max+=1<<i,0);

    function getCheckboxes () {
        let netflagsA = 0;
        let netflagsB = 0;
        let netflagsC = 0;
        let weapflags = 0;
        let invflags = 0;
        document.querySelectorAll(`input[type="checkbox"]`).forEach(e => {        
            if (e.checked) {
                switch (true) {
                    case e.id.startsWith("netflagA"): {
                        netflagsA += parseInt(e.id.split("-")[1]);
                        break;
                    }
                    case e.id.startsWith("netflagB"): {
                        netflagsB += parseInt(e.id.split("-")[1]);
                        break;
                    }
                    case e.id.startsWith("netflagC"): {
                        netflagsC += parseInt(e.id.split("-")[1]);
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
        return {netflagsA, netflagsB, netflagsC, weapflags, invflags};
    }

    function setCheckboxes (netflagsA, netflagsB, netflagsC, weapflags, invflags) {

        document.querySelectorAll(`input[type="checkbox"]`).forEach(e => {
            e.checked = false;
        });

        for (let i = 0; i < netflagsAcount; i++) {
            const flag = (1 << i);
            if ((flag & netflagsA) === flag) {
                document.getElementById(`netflagA-${flag}`).checked = true;
            }
        }
        for (let i = 0; i < netflagsBcount; i++) {
            const flag = (1 << i);
            if ((flag & netflagsB) === flag) {
                document.getElementById(`netflagB-${flag}`).checked = true;
            }
        }
        for (let i = 0; i < netflagsCcount; i++) {
            const flag = (1 << i);
            if ((flag & netflagsC) === flag) {
                document.getElementById(`netflagC-${flag}`).checked = true;
            }
        }

        for (let i = 0; i < weapflagscount; i++) {
            const flag = (1 << i);
            if ((flag & weapflags) === flag) {
                document.getElementById(`weapflag-${flag}`).checked = true;
            }
        }

        for (let i = 0; i < invflagscount; i++) {
            const flag = (1 << i);
            if ((flag & invflags) === flag) {
                document.getElementById(`invflag-${flag}`).checked = true;
            }
        }

    }

    function getTextboxes () {
        const netflagsAtext = document.getElementById("netflagsA").value;
        const netflagsBtext = document.getElementById("netflagsB").value;
        const netflagsCtext = document.getElementById("netflagsC").value;
        const weapflagstext = document.getElementById("weapflags").value;
        const invflagstext = document.getElementById("invflags").value;
        const netflagsARegex = /(?<=\/netflagsA)\d*/g;
        const netflagsBRegex = /(?<=\/netflagsB)\d*/g;
        const netflagsCRegex = /(?<=\/netflagsC)\d*/g;
        const weapflagsRegex = /(?<=\/weapflags)\d*/g;
        const invflagsRegex = /(?<=\/invflags)\d*/g;
        let netflagsA = parseInt(netflagsAtext.match(netflagsARegex)[0]);
        let netflagsB = parseInt(netflagsBtext.match(netflagsBRegex)[0]);
        let netflagsC = parseInt(netflagsCtext.match(netflagsCRegex)[0]);
        let weapflags = parseInt(weapflagstext.match(weapflagsRegex)[0]);
        let invflags = parseInt(invflagstext.match(invflagsRegex)[0]);
        netflagsA = !netflagsA || netflagsA > maxnetflagsA ? 0 : netflagsA;
        netflagsB = !netflagsB || netflagsB > maxnetflagsB ? 0 : netflagsB;
        netflagsC = !netflagsC || netflagsC > maxnetflagsC ? 0 : netflagsC;
        weapflags = !weapflags || weapflags > maxweapflags ? 0 : weapflags;
        invflags = !invflags || invflags > maxinvflags ? 0 : invflags;
        return {netflagsA,netflagsB,netflagsC,weapflags,invflags};
    }

    function setTextboxes (netflagsA, netflagsB, netflagsC, weapflags, invflags) {    
        document.getElementById("netflagsA").value = `/netflagsA${netflagsA}`;
        document.getElementById("netflagsB").value = `/netflagsB${netflagsB}`;
        document.getElementById("netflagsC").value = `/netflagsC${netflagsC}`;
        document.getElementById("weapflags").value = `/weapflags${weapflags}`;
        document.getElementById("invflags").value = `/invflags${invflags}`;
    }

    let netflagsA = parseInt(params.get("netflagsA") || "0");
    let netflagsB = parseInt(params.get("netflagsB") || "0");
    let netflagsC = parseInt(params.get("netflagsC") || "0");
    let weapflags = parseInt(params.get("weapflags") || "0");
    let invflags = parseInt(params.get("invflags") || "0");

    netflagsA = netflagsA > maxnetflagsA ? 0 : netflagsA;
    netflagsB = netflagsB > maxnetflagsB ? 0 : netflagsB;
    netflagsC = netflagsC > maxnetflagsC ? 0 : netflagsC;
    weapflags = weapflags > maxweapflags ? 0 : weapflags;
    invflags = invflags > maxinvflags ? 0 : invflags;

    window.history.pushState({}, null, `?p=${page}&netflagsA=${netflagsA}&netflagsB=${netflagsB}&netflagsC=${netflagsC}&weapflags=${weapflags}&invflags=${invflags}`);

    setCheckboxes(netflagsA, netflagsB, netflagsC, weapflags, invflags);
    setTextboxes(netflagsA, netflagsB, netflagsC, weapflags, invflags);

    document.querySelectorAll(`input[type="checkbox"]`).forEach(e => {
        e.onchange = () => {
            const {netflagsA, netflagsB, netflagsC, weapflags, invflags} = getCheckboxes();
            setTextboxes(netflagsA, netflagsB, netflagsC, weapflags, invflags);
            window.history.pushState({}, null, `?p=${page}&netflagsA=${netflagsA}&netflagsB=${netflagsB}&netflagsC=${netflagsC}&weapflags=${weapflags}&invflags=${invflags}`);    
        }
    });

    document.querySelectorAll(`input[type="text"]`).forEach(e => {
        e.oninput = () => {
            const {netflagsA, netflagsB, netflagsC, weapflags, invflags} = getTextboxes();
            setCheckboxes(netflagsA, netflagsB, netflagsC, weapflags, invflags);
            window.history.pushState({}, null, `?p=${page}&netflagsA=${netflagsA}&netflagsB=${netflagsB}&netflagsC=${netflagsC}&weapflags=${weapflags}&invflags=${invflags}`);    
        }
    });

};