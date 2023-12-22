const GLOBALS = {
	running: false,
	pause: false
}
const DISPLAY_SIZE = {
	x: 500,
	y: 500
}
const DIAGRAM_SIZE = {
	x: 400,
	y: 300
}
const DIAGRAM_MARGIN = {
	x: 1,
	y: 1
}
const COLORS = {
	// active: 'rgb(114, 233, 200)',
	active: 'rgb(81, 213, 157)',
	decayed: 'rgb(95, 138, 140)',
}

const TILE_SIZE = 20;
const RADIUS = Math.round(TILE_SIZE / 2) - 2;

function draw_particle(display, x, y, radius, color) {
	display.beginPath();
	display.arc(x, y, radius, 0, 2 * Math.PI, true);

	display.fillStyle = color;
	display.fill();
}

function reset(display, diagram) {
	var demension = document.getElementById('demension').value
	display.clearRect(0, 0, DISPLAY_SIZE.x, DISPLAY_SIZE.y);
	diagram.clearRect(0, 0, DISPLAY_SIZE.x, DISPLAY_SIZE.y);

	for (let y = 0; y < demension; y++) {
		for (let x = 0; x < demension; x++) {
			draw_particle(display, (x + 1) * TILE_SIZE, (y + 1) * TILE_SIZE, RADIUS, COLORS.active);
		}
	}
}

function simulate(display, diagram) {
	var demension = document.getElementById('demension').value
	var particles_amount = Math.pow(demension, 2);
	var diagram_scale = (DIAGRAM_SIZE.y - DIAGRAM_MARGIN.y) * 0.75 / (particles_amount);
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

	function main_loop(decay_counter, time_counter) {
		for (let y = 0; y < demension; y++) {
			for (let x = 0; x < demension; x++) {
				if (particles[y][x] == true && Math.random() < 0.001) {
					particles[y][x] = false;
					draw_particle(display, (x + 1) * TILE_SIZE, (y + 1) * TILE_SIZE, RADIUS, COLORS.decayed);
					decay_counter++;
				}
			}
		}
		if (time_counter % 8 == 0) {
			let x = Math.round(time_counter / 8) + DIAGRAM_MARGIN.x;
			let y = Math.round(DIAGRAM_SIZE.y - DIAGRAM_MARGIN.y) - Math.round((particles_amount - decay_counter) * diagram_scale);
			
			diagram.fillRect(x, y, 2, 2);
		}
		
		if (decay_counter < particles_amount && GLOBALS.running == true) {
			
			requestAnimationFrame(() => {
				main_loop(decay_counter, time_counter + 1);
			});
		}
		else {
			GLOBALS.running = false;
			document.getElementById('start').disabled = false;
			document.getElementById('demension').disabled = false;
			return;
		}
	}

	main_loop(0, 0);

}


function main() {
	var canva = document.getElementById('display');
	var display = canva.getContext('2d');
	var diagram = document.getElementById('diagram').getContext('2d');

	document.getElementById('particles_amount').value = Math.pow(document.getElementById('demension').value, 2);

	reset(display, diagram);

	document.getElementById('start').addEventListener('click', function (event) {
		event.preventDefault();
		simulate(display, diagram);
	});
	
	document.getElementById('reset').addEventListener('click', function (event) {
		GLOBALS.running = false;
		setTimeout(reset, 50, display, diagram);
	});

	document.getElementById('demension').addEventListener('change', function (event) {
		document.getElementById('particles_amount').value = Math.pow(document.getElementById('demension').value, 2);
		reset(display, diagram);
	});

}

main();
