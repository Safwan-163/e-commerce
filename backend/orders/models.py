from django.db import models

from products.models import Product

# Create your models here.
class Order(models.Model):
    order_id = models.AutoField(primary_key=True)
    customer_id = models.ForeignKey('users.Customer', on_delete=models.CASCADE)
    product_id = models.ForeignKey('products.Product', on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    total_cost = models.DecimalField(max_digits=10, decimal_places=2)
    order_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20)

    def __str__(self):
        return f"Order {self.order_id} - {self.status}"
    
class Shipping(models.Model):
    shipping_id = models.AutoField(primary_key=True)
    order_id = models.ForeignKey(Order, on_delete=models.CASCADE)
    shipping_cost = models.DecimalField(max_digits=10, decimal_places=2)
    shipping_address = models.TextField()
    shipping_cost = models.DecimalField(max_digits=10, decimal_places=2)
    shipping_date = models.DateTimeField(null=True, blank=True)
    delivery_date = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"Shipping for Order {self.order_id}"

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    price = models.FloatField()