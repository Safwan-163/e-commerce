from django.db import models

# Create your models here.
class Address(models.Model):
    # street = models.CharField(max_length=255)
    # city = models.CharField(max_length=100)
    # state = models.CharField(max_length=100)
    # zip_code = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.street}, {self.city}, {self.state} {self.zip_code}"  
    
class Review(models.Model):
    # product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='reviews')
    # customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    # rating = models.PositiveIntegerField()
    # comment = models.TextField()

    def __str__(self):
        return f"Review for {self.product.name} by {self.customer.name}"

class Wishlist(models.Model):
    # customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    # products = models.ManyToManyField(Product)

    def __str__(self):
        return f"Wishlist for {self.customer.name}"
    