from rest_framework.test import APIRequestFactory
from django.test import TestCase
from ...views.pie_chart import PieChartApiView


class PieChartApiViewTest(TestCase):
    def setUp(self) -> None:
        self.factory = APIRequestFactory()

    def test_my_view_get(self) -> None:
        request = self.factory.get("api/pie-chart")
        view = PieChartApiView.as_view()
        response = view(request)

        self.assertEqual(response.status_code, 200)
