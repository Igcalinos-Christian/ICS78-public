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
      [8.360222612755031, 124.86747032364904, "SWDC", 20],
      [8.359071397303623, 124.8684484713664, "BA", 15],
      [8.359222752517207, 124.86907893624586, "LAB", 2]
    ];

    arr.forEach((row, i) => {
      L.marker([row[0], row[1]]).addTo(map).on('click', () =>{
        this.infoLoader(row);
      });
    });
  }

  infoLoader(arr){
    const display = document.getElementById('display');
    display.innerHTML = "";

    const rooms = document.createElement("div");
    const building = document.createElement("div");

    rooms.id = "roomDisplay";
    building.id = "buildingInfo";

            /// ---- UI---- ////

    const h4 = document.createElement("h4");
    h4.textContent = arr[2] + " Rooms : " + arr[3];

    const clearBtn = document.createElement("button");
    clearBtn.textContent = "Clear room";

    const h4a = document.createElement("h4");
    h4a.textContent = "Available Rooms";

    const container = this.roomCal(arr);

    /*
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = true;
    */

    rooms.appendChild(h4);
    rooms.appendChild(clearBtn);

    building.appendChild(h4a);
    building.appendChild(container);

    display.appendChild(rooms);
    display.appendChild(building);

    clearBtn.addEventListener('click', () => {
    })
  }

  roomCal(row){
    const container = document.createElement("div");
    container.id = "BoxContainer";
    container.style.display = "grid";
    container.style.gridTemplateColumns = "repeat(5, 1fr)";
    container.style.gridTemplateRows = "100px auto";
    container.style.gridGap = "10px";

    for(let x = 0; x < row[3]; x++){
      const box = document.createElement("div");
      const roomNum = document.createElement("p");
      const checkBox = document.createElement("input");

      box.id = "Box";

      checkBox.type = "checkbox";
      checkBox.id = "cb" + x;
      checkBox.style.width =  "40px";
      checkBox.style.height = "40px";

      roomNum.textContent = "R" +  x;

      container.appendChild(box);
      box.appendChild(roomNum);
      box.appendChild(checkBox);

    }
    return container;
  }
}

const M = new Map();
M.init();