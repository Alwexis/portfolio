let __REPOSITORIES__ = [];

/*
(async () => {
  const response = await fetch('https://api.github.com/users/alwexis/repos');
  const data = await response.json();
  const parsedData = await data.map(async (repo) => {
    //* Template Header
    if (repo.topics.includes('portfolio-project')) {
      const name = repo.name;
      const stars = repo.stargazers_count;
      const watchers = repo.watchers_count;
      const commitsResult = await fetch(`https://api.github.com/repos/Alwexis/${name}/commits`);
      const commitsJson = await commitsResult.json();
      const commits = commitsJson.length;
      const branchesResult = await fetch(`https://api.github.com/repos/Alwexis/${name}/branches`);
      const branchesJson = await branchesResult.json();
      const branches = branchesJson.length;
      const forks = repo.forks_count;

      //* Template Body
      const repositoryContent = await fetch(`https://api.github.com/repos/Alwexis/${name}/contents`);
      const repositoryContentJson = await repositoryContent.json();
      let template;
      if (repositoryContentJson.find(e => e.name === 'HTML_Template') != null) {
        try {
          const templateResponse = await fetch(`https://raw.githubusercontent.com/Alwexis/${name}/main/HTML_Template/template.txt`);
          template = await templateResponse.text();
        } catch (error) {
          template = '';
        }
      }

      //* Template Footer
      // I'll store the languages as a JSON object bc i'll generate a tooltip of the percentage
      // of each language :p
      const languagesResult = await fetch(`https://api.github.com/repos/Alwexis/${name}/languages`);
      const languages = await languagesResult.json();

      return {
        name: name,
        stars: stars,
        watchers: watchers,
        commits: commits,
        branches: branches,
        forks: forks,
        languages: languages,
        template: template,
      }
    }
  });
  parsedData.forEach(async (repo) => {
    const repoData = await repo;
    if (repoData) {
      __REPOSITORIES__.push(repoData);
    }
  });
})();
*/


//! Swiper Instances
const project_Swiper = new Swiper('.project-container', {
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 1,
  loop: true,
  autoplay: {
    delay: 5000,
  },
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    dynamicBullets: true,
  },
  on: {
    reachBeginning: function (e) {
      let delay = 0;
      //* Header
      e.slides[e.activeIndex].querySelector('.project-header .project-title')
        .style = `animation-name: appearFromLeft; animation-duration: 0.5s; animation-fill-mode: forwards; animation-timing-function: ease-in-out;`;
      
      e.slides[e.activeIndex].querySelectorAll('.project-header .project-info-container .project-info-item').forEach((element) => {
        element.style = `animation-name: appearFromLeft; animation-duration: 0.5s; animation-delay: ${delay}s; animation-fill-mode: forwards; animation-timing-function: ease-in-out;`
        delay += 0.1;
      });
      //* Body
      if (e.slides[e.activeIndex].querySelector('.project-body .no-template-error')) {
        e.slides[e.activeIndex].querySelector('.project-body .no-template-error')
          .style = `animation-name: appearFromBottom; animation-duration: 0.5s; animation-fill-mode: forwards; animation-timing-function: ease-in-out;`
      }
      //* Footer
      delay = 0;
      e.slides[e.activeIndex].querySelectorAll('.footer-item').forEach((element) => {
        element.style = `animation-name: appearFromLeft; animation-duration: 0.5s; animation-delay: ${delay}s; animation-fill-mode: forwards; animation-timing-function: ease-in-out;`
        delay += 0.15;
      });
      //* Init
      changeStatus();
    },
    slideChange: function (e) {
      let delay = 0;
      //* Header
      e.slides[e.activeIndex].querySelector('.project-header .project-title')
        .style = `animation-name: appearFromLeft; animation-duration: 0.5s; animation-fill-mode: forwards; animation-timing-function: ease-in-out;`;

      e.slides[e.previousIndex].querySelector('.project-header .project-title')
        .style = `animation-name: none; opacity: 0; translateX(-50px);`;

      e.slides[e.activeIndex].querySelectorAll('.project-header .project-info-container .project-info-item').forEach((element) => {
        element.style = `animation-name: appearFromLeft; animation-duration: 0.5s; animation-delay: ${delay}s; animation-fill-mode: forwards; animation-timing-function: ease-in-out;`
        delay += 0.1;
      });
      e.slides[e.previousIndex].querySelectorAll('.project-header .project-info-container .project-info-item').forEach((element) => {
        element.style = `animation-name: none; opacity: 0; translateX(-50px);`
      });
      //* Body
      if (e.slides[e.activeIndex].querySelector('.project-body .no-template-error')) {
        e.slides[e.activeIndex].querySelector('.project-body .no-template-error')
          .style = `animation-name: appearFromBottom; animation-duration: 0.5s; animation-fill-mode: forwards; animation-timing-function: ease-in-out;`
      }
      if (e.slides[e.previousIndex].querySelector('.project-body .no-template-error')) {
        e.slides[e.previousIndex].querySelector('.project-body .no-template-error')
          .style = `animation-name: none; opacity: 0; translateY(50px);`
      }
      //* Footer
      delay = 0;
      e.slides[e.activeIndex].querySelectorAll('.footer-item').forEach((element) => {
        element.style = `animation-name: appearFromLeft; animation-duration: 0.5s; animation-delay: ${delay}s; animation-fill-mode: forwards; animation-timing-function: ease-in-out;`
        delay += 0.15;
      });
      e.slides[e.previousIndex].querySelectorAll('.footer-item').forEach((element) => {
        element.style = `animation-name: none; opacity: 0; translateX(-50px);`
      });
    },
  },
});

/*
const thumbnails_Swiper = new Swiper('.thumbnails-container', {
  grabCursor: true,
  loop: true,
  autoplay: {
    delay: 2000,
  },
  pagination: {
    el: ".swiper-pagination",
    dynamicBullets: true,
  },
});
*/

//! End of Swiper Instances

async function init() {
  let projects = document.querySelector('.swiper.project-container .swiper-wrapper');
  const response = await fetch('https://api.github.com/users/alwexis/repos');
  let data = await response.json();
  data = data.filter((repo) => repo.topics.includes('portfolio-project'));
  await data.forEach(async (repo) => {
    //* Template Header
      const name = repo.name;
      const stars = repo.stargazers_count;
      const watchers = repo.watchers_count;
      const commitsResult = await fetch(`https://api.github.com/repos/Alwexis/${name}/commits`);
      const commitsJson = await commitsResult.json();
      const commits = commitsJson.length;
      const branchesResult = await fetch(`https://api.github.com/repos/Alwexis/${name}/branches`);
      const branchesJson = await branchesResult.json();
      const branches = branchesJson.length;
      const forks = repo.forks_count;

      //* Template Body
      const repositoryContent = await fetch(`https://api.github.com/repos/Alwexis/${name}/contents`);
      const repositoryContentJson = await repositoryContent.json();
      let template;
      if (repositoryContentJson.find(e => e.name === 'HTML_Template') != null) {
        try {
          const templateResponse = await fetch(`https://raw.githubusercontent.com/Alwexis/${name}/main/HTML_Template/template.txt`);
          template = await templateResponse.text();
        } catch (error) {
          template = '';
        }
      }

      //* Template Footer
      // I'll store the languages as a JSON object bc i'll generate a tooltip of the percentage
      // of each language :p
      const languagesResult = await fetch(`https://api.github.com/repos/Alwexis/${name}/languages`);
      const languages = await languagesResult.json();

      const repository = {
        name: name,
        stars: stars,
        watchers: watchers,
        commits: commits,
        branches: branches,
        forks: forks,
        languages: languages,
        template: template,
        url: repo.html_url,
      }

      let project = document.createElement('div');
      project.classList.add('project');
      project.classList.add('swiper-slide');

      let header = createHeader(repository);
      //let body = repository.template;
      let body = document.createElement('section');
      body.classList.add('project-body');
      console.log(repository.template)
      if (repository.template === null || repository.template === undefined || repository.template === '') {
        body.innerHTML = `
          <p class="no-template-error">
            <img src="./assets/media/images/oh oh.png">
            Uh oh... There is no template for this project yet.
          </p>`;
      } else {
        body.innerHTML = repository.template;
      }
      let footer = createFooter(repository);

      project.appendChild(header);
      project.appendChild(body);
      project.appendChild(footer);

      projects.appendChild(project);
  });
}

init();

function createHeader(repository) {
  /*
    ! Header Template
    * <section class="project-header">
    *   <span class="project-title"></span>
    *   <div class="project-info-container">
    *     <div class="project-info-item">
    *       <img src="./assets/media/icons/star.svg">
    *       <span></span>
    *     </div>
    *     <div class="project-info-item">
    *         <img src="./assets/media/icons/watch.svg">
    *         <span></span>
    *     </div>
    *     <div class="project-info-item">
    *         <img src="./assets/media/icons/commits.svg">
    *         <span></span>
    *     </div>
    *     <div class="project-info-item">
    *         <img src="./assets/media/icons/branch.svg">
    *         <span></span>
    *     </div>
    *     <div class="project-info-item">
    *         <img src="./assets/media/icons/fork.svg">
    *         <span></span>
    *     </div>
    *   </div>
    * </section>
  */
  const project_header = document.createElement('section');
  project_header.classList.add('project-header');
  const project_title = document.createElement('a');
  let newTitle = repository.name.replace('-', ' ').replace('_', ' ');
  while (newTitle.includes('-') || newTitle.includes('_')) {
    newTitle = newTitle.replace('-', ' ').replace('_', ' ');
  }
  project_title.classList.add('project-title');
  project_title.textContent = newTitle;
  project_title.setAttribute('href', repository.url);
  project_title.setAttribute('target', '_blank');
  project_title.innerHTML += `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
      <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
    </svg>
  `
  project_header.appendChild(project_title);
  //* Project Info Container
  const project_info_container = document.createElement('div');
  project_info_container.classList.add('project-info-container');
  //* Stars
  const project_stars = document.createElement('div');
  project_stars.classList.add('project-info-item');
  const project_stars_icon = document.createElement('svg');
  project_stars_icon.innerHTML = `
    <svg class="octicon octicon-star d-inline-block mr-2" aria-hidden="true" data-view-component="true" version="1.1" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z" fill-rule="evenodd"/>
    </svg>
  `
  //project_stars_icon.src = './assets/media/icons/star.svg';
  project_stars.appendChild(project_stars_icon);
  const project_stars_value = document.createElement('span');
  project_stars_value.textContent = repository.stars;
  project_stars.appendChild(project_stars_value);
  project_info_container.appendChild(project_stars);
  //* Watchers
  const project_watchers = document.createElement('div');
  project_watchers.classList.add('project-info-item');
  const project_watchers_icon = document.createElement('svg');
  project_watchers_icon.innerHTML = `
    <svg class="octicon octicon-eye" aria-hidden="true" data-view-component="true" version="1.1" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.679 7.932c.412-.621 1.242-1.75 2.366-2.717C5.175 4.242 6.527 3.5 8 3.5c1.473 0 2.824.742 3.955 1.715 1.124.967 1.954 2.096 2.366 2.717a.119.119 0 010 .136c-.412.621-1.242 1.75-2.366 2.717C10.825 11.758 9.473 12.5 8 12.5c-1.473 0-2.824-.742-3.955-1.715C2.92 9.818 2.09 8.69 1.679 8.068a.119.119 0 010-.136zM8 2c-1.981 0-3.67.992-4.933 2.078C1.797 5.169.88 6.423.43 7.1a1.619 1.619 0 000 1.798c.45.678 1.367 1.932 2.637 3.024C4.329 13.008 6.019 14 8 14c1.981 0 3.67-.992 4.933-2.078 1.27-1.091 2.187-2.345 2.637-3.023a1.619 1.619 0 000-1.798c-.45-.678-1.367-1.932-2.637-3.023C11.671 2.992 9.981 2 8 2zm0 8a2 2 0 100-4 2 2 0 000 4z" fill-rule="evenodd"/>
    </svg>
  `
  //project_watchers_icon.src = './assets/media/icons/watch.svg';
  project_watchers.appendChild(project_watchers_icon);
  const project_watchers_value = document.createElement('span');
  project_watchers_value.textContent = repository.watchers;
  project_watchers.appendChild(project_watchers_value);
  project_info_container.appendChild(project_watchers);
  //* Commits
  const project_commits = document.createElement('div');
  project_commits.classList.add('project-info-item');
  const project_commits_icon = document.createElement('svg');
  project_commits_icon.innerHTML = `
    <svg class="octicon octicon-history" aria-hidden="true" data-view-component="true" text="gray" version="1.1" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.643 3.143L.427 1.927A.25.25 0 000 2.104V5.75c0 .138.112.25.25.25h3.646a.25.25 0 00.177-.427L2.715 4.215a6.5 6.5 0 11-1.18 4.458.75.75 0 10-1.493.154 8.001 8.001 0 101.6-5.684zM7.75 4a.75.75 0 01.75.75v2.992l2.028.812a.75.75 0 01-.557 1.392l-2.5-1A.75.75 0 017 8.25v-3.5A.75.75 0 017.75 4z" fill-rule="evenodd"/>
    </svg>
  `
  //project_commits_icon.src = './assets/media/icons/commits.svg';
  project_commits.appendChild(project_commits_icon);
  const project_commits_value = document.createElement('span');
  project_commits_value.textContent = repository.commits;
  project_commits.appendChild(project_commits_value);
  project_info_container.appendChild(project_commits);
  //* Branches
  const project_branches = document.createElement('div');
  project_branches.classList.add('project-info-item');
  const project_branches_icon = document.createElement('svg');
  project_branches_icon.innerHTML = `
    <svg class="octicon octicon-git-branch" aria-hidden="true" data-view-component="true" text="gray" version="1.1" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122V6A2.5 2.5 0 0110 8.5H6a1 1 0 00-1 1v1.128a2.251 2.251 0 11-1.5 0V5.372a2.25 2.25 0 111.5 0v1.836A2.492 2.492 0 016 7h4a1 1 0 001-1v-.628A2.25 2.25 0 019.5 3.25zM4.25 12a.75.75 0 100 1.5.75.75 0 000-1.5zM3.5 3.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0z" fill-rule="evenodd"/>
    </svg>
  `
  // project_branches_icon.src = './assets/media/icons/branch.svg';
  project_branches.appendChild(project_branches_icon);
  const project_branches_value = document.createElement('span');
  project_branches_value.textContent = repository.branches;
  project_branches.appendChild(project_branches_value);
  project_info_container.appendChild(project_branches);
  //* Forks
  const project_forks = document.createElement('div');
  project_forks.classList.add('project-info-item');
  const project_forks_icon = document.createElement('svg');
  project_forks_icon.innerHTML = `
    <svg class="octicon octicon-repo-forked mr-2" aria-hidden="true" data-view-component="true" version="1.1" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z" fill-rule="evenodd"/>
    </svg>
  `
  // project_forks_icon.src = './assets/media/icons/fork.svg';
  project_forks.appendChild(project_forks_icon);
  const project_forks_value = document.createElement('span');
  project_forks_value.textContent = repository.forks;
  project_forks.appendChild(project_forks_value);
  project_info_container.appendChild(project_forks);

  project_header.appendChild(project_info_container);
  return project_header;
}

function createFooter(repository) {
  /*
    ! Footer Template
    *<section class="project-footer">
    *  <div class="project-footer-item">
    *    <span class="project-footer-item-title" content="languages"></span>
    *    <div class="project-footer-item-content">
    *      <span template="languages" class="project-footer-item-content-item"></span>
    *    </div>
    *  </div>
    *</section>
  */
  const project_footer = document.createElement('section');
  project_footer.classList.add('project-footer');
  //* Languages
  Object.keys(repository.languages).forEach((language) => {
    let language_item = document.createElement('span');
    language_item.classList.add('footer-item');
    language_item.textContent = language;
    project_footer.appendChild(language_item);
  });
  return project_footer;
}

let __LOADING_REPOSITORIES__ = true;

function changeStatus() {
  if (__LOADING_REPOSITORIES__) {
    __LOADING_REPOSITORIES__ = false;
    document.querySelector('.loader').style.display = 'none';
    document.querySelector('.project-container').style.display = 'initial';
  } else {
    __LOADING_REPOSITORIES__ = true;
    document.querySelector('.loader').style.display = 'initial';
    document.querySelector('.project-container').style.display = 'none';
  }
}