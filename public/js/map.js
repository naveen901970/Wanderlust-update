
	mapboxgl.accessToken = maptoken;
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style:"mapbox://styles/mapbox/streets-v12",
        center: newlist1.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90

        zoom: 9 // starting zoom
    });


//  console.log(coordinates)

 const marker=new mapboxgl.Marker({color:"red"})
 .setLngLat(newlist1.geometry.coordinates) 
 .setPopup(new mapboxgl.Popup({offset: 25})
 .setHTML(`${newlist1.location}}<p>Exact location will be provided after booking</p>`))
 .addTo(map);

   