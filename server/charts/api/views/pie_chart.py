from datetime import date, timedelta
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status
from ..models.purchase import Purchase


class PieChartApiView(APIView):
    """Sets up REST API methods for `api/pie-chart` route"""

    def get(self, request: Request) -> Response:
        """Get category count for the provided date range
        """
        start_date = request.query_params.get("start_date", "")
        end_date = request.query_params.get("end_date", "")

        # If dates are not provided, we'll provide a count for the last year
        # of sales.  To do so, we'll reset the start and end date variables.
        today = date.today()
        if end_date == "":
            end_date = today.strftime("%Y-%m-%d")

        if start_date == "":
            start_date = (today - timedelta(days=365)).strftime("%Y-%m-%d")

        sql_query = "SELECT 1 AS id, category, COUNT(*) AS count FROM \
                api_purchase GROUP BY category"
        try:
            distinct_categories_count = Purchase.objects.raw(sql_query)
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        data = [{"category": obj.category, "count": obj.count}
                for obj in distinct_categories_count]
        res = {"data": data}
        return Response(res, status=status.HTTP_200_OK)
