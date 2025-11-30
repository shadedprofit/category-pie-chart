from rest_framework import serializers
from ..models.purchase import Purchase


class PurchaseSerializer(serializers.ModelSerializer):
    """Converts Purchase model instances to and from JSON"""
    class Meta:
        model = Purchase
        fields = "__all__"
