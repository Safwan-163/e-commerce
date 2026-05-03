from django.db import models

# Create your models here.
class Category(models.Model):
    # name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name
    
class Product(models.Model):
    # name = models.CharField(max_length=100)
    # description = models.TextField()
    # price = models.DecimalField(max_digits=10, decimal_places=2)
    # category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
class ProductImage(models.Model):
    # product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='images')
    # image_url = models.URLField()
    
    def __str__(self):
        return f"Image for {self.product.name}"