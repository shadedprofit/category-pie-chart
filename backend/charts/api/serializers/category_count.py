from rest_framework import serializers


class CategoryCountSerializer(serializers.Serializer):
    category = serializers.CharField()
    count = serializers.IntegerField()

    def validate_count(self, value: int) -> int:
        if value < 0:
            raise serializers.ValidationError(
                "Count cannot be less than 0."
            )
        return value
