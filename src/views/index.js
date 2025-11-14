// demo/src/views/index.js - Modern Enhanced Version
export const views = {
	404: {
		templateId: 'view-404',
		templateUrl: './src/views/404.html',
		onMount(root) {
			// Enhanced parallax & interaction setup
			const section = root.querySelector('section');
			const parallaxLayers = root.querySelectorAll('.parallax-layer');
			const coordDisplay = root.querySelector('#coordinates');
			const aliensAnchor = root.querySelector('.aliens-anchor');
			const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

			if (!section) return;

			// Multi-layer parallax system
			if (!prefersReduced && parallaxLayers.length) {
				const handleMove = (e) => {
					const { innerWidth, innerHeight } = window;
					const rx = (e.clientX / innerWidth - 0.5);
					const ry = (e.clientY / innerHeight - 0.5);

					parallaxLayers.forEach(layer => {
						const speed = parseFloat(layer.dataset.speed) || 0.5;
						const x = rx * speed * 100;
						const y = ry * speed * 80;
						layer.style.transform = `translate3d(${x}px, ${y}px, 0)`;
					});

					// Update coordinate display
					if (coordDisplay) {
						const coordX = Math.round(e.clientX);
						const coordY = Math.round(e.clientY);
						coordDisplay.textContent = `X: ${coordX} Y: ${coordY}`;
					}
				};

				const handleLeave = () => {
					parallaxLayers.forEach(layer => {
						layer.style.transform = '';
					});
				};

				window.addEventListener('pointermove', handleMove);
				section.addEventListener('mouseleave', handleLeave);

				// Cleanup
				root.addEventListener('unmount', () => {
					window.removeEventListener('pointermove', handleMove);
					section.removeEventListener('mouseleave', handleLeave);
				});
			}

			// Aliens explosion on click
			const explode = () => {
				if (!aliensAnchor || aliensAnchor.dataset.exploded === '1') return;
				aliensAnchor.dataset.exploded = '1';
				aliensAnchor.classList.add('exploded');

				const rect = aliensAnchor.getBoundingClientRect();
				const cx = rect.left + rect.width * 0.5;
				const cy = rect.top + rect.height * 0.65;

				// Shockwave
				const wave = document.createElement('div');
				wave.className = 'shockwave';
				wave.style.setProperty('--x0', cx + 'px');
				wave.style.setProperty('--y0', cy + 'px');
				document.body.appendChild(wave);
				setTimeout(() => wave.remove(), 800);

				// Particles (bigger & more)
				const count = 50;
				for (let i = 0; i < count; i++) {
					const p = document.createElement('div');
					p.className = 'particle';
					const angle = Math.random() * Math.PI * 2;
					const dist = 220 + Math.random() * 260;
					const dx = Math.cos(angle) * dist;
					const dy = Math.sin(angle) * dist;
					const dur = 950 + Math.random() * 750;
					p.style.setProperty('--x0', cx + 'px');
					p.style.setProperty('--y0', cy + 'px');
					p.style.setProperty('--tx', dx + 'px');
					p.style.setProperty('--ty', dy + 'px');
					p.style.setProperty('--dur', dur + 'ms');
					document.body.appendChild(p);
					setTimeout(() => p.remove(), dur + 50);
				}

				// Respawn after 3 seconds
				setTimeout(() => {
					aliensAnchor.classList.remove('exploded');
					aliensAnchor.dataset.exploded = '0';
				}, 3000);
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
					const dx = 250 + Math.random() * 200;
					const dy = 280 + Math.random() * 180;
					el.style.setProperty('--sx', sx + 'px');
					el.style.setProperty('--sy', sy + 'px');
					el.style.setProperty('--dx', dx + 'px');
					el.style.setProperty('--dy', dy + 'px');
					el.style.animation = 'starFly 1.5s ease-out forwards';
					document.body.appendChild(el);
					setTimeout(() => el.remove(), 1600);
				};
				const starTimer = setInterval(spawnStar, 5000);
				root.addEventListener('unmount', () => clearInterval(starTimer));
			}
		}
	},
};
