const DISPLAY_SIZE = {
	x: 500,
	y: 500
}


function draw_particle(display, x, y, radius, color)
{
	display.beginPath();
	display.arc(x, y, radius, 0, 2 * Math.PI, true);
	
	display.fillStyle = color;
	display.fill();
}

function simulate()
{
	var demension = document.getElementById('particles_amount').value
	var particles_amount = Math.pow(demension, demension);
	var counter = 0;
	const particles = [];

	for (let y = 0; y < demension; y++)
	{
		particles.push([])
		for (let x = 0; x < demension; x++)
		{
			
		}
	}

	while (counter < particles_amount)
	{
		
	}
}

function main()
{
	var canva = document.getElementById('display');
	var display = canva.getContext('2d');


}

main();
