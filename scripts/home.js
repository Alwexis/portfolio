/* Animated Text */
const __TEXTS__ = ['Software', 'Web', 'Full-Stack', 'Movil']
const __ANIMATED_TEXT__ = document.getElementById('who-am-i-txt');
let __TEXT_INDEX__ = 0;
function writingAnimationHandler() {
    let text = __TEXTS__[__TEXT_INDEX__];
    let i = 0;
    let timer = setInterval(() => {
        if (i < text.length) {
            __ANIMATED_TEXT__.innerText += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
            setTimeout(() => {
                let timer = setInterval(() => {
                    if (i > -1) {
                        __ANIMATED_TEXT__.innerText = text.substring(0, i);
                        i--;
                    } else {
                        __TEXT_INDEX__++;
                        if (__TEXT_INDEX__ >= __TEXTS__.length) __TEXT_INDEX__ = 0;
                        clearInterval(timer);
                        writingAnimationHandler();
                    }
                }, 100);
            }, 2000);
        }
    }, 100);
}

writingAnimationHandler();

//__BODY__.addEventListener('animationend', (e) => {
//    if (e.animationName === 'changePageTransition') {
//        if (__PAGE__ === __PAGES__[__ACTUAL_PAGE__]) __TRANSITION_SHADOW__.classList.remove('transitionEnd');
//    }
//});