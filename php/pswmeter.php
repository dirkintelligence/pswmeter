<?php
/**
 * Calculates the security score of a password.
 *
 * The score is based on various criteria, such as:
 * - Presence of uppercase and lowercase letters
 * - Presence of digits
 * - Presence of special characters
 * - Minimum password length
 * - Commonly used passwords (first 10 characters)
 *
 * @param string $password The password to be evaluated
 * @param int $pswMinLength Minimum length of the password (default: 8)
 * 
 * @return int The security score of the password, ranging from 0 to 4.
 *     0-2: Password is too simple
 *     3-4: Password is ok or good
 */
function pswmeter($password, $pswMinLength = 10) {
    /*
        scores
        0: type in password
        1: too simple
        2: simple
        3: ok
        4: great
    */
    $score = 0;
    
    // Regular Expressions
    $regexLower = '/(?=[a-z])/';
    $regexUpper = '/(?=[A-Z])/';
    $regexDigits = '/(?=[0-9])/';
    $regexSpecial = '/(?=[^a-zA-Z0-9 ])/';
    $regexLength = '/(?=.{' . $pswMinLength . ',})/';

    // Check conditions
    if (preg_match($regexLower, $password)) { ++$score; }
    if (preg_match($regexUpper, $password)) { ++$score; }
    if (preg_match($regexDigits, $password)) { ++$score; }
    if (preg_match($regexSpecial, $password)) { ++$score; }

    // Minium length is mandatory
    if (strlen($password) < $pswMinLength) {
        $score = min($score, 2);
    }

    // Prevent special expressions in the first 10 characters
    $f10ch = substr($password, 0, 10);
    $pwlist = [
        'Password12', 'Welcome123', 'Test123456', 'Admin12345', 'Qwertzuiop', 'Qwertz1234',
        'Passwort12', 'Geheim1234', 'Benutzer12'
    ];
    if (in_array($f10ch, $pwlist)) {
        $score = min($score, 2);
    }

    return $score;
}
?>