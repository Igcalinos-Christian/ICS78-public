

class Map{

  init(){
    var map = L.map('map').setView([8.359997, 124.868352], 17);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    //fetch map coords and data from json file
    fetch('map.json')
      .then(response => response.json())
      .then(jsonData => {

        // Add polygon to the map
        var polygon = L.polygon(jsonData[0].map_polygon_vertices, { color: 'green' })
              .addTo(map)
              .bindPopup(jsonData[0].map_name);

        // Add pins to the map
        jsonData[0].map_pins.forEach(function (pin) {
          L.marker([pin.pin_lat, pin.pin_long])
            .addTo(map)
            .addEventListener('click', () => {
              alert(pin.pin_name + "pressed!" + pin.pin_created_by);
            })
            // .bindPopup(pin.pin_name + '<br>Created by: ' + pin.pin_created_by);
        });
        map.fitBounds(marker.getBounds());
    })
  .catch(error => console.error('Error fetching JSON:', error));
  }

  clickhandler(){
    alert("pressed!");
  }
}

const MyMap = new Map();
MyMap.init();