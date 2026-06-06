from django.db import models
import timezone # pyright: ignore[reportMissingImports]
# Create your models here.
class Product(models.Model):
    class Type(models.TextChoices):
        Electronics = "01", "Electronics"
        Clothing = "02", "Clothing"
        Home = "03", "Home"
        Books = "04", "Books"
        Toys = "05", "Toys"
        
    #Product_id= models.AutoField(primary_key=True)
    product_code = models.CharField(max_length=20, unique=True)
    product_type = models.CharField(max_length=50, choices=Type.choices)

    @staticmethod
    def generate_product_code():
        now =timezone.now()
        year = str(now.year)[-2:]
        month = f"{now.month:02d}"
        prefix = f"{year}{month}{product_type}"
        last_product =Product.objects.filter(
            product_code__startswith=prefix
        ).order_by('-id').first()
        
        if last_product:
            last_serial = int(last_product.product_code[-4:])
            new_serial =last_serial +1
        else:
            new_serial=1
        return f"{prefix}{new_serial:04d}"
    def save(self, *args, **kwargs):
        if not self.product_code:
            self.product_code = self.generate_product_code()
        super().save(*args, **kwargs)
        
        
        
    product_name = models.CharField(max_length=100)
    product_cost = models.DecimalField(max_digits=10, decimal_places=2)
    product_description = models.TextField()
    product_image = models.ImageField(upload_to='product_images/')

    def __str__(self):
        return self.product_name