from django.urls import path
from ..views.pie_chart_view import PieChartApiView

urlpatterns = [
    path(
        "pie-chart/",
        PieChartApiView.as_view(),
        name="pie-chart-view"
    ),
]
