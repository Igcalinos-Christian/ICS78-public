<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    header("Location: login.html");
    exit;
}
?> <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Building Dashboard</title>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
    <link rel="stylesheet" href="dashboard_css.css">
</head>
<body>

<div class="header">
    <span>Campus Building Dashboard</span>
    <div class="header-buttons">
        <button id="showFormBtn">+ Add Building</button>
        <button id="logoutBtn">Logout</button>
    </div>
</div>

<div class="main">
    <div id="map"></div>
    <div class="sidebar">
        <div class="board">
            <h3>Building Information</h3>
            <p><b>Name:</b> <span id="infoName">None</span></p>
            <p><b>Floors:</b> <span id="infoFloors">0</span></p>
            <p><b>Total Rooms:</b> <span id="infoRooms">0</span></p>
        </div>

        <div id="formContainer" class="hidden">
            <h3>Add Building</h3>
            <form id="buildingForm">
                <input type="text" id="buildingName" placeholder="Building Name" required>
                <input type="number" id="floorCount" placeholder="Number of Floors" min="1" required>
                <input type="number" id="latitude" placeholder="latitude" step="any" required>
                <input type="number" id="longitude" placeholder="longitude" step="any" required>
                <div id="roomInputs"></div>
                <p class="mapHint">Click the map to set building coordinates</p>
                <button type="submit">Add Building</button>
            </form>
        </div>
    </div>
</div>

<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script src="dashboard_js.js"></script>

</body>
</html>