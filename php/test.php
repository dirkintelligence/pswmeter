<?php
require('./pswmeter.php');

// Exampes
$passwords = [
    'password123',  // Beispiel 1: Scheitert, Score < 3
    'MyGoodPass54',   // Beispiel 2: Gut, Score 4
    'Super.67Secure!', // Beispiel 3: Sehr gut, Score 5
];

// Compute examples
foreach ($passwords as $password) {
    $score = pswmeter($password);
    echo "Password: '{$password}' - Score: {$score}<br>\n";
}

?>