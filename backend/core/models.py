from django.db import models
from products.models import Product
from users.models import Customer

# Create your models here.
class Address(models.Model):
    street = models.CharField(max_length=255,null=True, blank=True)
    city = models.CharField(max_length=100,null=True, blank=True)
    state = models.CharField(max_length=100,null=True, blank=True)
    zip_code = models.CharField(max_length=20,null=True, blank=True)

    def __str__(self):
        return f"{self.street}, {self.city}, {self.state} {self.zip_code}"  
    
class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='reviews',null=True, blank=True)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE,null=True, blank=True)
    rating = models.PositiveIntegerField(null=True, blank=True)
    comment = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"Review for {self.product.name} by {self.customer.name}"

class Wishlist(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE,null=True, blank=True)
    products = models.ManyToManyField(Product, related_name='wishlists', blank=True)

    def __str__(self):
        return f"Wishlist for {self.customer.name}"
    