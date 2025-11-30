from datetime import datetime, date, timedelta
import random


def generate_random_date_string(start_date_str="", end_date_str="") -> str:
    """Generates a random date string in YYYY-MM-DD format within a specified
       range.

       Args:
            start_date_str (str): The start date in 'YYYY-MM-DD' format.
            end_date_str (str): The end date in 'YYYY-MM-DD' format.

       Returns:
            str: A random date string in 'YYYY-MM-DD' format.
    """
    today = date.today()

    if end_date_str == "":
        end_date_str = today.strftime("%Y-%m-%d")

    if start_date_str == "":
        start_date_str = (today - timedelta(days=365)).strftime("%Y-%m-%d")

    start_date = datetime.strptime(start_date_str, "%Y-%m-%d")
    end_date = datetime.strptime(end_date_str, "%Y-%m-%d")

    time_difference = end_date - start_date

    random_days = random.randint(0, time_difference.days)

    random_date = start_date + timedelta(days=random_days)
    return random_date.strftime("%Y-%m-%d")
