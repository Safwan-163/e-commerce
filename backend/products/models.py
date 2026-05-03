from django.db import models

# Create your models here.
class Product(models.Model):
    Product_id= models.AutoField(primary_key=True)
    product_name = models.CharField(max_length=100)
    product_cost = models.DecimalField(max_digits=10, decimal_places=2)
    product_description = models.TextField()
    product_image = models.ImageField(upload_to='product_images/')

    def __str__(self):
        return self.product_name