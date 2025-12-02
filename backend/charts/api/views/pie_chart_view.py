from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status
from ..serializers.date_range_serializer import DateRangeSerializer
from ..services.chart_service import ChartService
import json


class PieChartApiView(APIView):
    """Sets up REST API methods for `api/pie-chart` route"""

    def __init__(
        self,
        chart_service: ChartService = ChartService()
    ):
        self.chart_service = chart_service
        super().__init__()

    def get(self, request: Request) -> Response:
        """Get category count for the provided date range
        """
        start_date = str(request.query_params.get("start_date", ""))
        end_date = str(request.query_params.get("end_date", ""))

        # Use serializer to validate query params
        date_range_data = {"start_date": start_date, "end_date": end_date}
        date_serializer = DateRangeSerializer(data=date_range_data)

        if not date_serializer.is_valid():
            return Response(
                {"error": json.dumps(date_serializer.errors)},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            res_data = self.chart_service.get_category_count_by_date(
                **date_range_data
            )
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        return Response({"data": res_data}, status=status.HTTP_200_OK)
