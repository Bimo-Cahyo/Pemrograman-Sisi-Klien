<?php
include 'config.php';

header("Content-Type: application/json");
// Allow requests from any origin
header("Access-Control-Allow-Origin: *");
// Allow certain HTTP methods
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
// Allow headers that can be sent with the request
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->name) && !empty($data->description) && !empty($data->location) && !empty($data->date) && !empty($data->status)) {
    try {
        $query = "INSERT INTO disasters (name, description, location, date, status) VALUES (:name, :description, :location, :date, :status)";
        $stmt = $conn->prepare($query);

        $stmt->bindParam(":name", $data->name);
        $stmt->bindParam(":description", $data->description);
        $stmt->bindParam(":location", $data->location);
        $stmt->bindParam(":date", $data->date);
        $stmt->bindParam(":status", $data->status);

        if ($stmt->execute()) {
            echo json_encode(["message" => "Disaster created successfully."]);
        } else {
            echo json_encode(["message" => "Failed to create disaster."]);
        }
    } catch (Exception $e) {
        echo json_encode(["error" => $e->getMessage()]);
    }
} else {
    echo json_encode(["message" => "Incomplete data."]);
}
?>
