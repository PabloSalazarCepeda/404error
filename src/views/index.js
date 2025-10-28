// demo/src/views/index.js
import home from './home.js';
import about from './sobre.js';
import projects from './proyectos.js';
import contact from './contacto.js';
import notFound from './404.js';
import component from './componentes.js';
import layouts from './tipografia.js';

export const views = {
	'/': { templateId: 'view-home', component: home },
	'/about': { templateId: 'view-about', component: about },
	'/projects': { templateId: 'view-projects', component: projects },
	'/contact': { templateId: 'view-contact', component: contact },
	404: { templateId: 'view-404', component: notFound },
	'/components': { templateId: 'view-components', component: component },
	'/layouts': { templateId: 'view-layouts', component: layouts },
};