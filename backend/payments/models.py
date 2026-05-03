from django.db import models

# Create your models here.
class Payment(models.Model):
    # order = models.ForeignKey(Order, on_delete=models.CASCADE)
    # amount = models.DecimalField(max_digits=10, decimal_places=2)
    # payment_method = models.CharField(max_length=50)
    # status = models.CharField(max_length=20)

    def __str__(self):
        return f"Payment for Order {self.order.id} - {self.status}"

