const DISPLAY_SIZE = {
	x: 500,
	y: 500
}
const TILE_SIZE = 20;
const RADIUS = 10;

function draw_particle(display, x, y, radius, color) {
	display.beginPath();
	display.arc(x, y, radius, 0, 2 * Math.PI, true);

	display.fillStyle = color;
	display.fill();
}

function render(display, demension, particles) {
	display.clearRect(0, 0, DISPLAY_SIZE.x, DISPLAY_SIZE.y);

	for (let y = 0; y < demension; y++) {
		for (let x = 0; x < demension; x++) {
			if (particles[y][x] == true) {
				draw_particle(display, (x + 1) * TILE_SIZE, (y + 1) * TILE_SIZE, Math.round(TILE_SIZE / 4), '#00F0FF');
			}
			else {
				draw_particle(display, (x + 1) * TILE_SIZE, (y + 1) * TILE_SIZE, Math.round(TILE_SIZE / 4), '#FF0000');
			}
		}
	}
}

function simulate(display) {
	var demension = document.getElementById('particles_amount').value
	var particles_amount = demension * demension;
	const particles = [];

	for (let y = 0; y < demension; y++) {
		particles.push([]);
		for (let x = 0; x < demension; x++) {
			particles[y].push(true);
		}
	}

	function main_loop(counter) {
		for (let y = 0; y < demension; y++) {
			for (let x = 0; x < demension; x++) {
				if (particles[y][x] == true && Math.random() > 0.999) {
					particles[y][x] = false;
					draw_particle(display, (x + 1) * TILE_SIZE, (y + 1) * TILE_SIZE, RADIUS, '#FF0000');
					// render(display, demension, particles);
					counter++;
				}
			}
		}

		if (counter < particles_amount) {
			requestAnimationFrame(() => {
				main_loop(counter);
			});
		}
		else {
			return;
		}
	}

	main_loop(0);

}


function main() {
	var canva = document.getElementById('display');
	var display = canva.getContext('2d');

	document.getElementById('start').addEventListener('click', function (event) {
		event.preventDefault();
		simulate(display);
	});

	// document.getElementById('particles_amount').addEventListener('change', function (event) {
	//	 render(display);
	// });

}

main();
