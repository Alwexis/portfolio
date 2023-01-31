let __LANGUAGE__ = localStorage.getItem('language') || 'ES';

const __TRANSLATIONS__ = {
    "ES": {
        "navbar": {
            "about_me": "Sobre mi",
            "mystack": "Mi stack",
            "projects": "Proyectos",
            "experience": "Experiencia"
        },
        "about_me": [
            "Hola, soy Ariel Silva, un estudiante de 21 años y un gran apasionado a los videojuegos, mangas y a toda forma de tecnología, sobretodo la que tenga que ver con la programación e internet de las cosas.",
            "Actualmente estoy estudiando en Duoc UC desde el año 2021, en la carrera de Ingeniería en Informática y me encuentro en mi 5to semestre.",
            "Mis intereses profesionales están enfocados en el desarrollo de aplicaciones web, de videojuegos y de aplicaciones móviles híbridas. También estoy bastante interesado en todo lo relacionado con Inteligencia Artificial y Machine Learning.",
            "Mi 'meta' como persona es poder llegar a ser un desarrollador destacado dentro de la industria, y si es posible, poder influir positivamente en la sociedad utilizando la tecnología."
        ]
    },
    "EN": {
        "navbar": {
            "about_me": "About me",
            "mystack": "My stack",
            "projects": "Projects",
            "experience": "Experience"
        },
        "about_me": [
            "Hello, I'm Ariel Silva, a 21-year-old student and a big fan of video games, manga, and all forms of technology, especially those related to programming and the Internet of Things.",
            "Currently, I'm studying at Duoc UC since 2021 in the Computer Engineering program and I am in my 5th semester.",
            "My professional interests are focused on the development of web applications, video games, and hybrid mobile applications. I'm also quite interested in everything related to Artificial Intelligence and Machine Learning.",
            "My 'goal' as a person and professional is to become a prominent developer within the industry, and if possible, to positively impact society using technology."
        ]
    }
}

function toggleLang() {
    if (__LANGUAGE__ === 'ES') {
        __LANGUAGE__ = 'EN';
    } else {
        __LANGUAGE__ = 'ES';
    }
    localStorage.setItem('lang', __LANGUAGE__);
    translatePage(false);
}

function getTranslation(keys) {
    let splittedKeys = keys.split('.');
    if (splittedKeys.length > 0) {
        lastKey = __TRANSLATIONS__[__LANGUAGE__];
        splittedKeys.forEach(key => {
            lastKey = lastKey[key];
        })
        return lastKey;
    } else {
        if (__TRANSLATIONS__[__LANGUAGE__][keys]) return __TRANSLATIONS__[__LANGUAGE__][keys];
    }
}

function translatePage(onLoad) {
    const langData = localStorage.getItem('lang');
    if (!langData) {
        localStorage.setItem('lang', __LANGUAGE__);
        langData = __LANGUAGE__;
    }
    __LANGUAGE__ = langData;
    const elements = document.querySelectorAll('translatable');
    if (onLoad) {
        elements.forEach(element => {
            if (element.getAttribute('onload') != 'false') {
                element.innerHTML = getTranslation(element.getAttribute('variable'));
            }
        });
    } else {
        elements.forEach(element => element.innerHTML = getTranslation(element.getAttribute('variable')));
    }
}

window.onkeydown = (e) => {
    if (e.keyCode === 13) {
        toggleLang();
        console.log('Language changed to:', __LANGUAGE__);
    }
}