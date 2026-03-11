<?php
session_start(); // 1. Start session to access $_SESSION['user_id']
header('Content-Type: application/json');
include "connect.php";

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    echo json_encode(["status" => "error", "msg" => "Unauthorized"]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);
if (!$data) {
    echo json_encode(["status" => "error", "msg" => "No input received"]);
    exit;
}

$name = $data["name"];
$lat = $data["latitude"];
$lng = $data["longitude"];
$rooms = $data["rooms"];
$current_user = $_SESSION['user_id']; // Get the ID of the person logged in

/* Insert building */
$stmt = $conn->prepare("INSERT INTO buildings (name, latitude, longitude) VALUES (?, ?, ?)");
$stmt->bind_param("sdd", $name, $lat, $lng);

if (!$stmt->execute()) {
    echo json_encode(["status" => "error", "msg" => $stmt->error]);
    exit;
}
$building_id = $stmt->insert_id;

/* 2. Log the action into user_logs */
$log_action = "Added new building: " . $name;
$logStmt = $conn->prepare("INSERT INTO user_logs (user_id, action) VALUES (?, ?)");
$logStmt->bind_param("is", $current_user, $log_action);
$logStmt->execute();

/* Insert floors and rooms */
foreach ($rooms as $floorIndex => $numRooms) {
    $floor_no = $floorIndex + 1;
    $stmt = $conn->prepare("INSERT INTO floors (bldg_id, floor_no) VALUES (?, ?)");
    $stmt->bind_param("ii", $building_id, $floor_no);
    $stmt->execute();
    $floor_id = $stmt->insert_id;

    for ($r = 1; $r <= $numRooms; $r++) {
        $stmt = $conn->prepare("INSERT INTO rooms (floor_id, room_no) VALUES (?, ?)");
        $stmt->bind_param("ii", $floor_id, $r);
        $stmt->execute();
        $room_id = $stmt->insert_id;

        $stmt = $conn->prepare("INSERT INTO room_occupants (room_id, no_of_occupants) VALUES (?, 0)");
        $stmt->bind_param("i", $room_id);
        $stmt->execute();
    }
}

echo json_encode(["status" => "success"]);
?>