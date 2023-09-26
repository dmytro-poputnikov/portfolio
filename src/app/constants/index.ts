export const mobile = 'assets/mobile.png';
export const backend = 'assets/backend.png';
export const creator = 'assets/creator.png';
export const web = 'assets/web.png';
export const github = 'assets/github.png';

//tech
export const javascript = 'assets/tech/javascript.png';
export const typescript = 'assets/tech/typescript.png';
export const html = 'assets/tech/html.png';
export const css = 'assets/tech/css.png';
export const reactjs = 'assets/tech/reactjs.png';
export const redux = 'assets/tech/redux.png';
export const tailwind = 'assets/tech/tailwind.png';
export const nodejs = 'assets/tech/nodejs.png';
export const mongodb = 'assets/tech/mongodb.png';
export const git = 'assets/tech/git.png';
export const figma = 'assets/tech/figma.png';
export const docker = 'assets/tech/docker.png';
export const ngrx = 'assets/tech/ngrx.svg';
export const universal = 'assets/tech/universal.png';
export const threejs = 'assets/tech/threejs.svg';
export const ionic = 'assets/tech/ionic.png';
export const rxjs = 'assets/tech/rxjs.png';
export const net_core = 'assets/tech/NET_Core_Logo.png';
export const postgresql = 'assets/tech/postgresql.png';
export const angular = 'assets/tech/angular.svg';
//company
export const zeto = 'assets/company/zeto-logo-white.svg';
export const simplar = 'assets/company/simplar.png';

//projects
export const welding_robot = 'assets/projects/welding_robot.jpg';
export const publico = 'assets/projects/publico.jpg';
export const skinet = 'assets/projects/skinet.jpg';
export const gwo = 'assets/projects/gwo.jpg';
export const website = 'assets/website_external.png';

export const navLinks = [
  {
    id: 'about',
    title: 'About',
  },
  {
    id: 'work',
    title: 'Work',
  },
  {
    id: 'contact',
    title: 'Contact',
  },
];

const services = [
  {
    title: 'Angular Developer',
    icon: web,
  },
  {
    title: 'Ionic Developer',
    icon: mobile,
  },
  {
    title: 'Backend Developer',
    icon: backend,
  },
  {
    title: 'PLC Programmer',
    icon: creator,
  },
];

const technologies = [
  {
    name: 'HTML 5',
    icon: html,
  },
  {
    name: 'CSS 3',
    icon: css,
  },
  {
    name: 'Angular',
    icon: angular,
  },
  {
    name: 'JavaScript',
    icon: javascript,
  },
  {
    name: 'TypeScript',
    icon: typescript,
  },
  {
    name: 'RxJs',
    icon: rxjs,
  },
  {
    name: 'Ionic',
    icon: ionic,
  },
  {
    name: 'NgRx',
    icon: ngrx,
  },
  {
    name: 'Angular Universal',
    icon: universal,
  },
  {
    name: 'Tailwind CSS',
    icon: tailwind,
  },
  {
    name: 'Node JS',
    icon: nodejs,
  },
  {
    name: '.NET Core',
    icon: net_core,
  },
  {
    name: 'MongoDB',
    icon: mongodb,
  },
  {
    name: 'PostgreSQL',
    icon: postgresql,
  },
  {
    name: 'Three JS',
    icon: threejs,
  },
  {
    name: 'git',
    icon: git,
  },
  {
    name: 'figma',
    icon: figma,
  },
  {
    name: 'docker',
    icon: docker,
  },
];

const testimonials = [
  {
    testimonial:
      'I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.',
    name: 'Sara Lee',
    designation: 'CFO',
    company: 'Acme Co',
    image: 'https://randomuser.me/api/portraits/women/4.jpg',
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Rick does.",
    name: 'Chris Brown',
    designation: 'COO',
    company: 'DEF Corp',
    image: 'https://randomuser.me/api/portraits/men/5.jpg',
  },
  {
    testimonial:
      "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: 'Lisa Wang',
    designation: 'CTO',
    company: '456 Enterprises',
    image: 'https://randomuser.me/api/portraits/women/6.jpg',
  },
];

const projects = [
  {
    name: 'Welding Robot',
    description:
      'An application for remote control of a welding robot using a joystick and live transmission from a video camera.',
    tags: [
      {
        name: 'angular',
        color: 'blue-text-gradient',
      },
      {
        name: 'flask',
        color: 'green-text-gradient',
      },
      {
        name: 'material',
        color: 'pink-text-gradient',
      },
    ],
    image: welding_robot,
    website_link: 'http://areonindustries.com/',
  },
  {
    name: 'Publico',
    description:
      'Development and maintain an app for citizens to access official government data and communicate with office staff.',
    tags: [
      {
        name: 'angular',
        color: 'blue-text-gradient',
      },
      {
        name: 'ionic',
        color: 'green-text-gradient',
      },
      {
        name: 'java',
        color: 'pink-text-gradient',
      },
    ],
    image: publico,
    website_link: 'https://e-uslugi.skwierzyna.pl/',
  },
  {
    name: 'E-Commerce (Course)',
    description:
      'A learning oriented online store website built on the Angular framework and .NET Core.',
    tags: [
      {
        name: 'angular',
        color: 'blue-text-gradient',
      },
      {
        name: '.net',
        color: 'green-text-gradient',
      },
      {
        name: 'stripe',
        color: 'pink-text-gradient',
      },
      {
        name: 'bootstrap',
        color: 'orange-text-gradient',
      },
    ],
    image: skinet,
    source_code_link: 'https://github.com/dmytro-poputnikov/skinet',
    website_link: 'http://134.122.85.63/',
  },
  {
    name: 'Recruitment Task',
    description:
      'Presentation of Angular knowledge using the existing public restAPI and tailwind.',
    tags: [
      {
        name: 'angular',
        color: 'blue-text-gradient',
      },
      {
        name: 'tailwind',
        color: 'green-text-gradient',
      },
    ],
    image: gwo,
    source_code_link:
      'https://github.com/dmytro-poputnikov/gwo-restcountries-task',
    website_link: 'https://dmytro-poputnikov.github.io/gwo-restcountries-task/',
  },
];

export { services, technologies, testimonials, projects };
