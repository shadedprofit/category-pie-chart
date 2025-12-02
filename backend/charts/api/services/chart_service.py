from django.db.utils import DatabaseError
from rest_framework.exceptions import ValidationError
from ..models.purchase_model import Purchase
from ..types.api_types import PurchaseCategory
from ..utils.date_utils import (
    generate_end_date_string,
    generate_start_date_string
)
from ..serializers.date_range_serializer import DateRangeSerializer
from ..serializers.category_count_serializer import CategoryCountSerializer


class ChartService:
    """Service methods for the charts APIs
    """

    def get_category_count_by_date(
        self,
        start_date: str = generate_start_date_string(),
        end_date: str = generate_end_date_string()
    ) -> list[PurchaseCategory]:
        """Retrieves a count of purchases for each category in the date range
           provided.

           Args:
                start_date (str, optional): The start date in YYYY-MM-DD
                                            formate. Defaults to today's date.

                end_date (str, optional):   The end date in YYYY-MM-DD format.
                                            Defaults to a one year before
                                            today's date.

           Returns:
                list[PurchaseCategory]: A list of purchase categories and the
                                        count of the purchases in that category
                                        for the date range provided to the
                                        function.
        """
        data = {"start_date": start_date, "end_date": end_date}
        date_serializer = DateRangeSerializer(data=data)

        try:
            date_serializer.is_valid(raise_exception=True)
        except ValidationError as e:
            raise e

        sql_query = ("SELECT 1 AS id, category, COUNT(*) AS count FROM "
                     + "api_purchase WHERE timestamp BETWEEN "
                     + "%s AND %s GROUP BY category"
                     )

        try:
            distinct_categories_count = Purchase.objects.raw(
                sql_query, [start_date, end_date]
            )
        except DatabaseError as e:
            raise e

        try:
            count_data = [
                PurchaseCategory(category=obj.category, count=obj.count)
                for obj in distinct_categories_count
            ]
            count_serializer = CategoryCountSerializer(
                data=count_data,
                many=True
            )
            count_serializer.is_valid(raise_exception=True)
        except Exception as e:
            raise e

        return count_data
