const txtUser = document.getElementById("usertxt");
const result = document.getElementById("result");
const title = document.getElementById("msg1");
const btnCopy = document.getElementById("btnCopy");
const msg2 = document.getElementById("msg2");
const illus = document.getElementById("illus");
const res = document.querySelector(".result");

const regex = /^[a-z0-9\s]+$/;

const encrypt = (text) => {
    let newtext = '';
    if (regex.test(text)) {
        newtext = text.replaceAll(/e/g, "enter")
            .replaceAll(/i/g, "imes")
            .replaceAll(/a/g, "ai")
            .replaceAll(/o/g, "ober")
            .replaceAll(/u/g, "ufat");
    }
    return newtext;
};

const decrypt = (text) => {
    let newtext = '';
    if (regex.test(text)) {
        newtext = text.replaceAll(/enter/g, "e")
            .replaceAll(/imes/g, "i")
            .replaceAll(/ai/g, "a")
            .replaceAll(/ober/g, "o")
            .replaceAll(/ufat/g, "u");
    }
    return newtext;
};

const showResult = (cant) => {
    if (cant > 0) {
        btnCopy.style.display = "block";
        msg2.style.display = "none";
        illus.style.display = "none";
        result.style.display = "block";
        title.style.display = "none";
        res.style.justifyContent = "space-between";
    } else {
        illus.style.display = "none";
        msg2.innerHTML = "Error, revisa el texto";
        btnCopy.style.display = "none";
        msg2.style.display = "block";
        title.style.display = "none";
        res.style.justifyContent = "center";
    }
};

btnCopy.addEventListener("click", () => {
    result.select();
    document.execCommand("copy");
});

btnEncrypt.addEventListener("click", () => {
    const txtUser = document.getElementById("usertxt").value; // Corregido: Recuperar el valor de 'usertxt'
    result.value = encrypt(txtUser);
    showResult(result.value.length);
});

btnDecrypt.addEventListener("click", () => {
    const txtUser = document.getElementById("usertxt").value; // Corregido: Recuperar el valor de 'usertxt'
    result.value = decrypt(txtUser);
    showResult(result.value.length);
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('sw.js')
        .then(function(registration) {
            console.log('Service Worker registrado con éxito:', registration);
        })
        .catch(function(error) {
            console.log('Fallo en el registro del Service Worker:', error);
        });
    });
}
