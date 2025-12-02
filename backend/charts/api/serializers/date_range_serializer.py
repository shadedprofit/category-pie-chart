from rest_framework import serializers
from ..utils.date_utils import (
    generate_end_date_string,
    generate_start_date_string
)


class DateRangeSerializer(serializers.Serializer):
    """Serializer to validate a range of dates"""
    start_date = serializers.DateField(default=generate_start_date_string())
    end_date = serializers.DateField(default=generate_end_date_string())

    def validate(self, attrs: dict) -> dict:
        """Validates the date range fields provided to the serializer.

           Args:
                attrs (dict): The dictionary containing the data stored
                              in the serializer.

           Returns:
                dict: An `attrs` object containing the values stored in the
                      the serializer.
        """
        if attrs["end_date"] < attrs["start_date"]:
            raise serializers.ValidationError(
                "End date must be after the start date.")
        return attrs
