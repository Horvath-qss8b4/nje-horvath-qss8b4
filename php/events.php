<?php
// Az SSE beállításai
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');
header('Connection: keep-alive');

// Az adat küldése egyszer
$time = date("H:i:s");
$message = "Ez egy egyszeri üzenet.";

// Az adat küldése az SSE formátumban
echo "data: " . json_encode(["time" => $time, "message" => $message]) . "\n\n";

// Események elküldése, és flush
flush();
?>
