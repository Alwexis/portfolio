const swiper = new Swiper('.swiper', {
    effect: 'creative',
    creativeEffect: {
      prev: {
        shadow: true,
        translate: ["-120%", 0, -500],
      },
      next: {
        shadow: true,
        translate: ["120%", 0, -500],
      },
    },
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    //loop: true,
    autoplay: {
        delay: 5000,
    },
});

const __MAIN_COMPONENT__ = document.querySelector('experience');

//* Desktop
__MAIN_COMPONENT__.addEventListener('mousedown', (e) => {
    if (e.target.classList.toString().includes('swiper', 'slider')) return;
    __MAIN_COMPONENT__.setAttribute('ExperiencefirstYClickLocation', e.clientX)
})

__MAIN_COMPONENT__.addEventListener('mouseup', (e) => {
    if (__CHANGING_PAGE__) return;
    const firstYClickLocation = Math.round(__MAIN_COMPONENT__.getAttribute('ExperiencefirstYClickLocation'));
    const currentYClickLocation = Math.round(e.clientX);
    /*
    * If the click first location is greater than the last one, that means that the user is going up,
    * otherwise, the user is going down. 
    */
    if (Math.abs(firstYClickLocation - currentYClickLocation) > 200) {
        if (firstYClickLocation > currentYClickLocation) {
            console.log('next');
        } else {
            console.log('prev');
        }
    }
    __MAIN_COMPONENT__.setAttribute('ExperiencefirstYClickLocation', 0);
});

//* Mobile
__MAIN_COMPONENT__.addEventListener('touchstart', (e) => {
    if (e.target.classList.toString().includes('swiper', 'slider')) return;
    __MAIN_COMPONENT__.setAttribute('ExperiencefirstYTouchLocation', e.touches[0].clientX)
    __MAIN_COMPONENT__.setAttribute('ExperiencefirstTouchLocationTimestamp', Math.round(e.timeStamp))
});

__MAIN_COMPONENT__.addEventListener('touchend', (e) => {
    if (__CHANGING_PAGE__) return;
    const firstTouchLocationTimestamp = Math.round(__MAIN_COMPONENT__.getAttribute('ExperiencefirstTouchLocationTimestamp'));
    const currentTouchLocationTimestamp = Math.round(e.timeStamp);
    const differenceBetweenTimestamps = Math.abs(firstTouchLocationTimestamp - currentTouchLocationTimestamp);
    if (differenceBetweenTimestamps < 50 || differenceBetweenTimestamps > 400) return;

    const firstYTouchLocation = Math.round(__MAIN_COMPONENT__.getAttribute('ExperiencefirstYTouchLocation'));
    const currentYTouchLocation = Math.round(e.changedTouches[0].clientX);
    /*
    * If the touch first location is greater than the last one, that means that the user is going up,
    * otherwise, the user is going down. 
    */
    if (Math.abs(firstYTouchLocation - currentYTouchLocation) > 150) {
        if (firstYTouchLocation > currentYTouchLocation) {
            console.log('next');
        } else {
            console.log('prev');
        }
    }
    __MAIN_COMPONENT__.setAttribute('ExperiencefirstYTouchLocation', 0);
});