let __ACTUAL_SLIDE__ = 0;
let __CHANGING_SLIDE__ = false;
if (__BODY__) {
    //* Desktop
    __BODY__.addEventListener('mousedown', (e) => {
        __BODY__.setAttribute('firstXClickLocation', e.clientX)
    })

    __BODY__.addEventListener('mouseup', (e) => {
        if (__CHANGING_PAGE__ || __CHANGING_SLIDE__) return;
        const firstXClickLocation = Math.round(__BODY__.getAttribute('firstXClickLocation'));
        const currentXClickLocation = Math.round(e.clientX);
        if (Math.abs(firstXClickLocation - currentXClickLocation) > 200) {
            if (firstXClickLocation > currentXClickLocation) {
                if (__ACTUAL_SLIDE__ === 0) {
                    __CHANGING_SLIDE__ = true;
                    __ACTUAL_SLIDE__ = 1;
                    __TRANSITION_SHADOW__.classList.add('slideTransition');
                    setTimeout(() => {
                        document.querySelector('about-me').style.display = 'none';
                        document.querySelector('stack').style.display = 'flex';
                    }, 600)
                    __BODY__.addEventListener('animationend', (e) => {
                        if (e.animationName === 'slideTransition') {
                            if (__TRANSITION_SHADOW__.classList.contains('slideTransition')) {
                                __TRANSITION_SHADOW__.classList.remove('slideTransition');
                                __CHANGING_SLIDE__ = false;
                            }
                        }
                    })
                }
            } else {
                if (__ACTUAL_SLIDE__ === 1) {
                    __CHANGING_SLIDE__ = true;
                    __ACTUAL_SLIDE__ = 0;
                    __TRANSITION_SHADOW__.classList.add('slideTransitionBack');
                    setTimeout(() => {
                        document.querySelector('about-me').style.display = 'flex';
                        document.querySelector('stack').style.display = 'none';
                    }, 600)
                    __BODY__.addEventListener('animationend', (e) => {
                        if (e.animationName === 'slideTransition') {
                            if (__TRANSITION_SHADOW__.classList.contains('slideTransitionBack')) {
                                __TRANSITION_SHADOW__.classList.remove('slideTransitionBack');
                                __CHANGING_SLIDE__ = false;
                            }
                        }
                    })
                }
            }
        }
        __BODY__.setAttribute('firstXClickLocation', 0);
    });

    //* Mobile
    __BODY__.addEventListener('touchstart', (e) => {
        __BODY__.setAttribute('firstXTouchLocation', e.touches[0].clientX)
        __BODY__.setAttribute('firstXTouchTime', Math.round(e.timeStamp))
    });

    __BODY__.addEventListener('touchend', (e) => {
        if (__CHANGING_PAGE__ || __CHANGING_SLIDE__ || __SCROLLING__) return;
        const firstTouchLocationTimestamp = Math.round(__BODY__.getAttribute('firstXTouchTime'));
        const currentTouchLocationTimestamp = Math.round(e.timeStamp);
        const differenceBetweenTimestamps = Math.abs(firstTouchLocationTimestamp - currentTouchLocationTimestamp);
        if (differenceBetweenTimestamps < 50 || differenceBetweenTimestamps > 400) return;

        let firstXTouchLocation = Math.round(__BODY__.getAttribute('firstXTouchLocation'));
        let currentXTouchLocation = Math.round(e.changedTouches[0].clientX);
        if (Math.abs(firstXTouchLocation - currentXTouchLocation) > 100) {
            if (firstXTouchLocation > currentXTouchLocation && !__CHANGING_SLIDE__) {
                if (__ACTUAL_SLIDE__ === 0) {
                    __CHANGING_SLIDE__ = true;
                    __ACTUAL_SLIDE__ = 1;
                    __TRANSITION_SHADOW__.classList.add('slideTransition');
                    setTimeout(() => {
                        document.querySelector('about-me').style.display = 'none';
                        document.querySelector('stack').style.display = 'flex';
                    }, 600)
                    __BODY__.addEventListener('animationend', (e) => {
                        if (e.animationName === 'slideTransition') {
                            if (__TRANSITION_SHADOW__.classList.contains('slideTransition')) {
                                __TRANSITION_SHADOW__.classList.remove('slideTransition');
                                __CHANGING_SLIDE__ = false;
                            }
                        }
                    })
                }
            } else if (firstXTouchLocation < currentXTouchLocation && !__CHANGING_SLIDE__) {
                if (__ACTUAL_SLIDE__ === 1) {
                    __CHANGING_SLIDE__ = true;
                    __ACTUAL_SLIDE__ = 0;
                    __TRANSITION_SHADOW__.classList.add('slideTransitionBack');
                    setTimeout(() => {
                        document.querySelector('about-me').style.display = 'flex';
                        document.querySelector('stack').style.display = 'none';
                    }, 600)
                    __BODY__.addEventListener('animationend', (e) => {
                        if (e.animationName === 'slideTransition') {
                            if (__TRANSITION_SHADOW__.classList.contains('slideTransitionBack')) {
                                __TRANSITION_SHADOW__.classList.remove('slideTransitionBack');
                                __CHANGING_SLIDE__ = false;
                            }
                        }
                    })
                }
            }
        }
        firstXTouchLocation = 0;
        currentXTouchLocation = 0;
    });
}