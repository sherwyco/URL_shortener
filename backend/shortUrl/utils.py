import string
import random


def generate_code(size=7, chars=string.ascii_uppercase + string.ascii_lowercase + string.digits):
    """
        generates a random base62 7 character code
    """
    return ''.join(random.choice(chars) for _ in range(size))
