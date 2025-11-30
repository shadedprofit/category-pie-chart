from datetime import date, timedelta
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status
from ..serializers.category_count import CategoryCountSerializer
from ..serializers.date_range import DateRangeSerializer
from ..models.purchase import Purchase
import json


class PieChartApiView(APIView):
    """Sets up REST API methods for `api/pie-chart` route"""

    def get(self, request: Request) -> Response:
        """Get category count for the provided date range
        """
        start_date = request.query_params.get("start_date")
        end_date = request.query_params.get("end_date")
        today = date.today()

        # If dates are not provided, we'll provide a count for the last year
        # of sales.  To do so, we'll reset the start and end date variables.
        if start_date is None:
            start_date = (today - timedelta(days=365)).strftime("%Y-%m-%d")

        if end_date is None:
            end_date = today.strftime("%Y-%m-%d")

        # Validate the input
        data = {"start_date": start_date, "end_date": end_date}
        date_serializer = DateRangeSerializer(data=data)

        if not date_serializer.is_valid():
            return Response(
                {"error": json.dumps(date_serializer.errors)},
                status=status.HTTP_400_BAD_REQUEST
            )

        sql_query = "SELECT 1 AS id, category, COUNT(*) AS count FROM \
                api_purchase GROUP BY category"
        try:
            distinct_categories_count = Purchase.objects.raw(sql_query)
            data = [{"category": obj.category, "count": obj.count}
                    for obj in distinct_categories_count]
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        count_serializer = CategoryCountSerializer(
            data=data,
            many=True
        )

        if count_serializer.is_valid():

            res = {"data": data}
            return Response(res, status=status.HTTP_200_OK)
        else:
            return Response(
                {"error": json.dumps(count_serializer.errors)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
