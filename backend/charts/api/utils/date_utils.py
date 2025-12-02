from datetime import datetime, date, timedelta
import random


def is_valid_yyyymmdd(date_string: str = "") -> bool:
    """Checks if a string represents a valid date in YYYY-MM-DD format.

       Args:
            date_string (str): The string to validate.

       Returns:
            bool: True if the string is in YYYY-MM-DD format and represents a
                  valid date, False otherwise.
    """
    try:
        datetime.strptime(date_string, "%Y-%m-%d")
        return True
    except ValueError:
        return False


def generate_start_date_string(days_in_past=365) -> str:
    today = date.today()
    return (today - timedelta(days=days_in_past)).strftime("%Y-%m-%d")


def generate_end_date_string() -> str:
    today = date.today()
    return today.strftime("%Y-%m-%d")


def generate_random_date_string(start_date_str="", end_date_str="") -> str:
    """Generates a random date string in YYYY-MM-DD format within a specified
       range.

       Args:
            start_date_str (str): The start date in 'YYYY-MM-DD' format.
            end_date_str (str): The end date in 'YYYY-MM-DD' format.

       Returns:
            str: A random date string in 'YYYY-MM-DD' format.
    """
    if end_date_str == "":
        end_date_str = generate_end_date_string()

    if start_date_str == "":
        start_date_str = generate_start_date_string()

    start_date = datetime.strptime(start_date_str, "%Y-%m-%d")
    end_date = datetime.strptime(end_date_str, "%Y-%m-%d")

    time_difference = end_date - start_date

    random_days = random.randint(0, time_difference.days)

    random_date = start_date + timedelta(days=random_days)
    return random_date.strftime("%Y-%m-%d")
