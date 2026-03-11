// dashboard_js.js - handles map, markers, info board, and adding buildings

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
  }
}

let campusMap = new Map();
campusMap.init();   

let buildings = [];

/* Show/Hide Add Building Form */
document.getElementById("showFormBtn").addEventListener("click", function(){
  document.getElementById("formContainer").classList.toggle("hidden");
});

/* Map click → fill coordinates */
map.on("click", function(e){
  const lat = e.latlng.lat.toFixed(6);
  const lng = e.latlng.lng.toFixed(6);
  document.getElementById("latitude").value = lat;
  document.getElementById("longitude").value = lng;
});

/* Generate room inputs per floor */
const floorInput = document.getElementById("floorCount");
const roomContainer = document.getElementById("roomInputs");

floorInput.addEventListener("change", function(){
  roomContainer.innerHTML = "";
  let floors = parseInt(this.value);
  for(let i=1;i<=floors;i++){
    let div = document.createElement("div");
    div.innerHTML = `
      <label>Rooms on Floor ${i}</label>
      <input type="number" min="0" id="floorRooms${i}" required>
    `;
    roomContainer.appendChild(div);
  }
});

/* Form submission */
document.getElementById("buildingForm").addEventListener("submit", function(e){
  e.preventDefault();

  const name = document.getElementById("buildingName").value;
  const floors = parseInt(document.getElementById("floorCount").value);
  const lat = parseFloat(document.getElementById("latitude").value);
  const lng = parseFloat(document.getElementById("longitude").value);

  let roomsPerFloor = [];
  for(let i=1;i<=floors;i++){
    let rooms = parseInt(document.getElementById("floorRooms"+i).value);
    roomsPerFloor.push(rooms);
  }

  fetch("add_building.php", {
    method: "POST",
    headers: { "Content-Type":"application/json" },
    body: JSON.stringify({
      name: name,
      latitude: lat,
      longitude: lng,
      rooms: roomsPerFloor
    })
  })
  .then(res=>res.json())
  .then(data=>{
    console.log("Saved:", data);
    loadBuildings(); // reload markers from DB
  })
  .catch(err=>console.error(err));

  this.reset();
  roomContainer.innerHTML="";
});

/* Show building info */
function showBuildingInfo(building){
  document.getElementById("infoName").innerText = building.name;
  document.getElementById("infoFloors").innerText = building.floors;

  let totalRooms = building.rooms.reduce((sum,floorRooms)=>sum+floorRooms.length,0);
  document.getElementById("infoRooms").innerText = totalRooms;

  let oldFloors = document.getElementById("floorButtons");
  if(oldFloors) oldFloors.remove();
  let oldRooms = document.getElementById("roomList");
  if(oldRooms) oldRooms.remove();

  let floorContainer = document.createElement("div");
  floorContainer.id = "floorButtons";
  floorContainer.innerHTML = "<h4>Floors</h4>";

  building.rooms.forEach((floorRooms,i)=>{
    let btn = document.createElement("button");
    btn.innerText = "Floor "+(i+1);
    btn.onclick = function(){ showFloorRooms(building, i); };
    floorContainer.appendChild(btn);
  });

  document.querySelector(".board").appendChild(floorContainer);
}

/* Show rooms on selected floor */
function showFloorRooms(building,floorIndex){
  let existing = document.getElementById("roomList");
  if(existing) existing.remove();

  let container = document.createElement("div");
  container.id = "roomList";
  container.innerHTML = `<h4>Rooms on Floor ${floorIndex+1}</h4>`;

  building.rooms[floorIndex].forEach((roomOccupants,i)=>{
    let room = document.createElement("p");
    room.innerText = `Room ${i+1} — Occupants: ${roomOccupants}`;
    container.appendChild(room);
  });

  document.querySelector(".board").appendChild(container);
}

/* Load buildings from database */
function loadBuildings(){
  fetch("get_buildings.php")
  .then(res=>res.json())
  .then(data=>{
    buildings.forEach(b=>{
      if(b.marker) map.removeLayer(b.marker);
    });
    buildings = [];

    data.forEach(b=>{
      let marker = L.marker([b.lat, b.lng]).addTo(map);
      marker.on("click", ()=> showBuildingInfo(b));
      b.marker = marker;
      buildings.push(b);
    });
  })
  .catch(err=>console.error(err));
}

/* Initial load */
window.addEventListener("load", loadBuildings);

/* Logout button */
document.getElementById("logoutBtn")?.addEventListener("click", function(){
  window.location.href = "logout.php";
});