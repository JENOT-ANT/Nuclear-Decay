const GLOBALS = {
	running: false,
	pause: false,
}
const DISPLAY_SIZE = {
	x: 500,
	y: 500
}
const TILE_SIZE = 20;
const RADIUS = 9;

function draw_particle(display, x, y, radius, color) {
	display.beginPath();
	display.arc(x, y, radius, 0, 2 * Math.PI, true);

	display.fillStyle = color;
	display.fill();
}

function render_material(display) {
	var demension = document.getElementById('demension').value
	display.clearRect(0, 0, DISPLAY_SIZE.x, DISPLAY_SIZE.y);

	for (let y = 0; y < demension; y++) {
		for (let x = 0; x < demension; x++) {
			draw_particle(display, (x + 1) * TILE_SIZE, (y + 1) * TILE_SIZE, RADIUS, '#00F0FF');
		}
	}
}

function simulate(display) {
	var demension = document.getElementById('demension').value
	var particles_amount = Math.pow(demension, 2);
	const particles = [];

	GLOBALS.running = true;
	document.getElementById('start').disabled = true;
	document.getElementById('demension').disabled = true;

	for (let y = 0; y < demension; y++) {
		particles.push([]);
		for (let x = 0; x < demension; x++) {
			particles[y].push(true);
		}
	}

	function main_loop(counter) {
		for (let y = 0; y < demension; y++) {
			for (let x = 0; x < demension; x++) {
				if (particles[y][x] == true && Math.random() > 0.99) {
					particles[y][x] = false;
					draw_particle(display, (x + 1) * TILE_SIZE, (y + 1) * TILE_SIZE, RADIUS, '#FF0000');
					counter++;
				}
			}
		}

		if (GLOBALS.pause == true) {
			// do nothing
		}
		else if (counter < particles_amount && GLOBALS.running == true) {
			requestAnimationFrame(() => {
				main_loop(counter);
			});
		}
		else {
			GLOBALS.running = false;
			document.getElementById('start').disabled = false;
			document.getElementById('demension').disabled = false;
			return;
		}
	}

	main_loop(0);

}


function main() {
	var canva = document.getElementById('display');
	var display = canva.getContext('2d');

	document.getElementById('particles_amount').value = Math.pow(document.getElementById('demension').value, 2);

	render_material(display);

	document.getElementById('start').addEventListener('click', function (event) {
		event.preventDefault();
		simulate(display);
	});
	
	document.getElementById('reset').addEventListener('click', function (event) {
		GLOBALS.running = false;
		setTimeout(render_material, 50, display);
	});

	document.getElementById('demension').addEventListener('change', function (event) {
		document.getElementById('particles_amount').value = Math.pow(document.getElementById('demension').value, 2);
		render_material(display);
	});

}

main();
