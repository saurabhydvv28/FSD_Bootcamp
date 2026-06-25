export const initialRoadmaps = [
  { id: 'r1', name: 'Frontend Developer Path', goal: 'Master modern frontend' },
]

export const initialMilestones = [
  { id:'m1',  roadmap:'r1', name:'HTML & CSS Fundamentals',  desc:'Learn semantic HTML5 and modern CSS including flexbox, grid, and animations.',         cat:'frontend', status:'done',   dur:'3 weeks', progress:100, resources:'MDN,CSS-Tricks',            deps:[],                x:60,  y:80  },
  { id:'m2',  roadmap:'r1', name:'JavaScript Basics',        desc:'Variables, functions, DOM manipulation, events, and ES6+ syntax.',                       cat:'frontend', status:'done',   dur:'4 weeks', progress:100, resources:'javascript.info,Eloquent JS',  deps:['m1'],            x:320, y:80  },
  { id:'m3',  roadmap:'r1', name:'Version Control (Git)',    desc:'Git workflow, branches, merging, pull requests, and GitHub.',                             cat:'devops',   status:'done',   dur:'1 week',  progress:100, resources:'Pro Git,GitHub Docs',           deps:['m1'],            x:60,  y:300 },
  { id:'m4',  roadmap:'r1', name:'React Fundamentals',       desc:'Components, props, state, hooks, and the React ecosystem.',                               cat:'frontend', status:'done',   dur:'5 weeks', progress:100, resources:'React Docs,Scrimba',            deps:['m2'],            x:580, y:80  },
  { id:'m5',  roadmap:'r1', name:'TypeScript',               desc:'Type safety, interfaces, generics, and integrating with React.',                          cat:'frontend', status:'active', dur:'3 weeks', progress:55,  resources:'TS Handbook',                   deps:['m2'],            x:320, y:300 },
  { id:'m6',  roadmap:'r1', name:'State Management',         desc:'Redux Toolkit, Zustand, or Context API for complex state.',                               cat:'frontend', status:'active', dur:'2 weeks', progress:30,  resources:'Redux Docs,Zustand GitHub',     deps:['m4'],            x:580, y:300 },
  { id:'m7',  roadmap:'r1', name:'REST APIs & Fetch',        desc:'HTTP methods, Fetch API, Axios, and working with JSON data.',                             cat:'backend',  status:'todo',   dur:'2 weeks', progress:0,   resources:'MDN Fetch,Axios Docs',           deps:['m2'],            x:60,  y:520 },
  { id:'m8',  roadmap:'r1', name:'Testing (Jest & RTL)',     desc:'Unit tests, integration tests, and test-driven development.',                             cat:'cs',       status:'todo',   dur:'2 weeks', progress:0,   resources:'Jest Docs,Testing Library',     deps:['m4'],            x:840, y:300 },
  { id:'m9',  roadmap:'r1', name:'Performance Optimization', desc:'Lazy loading, code splitting, memoization, and Core Web Vitals.',                         cat:'frontend', status:'todo',   dur:'2 weeks', progress:0,   resources:'web.dev,Chrome DevTools',       deps:['m4','m6'],       x:840, y:80  },
  { id:'m10', roadmap:'r1', name:'CSS Architecture',         desc:'BEM, CSS Modules, styled-components, Tailwind CSS.',                                      cat:'frontend', status:'todo',   dur:'2 weeks', progress:0,   resources:'Tailwind Docs,styled-components',deps:['m1','m5'],       x:320, y:520 },
  { id:'m11', roadmap:'r1', name:'Build Tools',              desc:'Vite, Webpack, npm/yarn, and deployment pipelines.',                                       cat:'devops',   status:'todo',   dur:'1 week',  progress:0,   resources:'Vite Docs',                     deps:['m3','m4'],       x:580, y:520 },
  { id:'m12', roadmap:'r1', name:'Full Stack Integration',   desc:'Connect React app to a Node.js backend with auth and DB.',                                cat:'backend',  status:'todo',   dur:'4 weeks', progress:0,   resources:'Fullstack Open',                deps:['m6','m7','m11'], x:840, y:520 },
]

export const initialActivities = [
  { name:'Completed HTML & CSS Fundamentals', time:'2 days ago', color:'#22c55e' },
  { name:'Completed JavaScript Basics',       time:'1 week ago',  color:'#22c55e' },
  { name:'Started TypeScript',                time:'3 days ago',  color:'#f59e0b' },
  { name:'Completed Git Version Control',     time:'1 week ago',  color:'#22c55e' },
  { name:'Started State Management',          time:'Today',       color:'#f59e0b' },
]

export const CAT_LABELS = {
  frontend: 'Frontend', backend: 'Backend', devops: 'DevOps',
  cs: 'CS Fundamentals', ml: 'ML / AI', cloud: 'Cloud',
}

export const CAT_COLORS = {
  frontend:'#5b8dee', backend:'#2dd4bf', devops:'#f59e0b',
  cs:'#a78bfa', ml:'#22c55e', cloud:'#f472b6',
}

export const STATUS_LABELS = { todo: 'To Do', active: 'In Progress', done: 'Done' }
export const STATUS_CYCLE  = { todo: 'active', active: 'done', done: 'todo' }
