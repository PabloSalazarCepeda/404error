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
                // Aliens anchor must be available for both parallax and click logic
                const aliensAnchor = root.querySelector('.aliens-anchor');
                // Read base Y offset from CSS so JS parallax keeps them on the rim
                const rootStyles = getComputedStyle(document.documentElement);
                const baseOffset = parseFloat(rootStyles.getPropertyValue('--aliens-offset')) || 12;
			if (!section) return;
				if (!prefersReduced && starfield) {
				const fog = root.querySelector('.space-fog');
				const planetGlow = root.querySelector('.planet-glow');
				const sign = root.querySelector('.sign-panel');
				const handleMove = (e) => {
					const { innerWidth, innerHeight } = window;
					const rx = (e.clientX / innerWidth - 0.5);
					const ry = (e.clientY / innerHeight - 0.5);
					// Stronger, multi-layer parallax
					starfield.style.transform = `translate3d(${rx * 40}px, ${ry * 28}px,0)`;
					if (fog) fog.style.transform = `translate3d(${rx * 24}px, ${ry * 16}px,0)`;
					if (planetGlow) planetGlow.style.transform = `translate3d(${rx * 10}px, ${ry * 6}px,0)`;
					if (sign) sign.style.transform = `translate3d(${rx * -8}px, ${ry * -6}px,0)`;
					if (aliensAnchor) aliensAnchor.style.transform = `translate3d(${rx * -6}px, ${baseOffset + ry * -4}px,0)`;
				};
				// Listen on window so parallax continues even over the fixed footer/planet
				window.addEventListener('pointermove', handleMove);
				section.addEventListener('mouseleave', () => {
					starfield.style.transform = '';
					if (fog) fog.style.transform = '';
					if (planetGlow) planetGlow.style.transform = '';
					if (sign) sign.style.transform = '';
					if (aliensAnchor) aliensAnchor.style.transform = `translateY(${baseOffset}px)`;
				});
				// Best-effort cleanup when view is swapped
				root.addEventListener('unmount', () => window.removeEventListener('pointermove', handleMove));
			}

			// Explode aliens on click
			const explode = () => {
				if (!aliensAnchor || aliensAnchor.dataset.exploded === '1') return;
				aliensAnchor.dataset.exploded = '1';
				aliensAnchor.classList.add('exploded');
				const img = aliensAnchor.querySelector('img');
				const rect = aliensAnchor.getBoundingClientRect();
				const cx = rect.left + rect.width * 0.5;
				const cy = rect.top + rect.height * 0.7; // a bit towards the feet
				// Shockwave
				const wave = document.createElement('div');
				wave.className = 'shockwave';
				wave.style.setProperty('--x0', cx + 'px');
				wave.style.setProperty('--y0', cy + 'px');
				document.body.appendChild(wave);
				setTimeout(() => wave.remove(), 800);

				// Particles (bigger & more)
				const count = 44;
				for (let i = 0; i < count; i++) {
					const p = document.createElement('div');
					p.className = 'particle';
					const angle = Math.random() * Math.PI * 2;
					const dist = 200 + Math.random() * 240;
					const dx = Math.cos(angle) * dist;
					const dy = Math.sin(angle) * dist;
					const dur = 900 + Math.random() * 700;
					p.style.setProperty('--x0', cx + 'px');
					p.style.setProperty('--y0', cy + 'px');
					p.style.setProperty('--tx', dx + 'px');
					p.style.setProperty('--ty', dy + 'px');
					p.style.setProperty('--dur', dur + 'ms');
					document.body.appendChild(p);
					setTimeout(() => p.remove(), dur + 50);
				}

				// After explosion, keep anchor but disable pointer
				if (img) img.style.pointerEvents = 'none';
			};
			if (aliensAnchor) {
				aliensAnchor.addEventListener('click', explode);
				root.addEventListener('unmount', () => aliensAnchor.removeEventListener('click', explode));
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