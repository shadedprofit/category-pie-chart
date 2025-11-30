from django.test import TestCase
from ...utils.date import generate_random_date_string, is_valid_yyyymmdd


class DateUtilsTest(TestCase):
    def test_is_valid_yyyymmdd(self) -> None:
        self.assertTrue(is_valid_yyyymmdd("2025-10-31"))
        self.assertFalse(is_valid_yyyymmdd("20$0-&&-45"))
        self.assertFalse(is_valid_yyyymmdd("2025-67-99"))

    def test_date_string_generator(self) -> None:
        start = "2025-10-31"
        end = "2025-10-31"

        date_str1 = generate_random_date_string(start, end)
        date_str2 = generate_random_date_string()

        self.assertEqual(date_str1, start)
        self.assertTrue(is_valid_yyyymmdd(date_str1))
        self.assertTrue(is_valid_yyyymmdd(date_str2))
