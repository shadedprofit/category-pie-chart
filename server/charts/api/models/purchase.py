from django.db import models


class Purchase(models.Model):
    # Explicitly add the manager
    objects: models.Manager = models.Manager()

    category = models.CharField(max_length=180)
    amount = models.FloatField(max_length=10)
    timestamp = models.DateField()

    def __str__(self):
        """Magic Method for printing the Purchase instance"""
        return f"Purchase(category: {self.category}, amount: \
            ${self.amount}, date: {self.timestamp}"
