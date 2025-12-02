from rest_framework.test import APITestCase
from ...services.chart_service import ChartService
from ...models.purchase_model import Purchase


class ChartServiceTests(APITestCase):

    def setUp(self):
        self.chart_service = ChartService()
        Purchase.objects.create(
            category="Accessories",
            amount=15.0,
            timestamp="2025-07-15"
        )
        Purchase.objects.create(
            category="Accessories",
            amount=10.0,
            timestamp="2025-08-9"
        )
        Purchase.objects.create(
            category="Accessories",
            amount=32.5,
            timestamp="2025-06-01"
        )
        Purchase.objects.create(
            category="Tshirts",
            amount=47.50,
            timestamp="2025-07-03"
        )
        Purchase.objects.create(
            category="Tshirts",
            amount=29.99,
            timestamp="2025-08-03"
        )

    def test_get_category_count_by_date(self):
        res1 = self.chart_service.get_category_count_by_date(
            start_date="2025-06-01",
            end_date="2025-09-01"
        )

        # Test entire date range first
        tshirt_res1 = [
            obj for obj in res1 if obj.get("category") == "Tshirts"
        ][0]
        accessories_res1 = [
            obj for obj in res1 if obj.get("category") == "Accessories"
        ][0]
        self.assertEqual(tshirt_res1.get("count"), 2)
        self.assertEqual(accessories_res1.get("count"), 3)

        # Test for filtered dates
        res1 = self.chart_service.get_category_count_by_date(
            start_date="2025-08-01",
            end_date="2025-09-01"
        )

        tshirt_res2 = [
            obj for obj in res1 if obj.get("category") == "Tshirts"
        ][0]
        accessories_res2 = [
            obj for obj in res1 if obj.get("category") == "Accessories"
        ][0]
        self.assertEqual(tshirt_res2.get("count"), 1)
        self.assertEqual(accessories_res2.get("count"), 1)
