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
    2: {
        id: 1,
        title: 'experience.experiences.1.jobtitle',
        company: 'experience.experiences.1.company',
        date: 'experience.experiences.1.date',
        description: 'experience.experiences.1.description',
        activities: 'experience.experiences.1.activities',
        skills: 'experience.experiences.1.skills',
        skills_list: 'experience.experiences.1.skills_list',
        link: 'https://www.duoc.cl',
    },
}
let __ACTUAL_ACHIEVEMENT__ = 1;
const __ACHIEVEMENTS__ = {
    1: {
        id: 0,
        title: 'achievements.achievements.0.title',
        date: 'achievements.achievements.0.date',
        name: 'achievements.achievements.0.name',
        company: 'achievements.achievements.0.company',
        podium: 'achievements.achievements.0.podium',
        description: 'achievements.achievements.0.description',
        link: 'https://www.youtube.com/watch?v=AllzeFxwHUA&t=3677s',
    }
}

document.querySelector('.experience-text-content').addEventListener('scroll', () => {
    __SCROLLING__ = true;
});

window.addEventListener('load', () => {
    rewriteElements('experience');
});

function changeExperience(id) {
    const actualSelected = document.querySelector('.experience-option.active');
    // Just 2 equal signs because the experienceId is managed as a string
    if (id == actualSelected.getAttribute('experienceId')) return;
    __ACTUAL_EXP__ = id;
    actualSelected.classList.remove('active');
    const newSelected = document.querySelector(`.experience-option[experienceId="${id}"]`);
    newSelected.classList.add('active');
    rewriteElements('experience');
}

function changeAchievement(id) {
    const actualSelected = document.querySelector('.achievement-option.active');
    if (id == actualSelected.getAttribute('achievementId')) return;
    __ACTUAL_ACHIEVEMENT__ = id;
    actualSelected.classList.remove('active');
    const newSelected = document.querySelector(`.achievement-option[achievementId="${id}"]`);
    newSelected.classList.add('active');
    rewriteElements('achievement');
}

function rewriteElements(type) {
    // Just in case, we'll remove all the activities and skills from the DOM
    const activities = document.querySelector('.experience-text .experience-text-content .content-activities');
    activities.innerHTML = '';
    const skills = document.querySelector('.experience-text .experience-text-footer .footer-skills');
    skills.innerHTML = '';
    if (type == 'achievement') {
        const achievementName = document.querySelector(`.achievement-text .achievement-text-header .header-name`);
        achievementName.setAttribute('variable', __ACHIEVEMENTS__[__ACTUAL_ACHIEVEMENT__].name);
        const achievementDate = document.querySelector(`.achievement-text .achievement-text-header .header-subtitle .header-date`);
        achievementDate.setAttribute('variable', __ACHIEVEMENTS__[__ACTUAL_ACHIEVEMENT__].date);
        const achievementCompany = document.querySelector(`.achievement-text .achievement-text-header .header-company`);
        achievementCompany.setAttribute('href', __ACHIEVEMENTS__[__ACTUAL_ACHIEVEMENT__].link);
        achievementCompany.querySelector('translatable').setAttribute('variable', __ACHIEVEMENTS__[__ACTUAL_ACHIEVEMENT__].company);
        const achievementPodium = document.querySelector(`.achievement-text .achievement-text-header .header-podium`);
        achievementPodium.setAttribute('variable', __ACHIEVEMENTS__[__ACTUAL_ACHIEVEMENT__].podium);
        const achievementDescription = document.querySelector(`.achievement-text .achievement-text-content .content-description`);
        achievementDescription.setAttribute('variable', __ACHIEVEMENTS__[__ACTUAL_ACHIEVEMENT__].description);
    } else if (type == 'experience') {
        const jobTitle = document.querySelector(`.experience-text .experience-text-header .header-jobtitle`);
        jobTitle.setAttribute('variable', __EXPERIENCES__[__ACTUAL_EXP__].title);
        const company = document.querySelector(`.experience-text .experience-text-header .header-company`);
        company.setAttribute('href', __EXPERIENCES__[__ACTUAL_EXP__].link);
        company.querySelector('translatable').setAttribute('variable', __EXPERIENCES__[__ACTUAL_EXP__].company);
        const date = document.querySelector(`.experience-text .experience-text-header .header-date`);
        date.setAttribute('variable', __EXPERIENCES__[__ACTUAL_EXP__].date);
        const description = document.querySelector(`.experience-text .experience-text-content .content-description`);
        description.setAttribute('variable', __EXPERIENCES__[__ACTUAL_EXP__].description);
        let activitiesList = __TRANSLATIONS__[__LANGUAGE__].experience.experiences[__EXPERIENCES__[__ACTUAL_EXP__].id].activities;
        let delay = 0;
        activitiesList.forEach((activity, index) => {
            delay += 0.2;
            let activityContainer = document.createElement('div');
            activityContainer.classList.add('content-activity');
            activityContainer.style = `animation-name: appearFromLeft; animation-duration: 0.5s; animation-delay: ${delay}s; animation-fill-mode: forwards; animation-timing-function: ease-in-out;`
            let activityIcon = document.createElement('i');
            activityIcon.classList.add('bi', 'bi-caret-right-fill');
            let activityText = document.createElement('translatable');
            activityText.setAttribute('variable', `experience.experiences.${__EXPERIENCES__[__ACTUAL_EXP__].id}.activities.${index}`);
            activityContainer.appendChild(activityIcon);
            activityContainer.appendChild(activityText);
            activities.appendChild(activityContainer);
        });
        const skillsTitle = document.querySelector('.experience-text .experience-text-footer .footer-skills-title');
        skillsTitle.setAttribute('variable', __EXPERIENCES__[__ACTUAL_EXP__].skills);
        let skillsList = __TRANSLATIONS__[__LANGUAGE__].experience.experiences[__EXPERIENCES__[__ACTUAL_EXP__].id].skills_list;
        delay = 0;
        skillsList.forEach((skill, index) => {
            delay += 0.2;
            let skillContainer = document.createElement('div');
            skillContainer.classList.add('footer-skills-skill');
            skillContainer.style = `animation-name: appearFromLeft; animation-duration: 0.5s; animation-delay: ${delay}s; animation-fill-mode: forwards; animation-timing-function: ease-in-out;`
            let skillText = document.createElement('span');
            skillText.innerText = skill;
            skillContainer.appendChild(skillText);
            skills.appendChild(skillContainer);
        });
    }
    translatePage(false);
}

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
                        _onSlideChange();
                        document.querySelector('achievements').style.display = 'flex';
                    }, 600)
                    __BODY__.addEventListener('animationend', (e) => {
                        if (e.animationName === 'slideTransition') {
                            if (__TRANSITION_SHADOW__.classList.contains('slideTransition')) {
                                __TRANSITION_SHADOW__.classList.remove('slideTransition');
                                //_onSlideChange();
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
                        _onSlideChange();
                        document.querySelector('achievements').style.display = 'none';
                    }, 600)
                    __BODY__.addEventListener('animationend', (e) => {
                        if (e.animationName === 'slideTransition') {
                            if (__TRANSITION_SHADOW__.classList.contains('slideTransitionBack')) {
                                __TRANSITION_SHADOW__.classList.remove('slideTransitionBack');
                                //_onSlideChange();
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
                        _onSlideChange();
                        document.querySelector('achievements').style.display = 'flex';
                    }, 600)
                    __BODY__.addEventListener('animationend', (e) => {
                        if (e.animationName === 'slideTransition') {
                            if (__TRANSITION_SHADOW__.classList.contains('slideTransition')) {
                                __TRANSITION_SHADOW__.classList.remove('slideTransition');
                                //_onSlideChange();
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
                        _onSlideChange();
                        document.querySelector('achievements').style.display = 'none';
                    }, 600)
                    __BODY__.addEventListener('animationend', (e) => {
                        if (e.animationName === 'slideTransition') {
                            if (__TRANSITION_SHADOW__.classList.contains('slideTransitionBack')) {
                                __TRANSITION_SHADOW__.classList.remove('slideTransitionBack');
                                //_onSlideChange();
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

function _onSlideChange() {
    if (__ACTUAL_SLIDE__ === 0) {
        document.querySelector('.swipe-to-see.experience').style.display = 'initial';
        rewriteElements('experience');
        document.querySelector('.swipe-to-see.achievements').style.display = 'none';
    } else {
        document.querySelector('.swipe-to-see.experience').style.display = 'none';
        rewriteElements('achievement');
        document.querySelector('.swipe-to-see.achievements').style.display = 'initial';
    }
}