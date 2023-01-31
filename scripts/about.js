function writeText() {
    const translatables = document.querySelectorAll("translatable[onload='false']");
    let actualTime = 1;
    for (let translatable of translatables) {
        setTimeout(() => {
            let translatedText = getTranslation(translatable.getAttribute('variable'));
            let i = 0;
            let timer = setInterval(() => {
                if (i < translatedText.length) {
                    translatable.innerHTML += translatedText.charAt(i);
                    i++;
                } else {
                    clearInterval(timer);
                }
            }, 5);
        }, actualTime);
        actualTime += 400;
    }
}


//setTimeout(() => {
//    writeText();
//}, 10)