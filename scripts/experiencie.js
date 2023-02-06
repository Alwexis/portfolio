let __ACTUAL_EXP__ = 1;
const __EXPERIENCES__ = {
    1: {
        id: 0,
        title: 'experience.experiences.0.jobtitle',
        company: 'experience.experiences.0.company',
        date: 'experience.experiences.0.date',
        description: 'experience.experiences.0.description',
        activities: 'experience.experiences.0.activities',
        skills: 'experience.experiences.0.skills',
        skills_list: 'experience.experiences.0.skills_list',
        link: 'https://www.duoc.cl',
    },
}

window.addEventListener('load', () => {
    const jobTitle = document.querySelector('.experience-text .experience-text-header .header-jobtitle');
    jobTitle.setAttribute('variable', __EXPERIENCES__[__ACTUAL_EXP__].title);
    const company = document.querySelector('.experience-text .experience-text-header .header-company');
    company.setAttribute('href', __EXPERIENCES__[__ACTUAL_EXP__].link);
    company.querySelector('translatable').setAttribute('variable', __EXPERIENCES__[__ACTUAL_EXP__].company);
    const date = document.querySelector('.experience-text .experience-text-header .header-date');
    date.setAttribute('variable', __EXPERIENCES__[__ACTUAL_EXP__].date);
    const description = document.querySelector('.experience-text .experience-text-content .content-description');
    description.setAttribute('variable', __EXPERIENCES__[__ACTUAL_EXP__].description);
    const activities = document.querySelector('.experience-text .experience-text-content .content-activities');
    let activitiesList = __TRANSLATIONS__[__LANGUAGE__].experience.experiences[__EXPERIENCES__[__ACTUAL_EXP__].id].activities;
    activitiesList.forEach((activity, index) => {
        let activityContainer = document.createElement('div');
        activityContainer.classList.add('content-activity');
        let activityIcon = document.createElement('i');
        activityIcon.classList.add('bi', 'bi-caret-right-fill');
        let activityText = document.createElement('translatable');
        activityText.setAttribute('variable', `experience.experiences.${__EXPERIENCES__[__ACTUAL_EXP__].id}.activities.${index}`);
        activityContainer.appendChild(activityIcon);
        activityContainer.appendChild(activityText);
        activities.appendChild(activityContainer);
    });
    translatePage(false);
});

/*
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
*/

//* Slide
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
                        document.querySelector('experience').style.display = 'none';
                        document.querySelector('achievements').style.display = 'flex';
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
                        document.querySelector('experience').style.display = 'flex';
                        document.querySelector('achievements').style.display = 'none';
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
                        document.querySelector('experience').style.display = 'none';
                        document.querySelector('achievements').style.display = 'flex';
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
                        document.querySelector('experience').style.display = 'flex';
                        document.querySelector('achievements').style.display = 'none';
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