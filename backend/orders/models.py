from django.db import models

# Create your models here.
class Order(models.Model):
    # customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    # order_date = models.DateTimeField(auto_now_add=True)
    # total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    # status = models.CharField(max_length=20)

    def __str__(self):
        return f"Order {self.id} - {self.status}"
    
class OrderItem(models.Model):
    # order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    # product = models.ForeignKey(Product, on_delete=models.CASCADE)
    # quantity = models.PositiveIntegerField()
    # price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.quantity} x {self.product.name} for Order {self.order.id}"

