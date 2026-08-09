// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-research",
          title: "research",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/research/";
          },
        },{id: "nav-cv",
          title: "cv",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "nav-data",
          title: "data",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/data/";
          },
        },{id: "nav-labor",
          title: "labor",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/labor/";
          },
        },{id: "projects-afl-cio-legislative-scoreboards",
          title: 'AFL-CIO Legislative Scoreboards',
          description: "U.S. House · 1980–2025",
          section: "Projects",handler: () => {
              window.location.href = "/projects/afl_cio_scoreboards/";
            },},{id: "projects-spanish-constitutional-court-amparo-dataset",
          title: 'Spanish Constitutional Court Amparo Dataset',
          description: "Spain · 1980–2025 · 7,434 rulings",
          section: "Projects",handler: () => {
              window.location.href = "/projects/constitutional_court/";
            },},{
        id: 'social-cv',
        title: 'CV',
        section: 'Socials',
        handler: () => {
          window.open("/assets/pdf/cv.pdf", "_blank");
        },
      },{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%70%69%32%31%30%30@%6E%79%75.%65%64%75", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/nicolas-izquierdo", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/nicolás-izquierdo-martinez", "_blank");
        },
      },{
        id: 'social-orcid',
        title: 'ORCID',
        section: 'Socials',
        handler: () => {
          window.open("https://orcid.org/0009-0005-8016-1588", "_blank");
        },
      },];
