// demo/src/views/index.js
export const views = {
	404: {
		templateId: 'view-404',
		templateUrl: './src/views/404.html',
		onMount(root) {
			// Parallax & interaction setup for 404 scene
			const section = root.querySelector('section');
			const starfield = root.querySelector('.starfield');
			const btns = root.querySelectorAll('.btn-primary, .btn-secondary');
			const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
			if (!section) return;
			if (!prefersReduced && starfield) {
				section.addEventListener('pointermove', (e) => {
					const { innerWidth, innerHeight } = window;
					const rx = (e.clientX / innerWidth - 0.5);
					const ry = (e.clientY / innerHeight - 0.5);
					starfield.style.transform = `translate3d(${rx * 12}px, ${ry * 8}px,0)`;
				});
				section.addEventListener('mouseleave', () => { starfield.style.transform = ''; });
			}

			// Shooting stars
			if (!prefersReduced) {
				const spawnStar = () => {
					const el = document.createElement('div');
					el.className = 'shooting-star';
					const sx = Math.random() * window.innerWidth * 0.8;
					const sy = Math.random() * window.innerHeight * 0.3;
					const dx = 220 + Math.random() * 180;
					const dy = 260 + Math.random() * 160;
					el.style.setProperty('--sx', sx + 'px');
					el.style.setProperty('--sy', sy + 'px');
					el.style.setProperty('--dx', dx + 'px');
					el.style.setProperty('--dy', dy + 'px');
					document.body.appendChild(el);
					setTimeout(() => el.remove(), 1600);
				};
				const starTimer = setInterval(spawnStar, 4500);
				root.addEventListener('unmount', () => clearInterval(starTimer));
			}
			// Button ripple origin based on pointer position
			btns.forEach(btn => {
				btn.addEventListener('pointermove', (e) => {
					const rect = btn.getBoundingClientRect();
					btn.style.setProperty('--x', `${e.clientX - rect.left}px`);
					btn.style.setProperty('--y', `${e.clientY - rect.top}px`);
				});
			});
		}
	},
};