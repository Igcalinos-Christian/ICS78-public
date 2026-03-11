<?php
// get_buildings.php - returns all buildings + floors + rooms
header('Content-Type: application/json');
include "connect.php";

$buildings = [];
$res = $conn->query("SELECT * FROM buildings");

while($b = $res->fetch_assoc()){
    $b_id = $b['id'];
    $floors = [];
    
    $floorRes = $conn->query("SELECT * FROM floors WHERE bldg_id=$b_id ORDER BY floor_no");
    while($f = $floorRes->fetch_assoc()){
        $rooms = [];
        $roomRes = $conn->query("SELECT * FROM rooms WHERE floor_id=".$f['id']." ORDER BY room_no");
        while($r = $roomRes->fetch_assoc()){
            $occupants = 0; // placeholder
            $rooms[] = $occupants;
        }
        $floors[] = $rooms;
    }
    
    $buildings[] = [
        "id"=>$b['id'],
        "name"=>$b['name'],
        "lat"=>$b['latitude'],
        "lng"=>$b['longitude'],
        "floors"=>count($floors),
        "rooms"=>$floors
    ];
}

echo json_encode($buildings);
?>