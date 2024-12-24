import re

def pswmeter(password: str, psw_min_length: int = 10) -> int:
    """
    Calculates the security score of a password.

    The score is based on various criteria, such as:
    - Presence of uppercase and lowercase letters
    - Presence of digits
    - Presence of special characters
    - Minimum password length
    - Commonly used passwords (first 10 characters)

    :param password: The password to be evaluated
    :param psw_min_length: Minimum length of the password (default: 10)
    :return: The security score of the password, ranging from 0 to 4.
             0-2: Password is too simple
             3-4: Password is ok or good
    """
    # Scores:
    # 0: type in password
    # 1: too simple
    # 2: simple
    # 3: ok
    # 4: great

    score = 0

    # Regular Expressions
    regex_lower = r"(?=[a-z])"
    regex_upper = r"(?=[A-Z])"
    regex_digits = r"(?=[0-9])"
    regex_special = r"(?=[^a-zA-Z0-9 ])"

    # Check conditions
    if re.search(regex_lower, password):
        score += 1
    if re.search(regex_upper, password):
        score += 1
    if re.search(regex_digits, password):
        score += 1
    if re.search(regex_special, password):
        score += 1

    # Minimum length is mandatory
    if len(password) < psw_min_length:
        score = min(score, 2)

    # Prevent special expressions in the first 10 characters
    first_10_chars = password[:10]
    pwlist = [
        "Password12", "Welcome123", "Test123456", "Admin12345", "Qwertzuiop", "Qwertz1234",
        "Passwort12", "Geheim1234", "Benutzer12"
    ]
    if first_10_chars in pwlist:
        score = min(score, 2)

    return score

