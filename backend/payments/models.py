from django.db import models

# Create your models here.
class Payment(models.Model):
   order_id = models.AutoField(primary_key=True)
   customer_id = models.ForeignKey('users.Customer', on_delete=models.CASCADE)
   product_id = models.ForeignKey('products.Product', on_delete=models.CASCADE)
   amount = models.DecimalField(max_digits=10, decimal_places=2)
   paid=models.BooleanField(default=False)
   payment_method = models.CharField(max_length=50)
   status = models.CharField(max_length=20)

   def __str__(self):
        return f"Payment for Order {self.order_id} - {self.status}"

