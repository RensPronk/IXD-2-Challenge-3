

mapboxgl.accessToken = 'pk.eyJ1IjoicmVuc3Byb25rIiwiYSI6ImNrOHp0YWx2dzFrc2IzaHM3aHB2dmNwcHoifQ._6TFivpXT2bIr3a3-pOUsQ'; //Token to use the mapbox api

		
		async function ISSlocation() { //make the function to fetch the data from the api URL
			const ISSurl = 'https://api.wheretheiss.at/v1/satellites/25544'; //create a const from the api URL
			const response = await fetch(ISSurl);
			const data = await response.json();
			const { latitude, longitude, altitude, velocity, visibility } = data; // It will fetch the following values from the API

	var map = new mapboxgl.Map({ //create the mapbox map
		container: 'map',
		style: 'mapbox://styles/mapbox/streets-v11',
		center: [latitude, longitude], // startin position off the map. Due to the API being unstable it won't always let you see the Lat and Long so choose one of them and give the other one a value.
		zoom: 2 //zoomlevel off the map.
	});
 
	map.on('load', function() { //make an onload function where everytime it loads it will generate an image as an icon on the map.
		map.loadImage(
			'https://i0.wp.com/freepngimages.com/wp-content/uploads/2015/12/international-space-station-transparent-background.png?fit=817%2C325',

			function(error, image) {
				if (error) throw error;
				map.addImage('ISS', image);
				map.addSource('point', {
					'type': 'geojson',
					'data': {
						'type': 'FeatureCollection',
						'features': [
							{
								'type': 'Feature',
								'geometry': {
									'type': 'Point',
									'coordinates': [latitude, longitude] // the position of the image will be the exact position off the ISS. It will fetch the Lat and Long everytime the page loads.
								}
							}
						]
					}
				});


				map.addLayer({
				'id': 'points',
				'type': 'symbol',
				'source': 'point',
				'layout': {
					'icon-image': 'ISS',
					'icon-size': 0.20
				}
			});
		}
	);
});

		// map.setView([latitude,longitude], 1);
		document.getElementById('lat').textContent = latitude.toFixed(2); //These are the data it will display on the page rounded up to 2 decimals.
		document.getElementById('lon').textContent = longitude.toFixed(2);
		document.getElementById('alt').textContent = altitude.toFixed(2);
		document.getElementById('vel').textContent = velocity.toFixed(2);
		document.getElementById('vis').textContent = visibility;

		console.log(data.latitude); //it will write the data to the console for troubleshooting.
		console.log(data.longitude);
		console.log(data.altitude);
		console.log(data.velocity);
		console.log(data.visibility);
	}




	ISSlocation(); //Function that will fetch the Location off the ISS from the API
	setInterval(ISSlocation, 10000); //The page will update every 10 seconds.
