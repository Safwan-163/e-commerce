from django.db import models

# Create your models here.
class Cart(models.Model):
    # user = models.ForeignKey(User, on_delete=models.CASCADE)
    # created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Cart for {self.user.username}"
    
class CartItem(models.Model):
    # cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='items')
    # product = models.ForeignKey(Product, on_delete=models.CASCADE)
    # quantity = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.quantity} x {self.product.name} in Cart for {self.cart.user.username}"
