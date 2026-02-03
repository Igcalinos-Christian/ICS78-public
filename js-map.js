var map = L.map('map').setView([8.359997, 124.868352], 17); //reference variable for the methods in "Map".

class Map{

  init(){
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    this.Mpoly('map.json');
    this.Mpins('map.json');
  }

  Mpoly(filename){

    if(filename == null || filename == ""){
      console.log("NO JSON FILE DETECTED!"); //to inform if json file was NOT receieved
    }else{
      console.log(filename) //to confirm if json file was recieved

      //fetch map coords and data from json file
      fetch(filename)
      .then(response => response.json())
      .then(jsonData => {
        // Add polygon to the map
        L.polygon(jsonData[0].map_polygon_vertices, { color: 'green' })
          .addTo(map)
          .LbindPopup(jsonData[0].map_name);
        })
      .catch(error => console.error('Error fetching JSON:', error));
      }   
  }

  Mpins(MapPins){
    console.log(MapPins);

    fetch(MapPins)
      .then(response => response.json())
      .then(jsonData => {
        // Add pins to the map
        jsonData[0].map_pins.forEach(function (pin) {
          L.marker([pin.pin_lat, pin.pin_long]).addTo(map)
            .bindPopup(pin.pin_name + '<br>Created by: ' + pin.pin_created_by);
        });
        map.fitBounds(marker.getBounds());
        })
  }
}

const MyMap = new Map();
MyMap.init();