from django.test import TestCase


class PieChartApiViewTest(TestCase):

    def test_my_view_get(self) -> None:
        response = self.client.get(
            "/api/pie-chart?start_date=2025-01-01&end_date=2025-10-30",
            follow=True
        )
        self.assertEqual(response.status_code, 200)
