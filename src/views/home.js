// src/views/home.js
export default {
	// Nota: Esto usa una cadena de plantilla de JavaScript (backticks) para construir HTML.
	// Para una comprensión más profunda de las opciones de renderizado del DOM, seguridad e historia,
	// ver la lección: /web-atelier-udit/lessons/es/js-dom-manipulation/
	template: `
   <section class="py-16">
     <div class="container mx-auto px-4 text-center">
       <h1 class="text-5xl font-bold text-gray-900 mb-6">Bienvenido</h1>
       <p class="text-xl text-gray-600 mb-8">Esta es la página de inicio de nuestra SPA.</p>
       <a href="#/about" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg transition-colors">
         Conoce Más Sobre Nosotros
       </a>
     </div>
   </section>
 `,
};