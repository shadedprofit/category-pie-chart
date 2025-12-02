from rest_framework import serializers


class CategoryCountSerializer(serializers.Serializer):
    """Serializer to validate the data for a Purchase category and its count"""
    category = serializers.CharField()
    count = serializers.IntegerField()

    def validate_count(self, value: int) -> int:
        if value < 0:
            raise serializers.ValidationError(
                "Count cannot be less than 0."
            )
        return value
