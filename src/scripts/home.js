window["load-home"] = async () => {

    document.getElementById("download").onclick = () => {

        switch (document.getElementById("lang").value) {
            case "en": alert("Please, contact the developers to gain access to the alpha version!"); break;
            case "pt": alert("Por favor, entre em contato com os desenvolvedores para ter acesso à versão alpha!"); break;
        }

    };

};