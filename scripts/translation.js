let __LANGUAGE__ = localStorage.getItem('language') || 'ES';

const __TRANSLATIONS__ = {
  "ES": {
    "navbar": {
      "about_me": "Sobre mi",
      "projects": "Proyectos",
      "experience": "Experiencia"
    },
    "about_me": [
      "Hola, soy Ariel Silva, un estudiante de 21 años y un gran apasionado a los videojuegos, mangas y a toda forma de tecnología, sobretodo la que tenga que ver con la programación e internet de las cosas.",
      "Actualmente estoy estudiando en Duoc UC desde el año 2021, en la carrera de Ingeniería en Informática y me encuentro en mi 5to semestre.",
      "Mis intereses profesionales están enfocados en el desarrollo de aplicaciones web, de videojuegos y de aplicaciones móviles híbridas. También estoy bastante interesado en todo lo relacionado con Inteligencia Artificial y Machine Learning."
    ],
    "stack": {
      "title": "Mis tecnologías",
      "languages": "Lenguajes",
      "frameworks": "Frameworks",
      "databases": "Bases de Datos",
      "tools": "Herramientas"
    },
    "experience": {
      "title": "Experiencia",
      "experiences": [
        {
          "date": "Sept. 2021 - Dic. 2021",
          "company": "DuocUC",
          "jobtitle": "Profesor de Ayudantías en Python",
          "description": "Trabajé durante unos meses como profesor de clases de ayudantía en la asignatura de programación de Algoritmos y Estructuras de Datos en Python, en la cual enseñé a los alumnos las bases de la programación, tanto su estructura como su lógica, y también las bases de Python.",
          "activities": [
            "Enseñé bases de la programación.",
            "Enseñé Python para la resolución de problemas.",
            "Enseñé a utilizar librerías (Numpy)."
          ],
          "skills": "Habilidades Empleadas",
          "skills_list": [
            "Python",
            "Numpy",
            "Visual Studio Code"
          ]
        },
        {
          "date": "Ener. 2023 - Actualidad",
          "company": "CETECOM",
          "jobtitle": "Mantención general de Equipos Tecnológicos",
          "description": "Me encuentro actualmente realizando mi práctica laboral en CETECOM. Me desempeño como técnico de mantención de equipos tecnológicos, en la cual me encargo de realizar la mantención de los equipos de la 'empresa', tanto de hardware como de software, además de realizar atención cliente ya sea de forma presencial o telefónica.",
          "activities": [
            "Realicé mantenimiento a PCs & Notebooks/Macbooks. A nivel software y hardware.",
            "Realicé tareas de configuración de Equipos.",
            "Realicé tareas de atención al Cliente."
          ],
          "skills": "Habilidades Empleadas",
          "skills_list": [
            "Sistemas Operativos",
            "Hardware",
            "Software"
          ]
        }
      ]
    },
    "achievements": {
      "title": "Logros/Reconocimientos",
      "achievements": [
        {
          "date": "29 de Noviembre",
          "name": "ExpoCitt",
          "company": "CITT - DuocUC",
          "podium": "1° Lugar - Categoría Asignatura",
          "description": "Junto con mis compañeros de equipo participamos en la ExpoCITT del año 2021. La problemática trataba sobre la poca participación de los alumnos en votaciones en DuocUC. Nuestra solución y propuesta fue la de desarrollar una aplicación web y móvil cuyo proposito era participar en votaciones desde un lugar más cómodo para el usuario, además de pronunciar e incentivar la participación a este tipo de eventos."
        }
      ]
    }
  },
  "EN": {
    "navbar": {
      "about_me": "About me",
      "projects": "Projects",
      "experience": "Experience"
    },
    "about_me": [
      "Hello, I'm Ariel Silva, a 21-year-old student and a big fan of video games, manga, and all forms of technology, especially those related to programming and the Internet of Things.",
      "Currently, I'm studying at Duoc UC since 2021 in the Computer Engineering program and I am in my 5th semester.",
      "My professional interests are focused on the development of web applications, video games, and hybrid mobile applications. I'm also quite interested in everything related to Artificial Intelligence and Machine Learning."
    ],
    "stack": {
      "title": "My Stack",
      "languages": "Languages",
      "frameworks": "Frameworks",
      "databases": "Databases",
      "tools": "Tools"
    },
    "experience": {
      "title": "Experience",
      "experiences": [
        {
          "date": "Sept. 2021 - Dec. 2021",
          "company": "DuocUC",
          "jobtitle": "Python Tutor",
          "description": "I worked for a few months as a teaching assistant in the subject of Algorithms and Data Structures Programming in Python, in which I taught the students the basics of programming, both its structure and logic, and also the basics of Python.",
          "activities": [
            "I taught basics of programming.",
            "I taught python for problem solving.",
            "I taught how to use libraries (Numpy)."
          ],
          "skills": "Empleated Skills",
          "skills_list": [
            "Python",
            "Numpy",
            "Visual Studio Code"
          ]
        },
        {
          "date": "Ener. 2023 - Present",
          "company": "CETECOM",
          "jobtitle": "Technical Service",
          "description": "I am currently doing my 'work practice' at CETECOM. I work as a technical maintenance of technological equipment, in which I am responsible for maintaining the company's equipment, both hardware and software, as well as providing customer service either in person or by phone.",
          "activities": [
            "I performed maintenance on PCs and Notebooks/Macbooks. At software and hardware level.",
            "I carried out configuration tasks of technological equipment.",
            "I did customer service tasks."
          ],
          "skills": "Empleated Skills",
          "skills_list": [
            "OS",
            "Hardware",
            "Software"
          ]
        }
      ]
    },
    "achievements": {
      "title": "Achievements",
      "achievements": [
        {
          "date": "November 29th",
          "name": "ExpoCitt",
          "company": "CITT - DuocUC",
          "podium": "1st Place - Subject Category",
          "description": "Together with my teammates we participated in the ExpoCITT of the year 2021. The problem was about the low participation of DuocUC students in voting. Our solution and proposal was to develop a web and mobile application whose purpose was to participate in voting from a more comfortable place for the user (from home, for example), in addition to pronouncing and encouraging participation in this type of event."
        }
      ]
    }
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
  if (!keys) return;
  let splittedKeys = keys.split('.');
  if (splittedKeys.length > 0) {
    lastKey = __TRANSLATIONS__[__LANGUAGE__];
    if (!lastKey) return;
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
        element.classList.add('beingTranslated');
        element.addEventListener('animationend', (e) => {
          if (e.animationName === 'translatedComponent') element.classList.remove('beingTranslated');
        })
        setTimeout(() => {
          element.innerHTML = getTranslation(element.getAttribute('variable'));
        }, 100)
      }
    });
  } else {
    elements.forEach(element => {
      element.classList.add('beingTranslated');
      element.addEventListener('animationend', (e) => {
        if (e.animationName === 'translatedComponent') element.classList.remove('beingTranslated');
      })
      setTimeout(() => {
        element.innerHTML = getTranslation(element.getAttribute('variable'))
      }, 100)
    });
  }
}

window.onkeydown = (e) => {
  if (e.keyCode === 13) {
    toggleLang();
    console.log('Language changed to:', __LANGUAGE__);
  }
}