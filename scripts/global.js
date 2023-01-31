const __BODY__ = document.querySelector('body');
const __TRANSITION_SHADOW__ = document.querySelector('#transition-shadow');
let __PAGE__ = '';
let __ACTUAL_SCROLLING__ = 0;
let __LAST_SCROLLING__ = 0;
let __ACTUAL_PAGE__ = 0;
let __CHANGING_PAGE__ = true;
const __PAGES__ = [
    'index',
    'about',
    'stack',
    'projects',
    'experience'
];

/* Page Transition */
function changePage(page, confirm) {
    __PAGE__ = page;
    __TRANSITION_SHADOW__.classList.toggle('transition');
    if (confirm) {
        restartInterval();
        __CHANGING_PAGE__ = true;
        window.location.replace('./' + page + '.html');
    }
}

/* Setup & Restart the wheel transition */
let wheelInterval = undefined;
function setupInterval() {
    wheelInterval = setInterval(() => {
        if (__CHANGING_PAGE__) {
            restartInterval();
        }
        if (__ACTUAL_SCROLLING__ > __LAST_SCROLLING__) {
            restartInterval();
            return;
        }
        __LAST_SCROLLING__ = __ACTUAL_SCROLLING__;
    }, 1000);
}

function restartInterval() {
    clearInterval(wheelInterval);
    __LAST_SCROLLING__ = 0;
    __ACTUAL_SCROLLING__ = 0;
}

window.onwheel = (e) => {
    if (__CHANGING_PAGE__) return;
    if (__ACTUAL_PAGE__ === 0 && e.deltaY < 0) return;
    if (__ACTUAL_PAGE__ === __PAGES__.length - 1 && e.deltaY > 0) return;
    setupInterval();
    __ACTUAL_SCROLLING__ += e.deltaY;
    if (__ACTUAL_SCROLLING__ >= 450) {
        if (__ACTUAL_PAGE__ < __PAGES__.length - 1) {
            __CHANGING_PAGE__ = true;
            __ACTUAL_SCROLLING__ = 0;
            __ACTUAL_PAGE__++;
            changePage(__PAGES__[__ACTUAL_PAGE__], false);
        }
    } else if (__ACTUAL_SCROLLING__ <= -450) {
        if (__ACTUAL_PAGE__ > 0) {
            __CHANGING_PAGE__ = true;
            __ACTUAL_SCROLLING__ = 0;
            __ACTUAL_PAGE__--;
            changePage(__PAGES__[__ACTUAL_PAGE__], false);
        }
    }
}

__BODY__.addEventListener('animationstart', (e) => {
    if (e.animationName === 'changePageTransition') {
        if (__PAGE__ === '') return;
        setTimeout(() => {
            changePage(__PAGE__, true);
        }, 200)
    }
});

__BODY__.ontouchstart = (e) => {
    __BODY__.setAttribute('firstYTouchLocation', e.touches[0].clientY)
}

__BODY__.ontouchend = (e) => {
    if (__CHANGING_PAGE__) return;
    const firstYTouchLocation = Math.round(__BODY__.getAttribute('firstYTouchLocation'));
    const currentYTouchLocation = Math.round(e.changedTouches[0].clientY);
    /*
    * If the touch first location is greater than the last one, that means that the user is going up,
    * otherwise, the user is going down. 
    */
    if (Math.abs(firstYTouchLocation - currentYTouchLocation) > 150) {
        if (firstYTouchLocation > currentYTouchLocation) {
            if (__ACTUAL_PAGE__ < __PAGES__.length - 1) {
                __ACTUAL_PAGE__++;
                changePage(__PAGES__[__ACTUAL_PAGE__], false);
            }
        } else {
            if (__ACTUAL_PAGE__ > 0) {
                __ACTUAL_PAGE__--;
                changePage(__PAGES__[__ACTUAL_PAGE__], false);
            }
        }
    }
    __BODY__.setAttribute('firstYTouchLocation', 0);
}

__BODY__.onmousedown = (e) => {
    __BODY__.setAttribute('firstYClickLocation', e.clientY)
}

__BODY__.onmouseup = (e) => {
    if (__CHANGING_PAGE__) return;
    const firstYClickLocation = Math.round(__BODY__.getAttribute('firstYClickLocation'));
    const currentYClickLocation = Math.round(e.clientY);
    /*
    * If the click first location is greater than the last one, that means that the user is going up,
    * otherwise, the user is going down. 
    */
    if (Math.abs(firstYClickLocation - currentYClickLocation) > 200) {
        if (firstYClickLocation > currentYClickLocation) {
            if (__ACTUAL_PAGE__ < __PAGES__.length - 1) {
                __ACTUAL_PAGE__++;
                changePage(__PAGES__[__ACTUAL_PAGE__], false);
            }
        } else {
            if (__ACTUAL_PAGE__ > 0) {
                __ACTUAL_PAGE__--;
                changePage(__PAGES__[__ACTUAL_PAGE__], false);
            }
        }
    }
    __BODY__.setAttribute('firstYClickLocation', 0);
}

/* Page Size & Transition Handler */
let __WIDTH__ = document.documentElement.clientWidth //window.innerWidth;
let __HEIGHT__ = document.documentElement.clientHeight //window.innerHeight;
__BODY__.onload = () => {
    __ACTUAL_SCROLLING__ = 0;
    document.querySelector('body').style.width = __WIDTH__ + 'px';
    document.querySelector('body').style.height = __HEIGHT__ + 'px';
    let page = window.location.pathname.split('/').pop().split('.')[0];
    __ACTUAL_PAGE__ = __PAGES__.indexOf(page);
    __BODY__.addEventListener('animationend', (e) => {
        if (e.animationName === 'changePageTransition') {
            if (__TRANSITION_SHADOW__.classList.contains('transitionEnd') || __PAGE__ === __PAGES__[__ACTUAL_PAGE__]) {
                __TRANSITION_SHADOW__.classList.remove('transitionEnd');
                __CHANGING_PAGE__ = false;
            }
        }
    });

    /* Translations */
    translatePage(true);
}

window.onresize = () => {
    __WIDTH__ = document.documentElement.clientWidth;
    __HEIGHT__ = document.documentElement.clientHeight;
    document.querySelector('body').style.width = __WIDTH__ + 'px';
    document.querySelector('body').style.height = __HEIGHT__ + 'px';
}