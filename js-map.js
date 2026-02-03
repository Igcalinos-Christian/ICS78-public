var map = L.map('map').setView([8.359997, 124.868352], 17);

class Map {
  init(){
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    this.polyLoader();
  }

  polyLoader(){
    var polygon = L.polygon([
        [8.361465, 124.867623],
        [8.358812, 124.867054],
        [8.358302, 124.869071],
        [8.361060, 124.869640]
      ], { color: 'green' })
      .addTo(map)
      .bindPopup("NBSC Campus");

      this.markerLoader();
  }

  markerLoader(){
    let arr = [
      [8.360222612755031, 124.86747032364904, "SWDC"],
      [8.359071397303623, 124.8684484713664, "BA"],
      [8.359222752517207, 124.86907893624586, "LAB"]
    ];

    arr.forEach((row, i) => {
      L.marker(row).addTo(map).on('click', () =>{
        this.infoLoader(row);
      });
    });
  }

  infoLoader(arr){
    alert(arr[2]);
  }
}

const M = new Map();
M.init();