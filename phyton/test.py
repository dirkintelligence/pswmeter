from pswmeter import pswmeter

# Examples
passwords = [
    'password123',  # Example 1: Fails, Score < 3
    'MyGoodPass54',   # Example 2: Good, Score 4
    'Super.67Secure!' # Example 3: Very good, Score 4
]

# Compute examples
for password in passwords:
    score = pswmeter(password)
    print(f"Password: '{password}' - Score: {score}")