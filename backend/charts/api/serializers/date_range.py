from rest_framework import serializers


class DateRangeSerializer(serializers.Serializer):
    start_date = serializers.DateField()
    end_date = serializers.DateField()

    def validate(self, attrs: dict) -> dict:
        if attrs["end_date"] < attrs["start_date"]:
            raise serializers.ValidationError(
                "End date must be after the start date.")
        return attrs
