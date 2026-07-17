from django.db import models
from products.models import Product
from users.models import Customer

# class Cart(models.Model):
#     user = models.ForeignKey('users.Customer', on_delete=models.CASCADE)
#     created_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return f"Cart for {self.user.username}"




class Cart(models.Model):
    customer = models.ForeignKey(
        'users.Customer',
        on_delete=models.CASCADE,
        related_name="carts"
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Cart of {self.customer.username}"


# class CartItem(models.Model):
#     cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name="items")
#     product = models.ForeignKey('products.Product', on_delete=models.CASCADE)
#     quantity = models.PositiveIntegerField(default=1)

#     def __str__(self):
#         return f"{self.product} ({self.quantity})"


class CartItem(models.Model):

    cart = models.ForeignKey(
        'cart.Cart',
        on_delete=models.CASCADE,
        related_name="items"
    )

    product = models.ForeignKey(
        'products.Product',
        on_delete=models.CASCADE
    )

    quantity = models.PositiveIntegerField()

    price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    def __str__(self):
        return f"{self.product.name} ({self.quantity})"


