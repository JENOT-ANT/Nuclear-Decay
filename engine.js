const DISPLAY_SIZE = {
	x: 500,
	y: 500
}

const TILE_SIZE = 50;


function draw_particle(display, x, y, radius, color)
{
	display.beginPath();
	display.arc(x, y, radius, 0, 2 * Math.PI, true);
	
	display.fillStyle = color;
	display.fill();
}

function render(display, particles)
{

}

function simulate(event, display)
{
	event.preventDefault();

	var demension = document.getElementById('particles_amount').value
	const particles = [];
	var particles_amount = Math.pow(demension, demension);
	var counter = 0;

	for (let y = 0; y < demension; y++)
	{
		particles.push([])

		for (let x = 0; x < demension; x++)
		{
			particles[y].push(true);
		}
	}

	console.log(particles)
	
	// while (counter < particles_amount)
	// {
		
	// }
}

function main()
{
	var canva = document.getElementById('display');
	var display = canva.getContext('2d');
	
	document.getElementById('start').addEventListener('click', simulate, [display, ]);

}

main();
