from django.db import IntegrityError, models
from django.db import transaction
from django.utils import timezone
# Create your models here.

class Product(models.Model):
    
    class Type(models.TextChoices):
        Electronics = "01", "Electronics"
        Clothing = "02", "Clothing"
        Home = "03", "Home"
        Books = "04", "Books"
        Toys = "05", "Toys"
        Grocery = "06", "Grocery"
        Beauty = "07", "Beauty"
        Sports = "08", "Sports"
        Fruites = "09", "Fruits"
        Vegetables = "10", "Vegetables"
        Stationary = "11", "Stationary"
        
        
        
        
    #Product_id= models.AutoField(primary_key=True)
    product_code = models.CharField(max_length=20, unique=True)
    product_type = models.CharField(max_length=50, choices=Type.choices)
    
    @staticmethod
    def generate_product_code(product_type):
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
        
    product_name = models.CharField(max_length=100)
    product_cost = models.DecimalField(max_digits=10, decimal_places=2)
    product_description = models.TextField()
    product_image = models.ImageField(upload_to='product_images/')
    
        
    def save(self, *args, **kwargs):
        
        if self.product_code:
           super().save(*args, **kwargs)
           return
        for _ in range(20):
        
            
         try:
             
                

            with transaction.atomic():

                self.product_code = self.generate_product_code(
                        self.product_type
                    )

                super().save(*args, **kwargs)

                return

         except IntegrityError:

                self.product_code = None

                continue

    raise ValueError(
            "Could not generate unique product_code"
        )
    
        
    

    def __str__(self):
        return self.product_name