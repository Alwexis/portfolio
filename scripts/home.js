let __WIDTH__ = document.documentElement.clientWidth //window.innerWidth;
let __HEIGHT__ = document.documentElement.clientHeight //window.innerHeight;
const __BACKGROUND__ = document.getElementById('background');

window.onload = () => {
    document.querySelector('body').style.width = __WIDTH__ + 'px';
    document.querySelector('body').style.height = __HEIGHT__ + 'px';
    writingAnimationHandler();
}

window.onresize = () => {
    __WIDTH__ = document.documentElement.clientWidth //window.innerWidth;
    __HEIGHT__ = document.documentElement.clientHeight //window.innerHeight;
    document.querySelector('body').style.width = __WIDTH__ + 'px';
    document.querySelector('body').style.height = __HEIGHT__ + 'px';
}

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